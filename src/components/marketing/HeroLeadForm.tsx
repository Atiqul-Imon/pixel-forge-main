'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { config } from '@/lib/config';

export function HeroLeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');
    const trimmed = message.trim();
    const body = {
      name: name.trim(),
      email: email.trim(),
      service: 'Homepage lead form',
      message:
        trimmed ||
        'Project inquiry from homepage hero (visitor did not add optional details).',
    };

    if (!body.name || !body.email) {
      setErrorMessage('Please enter your name and email.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-sm border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/10">
        <p className="text-center font-display text-lg font-semibold text-slate-950">Thank you!</p>
        <p className="mt-2 text-center text-sm leading-relaxed text-slate-700">
          We received your message and will get back to you shortly.
        </p>
        <Link
          href="/contact"
          className="mt-6 block text-center text-sm font-semibold text-primary-700 underline-offset-4 hover:underline"
        >
          Full contact page
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/15 sm:p-8"
      noValidate
    >
      <div className="text-center">
        <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-slate-950 sm:text-2xl">Let&apos;s Connect</h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-primary-600" aria-hidden />
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <label htmlFor="hero-name" className="sr-only">
            Name
          </label>
          <input
            id="hero-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name *"
            className="w-full rounded-sm border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 placeholder:text-slate-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/25"
            required
          />
        </div>
        <div>
          <label htmlFor="hero-email" className="sr-only">
            Email
          </label>
          <input
            id="hero-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address *"
            className="w-full rounded-sm border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 placeholder:text-slate-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/25"
            required
          />
        </div>
        <div>
          <label htmlFor="hero-message" className="sr-only">
            Message
          </label>
          <textarea
            id="hero-message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What can we do for you? (Optional)"
            className="w-full resize-y rounded-sm border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 placeholder:text-slate-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/25"
          />
        </div>
      </div>

      <p className="mt-4 rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
        Secure submission · Rate-limited · We never sell your data.
      </p>

      {errorMessage ? (
        <p className="mt-3 text-sm font-medium text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-6 flex w-full items-center justify-center rounded-sm bg-orange-500 px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-interactive hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          'Jump-Start Your Projects'
        )}
      </button>

      <div className="mt-6 space-y-1 border-t border-slate-100 pt-5 text-center text-sm">
        <a href={`mailto:${config.contact.email}`} className="block font-medium text-primary-700 hover:underline">
          {config.contact.email}
        </a>
        <a href="tel:+8801714918360" className="block font-medium text-primary-700 hover:underline">
          +880 1714 918360
        </a>
      </div>
    </form>
  );
}
