# eFood Table - Free Mock API Server

This is a **FREE** mock API server for testing the eFood Table Waiter App. It includes a simple admin panel for managing your restaurant data.

## 🚀 Quick Start

### Option 1: Run Locally (Recommended for Testing)

1. **Install Node.js** (if you don't have it)
   - Download from: https://nodejs.org/
   - Install version 16 or higher

2. **Install Dependencies**
   ```bash
   cd mock-api-server
   npm install
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

4. **Access the Admin Panel**
   - Open your browser and go to: `http://localhost:3000/admin.html`
   - Or use the API directly at: `http://localhost:3000`

5. **Update Flutter App**
   - Open `lib/util/app_constants.dart`
   - Change `baseUrl` to: `'http://localhost:3000'` (for Android emulator)
   - Or use your computer's IP address for physical device: `'http://192.168.1.XXX:3000'`

### Option 2: Deploy for Free (For Testing on Real Devices)

You can deploy this server for free on:
- **Render.com** (Free tier available)
- **Railway.app** (Free tier available)
- **Vercel** (Free tier available)
- **Heroku** (Limited free tier)

#### Deploy to Render.com (Easiest):

1. Create account at https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**: Node
5. Deploy!

After deployment, use the provided URL as your base URL in the Flutter app.

## 📱 Flutter App Configuration

1. Open `lib/util/app_constants.dart`
2. Find line 10: `static const String baseUrl = 'YOUR_BASE_URL_HERE';`
3. Replace with:
   - **Local testing**: `'http://10.0.2.2:3000'` (Android Emulator)
   - **Local testing**: `'http://localhost:3000'` (iOS Simulator)
   - **Physical device**: `'http://YOUR_COMPUTER_IP:3000'` (e.g., `'http://192.168.1.100:3000'`)
   - **Deployed server**: `'https://your-app.onrender.com'`

## 🖥️ Admin Panel Features

The admin panel (accessible at `/admin.html`) allows you to:

- ⚙️ **Configuration**: Update restaurant settings, currency, contact info
- 📁 **Categories**: Add, edit, delete food categories
- 🍕 **Products**: Add, edit, delete menu items
- 📋 **Orders**: View all placed orders

## 📡 API Endpoints

The server provides these endpoints:

- `GET /api/v1/config/table` - Get configuration
- `GET /api/v1/categories` - Get categories
- `GET /api/v1/products/latest` - Get products
- `GET /api/v1/categories/products/:id` - Get products by category
- `POST /api/v1/table/order/place` - Place order
- `GET /api/v1/table/order/details` - Get order details
- `GET /api/v1/table/order/list` - Get order list

## 🔧 Troubleshooting

### Connection Issues

1. **Android Emulator**: Use `http://10.0.2.2:3000` instead of `localhost`
2. **iOS Simulator**: Use `http://localhost:3000`
3. **Physical Device**: 
   - Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Use: `http://YOUR_IP:3000`
   - Make sure phone and computer are on same WiFi

### CORS Issues

The server already has CORS enabled. If you still have issues, check:
- Server is running
- Correct base URL in Flutter app
- Network connectivity

## 📝 Data Persistence

Data is saved to `data.json` file in the `mock-api-server` directory. This means your data persists between server restarts.

## 🆓 Free Hosting Options

1. **Render.com**: Free tier with 750 hours/month
2. **Railway.app**: Free tier with $5 credit/month
3. **Vercel**: Free tier for serverless functions
4. **Fly.io**: Free tier available

## ⚠️ Important Notes

- This is a **testing/mock server** - not for production use
- Data is stored in-memory and in a JSON file
- No authentication/security for admin panel (testing only)
- Perfect for development and testing purposes

## 🎯 Next Steps

1. Start the server: `npm start`
2. Open admin panel: `http://localhost:3000/admin.html`
3. Add some categories and products
4. Update Flutter app base URL
5. Test the app!

## 💡 Tips

- Use the admin panel to add sample data before testing
- Check server console for API call logs
- All API responses match the expected format from the Flutter app

---

**Need Help?** Check the server console for error messages and API call logs.

