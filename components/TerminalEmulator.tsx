'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, RotateCcw, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AGENTS = [
  { id: 'alpha', name: 'Alpha', task: 'market_scan_v2', status: 'ONLINE' as const },
  { id: 'beta', name: 'Beta', task: 'portfolio_rebalance', status: 'ONLINE' as const },
  { id: 'gamma', name: 'Gamma', task: 'risk_evaluator', status: 'RUNNING' as const },
  { id: 'delta', name: 'Delta', task: 'signal_aggregator', status: 'ONLINE' as const },
  { id: 'epsilon', name: 'Epsilon', task: 'chain_validator', status: 'ONLINE' as const },
];

const LOG_POOLS = {
  INFO: [
    'SentinelCore cycle complete — all agents nominal',
    'Memory checkpoint written to /state/core.snap',
    'Chain dependency graph resolved successfully',
    'Config hot-reload detected — applying diff patch',
    'Heartbeat broadcast acknowledged by 5/5 agents',
    'Context window compressed — 2.1MB → 0.4MB',
    'Event bus flush complete — 0 pending messages',
  ],
  EXEC: [
    'Agent[alpha] dispatched — task: market_scan_v2',
    'Agent[beta] dispatched — task: portfolio_rebalance',
    'Agent[gamma] dispatched — task: risk_evaluator',
    'Agent[delta] dispatched — task: signal_aggregator',
    'Agent[epsilon] dispatched — task: chain_validator',
    'Chain[0x8a2f] resolved — 3 nodes, 0 errors',
    'Subtask forked — parallel execution enabled',
    'Pipeline stage [normalize] → [rank] → [emit] done',
  ],
  WARN: [
    'Agent[gamma] — latency spike detected (480ms)',
    'Memory pressure rising — GC triggered',
    'Retry budget at 40% — monitoring closely',
    'Rate limit approaching on external channel',
    'Context drift detected — recalibrating baseline',
  ],
  ERROR: [
    'Agent[gamma] timeout — fallback chain activated',
    'External API unreachable — using cached state',
    'Validation failure in stage[normalize] — skipping',
  ],
  OK: [
    'All agents nominal — next cycle in 1500ms',
    'Execution chain committed — 7 steps, 0 failures',
    'Agent[alpha] completed — 412ms total duration',
    'State sync verified across 5 replicas',
  ],
};

type LogLevel = keyof typeof LOG_POOLS;

interface LogLine {
  id: number;
  time: string;
  level: LogLevel;
  agent?: string;
  message: string;
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) + '.' + String(Date.now() % 1000).padStart(3, '0');
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateLog(id: number): LogLine {
  const levels: LogLevel[] = ['INFO', 'EXEC', 'EXEC', 'INFO', 'WARN', 'OK', 'INFO', 'EXEC'];
  const level = randomFrom(levels);
  const pool = LOG_POOLS[level];
  return {
    id,
    time: getTime(),
    level,
    message: randomFrom(pool),
  };
}

const levelColors: Record<LogLevel, string> = {
  INFO: 'text-muted',
  EXEC: 'text-cyan',
  WARN: 'text-yellow-400',
  ERROR: 'text-red-400',
  OK: 'text-lime',
};

const TABS = ['Terminal', 'Logs', 'Chain', 'Flow'];

export default function TerminalEmulator() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [activeAgent, setActiveAgent] = useState(AGENTS[0]);
  const [activeTab, setActiveTab] = useState('Terminal');
  const [logId, setLogId] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addLog = useCallback(() => {
    setLogId((prev) => {
      const id = prev + 1;
      const log = generateLog(id);
      setLogs((l) => [...l.slice(-200), log]);
      return id;
    });
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(addLog, 1500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, addLog]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleReset = () => {
    setRunning(false);
    setLogs([]);
    setLogId(0);
  };

  const exportLogs = () => {
    const text = logs.map((l) => `[${l.time}] ${l.level.padEnd(5)} ${l.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentinel-logs.txt';
    a.click();
  };

  return (
    <div className="flex h-full gap-0 overflow-hidden rounded-3xl border border-border bg-surface">
      <aside className="w-56 shrink-0 border-r border-border bg-panel flex flex-col">
        <div className="px-4 py-4 border-b border-border">
          <div className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">Sentinel Agents</div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {AGENTS.map((agent) => {
            const active = activeAgent.id === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent)}
                className={`w-full text-left px-4 py-3 flex flex-col gap-1 transition-colors ${
                  active ? 'bg-cyan/5 border-l-2 border-cyan' : 'border-l-2 border-transparent hover:bg-white/3'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${active ? 'text-cyan' : 'text-light'}`}>
                    {agent.name}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    agent.status === 'RUNNING'
                      ? 'bg-lime/10 text-lime border border-lime/20'
                      : 'bg-cyan/10 text-cyan border border-cyan/20'
                  }`}>
                    {agent.status}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted truncate">{agent.task}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm font-semibold text-light">{activeAgent.name}</div>
              <div className="text-xs font-mono text-muted">{activeAgent.task}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-lime animate-pulse' : 'bg-border'}`} />
              <span className="text-xs font-mono text-muted">{running ? 'EXECUTING' : 'IDLE'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportLogs}
              disabled={logs.length === 0}
              className="p-2 rounded-lg text-muted hover:text-light hover:bg-white/5 disabled:opacity-30 transition-colors"
            >
              <Download size={14} />
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg text-muted hover:text-light hover:bg-white/5 transition-colors"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={() => setRunning(!running)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                running
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                  : 'bg-cyan text-base hover:bg-cyan/90 shadow-glow-sm'
              }`}
            >
              {running ? <Square size={13} /> : <Play size={13} />}
              {running ? 'Stop' : 'Run Simulation'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-0 border-b border-border px-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'text-cyan border-cyan'
                  : 'text-muted border-transparent hover:text-light'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 font-mono text-xs leading-relaxed">
          {activeTab === 'Terminal' && (
            <div>
              {logs.length === 0 && !running && (
                <div className="text-muted text-center mt-12">
                  Press <span className="text-cyan">Run Simulation</span> to begin agent execution
                </div>
              )}
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3 py-0.5"
                  >
                    <span className="text-muted shrink-0 select-none">{log.time}</span>
                    <span className={`shrink-0 w-11 text-right ${levelColors[log.level]}`}>
                      {log.level}
                    </span>
                    <span className="text-light/80">{log.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {running && (
                <div className="flex gap-3 py-0.5 mt-1">
                  <span className="text-muted shrink-0 select-none">{getTime()}</span>
                  <span className="text-cyan cursor-blink">█</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Logs' && (
            <div>
              {['INFO', 'EXEC', 'WARN', 'ERROR', 'OK'].map((level) => {
                const filtered = logs.filter((l) => l.level === level);
                return (
                  <div key={level} className="mb-6">
                    <div className={`text-[10px] font-semibold uppercase tracking-widest mb-2 ${levelColors[level as LogLevel]}`}>
                      {level} ({filtered.length})
                    </div>
                    {filtered.slice(-10).map((log) => (
                      <div key={log.id} className="flex gap-3 py-0.5">
                        <span className="text-muted shrink-0">{log.time}</span>
                        <span className="text-light/70">{log.message}</span>
                      </div>
                    ))}
                    {filtered.length === 0 && (
                      <div className="text-muted/50">No {level} logs yet</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'Chain' && (
            <div className="space-y-3 py-4">
              <div className="text-muted mb-6">Execution chain for: <span className="text-cyan">{activeAgent.task}</span></div>
              {['fetch_context', 'normalize_input', 'rank_signals', 'emit_output', 'commit_state'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                    running && i <= (logs.length % 5) ? 'bg-lime/10 text-lime border border-lime/20' : 'bg-panel border border-border text-muted'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 h-px bg-border" />
                  <div className={`px-3 py-1.5 rounded-lg border text-[11px] ${
                    running && i <= (logs.length % 5) ? 'border-lime/20 bg-lime/5 text-lime' : 'border-border bg-panel text-muted'
                  }`}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Flow' && (
            <div className="py-4">
              <div className="text-muted mb-6">Agent dependency flow</div>
              <div className="grid grid-cols-2 gap-4">
                {AGENTS.map((agent) => (
                  <div key={agent.id} className="rounded-xl border border-border bg-panel p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-light font-medium">{agent.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        agent.status === 'RUNNING'
                          ? 'bg-lime/10 text-lime border border-lime/20'
                          : 'bg-cyan/10 text-cyan border border-cyan/20'
                      }`}>{agent.status}</span>
                    </div>
                    <div className="text-[10px] font-mono text-muted">{agent.task}</div>
                    <div className="mt-3 h-1 rounded-full bg-border overflow-hidden">
                      <motion.div
                        className="h-full bg-cyan"
                        animate={{ width: running ? `${30 + (agent.id.charCodeAt(0) * 13) % 60}%` : '0%' }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
