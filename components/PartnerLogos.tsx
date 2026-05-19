'use client';

import { useEffect, useRef } from 'react';

const logos = [
  {
    name: 'Coinbase',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.5A7.5 7.5 0 1 1 12 4.5a7.5 7.5 0 0 1 0 15zm0-12a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
      </svg>
    ),
    label: 'coinbase',
  },
  {
    name: 'Solana',
    icon: (
      <svg width="20" height="20" viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="url(#solana-grad-1)"/>
        <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1L333.1 73.8c-2.4 2.4-5.7 3.8-9.2 3.8H6.5C.7 77.6-2.2 70.6 1.9 66.5L64.6 3.8z" fill="url(#solana-grad-2)"/>
        <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="url(#solana-grad-3)"/>
        <defs>
          <linearGradient id="solana-grad-1" x1="0" y1="0" x2="397" y2="311" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9945FF"/>
            <stop offset="1" stopColor="#14F195"/>
          </linearGradient>
          <linearGradient id="solana-grad-2" x1="0" y1="0" x2="397" y2="311" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9945FF"/>
            <stop offset="1" stopColor="#14F195"/>
          </linearGradient>
          <linearGradient id="solana-grad-3" x1="0" y1="0" x2="397" y2="311" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9945FF"/>
            <stop offset="1" stopColor="#14F195"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    label: 'Solana',
  },
  {
    name: 'EigenLayer',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    labelNode: (
      <div className="leading-none">
        <div className="text-white font-bold text-[11px] tracking-tight">EIGEN</div>
        <div className="text-white font-light text-[10px] tracking-widest">LAYER</div>
      </div>
    ),
  },
  {
    name: 'Polymarket',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
      </svg>
    ),
    label: 'Polymarket',
  },
  {
    name: '0x',
    labelOnly: <span className="text-white font-black text-xl tracking-tight">0x</span>,
  },
  {
    name: 'Jupiter',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <path d="M1 6c4-3 8-3 11 0s7 3 11 0M1 12c4-3 8-3 11 0s7 3 11 0M1 18c4-3 8-3 11 0s7 3 11 0" />
      </svg>
    ),
    label: 'Jupiter',
  },
  {
    name: 'Alchemy',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z" />
      </svg>
    ),
    label: 'alchemy',
  },
  {
    name: 'Quicknode',
    labelOnly: <span className="text-white font-semibold text-base tracking-tight">Quicknode</span>,
  },
  {
    name: 'Circle',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    label: 'CIRCLE',
    bold: true,
    widest: true,
  },
  {
    name: 'LI.FI',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M5 17L12 7l7 10H5z" />
        <path d="M12 17l7-10v10H12z" fillOpacity="0.5" />
      </svg>
    ),
    label: 'LI.FI',
    bold: true,
    widest: true,
  },
  {
    name: 'RELAY',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M12 2L8 8h3v6H8l4 8 4-8h-3V8h3L12 2z" />
        <line x1="2" y1="12" x2="8" y2="12" stroke="white" strokeWidth="1.5" />
        <line x1="16" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    label: 'RELAY',
    bold: true,
    widest: true,
    iconAfter: true,
  },
  {
    name: 'Chainlink',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 2l-3.5 2v4L5 10v4l3.5 2v4L12 22l3.5-2v-4L19 14v-4l-3.5-2V4L12 2zm0 2.8l2 1.1v2.2l-2-1.1-2 1.1V5.9l2-1.1zM7 10.9l2 1.1v2.2l-2-1.2V10.9zm10 0v2.1l-2 1.2V12l2-1.1zm-5 2.3l2 1.1v2.2l-2 1.1-2-1.1v-2.2l2-1.1z" />
      </svg>
    ),
    label: 'Chainlink',
  },
  {
    name: 'Uniswap',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M8.5 5.5c.7-1.2 2.2-1.5 3.5-1 .5.2.9.5 1.2.9.8 1 .8 2.4 0 3.5L9.5 14h5M15.5 18.5c-.7 1.2-2.2 1.5-3.5 1-.5-.2-.9-.5-1.2-.9-.8-1-.8-2.4 0-3.5L14.5 10h-5" />
      </svg>
    ),
    label: 'Uniswap',
  },
];

function LogoItem({ logo }: { logo: typeof logos[0] }) {
  return (
    <div className="flex items-center gap-2 opacity-30 hover:opacity-70 transition-all duration-300 cursor-default shrink-0 px-2">
      {logo.labelOnly ? (
        logo.labelOnly
      ) : logo.iconAfter ? (
        <>
          {logo.labelNode ? logo.labelNode : (
            <span className={`text-white text-base ${logo.bold ? 'font-bold' : 'font-semibold'} ${logo.widest ? 'tracking-widest' : 'tracking-tight'}`}>
              {logo.label}
            </span>
          )}
          {logo.icon}
        </>
      ) : (
        <>
          {logo.icon}
          {logo.labelNode ? logo.labelNode : (
            <span className={`text-white text-base ${logo.bold ? 'font-bold' : 'font-semibold'} ${logo.widest ? 'tracking-widest' : 'tracking-tight'}`}>
              {logo.label}
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default function PartnerLogos() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    let raf: number;
    const speed = 0.4;

    const animate = () => {
      x -= speed;
      const half = track.scrollWidth / 2;
      if (Math.abs(x) >= half) x = 0;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="py-10 border-t border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 mb-7">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#3a3a3a] uppercase">
          Powered By
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-10 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <LogoItem key={i} logo={logo} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#080808] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#080808] to-transparent z-10" />
      </div>
    </section>
  );
}
