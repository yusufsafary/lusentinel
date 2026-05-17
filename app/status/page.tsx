'use client';

import { motion } from 'framer-motion';

const services = [
  { name: 'Agent Dispatch Engine', status: 'operational', uptime: '99.98%', ping: '1.2ms' },
  { name: 'Chain Orchestrator', status: 'operational', uptime: '99.97%', ping: '2.1ms' },
  { name: 'Context Bus', status: 'operational', uptime: '100%', ping: '0.9ms' },
  { name: 'Execution Logger', status: 'operational', uptime: '99.99%', ping: '1.8ms' },
  { name: 'API Gateway', status: 'operational', uptime: '99.96%', ping: '4.3ms' },
  { name: 'Dashboard', status: 'operational', uptime: '99.95%', ping: '8.2ms' },
  { name: 'Emulator', status: 'operational', uptime: '99.94%', ping: '12ms' },
  { name: 'External Data Feed', status: 'degraded', uptime: '98.1%', ping: '310ms' },
];

const incidents = [
  { date: 'May 14, 2026', title: 'External data feed latency spike', status: 'resolved', desc: 'Elevated response times on the external market data feed between 03:12 and 04:47 UTC. Fallback cache activated automatically. No agent executions failed.' },
  { date: 'May 3, 2026', title: 'Scheduled maintenance — Context Bus', status: 'resolved', desc: 'Planned maintenance window. Zero downtime achieved via rolling restart. All agents maintained context through the upgrade.' },
];

const statusConfig: Record<string, { color: string; label: string; dot: string }> = {
  operational: { color: '#22c55e', label: 'Operational', dot: '#22c55e' },
  degraded: { color: '#f59e0b', label: 'Degraded', dot: '#f59e0b' },
  down: { color: '#ef4444', label: 'Outage', dot: '#ef4444' },
};

export default function StatusPage() {
  const allGood = services.every(s => s.status === 'operational');

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8" style={{ background: allGood ? 'rgba(34,197,94,0.07)' : 'rgba(245,158,11,0.07)', border: `1px solid ${allGood ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)'}` }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: allGood ? '#22c55e' : '#f59e0b', boxShadow: `0 0 8px ${allGood ? 'rgba(34,197,94,0.6)' : 'rgba(245,158,11,0.6)'}` }} />
            <span className="mono text-xs font-semibold" style={{ color: allGood ? '#22c55e' : '#f59e0b' }}>
              {allGood ? 'All systems operational' : 'Minor degradation detected'}
            </span>
          </div>
          <h1 className="font-bold text-white mb-3" style={{ fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '-0.025em' }}>System Status</h1>
          <p className="text-sm" style={{ color: '#505050' }}>Real-time status for all Lusentinel services</p>
        </motion.div>

        {/* Services */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-8" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="text-sm font-semibold text-white">Services</span>
          </div>
          {services.map((svc, i) => {
            const cfg = statusConfig[svc.status];
            return (
              <div key={svc.name} className="flex items-center justify-between px-6 py-4 hover:bg-[rgba(255,255,255,0.01)] transition-colors"
                style={{ borderBottom: i < services.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div className="flex items-center gap-3">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, boxShadow: svc.status === 'operational' ? '0 0 6px rgba(34,197,94,0.4)' : 'none', flexShrink: 0 }} />
                  <span className="text-sm text-white">{svc.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="mono text-xs" style={{ color: '#404040' }}>{svc.ping}</span>
                  <span className="mono text-xs" style={{ color: '#404040' }}>{svc.uptime}</span>
                  <span className="mono text-[10px] px-2 py-0.5 rounded" style={{ background: `${cfg.color}10`, color: cfg.color, border: `1px solid ${cfg.color}20` }}>
                    {cfg.label}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Incidents */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="text-sm font-semibold text-white mb-4">Past Incidents</div>
          <div className="space-y-3">
            {incidents.map((inc, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="mono text-[9px] px-2 py-0.5 rounded" style={{ background: 'rgba(34,197,94,0.07)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.15)' }}>
                    {inc.status}
                  </span>
                  <span className="mono text-xs" style={{ color: '#404040' }}>{inc.date}</span>
                </div>
                <div className="text-sm font-medium text-white mb-1.5">{inc.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#505050' }}>{inc.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
