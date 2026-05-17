'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    desc: 'For developers and solo builders exploring the engine.',
    features: [
      '2 active agents',
      '1,000 executions / month',
      'Terminal emulator access',
      'Community support',
      '1 execution chain',
    ],
    cta: 'Start free',
    href: '/emulator',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'per month',
    desc: 'For teams running real strategies at production scale.',
    features: [
      '20 active agents',
      '100,000 executions / month',
      'Multi-chain orchestration',
      'Priority support',
      'Unlimited chains',
      'Custom fallback logic',
      'API access',
    ],
    cta: 'Get started',
    href: '/contact',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    desc: 'For organizations with custom scale and compliance needs.',
    features: [
      'Unlimited agents',
      'Unlimited executions',
      'Dedicated infrastructure',
      'SLA guarantee',
      'Custom integrations',
      'Audit logs + compliance',
      'Onboarding support',
    ],
    cta: 'Talk to us',
    href: '/contact',
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="mono text-[10px] tracking-[0.2em] text-[#383838] uppercase mb-4">Pricing</div>
          <h1 className="font-bold text-white mb-4" style={{ fontSize: 'clamp(32px,5vw,52px)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Simple, honest pricing
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: '#505050' }}>
            Start free. Scale when you need it. No hidden fees, no usage surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-7 flex flex-col relative"
              style={{
                background: plan.highlight ? '#fff' : '#0f0f0f',
                border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 mono text-[9px] bg-[#080808] text-white px-3 py-1 rounded-full border border-[rgba(255,255,255,0.15)] uppercase tracking-widest">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <div className="text-sm font-semibold mb-1" style={{ color: plan.highlight ? '#000' : '#a0a0a0' }}>{plan.name}</div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold" style={{ color: plan.highlight ? '#000' : '#fff', letterSpacing: '-0.03em' }}>{plan.price}</span>
                  <span className="text-sm pb-1" style={{ color: plan.highlight ? '#666' : '#404040' }}>/ {plan.period}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: plan.highlight ? '#555' : '#505050' }}>{plan.desc}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: plan.highlight ? '#222' : '#606060' }}>
                    <Check size={13} style={{ color: plan.highlight ? '#000' : '#404040', shrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className="text-center py-3 rounded-xl text-sm font-semibold transition-all"
                style={plan.highlight ? {
                  background: '#000', color: '#fff',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  color: '#a0a0a0',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-2xl p-8 text-center"
          style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h3 className="font-semibold text-white mb-2">All plans include</h3>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-4">
            {['99.97% uptime SLA', 'End-to-end encryption', 'Audit logs', 'API access', 'Community forum', 'Docs & examples'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm" style={{ color: '#505050' }}>
                <Check size={12} style={{ color: '#404040' }} />
                {f}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
