import { Resend } from 'resend';
import { Lead } from '@shared/schema';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'Cortexuum <no-reply@cortexum.com>';
const NOTIFICATION_RECIPIENTS = [
  'christian@cortexuum.com',
  'dev@ignacionunez.dev',
];

/**
 * Send notification email about new lead submission
 */
export async function sendLeadNotification(lead: Lead): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    return false;
  }

  try {
    const { htmlContent, textContent, subject } = formatLeadEmail(lead);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_RECIPIENTS,
      replyTo: lead.email,
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return false;
    }

    console.log(`Lead notification sent for ${lead.name}`);
    return true;
  } catch (error) {
    console.error('Failed to send lead notification email:', error);
    return false;
  }
}

function formatLeadEmail(lead: Lead) {
  const submittedAt = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const isPageReview = lead.business_type === 'Landing Page Review';
  const subject = isPageReview
    ? `🔍 New Page Review Request — ${lead.name}`
    : `🚀 New Lead — ${lead.name}${lead.company ? ` from ${lead.company}` : ''}`;

  const fields = buildFields(lead, isPageReview);

  const textContent = [
    isPageReview ? 'New Landing Page Review Request' : 'New Lead Submission',
    '─'.repeat(40),
    ...fields.map((f) => `${f.label}: ${f.value}`),
    '',
    `Submitted: ${submittedAt}`,
  ].join('\n');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo / Brand -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:28px;font-weight:800;letter-spacing:-0.5px;color:#ffffff;">CORTEXUUM</span>
              <span style="display:block;font-size:11px;letter-spacing:3px;color:#7c5cfc;text-transform:uppercase;margin-top:2px;">AI Marketing</span>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background:linear-gradient(145deg,#141420 0%,#1a1a2e 100%);border:1px solid #2a2a40;border-radius:16px;overflow:hidden;">

              <!-- Header Bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#7c5cfc 0%,#5b3fd4 50%,#4a2fb3 100%);padding:24px 32px;">
                    <span style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);font-weight:600;">${isPageReview ? 'Page Review Request' : 'New Lead'}</span>
                    <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">
                      ${lead.name}
                    </h1>
                    ${lead.company && !isPageReview ? `<span style="font-size:14px;color:rgba(255,255,255,0.8);">${lead.company}</span>` : ''}
                  </td>
                </tr>
              </table>

              <!-- Quick Actions -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px 32px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        ${lead.email ? `
                        <td style="padding-right:12px;">
                          <a href="mailto:${lead.email}" style="display:inline-block;padding:8px 18px;background:#7c5cfc;color:#fff;font-size:13px;font-weight:600;text-decoration:none;border-radius:8px;">Reply to Lead</a>
                        </td>` : ''}
                        ${lead.phone ? `
                        <td>
                          <a href="tel:${lead.phone}" style="display:inline-block;padding:8px 18px;background:rgba(124,92,252,0.15);color:#a78bfa;font-size:13px;font-weight:600;text-decoration:none;border-radius:8px;border:1px solid rgba(124,92,252,0.3);">Call ${lead.phone}</a>
                        </td>` : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Fields -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:24px 32px 32px;">
                    ${fields
                      .map(
                        (f) => `
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:${f.isLong ? '16px' : '12px'};">
                      <tr>
                        <td style="padding:${f.isLong ? '14px 16px' : '10px 16px'};background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.06);">
                          <span style="display:block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#7c5cfc;font-weight:600;margin-bottom:4px;">${f.label}</span>
                          <span style="display:block;font-size:${f.isLong ? '14px' : '15px'};color:#e0e0e0;line-height:1.5;${f.isLong ? 'white-space:pre-wrap;' : ''}">${f.value}</span>
                        </td>
                      </tr>
                    </table>`
                      )
                      .join('')}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 20px 0;">
              <span style="font-size:12px;color:#555;line-height:1.6;">
                Submitted ${submittedAt}<br/>
                Cortexuum AI Marketing — Lead Notification
              </span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { htmlContent, textContent, subject };
}

function buildFields(lead: Lead, isPageReview: boolean) {
  const fields: { label: string; value: string; isLong?: boolean }[] = [];

  fields.push({ label: 'Name', value: lead.name });
  fields.push({ label: 'Email', value: lead.email });

  if (lead.phone) {
    fields.push({ label: 'Phone', value: lead.phone });
  }

  if (isPageReview) {
    // Page review fields are packed into the message field
    if (lead.company) {
      fields.push({ label: 'Website', value: lead.company });
    }
    if (lead.message) {
      fields.push({ label: 'Details', value: lead.message, isLong: true });
    }
  } else {
    if (lead.company) {
      fields.push({ label: 'Company', value: lead.company });
    }
    if (lead.business_type) {
      fields.push({ label: 'Business Type', value: lead.business_type });
    }
    if (lead.company_size) {
      fields.push({ label: 'Company Size', value: lead.company_size });
    }
    if (lead.annual_revenue) {
      fields.push({ label: 'Annual Revenue', value: lead.annual_revenue });
    }
    if (lead.client_value) {
      fields.push({ label: 'Avg Client Value', value: lead.client_value });
    }
    if (lead.marketing_needs) {
      fields.push({ label: 'Marketing Needs', value: lead.marketing_needs });
    }
    if (lead.timeline) {
      fields.push({ label: 'Timeline', value: lead.timeline });
    }
    if (lead.budget) {
      fields.push({ label: 'Budget', value: lead.budget });
    }
    if (lead.message) {
      fields.push({ label: 'Message', value: lead.message, isLong: true });
    }
  }

  if (lead.source) {
    fields.push({ label: 'Source', value: lead.source });
  }

  return fields;
}
