# Namecheap Business Email Setup Guide
## For pixelforgebd.com with Cloudflare DNS

---

## 📧 **Complete Setup Checklist**

### ✅ **Phase 1: Cloudflare DNS Configuration**

#### **Step 1: Log into Cloudflare**
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select domain: `pixelforgebd.com`
3. Click **DNS** → **Records**

#### **Step 2: Add MX Records** (Mail Exchange - Most Important!)

**Record 1:**
```
Type: MX
Name: @ (or pixelforgebd.com)
Mail server: mx1.privateemail.com
Priority: 10
TTL: Auto
Proxy status: DNS only (gray cloud ☁️)
```

**Record 2:**
```
Type: MX
Name: @ (or pixelforgebd.com)
Mail server: mx2.privateemail.com
Priority: 10
TTL: Auto
Proxy status: DNS only (gray cloud ☁️)
```

⚠️ **IMPORTANT:** Make sure MX records are NOT proxied (gray cloud, not orange)

#### **Step 3: Add CNAME Records** (Mail Configuration)

**Record 1 - Webmail Access:**
```
Type: CNAME
Name: mail
Target: privateemail.com
TTL: Auto
Proxy status: DNS only
```

**Record 2 - Auto Configuration (Outlook/Thunderbird):**
```
Type: CNAME
Name: autoconfig
Target: privateemail.com
TTL: Auto
Proxy status: DNS only
```

**Record 3 - Auto Discovery (Outlook):**
```
Type: CNAME
Name: autodiscover
Target: privateemail.com
TTL: Auto
Proxy status: DNS only
```

#### **Step 4: Add TXT Records** (Email Authentication - CRITICAL!)

**SPF Record (Prevents Spoofing):**
```
Type: TXT
Name: @ (or pixelforgebd.com)
Content: v=spf1 include:spf.privateemail.com ~all
TTL: Auto
```

**DKIM Record (Email Signing):**
```
Type: TXT
Name: default._domainkey
Content: [GET THIS FROM NAMECHEAP - See below]
TTL: Auto
```

🔑 **How to get DKIM from Namecheap:**
1. Log into Namecheap
2. Go to **Dashboard** → **Private Email**
3. Click **Manage** → **Domain Settings**
4. Find **DKIM Settings**
5. Copy the full DKIM value (starts with: `v=DKIM1; k=rsa; p=...`)
6. Paste it into Cloudflare

**DMARC Record (Email Policy - Optional but Recommended):**
```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=quarantine; rua=mailto:hello@pixelforgebd.com
TTL: Auto
```

#### **Step 5: Add SRV Record** (Autodiscover for Email Clients)

```
Type: SRV
Service: _autodiscover
Protocol: _tcp
Name: @ (or leave blank)
Priority: 0
Weight: 0
Port: 443
Target: privateemail.com
TTL: Auto
```

---

### ✅ **Phase 2: Verify DNS Setup**

#### **Wait for DNS Propagation**
- **Typical:** 15-30 minutes
- **Maximum:** 24-48 hours

#### **Check DNS Records Online**

**Use MXToolbox:**
1. Go to [mxtoolbox.com/SuperTool.aspx](https://mxtoolbox.com/SuperTool.aspx)
2. Enter: `pixelforgebd.com`
3. Check:
   - ✅ MX Lookup (should show mx1 and mx2.privateemail.com)
   - ✅ SPF Record (should show v=spf1 include:spf.privateemail.com ~all)
   - ✅ DKIM Lookup (enter: default._domainkey.pixelforgebd.com)
   - ✅ DMARC Lookup (should show your policy)

**Use DNSChecker:**
1. Go to [dnschecker.org](https://dnschecker.org)
2. Enter: `pixelforgebd.com`
3. Type: `MX`
4. Check if propagated globally

---

### ✅ **Phase 3: Configure Email Client** (Gmail, Outlook, Thunderbird, etc.)

#### **Email Account Settings:**

**Your Email Address:** `hello@pixelforgebd.com`

**Incoming Mail Server (IMAP):**
```
Protocol: IMAP
Server: mail.privateemail.com
Port: 993
Security: SSL/TLS
Username: hello@pixelforgebd.com (full email address)
Password: [Your Namecheap email password]
```

**Outgoing Mail Server (SMTP):**
```
Protocol: SMTP
Server: mail.privateemail.com
Port: 465 (recommended) or 587
Security: SSL/TLS
Authentication: Yes (required)
Username: hello@pixelforgebd.com (full email address)
Password: [Same as above]
```

#### **Quick Setup Links:**

**Webmail Access:**
- URL: `https://mail.privateemail.com`
- Or: `https://mail.pixelforgebd.com` (after DNS propagates)
- Username: `hello@pixelforgebd.com`
- Password: [Your Namecheap password]

---

### ✅ **Phase 4: Configure Website Contact Form**

#### **Step 1: Update Environment Variables**

Edit your `.env.local` file:

```env
# Namecheap Private Email Configuration
EMAIL_USER=hello@pixelforgebd.com
EMAIL_PASS=your_namecheap_email_password_here
ADMIN_EMAIL=hello@pixelforgebd.com

# MongoDB (existing)
MONGODB_URI=your_mongodb_uri

# Other existing variables...
```

⚠️ **IMPORTANT:** 
- Replace `your_namecheap_email_password_here` with your actual password
- Never commit `.env.local` to git (already in .gitignore)

#### **Step 2: Email Configuration Already Updated**

✅ The file `src/lib/email.ts` has been updated with Namecheap SMTP settings:

```typescript
const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: true
  }
});
```

#### **Step 3: Test Contact Form**

1. **Local Test:**
   ```bash
   npm run dev
   ```
   - Go to: http://localhost:3000/contact
   - Fill out the form
   - Submit
   - Check if email arrives at `hello@pixelforgebd.com`

2. **Production Test:**
   - Deploy to Vercel
   - Add environment variables in Vercel:
     - `EMAIL_USER` = `hello@pixelforgebd.com`
     - `EMAIL_PASS` = `[your password]`
     - `ADMIN_EMAIL` = `hello@pixelforgebd.com`
   - Test the live contact form

---

### ✅ **Phase 5: Deploy to Production (Vercel)**

#### **Add Environment Variables in Vercel:**

1. Go to [vercel.com](https://vercel.com)
2. Select your project: `pixel-forge-website`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
EMAIL_USER = hello@pixelforgebd.com
EMAIL_PASS = [your_namecheap_email_password]
ADMIN_EMAIL = hello@pixelforgebd.com
```

5. Redeploy your site:
   ```bash
   git add .
   git commit -m "Configure Namecheap email for contact form"
   git push
   ```

6. Vercel will auto-deploy with new email settings

---

## 🧪 **Testing Checklist**

### **1. Test Email Reception** (Can you receive?)
- [ ] Send test email to `hello@pixelforgebd.com` from Gmail
- [ ] Check if it arrives in Namecheap webmail
- [ ] Check if it arrives in your email client (Outlook, etc.)

### **2. Test Email Sending** (Can you send?)
- [ ] Send test email FROM `hello@pixelforgebd.com` to your personal Gmail
- [ ] Check if it arrives (not in spam)
- [ ] Check if SPF/DKIM pass (Gmail shows authenticated)

### **3. Test Contact Form** (Website integration)
- [ ] Submit test contact form on website
- [ ] Check if email arrives at `hello@pixelforgebd.com`
- [ ] Check if email is not marked as spam
- [ ] Check if admin panel shows the lead

### **4. Test Email Deliverability**
- [ ] Send to Gmail - Check spam score
- [ ] Send to Outlook - Check spam score
- [ ] Send to Yahoo - Check spam score
- [ ] Use [mail-tester.com](https://www.mail-tester.com) - Aim for 9/10 or 10/10

---

## 🔧 **Troubleshooting Common Issues**

### **Problem 1: MX Records Not Working**
**Symptoms:** Can't receive emails

**Solutions:**
- ✅ Check MX records in Cloudflare (should be DNS only, not proxied)
- ✅ Wait 24 hours for full DNS propagation
- ✅ Use MXToolbox to verify MX records are visible globally
- ✅ Check Namecheap dashboard - is email service active?

### **Problem 2: Can't Send Emails from Contact Form**
**Symptoms:** Contact form submissions fail

**Solutions:**
- ✅ Check `.env.local` has correct credentials
- ✅ Test SMTP connection manually:
  ```bash
  telnet mail.privateemail.com 465
  ```
- ✅ Check Vercel environment variables are set
- ✅ Check Vercel logs for error messages
- ✅ Verify email password is correct (no typos)

### **Problem 3: Emails Go to Spam**
**Symptoms:** Emails arrive but in spam folder

**Solutions:**
- ✅ Verify SPF record is correct
- ✅ Verify DKIM record is added and correct
- ✅ Add DMARC record
- ✅ Wait 24-48 hours for DNS to fully propagate
- ✅ Ask recipients to mark as "Not Spam"
- ✅ Build sender reputation (send emails regularly)

### **Problem 4: SPF/DKIM Failing**
**Symptoms:** Mail-tester shows authentication failures

**Solutions:**
- ✅ Double-check SPF record: `v=spf1 include:spf.privateemail.com ~all`
- ✅ Verify DKIM record is EXACTLY as provided by Namecheap
- ✅ Check for typos in DNS records
- ✅ Wait for DNS propagation (check dnschecker.org)
- ✅ Test DKIM at [dkimvalidator.com](https://dkimvalidator.com)

### **Problem 5: Autodiscover Not Working**
**Symptoms:** Email clients can't auto-configure

**Solutions:**
- ✅ Add autodiscover CNAME record
- ✅ Add autoconfig CNAME record
- ✅ Add SRV record for _autodiscover._tcp
- ✅ Manual setup using IMAP/SMTP settings above

---

## 📊 **DNS Records Summary** (Copy/Paste Checklist)

```
✅ MX Records (2):
   mx1.privateemail.com (Priority 10)
   mx2.privateemail.com (Priority 10)

✅ CNAME Records (3):
   mail → privateemail.com
   autoconfig → privateemail.com
   autodiscover → privateemail.com

✅ TXT Records (3):
   @ → v=spf1 include:spf.privateemail.com ~all
   default._domainkey → [DKIM from Namecheap]
   _dmarc → v=DMARC1; p=quarantine; rua=mailto:hello@pixelforgebd.com

✅ SRV Record (1):
   _autodiscover._tcp → 0 0 443 privateemail.com
```

---

## 🎯 **Quick Reference**

### **Webmail Login:**
- URL: https://mail.privateemail.com
- Username: hello@pixelforgebd.com
- Password: [Your Namecheap password]

### **IMAP Settings:**
- Server: mail.privateemail.com
- Port: 993 (SSL)
- Username: hello@pixelforgebd.com

### **SMTP Settings:**
- Server: mail.privateemail.com
- Port: 465 (SSL) or 587 (TLS)
- Username: hello@pixelforgebd.com
- Auth: Required

### **Support Links:**
- Namecheap Email Support: https://www.namecheap.com/support/knowledgebase/subcategory/25/private-email/
- DNS Checker: https://dnschecker.org
- MX Toolbox: https://mxtoolbox.com
- Mail Tester: https://www.mail-tester.com

---

## 🚀 **What to Do After Setup**

1. **Test Everything** (Use checklist above)
2. **Add Email Signature** (Professional branding)
3. **Set Up Email Forwarding** (If needed)
4. **Create Additional Mailboxes:**
   - `info@pixelforgebd.com`
   - `support@pixelforgebd.com`
   - `sales@pixelforgebd.com`
5. **Monitor Deliverability** (Use mail-tester.com weekly)
6. **Set Up Email Auto-Reply** (For quick responses)
7. **Configure Mobile Email** (iOS/Android)

---

## 📱 **Mobile Email Setup** (Quick Guide)

### **iOS (iPhone/iPad):**
1. Settings → Mail → Accounts → Add Account
2. Choose "Other" → Add Mail Account
3. Fill in:
   - Name: Pixel Forge
   - Email: hello@pixelforgebd.com
   - Password: [Your password]
4. Tap Next → IMAP
5. Incoming:
   - Host: mail.privateemail.com
   - Username: hello@pixelforgebd.com
6. Outgoing:
   - Host: mail.privateemail.com
   - Username: hello@pixelforgebd.com
7. Save

### **Android:**
1. Gmail App → Settings → Add Account
2. Choose "Other"
3. Enter: hello@pixelforgebd.com
4. Choose IMAP
5. Enter password
6. Incoming: mail.privateemail.com:993 (SSL)
7. Outgoing: mail.privateemail.com:465 (SSL)
8. Done

---

## ✅ **Setup Complete Checklist**

- [ ] All DNS records added in Cloudflare
- [ ] DKIM key copied from Namecheap
- [ ] DNS propagation verified (24-48 hours max)
- [ ] Webmail access working
- [ ] Email client configured
- [ ] Test email sent and received
- [ ] Contact form environment variables set
- [ ] Contact form tested locally
- [ ] Contact form tested in production
- [ ] Email deliverability tested (mail-tester.com)
- [ ] SPF/DKIM/DMARC passing
- [ ] Mobile email configured
- [ ] Email signature added

---

**🎉 Congratulations! Your professional business email is now configured!**

For support or questions, refer to Namecheap documentation or check your Vercel logs for contact form issues.

