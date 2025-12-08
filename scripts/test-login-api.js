/**
 * Script to test login API endpoint
 * 
 * Usage: node scripts/test-login-api.js [url] [email] [password]
 */

const https = require('https');
const http = require('http');

const baseUrl = process.argv[2] || 'https://pixelforgebd.com';
const email = process.argv[3] || 'admin@pixelforgebd.com';
const password = process.argv[4] || 'Admin123!@#';

async function testLogin() {
  try {
    console.log('🧪 Testing Login API...\n');
    console.log(`🌐 URL: ${baseUrl}`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔒 Password: ${password}\n`);

    const url = new URL(`${baseUrl}/api/auth/login`);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;

    const postData = JSON.stringify({
      email,
      password
    });

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Test Script)',
        'Accept': 'application/json'
      },
      followRedirect: false
    };

    return new Promise((resolve, reject) => {
      const req = client.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            
            console.log('═══════════════════════════════════════════════════════════');
            console.log('📊 LOGIN TEST RESULTS');
            console.log('═══════════════════════════════════════════════════════════');
            console.log(`Status Code: ${res.statusCode}`);
            console.log(`Success: ${response.success ? '✅ YES' : '❌ NO'}`);
            console.log(`Message: ${response.message || 'N/A'}\n`);

            if (res.statusCode === 200 && response.success) {
              console.log('✅ LOGIN SUCCESSFUL!\n');
              console.log('User Details:');
              console.log(`   - ID: ${response.user?.id || 'N/A'}`);
              console.log(`   - Name: ${response.user?.name || 'N/A'}`);
              console.log(`   - Email: ${response.user?.email || 'N/A'}`);
              console.log(`   - Role: ${response.user?.role || 'N/A'}`);
              console.log(`   - Token: ${response.token ? 'Received ✅' : 'Missing ❌'}\n`);
              console.log('🎉 Credentials are working correctly!\n');
              resolve(response);
            } else if (res.statusCode === 401) {
              console.log('❌ LOGIN FAILED - Invalid credentials\n');
              console.log('Possible reasons:');
              console.log('   1. Password is incorrect');
              console.log('   2. Account is locked (in-memory or database)');
              console.log('   3. Account does not exist\n');
              reject(new Error('Invalid credentials'));
            } else if (res.statusCode === 423) {
              console.log('🔒 ACCOUNT LOCKED\n');
              console.log('The account is temporarily locked due to multiple failed attempts.');
              console.log('Wait 15 minutes or trigger a Vercel redeploy to clear the lock.\n');
              reject(new Error('Account locked'));
            } else {
              console.log('❌ LOGIN FAILED\n');
              console.log(`Error: ${response.message || 'Unknown error'}`);
              if (response.errors) {
                console.log('Validation errors:', response.errors);
              }
              console.log();
              reject(new Error(response.message || 'Login failed'));
            }
          } catch (error) {
            console.error('❌ Error parsing response:', error.message);
            console.error('Raw response:', data);
            reject(error);
          }
        });
      });

      req.on('error', (error) => {
        console.error('❌ Request error:', error.message);
        console.error('   Make sure the server is running and accessible\n');
        reject(error);
      });

      req.write(postData);
      req.end();
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the test
console.log('🚀 Starting login test...\n');
testLogin()
  .then(() => {
    console.log('✅ Test completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  });

