// Google Sheets integration for lead automation
import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function addLeadToSheet(lead: {
  fullName: string;
  email: string;
  companyName: string;
  websiteUrl: string;
  monthlyAdSpend?: string;
  biggestChallenge?: string;
  createdAt: Date;
}) {
  if (!SPREADSHEET_ID) {
    console.log('Google Sheet ID not configured - skipping sheet update');
    return;
  }

  try {
    const sheets = await getUncachableGoogleSheetClient();
    
    const values = [[
      lead.fullName,
      lead.email,
      lead.companyName,
      lead.websiteUrl,
      lead.monthlyAdSpend || '',
      lead.biggestChallenge || '',
      lead.createdAt.toISOString(),
      'Free Review Landing Page'
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values
      }
    });

    console.log('Lead added to Google Sheet successfully');
  } catch (error) {
    console.error('Error adding lead to Google Sheet:', error);
  }
}

export async function initializeSheet() {
  if (!SPREADSHEET_ID) {
    console.log('Google Sheet ID not configured');
    return;
  }

  try {
    const sheets = await getUncachableGoogleSheetClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1:H1'
    });

    if (!response.data.values || response.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A1:H1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['Full Name', 'Email', 'Company', 'Website', 'Monthly Ad Spend', 'Biggest Challenge', 'Submitted At', 'Source']]
        }
      });
      console.log('Google Sheet headers initialized');
    }
  } catch (error) {
    console.error('Error initializing Google Sheet:', error);
  }
}
