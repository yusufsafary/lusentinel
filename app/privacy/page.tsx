import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy — Lusentinel' };

const sections = [
  {
    title: 'Information we collect',
    body: 'We collect information you provide directly to us when you create an account, contact us, or use our services. This includes your name, email address, and usage data. We do not sell your personal data to third parties.',
  },
  {
    title: 'How we use your information',
    body: 'We use the information we collect to provide, maintain, and improve our services, communicate with you, send technical notices and support messages, and respond to your comments and questions.',
  },
  {
    title: 'Data retention',
    body: 'We retain your information for as long as your account is active or as needed to provide services. Execution logs are retained for 30 days by default. You may request deletion of your data at any time.',
  },
  {
    title: 'Security',
    body: 'We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. All data in transit is encrypted using TLS 1.3. Data at rest is encrypted using AES-256.',
  },
  {
    title: 'Cookies',
    body: 'We use minimal, essential cookies to maintain your session and remember your preferences. We do not use advertising or tracking cookies. You can control cookie settings in your browser at any time.',
  },
  {
    title: 'Contact',
    body: 'If you have questions about this Privacy Policy, please contact us at privacy@lusentinel.com.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <div className="mono text-[10px] tracking-[0.2em] text-[#383838] uppercase mb-4">Legal</div>
          <h1 className="font-bold text-white mb-2" style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-0.025em' }}>Privacy Policy</h1>
          <p className="text-xs mono" style={{ color: '#404040' }}>Last updated: May 17, 2026</p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl p-6" style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h2 className="font-semibold text-white mb-3 text-sm">{section.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#606060' }}>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
