// Google Sheets integration - disabled on Vercel (requires Replit Connectors)
// This is a no-op stub that silently skips all Google Sheets operations

export async function addLeadToSheet(lead: {
  fullName: string;
  email: string;
  companyName: string;
  websiteUrl: string;
  monthlyAdSpend?: string;
  biggestChallenge?: string;
  createdAt: Date;
}) {
  // Google Sheets integration requires Replit Connectors - skip on Vercel
  console.log('Google Sheets integration not available - skipping sheet update');
  return;
}

export async function initializeSheet() {
  console.log('Google Sheets integration not available - skipping initialization');
  return;
}
