'use client';

import { motion } from 'framer-motion';

const entries = [
  {
    version: 'v1.0.3',
    date: 'May 17, 2026',
    type: 'patch',
    changes: [
      { type: 'fix', text: 'Fixed context propagation bug in nested chain execution' },
      { type: 'fix', text: 'Resolved race condition in parallel agent dispatch' },
      { type: 'improve', text: 'Reduced average dispatch latency by 18%' },
    ],
  },
  {
    version: 'v1.0.2',
    date: 'May 10, 2026',
    type: 'minor',
    changes: [
      { type: 'new', text: 'Added Flow tab to emulator with live agent dependency visualization' },
      { type: 'new', text: 'Export logs to plain text from the emulator' },
      { type: 'improve', text: 'Emulator sidebar now shows task name per agent' },
      { type: 'fix', text: 'Fixed scroll snapping in terminal log view' },
    ],
  },
  {
    version: 'v1.0.1',
    date: 'May 3, 2026',
    type: 'patch',
    changes: [
      { type: 'fix', text: 'Fixed memory leak in long-running agent sessions' },
      { type: 'improve', text: 'Chain validator now catches circular dependency at registration time' },
      { type: 'fix', text: 'Corrected uptime calculation in dashboard stats' },
    ],
  },
  {
    version: 'v1.0.0',
    date: 'April 28, 2026',
    type: 'major',
    changes: [
      { type: 'new', text: 'Initial public release of Lusentinel' },
      { type: 'new', text: 'Agent emulator with Terminal, Logs, Chain, and Flow tabs' },
      { type: 'new', text: 'Dashboard with wallet, agent health, and execution stats' },
      { type: 'new', text: 'Full documentation with code examples' },
      { type: 'new', text: 'GitHub Actions → Vercel auto-deploy pipeline' },
    ],
  },
];

const typeStyles: Record<string, { label: string; color: string }> = {
  new: { label: 'New', color: '#3B82F6' },
  fix: { label: 'Fix', color: '#22c55e' },
  improve: { label: 'Improve', color: '#f59e0b' },
  remove: { label: 'Removed', color: '#ef4444' },
};

const versionColors: Record<string, string> = {
  major: '#fff',
  minor: '#a0a0a0',
  patch: '#606060',
};

export default function ChangelogPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="mono text-[10px] tracking-[0.2em] text-[#383838] uppercase mb-4">Changelog</div>
          <h1 className="font-bold text-white mb-3" style={{ fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '-0.025em' }}>What's new</h1>
          <p className="text-sm" style={{ color: '#505050' }}>Every update to the Lusentinel engine, documented.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.06)', marginLeft: 0 }} />
          <div className="space-y-12 pl-8">
            {entries.map((entry, i) => (
              <motion.div key={entry.version} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="absolute -left-1.5 w-3 h-3 rounded-full" style={{ background: entry.type === 'major' ? '#fff' : '#282828', border: '1px solid rgba(255,255,255,0.15)' }} />
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold text-lg" style={{ color: versionColors[entry.type], letterSpacing: '-0.02em' }}>{entry.version}</span>
                  <span className="mono text-xs" style={{ color: '#404040' }}>{entry.date}</span>
                  <span className="mono text-[9px] px-2 py-0.5 rounded uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.04)', color: '#404040', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {entry.type}
                  </span>
                </div>
                <div className="rounded-2xl p-5 space-y-3" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {entry.changes.map((change, j) => {
                    const ts = typeStyles[change.type];
                    return (
                      <div key={j} className="flex items-start gap-3">
                        <span className="mono text-[9px] px-1.5 py-0.5 rounded mt-0.5 shrink-0" style={{ background: `${ts.color}10`, color: ts.color, border: `1px solid ${ts.color}20` }}>
                          {ts.label}
                        </span>
                        <span className="text-sm" style={{ color: '#808080' }}>{change.text}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
