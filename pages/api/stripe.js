import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Stripe payment initiated with items:', req.body.length);
    
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        // Remove shipping options for test mode to avoid shipping rate errors
        // shipping_options: [
        //   { shipping_rate: 'shr_1Kn3IaEnylLNWUqj5rqhg9oV' },
        // ],
        custom_text: {
          submit: {
            message: 'Complete your purchase securely'
          }
        },
        customer_creation: 'if_required',
        invoice_creation: {
          enabled: false
        },
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [newImage],
                description: `${item.name} - Premium quality product`,
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
        metadata: {
          testMode: 'true',
          environment: 'development'
        }
      }

      console.log('Creating Stripe checkout session...');
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      console.log('Stripe session created successfully:', session.id);

      res.status(200).json(session);
    } catch (err) {
      console.error('Stripe error:', err);
      res.status(err.statusCode || 500).json({ 
        error: err.message,
        type: err.type || 'api_error',
        code: err.code || 'unknown_error'
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}