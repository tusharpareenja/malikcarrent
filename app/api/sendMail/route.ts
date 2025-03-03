import { NextResponse } from "next/server";
const nodemailer = await import("nodemailer");


export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { name, email, message, phone } = await req.json() as { name: string; email: string; message: string; phone: string; };

    // Validate input
    if (!name || !email || !message || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Ensure environment variables are defined
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      console.error("Missing email environment variables");
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `New mail from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n Phone: ${phone}\nMessage:\n${message}`,
    });

    return NextResponse.json({ message: "Collaboration request sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending collaboration request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
