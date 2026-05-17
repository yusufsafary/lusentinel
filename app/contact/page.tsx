'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Twitter, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-panel border border-border text-xs font-mono text-muted mb-6">
            <Mail size={11} className="text-cyan" />
            contact@lusentinel.com
          </div>
          <h1 className="text-4xl font-bold text-light mb-4">Get in touch</h1>
          <p className="text-muted max-w-md mx-auto">
            Have a question, partnership inquiry, or just want to talk about agent orchestration? We read every message.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glow-border-lime rounded-3xl bg-panel p-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={28} className="text-lime" />
            </div>
            <h2 className="text-2xl font-bold text-light mb-3">Message received</h2>
            <p className="text-muted max-w-sm mx-auto">
              We'll get back to you within 24 hours. In the meantime, check out the docs or open the emulator.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-panel border border-border p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-light placeholder-muted text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-light placeholder-muted text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-light placeholder-muted text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell us more..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-light placeholder-muted text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-cyan text-base font-semibold hover:bg-cyan/90 disabled:opacity-60 transition-all shadow-glow-cyan"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-base/30 border-t-base rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-border flex items-center justify-center gap-6">
              <a href="https://github.com/yusufsafary" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-light transition-colors">
                <Github size={14} />
                GitHub
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-muted hover:text-light transition-colors">
                <Twitter size={14} />
                Twitter
              </a>
              <a href="mailto:contact@lusentinel.com" className="flex items-center gap-2 text-sm text-muted hover:text-light transition-colors">
                <Mail size={14} />
                Email
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
