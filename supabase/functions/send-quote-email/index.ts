
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = 're_DxP1bVHC_E19HngoCiNeAdEyD9aUUmFur'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
  
  // Add proper error handling for JSON parsing
  let requestData: QuoteSendRequest;
  try {
    if (req.body === null) {
      throw new Error("Request body is empty");
    }
    requestData = await req.json();
    
    // Validate required fields
    if (!requestData.email) {
      throw new Error("Email is required");
    }
    
    // Log incoming data for debugging
    console.log("Received request data:", JSON.stringify(requestData));
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Invalid request format: " + error.message 
      }),
      { 
        status: 400, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders,
        } 
      }
    );
  }

  const { email, quoteAmount, quoteDetails, customerName } = requestData;
  
  try {
    console.log(`Sending quote to ${email} for $${quoteAmount}`);
    
    // Format the quote details for the email
    let emailContent = `
      <h1>Your Car Insurance Quote</h1>
      <p>Dear ${customerName || "Valued Customer"},</p>
      <p>Thank you for your interest in our car insurance services. Based on the information you provided, we are pleased to offer you the following quote:</p>
      <h2>Monthly Premium: $${quoteAmount}</h2>
      
      <h3>Quote Details:</h3>
    `;
    
    // Add each section of details
    if (quoteDetails) {
      Object.entries(quoteDetails).forEach(([section, details]) => {
        emailContent += `<h4>${section}</h4><ul>`;
        Object.entries(details).forEach(([key, value]) => {
          emailContent += `<li><strong>${key}:</strong> ${value}</li>`;
        });
        emailContent += `</ul>`;
      });
    }
    
    emailContent += `
      <p>This quote is valid for 30 days from today. To proceed with this offer or to ask any questions, please contact our customer service team.</p>
      <p>Best regards,<br>Car Insurance Team</p>
    `;

    // Send email to the customer
    const customerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Your Car Insurance Quote',
        html: emailContent
      }),
    });
    
    const customerEmailResult = await customerResponse.json();
    console.log("Customer email response:", customerEmailResult);
    
    // Send the same quote to admin email
    console.log("Sending copy of quote to admin email: edwini.kofi@hotmail.com");
    const adminResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['edwini.kofi@hotmail.com'],
        subject: `[ADMIN COPY] Car Insurance Quote for ${email}`,
        html: emailContent
      }),
    });
    
    const adminEmailResult = await adminResponse.json();
    console.log("Admin email response:", adminEmailResult);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote email sent successfully",
        customerEmail: customerEmailResult,
        adminEmail: adminEmailResult
      }),
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
