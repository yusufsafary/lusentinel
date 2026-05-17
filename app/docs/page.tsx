'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Cpu, GitBranch, Terminal, Shield, Code } from 'lucide-react';

const sections = [
  {
    id: 'intro', label: 'Introduction', icon: BookOpen,
    content: {
      title: 'What is Lusentinel?',
      body: `Lusentinel is a precision agent engine designed for deterministic, multi-agent orchestration at scale. Unlike general-purpose automation frameworks, Lusentinel is built around a single guarantee: every agent execution is observable, traceable, and recoverable.\n\nThe core engine manages agent lifecycle, dependency resolution, context propagation, and fallback chains — so you can focus on building logic, not plumbing.`,
      code: null,
    },
  },
  {
    id: 'quickstart', label: 'Quick Start', icon: Terminal,
    content: {
      title: 'Quick Start',
      body: `Get a Sentinel agent running in under 5 minutes. Install the CLI, initialize a project, and launch your first agent execution.`,
      code: `# Install the Lusentinel CLI\nnpm install -g @lusentinel/cli\n\n# Initialize a new project\nsentinel init my-project\ncd my-project\n\n# Start the agent engine\nsentinel run --watch`,
    },
  },
  {
    id: 'agents', label: 'Agents', icon: Cpu,
    content: {
      title: 'Defining Agents',
      body: `Agents are the core execution units in Lusentinel. Each agent has a unique identifier, a task descriptor, and a lifecycle policy. Agents communicate through the shared context bus and can be chained into execution pipelines.\n\nAn agent definition specifies its input schema, output contract, retry budget, and fallback targets. Lusentinel validates these at registration time — not at runtime.`,
      code: `// sentinel.config.ts\nimport { defineAgent } from '@lusentinel/core';\n\nexport const marketScanner = defineAgent({\n  id: 'market_scan_v2',\n  task: async (ctx) => {\n    const data = await ctx.fetch('market/signals');\n    return ctx.emit('signals', data.ranked);\n  },\n  retry: { budget: 3, backoff: 'exponential' },\n  fallback: 'signal_aggregator',\n  timeout: 5000,\n});`,
    },
  },
  {
    id: 'chains', label: 'Execution Chains', icon: GitBranch,
    content: {
      title: 'Execution Chains',
      body: `Chains define the dependency graph between agents. Lusentinel resolves chains at dispatch time and guarantees ordered execution with shared context propagation.\n\nChains support parallel branching — independent subtasks within a chain execute concurrently while dependent nodes wait for their upstream results.`,
      code: `// Define a chain\nexport const tradingChain = defineChain([\n  marketScanner,          // step 1\n  [riskEvaluator,         // step 2a (parallel)\n   signalAggregator],     // step 2b (parallel)\n  portfolioRebalancer,    // step 3 (waits for 2a + 2b)\n]);`,
    },
  },
  {
    id: 'observability', label: 'Observability', icon: Shield,
    content: {
      title: 'Built-in Observability',
      body: `Every Lusentinel execution emits structured log events at each lifecycle stage: dispatch, context load, task execution, output validation, and commit. These events feed the live emulator view and can be exported to any structured log sink.\n\nExecution traces include timing data, context diffs, retry attempts, and fallback activations.`,
      code: `// Subscribe to agent events\nsentinel.on('agent:dispatch', (event) => {\n  console.log(\`[\${event.time}] \${event.agent} dispatched\`);\n});\n\nsentinel.on('agent:error', (event) => {\n  console.error(\`[\${event.time}] \${event.agent} failed\`, event.error);\n  // Fallback chain activates automatically\n});`,
    },
  },
  {
    id: 'api', label: 'API Reference', icon: Code,
    content: {
      title: 'API Reference',
      body: `The Lusentinel API surface is minimal by design. Core concepts: Agent, Chain, Context, and Emitter.`,
      code: `import {\n  defineAgent,    // create an agent definition\n  defineChain,    // compose agents into a chain\n  createContext,  // create an isolated execution context\n  SentinelCore,   // the main engine class\n} from '@lusentinel/core';\n\nconst engine = new SentinelCore({\n  agents: [marketScanner, riskEvaluator, portfolioRebalancer],\n  chains: [tradingChain],\n  log: { level: 'info', format: 'json' },\n});\n\nawait engine.start();`,
    },
  },
];

export default function DocsPage() {
  const [active, setActive] = useState('intro');
  const current = sections.find((s) => s.id === active)!;
  const currentIdx = sections.findIndex((s) => s.id === active);

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="mx-auto max-w-5xl flex gap-10">
        {/* Sidebar */}
        <aside className="hidden md:block w-48 shrink-0 sticky top-24 self-start">
          <div className="mono text-[9px] text-[#383838] uppercase tracking-[0.18em] mb-4">Docs</div>
          <nav className="space-y-0.5">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button key={s.id} onClick={() => setActive(s.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all text-left"
                  style={{ background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent', color: isActive ? '#fff' : '#505050' }}>
                  <Icon size={13} />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 flex-wrap mb-8 md:hidden">
            {sections.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
                style={{ background: active === s.id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)', color: active === s.id ? '#fff' : '#505050', border: '1px solid rgba(255,255,255,0.07)' }}>
                {s.label}
              </button>
            ))}
          </div>

          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex items-center gap-2 mono text-[10px] mb-6" style={{ color: '#404040' }}>
              <span>Docs</span>
              <ChevronRight size={11} />
              <span style={{ color: '#808080' }}>{current.label}</span>
            </div>

            <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(24px,3vw,36px)', letterSpacing: '-0.025em' }}>{current.content.title}</h1>

            {current.content.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-relaxed mb-4" style={{ color: '#606060' }}>{para}</p>
            ))}

            {current.content.code && (
              <div className="mt-8 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0a0a0a' }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0f0f0f' }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <span className="ml-2 mono text-[10px]" style={{ color: '#404040' }}>example.ts</span>
                </div>
                <pre className="p-6 text-sm mono overflow-x-auto leading-relaxed" style={{ color: '#808080' }}>
                  <code>{current.content.code}</code>
                </pre>
              </div>
            )}

            <div className="mt-12 flex items-center justify-between border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {currentIdx > 0 && (
                <button onClick={() => setActive(sections[currentIdx - 1].id)}
                  className="flex items-center gap-2 text-sm transition-colors" style={{ color: '#505050' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#a0a0a0')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#505050')}>
                  <ChevronRight size={13} style={{ transform: 'rotate(180deg)' }} />
                  {sections[currentIdx - 1].label}
                </button>
              )}
              <div className="ml-auto">
                {currentIdx < sections.length - 1 && (
                  <button onClick={() => setActive(sections[currentIdx + 1].id)}
                    className="flex items-center gap-2 text-sm transition-colors" style={{ color: '#505050' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#a0a0a0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#505050')}>
                    {sections[currentIdx + 1].label}
                    <ChevronRight size={13} />
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
