import Link from 'next/link';
import { Zap, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                <Zap size={14} className="text-cyan" />
              </div>
              <span className="font-semibold text-light">Lusentinel</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Precision agent orchestration for intelligent automation. Built for teams who demand reliability and transparency.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://github.com/yusufsafary" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-panel border border-border flex items-center justify-center text-muted hover:text-light hover:border-cyan/30 transition-all">
                <Github size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-panel border border-border flex items-center justify-center text-muted hover:text-light hover:border-cyan/30 transition-all">
                <Twitter size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-3">
              {['Emulator', 'Dashboard', 'Docs', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm text-muted hover:text-light transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">System</h4>
            <ul className="space-y-3">
              {[
                { label: 'Status', href: '#' },
                { label: 'Changelog', href: '#' },
                { label: 'Privacy', href: '#' },
                { label: 'Terms', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-muted hover:text-light transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Lusentinel. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            <span className="text-xs text-muted font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
