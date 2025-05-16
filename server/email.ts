import { MailService } from '@sendgrid/mail';
import { Lead } from '@shared/schema';

// Initialize SendGrid mail service
const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY as string);

// List of email recipients for contact form submissions
const NOTIFICATION_RECIPIENTS = [
  'ignacio@cortexuum.com',
  'christian@cortexuum.com'
];

/**
 * Send notification email about new lead submission
 */
export async function sendLeadNotification(lead: Lead): Promise<boolean> {
  try {
    // Format the lead data for the email
    const formattedData = formatLeadData(lead);
    
    await mailService.send({
      to: NOTIFICATION_RECIPIENTS,
      from: 'notifications@cortexuum.com', // This must be a verified sender in your SendGrid account
      subject: `New Lead Submission: ${lead.name} from ${lead.company}`,
      text: formattedData.textContent,
      html: formattedData.htmlContent,
    });
    
    console.log(`Lead notification sent for ${lead.name}`);
    return true;
  } catch (error) {
    console.error('Failed to send lead notification email:', error);
    return false;
  }
}

/**
 * Format lead data for email content
 */
function formatLeadData(lead: Lead) {
  // Text version
  const textContent = `
New Contact Form Submission

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}
Company: ${lead.company}
Business Type: ${lead.business_type || 'Not provided'}
Company Size: ${lead.company_size || 'Not provided'}
Annual Revenue: ${lead.annual_revenue || 'Not provided'}
Average Client Value: ${lead.client_value || 'Not provided'}
Message: ${lead.message || 'Not provided'}

Submitted on: ${new Date().toLocaleString()}
`;

  // HTML version
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4a6cf7; color: white; padding: 10px 20px; border-radius: 5px 5px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; }
    .footer { margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${lead.name}
      </div>
      <div class="field">
        <span class="label">Email:</span> ${lead.email}
      </div>
      <div class="field">
        <span class="label">Phone:</span> ${lead.phone || 'Not provided'}
      </div>
      <div class="field">
        <span class="label">Company:</span> ${lead.company}
      </div>
      <div class="field">
        <span class="label">Business Type:</span> ${lead.business_type || 'Not provided'}
      </div>
      <div class="field">
        <span class="label">Company Size:</span> ${lead.company_size || 'Not provided'}
      </div>
      <div class="field">
        <span class="label">Annual Revenue:</span> ${lead.annual_revenue || 'Not provided'}
      </div>
      <div class="field">
        <span class="label">Average Client Value:</span> ${lead.client_value || 'Not provided'}
      </div>
      <div class="field">
        <span class="label">Message:</span> ${lead.message || 'Not provided'}
      </div>
      <div class="footer">
        Submitted on: ${new Date().toLocaleString()}
      </div>
    </div>
  </div>
</body>
</html>
`;

  return { textContent, htmlContent };
}