'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/emulator', label: 'Emulator' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/docs', label: 'Docs' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-cyan/10 border border-cyan/30 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
            <Zap size={14} className="text-cyan" />
          </div>
          <span className="font-semibold text-light tracking-tight">Lusentinel</span>
          <span className="text-[10px] font-mono text-cyan/70 border border-cyan/20 px-1.5 py-0.5 rounded-md bg-cyan/5">v1.0</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-cyan bg-cyan/10 border border-cyan/20'
                    : 'text-muted hover:text-light hover:bg-panel'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/emulator"
            className="px-4 py-2 rounded-xl text-sm font-medium bg-cyan text-base hover:bg-cyan/90 transition-colors shadow-glow-sm"
          >
            Launch Emulator
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-muted hover:text-light hover:bg-panel transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-surface overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'text-cyan bg-cyan/10 border border-cyan/20'
                        : 'text-muted hover:text-light hover:bg-panel'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/emulator"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl text-sm font-medium bg-cyan text-base text-center hover:bg-cyan/90 transition-colors"
              >
                Launch Emulator
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
