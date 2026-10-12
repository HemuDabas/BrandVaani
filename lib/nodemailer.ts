import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "BrandVaani@gmail.com";
const SMTP_PASS = process.env.SMTP_PASS || "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "BrandVaani@gmail.com";

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER && SMTP_PASS ? {
    user: SMTP_USER,
    pass: SMTP_PASS,
  } : undefined,
  tls: {
    rejectUnauthorized: false
  }
});

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function sendContactEmails({
  name,
  email,
  phone,
  service,
  message,
}: ContactEmailProps) {
  try {
    // 1. Send Notification Email to Admin
    const adminMailOptions = {
      from: `"BrandVaani Web Alerts" <${SMTP_USER || "no-reply@brandvaani.com"}>`,
      to: ADMIN_EMAIL,
      subject: `🔥 New Contact Inquiry from ${name} - BrandVaani`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px; color: #0B1120;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="text-align: center; border-bottom: 2px solid #0B1120; padding-bottom: 15px; margin-bottom: 25px;">
              <h1 style="color: #0B1120; margin: 0; font-size: 24px; font-weight: bold;">Brand<span style="color: #3b82f6;">Vaani</span></h1>
              <p style="color: #64748b; font-size: 12px; margin-top: 5px; font-weight: 600; letter-spacing: 1px;">NEW USER INQUIRY NOTIFICATION</p>
            </div>

            <p style="font-size: 16px; color: #1e293b;">You have received a new inquiry from your website contact form:</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; font-weight: bold; color: #475569; width: 120px;">Name:</td>
                <td style="padding: 10px; color: #0f172a;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 10px; color: #0f172a;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; font-weight: bold; color: #475569;">Phone:</td>
                <td style="padding: 10px; color: #0f172a;">${phone || "Not provided"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; font-weight: bold; color: #475569;">Service:</td>
                <td style="padding: 10px; color: #0f172a;"><span style="background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600;">${service || "General Inquiry"}</span></td>
              </tr>
            </table>

            <div style="margin-top: 25px; background: #f8fafc; border-left: 4px solid #0B1120; padding: 15px; border-radius: 4px;">
              <p style="margin: 0 0 8px 0; font-weight: bold; color: #334155;">User Message:</p>
              <p style="margin: 0; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              This notification was generated automatically by BrandVaani Website API.
            </div>
          </div>
        </div>
      `,
    };

    // 2. Send Confirmation Email to User
    const userMailOptions = {
      from: `"BrandVaani Team" <${SMTP_USER || "no-reply@brandvaani.com"}>`,
      to: email,
      subject: `We received your message! - BrandVaani`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px; color: #0B1120;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="text-align: center; border-bottom: 2px solid #0B1120; padding-bottom: 15px; margin-bottom: 25px;">
              <h1 style="color: #0B1120; margin: 0; font-size: 26px; font-weight: bold;">Brand<span style="color: #3b82f6;">Vaani</span></h1>
              <p style="color: #64748b; font-size: 12px; margin-top: 5px; font-weight: 600; letter-spacing: 1px;">DIGITAL MARKETING & GROWTH PARTNER</p>
            </div>

            <h2 style="color: #0B1120; font-size: 20px;">Hello ${name},</h2>
            <p style="font-size: 15px; color: #334155; line-height: 1.6;">
              Thank you for getting in touch with <strong>BrandVaani</strong>. We have received your inquiry regarding <strong>${service || "our services"}</strong> and our team is reviewing your requirement.
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin: 25px 0;">
              <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: bold; color: #64748b; text-transform: uppercase;">Summary of your message:</p>
              <p style="margin: 0; color: #1e293b; line-height: 1.5; font-style: italic;">"${message}"</p>
            </div>

            <p style="font-size: 15px; color: #334155; line-height: 1.6;">
              One of our digital marketing experts will reach back to you via email or phone within 24 hours to discuss how we can help grow your business online.
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-weight: bold; color: #0B1120; font-size: 14px;">Best Regards,</p>
              <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Team BrandVaani</p>
              <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px;">Dwarka, New Delhi, India | +91 9919602425 | BrandVaani@gmail.com</p>
            </div>
          </div>
        </div>
      `,
    };

    if (SMTP_PASS) {
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(userMailOptions);
      console.log("Successfully sent emails via Nodemailer to admin and user!");
    } else {
      console.log("[Nodemailer Info] SMTP_PASS not set in .env.local. Emails logged to server console:");
      console.log("Admin Email:", adminMailOptions.subject);
      console.log("User Email:", userMailOptions.subject);
    }
    return true;
  } catch (error) {
    console.error("Error sending email via Nodemailer:", error);
    return false;
  }
}

// Nodemailer function to send email notification to Admin when a new user registers!
export async function sendUserRegistrationEmailToAdmin({
  name,
  email,
  authMethod = "Email / Password",
}: {
  name: string;
  email: string;
  authMethod?: string;
}) {
  try {
    const mailOptions = {
      from: `"BrandVaani User Registration" <${SMTP_USER || "no-reply@brandvaani.com"}>`,
      to: ADMIN_EMAIL,
      subject: `🎉 New User Registered to BrandVaani: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px; color: #0B1120;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="text-align: center; border-bottom: 2px solid #0B1120; padding-bottom: 15px; margin-bottom: 25px;">
              <h1 style="color: #0B1120; margin: 0; font-size: 24px; font-weight: bold;">Brand<span style="color: #3b82f6;">Vaani</span></h1>
              <p style="color: #64748b; font-size: 12px; margin-top: 5px; font-weight: 600; letter-spacing: 1px;">NEW USER REGISTRATION NOTIFICATION</p>
            </div>

            <p style="font-size: 16px; color: #1e293b;">A new user has just registered on BrandVaani platform:</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; font-weight: bold; color: #475569; width: 140px;">User Name:</td>
                <td style="padding: 10px; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; font-weight: bold; color: #475569;">User Email:</td>
                <td style="padding: 10px; color: #0f172a;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px; font-weight: bold; color: #475569;">Registration Method:</td>
                <td style="padding: 10px; color: #0f172a;"><span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600;">${authMethod}</span></td>
              </tr>
            </table>

            <div style="margin-top: 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              You can view all registered users inside your Admin Dashboard -> Users & Emails.
            </div>
          </div>
        </div>
      `,
    };

    if (SMTP_PASS) {
      await transporter.sendMail(mailOptions);
      console.log(`[Nodemailer] Sent User Registration email notification to Admin (${ADMIN_EMAIL})`);
    } else {
      console.log(`[Nodemailer Log] New User Registered: ${name} (${email}) - Admin notified.`);
    }
    return true;
  } catch (err) {
    console.error("Failed to send user registration email to admin:", err);
    return false;
  }
}

export async function sendNewsletterNotification({
  recipientEmail,
  recipientName,
  subject,
  content,
}: {
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  content: string;
}) {
  try {
    const mailOptions = {
      from: `"BrandVaani Announcements" <${SMTP_USER || "no-reply@brandvaani.com"}>`,
      to: recipientEmail,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px; color: #0B1120;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="text-align: center; border-bottom: 2px solid #0B1120; padding-bottom: 15px; margin-bottom: 25px;">
              <h1 style="color: #0B1120; margin: 0; font-size: 26px; font-weight: bold;">Brand<span style="color: #3b82f6;">Vaani</span></h1>
              <p style="color: #64748b; font-size: 12px; margin-top: 5px; font-weight: 600;">LATEST UPDATE</p>
            </div>
            <h2 style="color: #0B1120; font-size: 18px;">Hello ${recipientName || "Valued Partner"},</h2>
            <div style="font-size: 15px; color: #334155; line-height: 1.6; margin: 20px 0;">
              ${content}
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
              You are receiving this email because you signed up on BrandVaani.
            </div>
          </div>
        </div>
      `,
    };

    if (SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log(`[Nodemailer Broadcast Log] To: ${recipientEmail}, Subject: ${subject}`);
    }
    return true;
  } catch (err) {
    console.error(`Failed to send email to ${recipientEmail}`, err);
    return false;
  }
}
