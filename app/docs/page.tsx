'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Cpu, GitBranch, Terminal, Shield, Code } from 'lucide-react';

const sections = [
  {
    id: 'intro',
    label: 'Introduction',
    icon: BookOpen,
    content: {
      title: 'What is Lusentinel?',
      body: `Lusentinel is a precision agent engine designed for deterministic, multi-agent orchestration at scale. Unlike general-purpose automation frameworks, Lusentinel is built around a single guarantee: every agent execution is observable, traceable, and recoverable.

The core engine manages agent lifecycle, dependency resolution, context propagation, and fallback chains — so you can focus on building logic, not plumbing.`,
      code: null,
    },
  },
  {
    id: 'quickstart',
    label: 'Quick Start',
    icon: Terminal,
    content: {
      title: 'Quick Start',
      body: `Get a Sentinel agent running in under 5 minutes. Install the CLI, initialize a project, and launch your first agent execution.`,
      code: `# Install the Lusentinel CLI
npm install -g @lusentinel/cli

# Initialize a new project
sentinel init my-project
cd my-project

# Start the agent engine
sentinel run --watch`,
    },
  },
  {
    id: 'agents',
    label: 'Agents',
    icon: Cpu,
    content: {
      title: 'Defining Agents',
      body: `Agents are the core execution units in Lusentinel. Each agent has a unique identifier, a task descriptor, and a lifecycle policy. Agents communicate through the shared context bus and can be chained into execution pipelines.

An agent definition specifies its input schema, output contract, retry budget, and fallback targets. Lusentinel validates these at registration time — not at runtime.`,
      code: `// sentinel.config.ts
import { defineAgent } from '@lusentinel/core';

export const marketScanner = defineAgent({
  id: 'market_scan_v2',
  task: async (ctx) => {
    const data = await ctx.fetch('market/signals');
    return ctx.emit('signals', data.ranked);
  },
  retry: { budget: 3, backoff: 'exponential' },
  fallback: 'signal_aggregator',
  timeout: 5000,
});`,
    },
  },
  {
    id: 'chains',
    label: 'Execution Chains',
    icon: GitBranch,
    content: {
      title: 'Execution Chains',
      body: `Chains define the dependency graph between agents. Lusentinel resolves chains at dispatch time and guarantees ordered execution with shared context propagation. If any node in the chain fails past its retry budget, the fallback chain activates automatically.

Chains support parallel branching — independent subtasks within a chain can execute concurrently while dependent nodes wait for their upstream results.`,
      code: `// Define a chain
export const tradingChain = defineChain([
  marketScanner,          // step 1
  [riskEvaluator,         // step 2a (parallel)
   signalAggregator],     // step 2b (parallel)
  portfolioRebalancer,    // step 3 (waits for 2a + 2b)
]);`,
    },
  },
  {
    id: 'observability',
    label: 'Observability',
    icon: Shield,
    content: {
      title: 'Built-in Observability',
      body: `Every Lusentinel execution emits structured log events at each lifecycle stage: dispatch, context load, task execution, output validation, and commit. These events feed the live emulator view and can be exported to any structured log sink.

Execution traces include timing data, context diffs, retry attempts, and fallback activations — giving you a complete picture of what happened, when, and why.`,
      code: `// Subscribe to agent events
sentinel.on('agent:dispatch', (event) => {
  console.log(\`[\${event.time}] \${event.agent} dispatched\`);
});

sentinel.on('agent:error', (event) => {
  console.error(\`[\${event.time}] \${event.agent} failed\`, event.error);
  // Fallback chain will activate automatically
});`,
    },
  },
  {
    id: 'api',
    label: 'API Reference',
    icon: Code,
    content: {
      title: 'API Reference',
      body: `The Lusentinel API surface is minimal by design. Core concepts are: Agent, Chain, Context, and Emitter. Everything else is configuration.`,
      code: `// Core API surface
import {
  defineAgent,    // create an agent definition
  defineChain,    // compose agents into a chain
  createContext,  // create an isolated execution context
  SentinelCore,   // the main engine class
} from '@lusentinel/core';

const engine = new SentinelCore({
  agents: [marketScanner, riskEvaluator, portfolioRebalancer],
  chains: [tradingChain],
  log: { level: 'info', format: 'json' },
});

await engine.start();`,
    },
  },
];

export default function DocsPage() {
  const [active, setActive] = useState('intro');
  const current = sections.find((s) => s.id === active)!;

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="mx-auto max-w-6xl flex gap-8">
        <aside className="hidden md:block w-56 shrink-0 sticky top-24 self-start">
          <div className="text-[10px] font-mono text-muted uppercase tracking-widest mb-4">Documentation</div>
          <nav className="space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    isActive
                      ? 'bg-cyan/10 text-cyan border border-cyan/20'
                      : 'text-muted hover:text-light hover:bg-panel'
                  }`}
                >
                  <Icon size={14} />
                  {s.label}
                  {isActive && <ChevronRight size={12} className="ml-auto" />}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="md:hidden flex gap-2 flex-wrap mb-8">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  active === s.id
                    ? 'bg-cyan/10 text-cyan border border-cyan/20'
                    : 'bg-panel border border-border text-muted hover:text-light'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-6">
              <span>Docs</span>
              <ChevronRight size={12} />
              <span className="text-cyan">{current.label}</span>
            </div>

            <h1 className="text-3xl font-bold text-light mb-6">{current.content.title}</h1>

            <div className="prose prose-invert max-w-none">
              {current.content.body.split('\n\n').map((para, i) => (
                <p key={i} className="text-muted leading-relaxed mb-4 text-base">
                  {para}
                </p>
              ))}
            </div>

            {current.content.code && (
              <div className="mt-8 rounded-2xl border border-border bg-surface overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-panel">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-lime/50" />
                  <span className="ml-2 text-xs font-mono text-muted">example.ts</span>
                </div>
                <pre className="p-6 text-sm font-mono text-light/80 leading-relaxed overflow-x-auto">
                  <code>{current.content.code}</code>
                </pre>
              </div>
            )}

            <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
              {sections.findIndex((s) => s.id === active) > 0 && (
                <button
                  onClick={() => {
                    const idx = sections.findIndex((s) => s.id === active);
                    setActive(sections[idx - 1].id);
                  }}
                  className="flex items-center gap-2 text-sm text-muted hover:text-light transition-colors"
                >
                  <ChevronRight size={14} className="rotate-180" />
                  {sections[sections.findIndex((s) => s.id === active) - 1].label}
                </button>
              )}
              <div className="ml-auto">
                {sections.findIndex((s) => s.id === active) < sections.length - 1 && (
                  <button
                    onClick={() => {
                      const idx = sections.findIndex((s) => s.id === active);
                      setActive(sections[idx + 1].id);
                    }}
                    className="flex items-center gap-2 text-sm text-muted hover:text-light transition-colors"
                  >
                    {sections[sections.findIndex((s) => s.id === active) + 1].label}
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
