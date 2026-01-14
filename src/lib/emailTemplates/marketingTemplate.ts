/**
 * Professional Email Marketing Template
 * 
 * This template is designed to be compatible with all major email clients.
 * Uses table-based layout and inline styles for maximum compatibility.
 */

export interface MarketingEmailVariables {
  lead_name?: string;
  company_name?: string;
  service_interest?: string;
  offer?: string;
  cta_url?: string;
  cta_text?: string;
  unsubscribe_url?: string;
  sender_name?: string;
  sender_title?: string;
  company_website?: string;
  company_phone?: string;
  company_email?: string;
  social_facebook?: string;
  social_linkedin?: string;
  social_twitter?: string;
}

/**
 * Replace template variables in HTML
 */
function replaceVariables(html: string, variables: MarketingEmailVariables): string {
  let result = html;
  const varMap: Record<string, string> = {
    'lead_name': variables.lead_name || 'Valued Customer',
    'company_name': variables.company_name || '',
    'service_interest': variables.service_interest || 'our services',
    'offer': variables.offer || '',
    'cta_url': variables.cta_url || 'https://pixelforgebd.com/contact',
    'cta_text': variables.cta_text || 'Get Started Today',
    'unsubscribe_url': variables.unsubscribe_url || 'https://pixelforgebd.com/unsubscribe',
    'sender_name': variables.sender_name || 'Pixel Forge Team',
    'sender_title': variables.sender_title || 'Your Digital Solutions Partner',
    'company_website': variables.company_website || 'https://pixelforgebd.com',
    'company_phone': variables.company_phone || '+880 1234 567890',
    'company_email': variables.company_email || 'hello@pixelforgebd.com',
    'social_facebook': variables.social_facebook || 'https://facebook.com/pixelforgebd',
    'social_linkedin': variables.social_linkedin || 'https://linkedin.com/company/pixelforgebd',
    'social_twitter': variables.social_twitter || 'https://twitter.com/pixelforgebd',
  };

  Object.keys(varMap).forEach(key => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, varMap[key]);
  });

  return result;
}

/**
 * Generate professional marketing email HTML
 */
export function generateMarketingEmailHTML(variables: MarketingEmailVariables = {}): string {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Pixel Forge - Digital Solutions for Your Business</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif;">
  <!-- Wrapper Table -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header with Logo and Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #9333ea 0%, #7e22ce 100%); padding: 40px 30px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <img src="https://pixelforgebd.com/logo/pixelforge.webp" alt="Pixel Forge Logo" width="180" height="auto" style="display: block; max-width: 180px; height: auto;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="color: #ffffff; font-size: 28px; font-weight: bold; line-height: 1.2; padding-top: 10px;">
                    Transform Your Digital Presence
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting Section -->
          <tr>
            <td style="padding: 40px 30px 20px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="color: #1f2937; font-size: 18px; font-weight: 600; line-height: 1.5; padding-bottom: 10px;">
                    Hello {{lead_name}},
                  </td>
                </tr>
                <tr>
                  <td style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                    {{#if company_name}}Thank you for your interest in <strong>{{company_name}}</strong> and {{/if}}your interest in {{service_interest}}. We're excited to help you achieve your digital goals!
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Section -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color: #f9fafb; border-left: 4px solid #9333ea; padding: 25px; border-radius: 4px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #1f2937; font-size: 20px; font-weight: 600; line-height: 1.4; padding-bottom: 15px;">
                          Why Choose Pixel Forge?
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #4b5563; font-size: 15px; line-height: 1.7;">
                          <p style="margin: 0 0 15px 0;">
                            ✨ <strong>Custom Solutions:</strong> Tailored web and mobile applications that match your unique business needs
                          </p>
                          <p style="margin: 0 0 15px 0;">
                            🚀 <strong>Modern Technology:</strong> Built with cutting-edge frameworks for performance and scalability
                          </p>
                          <p style="margin: 0 0 15px 0;">
                            💼 <strong>Expert Team:</strong> Years of experience delivering successful digital projects
                          </p>
                          <p style="margin: 0;">
                            📈 <strong>Ongoing Support:</strong> We're with you every step of the way, from concept to launch and beyond
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Offer Section (if provided) -->

          <!-- Call to Action Button -->
          <tr>
            <td style="padding: 0 30px 40px 30px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="background-color: #9333ea; border-radius: 6px; padding: 0;">
                    <a href="{{cta_url}}" style="display: inline-block; padding: 16px 40px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #9333ea;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Services Preview -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="color: #1f2937; font-size: 18px; font-weight: 600; padding-bottom: 20px; text-align: center;">
                    Our Services
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="50%" style="padding: 0 10px 15px 0; vertical-align: top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 6px; padding: 20px;">
                            <tr>
                              <td style="color: #9333ea; font-size: 24px; padding-bottom: 10px;">🌐</td>
                            </tr>
                            <tr>
                              <td style="color: #1f2937; font-size: 16px; font-weight: 600; padding-bottom: 8px;">Web Development</td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; line-height: 1.5;">Custom websites and web applications</td>
                            </tr>
                          </table>
                        </td>
                        <td width="50%" style="padding: 0 0 15px 10px; vertical-align: top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 6px; padding: 20px;">
                            <tr>
                              <td style="color: #9333ea; font-size: 24px; padding-bottom: 10px;">📱</td>
                            </tr>
                            <tr>
                              <td style="color: #1f2937; font-size: 16px; font-weight: 600; padding-bottom: 8px;">Mobile Apps</td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; line-height: 1.5;">iOS and Android applications</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" style="padding: 10px 10px 0 0; vertical-align: top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 6px; padding: 20px;">
                            <tr>
                              <td style="color: #9333ea; font-size: 24px; padding-bottom: 10px;">🎨</td>
                            </tr>
                            <tr>
                              <td style="color: #1f2937; font-size: 16px; font-weight: 600; padding-bottom: 8px;">UI/UX Design</td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; line-height: 1.5;">Beautiful and intuitive designs</td>
                            </tr>
                          </table>
                        </td>
                        <td width="50%" style="padding: 10px 0 0 10px; vertical-align: top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 6px; padding: 20px;">
                            <tr>
                              <td style="color: #9333ea; font-size: 24px; padding-bottom: 10px;">⚡</td>
                            </tr>
                            <tr>
                              <td style="color: #1f2937; font-size: 16px; font-weight: 600; padding-bottom: 8px;">E-Commerce</td>
                            </tr>
                            <tr>
                              <td style="color: #6b7280; font-size: 14px; line-height: 1.5;">Online stores and marketplaces</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 0 30px 40px 30px; border-top: 1px solid #e5e7eb;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-top: 30px; text-align: center;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; line-height: 1.8;">
                          <strong style="color: #1f2937;">Get in Touch</strong><br/>
                          📧 <a href="mailto:{{company_email}}" style="color: #9333ea; text-decoration: none;">{{company_email}}</a><br/>
                          📞 <a href="tel:{{company_phone}}" style="color: #9333ea; text-decoration: none;">{{company_phone}}</a><br/>
                          🌐 <a href="{{company_website}}" style="color: #9333ea; text-decoration: none;">{{company_website}}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Social Media Links -->
          <tr>
            <td style="padding: 0 30px 40px 30px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="{{social_facebook}}" style="display: inline-block; width: 40px; height: 40px; background-color: #9333ea; border-radius: 50%; text-align: center; line-height: 40px;">
                      <span style="color: #ffffff; font-size: 18px;">f</span>
                    </a>
                  </td>
                  <td style="padding: 0 10px;">
                    <a href="{{social_linkedin}}" style="display: inline-block; width: 40px; height: 40px; background-color: #9333ea; border-radius: 50%; text-align: center; line-height: 40px;">
                      <span style="color: #ffffff; font-size: 18px;">in</span>
                    </a>
                  </td>
                  <td style="padding: 0 10px;">
                    <a href="{{social_twitter}}" style="display: inline-block; width: 40px; height: 40px; background-color: #9333ea; border-radius: 50%; text-align: center; line-height: 40px;">
                      <span style="color: #ffffff; font-size: 18px;">🐦</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="color: #6b7280; font-size: 12px; line-height: 1.6;">
                    <p style="margin: 0 0 10px 0;">
                      Best regards,<br/>
                      <strong style="color: #1f2937;">{{sender_name}}</strong><br/>
                      {{sender_title}}<br/>
                      Pixel Forge
                    </p>
                    <p style="margin: 20px 0 10px 0; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                      This email was sent to you because you expressed interest in our services or subscribed to our newsletter.
                    </p>
                    <p style="margin: 0;">
                      <a href="{{unsubscribe_url}}" style="color: #9333ea; text-decoration: underline;">Unsubscribe</a> | 
                      <a href="{{company_website}}/privacy-policy" style="color: #9333ea; text-decoration: underline;">Privacy Policy</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- End Main Container -->
      </td>
    </tr>
  </table>
  <!-- End Wrapper Table -->
</body>
</html>
  `;

  // Handle conditional company name in greeting
  let processedHTML = html;
  if (variables.company_name) {
    processedHTML = processedHTML.replace(
      /{{#if company_name}}Thank you for your interest in <strong>{{company_name}}<\/strong> and {{\/if}}/g,
      `Thank you for your interest in <strong>${variables.company_name}</strong> and `
    );
  } else {
    processedHTML = processedHTML.replace(
      /{{#if company_name}}Thank you for your interest in <strong>{{company_name}}<\/strong> and {{\/if}}/g,
      ''
    );
  }

  // Replace all other variables
  processedHTML = replaceVariables(processedHTML, variables);

  // Handle conditional offer section
  if (variables.offer) {
    const offerSection = `
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; padding: 25px; text-align: center;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #92400e; font-size: 18px; font-weight: bold; padding-bottom: 10px;">
                          🎉 Special Offer Just For You!
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #78350f; font-size: 16px; line-height: 1.6;">
                          ${variables.offer}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
    `;
    processedHTML = processedHTML.replace('<!-- Offer Section (if provided) -->', offerSection);
  } else {
    processedHTML = processedHTML.replace('<!-- Offer Section (if provided) -->', '');
  }

  return processedHTML;
}

/**
 * Generate plain text version of marketing email
 */
export function generateMarketingEmailText(variables: MarketingEmailVariables = {}): string {
  const leadName = variables.lead_name || 'Valued Customer';
  const companyName = variables.company_name || '';
  const serviceInterest = variables.service_interest || 'our services';
  const ctaUrl = variables.cta_url || 'https://pixelforgebd.com/contact';
  const ctaText = variables.cta_text || 'Get Started Today';
  const senderName = variables.sender_name || 'Pixel Forge Team';

  return `
Hello ${leadName},

${companyName ? `Thank you for your interest in ${companyName} and ` : ''}your interest in ${serviceInterest}. We're excited to help you achieve your digital goals!

Why Choose Pixel Forge?

✨ Custom Solutions: Tailored web and mobile applications that match your unique business needs
🚀 Modern Technology: Built with cutting-edge frameworks for performance and scalability
💼 Expert Team: Years of experience delivering successful digital projects
📈 Ongoing Support: We're with you every step of the way, from concept to launch and beyond

${variables.offer ? `\n🎉 Special Offer Just For You!\n${variables.offer}\n` : ''}

${ctaText}: ${ctaUrl}

Our Services:
- Web Development: Custom websites and web applications
- Mobile Apps: iOS and Android applications
- UI/UX Design: Beautiful and intuitive designs
- E-Commerce: Online stores and marketplaces

Get in Touch:
📧 ${variables.company_email || 'hello@pixelforgebd.com'}
📞 ${variables.company_phone || '+880 1234 567890'}
🌐 ${variables.company_website || 'https://pixelforgebd.com'}

Best regards,
${senderName}
${variables.sender_title || 'Your Digital Solutions Partner'}
Pixel Forge

---
This email was sent to you because you expressed interest in our services or subscribed to our newsletter.
To unsubscribe, visit: ${variables.unsubscribe_url || 'https://pixelforgebd.com/unsubscribe'}
  `.trim();
}

