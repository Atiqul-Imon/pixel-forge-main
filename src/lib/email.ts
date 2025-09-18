import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
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

