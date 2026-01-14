/**
 * Script to send marketing emails to leads
 * 
 * Usage:
 *   node scripts/send-marketing-email.js --email="example@email.com"
 *   node scripts/send-marketing-email.js --status="new"
 *   node scripts/send-marketing-email.js --leadIds="lead1,lead2,lead3"
 *   node scripts/send-marketing-email.js --source="website" --service="Web Development"
 * 
 * Options:
 *   --email: Send to specific email address
 *   --leadIds: Comma-separated list of lead IDs
 *   --status: Filter by lead status (new, contacted, qualified, etc.)
 *   --source: Filter by source (website, facebook, google, etc.)
 *   --service: Filter by service
 *   --subject: Custom subject line (optional)
 *   --offer: Special offer text (optional)
 */

require('dotenv').config({ path: '.env.local' });
const fetch = require('node-fetch');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelforgebd.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@pixelforgebd.com';

// Parse command line arguments
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      args[key] = value || true;
    }
  });
  return args;
}

// Get auth token (you'll need to implement this or get from admin login)
async function getAuthToken() {
  // In production, you would authenticate and get a token
  // For now, you need to provide a valid admin token
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    console.error('❌ Error: ADMIN_TOKEN environment variable not set');
    console.log('Please set ADMIN_TOKEN in your .env.local file');
    console.log('You can get a token by logging into the admin panel and checking localStorage for authToken');
    process.exit(1);
  }
  return token;
}

async function sendMarketingEmail(options) {
  const token = await getAuthToken();
  
  const requestBody = {
    enableTracking: true,
  };

  if (options.email) {
    requestBody.email = options.email;
  } else if (options.leadIds) {
    requestBody.leadIds = options.leadIds.split(',').map(id => id.trim());
  } else {
    if (options.status && options.status !== 'all') {
      requestBody.status = options.status;
    }
    if (options.source && options.source !== 'all') {
      requestBody.source = options.source;
    }
    if (options.service && options.service !== 'all') {
      requestBody.service = options.service;
    }
  }

  if (options.subject) {
    requestBody.subject = options.subject;
  }

  if (options.offer) {
    requestBody.customVariables = {
      offer: options.offer,
    };
  }

  try {
    console.log('📧 Sending marketing emails...');
    console.log('Options:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${SITE_URL}/api/admin/crm/marketing/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send emails');
    }

    console.log('\n✅ Success!');
    console.log(`📊 Total: ${data.total}`);
    console.log(`✅ Sent: ${data.sent?.length || 0}`);
    console.log(`❌ Failed: ${data.failed?.length || 0}`);

    if (data.sent && data.sent.length > 0) {
      console.log('\n📬 Successfully sent emails to:');
      data.sent.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.name} (${item.email})`);
      });
    }

    if (data.failed && data.failed.length > 0) {
      console.log('\n❌ Failed to send emails to:');
      data.failed.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.name} (${item.email}): ${item.error}`);
      });
    }
  } catch (error) {
    console.error('❌ Error sending marketing emails:', error.message);
    process.exit(1);
  }
}

// Main execution
async function main() {
  const args = parseArgs();

  if (!args.email && !args.leadIds && !args.status && !args.source && !args.service) {
    console.log('📧 Marketing Email Sender');
    console.log('\nUsage:');
    console.log('  Send to specific email:');
    console.log('    node scripts/send-marketing-email.js --email="customer@example.com"');
    console.log('\n  Send to specific leads:');
    console.log('    node scripts/send-marketing-email.js --leadIds="lead1,lead2,lead3"');
    console.log('\n  Send to filtered leads:');
    console.log('    node scripts/send-marketing-email.js --status="new"');
    console.log('    node scripts/send-marketing-email.js --source="website" --service="Web Development"');
    console.log('\n  With custom subject and offer:');
    console.log('    node scripts/send-marketing-email.js --status="new" --subject="Special Offer!" --offer="Get 20% off your first project"');
    console.log('\nOptions:');
    console.log('  --email: Send to specific email address');
    console.log('  --leadIds: Comma-separated list of lead IDs');
    console.log('  --status: Filter by lead status (new, contacted, qualified, proposal, negotiation, won, lost)');
    console.log('  --source: Filter by source (website, facebook, google, referral, direct, other)');
    console.log('  --service: Filter by service type');
    console.log('  --subject: Custom subject line');
    console.log('  --offer: Special offer text');
    process.exit(0);
  }

  await sendMarketingEmail(args);
}

main();



