import { NextResponse } from 'next/server';
import postmarkClient from '@/lib/postmark';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate form data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send email using Postmark
    const emailResult = await postmarkClient.sendEmail({
      From: 'info@darkchemsite.com',
      To: 'info@darkchemsite.com',
      ReplyTo: email, // Add Reply-To header with the sender's email
      Subject: `Contact Form: ${subject}`,
      TextBody: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}

---
Reply directly to this email to respond to ${name}.
      `,
      HtmlBody: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong> ${message}</p>
<hr>
<p><em>Reply directly to this email to respond to ${name}.</em></p>
      `,
      MessageStream: 'outbound'
    });
    
    console.log('Notification email sent successfully:', emailResult.MessageID);

    // Store the user's email in the notification for replying
    // Add the user's email to the notification email for easy reply
    emailResult.To = email;
    
    let confirmationResult = { MessageID: 'not-sent', status: 'skipped' };
    
    // Check if the email domain is the same as our From domain (for Postmark restrictions)
    const userEmailDomain = email.split('@')[1];
    const fromEmailDomain = 'darkchemsite.com';
    
    // Only try to send confirmation email if domains match or we're in development mode
    if (userEmailDomain === fromEmailDomain) {
      try {
        // Send confirmation email to the user
        confirmationResult = await postmarkClient.sendEmail({
          From: 'info@darkchemsite.com',
          To: email,
          Subject: 'Thank you for contacting Dark Chemistry',
          TextBody: `
Dear ${name},

Thank you for contacting us. We have received your message and will get back to you as soon as possible.

Your message details:
Subject: ${subject}
Message: ${message}

Best regards,
The Dark Chemistry Team
          `,
          HtmlBody: `
<h2>Thank you for contacting Dark Chemistry</h2>
<p>Dear ${name},</p>
<p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
<p><strong>Your message details:</strong></p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong> ${message}</p>
<p>Best regards,<br>The Dark Chemistry Team</p>
          `,
          MessageStream: 'outbound'
        });
        
        console.log('Confirmation email sent successfully:', confirmationResult.MessageID);
      } catch (confirmError) {
        console.warn('Could not send confirmation email:', confirmError.message);
        confirmationResult = { 
          MessageID: 'failed', 
          status: 'error', 
          error: confirmError.message 
        };
      }
    } else {
      console.log(`Skipping confirmation email to ${email} due to domain restrictions`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully', 
      details: {
        notificationEmail: {
          messageId: emailResult.MessageID,
          status: 'sent'
        },
        confirmationEmail: {
          messageId: confirmationResult.MessageID,
          status: userEmailDomain === fromEmailDomain ? 'sent' : 'skipped',
          recipient: email
        }
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
