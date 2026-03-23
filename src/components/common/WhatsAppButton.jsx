import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function WhatsAppButton() {
  const whatsappNumber = '19802432914'; // Your WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const emailAddress = 'info@darkchemsite.com';

  return (
    <div className="fixed left-6 bottom-6 z-50 flex flex-col gap-4 items-start">
      {/* Email Button */}
      <div className="group relative">
        <a
          href={`mailto:${emailAddress}`}
          className="block bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:shadow-cyan-500/50"
          aria-label="Email us"
        >
          <FaEnvelope className="text-3xl" aria-hidden="true" />
        </a>
        
        {/* Tooltip - only appears on this button's hover */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Email us
        </span>
      </div>

      {/* WhatsApp Button */}
      <div className="group relative">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:shadow-green-500/50 relative"
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp className="text-3xl" aria-hidden="true" />
          
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75 pointer-events-none"></span>
        </a>
        
        {/* Tooltip - only appears on this button's hover */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </div>
    </div>
  );
}
