// paypalClient.js
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

const environment = new checkoutNodeJssdk.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET_KEY
);
const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

export default client;
