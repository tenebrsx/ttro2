import * as React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

const iconStyle = {
  color: "#372813",
  opacity: 0.85,
  strokeWidth: 1.5,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Compartamos tu Sueño - Heart with speech bubble
export const HeartTalk: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Speech bubble */}
    <path
      d="M8 12c0-3.314 2.686-6 6-6h16c3.314 0 6 2.686 6 6v8c0 3.314-2.686 6-6 6H20l-6 6v-6H14c-3.314 0-6-2.686-6-6V12z"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Heart inside bubble */}
    <path
      d="M18.5 14.5c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5l5.5 5.5 5.5-5.5c1.5-1.5 1.5-4 0-5.5s-4-1.5-5.5 0z"
      stroke="currentColor"
      strokeWidth={1.3}
    />
    {/* Small decorative dots */}
    <circle cx="28" cy="16" r="0.8" fill="currentColor" opacity="0.6" />
    <circle cx="30.5" cy="18.5" r="0.6" fill="currentColor" opacity="0.4" />
  </svg>
);

// Diseñemos la Magia - Magic wand with sparkles
export const MagicWand: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Wand */}
    <path d="M12 36L36 12" stroke="currentColor" strokeWidth={1.4} />
    {/* Wand tip star */}
    <path
      d="M36 12l-2-6 6 2-6 2 2 6-2-6-6-2 6-2 2-6z"
      stroke="currentColor"
      strokeWidth={1.2}
      fill="none"
    />
    {/* Handle decoration */}
    <circle cx="12" cy="36" r="2.5" stroke="currentColor" strokeWidth={1.3} />
    {/* Sparkles */}
    <path
      d="M20 20l-1-3 3 1-3 1 1 3-1-3-3-1 3-1 1-3z"
      stroke="currentColor"
      strokeWidth={1.1}
    />
    <path
      d="M28 28l-0.8-2.4 2.4 0.8-2.4 0.8 0.8 2.4-0.8-2.4-2.4-0.8 2.4-0.8 0.8-2.4z"
      stroke="currentColor"
      strokeWidth={1.1}
    />
    <circle cx="24" cy="16" r="0.8" fill="currentColor" opacity="0.7" />
    <circle cx="32" cy="24" r="0.6" fill="currentColor" opacity="0.5" />
  </svg>
);

// Artesanía con Alma - Mixing bowl with heart
export const ArtisanBowl: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Mixing bowl */}
    <path
      d="M8 18c0-2 1-3 3-3h26c2 0 3 1 3 3v2c0 8-6 14-14 14h-4c-8 0-14-6-14-14v-2z"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Mixing spoon */}
    <path d="M24 15v-9" stroke="currentColor" strokeWidth={1.3} />
    <ellipse
      cx="24"
      cy="6"
      rx="2"
      ry="3"
      stroke="currentColor"
      strokeWidth={1.3}
    />
    {/* Heart in bowl */}
    <path
      d="M21 22c-1-1-2.5-1-3.5 0s-1 2.5 0 3.5l3.5 3.5 3.5-3.5c1-1 1-2.5 0-3.5s-2.5-1-3.5 0z"
      stroke="currentColor"
      strokeWidth={1.2}
    />
    {/* Steam lines */}
    <path
      d="M18 12c0-1 0.5-2 0.5-2"
      stroke="currentColor"
      strokeWidth={1.1}
      opacity="0.6"
    />
    <path
      d="M30 12c0-1 0.5-2 0.5-2"
      stroke="currentColor"
      strokeWidth={1.1}
      opacity="0.6"
    />
  </svg>
);

// El Momento Perfecto - Gift box with heart ribbon
export const PerfectGift: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Gift box base */}
    <rect
      x="8"
      y="18"
      width="32"
      height="22"
      rx="2"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Box lid */}
    <rect
      x="6"
      y="14"
      width="36"
      height="8"
      rx="1"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Vertical ribbon */}
    <path d="M24 14v26" stroke="currentColor" strokeWidth={1.3} />
    {/* Heart bow */}
    <path
      d="M21 10c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5l2.5 2.5"
      stroke="currentColor"
      strokeWidth={1.2}
    />
    <path
      d="M27 10c1.5-1.5 4-1.5 5.5 0s1.5 4 0 5.5l-2.5 2.5"
      stroke="currentColor"
      strokeWidth={1.2}
    />
    {/* Bow center */}
    <circle cx="24" cy="14" r="1.5" stroke="currentColor" strokeWidth={1.2} />
    {/* Decorative dots */}
    <circle cx="16" cy="28" r="0.6" fill="currentColor" opacity="0.5" />
    <circle cx="32" cy="32" r="0.6" fill="currentColor" opacity="0.5" />
  </svg>
);

// Compromiso del Corazón - Hand holding heart
export const HandHeart: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Hand outline */}
    <path
      d="M14 32c0 4 2 8 6 8h8c4 0 6-4 6-8V20c0-2-1-4-3-4s-3 2-3 4v4"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    <path
      d="M28 20V16c0-2-1-4-3-4s-3 2-3 4v8"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    <path
      d="M22 24V14c0-2-1-4-3-4s-3 2-3 4v18"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    <path
      d="M16 32V26c0-2-1-4-3-4s-3 2-3 4v6"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Heart above hand */}
    <path
      d="M21 8c-2-2-5-2-7 0s-2 5 0 7l7 7 7-7c2-2 2-5 0-7s-5-2-7 0z"
      stroke="currentColor"
      strokeWidth={1.3}
    />
  </svg>
);

// Promesa Sagrada - Sacred clock with heart
export const SacredTime: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Clock circle */}
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth={1.4} />
    {/* Clock hands */}
    <path d="M24 24L24 14" stroke="currentColor" strokeWidth={1.3} />
    <path d="M24 24L30 28" stroke="currentColor" strokeWidth={1.3} />
    {/* Heart at 12 o'clock */}
    <path
      d="M22 6c-1-1-2.5-1-3.5 0s-1 2.5 0 3.5l3.5 3.5 3.5-3.5c1-1 1-2.5 0-3.5s-2.5-1-3.5 0z"
      stroke="currentColor"
      strokeWidth={1.2}
    />
    {/* Decorative marks */}
    <circle cx="24" cy="40" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="8" cy="24" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="40" cy="24" r="1" fill="currentColor" opacity="0.6" />
    {/* Center dot */}
    <circle cx="24" cy="24" r="1.5" fill="currentColor" opacity="0.8" />
  </svg>
);

// Excelencia Artesanal - Chef's hat with star
export const ArtisanChef: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Chef hat base */}
    <path
      d="M12 28h24v8c0 2-1 4-3 4H15c-2 0-3-2-3-4v-8z"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Hat band */}
    <path d="M10 28h28" stroke="currentColor" strokeWidth={1.4} />
    {/* Hat top */}
    <path
      d="M16 28c0-8 4-12 8-12s8 4 8 12"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Left puff */}
    <circle cx="16" cy="20" r="4" stroke="currentColor" strokeWidth={1.3} />
    {/* Right puff */}
    <circle cx="32" cy="20" r="4" stroke="currentColor" strokeWidth={1.3} />
    {/* Top puff */}
    <circle cx="24" cy="12" r="5" stroke="currentColor" strokeWidth={1.3} />
    {/* Star on hat */}
    <path
      d="M24 8l-1-3 3 1-3 1 1 3-1-3-3-1 3-1 1-3z"
      stroke="currentColor"
      strokeWidth={1.1}
    />
  </svg>
);

// Additional icons for other sections

// Contact/Communication - Vintage telephone with heart
export const VintagePhone: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Phone base */}
    <path
      d="M8 32c0-2 1-4 3-4h6l2-4c1-2 3-4 5-4s4 2 5 4l2 4h6c2 0 3 2 3 4v8c0 2-1 4-3 4H11c-2 0-3-2-3-4v-8z"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Handset */}
    <path
      d="M14 20c0-2 2-4 4-4h12c2 0 4 2 4 4v4c0 2-2 4-4 4H18c-2 0-4-2-4-4v-4z"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Cord */}
    <path
      d="M24 28c0 2-1 3-1 3s-1-1-1-3"
      stroke="currentColor"
      strokeWidth={1.2}
    />
    {/* Heart detail */}
    <path
      d="M21 20c-0.5-0.5-1.5-0.5-2 0s-0.5 1.5 0 2l2 2 2-2c0.5-0.5 0.5-1.5 0-2s-1.5-0.5-2 0z"
      stroke="currentColor"
      strokeWidth={1.2}
    />
  </svg>
);

// Calendar with heart
export const HeartCalendar: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Calendar base */}
    <rect
      x="6"
      y="12"
      width="36"
      height="28"
      rx="3"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Calendar header */}
    <rect
      x="6"
      y="12"
      width="36"
      height="8"
      rx="3"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Rings */}
    <rect
      x="14"
      y="6"
      width="2"
      height="12"
      rx="1"
      stroke="currentColor"
      strokeWidth={1.3}
    />
    <rect
      x="32"
      y="6"
      width="2"
      height="12"
      rx="1"
      stroke="currentColor"
      strokeWidth={1.3}
    />
    {/* Heart in center */}
    <path
      d="M21 26c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5l5.5 5.5 5.5-5.5c1.5-1.5 1.5-4 0-5.5s-4-1.5-5.5 0z"
      stroke="currentColor"
      strokeWidth={1.3}
    />
    {/* Grid dots */}
    <circle cx="14" cy="26" r="0.5" fill="currentColor" opacity="0.4" />
    <circle cx="34" cy="26" r="0.5" fill="currentColor" opacity="0.4" />
    <circle cx="14" cy="34" r="0.5" fill="currentColor" opacity="0.4" />
    <circle cx="34" cy="34" r="0.5" fill="currentColor" opacity="0.4" />
  </svg>
);

// Email with heart
export const HeartMail: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Envelope */}
    <rect
      x="6"
      y="12"
      width="36"
      height="24"
      rx="3"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Envelope flap */}
    <path d="M6 12l18 12 18-12" stroke="currentColor" strokeWidth={1.4} />
    {/* Heart seal */}
    <path
      d="M21 6c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5l5.5 5.5 5.5-5.5c1.5-1.5 1.5-4 0-5.5s-4-1.5-5.5 0z"
      stroke="currentColor"
      strokeWidth={1.2}
    />
  </svg>
);

// Location pin with heart
export const HeartLocation: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Location pin */}
    <path
      d="M24 6c-7 0-12 5-12 12 0 8 12 22 12 22s12-14 12-22c0-7-5-12-12-12z"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Heart inside pin */}
    <path
      d="M21 16c-1-1-2.5-1-3.5 0s-1 2.5 0 3.5l3.5 3.5 3.5-3.5c1-1 1-2.5 0-3.5s-2.5-1-3.5 0z"
      stroke="currentColor"
      strokeWidth={1.2}
    />
  </svg>
);

// Send message with wings
export const MessageWings: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Paper airplane */}
    <path
      d="M8 24l32-16-8 32-8-8-8-8z"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Wing lines */}
    <path d="M16 32l8-8" stroke="currentColor" strokeWidth={1.3} />
    <path d="M24 24l16-8" stroke="currentColor" strokeWidth={1.3} />
    {/* Decorative dots */}
    <circle cx="12" cy="28" r="0.6" fill="currentColor" opacity="0.5" />
    <circle cx="28" cy="20" r="0.6" fill="currentColor" opacity="0.5" />
    <circle cx="20" cy="36" r="0.6" fill="currentColor" opacity="0.5" />
  </svg>
);

// WhatsApp chat bubble
export const ChatBubble: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Main bubble */}
    <path
      d="M8 12c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v16c0 3.314-2.686 6-6 6H20l-8 8V28c-2.21 0-4-1.79-4-4V12z"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Chat dots */}
    <circle cx="18" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
    <circle cx="24" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
    <circle cx="30" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
    {/* Small decorative heart */}
    <path
      d="M27 12c-0.5-0.5-1.5-0.5-2 0s-0.5 1.5 0 2l2 2 2-2c0.5-0.5 0.5-1.5 0-2s-1.5-0.5-2 0z"
      stroke="currentColor"
      strokeWidth={1.1}
    />
  </svg>
);

// People/Users with heart
export const HeartPeople: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* First person */}
    <circle cx="18" cy="16" r="6" stroke="currentColor" strokeWidth={1.4} />
    <path
      d="M8 40c0-6 4-10 10-10s10 4 10 10"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Second person */}
    <circle cx="30" cy="18" r="5" stroke="currentColor" strokeWidth={1.4} />
    <path
      d="M22 40c0-4 3-8 8-8s8 4 8 8"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Heart between them */}
    <path
      d="M21 8c-1-1-2.5-1-3.5 0s-1 2.5 0 3.5l3.5 3.5 3.5-3.5c1-1 1-2.5 0-3.5s-2.5-1-3.5 0z"
      stroke="currentColor"
      strokeWidth={1.2}
    />
  </svg>
);

// Cake with love
export const LoveCake: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Cake base */}
    <rect
      x="8"
      y="24"
      width="32"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Cake middle layer */}
    <rect
      x="10"
      y="20"
      width="28"
      height="8"
      rx="2"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Cake top layer */}
    <rect
      x="12"
      y="16"
      width="24"
      height="8"
      rx="2"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Candles */}
    <path d="M20 16v-6" stroke="currentColor" strokeWidth={1.3} />
    <path d="M28 16v-6" stroke="currentColor" strokeWidth={1.3} />
    {/* Heart flames */}
    <path
      d="M19 8c-0.5-0.5-1.5-0.5-2 0s-0.5 1.5 0 2l2 2 2-2c0.5-0.5 0.5-1.5 0-2s-1.5-0.5-2 0z"
      stroke="currentColor"
      strokeWidth={1.1}
    />
    <path
      d="M27 8c-0.5-0.5-1.5-0.5-2 0s-0.5 1.5 0 2l2 2 2-2c0.5-0.5 0.5-1.5 0-2s-1.5-0.5-2 0z"
      stroke="currentColor"
      strokeWidth={1.1}
    />
    {/* Decorative details */}
    <circle cx="16" cy="32" r="0.8" fill="currentColor" opacity="0.5" />
    <circle cx="24" cy="30" r="0.8" fill="currentColor" opacity="0.5" />
    <circle cx="32" cy="32" r="0.8" fill="currentColor" opacity="0.5" />
  </svg>
);

// Utensils with heart
export const HeartUtensils: React.FC<IconProps> = ({
  className = "",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    style={iconStyle}
  >
    {/* Fork */}
    <path d="M14 8v8c0 2 1 4 3 4v20" stroke="currentColor" strokeWidth={1.4} />
    <path d="M12 8v8" stroke="currentColor" strokeWidth={1.3} />
    <path d="M16 8v8" stroke="currentColor" strokeWidth={1.3} />
    {/* Knife */}
    <path
      d="M32 8c2 0 4 2 4 4v6c0 2-2 4-4 4v18"
      stroke="currentColor"
      strokeWidth={1.4}
    />
    {/* Heart in center */}
    <path
      d="M21 20c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5l5.5 5.5 5.5-5.5c1.5-1.5 1.5-4 0-5.5s-4-1.5-5.5 0z"
      stroke="currentColor"
      strokeWidth={1.2}
    />
  </svg>
);

export default {
  HeartTalk,
  MagicWand,
  ArtisanBowl,
  PerfectGift,
  HandHeart,
  SacredTime,
  ArtisanChef,
  VintagePhone,
  HeartCalendar,
  HeartMail,
  HeartLocation,
  MessageWings,
  ChatBubble,
  HeartPeople,
  LoveCake,
  HeartUtensils,
};
