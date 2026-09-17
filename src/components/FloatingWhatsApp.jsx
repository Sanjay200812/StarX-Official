import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import { siteData } from '../data/siteData';

/**
 * FloatingWhatsApp Component
 * Compact floating WhatsApp badge toggling a smoked-glass dark popover.
 */
export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { phoneNumbers } = siteData.contact;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'max(20px, calc(env(safe-area-inset-bottom) + 12px))',
        right: '18px',
        zIndex: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
    >
      {/* Smoked-Glass Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginBottom: '12px',
              width: '310px',
              backgroundColor: 'rgba(18, 18, 20, 0.92)',
              backdropFilter: 'blur(24px) saturate(120%)',
              WebkitBackdropFilter: 'blur(24px) saturate(120%)',
              borderRadius: '22px',
              padding: '1.35rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF'
                  }}
                >
                  <MessageCircle size={16} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      margin: 0,
                      color: '#F5F5F7'
                    }}
                  >
                    Chat with StarX
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#25D366', fontWeight: 600 }}>
                    Official WhatsApp
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp menu"
                style={{
                  color: '#A1A1A6',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Quick Numbers list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {phoneNumbers.map((phone, idx) => (
                <a
                  key={phone.id}
                  href={phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        color: '#737378',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        letterSpacing: '0.04em'
                      }}
                    >
                      Line 0{idx + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#F5F5F7'
                      }}
                    >
                      {phone.display}
                    </span>
                  </div>

                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(37, 211, 102, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#25D366'
                    }}
                  >
                    <ExternalLink size={14} />
                  </div>
                </a>
              ))}
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '0.75rem',
                color: '#737378',
                textAlign: 'center',
                marginTop: '0.95rem',
                marginBottom: 0
              }}
            >
              Direct contact for gig enquiries & band bookings.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact StarX Live on WhatsApp"
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(37, 211, 102, 0.35)',
          border: 'none',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
