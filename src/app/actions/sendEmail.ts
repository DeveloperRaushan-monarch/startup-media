"use server";

import nodemailer from "nodemailer";

interface EmailConfig {
  user: string;
  pass: string;
}

const getConfig = (): EmailConfig => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("Missing email credentials in environment variables.");
  }

  return { user, pass };
};

export async function sendContactEmail(formData: FormData) {
  try {
    const { user, pass } = getConfig();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions = {
      from: user,
      to: "sikarwar19oct@gmail.com",
      subject: `New Contact Request: ${subject} from ${name}`,
      text: `You have received a new message from the StartupMedia Contact Form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Request from StartupMedia</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendNewsletterEmail(formData: FormData) {
  try {
    const { user, pass } = getConfig();

    const email = formData.get("email") as string;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions = {
      from: user,
      to: "sikarwar19oct@gmail.com",
      subject: `New Newsletter Subscriber: ${email}`,
      text: `A new user has subscribed to the StartupMedia newsletter:\n\nEmail: ${email}`,
      html: `
        <h3>New Newsletter Subscription</h3>
        <p><strong>Subscriber Email:</strong> ${email}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending newsletter email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
