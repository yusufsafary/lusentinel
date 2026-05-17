'use client';

import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Clock, CheckCircle, AlertTriangle, Activity, Cpu } from 'lucide-react';

const agents = [
  { name: 'Alpha', health: 99, uptime: '14d 6h', tasks: 1247, status: 'nominal' },
  { name: 'Beta', health: 97, uptime: '14d 6h', tasks: 983, status: 'nominal' },
  { name: 'Gamma', health: 71, uptime: '2d 11h', tasks: 412, status: 'degraded' },
  { name: 'Delta', health: 100, uptime: '14d 6h', tasks: 1601, status: 'nominal' },
  { name: 'Epsilon', health: 95, uptime: '7d 3h', tasks: 724, status: 'nominal' },
];

const execStats = [
  { label: 'Total Executions', value: '48,291', icon: Cpu },
  { label: 'Avg Duration', value: '312ms', icon: Clock },
  { label: 'Success Rate', value: '99.6%', icon: CheckCircle },
  { label: 'Failures', value: '187', icon: AlertTriangle },
];

const recentActivity = [
  { time: '09:14:34', agent: 'Alpha', event: 'Completed market_scan_v2', type: 'success' },
  { time: '09:14:33', agent: 'Delta', event: 'Inherited gamma execution context', type: 'info' },
  { time: '09:14:33', agent: 'Gamma', event: 'Latency spike — fallback triggered', type: 'warn' },
  { time: '09:14:32', agent: 'Beta', event: 'Dispatched portfolio_rebalance', type: 'info' },
  { time: '09:14:32', agent: 'Alpha', event: 'Chain[0x8a2f] resolved', type: 'success' },
  { time: '09:14:31', agent: 'Epsilon', event: 'Validation passed — 3 chains', type: 'success' },
];

const typeColors: Record<string, string> = {
  success: '#22c55e',
  warn: '#f59e0b',
  info: '#3B82F6',
};

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay },
  };
}

export default function DashboardPage() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fade(0)} className="mb-10">
          <div className="mono text-[10px] tracking-[0.18em] text-[#383838] uppercase mb-3">Overview</div>
          <h1 className="text-3xl font-bold text-white mb-1.5" style={{ letterSpacing: '-0.025em' }}>Dashboard</h1>
          <p className="text-sm" style={{ color: '#505050' }}>Real-time agent health, execution stats, and system state.</p>
        </motion.div>

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Wallet */}
          <motion.div {...fade(0.05)} className="rounded-2xl p-6 relative overflow-hidden" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(59,130,246,0.04)', transform: 'translate(30%,-30%)' }} />
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="mono text-[9px] text-[#383838] uppercase tracking-widest mb-1.5">Wallet Balance</div>
                <div className="text-3xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>$2,847.32</div>
                <div className="text-xs mt-0.5" style={{ color: '#404040' }}>USD</div>
              </div>
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <Wallet size={16} style={{ color: '#3B82F6' }} />
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mono text-xs" style={{ background: 'rgba(34,197,94,0.07)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.15)' }}>
              <TrendingUp size={11} />
              +4.2% this week
            </div>
          </motion.div>

          {/* Agent Health */}
          <motion.div {...fade(0.08)} className="md:col-span-2 rounded-2xl p-6" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="mono text-[9px] text-[#383838] uppercase tracking-widest mb-5">Agent Health</div>
            <div className="space-y-3.5">
              {agents.map((agent, i) => (
                <div key={agent.name} className="flex items-center gap-4">
                  <div className="w-12 text-sm text-white font-medium">{agent.name}</div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.health}%` }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: agent.health >= 90 ? '#22c55e' : agent.health >= 70 ? '#f59e0b' : '#ef4444' }}
                    />
                  </div>
                  <div className="w-9 text-right mono text-xs" style={{ color: '#505050' }}>{agent.health}%</div>
                  <div className="mono text-[9px] px-2 py-0.5 rounded" style={{
                    background: agent.status === 'nominal' ? 'rgba(34,197,94,0.07)' : 'rgba(245,158,11,0.07)',
                    color: agent.status === 'nominal' ? '#22c55e' : '#f59e0b',
                    border: agent.status === 'nominal' ? '1px solid rgba(34,197,94,0.15)' : '1px solid rgba(245,158,11,0.15)',
                  }}>
                    {agent.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Exec stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {execStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} {...fade(0.1 + i * 0.04)} className="rounded-2xl p-5" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                <Icon size={14} style={{ color: '#404040', marginBottom: 16 }} />
                <div className="text-2xl font-bold text-white mb-1" style={{ letterSpacing: '-0.02em' }}>{stat.value}</div>
                <div className="text-xs" style={{ color: '#404040' }}>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent activity */}
        <motion.div {...fade(0.2)} className="rounded-2xl overflow-hidden" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <Activity size={13} style={{ color: '#404040' }} />
            <span className="text-sm font-semibold text-white">Recent Activity</span>
          </div>
          <div>
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-[rgba(255,255,255,0.01)]" style={{ borderBottom: i < recentActivity.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <span className="mono text-xs shrink-0" style={{ color: '#383838' }}>{item.time}</span>
                <span className="mono text-[10px] px-2 py-0.5 rounded shrink-0" style={{ background: `${typeColors[item.type]}10`, color: typeColors[item.type], border: `1px solid ${typeColors[item.type]}20` }}>
                  {item.agent}
                </span>
                <span className="text-sm flex-1" style={{ color: '#505050' }}>{item.event}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
