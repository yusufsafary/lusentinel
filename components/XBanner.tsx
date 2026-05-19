'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function XBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center bg-[#050505] border-b border-[rgba(255,255,255,0.06)]">
      <div className="mx-auto max-w-6xl px-6 w-full flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="glow-dot" style={{ width: 5, height: 5 }} />
          <span className="text-[11px] text-[#404040] mono tracking-wide hidden sm:block">
            Sentinel Engine v1.0 in production
          </span>
        </div>

        {/* Center — X follow CTA */}
        <a
          href="https://x.com/lusentinel_lab"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <span className="text-[11px] text-[#505050] hidden sm:block">Follow us on X</span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)] bg-white/[0.03] text-[#a0a0a0] group-hover:text-white group-hover:border-white/25 group-hover:bg-white/[0.06] transition-all duration-200 text-[11px] font-medium">
            <XIcon />
            @lusentinel_lab
          </span>
        </a>

        {/* Right — dismiss */}
        <button
          onClick={() => setVisible(false)}
          className="text-[#383838] hover:text-[#606060] transition-colors p-1"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
