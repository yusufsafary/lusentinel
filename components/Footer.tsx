'use client';

import Link from 'next/link';
import Logo from './Logo';
import { useState } from 'react';

const nav = {
  Product: [
    { label: 'Emulator', href: '/emulator' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Developers: [
    { label: 'Docs', href: '/docs' },
    { label: 'API Reference', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com/yusufsafary/lusentinel' },
    { label: 'Status', href: '/status' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ],
};

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSent(true); setEmail(''); }
  };

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#080808]">
      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo size={26} />
              <span className="font-semibold text-white">Lusentinel</span>
            </Link>
            <p className="text-sm text-[#505050] leading-relaxed max-w-xs text-justify mb-5">
              Lusentinel is a precision agent engine built for teams that need strategies executed automatically, auditably, and at speed. Not a dashboard. An engine.
            </p>

            {/* System status */}
            <div className="flex items-center gap-2 mb-6">
              <div className="glow-dot" />
              <span className="text-xs text-[#505050] mono">All systems operational</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/lusentinel_lab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.06)] text-[#505050] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all duration-200 text-xs"
              >
                <XIcon />
                <span>@lusentinel_lab</span>
              </a>
              <a
                href="https://github.com/yusufsafary/lusentinel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.06)] text-[#505050] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all duration-200 text-xs"
              >
                <GithubIcon />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Nav cols */}
          {Object.entries(nav).map(([group, items]) => (
            <div key={group}>
              <div className="text-xs font-semibold text-[#404040] uppercase tracking-widest mb-4">{group}</div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#505050] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0d0d0d] p-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-sm font-semibold text-white mb-1">Stay in the loop</div>
              <p className="text-xs text-[#505050]">Engine updates, new agent types, and protocol integrations. No spam.</p>
            </div>
            {sent ? (
              <div className="flex items-center gap-2 text-sm text-[#22c55e]">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                You are subscribed.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-[#080808] border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder-[#404040] outline-none focus:border-[rgba(255,255,255,0.2)] transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-85 transition-opacity shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Build info bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[#0a0a0a] px-6 py-4">
          {[
            { label: 'Engine', value: 'v1.0.0' },
            { label: 'Network', value: 'Base + Solana' },
            { label: 'Latency', value: '<2ms p50' },
            { label: 'Uptime', value: '99.97%' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="text-[10px] text-[#383838] mono uppercase tracking-widest mb-0.5">{item.label}</div>
              <div className="text-xs text-[#606060] font-medium">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#383838]">
            &copy; {new Date().getFullYear()} Lusentinel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Terms', href: '/privacy' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-xs text-[#383838] hover:text-[#606060] transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
