import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import { getAuthUser } from "@/lib/auth";
import { sendNewsletterNotification } from "@/lib/nodemailer";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const body = await req.json();
    const { subject, content, targetUserEmail } = body;

    if (!subject || !content) {
      return NextResponse.json(
        { error: "Subject and content are required" },
        { status: 400 }
      );
    }

    let recipients = [];
    if (targetUserEmail) {
      recipients = await User.find({ email: targetUserEmail.toLowerCase() });
    } else {
      recipients = await User.find({ role: "user" });
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No users found to notify" },
        { status: 404 }
      );
    }

    let sentCount = 0;
    for (const recipient of recipients) {
      const success = await sendNewsletterNotification({
        recipientEmail: recipient.email,
        recipientName: recipient.name,
        subject,
        content,
      });
      if (success) sentCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Notification broadcast completed. Sent emails to ${sentCount} user(s).`,
      totalRecipients: recipients.length,
      sentCount,
    });
  } catch (error: any) {
    console.error("Broadcast Notification Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send notification email" },
      { status: 500 }
    );
  }
}
