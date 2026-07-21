// The actual charge amount lives in your Paystack Plan dashboard, not
// in code — this label is just for display and should match whatever
// you set the plan to. Set NEXT_PUBLIC_PREMIUM_PRICE_LABEL in Vercel
// once your Paystack plan exists (e.g. "₦1,500/mo").
export const PREMIUM_PRICE_LABEL = process.env.NEXT_PUBLIC_PREMIUM_PRICE_LABEL || 'a small monthly fee';
