// Email Service Configuration
// This file contains the setup for sending emails from the contact form

// Email template data structure
export interface EmailTemplateData {
  name: string;
  email: string;
  phone: string;
  requestType: string;
  eventDate: string;
  guestCount: string;
  message: string;
  submittedAt: string;
  allergies?: string;
  budget?: string;
}

// Mock email service for development
export const sendEmail = async (
  formData: EmailTemplateData,
): Promise<boolean> => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log the form data that would be sent
    console.log("Email would be sent with the following data:");
    console.log("═══════════════════════════════════════════════");
    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    console.log("Phone:", formData.phone);
    console.log("Request Type:", formData.requestType);
    console.log("Event Date:", formData.eventDate);
    console.log("Guest Count:", formData.guestCount);
    console.log("Message:", formData.message);
    console.log("Submitted At:", formData.submittedAt);
    if (formData.allergies) console.log("Allergies:", formData.allergies);
    if (formData.budget) console.log("Budget:", formData.budget);
    console.log("═══════════════════════════════════════════════");

    // Always return true for development
    return true;
  } catch (error) {
    console.error("Mock email service error:", error);
    return false;
  }
};

// Configuration for when you're ready to implement real email service
export const EMAILJS_CONFIG = {
  // Replace these with your actual EmailJS credentials
  PUBLIC_KEY: "your_emailjs_public_key",
  SERVICE_ID: "your_emailjs_service_id",
  TEMPLATE_ID: "your_emailjs_template_id",
};

// Alternative: Formspree endpoint (when you set it up)
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/your_form_id";

// Real EmailJS implementation (commented out for development)
/*
import emailjs from 'emailjs-com';

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export const sendEmailWithEmailJS = async (formData: EmailTemplateData): Promise<boolean> => {
  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        request_type: formData.requestType,
        event_date: formData.eventDate,
        guest_count: formData.guestCount,
        message: formData.message,
        submitted_at: formData.submittedAt,
        allergies: formData.allergies || 'No especificado',
        budget: formData.budget || 'No especificado'
      }
    );

    return result.status === 200;
  } catch (error) {
    console.error('Error sending email with EmailJS:', error);
    return false;
  }
};
*/
