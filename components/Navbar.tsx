'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/emulator', label: 'Emulator' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/docs', label: 'Docs' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={28} />
          <span className="font-semibold text-white text-base tracking-tight">Lusentinel</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                  active ? 'text-white' : 'text-[#606060] hover:text-[#a0a0a0]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://x.com/lusentinel_lab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#606060] hover:text-white hover:bg-white/5 transition-all duration-200 text-sm"
          >
            <XIcon size={14} />
            <span className="font-medium tracking-tight">@lusentinel_lab</span>
          </a>
          <Link href="/emulator" className="btn-primary text-sm px-5 py-2.5">
            Launch Agent
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-[#606060] hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-[rgba(255,255,255,0.06)] bg-[#080808]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                    pathname === link.href ? 'text-white bg-white/5' : 'text-[#606060] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://x.com/lusentinel_lab"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-[#606060] hover:text-white transition-colors"
              >
                <XIcon size={14} />
                <span>@lusentinel_lab</span>
              </a>
              <Link
                href="/emulator"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 justify-center"
              >
                Launch Agent
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
