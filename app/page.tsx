'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, GitBranch, Shield, Terminal, Activity, Layers } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Precision Execution',
    description: 'Every agent runs with deterministic scheduling and fail-safe fallback chains. No missed cycles, no silent failures.',
    accent: 'cyan',
  },
  {
    icon: GitBranch,
    title: 'Multi-Agent Orchestration',
    description: 'Chain agents across execution contexts with shared memory, dependency graphs, and real-time coordination.',
    accent: 'lime',
  },
  {
    icon: Shield,
    title: 'Full Observability',
    description: 'Live log streams, execution traces, and chain flow visualization give you complete runtime transparency.',
    accent: 'cyan',
  },
];

const stats = [
  { value: '99.97%', label: 'Uptime SLA' },
  { value: '<2ms', label: 'Dispatch latency' },
  { value: '10k+', label: 'Executions / sec' },
  { value: '128', label: 'Concurrent agents' },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,229,255,0.06),transparent)] pointer-events-none" />

      <section className="relative pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-panel border border-border text-xs font-mono text-cyan mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            Sentinel Engine v1.0 — Now Live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-light leading-none mb-6"
          >
            The precision
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-cyan/60">
              agent engine.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Lusentinel orchestrates intelligent agents at scale — with real-time execution monitoring,
            deterministic scheduling, and full chain observability built in from the start.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/emulator"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan text-base font-semibold text-sm hover:bg-cyan/90 transition-all shadow-glow-cyan"
            >
              Open Emulator
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-panel border border-border text-light font-medium text-sm hover:border-cyan/30 hover:text-cyan transition-all"
            >
              Read the docs
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto max-w-4xl mt-20"
        >
          <div className="rounded-3xl border border-border bg-surface overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-panel">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-lime/60" />
              <span className="ml-3 text-xs font-mono text-muted">sentinel-core / execution-monitor</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="flex flex-col gap-2">
                {[
                  { time: '09:14:32.001', level: 'INFO', msg: 'SentinelCore initialized — 4 agents registered' },
                  { time: '09:14:32.112', level: 'EXEC', msg: 'Agent[alpha] dispatched — task: market_scan_v2' },
                  { time: '09:14:32.445', level: 'INFO', msg: 'Chain[0x8a2f] resolved — 3 nodes, 0 errors' },
                  { time: '09:14:33.021', level: 'EXEC', msg: 'Agent[beta] dispatched — task: portfolio_rebalance' },
                  { time: '09:14:33.388', level: 'WARN', msg: 'Agent[gamma] — latency spike detected (480ms)' },
                  { time: '09:14:33.500', level: 'INFO', msg: 'Fallback chain activated — rerouting to agent[delta]' },
                  { time: '09:14:34.002', level: 'EXEC', msg: 'Agent[delta] dispatched — inheriting gamma context' },
                  { time: '09:14:34.210', level: 'OK  ', msg: 'All agents nominal — next cycle in 1500ms' },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex gap-3"
                  >
                    <span className="text-muted shrink-0">{line.time}</span>
                    <span className={`shrink-0 w-10 text-right ${
                      line.level === 'EXEC' ? 'text-cyan' :
                      line.level === 'WARN' ? 'text-yellow-400' :
                      line.level === 'OK  ' ? 'text-lime' : 'text-muted'
                    }`}>{line.level}</span>
                    <span className="text-light/80">{line.msg}</span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex gap-3 mt-1"
                >
                  <span className="text-muted shrink-0">09:14:34.211</span>
                  <span className="text-cyan shrink-0 w-10 text-right">_</span>
                  <span className="text-cyan cursor-blink">█</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-panel border border-border p-6 text-center"
              >
                <div className="text-3xl font-bold text-cyan mb-1">{stat.value}</div>
                <div className="text-xs text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-light mb-4"
            >
              Built for precision
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted max-w-lg mx-auto"
            >
              Every component is designed around reliability, observability, and control — not abstractions.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const isLime = feature.accent === 'lime';
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group rounded-3xl bg-panel border border-border p-8 hover:border-cyan/30 transition-all hover:shadow-glow-cyan"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                    isLime ? 'bg-lime/10 border border-lime/20' : 'bg-cyan/10 border border-cyan/20'
                  }`}>
                    <Icon size={22} className={isLime ? 'text-lime' : 'text-cyan'} />
                  </div>
                  <h3 className="text-lg font-semibold text-light mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glow-border-cyan rounded-3xl bg-panel p-12 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Terminal size={18} className="text-cyan" />
              <span className="text-xs font-mono text-cyan">ready to execute</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
              Start the simulation
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              Open the emulator and watch Sentinel agents execute in real time. No setup required.
            </p>
            <Link
              href="/emulator"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-cyan text-base font-semibold hover:bg-cyan/90 transition-all shadow-glow-cyan"
            >
              Launch Emulator
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
