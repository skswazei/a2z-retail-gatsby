const API_BASE_URL = process.env.GATSBY_API_BASE_URL;

export interface ContactFormData {
  full_name: string;
  store_name: string;
  phone: string;
  email: string;
  store_type: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z-contact/v1/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit form");
  }

  return result;
};

export const submitSubscribe = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z-subscribe/v1/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Could not subscribe");
  }

  return result;
};
