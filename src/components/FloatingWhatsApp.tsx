import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <motion.button
      onClick={() => window.openWhatsAppSelector?.()}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:bg-[#1EBE5D] transition-all flex items-center justify-center group cursor-pointer border-none outline-none"
      aria-label="Contactar por WhatsApp"
    >
      <div className="absolute -top-12 -right-2 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        ¿En qué podemos ayudarte?
      </div>
      <MessageCircle size={32} />
    </motion.button>
  );
}
