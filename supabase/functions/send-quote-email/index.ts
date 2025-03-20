
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = 're_DxP1bVHC_E19HngoCiNeAdEyD9aUUmFur';

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
  
  console.log("Request method:", req.method);
  console.log("Request headers:", JSON.stringify(Object.fromEntries(req.headers.entries())));
  
  // Add proper error handling for JSON parsing
  let requestData: QuoteSendRequest;
  
  try {
    console.log("Beginning to parse request body");
    
    if (req.body === null) {
      throw new Error("Request body is empty");
    }
    
    // Get the request body as text first to diagnose issues
    const bodyText = await req.text();
    console.log("Raw request body:", bodyText);
    
    if (!bodyText || bodyText.trim() === '') {
      throw new Error("Request body is empty or whitespace");
    }
    
    try {
      // Now try to parse it as JSON
      requestData = JSON.parse(bodyText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      throw new Error(`Failed to parse JSON: ${parseError.message}`);
    }
    
    // Validate required fields
    if (!requestData.email) {
      throw new Error("Email is required");
    }
    
    console.log("Successfully parsed request data:", JSON.stringify(requestData));
  } catch (error) {
    console.error("Error processing request body:", error);
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

    // IMPORTANT: In Resend's testing mode, you can only send emails to YOUR OWN email
    // We'll use a fixed email address that you own for testing
    const testingEmail = "afroisland3r@gmail.com"; // This must be the email you used to sign up for Resend
    
    console.log(`NOTE: Using testing email ${testingEmail} instead of ${email} due to Resend testing restrictions`);

    // Send email to the testing email
    const customerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: [testingEmail], // Use the testing email instead of customer email
        subject: `[TEST] Car Insurance Quote for ${email}`,
        html: emailContent
      }),
    });
    
    const customerEmailResult = await customerResponse.json();
    console.log("Email response:", customerEmailResult);
    
    // Return success with a note about the testing mode
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote email sent successfully (to testing email during development)",
        note: "In development mode, Resend only allows sending to the email used for signup.",
        customerEmail: customerEmailResult
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
