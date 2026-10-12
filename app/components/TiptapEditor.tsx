"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockExt from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import { Node, mergeAttributes } from "@tiptap/core";
import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  ImageIcon,
  Undo,
  Redo,
  Code,
  Pilcrow,
  Code2,
  Eye,
} from "lucide-react";
import ImageUploadButton from "./ImageUploadButton";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onExtractSeo?: (seo: { metaTitle?: string; metaDescription?: string; keywords?: string }) => void;
}

// Custom Div Node Extension to preserve <div> containers and their inline styles (e.g., summary boxes)
const DivNode = Node.create({
  name: "div",
  group: "block",
  content: "block*",
  parseHTML() {
    return [{ tag: "div" }];
  },
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (!attributes.class) return {};
          return { class: attributes.class };
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },
});

// Custom Extensions to preserve inline style="..." on Heading, Paragraph, BulletList, ListItem, Blockquote
const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomBulletList = BulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomListItem = ListItem.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomBlockquote = Blockquote.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
      class: {
        default: "rounded-2xl max-w-full h-auto my-6 shadow-md border border-gray-200 mx-auto block",
        parseHTML: (element) => element.getAttribute("class") || "rounded-2xl max-w-full h-auto my-6 shadow-md border border-gray-200 mx-auto block",
        renderHTML: (attributes) => {
          return { class: attributes.class || "rounded-2xl max-w-full h-auto my-6 shadow-md border border-gray-200 mx-auto block" };
        },
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute("height"),
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return { height: attributes.height };
        },
      },
    };
  },
});


/**
 * Pre-processes full HTML payloads containing <title>, <meta>, comments, and inline CSS.
 * Extracts SEO fields and returns cleaned HTML string for Prosemirror parser.
 */
export function parseAndCleanFullHtmlPayload(rawInput: string): {
  cleanContent: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
} {
  if (!rawInput) return { cleanContent: "" };

  let str = rawInput.trim();

  // 1. Decode HTML entities if present (&lt;h1&gt; -> <h1>)
  if (typeof window !== "undefined" && (str.includes("&lt;") || str.includes("&gt;"))) {
    try {
      const txt = document.createElement("textarea");
      txt.innerHTML = str;
      str = txt.value;
    } catch (e) {
      str = str
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }
  }

  if (typeof window === "undefined") return { cleanContent: str };

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");

    // Extract SEO Metadata if present
    let metaTitle = "";
    let metaDescription = "";
    let keywords = "";

    const titleEl = doc.querySelector("title");
    if (titleEl && titleEl.textContent) metaTitle = titleEl.textContent.trim();

    const metaTitleEl = doc.querySelector('meta[name="title"]');
    if (metaTitleEl && metaTitleEl.getAttribute("content")) {
      metaTitle = metaTitleEl.getAttribute("content")!.trim();
    }

    const metaDescEl = doc.querySelector('meta[name="description"]');
    if (metaDescEl && metaDescEl.getAttribute("content")) {
      metaDescription = metaDescEl.getAttribute("content")!.trim();
    }

    const metaKwEl = doc.querySelector('meta[name="keywords"]');
    if (metaKwEl && metaKwEl.getAttribute("content")) {
      keywords = metaKwEl.getAttribute("content")!.trim();
    }

    // Remove <title> and <meta> elements so they don't break Prosemirror rich text schema
    doc.querySelectorAll("title, meta").forEach((node) => node.remove());

    // Unwrap <article> wrapper if present
    const articleEl = doc.querySelector("article");
    if (articleEl) {
      doc.body.innerHTML = articleEl.innerHTML;
    }

    let bodyHtml = doc.body.innerHTML.trim();

    // Strip HTML comments <!-- ... -->
    bodyHtml = bodyHtml.replace(/<!--[\s\S]*?-->/g, "");

    return {
      cleanContent: bodyHtml,
      metaTitle,
      metaDescription,
      keywords,
    };
  } catch (err) {
    return { cleanContent: str };
  }
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Start typing your rich content here...",
  onExtractSeo,
}: TiptapEditorProps) {
  const [isCodeView, setIsCodeView] = useState(false);
  const [rawCodeText, setRawCodeText] = useState("");

  const initialClean = parseAndCleanFullHtmlPayload(content || "");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        paragraph: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        codeBlock: false,
      }),
      CustomHeading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      CustomParagraph,
      CustomBulletList,
      CustomOrderedList,
      CustomListItem,
      CustomBlockquote,
      DivNode,
      CodeBlockExt.configure({
        HTMLAttributes: {
          class: "rounded-xl bg-gray-900 text-gray-100 p-4 font-mono text-xs my-4 shadow-inner overflow-x-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline font-semibold hover:text-blue-800",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      CustomImage,
    ],
    content: initialClean.cleanContent,
    editorProps: {
      attributes: {
        class:
          "tiptap prose max-w-none min-h-[260px] max-h-[520px] overflow-y-auto p-5 focus:outline-none text-[#0B1120] leading-relaxed",
      },
      // Smart Auto-Parse on Paste: Automatically handles full HTML payloads with <title>, <meta>, inline CSS
      handlePaste(view, event) {
        const pastedText = event.clipboardData?.getData("text/plain") || "";
        if (/<[a-z][\s\S]*>/i.test(pastedText.trim())) {
          event.preventDefault();
          const parsed = parseAndCleanFullHtmlPayload(pastedText);

          editor?.commands.setContent(parsed.cleanContent);
          onChange(parsed.cleanContent);
          setRawCodeText(parsed.cleanContent);

          if (onExtractSeo && (parsed.metaTitle || parsed.metaDescription || parsed.keywords)) {
            onExtractSeo({
              metaTitle: parsed.metaTitle,
              metaDescription: parsed.metaDescription,
              keywords: parsed.keywords,
            });
          }
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setRawCodeText(html);
    },
  });

  // Keep editor content synced if content prop changes externally
  useEffect(() => {
    if (editor && !isCodeView) {
      const parsed = parseAndCleanFullHtmlPayload(content || "");
      const currentHtml = editor.getHTML();
      if (parsed.cleanContent !== currentHtml && content !== currentHtml) {
        editor.commands.setContent(parsed.cleanContent);
        setRawCodeText(parsed.cleanContent);
        if (onExtractSeo && (parsed.metaTitle || parsed.metaDescription || parsed.keywords)) {
          onExtractSeo({
            metaTitle: parsed.metaTitle,
            metaDescription: parsed.metaDescription,
            keywords: parsed.keywords,
          });
        }
      }
    }
  }, [content, editor, isCodeView]);

  if (!editor) {
    return (
      <div className="h-44 w-full animate-pulse rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-400">
        Loading Rich Text Editor...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter Image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const toggleSourceView = () => {
    if (isCodeView) {
      // Switch back to Visual Editor: parse raw code
      const parsed = parseAndCleanFullHtmlPayload(rawCodeText);
      editor.commands.setContent(parsed.cleanContent);
      onChange(parsed.cleanContent);
      if (onExtractSeo && (parsed.metaTitle || parsed.metaDescription || parsed.keywords)) {
        onExtractSeo({
          metaTitle: parsed.metaTitle,
          metaDescription: parsed.metaDescription,
          keywords: parsed.keywords,
        });
      }
      setIsCodeView(false);
    } else {
      // Switch to Source View
      setRawCodeText(editor.getHTML());
      setIsCodeView(true);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs transition focus-within:border-[#0B1120] focus-within:ring-2 focus-within:ring-[#0B1120]/10">
      {/* SINGLE CLEAN TOOLBAR */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/90 px-3 py-2 text-gray-700">
        <div className="flex flex-wrap items-center gap-1">
          {/* Bold */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={isCodeView}
            className={`p-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition ${
              editor.isActive("bold") ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={15} />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={isCodeView}
            className={`p-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition ${
              editor.isActive("italic") ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={15} />
          </button>

          {/* Strike */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={isCodeView}
            className={`p-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition ${
              editor.isActive("strike") ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Strikethrough"
          >
            <Strikethrough size={15} />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* H1 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            disabled={isCodeView}
            className={`px-2 py-1 rounded-lg text-xs font-extrabold hover:bg-gray-200 transition ${
              editor.isActive("heading", { level: 1 }) ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Heading 1 (Main Title)"
          >
            H1
          </button>

          {/* H2 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            disabled={isCodeView}
            className={`px-2 py-1 rounded-lg text-xs font-extrabold hover:bg-gray-200 transition ${
              editor.isActive("heading", { level: 2 }) ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Heading 2 (Section Title)"
          >
            H2
          </button>

          {/* H3 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            disabled={isCodeView}
            className={`px-2 py-1 rounded-lg text-xs font-extrabold hover:bg-gray-200 transition ${
              editor.isActive("heading", { level: 3 }) ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Heading 3 (Subheading)"
          >
            H3
          </button>

          {/* H4 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            disabled={isCodeView}
            className={`px-2 py-1 rounded-lg text-xs font-extrabold hover:bg-gray-200 transition ${
              editor.isActive("heading", { level: 4 }) ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Heading 4"
          >
            H4
          </button>

          {/* Paragraph */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            disabled={isCodeView}
            className={`p-1.5 rounded-lg text-xs hover:bg-gray-200 transition ${
              editor.isActive("paragraph") ? "bg-gray-200 font-bold" : "text-gray-700"
            } disabled:opacity-30`}
            title="Normal Paragraph"
          >
            <Pilcrow size={15} />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={isCodeView}
            className={`p-1.5 rounded-lg text-xs hover:bg-gray-200 transition ${
              editor.isActive("bulletList") ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Bullet List"
          >
            <List size={15} />
          </button>

          {/* Numbered List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={isCodeView}
            className={`p-1.5 rounded-lg text-xs hover:bg-gray-200 transition ${
              editor.isActive("orderedList") ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Numbered List"
          >
            <ListOrdered size={15} />
          </button>

          {/* Blockquote */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={isCodeView}
            className={`p-1.5 rounded-lg text-xs hover:bg-gray-200 transition ${
              editor.isActive("blockquote") ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Quote Block"
          >
            <Quote size={15} />
          </button>

          {/* Code Block */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={isCodeView}
            className={`p-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition ${
              editor.isActive("codeBlock") ? "bg-[#0B1120] text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Code Block (<pre><code>)"
          >
            <Code size={15} />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* Insert Link */}
          <button
            type="button"
            onClick={setLink}
            disabled={isCodeView}
            className={`p-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition ${
              editor.isActive("link") ? "bg-blue-600 text-white" : "text-gray-700"
            } disabled:opacity-30`}
            title="Insert Link"
          >
            <LinkIcon size={15} />
          </button>

          {/* Unlink */}
          {editor.isActive("link") && !isCodeView && (
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 transition"
              title="Remove Link"
            >
              <Unlink size={15} />
            </button>
          )}

          {/* Insert Image URL */}
          <button
            type="button"
            onClick={addImage}
            disabled={isCodeView}
            className="p-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-200 transition disabled:opacity-30"
            title="Insert Image URL"
          >
            <ImageIcon size={15} />
          </button>

          {/* Upload & Insert Image from Device */}
          {!isCodeView && (
            <ImageUploadButton
              compact
              label="Upload Image"
              onUploadSuccess={(url) => {
                editor.chain().focus().setImage({ src: url }).run();
              }}
            />
          )}

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* Undo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo() || isCodeView}
            className="p-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition"
            title="Undo"
          >
            <Undo size={15} />
          </button>

          {/* Redo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo() || isCodeView}
            className="p-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition"
            title="Redo"
          >
            <Redo size={15} />
          </button>
        </div>

        {/* HTML SOURCE TOGGLE BUTTON */}
        <div>
          <button
            type="button"
            onClick={toggleSourceView}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              isCodeView
                ? "bg-[#0B1120] text-white border-[#0B1120]"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
            title={isCodeView ? "Switch to Visual Editor" : "View & Edit Raw HTML Source"}
          >
            {isCodeView ? <Eye size={14} /> : <Code2 size={14} />}
            {isCodeView ? "Visual View" : "Source Code"}
          </button>
        </div>
      </div>

      {/* EDITOR CONTENT AREA */}
      {isCodeView ? (
        <div className="p-3 bg-gray-900 text-gray-100">
          <div className="flex items-center justify-between mb-2 px-1 text-[11px] text-gray-400 font-mono">
            <span>HTML Source Mode — Edit or paste raw HTML code</span>
            <span className="text-emerald-400">Auto-compiles on switch</span>
          </div>
          <textarea
            value={rawCodeText}
            onChange={(e) => {
              setRawCodeText(e.target.value);
              onChange(e.target.value);
            }}
            placeholder="Paste your raw HTML string here..."
            className="w-full h-72 bg-gray-950 text-emerald-400 font-mono text-xs p-3 rounded-xl focus:outline-none border border-gray-800 leading-relaxed resize-y"
          />
        </div>
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}
