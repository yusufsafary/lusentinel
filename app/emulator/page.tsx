import { Metadata } from 'next';
import TerminalEmulator from '@/components/TerminalEmulator';

export const metadata: Metadata = {
  title: 'Emulator — Lusentinel',
  description: 'Live Sentinel agent emulator — real-time execution monitoring and log stream.',
};

export default function EmulatorPage() {
  return (
    <div className="pt-20 px-6 pb-6 h-screen flex flex-col">
      <div className="flex items-center justify-between mb-5 pt-4">
        <div>
          <h1 className="text-xl font-bold text-light">Agent Emulator</h1>
          <p className="text-sm text-muted mt-0.5">Real-time sentinel agent execution simulation</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          <span className="text-xs font-mono text-muted">System ready</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <TerminalEmulator />
      </div>
    </div>
  );
}
