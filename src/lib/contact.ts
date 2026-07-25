import { useEffect, useState } from "react";

export type CityId = "attock" | "hazro" | "nowshera" | "mardan";

export type CityInfo = {
  id: CityId;
  name: string;
  outlets: number;
  note: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string; // international, no + or spaces
  addressLines: string[];
  hours: { d: string; t: string }[];
  mapEmbed: string;
};

export const CITIES: Record<CityId, CityInfo> = {
  attock: {
    id: "attock",
    name: "Attock",
    outlets: 1,
    note: "Teen Meela Chowk — flagship bakeshop",
    phoneDisplay: "+92 335 6633668",
    phoneTel: "tel:+923356633668",
    whatsappNumber: "923356633668",
    addressLines: [
      "Opposite Total Parco Petrol Pump,",
      "Near Teen Meela Chowk,",
      "Attock, Pakistan.",
    ],
    hours: [
      { d: "Monday – Thursday", t: "11:00 AM – 11:00 PM" },
      { d: "Friday – Sunday", t: "11:00 AM – 12:00 AM" },
    ],
    mapEmbed: "https://www.google.com/maps?q=Teen+Meela+Chowk+Attock+Pakistan&output=embed",
  },
  hazro: {
    id: "hazro",
    name: "Hazro",
    outlets: 1,
    note: "New branch — freshly opened",
    phoneDisplay: "+92 335 6633668",
    phoneTel: "tel:+923356633668",
    whatsappNumber: "923356633668",
    addressLines: ["Main Bazaar,", "Hazro, Pakistan."],
    hours: [{ d: "Open Daily", t: "11:00 AM – 11:00 PM" }],
    mapEmbed: "https://www.google.com/maps?q=Hazro+Pakistan&output=embed",
  },
  nowshera: {
    id: "nowshera",
    name: "Nowshera Cantt",
    outlets: 1,
    note: "CB Mall — Nowshera Cantonment",
    phoneDisplay: "+92 312 6633668",
    phoneTel: "tel:+923126633668",
    whatsappNumber: "923126633668",
    addressLines: [
      "Shop 1, CB Mall,",
      "Near PSO Petrol Pump,",
      "Nowshera Cantonment, Pakistan.",
    ],
    hours: [{ d: "Open Daily", t: "11:00 AM – 11:00 PM" }],
    mapEmbed:
      "https://www.google.com/maps?q=CB+Mall+Nowshera+Cantonment+Pakistan&output=embed",
  },
  mardan: {
    id: "mardan",
    name: "Mardan",
    outlets: 1,
    note: "College Chowk — opposite Bilal Masjid",
    phoneDisplay: "+92 314 6633668",
    phoneTel: "tel:+923146633668",
    whatsappNumber: "923146633668",
    addressLines: [
      "Madina III Petrol Pump (PSO),",
      "Opposite Bilal Masjid, College Chowk,",
      "Mardan, Pakistan.",
    ],
    hours: [{ d: "Open Daily", t: "11:00 AM – 11:00 PM" }],
    mapEmbed:
      "https://www.google.com/maps?q=College+Chowk+Mardan+Pakistan&output=embed",
  },
};

export const CITY_LIST: CityInfo[] = Object.values(CITIES);
export const DEFAULT_CITY: CityId = "attock";
const STORAGE_KEY = "leto:city";

export function getSelectedCity(): CityInfo {
  if (typeof window === "undefined") return CITIES[DEFAULT_CITY];
  const id = window.localStorage.getItem(STORAGE_KEY) as CityId | null;
  return (id && CITIES[id]) || CITIES[DEFAULT_CITY];
}

export function setSelectedCity(id: CityId) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, id);
    window.dispatchEvent(new CustomEvent("leto:city-change", { detail: id }));
  }
}

export function useSelectedCity(): CityInfo {
  const [city, setCity] = useState<CityInfo>(() => CITIES[DEFAULT_CITY]);
  useEffect(() => {
    setCity(getSelectedCity());
    const onChange = () => setCity(getSelectedCity());
    window.addEventListener("leto:city-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("leto:city-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return city;
}

// ---- Legacy defaults (Attock) kept for non-city-aware surfaces ----
export const PHONE_DISPLAY = CITIES.attock.phoneDisplay;
export const PHONE_TEL = CITIES.attock.phoneTel;
export const ADDRESS_LINES = CITIES.attock.addressLines;
export const HOURS = CITIES.attock.hours;

export const WHATSAPP_URL = `https://wa.me/${CITIES.attock.whatsappNumber}?text=${encodeURIComponent(
  "Hi L'ETO Bakeshop, I'd like to place an order.",
)}`;

export function whatsappOrderUrl(itemName: string, cityId?: CityId) {
  const city = cityId ? CITIES[cityId] : getSelectedCity();
  const text = `Hey L'ETO, I want to order your ${itemName}.`;
  return `https://wa.me/${city.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const SOCIAL = {
  instagram: "https://instagram.com/letobakeshop",
  facebook: "https://facebook.com/letobakeshop",
  tiktok: "https://www.tiktok.com/@letobakeshop",
};
