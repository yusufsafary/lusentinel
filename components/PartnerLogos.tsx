export default function PartnerLogos() {
  return (
    <section className="py-16 border-t border-b border-[rgba(255,255,255,0.05)]">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#3a3a3a] uppercase mb-10">
          Powered By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-7">
          {/* Coinbase */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.5A7.5 7.5 0 1 1 12 4.5a7.5 7.5 0 0 1 0 15zm0-12a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
            </svg>
            <span className="text-white font-semibold text-base tracking-tight">coinbase</span>
          </div>

          {/* EigenLayer */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            <div className="leading-none">
              <div className="text-white font-bold text-[11px] tracking-tight">EIGEN</div>
              <div className="text-white font-light text-[10px] tracking-widest">LAYER</div>
            </div>
          </div>

          {/* Polymarket */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
            </svg>
            <span className="text-white font-semibold text-base">Polymarket</span>
          </div>

          {/* 0x */}
          <div className="opacity-30 hover:opacity-60 transition-opacity">
            <span className="text-white font-black text-xl tracking-tight">0x</span>
          </div>

          {/* Jupiter */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M1 6c4-3 8-3 11 0s7 3 11 0M1 12c4-3 8-3 11 0s7 3 11 0M1 18c4-3 8-3 11 0s7 3 11 0" />
            </svg>
            <span className="text-white font-semibold text-base">Jupiter</span>
          </div>

          {/* Alchemy */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z" />
            </svg>
            <span className="text-white font-semibold text-base">alchemy</span>
          </div>

          {/* Quicknode */}
          <div className="opacity-30 hover:opacity-60 transition-opacity">
            <span className="text-white font-semibold text-base tracking-tight">Quicknode</span>
          </div>

          {/* Circle */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            <span className="text-white font-bold text-base tracking-widest">CIRCLE</span>
          </div>

          {/* LI.FI */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M5 17L12 7l7 10H5z" />
              <path d="M12 17l7-10v10H12z" fillOpacity="0.5" />
            </svg>
            <span className="text-white font-bold text-base tracking-widest">LI.FI</span>
          </div>

          {/* RELAY */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <span className="text-white font-bold text-base tracking-widest">RELAY</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L8 8h3v6H8l4 8 4-8h-3V8h3L12 2z" />
              <line x1="2" y1="12" x2="8" y2="12" stroke="white" strokeWidth="1.5" />
              <line x1="16" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Chainlink */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l-3.5 2v4L5 10v4l3.5 2v4L12 22l3.5-2v-4L19 14v-4l-3.5-2V4L12 2zm0 2.8l2 1.1v2.2l-2-1.1-2 1.1V5.9l2-1.1zM7 10.9l2 1.1v2.2l-2-1.2V10.9zm10 0v2.1l-2 1.2V12l2-1.1zm-5 2.3l2 1.1v2.2l-2 1.1-2-1.1v-2.2l2-1.1z" />
            </svg>
            <span className="text-white font-semibold text-base">Chainlink</span>
          </div>

          {/* Uniswap */}
          <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M8.5 5.5c.7-1.2 2.2-1.5 3.5-1 .5.2.9.5 1.2.9.8 1 .8 2.4 0 3.5L9.5 14h5M15.5 18.5c-.7 1.2-2.2 1.5-3.5 1-.5-.2-.9-.5-1.2-.9-.8-1-.8-2.4 0-3.5L14.5 10h-5" />
            </svg>
            <span className="text-white font-semibold text-base">Uniswap</span>
          </div>
        </div>
      </div>
    </section>
  );
}
