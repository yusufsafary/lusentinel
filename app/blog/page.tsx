'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    slug: 'precision-vs-speed',
    date: 'May 15, 2026',
    tag: 'Engineering',
    title: 'Precision vs. Speed: Why We Chose Determinism Over Raw Throughput',
    excerpt: 'Most agent frameworks optimize for maximum throughput. We think that\'s the wrong metric. Here\'s why we built Lusentinel around deterministic scheduling — and why it makes your strategies more reliable.',
  },
  {
    slug: 'multi-agent-orchestration',
    date: 'May 8, 2026',
    tag: 'Product',
    title: 'How Multi-Agent Orchestration Actually Works at Production Scale',
    excerpt: 'Chain resolution, context propagation, fallback trees — under the hood, orchestrating 128 concurrent agents requires solving a lot of subtle coordination problems. We open the engine.',
  },
  {
    slug: 'observability-design',
    date: 'April 30, 2026',
    tag: 'Design',
    title: 'Designing for Full Observability: Every Decision Should Be Auditable',
    excerpt: 'When an agent makes a decision with real consequences, you need to know exactly why. We walk through how we designed the execution trace system from first principles.',
  },
  {
    slug: 'launch-post',
    date: 'April 28, 2026',
    tag: 'Announcement',
    title: 'Lusentinel v1.0: The Precision Agent Engine, Now in Production',
    excerpt: 'After 14 months of building, testing, and refining — we\'re shipping Lusentinel 1.0. Here\'s what\'s in it, why we built it, and where we\'re taking it next.',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="mono text-[10px] tracking-[0.2em] text-[#383838] uppercase mb-4">Blog</div>
          <h1 className="font-bold text-white mb-3" style={{ fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '-0.025em' }}>
            From the engine room
          </h1>
          <p className="text-sm" style={{ color: '#505050' }}>
            Engineering deep-dives, product thinking, and lessons from building precision infrastructure.
          </p>
        </motion.div>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`}
                className="block rounded-2xl p-6 group transition-all"
                style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="mono text-[9px] px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', color: '#606060', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {post.tag}
                  </span>
                  <span className="mono text-[10px]" style={{ color: '#383838' }}>{post.date}</span>
                </div>
                <h2 className="font-semibold text-white mb-2 leading-snug group-hover:text-white/90 transition-colors" style={{ fontSize: 16, letterSpacing: '-0.01em' }}>
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#505050' }}>{post.excerpt}</p>
                <div className="flex items-center gap-1 text-xs" style={{ color: '#404040' }}>
                  Read more <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
