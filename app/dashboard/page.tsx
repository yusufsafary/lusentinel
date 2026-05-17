'use client';

import { motion } from 'framer-motion';
import { Wallet, Heart, Zap, TrendingUp, Clock, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

const walletData = { balance: '2,847.32', currency: 'USD', change: '+4.2%', positive: true };

const agents = [
  { name: 'Alpha', health: 99, uptime: '14d 6h', tasks: 1247, status: 'nominal' },
  { name: 'Beta', health: 97, uptime: '14d 6h', tasks: 983, status: 'nominal' },
  { name: 'Gamma', health: 71, uptime: '2d 11h', tasks: 412, status: 'degraded' },
  { name: 'Delta', health: 100, uptime: '14d 6h', tasks: 1601, status: 'nominal' },
  { name: 'Epsilon', health: 95, uptime: '7d 3h', tasks: 724, status: 'nominal' },
];

const execStats = [
  { label: 'Total Executions', value: '48,291', icon: Zap, color: 'cyan' },
  { label: 'Avg Duration', value: '312ms', icon: Clock, color: 'lime' },
  { label: 'Success Rate', value: '99.6%', icon: CheckCircle, color: 'lime' },
  { label: 'Failures', value: '187', icon: AlertTriangle, color: 'yellow' },
];

const recentActivity = [
  { time: '09:14:34', agent: 'Alpha', event: 'Completed market_scan_v2', type: 'success' },
  { time: '09:14:33', agent: 'Delta', event: 'Inherited gamma execution context', type: 'info' },
  { time: '09:14:33', agent: 'Gamma', event: 'Latency spike — fallback triggered', type: 'warn' },
  { time: '09:14:32', agent: 'Beta', event: 'Dispatched portfolio_rebalance', type: 'info' },
  { time: '09:14:32', agent: 'Alpha', event: 'Chain[0x8a2f] resolved', type: 'success' },
  { time: '09:14:31', agent: 'Epsilon', event: 'Validation passed — 3 chains', type: 'success' },
];

export default function DashboardPage() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-light mb-2">Dashboard</h1>
          <p className="text-muted">Real-time overview of agent health, execution stats, and system state.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 rounded-3xl bg-panel border border-border p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 rounded-full blur-2xl -translate-y-8 translate-x-8" />
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs text-muted font-mono mb-1">WALLET BALANCE</div>
                <div className="text-3xl font-bold text-light">
                  ${walletData.balance}
                </div>
                <div className="text-xs text-muted mt-0.5">{walletData.currency}</div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                <Wallet size={18} className="text-cyan" />
              </div>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono ${
              walletData.positive ? 'bg-lime/10 text-lime border border-lime/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              <TrendingUp size={11} />
              {walletData.change} this week
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2 rounded-3xl bg-panel border border-border p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Heart size={16} className="text-cyan" />
              <span className="text-xs font-mono text-muted uppercase tracking-widest">Agent Health</span>
            </div>
            <div className="space-y-4">
              {agents.map((agent, i) => (
                <div key={agent.name} className="flex items-center gap-4">
                  <div className="w-14 text-sm text-light font-medium">{agent.name}</div>
                  <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.health}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        agent.health >= 90 ? 'bg-lime' :
                        agent.health >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                    />
                  </div>
                  <div className="w-10 text-right text-xs font-mono text-muted">{agent.health}%</div>
                  <div className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    agent.status === 'nominal'
                      ? 'text-lime border-lime/20 bg-lime/5'
                      : 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5'
                  }`}>
                    {agent.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {execStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-2xl bg-panel border border-border p-5"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-4 ${
                  stat.color === 'cyan' ? 'bg-cyan/10 border border-cyan/20' :
                  stat.color === 'lime' ? 'bg-lime/10 border border-lime/20' :
                  'bg-yellow-400/10 border border-yellow-400/20'
                }`}>
                  <Icon size={14} className={
                    stat.color === 'cyan' ? 'text-cyan' :
                    stat.color === 'lime' ? 'text-lime' : 'text-yellow-400'
                  } />
                </div>
                <div className="text-2xl font-bold text-light mb-1">{stat.value}</div>
                <div className="text-xs text-muted">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-3xl bg-panel border border-border overflow-hidden"
        >
          <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
            <Activity size={15} className="text-cyan" />
            <span className="text-sm font-semibold text-light">Recent Activity</span>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors">
                <span className="font-mono text-xs text-muted w-16 shrink-0">{item.time}</span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border shrink-0 ${
                  item.type === 'success' ? 'text-lime border-lime/20 bg-lime/5' :
                  item.type === 'warn' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' :
                  'text-cyan border-cyan/20 bg-cyan/5'
                }`}>{item.agent}</span>
                <span className="text-sm text-muted flex-1">{item.event}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
