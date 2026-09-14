import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  ChevronDown,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { siteData } from '../data/siteData';

/**
 * ContactPopover Component
 *
 * Requirements:
 * - Desktop: Appears directly below "Contact StarX" button, aligned right.
 * - Theme: Smoked glass rgba(14, 14, 16, 0.90), blur(24px) saturate(115%), border rgba(255,255,255,0.08), radius 18px.
 * - Header: "Connect with StarX", "Follow, call or message us.", tiny StarX red accent detail.
 * - Rows:
 *     1. Instagram (@starxliveband)
 *     2. Facebook (@starxliveband)
 *     3. YouTube (StarX Live)
 *     4. WhatsApp (expands 7337253898 & 9390754569)
 *     5. Call StarX (expands 7337253898 & 9390754569)
 *     6. Email (starxliveofficial@gmail.com)
 *     7. Location: Hyderabad, TS, AP - India
 * - Animations:
 *     Open: opacity 0->1, y -6->0, scale 0.98->1 (320ms, cubic-bezier(0.22, 1, 0.36, 1))
 *     Close: opacity 1->0, y 0->-5, scale 1->0.985 (250ms)
 */
export const ContactPopover = ({ onClose, isMobile = false }) => {
  const { contact, social } = siteData;
  const [isWhatsAppExpanded, setIsWhatsAppExpanded] = useState(false);
  const [isCallExpanded, setIsCallExpanded] = useState(false);

  return (
    <motion.div
      id="contact-starx-popover"
      role="dialog"
      aria-label="Connect with StarX"
      initial={{ opacity: 0, y: isMobile ? 8 : -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: isMobile ? 8 : -5, scale: 0.985 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: isMobile ? 'relative' : 'absolute',
        top: isMobile ? 'auto' : 'calc(100% + 12px)',
        right: 0,
        width: isMobile ? 'calc(100vw - 24px)' : '325px',
        maxWidth: isMobile ? '330px' : 'calc(100vw - 24px)',
        margin: isMobile ? '0 auto' : undefined,
        boxSizing: 'border-box',
        backgroundColor: 'rgba(14, 14, 16, 0.94)',
        backdropFilter: 'blur(24px) saturate(115%)',
        WebkitBackdropFilter: 'blur(24px) saturate(115%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '18px',
        boxShadow: '0 18px 50px rgba(0, 0, 0, 0.45)',
        padding: '14px 14px 12px 14px',
        zIndex: 9999,
        userSelect: 'none'
      }}
    >
      {/* Popover Header with StarX Red Accent */}
      <div style={{ marginBottom: '10px', padding: '2px 4px 6px 4px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '3px'
          }}
        >
          {/* Small StarX Red Detail */}
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#B3131B',
              display: 'inline-block'
            }}
          />
          <h4
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#F5F5F7',
              margin: 0
            }}
          >
            Connect with StarX
          </h4>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: '12px',
            color: '#8E8E93',
            margin: 0,
            letterSpacing: '-0.01em'
          }}
        >
          Follow, call or message us.
        </p>
      </div>

      {/* Items Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* 1. Instagram */}
        <a
          href={social.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="popover-row"
          style={rowStyle}
          onClick={onClose}
        >
          <div style={iconBoxStyle}>
            <Instagram size={17} style={{ color: '#E4E4E7' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={platformLabelStyle}>Instagram</div>
            <div style={accountNameStyle}>StarX Live Band</div>
            <div style={usernameStyle}>@starxliveband</div>
          </div>
          <ExternalLink size={12} style={{ color: '#737378', flexShrink: 0 }} />
        </a>

        {/* 2. Facebook */}
        <a
          href={social.facebook.url}
          target="_blank"
          rel="noopener noreferrer"
          className="popover-row"
          style={rowStyle}
          onClick={onClose}
        >
          <div style={iconBoxStyle}>
            <Facebook size={17} style={{ color: '#E4E4E7' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={platformLabelStyle}>Facebook</div>
            <div style={accountNameStyle}>Starx LiveBand</div>
            <div style={usernameStyle}>@starxliveband</div>
          </div>
          <ExternalLink size={12} style={{ color: '#737378', flexShrink: 0 }} />
        </a>

        {/* 3. YouTube */}
        <a
          href={social.youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          className="popover-row"
          style={rowStyle}
          onClick={onClose}
        >
          <div style={iconBoxStyle}>
            <Youtube size={17} style={{ color: '#E4E4E7' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={platformLabelStyle}>YouTube</div>
            <div style={accountNameStyle}>StarX Live Band</div>
            <div style={usernameStyle}>@starxliveband</div>
          </div>
          <ExternalLink size={12} style={{ color: '#737378', flexShrink: 0 }} />
        </a>

        {/* 4. WhatsApp (Expandable Choice for 2 numbers) */}
        <div>
          <button
            type="button"
            className="popover-row"
            style={{ ...rowStyle, width: '100%', cursor: 'pointer' }}
            onClick={() => {
              setIsWhatsAppExpanded((prev) => !prev);
              setIsCallExpanded(false);
            }}
            aria-expanded={isWhatsAppExpanded}
          >
            <div style={iconBoxStyle}>
              <MessageCircle size={17} style={{ color: '#E4E4E7' }} />
            </div>
            <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
              <div style={titleStyle}>WhatsApp</div>
              <div style={subtitleStyle}>Chat with band</div>
            </div>
            <ChevronDown
              size={14}
              style={{
                color: '#8E8E93',
                transform: isWhatsAppExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease'
              }}
            />
          </button>

          <AnimatePresence>
            {isWhatsAppExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  overflow: 'hidden',
                  paddingLeft: '38px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '2px',
                  marginBottom: '4px'
                }}
              >
                {contact.phoneNumbers.map((phone) => (
                  <a
                    key={phone.id}
                    href={phone.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popover-sub-row"
                    style={subRowStyle}
                    onClick={onClose}
                  >
                    <span style={{ color: '#F5F5F7', fontWeight: 500 }}>
                      +91 {phone.number}
                    </span>
                    <ExternalLink size={11} style={{ color: '#B3131B' }} />
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. Call StarX (Expandable Choice for 2 numbers) */}
        <div>
          <button
            type="button"
            className="popover-row"
            style={{ ...rowStyle, width: '100%', cursor: 'pointer' }}
            onClick={() => {
              setIsCallExpanded((prev) => !prev);
              setIsWhatsAppExpanded(false);
            }}
            aria-expanded={isCallExpanded}
          >
            <div style={iconBoxStyle}>
              <Phone size={17} style={{ color: '#E4E4E7' }} />
            </div>
            <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
              <div style={titleStyle}>Call StarX</div>
              <div style={subtitleStyle}>Direct booking lines</div>
            </div>
            <ChevronDown
              size={14}
              style={{
                color: '#8E8E93',
                transform: isCallExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease'
              }}
            />
          </button>

          <AnimatePresence>
            {isCallExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  overflow: 'hidden',
                  paddingLeft: '38px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '2px',
                  marginBottom: '4px'
                }}
              >
                {contact.phoneNumbers.map((phone) => (
                  <a
                    key={phone.id}
                    href={phone.call}
                    className="popover-sub-row"
                    style={subRowStyle}
                    onClick={onClose}
                  >
                    <span style={{ color: '#F5F5F7', fontWeight: 500 }}>
                      +91 {phone.number}
                    </span>
                    <Phone size={11} style={{ color: '#B3131B' }} />
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 6. Email */}
        <a
          href={contact.emailMailto || `mailto:${contact.email}`}
          className="popover-row"
          style={rowStyle}
          onClick={onClose}
        >
          <div style={iconBoxStyle}>
            <Mail size={17} style={{ color: '#E4E4E7' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={titleStyle}>Email</div>
            <div
              style={{
                ...subtitleStyle,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              {contact.email}
            </div>
          </div>
        </a>
      </div>

      {/* 7. Optional Location Information (Spec 12) */}
      <div
        style={{
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '6px',
          paddingRight: '6px'
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: '11px',
            color: '#737378',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}
        >
          Hyderabad
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: '11px',
            color: '#55555B'
          }}
        >
          TS, AP - INDIA
        </span>
      </div>

      <style>{`
        .popover-row {
          transition: background-color 0.25s ease, transform 0.2s ease;
        }
        .popover-row:hover {
          background-color: rgba(255, 255, 255, 0.06) !important;
        }
        .popover-sub-row {
          transition: background-color 0.2s ease;
        }
        .popover-sub-row:hover {
          background-color: rgba(255, 255, 255, 0.08) !important;
        }
      `}</style>
    </motion.div>
  );
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '7px 9px',
  borderRadius: '12px',
  textDecoration: 'none',
  background: 'transparent',
  border: 'none',
  transition: 'background-color 0.25s ease',
  boxSizing: 'border-box'
};

const subRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 12px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  textDecoration: 'none',
  fontFamily: "var(--font-body)",
  fontSize: '12px'
};

const iconBoxStyle = {
  width: '34px',
  height: '34px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};

const platformLabelStyle = {
  fontFamily: "var(--font-body)",
  fontSize: '10.5px',
  fontWeight: 500,
  letterSpacing: '0.01em',
  color: '#8E8E93',
  textTransform: 'none',
  lineHeight: 1.2,
  marginBottom: '2px'
};

const accountNameStyle = {
  fontFamily: "var(--font-heading)",
  fontSize: '14.5px',
  fontWeight: 600,
  color: '#F5F5F7',
  lineHeight: 1.25,
  letterSpacing: '-0.015em'
};

const usernameStyle = {
  fontFamily: "var(--font-body)",
  fontSize: '12px',
  color: '#737378',
  lineHeight: 1.2,
  marginTop: '1px'
};

const titleStyle = {
  fontFamily: "var(--font-heading)",
  fontSize: '14px',
  fontWeight: 550,
  color: '#F5F5F7',
  lineHeight: 1.25
};

const subtitleStyle = {
  fontFamily: "var(--font-body)",
  fontSize: '12px',
  color: '#8E8E93',
  lineHeight: 1.25
};

export default ContactPopover;
