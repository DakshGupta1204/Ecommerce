# Stripe Payment Testing Guide

## 🚀 Quick Start

Your ecommerce site is now set up with a simulated Stripe payment gateway! Here's how to test it:

### 1. Access the Store
- **Main Store**: http://localhost:3000
- **Test Payment Page**: http://localhost:3000/test-payment

### 2. Test Card Numbers
Use these Stripe test card numbers for different scenarios:

| Card Number | Result | Description |
|-------------|--------|-------------|
| `4242 4242 4242 4242` | ✅ Success | Payment succeeds |
| `4000 0000 0000 0002` | ❌ Decline | Card declined |
| `4000 0025 0000 3155` | 🔐 3D Secure | Requires authentication |
| `4000 0000 0000 9995` | ⚠️ Insufficient Funds | Insufficient funds |

**For all test cards:**
- **Expiry Date**: Any future date (e.g., `12/34`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP Code**: Any valid ZIP (e.g., `12345`)

### 3. Testing Workflow

#### Option A: Test via Main Store
1. Go to http://localhost:3000
2. Add products to cart
3. Click cart icon to view cart
4. Click "Pay with Stripe (Test Mode)" button
5. Use test card `4242 4242 4242 4242`
6. Complete the checkout process
7. You'll be redirected to success page

#### Option B: Quick Test Page
1. Go to http://localhost:3000/test-payment
2. Click "Test Stripe Payment" button
3. Use test card `4242 4242 4242 4242`
4. Complete the checkout process

### 4. Visual Indicators

The app now includes several indicators that you're in test mode:
- **Purple banner** at the top with test card information
- **Green notice** in cart with test card reminder
- **Blue notice** on success page confirming it was a test payment

### 5. Troubleshooting

#### Common Issues:
1. **"Payment failed" error**: Check browser console for detailed error messages
2. **Server errors**: Check the terminal running `npm run dev` for API errors
3. **Redirect issues**: Ensure you're using the correct test card numbers

#### Debug Mode:
- Check browser console (F12) for detailed error logs
- Check terminal output for API request logs
- All Stripe API calls are logged with console.log statements

### 6. Environment Setup

Your `.env` file contains:
- ✅ Stripe Publishable Key (Test Mode)
- ✅ Stripe Secret Key (Test Mode)
- ✅ Sanity Configuration

All keys are configured for **TEST MODE ONLY** - no real money will be charged.

### 7. Next Steps

To move to production:
1. Replace test keys with live Stripe keys
2. Remove test mode banners and notices
3. Update success/cancel URLs for your domain
4. Set up webhooks for order fulfillment

---

## 🔧 Technical Details

### API Endpoints
- `POST /api/stripe` - Creates Stripe checkout session

### Key Files Modified
- `/pages/api/stripe.js` - Enhanced error handling
- `/components/Cart.jsx` - Better payment flow
- `/pages/success.js` - Test mode indicators
- `/components/Layout.jsx` - Test mode banner

### Test Data
The test payment page creates a mock product:
- Name: "Test Product"
- Price: $29.99
- Quantity: 1

---

**Happy Testing! 🎉**
