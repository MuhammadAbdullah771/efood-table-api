# 🚀 One-Click Deployment Guide

## ⚡ Automated Setup (What I Can Do For You)

I've created automation scripts that handle most of the setup automatically!

---

## 🪟 Windows Users

### Step 1: Run the Auto-Setup Script

1. Open the `mock-api-server` folder
2. **Double-click** `deploy-auto.bat`
3. The script will:
   - ✅ Check if Git and Node.js are installed
   - ✅ Install all dependencies
   - ✅ Test the server
   - ✅ Initialize Git repository
   - ✅ Create necessary files

### Step 2: Follow the On-Screen Instructions

The script will show you exactly what to do next!

---

## 🍎 Mac/Linux Users

### Step 1: Run the Auto-Setup Script

1. Open terminal
2. Navigate to `mock-api-server` folder:
   ```bash
   cd mock-api-server
   ```
3. Make script executable and run:
   ```bash
   chmod +x deploy-auto.sh
   ./deploy-auto.sh
   ```
4. The script will:
   - ✅ Check if Git and Node.js are installed
   - ✅ Install all dependencies
   - ✅ Test the server
   - ✅ Initialize Git repository
   - ✅ Create necessary files

### Step 2: Follow the On-Screen Instructions

The script will show you exactly what to do next!

---

## 📋 Manual Steps (After Auto-Setup)

After running the script, you need to do these 3 steps manually (I can't automate these):

### 1️⃣ Create GitHub Repository (2 minutes)

1. Go to: https://github.com/new
2. Repository name: `efood-table-api`
3. Make it **Public** ✅
4. **Don't** initialize with README
5. Click **"Create repository"**

### 2️⃣ Push to GitHub (Copy-Paste These Commands)

Open terminal/command prompt in the `mock-api-server` folder and run:

```bash
git add .
git commit -m "Initial commit - eFood Table API"
git remote add origin https://github.com/YOUR_USERNAME/efood-table-api.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

Example:
```bash
git remote add origin https://github.com/johnsmith/efood-table-api.git
```

### 3️⃣ Deploy to Render.com (5 minutes)

1. Go to: https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (click "Continue with GitHub")
4. Authorize Render

5. Click **"New +"** → **"Web Service"**

6. **Connect Repository**:
   - Find `efood-table-api` in the list
   - Click **"Connect"**

7. **Configure** (auto-filled, just verify):
   - **Name**: `efood-table-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Select **Free**

8. Click **"Create Web Service"**

9. **Wait 2-5 minutes** (watch the logs)

10. **Copy your URL** when it says "Live":
    - Example: `https://efood-table-api.onrender.com`
    - **Save this URL!**

### 4️⃣ Update Flutter App (1 minute)

1. Open: `lib/util/app_constants.dart`
2. Find line 19: `static const String baseUrl = ...`
3. Replace with your Render URL:
   ```dart
   static const String baseUrl = 'https://efood-table-api.onrender.com';
   ```
   ⚠️ **Important**: 
   - Use `https://` (not `http://`)
   - Replace with YOUR actual URL

4. Save the file

### 5️⃣ Test! 🎉

1. **Test API in browser**:
   ```
   https://your-app.onrender.com/api/v1/config/table
   ```
   Should show JSON

2. **Test Admin Panel**:
   ```
   https://your-app.onrender.com/admin.html
   ```
   Should show admin interface

3. **Run Flutter app**:
   ```bash
   flutter run
   ```

4. **It works!** No IP issues! 🚀

---

## 🔄 Keep Server Alive (Optional)

Render.com free tier spins down after 15 minutes.

**Easy Fix**: Use UptimeRobot (free, 2 minutes setup)

1. Go to: https://uptimerobot.com
2. Sign up (free)
3. Click **"Add New Monitor"**
4. Settings:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: `eFood API`
   - **URL**: `https://your-app.onrender.com/api/v1/config/table`
   - **Monitoring Interval**: 5 minutes
5. Click **"Create Monitor"**

**Done!** Server stays alive! ✅

---

## ✅ Quick Checklist

After running the auto-setup script:

- [ ] GitHub repository created (public)
- [ ] Code pushed to GitHub
- [ ] Render.com account created
- [ ] Service deployed on Render
- [ ] URL copied
- [ ] Flutter app updated with new URL
- [ ] API tested in browser
- [ ] Admin panel accessible
- [ ] Flutter app tested
- [ ] UptimeRobot set up (optional)

---

## 🆘 Troubleshooting

### Script Says "Git Not Installed"
- Download from: https://git-scm.com/downloads
- Install and restart terminal
- Run script again

### Script Says "Node.js Not Installed"
- Download from: https://nodejs.org/
- Install and restart terminal
- Run script again

### "Repository Not Found" When Pushing
- Make sure repository name matches
- Check you created it on GitHub first
- Verify your GitHub username is correct

### "Build Failed" on Render
- Check Render logs
- Make sure all files are in GitHub
- Verify `package.json` is in root folder

### "Connection Failed" in App
- Verify URL uses `https://` (not `http://`)
- Check server is running (green in Render)
- Test API in browser first

---

## 🎯 Summary

1. **Run** `deploy-auto.bat` (Windows) or `deploy-auto.sh` (Mac/Linux)
2. **Create** GitHub repository
3. **Push** code to GitHub
4. **Deploy** to Render.com
5. **Update** Flutter app with new URL
6. **Test!** 🎉

**Total time: ~10-15 minutes**

---

**Need help?** Check `DEPLOY_QUICK_START.md` for more details!

