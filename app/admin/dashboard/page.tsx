"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Layers,
  FolderKanban,
  Tags,
  MessageSquareText,
  Users,
  HelpCircle,
  Plus,
  Trash2,
  LogOut,
  Send,
  Loader2,
  ExternalLink,
  BookOpen,
  MapPin,
  Sparkles,
  Search,
  Code,
  Globe,
  Tag,
  Pencil,
  Bold,
  Link as LinkIcon,
  Heading,
  List,
  Quote,
  Image as ImageIcon,
  CheckCircle,
  X,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import TiptapEditor from "@/app/components/TiptapEditor";
import ImageUploadButton from "@/app/components/ImageUploadButton";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "services" | "blogs" | "portfolio" | "categories" | "faqs" | "queries" | "users"
  >("services");

  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);

  // Data states
  const [services, setServices] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);

  // Service Form State
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    slug: "",
    category: "Digital Marketing",
    location: "Global",
    image: "",
    short: "",
    description: "",
    iconName: "Search",
    pointsText: "",
    keywords: "",
    metaTitle: "",
    metaDescription: "",
  });

  // Blog Form State
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    category: "Digital Marketing",
    location: "Global",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    short: "",
    description: "",
    author: "BrandVaani Team",
    readTime: "5 min read",
    keywords: "",
    metaTitle: "",
    metaDescription: "",
  });

  // Project Form State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "Digital Marketing",
    description: "",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    size: "small",
    link: "",
  });

  // FAQ Form State
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState<"service" | "portfolio" | "blog">("portfolio");
  const [catFilterType, setCatFilterType] = useState<"all" | "service" | "portfolio" | "blog">("all");
  const [catSearchQuery, setCatSearchQuery] = useState("");

  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastContent, setBroadcastContent] = useState("");
  const [sendingBroadcast, setSendingBroadcast] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const res = await fetch("/api/auth/user/me");
      const data = await res.json();
      if (!data.authenticated || data.user.role !== "admin") {
        toast.error("Unauthorized admin access. Please login.");
        router.push("/brandvaani/shield/admin/login");
        return;
      }
      setAdminUser(data.user);
      fetchAllData();
    } catch (err) {
      router.push("/brandvaani/shield/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    fetchServices();
    fetchBlogs();
    fetchProjects();
    fetchCategories();
    fetchFAQs();
    fetchContacts();
    fetchUsers();
  };

  const fetchServices = async () => {
    const res = await fetch("/api/services", { cache: "no-store" });
    const data = await res.json();
    if (data.success) setServices(data.services);
  };

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs", { cache: "no-store" });
    const data = await res.json();
    if (data.success) setBlogs(data.blogs);
  };

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    if (data.success) setProjects(data.projects);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    if (data.success) setCategories(data.categories);
  };

  const fetchFAQs = async () => {
    const res = await fetch("/api/faqs");
    const data = await res.json();
    if (data.success) setFaqs(data.faqs);
  };

  const fetchContacts = async () => {
    const res = await fetch("/api/admin/contacts");
    const data = await res.json();
    if (data.success) setContacts(data.contacts);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    if (data.success) setUsersList(data.users);
  };

  // Service Handlers
  const handleServiceTitleChange = (titleVal: string) => {
    const autoSlug = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setServiceForm((prev) => ({
      ...prev,
      title: titleVal,
      slug: prev.slug && editingServiceId ? prev.slug : autoSlug,
      metaTitle: prev.metaTitle || titleVal,
    }));
  };

  const handleOpenNewService = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: "",
      slug: "",
      category: "Digital Marketing",
      location: "Global",
      image: "",
      short: "",
      description: "",
      iconName: "Search",
      pointsText: "",
      keywords: "",
      metaTitle: "",
      metaDescription: "",
    });
    setShowServiceModal(true);
  };

  const handleEditService = (serv: any) => {
    setEditingServiceId(serv._id || serv.serviceId);
    setServiceForm({
      title: serv.title || "",
      slug: serv.serviceId || serv.slug || "",
      category: serv.category || "Digital Marketing",
      location: serv.location || "Global",
      image: serv.image || "",
      short: serv.short || "",
      description: serv.description || "",
      iconName: serv.iconName || "Search",
      pointsText: Array.isArray(serv.points) ? serv.points.join("\n") : "",
      keywords: serv.keywords || "",
      metaTitle: serv.metaTitle || serv.title || "",
      metaDescription: serv.metaDescription || serv.short || "",
    });
    setShowServiceModal(true);
  };

  const handleAddOrUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const points = serviceForm.pointsText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const url = editingServiceId ? `/api/services/${editingServiceId}` : "/api/services";
      const method = editingServiceId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...serviceForm,
          serviceId: serviceForm.slug || serviceForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          points,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(editingServiceId ? "Service updated successfully!" : "Service page created!");
      setShowServiceModal(false);
      setEditingServiceId(null);
      fetchServices();
    } catch (err: any) {
      toast.error(err.message || "Failed to save service");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Service deleted");
      fetchServices();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Blog Handlers
  const handleBlogTitleChange = (titleVal: string) => {
    const autoSlug = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setBlogForm((prev) => ({
      ...prev,
      title: titleVal,
      slug: prev.slug && editingBlogSlug ? prev.slug : autoSlug,
      metaTitle: prev.metaTitle || titleVal,
    }));
  };

  const handleOpenNewBlog = () => {
    setEditingBlogSlug(null);
    setBlogForm({
      title: "",
      slug: "",
      category: "Digital Marketing",
      location: "Global",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      short: "",
      description: "",
      author: "BrandVaani Team",
      readTime: "5 min read",
      keywords: "",
      metaTitle: "",
      metaDescription: "",
    });
    setShowBlogModal(true);
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlogSlug(blog.slug || blog._id);
    setBlogForm({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "Digital Marketing",
      location: blog.location || "Global",
      image: blog.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      short: blog.short || "",
      description: blog.description || "",
      author: blog.author || "BrandVaani Team",
      readTime: blog.readTime || "5 min read",
      keywords: blog.keywords || "",
      metaTitle: blog.metaTitle || blog.title || "",
      metaDescription: blog.metaDescription || blog.short || "",
    });
    setShowBlogModal(true);
  };

  const handleAddOrUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug =
        blogForm.slug ||
        blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

      const url = editingBlogSlug ? `/api/blogs/${editingBlogSlug}` : "/api/blogs";
      const method = editingBlogSlug ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blogForm,
          slug,
          metaTitle: blogForm.metaTitle || blogForm.title,
          metaDescription: blogForm.metaDescription || blogForm.short,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(editingBlogSlug ? "Blog post updated successfully!" : "Blog post published successfully!");
      setShowBlogModal(false);
      setEditingBlogSlug(null);
      fetchBlogs();
    } catch (err: any) {
      toast.error(err.message || "Failed to save blog post");
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      toast.success("Blog post deleted");
      fetchBlogs();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Formatting Toolbar Helper for Content Textareas (Bold, Links, Headings, Lists, Images)
  const insertContentFormat = (target: "blog" | "service", tag: string) => {
    let snippet = "";
    if (tag === "bold") snippet = " <strong>bold text</strong> ";
    if (tag === "link") snippet = ' <a href="https://brandvaani.com" target="_blank" rel="noopener noreferrer">Link Text</a> ';
    if (tag === "h2") snippet = "\n<h2>Subheading Title</h2>\n";
    if (tag === "h3") snippet = "\n<h3>Section Subtitle</h3>\n";
    if (tag === "p") snippet = "\n<p>Write paragraph explanation text here...</p>\n";
    if (tag === "ul") snippet = "\n<ul>\n  <li>Bullet item 1</li>\n  <li>Bullet item 2</li>\n</ul>\n";
    if (tag === "ol") snippet = "\n<ol>\n  <li>Numbered step 1</li>\n  <li>Numbered step 2</li>\n</ol>\n";
    if (tag === "quote") snippet = "\n整quote>\"Important quote or key takeaway text here\"</blockquote>\n";
    if (tag === "image") snippet = '\n<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" alt="Image description" className="w-full rounded-2xl my-4" />\n';

    if (target === "blog") {
      setBlogForm((prev) => ({ ...prev, description: prev.description + snippet }));
    } else {
      setServiceForm((prev) => ({ ...prev, description: prev.description + snippet }));
    }
  };

  // Portfolio Handlers
  const handleOpenNewProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: "",
      category: "Digital Marketing",
      description: "",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      size: "small",
      link: "",
    });
    setShowProjectModal(true);
  };

  const handleEditProject = (proj: any) => {
    setEditingProjectId(proj._id);
    setProjectForm({
      title: proj.title || "",
      category: proj.category || "Digital Marketing",
      description: proj.description || "",
      image: proj.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      size: proj.size || "small",
      link: proj.link || "",
    });
    setShowProjectModal(true);
  };

  const handleAddOrUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProjectId ? `/api/projects/${editingProjectId}` : "/api/projects";
      const method = editingProjectId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(editingProjectId ? "Project updated successfully!" : "Portfolio project added!");
      setShowProjectModal(false);
      setEditingProjectId(null);
      fetchProjects();
    } catch (err: any) {
      toast.error(err.message || "Failed to save project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete this portfolio project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Project deleted");
      fetchProjects();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // FAQ Handlers
  const handleEditFAQ = (faq: any) => {
    setEditingFaqId(faq._id);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
  };

  const handleAddOrUpdateFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;
    try {
      const url = editingFaqId ? `/api/faqs/${editingFaqId}` : "/api/faqs";
      const method = editingFaqId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: faqQuestion, answer: faqAnswer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(editingFaqId ? "FAQ updated successfully!" : "FAQ added successfully!");
      setEditingFaqId(null);
      setFaqQuestion("");
      setFaqAnswer("");
      fetchFAQs();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete FAQ");
      toast.success("FAQ deleted");
      fetchFAQs();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Category Handlers
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName, type: newCatType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Category created");
      setNewCatName("");
      fetchCategories();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category");
      toast.success("Category deleted");
      fetchCategories();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Contact Inquiry Handlers
  const handleDeleteContact = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete inquiry");
      toast.success("Inquiry deleted");
      fetchContacts();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Send Broadcast Email to Users via Nodemailer
  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastContent) {
      toast.error("Subject and message content required");
      return;
    }

    setSendingBroadcast(true);
    try {
      const res = await fetch("/api/admin/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: broadcastSubject,
          content: broadcastContent,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(data.message || "Emails sent to registered users!");
      setBroadcastSubject("");
      setBroadcastContent("");
    } catch (err: any) {
      toast.error(err.message || "Failed to send notification email");
    } finally {
      setSendingBroadcast(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/user/logout", { method: "POST" });
    toast.success("Logged out from Admin");
    router.push("/brandvaani/shield/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white">
        <Loader2 size={32} className="animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0B1120] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-[#0B1120] text-white p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-8">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute h-8 w-8 rotate-45 rounded-lg bg-white" />
              <div className="absolute h-4 w-4 rotate-45 rounded bg-[#0B1120]" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">BrandVaani</h2>
              <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                Admin SEO & CMS
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === "services"
                  ? "bg-white text-[#0B1120] font-bold"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Layers size={18} /> Services ({services.length})
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-white text-[#0B1120] font-bold"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <BookOpen size={18} /> Blogs & SEO ({blogs.length})
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === "portfolio"
                  ? "bg-white text-[#0B1120] font-bold"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <FolderKanban size={18} /> Portfolio ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === "categories"
                  ? "bg-white text-[#0B1120] font-bold"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Tags size={18} /> Categories ({categories.length})
            </button>

            <button
              onClick={() => setActiveTab("faqs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === "faqs"
                  ? "bg-white text-[#0B1120] font-bold"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <HelpCircle size={18} /> FAQs ({faqs.length})
            </button>

            <button
              onClick={() => setActiveTab("queries")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === "queries"
                  ? "bg-white text-[#0B1120] font-bold"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <MessageSquareText size={18} /> User Queries ({contacts.length})
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === "users"
                  ? "bg-white text-[#0B1120] font-bold"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Users size={18} /> Users & Emails ({usersList.length})
            </button>
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10 space-y-4">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition"
          >
            <ExternalLink size={14} /> Open Live Website
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            <LogOut size={16} /> Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* ================= SERVICES TAB ================= */}
        {activeTab === "services" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold">Services Management</h1>
                <p className="text-sm text-gray-500">
                  Manage service pages categorized under Digital Marketing, Web Development, and Others (GMB & Local SEO).
                </p>
              </div>

              <button
                onClick={handleOpenNewService}
                className="flex items-center gap-2 bg-[#0B1120] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-black transition cursor-pointer"
              >
                <Plus size={18} /> Add New Service Page
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((serv) => (
                <div
                  key={serv._id || serv.serviceId}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                        {serv.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditService(serv)}
                          className="text-gray-600 hover:text-blue-600 transition cursor-pointer flex items-center gap-1 text-xs font-bold bg-gray-100 px-2.5 py-1 rounded-lg hover:bg-blue-50"
                          title="Edit Service Page"
                        >
                          <Pencil size={13} /> Edit
                        </button>
                        <a
                          href={`/services/${serv.serviceId || serv._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                          title="View live service page"
                        >
                          View <ExternalLink size={12} />
                        </a>
                        <button
                          onClick={() => handleDeleteService(serv._id)}
                          className="text-gray-400 hover:text-red-600 transition cursor-pointer p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1120]">{serv.title}</h3>
                    <p className="text-xs font-semibold text-blue-600 mt-1">
                      Slug: /{serv.serviceId || serv.slug}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-1">{serv.short}</p>

                    {serv.keywords && (
                      <div className="mt-3 bg-gray-50 p-2 rounded-lg text-[10px] text-gray-500">
                        <span className="font-bold">SEO Keywords (Hidden on UI):</span> {serv.keywords}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BLOGS TAB ================= */}
        {activeTab === "blogs" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold">Blogs & On-Page SEO</h1>
                <p className="text-sm text-gray-500">
                  Publish & edit location-wise blogs with formatting toolbar, automatic slug generation, and Google SEO keywords.
                </p>
              </div>

              <button
                onClick={handleOpenNewBlog}
                className="flex items-center gap-2 bg-[#0B1120] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-black transition cursor-pointer"
              >
                <Plus size={18} /> Create New Blog Post
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <div
                  key={blog.slug || blog._id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="h-44 w-full bg-gray-100 relative">
                    <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
                    <span className="absolute top-3 left-3 bg-[#0B1120]/80 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">
                      {blog.category}
                    </span>
                    {blog.location && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <MapPin size={10} /> {blog.location}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#0B1120] leading-snug">{blog.title}</h3>
                      <p className="text-xs text-blue-600 font-semibold mt-1">Slug: /{blog.slug}</p>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{blog.short}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="text-gray-600 hover:text-blue-600 transition cursor-pointer flex items-center gap-1 font-bold bg-gray-100 px-2.5 py-1 rounded-lg hover:bg-blue-50"
                          title="Edit Blog Post"
                        >
                          <Pencil size={13} /> Edit
                        </button>
                        <a
                          href={`/blogs/${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                        >
                          View Live <ExternalLink size={12} />
                        </a>
                      </div>

                      <button
                        onClick={() => handleDeleteBlog(blog.slug || blog._id)}
                        className="text-gray-400 hover:text-red-600 transition cursor-pointer p-1"
                        title="Delete Blog Post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PORTFOLIO TAB ================= */}
        {activeTab === "portfolio" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold">Portfolio Projects</h1>
                <p className="text-sm text-gray-500">
                  Add, edit and manage portfolio projects and case studies displayed on the website.
                </p>
              </div>

              <button
                onClick={handleOpenNewProject}
                className="flex items-center gap-2 bg-[#0B1120] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-black transition cursor-pointer"
              >
                <Plus size={18} /> Add New Project
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj) => (
                <div
                  key={proj._id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="h-44 w-full bg-gray-100 overflow-hidden relative">
                    <img src={proj.image} alt={proj.title} className="h-full w-full object-cover" />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="p-2 bg-white/90 text-blue-600 rounded-full shadow hover:bg-white transition cursor-pointer"
                        title="Edit Project"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj._id)}
                        className="p-2 bg-white/90 text-red-600 rounded-full shadow hover:bg-white transition cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      {proj.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#0B1120] mt-1">{proj.title}</h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= CATEGORIES TAB ================= */}
        {activeTab === "categories" && (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">Manage Categories</h1>
            <p className="text-sm text-gray-500 mb-8">
              Create category tags to filter services, blogs and portfolio content.
            </p>

            <form onSubmit={handleAddCategory} className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 flex gap-4 items-end flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Local SEO & GMB"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div className="w-48">
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newCatType}
                  onChange={(e: any) => setNewCatType(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                >
                  <option value="portfolio">Portfolio Category</option>
                  <option value="service">Service Category</option>
                  <option value="blog">Blog Category</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-[#0B1120] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition cursor-pointer"
              >
                Add Category
              </button>
            </form>

            {/* ================= CATEGORY FILTER & CONTROLS ================= */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 mb-6 space-y-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-gray-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Filter Categories
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    (Showing {categories.filter((cat) => {
                      const matchesType = catFilterType === "all" || cat.type === catFilterType;
                      const matchesSearch = !catSearchQuery.trim() || cat.name.toLowerCase().includes(catSearchQuery.trim().toLowerCase());
                      return matchesType && matchesSearch;
                    }).length} of {categories.length})
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Dropdown Filter */}
                  <select
                    value={catFilterType}
                    onChange={(e: any) => setCatFilterType(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none cursor-pointer focus:border-[#0B1120]"
                  >
                    <option value="all">All Types ({categories.length})</option>
                    <option value="service">Service ({categories.filter((c) => c.type === "service").length})</option>
                    <option value="portfolio">Portfolio ({categories.filter((c) => c.type === "portfolio").length})</option>
                    <option value="blog">Blog ({categories.filter((c) => c.type === "blog").length})</option>
                  </select>

                  {/* Search Input */}
                  <div className="relative min-w-[200px]">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={catSearchQuery}
                      onChange={(e) => setCatSearchQuery(e.target.value)}
                      placeholder="Search category name..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-[#0B1120] transition"
                    />
                    {catSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setCatSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xs cursor-pointer"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Filter Pill Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCatFilterType("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    catFilterType === "all"
                      ? "bg-[#0B1120] text-white shadow-2xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All ({categories.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCatFilterType("service")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    catFilterType === "service"
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/50"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 inline-block" />
                  Service ({categories.filter((c) => c.type === "service").length})
                </button>
                <button
                  type="button"
                  onClick={() => setCatFilterType("portfolio")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    catFilterType === "portfolio"
                      ? "bg-purple-600 text-white shadow-2xs"
                      : "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/50"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 inline-block" />
                  Portfolio ({categories.filter((c) => c.type === "portfolio").length})
                </button>
                <button
                  type="button"
                  onClick={() => setCatFilterType("blog")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    catFilterType === "blog"
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/50"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                  Blog ({categories.filter((c) => c.type === "blog").length})
                </button>

                {(catFilterType !== "all" || catSearchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCatFilterType("all");
                      setCatSearchQuery("");
                    }}
                    className="ml-auto text-xs text-gray-500 hover:text-black underline cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            {/* Category List with Filtered Results */}
            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-2xs">
              {(() => {
                const filtered = categories.filter((cat) => {
                  const matchesType = catFilterType === "all" || cat.type === catFilterType;
                  const matchesSearch =
                    !catSearchQuery.trim() ||
                    cat.name.toLowerCase().includes(catSearchQuery.trim().toLowerCase());
                  return matchesType && matchesSearch;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-8 text-center">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        No categories found
                      </p>
                      <p className="text-xs text-gray-400 mb-4">
                        {catSearchQuery
                          ? `No results matching "${catSearchQuery}" in ${catFilterType} categories`
                          : `No categories found for type "${catFilterType}"`}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCatFilterType("all");
                          setCatSearchQuery("");
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    </div>
                  );
                }

                return filtered.map((cat) => {
                  const badgeStyle =
                    cat.type === "service"
                      ? "bg-blue-50 text-blue-700 border border-blue-200/70"
                      : cat.type === "portfolio"
                      ? "bg-purple-50 text-purple-700 border border-purple-200/70"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200/70";

                  return (
                    <div
                      key={cat._id}
                      className="p-4 flex items-center justify-between hover:bg-gray-50/70 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm text-[#0B1120]">{cat.name}</span>
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider ${badgeStyle}`}
                        >
                          {cat.type}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="text-gray-400 hover:text-red-600 transition cursor-pointer p-1 rounded-lg hover:bg-red-50"
                        title={`Delete ${cat.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* ================= FAQs TAB ================= */}
        {activeTab === "faqs" && (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">FAQ Management</h1>
            <p className="text-sm text-gray-500 mb-8">
              Add and edit frequently asked questions displayed on the website.
            </p>

            <form onSubmit={handleAddOrUpdateFAQ} className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">
                  {editingFaqId ? "Edit FAQ Item" : "Add New FAQ"}
                </h3>
                {editingFaqId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFaqId(null);
                      setFaqQuestion("");
                      setFaqAnswer("");
                    }}
                    className="text-xs text-gray-500 hover:text-black underline cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="e.g. How long does GMB local SEO take?"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Answer *
                </label>
                <textarea
                  rows={3}
                  required
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Write full answer explanation..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#0B1120] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition cursor-pointer"
              >
                {editingFaqId ? "Update FAQ Item" : "Add New FAQ"}
              </button>
            </form>

            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-sm">
              {faqs.map((faq) => (
                <div key={faq._id} className="p-5 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-[#0B1120] text-base">{faq.question}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEditFAQ(faq)}
                      className="text-gray-500 hover:text-blue-600 transition p-2 cursor-pointer flex items-center gap-1 text-xs font-bold bg-gray-100 rounded-lg hover:bg-blue-50"
                      title="Edit FAQ"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFAQ(faq._id)}
                      className="text-gray-400 hover:text-red-600 transition shrink-0 p-2 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= USER QUERIES TAB ================= */}
        {activeTab === "queries" && (
          <div>
            <h1 className="text-3xl font-bold mb-2">User Inquiries & Messages</h1>
            <p className="text-sm text-gray-500 mb-8">
              All messages submitted by visitors through the contact form.
            </p>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                      <th className="p-4">Date</th>
                      <th className="p-4">User Details</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Message</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contacts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">
                          No user inquiries yet.
                        </td>
                      </tr>
                    ) : (
                      contacts.map((c) => (
                        <tr key={c._id} className="hover:bg-gray-50/50">
                          <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                            {new Date(c.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-[#0B1120]">{c.name}</p>
                            <p className="text-xs text-gray-500">{c.email}</p>
                            {c.phone && <p className="text-xs text-gray-500">📞 {c.phone}</p>}
                          </td>
                          <td className="p-4">
                            <span className="inline-block bg-blue-50 text-blue-700 font-medium px-2.5 py-1 rounded-lg text-xs">
                              {c.service || "General"}
                            </span>
                          </td>
                          <td className="p-4 text-gray-700 max-w-md whitespace-pre-wrap">
                            {c.message}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteContact(c._id)}
                              className="text-gray-400 hover:text-red-600 transition p-2 cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= USERS & BROADCAST TAB ================= */}
        {activeTab === "users" && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Email Broadcast Form */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Email Notifications</h1>
              <p className="text-sm text-gray-500 mb-6">
                Send updates & promotional newsletters to registered users via Nodemailer.
              </p>

              <form
                onSubmit={handleSendBroadcast}
                className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm"
              >
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    placeholder="🚀 Latest Updates from BrandVaani"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Email Message Content
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={broadcastContent}
                    onChange={(e) => setBroadcastContent(e.target.value)}
                    placeholder="Write announcement or newsletter details here..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sendingBroadcast}
                  className="bg-[#0B1120] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-black transition cursor-pointer flex items-center gap-2"
                >
                  {sendingBroadcast ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending Broadcast...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Broadcast Email
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Registered Users Table */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Registered Users ({usersList.length})</h2>
                <span className="text-xs bg-green-50 text-green-700 font-bold px-3 py-1 rounded-full">
                  Active Database
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                List of user accounts registered on BrandVaani.
              </p>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                        <th className="p-4">User</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {usersList.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="p-8 text-center text-gray-500">
                            No registered users found in database.
                          </td>
                        </tr>
                      ) : (
                        usersList.map((u) => (
                          <tr key={u._id} className="hover:bg-gray-50/50">
                            <td className="p-4">
                              <p className="font-bold text-[#0B1120]">{u.name || "BrandVaani User"}</p>
                              <p className="text-xs text-gray-500">{u.email}</p>
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                                  u.role === "admin"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {u.role || "user"}
                              </span>
                            </td>
                            <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                              {u.createdAt
                                ? new Date(u.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "N/A"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ADD / EDIT SERVICE MODAL */}
      {showServiceModal && (
        <div
          onClick={() => setShowServiceModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-gray-100 my-8 max-h-[90vh] overflow-y-auto relative cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">
                {editingServiceId ? "Edit Service Page" : "Add Service Page with SEO"}
              </h3>
              <button
                type="button"
                onClick={() => setShowServiceModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition cursor-pointer"
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddOrUpdateService} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => handleServiceTitleChange(e.target.value)}
                    placeholder="e.g. GMB Local SEO Optimization"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Auto-Grabbed Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                    placeholder="gmb-local-seo-optimization"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none font-mono text-blue-600"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Service Category *
                  </label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none font-medium"
                  >
                    <option value="Digital Marketing">Digital Marketing Services</option>
                    <option value="Web Development">Web Development Services</option>
                    <option value="Others">Others (GMB, Local SEO & ORM)</option>
                    {categories
                      .filter((c) => c.type === "service")
                      .map((c) => (
                        <option key={c._id || c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Location Target *
                  </label>
                  <input
                    type="text"
                    value={serviceForm.location}
                    onChange={(e) => setServiceForm({ ...serviceForm, location: e.target.value })}
                    placeholder="e.g. Global / Delhi NCR / Mumbai"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold uppercase text-gray-700">
                    Header Banner Image URL (Optional Overlay)
                  </label>
                  <ImageUploadButton
                    label="Upload Image from Device"
                    compact
                    onUploadSuccess={(url) => setServiceForm((prev) => ({ ...prev, image: url }))}
                  />
                </div>
                <input
                  type="text"
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/... or upload from device above"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Short Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.short}
                  onChange={(e) => setServiceForm({ ...serviceForm, short: e.target.value })}
                  placeholder="e.g. High ROI Google Local Map Ranking"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Full Service Content (Tiptap Rich Text Editor) *
                </label>
                <TiptapEditor
                  content={serviceForm.description}
                  onChange={(html) => setServiceForm((prev) => ({ ...prev, description: html }))}
                  onExtractSeo={(seo) => {
                    setServiceForm((prev) => ({
                      ...prev,
                      metaTitle: seo.metaTitle || prev.metaTitle,
                      metaDescription: seo.metaDescription || prev.metaDescription,
                      keywords: seo.keywords || prev.keywords,
                    }));
                  }}
                  placeholder="Detailed description of what this service offers..."
                />
              </div>

              {/* ON-PAGE SEO FIELDS */}
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <h4 className="text-sm font-bold text-[#0B1120] flex items-center gap-1.5">
                  <Sparkles size={16} className="text-blue-600" /> On-Page SEO Configuration
                </h4>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={serviceForm.metaTitle}
                    onChange={(e) => setServiceForm({ ...serviceForm, metaTitle: e.target.value })}
                    placeholder="e.g. GMB Local SEO Services in Delhi & India | BrandVaani"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={serviceForm.metaDescription}
                    onChange={(e) => setServiceForm({ ...serviceForm, metaDescription: e.target.value })}
                    placeholder="Compelling search engine snippet description..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    SEO Keywords (Comma Separated - Hidden on UI, rendered in View Page Source for Google)
                  </label>
                  <input
                    type="text"
                    value={serviceForm.keywords}
                    onChange={(e) => setServiceForm({ ...serviceForm, keywords: e.target.value })}
                    placeholder="gmb optimization, local seo, google map 3 pack, brandvaani"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0B1120] text-white py-3 rounded-xl text-sm font-semibold hover:bg-black cursor-pointer"
                >
                  {editingServiceId ? "Update Service Page" : "Save Service Page"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT BLOG MODAL */}
      {showBlogModal && (
        <div
          onClick={() => setShowBlogModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-3xl w-full shadow-2xl border border-gray-100 my-8 max-h-[90vh] overflow-y-auto relative cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold">
                  {editingBlogSlug ? "Edit Blog Post" : "Publish Blog Post with SEO"}
                </h3>
                <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full">
                  Formatting & SEO Toolbar Ready
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowBlogModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition cursor-pointer"
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddOrUpdateBlog} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => handleBlogTitleChange(e.target.value)}
                    placeholder="e.g. Local SEO Guide for Delhi NCR Businesses"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Auto-Grabbed Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    placeholder="local-seo-guide-delhi-ncr"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none font-mono text-blue-600"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none font-medium"
                  >
                    {Array.from(
                      new Set([
                        "Digital Marketing",
                        "Local SEO & GMB",
                        "Web Development",
                        "E-Commerce",
                        "Branding",
                        ...categories
                          .filter((c) => c.type === "blog")
                          .map((c) => c.name),
                      ])
                    ).map((catName) => (
                      <option key={catName} value={catName}>
                        {catName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Location Target *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.location}
                    onChange={(e) => setBlogForm({ ...blogForm, location: e.target.value })}
                    placeholder="e.g. Delhi NCR / Mumbai / Global"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold uppercase text-gray-700">
                    Featured Cover Image URL *
                  </label>
                  <ImageUploadButton
                    label="Upload Cover from Device"
                    compact
                    onUploadSuccess={(url) => setBlogForm((prev) => ({ ...prev, image: url }))}
                  />
                </div>
                <input
                  type="text"
                  required
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/... or upload from device above"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Short Excerpt / Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.short}
                  onChange={(e) => setBlogForm({ ...blogForm, short: e.target.value })}
                  placeholder="Brief summary that appears on blog cards..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Full Article Content (Tiptap Rich Text Editor) *
                </label>
                <TiptapEditor
                  content={blogForm.description}
                  onChange={(html) => setBlogForm((prev) => ({ ...prev, description: html }))}
                  onExtractSeo={(seo) => {
                    setBlogForm((prev) => ({
                      ...prev,
                      metaTitle: seo.metaTitle || prev.metaTitle,
                      metaDescription: seo.metaDescription || prev.metaDescription,
                      keywords: seo.keywords || prev.keywords,
                    }));
                  }}
                  placeholder="Write full article with headings, bold text, bullet points, links and images..."
                />
              </div>

              {/* ON-PAGE SEO CONFIGURATION */}
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <h4 className="text-sm font-bold text-[#0B1120] flex items-center gap-1.5">
                  <Sparkles size={16} className="text-blue-600" /> On-Page SEO Configuration
                </h4>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={blogForm.metaTitle}
                    onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                    placeholder="Meta Title for Google Search Results..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={blogForm.metaDescription}
                    onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                    placeholder="Search snippet description under 160 characters..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    SEO Keywords (Comma Separated - Hidden on UI, rendered in View Page Source for Google)
                  </label>
                  <input
                    type="text"
                    value={blogForm.keywords}
                    onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
                    placeholder="digital marketing delhi, local seo noida, brandvaani, gmb growth"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0B1120] text-white py-3 rounded-xl text-sm font-semibold hover:bg-black cursor-pointer"
                >
                  {editingBlogSlug ? "Update Blog Article" : "Publish Blog Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT PROJECT MODAL */}
      {showProjectModal && (
        <div
          onClick={() => setShowProjectModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-2xl w-full shadow-2xl border border-gray-100 my-auto max-h-[90vh] overflow-y-auto relative cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">
                {editingProjectId ? "Edit Portfolio Project" : "Add Portfolio Project"}
              </h3>
              <button
                type="button"
                onClick={() => setShowProjectModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition cursor-pointer"
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddOrUpdateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. E-commerce Growth Campaign"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none font-medium"
                >
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Social Media">Social Media</option>
                  {categories
                    .filter((c) => c.type === "portfolio")
                    .map((c) => (
                      <option key={c._id || c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold uppercase text-gray-700">
                    Project Cover Image URL *
                  </label>
                  <ImageUploadButton
                    label="Upload Image from Device"
                    compact
                    onUploadSuccess={(url) => setProjectForm((prev) => ({ ...prev, image: url }))}
                  />
                </div>
                <input
                  type="text"
                  required
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/... or upload from device above"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Description (Tiptap Rich Text Editor) *
                </label>
                <TiptapEditor
                  content={projectForm.description}
                  onChange={(html) => setProjectForm((prev) => ({ ...prev, description: html }))}
                  placeholder="Summary of client outcome with custom formatting..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0B1120] text-white py-3 rounded-xl text-sm font-semibold hover:bg-black cursor-pointer"
                >
                  {editingProjectId ? "Update Project" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
