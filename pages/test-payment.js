import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const TestPayment = () => {
  const [loading, setLoading] = useState(false);

  const handleTestPayment = async () => {
    setLoading(true);
    
    // Create a test cart item
    const testItems = [
      {
        _id: 'test-item',
        name: 'Test Product',
        price: 29.99,
        quantity: 1,
        image: [{
          asset: {
            _ref: 'image-test123-555x555-webp'
          }
        }]
      }
    ];

    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testItems),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Stripe error:', data.error);
        toast.error(`Payment failed: ${data.error}`);
        setLoading(false);
        return;
      }

      toast.success('Stripe session created! Redirecting...');
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        console.error('Stripe redirect error:', result.error);
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Payment failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Stripe Payment Test</h1>
      <div style={{
        background: '#fff3cd',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px 0',
        border: '1px solid #ffeaa7'
      }}>
        <h3>Test Card Numbers</h3>
        <p><strong>Success:</strong> 4242 4242 4242 4242</p>
        <p><strong>Decline:</strong> 4000 0000 0000 0002</p>
        <p><strong>Requires Authentication:</strong> 4000 0025 0000 3155</p>
        <p><strong>Expiry:</strong> Any future date (e.g., 12/34)</p>
        <p><strong>CVC:</strong> Any 3 digits (e.g., 123)</p>
      </div>
      
      <button 
        onClick={handleTestPayment}
        disabled={loading}
        style={{
          background: '#635fc7',
          color: 'white',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? 'Processing...' : 'Test Stripe Payment ($29.99)'}
      </button>
      
      <div style={{ marginTop: '30px' }}>
        <a href="/" style={{ color: '#635fc7', textDecoration: 'none' }}>
          ← Back to Store
        </a>
      </div>
    </div>
  );
};

export default TestPayment;
