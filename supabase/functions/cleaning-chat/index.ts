import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a friendly and professional customer service representative for Royal Diamond WA, a premium house cleaning service in Washington State.

Your role is to:
1. Greet customers warmly and professionally
2. Gather information to provide accurate cleaning estimates
3. Answer questions about our services
4. Collect lead information (name, phone, email, address)

PRICING GUIDE (use these to calculate estimates):
- Standard Recurring Cleaning: $120-180 for apartments, $180-280 for houses (2-3 bedrooms), $280-400 for larger homes (4+ bedrooms)
- Deep Cleaning: Add 50-75% to standard pricing
- Move In/Move Out Cleaning: $250-500 depending on size
- One-Time Cleaning: Add 20% to recurring pricing

QUESTIONS TO ASK (one at a time, conversationally):
1. What type of cleaning service are you interested in? (recurring, one-time, deep cleaning, move in/out)
2. What type of property? (apartment, house, condo)
3. How many bedrooms and bathrooms?
4. Approximate square footage (if known)
5. Any pets?
6. Any specific areas of concern or special requests?
7. Preferred cleaning day/time?
8. Contact information (name, phone, email, address)

When you have enough information, provide an estimate range and explain what's included.

Always be helpful, patient, and professional. Use a warm but professional tone. End conversations by confirming you'll have someone reach out to finalize the booking.

IMPORTANT: When the customer provides their contact information (especially phone number), respond with a special marker at the end of your message:
[LEAD_CAPTURED: name="Customer Name", phone="+1XXXXXXXXXX", email="email@example.com", service="Service Type", estimate="$XXX-$XXX"]

This marker should be included naturally at the end of your response when lead info is complete.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
