/**
 * api/contact.js
 *
 * Vercel Serverless Function (Edge / Node runtime).
 * Handles contact form submissions with rate-limiting, honeypot protection, and Resend delivery.
 */

// In-memory sliding window rate limiter
const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const records = ipRequestCounts.get(ip) || [];
  // Keep only records within the window
  const recentRecords = records.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (recentRecords.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  recentRecords.push(now);
  ipRequestCounts.set(ip, recentRecords);
  return false;
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
  }

  try {
    const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";

    // 1. Rate Limiting Check
    if (isRateLimited(ip)) {
      return res.status(429).json({
        success: false,
        error: "Too many messages sent. Please wait a few minutes or reach out via direct email.",
      });
    }

    const { name, email, subject, message, hp, renderedAt } = req.body || {};

    // 2. Anti-spam Honeypot Check
    if (hp) {
      // Silently accept bots to avoid alerting spammers
      return res.status(200).json({ success: true, message: "Message received." });
    }

    // 3. Minimum submission time check (bots submit instantaneously)
    if (renderedAt && Date.now() - Number(renderedAt) < 1200) {
      return res.status(200).json({ success: true, message: "Message received." });
    }

    // 4. Input Validation & Sanitization
    const trimmedName = (name || "").trim().slice(0, 100);
    const trimmedEmail = (email || "").trim().slice(0, 100);
    const trimmedSubject = (subject || "").trim().slice(0, 150);
    const trimmedMessage = (message || "").trim().slice(0, 2000);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required fields.",
      });
    }

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    // 5. Deliver via Resend if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "thivankatharuka36@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    if (resendApiKey) {
      const emailPayload = {
        from: fromEmail,
        to: [toEmail],
        reply_to: trimmedEmail,
        subject: `[Portfolio] ${trimmedSubject || `Message from ${trimmedName}`}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 24px; color: #1a1a1a; line-height: 1.6;">
            <h2 style="color: #6366f1; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">New Portfolio Contact</h2>
            <p><strong>From:</strong> ${trimmedName} (${trimmedEmail})</p>
            <p><strong>Subject:</strong> ${trimmedSubject || "General Inquiry"}</p>
            <div style="background: #f9fafb; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; border-radius: 4px;">
              <p style="white-space: pre-wrap; margin: 0;">${trimmedMessage}</p>
            </div>
            <p style="font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 12px;">
              Sent via https://www.thivankatharuka.tech · IP: ${ip}
            </p>
          </div>
        `,
      };

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        console.error("[api/contact] Resend error:", errorText);
        // Fall back to accepting message and instructing client
        return res.status(200).json({
          success: true,
          delivered: false,
          message: "Message logged successfully.",
        });
      }
    } else {
      console.info("[api/contact] Form submission received (RESEND_API_KEY not configured):", {
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        messageLength: trimmedMessage.length,
      });
    }

    return res.status(200).json({
      success: true,
      delivered: true,
      message: "Thank you! Your message has been sent successfully. I will reply within 24–48 hours.",
    });
  } catch (err) {
    console.error("[api/contact] Handler exception:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error while transmitting your message. Please use direct email.",
    });
  }
}
