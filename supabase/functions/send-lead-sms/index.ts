import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER");
const BUSINESS_PHONE = "+14253996635";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, service, estimate, address, details } = await req.json();

    console.log("Sending lead SMS:", { name, phone, email, service, estimate });

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      console.error("Twilio credentials not configured");
      return new Response(JSON.stringify({ error: "SMS service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messageBody = `🔔 NEW LEAD - Royal Diamond WA

👤 Name: ${name || "Not provided"}
📱 Phone: ${phone || "Not provided"}
📧 Email: ${email || "Not provided"}
🏠 Address: ${address || "Not provided"}

🧹 Service: ${service || "Not specified"}
💰 Estimate: ${estimate || "Not calculated"}

📝 Details: ${details || "None"}

Reply to this customer ASAP!`;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    
    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: BUSINESS_PHONE,
        From: TWILIO_PHONE_NUMBER,
        Body: messageBody,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error("Twilio error:", result);
      return new Response(JSON.stringify({ error: "Failed to send SMS", details: result }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("SMS sent successfully:", result.sid);

    return new Response(JSON.stringify({ success: true, messageSid: result.sid }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
