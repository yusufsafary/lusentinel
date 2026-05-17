import Link from 'next/link';
import Logo from './Logo';

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

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#080808]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo size={26} />
              <span className="font-semibold text-white">Lusentinel</span>
            </Link>
            <p className="text-sm text-[#505050] leading-relaxed max-w-xs">
              Precision agent engine. Built for teams who demand control, speed, and full observability.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <div className="glow-dot" />
              <span className="text-xs text-[#505050] mono">All systems operational</span>
            </div>
          </div>

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

        <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#383838]">
            &copy; {new Date().getFullYear()} Lusentinel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-xs text-[#383838] hover:text-[#606060] transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
