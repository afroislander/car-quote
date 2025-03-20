
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = 're_DxP1bVHC_E19HngoCiNeAdEyD9aUUmFur'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
};

interface QuoteSendRequest {
  email: string;
  quoteAmount: string;
  quoteDetails: Record<string, Record<string, string>>;
  customerName: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  const { email, quoteAmount, quoteDetails, customerName } = (await req.json()) as QuoteSendRequest;
  try {
    
    
    console.log(`Sending quote to ${email} for $${quoteAmount}`);
    
    // In a real implementation, you would connect to an email service like Resend, SendGrid, etc.
    // For this example, we'll just simulate success
    
    // Format the quote details for the email
    let emailContent = `
      <h1>Your Car Insurance Quote</h1>
      <p>Dear ${customerName || "Valued Customer"},</p>
      <p>Thank you for your interest in our car insurance services. Based on the information you provided, we are pleased to offer you the following quote:</p>
      <h2>Monthly Premium: $${quoteAmount}</h2>
      
      <h3>Quote Details:</h3>
    `;
    
    // Add each section of details
    Object.entries(quoteDetails).forEach(([section, details]) => {
      emailContent += `<h4>${section}</h4><ul>`;
      Object.entries(details).forEach(([key, value]) => {
        emailContent += `<li><strong>${key}:</strong> ${value}</li>`;
      });
      emailContent += `</ul>`;
    });
    
    emailContent += `
      <p>This quote is valid for 30 days from today. To proceed with this offer or to ask any questions, please contact our customer service team.</p>
      <p>Best regards,<br>Car Insurance Team</p>
    `;


    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Hello World',
        html: emailContent
      }),
    })
    
    // Also log that we're BCCing the admin
    console.log(`Also BCCing quote to edwini.kofi@hotmail.com`);
    
    
    return new Response(
      JSON.stringify({ success: true, message: "Quote email sent successfully" }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders,
        } 
      }
    );
  } catch (error) {
    console.error("Error in send-quote-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send quote email" 
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders,
        } 
      }
    );
  }
});
