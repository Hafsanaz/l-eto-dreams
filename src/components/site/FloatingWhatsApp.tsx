import { WHATSAPP_URL } from "@/lib/contact";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] transition hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.21c-.28-.14-1.65-.81-1.91-.9-.26-.1-.45-.14-.63.14-.18.28-.72.9-.88 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.47-.63-.48l-.54-.01a1.03 1.03 0 0 0-.75.34c-.26.28-.98.96-.98 2.33s1 2.71 1.14 2.89c.14.18 1.97 3 4.78 4.21.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32zM16 3a13 13 0 0 0-11.1 19.78L3 29l6.4-1.83A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.49l-.39-.23-3.8 1.09 1.11-3.7-.25-.4A10.6 10.6 0 1 1 16 26.6z"/>
      </svg>
    </a>
  );
}
