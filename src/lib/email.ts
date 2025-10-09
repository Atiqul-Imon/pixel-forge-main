import nodemailer from 'nodemailer';

// Namecheap Private Email SMTP Configuration
const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your Namecheap email: hello@pixelforgebd.com
    pass: process.env.EMAIL_PASS, // Your Namecheap email password
  },
  tls: {
    rejectUnauthorized: true
  }
});

export const sendLeadNotification = async (leadData: {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Lead: ${leadData.name} - ${leadData.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Lead Received!</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${leadData.name}</p>
            <p><strong>Email:</strong> ${leadData.email}</p>
            ${leadData.company ? `<p><strong>Company:</strong> ${leadData.company}</p>` : ''}
            <p><strong>Service:</strong> ${leadData.service}</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${leadData.message}</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://pixelforgebd.com/admin" 
               style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Panel
            </a>
          </div>
          
          <div style="margin-top: 20px; font-size: 12px; color: #6b7280;">
            <p>This email was sent from your Pixel Forge website contact form.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Lead notification email sent successfully');
  } catch (error) {
    console.error('Error sending lead notification email:', error);
  }
};

// Auto-reply email function for customers
export const sendAutoReply = async (leadData: {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: leadData.email,
      subject: `Thank You for Contacting Pixel Forge - We'll Reply Within 24 Hours`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <!-- Header with Logo -->
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://pixelforgebd.com/logo/pixelforgelogo2.png" 
                 alt="Pixel Forge" 
                 style="max-width: 200px; height: auto;">
          </div>
          
          <!-- Main Content -->
          <div style="background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; text-align: center;">
              Thank You for Contacting Us! 🙏
            </h1>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 25px;">
              <p style="margin: 0; color: #1e40af; font-size: 16px; line-height: 1.6;">
                Dear <strong>${leadData.name}</strong>,
              </p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              We have successfully received your message regarding <strong>${leadData.service}</strong> and truly appreciate you taking the time to reach out to us.
            </p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1f2937; margin-top: 0; margin-bottom: 15px;">📋 Your Message Summary:</h3>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Service Interest:</strong> ${leadData.service}
              </p>
              ${leadData.company ? `<p style="margin: 5px 0; color: #6b7280; font-size: 14px;"><strong>Company:</strong> ${leadData.company}</p>` : ''}
            </div>
            
            <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
              <h3 style="color: #065f46; margin-top: 0; margin-bottom: 15px;">⏰ What Happens Next?</h3>
              <ul style="color: #047857; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Our team will review your inquiry carefully</li>
                <li style="margin-bottom: 8px;">We'll prepare a detailed response tailored to your needs</li>
                <li style="margin-bottom: 8px;"><strong>You'll receive a reply within 24 hours</strong></li>
                <li>If urgent, feel free to call us at <strong>+880 1714-918360</strong></li>
              </ul>
            </div>
            
            <!-- Services Overview -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1f2937; margin-top: 0; margin-bottom: 15px;">🚀 Our Services Include:</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; color: #4b5563;">
                <div>✅ Custom Website Development</div>
                <div>✅ E-commerce Solutions</div>
                <div>✅ SEO Optimization</div>
                <div>✅ Mobile App Development</div>
                <div>✅ Landing Page Design</div>
                <div>✅ Digital Marketing</div>
              </div>
            </div>
            
            <!-- Contact Information -->
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
              <h3 style="color: #92400e; margin-top: 0; margin-bottom: 15px;">📞 Need Immediate Assistance?</h3>
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong>WhatsApp:</strong> <a href="https://wa.me/8801714918360" style="color: #92400e;">+880 1714-918360</a><br>
                <strong>Email:</strong> <a href="mailto:hello@pixelforgebd.com" style="color: #92400e;">hello@pixelforgebd.com</a><br>
                <strong>Website:</strong> <a href="https://pixelforgebd.com" style="color: #92400e;">pixelforgebd.com</a>
              </p>
            </div>
            
            <!-- Thank You Message -->
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #1f2937; font-size: 16px; margin: 0;">
                Thank you for choosing <strong>Pixel Forge Bangladesh</strong>!<br>
                We look forward to helping you achieve your digital goals.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              This is an automated response. Please do not reply to this email.<br>
              For support, contact us at <a href="mailto:hello@pixelforgebd.com" style="color: #9ca3af;">hello@pixelforgebd.com</a>
            </p>
            <div style="margin-top: 15px;">
              <a href="https://pixelforgebd.com" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">Website</a>
              <a href="https://pixelforgebd.com/portfolio" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">Portfolio</a>
              <a href="https://pixelforgebd.com/contact" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">Contact</a>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Auto-reply email sent successfully to:', leadData.email);
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
  }
};

