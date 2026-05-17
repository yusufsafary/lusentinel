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
  ],
  ERROR: [
    'Agent[gamma] timeout — fallback chain activated',
    'External API unreachable — using cached state',
  ],
  OK: [
    'All agents nominal — next cycle in 1500ms',
    'Execution chain committed — 7 steps, 0 failures',
    'Agent[alpha] completed — 412ms total duration',
  ],
};

type LogLevel = keyof typeof LOG_POOLS;

interface LogLine {
  id: number;
  time: string;
  level: LogLevel;
  message: string;
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + String(Date.now() % 1000).padStart(3, '0');
}

function randomFrom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function generateLog(id: number): LogLine {
  const levels: LogLevel[] = ['INFO', 'EXEC', 'EXEC', 'INFO', 'WARN', 'OK', 'INFO', 'EXEC'];
  const level = randomFrom(levels);
  return { id, time: getTime(), level, message: randomFrom(LOG_POOLS[level]) };
}

const levelColors: Record<LogLevel, string> = {
  INFO: '#505050',
  EXEC: '#3B82F6',
  WARN: '#f59e0b',
  ERROR: '#ef4444',
  OK: '#22c55e',
};

const TABS = ['Terminal', 'Logs', 'Chain', 'Flow'];

const TabIcon = ({ tab }: { tab: string }) => {
  if (tab === 'Terminal') return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>;
  if (tab === 'Logs') return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
  if (tab === 'Chain') return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" /></svg>;
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
};

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
      setLogs((l) => [...l.slice(-200), generateLog(id)]);
      return id;
    });
  }, []);

  useEffect(() => {
    if (running) { intervalRef.current = setInterval(addLog, 1500); }
    else { if (intervalRef.current) clearInterval(intervalRef.current); }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, addLog]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  const handleReset = () => { setRunning(false); setLogs([]); setLogId(0); };

  const exportLogs = () => {
    const text = logs.map((l) => `[${l.time}] ${l.level.padEnd(5)} ${l.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'sentinel-logs.txt'; a.click();
  };

  return (
    <div className="flex h-full overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d0d0d]">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-[rgba(255,255,255,0.06)] flex flex-col">
        <div className="px-4 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <div className="mono text-[9px] text-[#383838] uppercase tracking-[0.18em]">Sentinel Agents</div>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          {AGENTS.map((agent) => {
            const active = activeAgent.id === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent)}
                className="w-full text-left px-4 py-3 flex flex-col gap-1 transition-colors hover:bg-[rgba(255,255,255,0.02)]"
                style={{ borderLeft: active ? '2px solid #3B82F6' : '2px solid transparent' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: active ? '#fff' : '#505050' }}>
                    {agent.name}
                  </span>
                  <span className="mono text-[9px] px-1.5 py-0.5 rounded" style={{
                    background: agent.status === 'RUNNING' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
                    color: agent.status === 'RUNNING' ? '#22c55e' : '#404040',
                    border: agent.status === 'RUNNING' ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.06)',
                  }}>
                    {agent.status}
                  </span>
                </div>
                <span className="mono text-[9px] text-[#383838] truncate">{agent.task}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm font-semibold text-white">{activeAgent.name}</div>
              <div className="mono text-[10px] text-[#404040]">{activeAgent.task}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: running ? '#22c55e' : '#282828', boxShadow: running ? '0 0 6px rgba(34,197,94,0.5)' : 'none', display: 'block' }} />
              <span className="mono text-[9px] text-[#404040]">{running ? 'EXECUTING' : 'IDLE'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={exportLogs} disabled={logs.length === 0} className="p-1.5 rounded-lg text-[#383838] hover:text-[#606060] disabled:opacity-20 transition-colors">
              <Download size={13} />
            </button>
            <button onClick={handleReset} className="p-1.5 rounded-lg text-[#383838] hover:text-[#606060] transition-colors">
              <RotateCcw size={13} />
            </button>
            <button
              onClick={() => setRunning(!running)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={running ? {
                background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)'
              } : {
                background: '#fff', color: '#000'
              }}
            >
              {running ? <Square size={11} /> : <Play size={11} />}
              {running ? 'Stop' : 'Run Simulation'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[rgba(255,255,255,0.06)] px-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex items-center gap-2 px-3 py-3 text-xs font-medium transition-colors border-b-2 -mb-px"
              style={activeTab === tab ? { color: '#fff', borderColor: '#fff' } : { color: '#404040', borderColor: 'transparent' }}
            >
              <TabIcon tab={tab} />
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 mono text-xs leading-relaxed">
          {activeTab === 'Terminal' && (
            <div>
              {logs.length === 0 && !running && (
                <div className="text-center mt-12" style={{ color: '#303030' }}>
                  Press <span style={{ color: '#3B82F6' }}>Run Simulation</span> to begin
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
                    <span style={{ color: '#303030' }} className="shrink-0">{log.time}</span>
                    <span className="shrink-0 w-10 text-right" style={{ color: levelColors[log.level] }}>{log.level}</span>
                    <span style={{ color: '#808080' }}>{log.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {running && (
                <div className="flex gap-3 py-0.5 mt-1">
                  <span style={{ color: '#303030' }} className="shrink-0">{getTime()}</span>
                  <span style={{ color: '#3B82F6' }} className="cursor">█</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Logs' && (
            <div>
              {(['EXEC', 'INFO', 'WARN', 'ERROR', 'OK'] as LogLevel[]).map((level) => {
                const filtered = logs.filter((l) => l.level === level);
                return (
                  <div key={level} className="mb-6">
                    <div className="text-[9px] font-semibold uppercase tracking-widest mb-2" style={{ color: levelColors[level] }}>
                      {level} ({filtered.length})
                    </div>
                    {filtered.slice(-8).map((log) => (
                      <div key={log.id} className="flex gap-3 py-0.5">
                        <span style={{ color: '#303030' }}>{log.time}</span>
                        <span style={{ color: '#606060' }}>{log.message}</span>
                      </div>
                    ))}
                    {filtered.length === 0 && <div style={{ color: '#282828' }}>No {level} logs yet</div>}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'Chain' && (
            <div className="py-4">
              <div style={{ color: '#404040' }} className="mb-6">
                Chain for: <span style={{ color: '#3B82F6' }}>{activeAgent.task}</span>
              </div>
              {['fetch_context', 'normalize_input', 'rank_signals', 'emit_output', 'commit_state'].map((step, i) => (
                <div key={step} className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold"
                    style={{ background: running && i <= (logs.length % 5) ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)', border: running && i <= (logs.length % 5) ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.06)', color: running && i <= (logs.length % 5) ? '#22c55e' : '#404040' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                  <div className="px-3 py-1.5 rounded-lg text-[10px]"
                    style={{ border: running && i <= (logs.length % 5) ? '1px solid rgba(34,197,94,0.15)' : '1px solid rgba(255,255,255,0.06)', background: running && i <= (logs.length % 5) ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)', color: running && i <= (logs.length % 5) ? '#22c55e' : '#404040' }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Flow' && (
            <div className="py-4">
              <div style={{ color: '#404040' }} className="mb-5">Agent dependency flow</div>
              <div className="grid grid-cols-2 gap-3">
                {AGENTS.map((agent) => (
                  <div key={agent.id} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white font-medium">{agent.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: agent.status === 'RUNNING' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', color: agent.status === 'RUNNING' ? '#22c55e' : '#404040' }}>{agent.status}</span>
                    </div>
                    <div className="text-[9px] text-[#383838]">{agent.task}</div>
                    <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: '#3B82F6' }}
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
