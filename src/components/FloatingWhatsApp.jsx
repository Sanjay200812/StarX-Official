import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteData } from '../data/siteData';

/**
 * Floating WhatsApp action.
 * Opens WhatsApp directly with the pre-filled booking enquiry; the message is
 * never rendered in the website UI.
 */
export const FloatingWhatsApp = () => {
  const primaryWhatsApp = siteData.contact.phoneNumbers?.[0]?.whatsapp;

  if (!primaryWhatsApp) return null;

  return (
    <motion.a
      href={primaryWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Enquire about booking StarX Live on WhatsApp"
      style={{
        position: 'fixed',
        bottom: 'max(20px, calc(env(safe-area-inset-bottom) + 12px))',
        right: '18px',
        zIndex: 70,
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 28px rgba(37, 211, 102, 0.32)',
        border: 'none'
      }}
    >
      <MessageCircle size={23} />
    </motion.a>
  );
};

export default FloatingWhatsApp;
