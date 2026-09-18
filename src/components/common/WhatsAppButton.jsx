import { FaWhatsapp, FaEnvelope, FaTelegram } from 'react-icons/fa';

export default function WhatsAppButton() {
  const whatsappNumber = '19852913802'; // Your WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const emailAddress = 'info@chemicalssite.com';
  const telegramUrl = 'https://t.me/chemicalssite'; // Update with your Telegram username or group link

  return (
    <div className="fixed left-6 bottom-6 z-40 flex flex-col gap-3 items-start">
      {/* Email Button */}
      <div className="group relative">
        <a
          href={`https://mail.google.com/mail/?view=cm&to=${emailAddress}&su=Inquiry%20from%20ChemicalsSite`}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-bone-light text-ink border border-ink/15 rounded-full p-3.5 shadow-editorial transition-all duration-500 ease-editorial hover:bg-ink hover:text-bone-light"
          aria-label="Email us"
        >
          <FaEnvelope className="text-xl" aria-hidden="true" />
        </a>

        {/* Tooltip */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-ink text-bone-light px-3.5 py-2 text-[10px] uppercase tracking-editorial whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Email us
        </span>
      </div>

      {/* Telegram Button */}
      <div className="group relative">
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-bone-light text-ink border border-ink/15 rounded-full p-3.5 shadow-editorial transition-all duration-500 ease-editorial hover:bg-ink hover:text-bone-light"
          aria-label="Chat with us on Telegram"
        >
          <FaTelegram className="text-xl" aria-hidden="true" />
        </a>

        {/* Tooltip */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-ink text-bone-light px-3.5 py-2 text-[10px] uppercase tracking-editorial whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on Telegram
        </span>
      </div>

      {/* WhatsApp Button */}
      <div className="group relative">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-ink text-bone-light rounded-full p-3.5 shadow-editorial transition-all duration-500 ease-editorial hover:bg-amber-dark relative"
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp className="text-xl" aria-hidden="true" />
        </a>
        
        {/* Tooltip - only appears on this button's hover */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-ink text-bone-light px-3.5 py-2 text-[10px] uppercase tracking-editorial whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </div>
    </div>
  );
}
