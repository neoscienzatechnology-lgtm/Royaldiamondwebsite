import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In Resend testing mode, emails can only be sent to the account owner's email
// To send to other recipients, verify a domain at https://resend.com/domains
const BUSINESS_EMAIL = "neoscienzatechnology@gmail.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, service, estimate, address, details } = await req.json();

    console.log("Sending lead email:", { name, phone, email, service, estimate });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 10px 0 0; opacity: 0.9; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #c9a227; }
          .field-label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: bold; margin-bottom: 5px; }
          .field-value { font-size: 16px; color: #333; }
          .highlight { background: linear-gradient(135deg, #c9a227 0%, #e8d48b 100%); color: #1a365d; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
          .highlight .amount { font-size: 28px; font-weight: bold; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
          .emoji { font-size: 20px; margin-right: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Novo Lead - Royal Diamond WA</h1>
            <p>Um novo cliente está interessado em seus serviços!</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label"><span class="emoji">👤</span>Nome</div>
              <div class="field-value">${name || "Não informado"}</div>
            </div>
            
            <div class="field">
              <div class="field-label"><span class="emoji">📱</span>Telefone</div>
              <div class="field-value">${phone || "Não informado"}</div>
            </div>
            
            <div class="field">
              <div class="field-label"><span class="emoji">📧</span>Email</div>
              <div class="field-value">${email || "Não informado"}</div>
            </div>
            
            <div class="field">
              <div class="field-label"><span class="emoji">🏠</span>Endereço</div>
              <div class="field-value">${address || "Não informado"}</div>
            </div>
            
            <div class="field">
              <div class="field-label"><span class="emoji">🧹</span>Serviço</div>
              <div class="field-value">${service || "Não especificado"}</div>
            </div>
            
            ${estimate ? `
            <div class="highlight">
              <div class="field-label">💰 Estimativa</div>
              <div class="amount">${estimate}</div>
            </div>
            ` : ""}
            
            ${details ? `
            <div class="field">
              <div class="field-label"><span class="emoji">📝</span>Detalhes Adicionais</div>
              <div class="field-value">${details}</div>
            </div>
            ` : ""}
          </div>
          
          <div class="footer">
            <p><strong>Responda a este cliente o mais rápido possível!</strong></p>
            <p>Royal Diamond Cleaning WA</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Royal Diamond <onboarding@resend.dev>",
        to: [BUSINESS_EMAIL],
        subject: `🔔 Novo Lead: ${name || "Cliente"} - ${service || "Serviço de Limpeza"}`,
        html: emailHtml,
      }),
    });

    const emailResponse = await response.json();

    if (!response.ok) {
      console.error("Resend error:", emailResponse);
      return new Response(JSON.stringify({ error: "Failed to send email", details: emailResponse }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
