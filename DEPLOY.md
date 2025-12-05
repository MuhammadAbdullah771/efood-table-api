# 🚀 Quick Deployment Guide

## Deploy to Render.com (5 Minutes)

### Step 1: Create Account
- Go to https://render.com
- Sign up (free, no credit card)

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub (or use public repo)
3. Select your repository
4. Settings:
   - **Name**: `efood-table-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: **Free**

### Step 3: Deploy
- Click **"Create Web Service"**
- Wait 2-5 minutes
- Copy your URL: `https://your-app.onrender.com`

### Step 4: Update Flutter App
In `lib/util/app_constants.dart`:
```dart
static const String baseUrl = 'https://your-app.onrender.com';
```

### Step 5: Done! 🎉
- API: `https://your-app.onrender.com`
- Admin: `https://your-app.onrender.com/admin.html`

---

## Keep Server Alive (Free Tier)

Render.com free tier spins down after 15 min inactivity.

**Solution**: Use https://uptimerobot.com (free)
- Add your URL
- Set to ping every 5 minutes
- Keeps server alive!

---

## Alternative: Railway.app

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Auto-detects Node.js
5. Get URL from Settings → Domains

**Railway stays alive** - no need for keep-alive service!

---

## Need Help?

Check `../DEPLOY_FREE_HOSTING.md` for detailed instructions.

