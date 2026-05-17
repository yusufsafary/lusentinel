'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Github, Twitter, Mail } from 'lucide-react';

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

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff', fontSize: 14, outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="mx-auto max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="mono text-[10px] tracking-[0.2em] text-[#383838] uppercase mb-4">Contact</div>
          <h1 className="font-bold text-white mb-3" style={{ fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '-0.025em' }}>Get in touch</h1>
          <p className="text-sm" style={{ color: '#505050' }}>
            Questions, partnerships, or enterprise inquiries — we read every message.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center rounded-2xl p-16" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)' }}>
              <CheckCircle size={24} style={{ color: '#22c55e' }} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Message received</h2>
            <p className="text-sm" style={{ color: '#505050' }}>We'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl p-8" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' },
                  { key: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="block mono text-[9px] text-[#404040] uppercase tracking-widest mb-2">{label}</label>
                    <input
                      type={type} required placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block mono text-[9px] text-[#404040] uppercase tracking-widest mb-2">Subject</label>
                <input
                  type="text" required placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block mono text-[9px] text-[#404040] uppercase tracking-widest mb-2">Message</label>
                <textarea
                  required rows={5} placeholder="Tell us more..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2" style={{ borderRadius: 12 }}>
                {loading ? (
                  <><div style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Sending...</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t flex justify-center gap-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {[
                { icon: Github, label: 'GitHub', href: 'https://github.com/yusufsafary' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Mail, label: 'Email', href: 'mailto:contact@lusentinel.com' },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} className="flex items-center gap-1.5 text-xs transition-colors" style={{ color: '#404040' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#a0a0a0')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#404040')}>
                  <Icon size={13} /> {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
