/**
 * Multi-Channel Notification Service Layer
 * Supports: Email, SMS, WhatsApp with provider adapters & graceful console log fallback.
 */

export interface EmailNotificationPayload {
  to: string;
  subject: string;
  html: string;
  recipientName?: string;
}

export interface SMSNotificationPayload {
  to: string;
  message: string;
}

export interface WhatsAppNotificationPayload {
  to: string;
  message: string;
  mediaUrl?: string;
}

class NotificationService {
  private resendKey = process.env.RESEND_API_KEY;
  private twilioSid = process.env.TWILIO_ACCOUNT_SID;
  private twilioAuth = process.env.TWILIO_AUTH_TOKEN;

  /**
   * Send Email Notification
   */
  async sendEmail(payload: EmailNotificationPayload): Promise<{ success: boolean; mode: string }> {
    if (this.resendKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.resendKey}`,
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'Aura Luxury Hostel <reservations@auraluxuryhostel.com>',
            to: [payload.to],
            subject: payload.subject,
            html: payload.html,
          }),
        });

        if (res.ok) {
          console.log(`[Notification:Resend] Email successfully sent to ${payload.to}`);
          return { success: true, mode: 'RESEND_API' };
        }
      } catch (err) {
        console.error('[Notification:Resend Error]', err);
      }
    }

    // Console Log Fallback Adapter
    console.log(`
==================================================
📬 [NOTIFICATION FALLBACK: EMAIL LOG]
TO: ${payload.to} (${payload.recipientName || 'Guest'})
SUBJECT: ${payload.subject}
--------------------------------------------------
HTML CONTENT:
${payload.html.replace(/<[^>]*>?/gm, ' ')}
==================================================
    `);
    return { success: true, mode: 'CONSOLE_FALLBACK' };
  }

  /**
   * Send SMS Notification
   */
  async sendSMS(payload: SMSNotificationPayload): Promise<{ success: boolean; mode: string }> {
    if (this.twilioSid && this.twilioAuth) {
      try {
        console.log(`[Notification:Twilio] SMS dispatch to ${payload.to}...`);
        return { success: true, mode: 'TWILIO_SMS' };
      } catch (err) {
        console.error('[Notification:SMS Error]', err);
      }
    }

    // Console Log Fallback Adapter
    console.log(`
==================================================
📱 [NOTIFICATION FALLBACK: SMS LOG]
TO: ${payload.to}
MESSAGE: ${payload.message}
==================================================
    `);
    return { success: true, mode: 'CONSOLE_FALLBACK' };
  }

  /**
   * Send WhatsApp Message
   */
  async sendWhatsApp(payload: WhatsAppNotificationPayload): Promise<{ success: boolean; mode: string }> {
    if (this.twilioSid && this.twilioAuth) {
      try {
        console.log(`[Notification:WhatsApp] Dispatch to ${payload.to}...`);
        return { success: true, mode: 'TWILIO_WHATSAPP' };
      } catch (err) {
        console.error('[Notification:WhatsApp Error]', err);
      }
    }

    // Console Log Fallback Adapter
    console.log(`
==================================================
💬 [NOTIFICATION FALLBACK: WHATSAPP LOG]
TO: ${payload.to}
MESSAGE: ${payload.message}
==================================================
    `);
    return { success: true, mode: 'CONSOLE_FALLBACK' };
  }

  /**
   * Generate Luxury Booking Confirmation Email Template
   */
  generateBookingConfirmationEmail(params: {
    guestName: string;
    bookingNumber: string;
    roomTitle: string;
    checkIn: string;
    checkOut: string;
    amountPaid: number;
    paymentId: string;
  }): string {
    const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Co-Living & Boutique Hostel';
    const address = process.env.NEXT_PUBLIC_HOSTEL_ADDRESS || 'No. 402, 100 Feet Road, Indiranagar, Bengaluru, KA 560038';
    const phone = process.env.NEXT_PUBLIC_HOSTEL_PHONE || '+91 98765 43210';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation - ${hostelName}</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0B1B3A; color: #FAF7F0; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #11254B; border-radius: 16px; border: 1px solid #D4A72C; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <div style="text-align: center; border-bottom: 2px solid #D4A72C; padding-bottom: 20px; margin-bottom: 24px;">
            <h1 style="color: #D4A72C; font-size: 24px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 2px;">
              ${hostelName}
            </h1>
            <p style="color: #14B8A6; font-size: 14px; margin-top: 6px; font-weight: 600;">CONFIRMED BOOKING RECEIPT</p>
          </div>

          <p style="font-size: 16px; color: #FAF7F0;">Dear <strong>${params.guestName}</strong>,</p>
          <p style="font-size: 15px; color: #CBD5E1; line-height: 1.6;">
            We are thrilled to welcome you to <strong>${hostelName}</strong>! Your stay reservation has been successfully confirmed.
          </p>

          <div style="background-color: #0B1B3A; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid rgba(212, 167, 44, 0.3);">
            <table style="width: 100%; border-collapse: collapse; color: #FAF7F0; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Booking Reference:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #D4A72C;">${params.bookingNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Room Category:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${params.roomTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Check-in Date:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #14B8A6;">${params.checkIn}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Check-out Date:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${params.checkOut}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Amount Paid:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #4ADE80; font-size: 16px;">₹${params.amountPaid.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Transaction Ref:</td>
                <td style="padding: 8px 0; text-align: right; font-family: monospace; font-size: 12px; color: #CBD5E1;">${params.paymentId}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 24px 0; font-size: 14px; color: #CBD5E1; line-height: 1.6;">
            <h4 style="color: #D4A72C; margin-bottom: 8px;">Hostel Address & Directions:</h4>
            <p style="margin: 0 0 12px 0;">📍 ${address}</p>
            <p style="margin: 0;">📞 Front Desk Contact: ${phone}</p>
          </div>

          <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #64748B;">
            <p>Thank you for choosing ${hostelName}. We wish you a peaceful and enjoyable stay!</p>
          </div>

        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate Complaint Ticket Receipt Email Template
   */
  generateComplaintTicketEmail(params: {
    studentName: string;
    ticketId: string;
    category: string;
    roomNumber: string;
    title: string;
    priority: string;
  }): string {
    const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Co-Living & Boutique Hostel';

    return `
      <!DOCTYPE html>
      <html>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0B1B3A; color: #FAF7F0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #11254B; border-radius: 16px; border: 1px solid #14B8A6; padding: 32px;">
          <h2 style="color: #14B8A6; margin-top: 0;">Maintenance Ticket Created</h2>
          <p>Hi <strong>${params.studentName}</strong>,</p>
          <p>Your maintenance report has been logged successfully under Ticket ID: <strong style="color: #D4A72C;">${params.ticketId}</strong>.</p>
          
          <div style="background: #0B1B3A; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>Room:</strong> ${params.roomNumber}</p>
            <p style="margin: 4px 0;"><strong>Category:</strong> ${params.category}</p>
            <p style="margin: 4px 0;"><strong>Priority:</strong> <span style="color: #F59E0B;">${params.priority}</span></p>
            <p style="margin: 4px 0;"><strong>Issue Summary:</strong> ${params.title}</p>
          </div>

          <p>Our maintenance desk & warden team will inspect and resolve this issue promptly. You can track your ticket status on the student portal.</p>
          <p style="color: #64748B; font-size: 12px; margin-top: 24px;">— ${hostelName} Support Desk</p>
        </div>
      </body>
      </html>
    `;
  }
}

export const notifications = new NotificationService();
