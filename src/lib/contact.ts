export const PHONE_DISPLAY = "+92 335 6633668";
export const PHONE_TEL = "tel:+923356633668";
export const WHATSAPP_URL =
  "https://wa.me/923356633668?text=Hi%20L'ETO%20Bakeshop%2C%20I%27d%20like%20to%20place%20an%20order.";

export function whatsappOrderUrl(itemName: string) {
  const text = `Hey L'ETO, I want to order your ${itemName}.`;
  return `https://wa.me/923356633668?text=${encodeURIComponent(text)}`;
}
export const ADDRESS_LINES = [
  "Opposite Total Parco Petrol Pump,",
  "Near Teen Meela Chowk,",
  "Attock, Pakistan.",
];
export const SOCIAL = {
  instagram: "https://instagram.com/letobakeshop",
  facebook: "https://facebook.com/letobakeshop",
  tiktok: "https://www.tiktok.com/@letobakeshop",
};
export const HOURS = [
  { d: "Monday – Thursday", t: "11:00 AM – 11:00 PM" },
  { d: "Friday – Sunday", t: "11:00 AM – 12:00 AM" },
];
