'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

const team = [
  { name: 'Yusuf Safary', role: 'Founder & CEO', bio: 'Systems engineer turned product builder. 10 years building infrastructure for high-frequency trading desks.' },
  { name: 'Aria Chen', role: 'Head of Engineering', bio: 'Previously at Alchemy and Chainlink. Led the protocol engineering team for three years.' },
  { name: 'Marcus Levin', role: 'Product Design', bio: 'Designed developer tools at Figma and Linear. Obsessed with making complex systems feel simple.' },
];

const values = [
  { title: 'Precision over speed', body: 'We build things that work correctly the first time. Reliability is a feature, not a goal.' },
  { title: 'Radical transparency', body: 'Every agent decision is auditable. We believe execution should never happen in a black box.' },
  { title: 'Built for builders', body: 'Our users are engineers and operators. We speak their language and solve their actual problems.' },
  { title: 'Long-term thinking', body: 'We optimize for trust and durability, not growth metrics. Infrastructure takes time to build right.' },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <div className="mono text-[10px] tracking-[0.2em] text-[#383838] uppercase mb-5">About</div>
          <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(36px,6vw,60px)', letterSpacing: '-0.03em', lineHeight: 1.08 }}>
            Built by engineers,<br />
            <span style={{ color: '#505050' }}>for engineers.</span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: '#505050' }}>
            Lusentinel started as an internal tool for managing complex multi-step automation at scale. We kept hitting the same wall: existing tools were either too abstract to trust or too rigid to extend. So we built the engine we needed.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-8 mb-6" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mono text-[10px] tracking-[0.18em] text-[#383838] uppercase mb-4">Mission</div>
          <p className="text-2xl font-semibold text-white leading-snug" style={{ letterSpacing: '-0.02em' }}>
            Make intelligent automation fully transparent, fully recoverable, and fully in your control.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-4 mb-20">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="font-semibold text-white mb-2 text-sm">{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#505050' }}>{v.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <div>
          <div className="mono text-[10px] tracking-[0.2em] text-[#383838] uppercase mb-8">Team</div>
          <div className="grid md:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Logo size={24} />
                </div>
                <div className="font-semibold text-white text-sm mb-0.5">{member.name}</div>
                <div className="mono text-[10px] mb-3" style={{ color: '#404040' }}>{member.role}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#505050' }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
