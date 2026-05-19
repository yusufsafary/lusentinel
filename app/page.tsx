'use client';

import Link from 'next/link';
import { motion, animate } from 'framer-motion';
import { ArrowRight, Layers, GitBranch, Eye, Zap, Shield, RefreshCw, ChevronRight } from 'lucide-react';
import PartnerLogos from '@/components/PartnerLogos';
import { useEffect, useRef, useState } from 'react';

/* ─── Data ─── */
const features = [
  { icon: Layers,    title: 'Multi-Step Execution',  accent: '#3B82F6', body: 'Complex strategies decomposed into ordered tasks, each handled by a specialist sub-agent. Plan, validate, execute without manual oversight.' },
  { icon: Eye,       title: 'Full Observability',     accent: '#8B5CF6', body: 'Every agent decision is logged, traced, and queryable. You see exactly what ran, when, and why. No black boxes. No surprises.' },
  { icon: GitBranch, title: 'Chain Orchestration',   accent: '#06B6D4', body: 'Agents share context, resolve dependencies, and run parallel branches. The engine coordinates everything automatically.' },
  { icon: RefreshCw, title: 'Deterministic Retry',   accent: '#10B981', body: 'Built-in retry budgets, exponential backoff, and fallback chains. Every failure has a defined recovery path with full audit visibility.' },
  { icon: Zap,       title: 'Sub-2ms Dispatch',       accent: '#F59E0B', body: 'Engineered for low-latency scheduling. Agents receive tasks in under two milliseconds from trigger to first execution byte.' },
  { icon: Shield,    title: 'Execution Safety',       accent: '#EF4444', body: 'Input validation, output contracts, and sandboxed contexts. Each agent runs in a controlled, auditable scope with hard boundaries.' },
];

const stats = [
  { value: 99.97, suffix: '%',  label: 'Uptime SLA' },
  { value: 2,     prefix: '<', suffix: 'ms', label: 'Dispatch latency' },
  { value: 10,    suffix: 'k+', label: 'Executions / sec' },
  { value: 128,   suffix: '',   label: 'Concurrent agents' },
];

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
  };
}

/* ─── Animated counter ─── */
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired.current) {
        fired.current = true;
        const ctrl = animate(0, value, {
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
          onUpdate(v) { setDisplay(value % 1 !== 0 ? parseFloat(v.toFixed(2)) : Math.round(v)); },
        });
        return () => ctrl.stop();
      }
    }, { rootMargin: '-80px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── Spinning SENTINEL circle ─── */
function SentinelOrbit() {
  const ringText = 'LUSENTINEL · PRECISION AGENT ENGINE · BUILT FOR EXECUTION · ';

  return (
    <div className="relative flex items-center justify-center mx-auto" style={{ width: 260, height: 260 }}>
      {/* Outer faint ring */}
      <div
        className="absolute inset-0 rounded-full border border-[rgba(255,255,255,0.04)]"
        style={{ margin: 8 }}
      />

      {/* Spinning text ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="260" height="260" viewBox="0 0 260 260">
          <defs>
            <path
              id="sentinel-orbit-path"
              d="M130,130 m-110,0 a110,110 0 1,1 220,0 a110,110 0 1,1 -220,0"
            />
          </defs>
          <text
            fill="rgba(255,255,255,0.22)"
            fontSize="9"
            fontFamily="'JetBrains Mono','Fira Code','Courier New',monospace"
            letterSpacing="3.5"
          >
            <textPath href="#sentinel-orbit-path">{ringText}{ringText}</textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 text-center"
      >
        <div
          className="font-bold text-white tracking-[-0.04em] leading-none select-none"
          style={{ fontSize: 30 }}
        >
          SENTINEL
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          <div className="glow-dot" style={{ width: 4, height: 4 }} />
          <span className="mono text-[9px] tracking-[0.22em] text-[#404040] uppercase">Engine v1.0</span>
          <div className="glow-dot" style={{ width: 4, height: 4 }} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Live terminal ─── */
const terminalLines = [
  { delay: 0,   color: '#3B82F6', text: 'Parsing intent: multi-step execution strategy' },
  { delay: 0.7, color: '#606060', text: 'Step 1: Scanning Base chain (MC $500k to $2M)...' },
  { delay: 1.4, color: '#606060', text: 'Step 2: Fetching social sentiment scores...' },
  { delay: 2.0, color: '#22c55e', text: 'Sentiment 84/100 — threshold met ✓' },
  { delay: 2.6, color: '#F59E0B', text: 'Step 3: Executing buy order $5 ETH...' },
  { delay: 3.2, color: '#22c55e', text: 'Order filled at 0.0021 ETH/token ✓' },
  { delay: 3.8, color: '#22c55e', text: 'Strategy complete. Audit log committed.' },
];

function AnimatedTerminal() {
  const [visible, setVisible] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setVisible(0);
      terminalLines.forEach((l, i) => timers.push(setTimeout(() => setVisible(i + 1), l.delay * 1000)));
      timers.push(setTimeout(() => setKey(k => k + 1), 6200));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [key]);

  return (
    <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0d0d0d]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          {[
            <svg key="t" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
            <svg key="l" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
            <svg key="c" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
            <svg key="g" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
          ].map((icon, i) => (
            <div key={i} className={`p-1.5 rounded-md ${i === 0 ? 'text-white bg-[rgba(255,255,255,0.08)]' : 'text-[#404040] hover:text-[#707070]'} transition-colors cursor-pointer`}>
              {icon}
            </div>
          ))}
        </div>
        <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]">
          EXECUTING
        </span>
      </div>
      <div className="p-5 text-left min-h-[255px]">
        <div className="flex items-center gap-2 mb-5">
          <div className="glow-dot" />
          <span className="mono text-[10px] tracking-widest text-[#404040] uppercase">Live Agent Environment</span>
        </div>
        <div className="mb-5">
          <div className="mono text-[10px] text-[#383838] uppercase tracking-widest mb-2">User Prompt</div>
          <div className="rounded-xl bg-[#161616] border border-[rgba(255,255,255,0.06)] px-4 py-3 text-sm text-[#c0c0c0]">
            Scan Base chain for tokens with $500k to $2M MC. Check social sentiment. If above 80/100, buy $5 ETH.
          </div>
        </div>
        <div>
          <div className="mono text-[10px] text-[#383838] uppercase tracking-widest mb-3">Agent Execution Log</div>
          <div className="space-y-2.5">
            {terminalLines.slice(0, visible).map((line, i) => (
              <motion.div key={`${key}-${i}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }} className="flex items-start gap-3">
                <div className="mt-1.5 shrink-0" style={{ width: 5, height: 5, borderRadius: '50%', background: line.color }} />
                <span className="text-sm mono" style={{ color: line.color }}>{line.text}</span>
              </motion.div>
            ))}
            {visible > 0 && visible < terminalLines.length && (
              <div className="flex items-start gap-3 opacity-40">
                <div className="mt-1.5 shrink-0 animate-pulse" style={{ width: 5, height: 5, borderRadius: '50%', background: '#3B82F6' }} />
                <span className="text-sm mono text-[#3B82F6]">_</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({ f, i }: { f: typeof features[0]; i: number }) {
  const Icon = f.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="rounded-2xl bg-[#0f0f0f] border border-[rgba(255,255,255,0.06)] p-6 transition-all duration-300 cursor-default relative overflow-hidden group"
      style={{ borderColor: hovered ? `${f.accent}30` : undefined, boxShadow: hovered ? `0 0 28px ${f.accent}10` : undefined }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 40%, ${f.accent}08 0%, transparent 70%)` }} />
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg transition-all duration-300"
          style={{ background: hovered ? `${f.accent}15` : 'rgba(255,255,255,0.04)' }}>
          <Icon size={15} style={{ color: hovered ? f.accent : '#606060', transition: 'color 0.3s' }} />
        </div>
        <h3 className="font-semibold text-white text-sm">{f.title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-justify" style={{ color: '#505050' }}>{f.body}</p>
      <motion.div className="flex items-center gap-1 mt-4 text-xs font-medium" style={{ color: f.accent }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }} transition={{ duration: 0.2 }}>
        Learn more <ChevronRight size={12} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />

      {/* HERO */}
      {/* pt accounts for: XBanner(36px) + Navbar(64px) + breathing room */}
      <section className="relative z-10 pt-48 pb-16 px-6 text-center">
        <div className="mx-auto max-w-3xl">

          {/* Spinning SENTINEL orbit */}
          <motion.div {...fade(0)} className="flex justify-center mb-10">
            <SentinelOrbit />
          </motion.div>

          <motion.h1 {...fade(0.15)} className="font-bold text-white mb-6"
            style={{ fontSize: 'clamp(40px, 7.5vw, 68px)', lineHeight: 1.06, letterSpacing: '-0.03em' }}>
            Your Strategy.{' '}
            <span style={{ color: '#505050' }}>Running</span>{' '}
            <span style={{ color: '#a0a0a0' }}>24/7.</span>
          </motion.h1>

          <motion.p {...fade(0.22)} className="text-base md:text-lg mb-10 leading-relaxed mx-auto max-w-xl text-justify" style={{ color: '#606060' }}>
            Lusentinel is the precision agent engine that decomposes complex strategies into ordered tasks, sources live data for each one, and executes with full auditability. Not a dashboard. Not a bot. An engine.
          </motion.p>

          <motion.div {...fade(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link href="/emulator" className="btn-primary">
              Deploy Your Strategy <ArrowRight size={15} />
            </Link>
            <Link href="/docs" className="btn-ghost">Read the docs</Link>
          </motion.div>
        </div>

        {/* Powered By — right below CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="mb-14">
          <PartnerLogos />
        </motion.div>

        {/* Animated Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
          className="mx-auto max-w-2xl float"
        >
          <AnimatedTerminal />
        </motion.div>
      </section>

      {/* THE DIFFERENCE */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16">
            <div className="mono text-xs tracking-[0.2em] text-[#3a3a3a] uppercase mb-4">The Difference</div>
            <h2 className="font-bold text-white mb-5" style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              You have the strategy.{' '}<span style={{ color: '#505050' }}>Lusentinel runs it.</span>
            </h2>
            <p className="text-base max-w-xl leading-relaxed text-justify" style={{ color: '#505050' }}>
              The gap between conviction and execution costs real money. Lusentinel closes it permanently with an agent engine that decomposes strategies into ordered tasks, sources live data for each step, and executes without a human in the loop.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => <FeatureCard key={f.title} f={f} i={i} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(255,255,255,0.05)]">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#080808] p-8 text-center hover:bg-[#0d0d0d] transition-colors">
                <div className="text-3xl font-bold text-white mb-1.5" style={{ letterSpacing: '-0.02em' }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="text-xs text-[#404040]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mono text-xs tracking-[0.2em] text-[#3a3a3a] uppercase mb-4 text-center">How It Works</div>
          <h2 className="text-center font-bold text-white mb-16" style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            From intent to execution in milliseconds
          </h2>
          <div className="space-y-3">
            {[
              { step: '01', title: 'Define your strategy', desc: 'Write your intent in plain language or use the visual editor. The engine parses it into a structured execution plan with ordered task nodes automatically.' },
              { step: '02', title: 'Agent chain assembles', desc: 'Sub-agents are assigned to each step based on task type. They share context and coordinate through the execution graph without overlap or redundancy.' },
              { step: '03', title: 'Live data sourced', desc: 'Each agent fetches exactly the data it needs in parallel: chain state, market signals, social feeds. This reduces total end-to-end latency dramatically.' },
              { step: '04', title: 'Execute and commit', desc: 'Tasks execute in defined order with fallback chains on standby. Every action is logged, traced, and committed to an immutable audit trail.' },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-6 rounded-2xl bg-[#0f0f0f] border border-[rgba(255,255,255,0.06)] p-6 hover:border-[rgba(255,255,255,0.1)] hover:bg-[#111] transition-all duration-300 group cursor-default">
                <div className="mono text-[#282828] group-hover:text-[#383838] font-bold text-2xl shrink-0 w-8 transition-colors duration-300">{item.step}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-justify" style={{ color: '#505050' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-bold text-white mb-4" style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Start the simulation
            </h2>
            <p className="mb-8 text-base text-justify max-w-md mx-auto" style={{ color: '#505050' }}>
              Open the emulator and watch Sentinel agents execute your strategy in real time. No setup required. No wallet needed to start.
            </p>
            <Link href="/emulator" className="btn-primary">
              Launch Emulator <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
