import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Sparkles, Film, Search } from 'lucide-react';

type PromptItem = {
  id: string;
  title: string;
  category: 'Hooks' | 'Content Engine' | 'Offers' | 'Personal Brand';
  level: 'Beginner' | 'Pro';
  prompt: string;
};

const PROMPTS: PromptItem[] = [
  {
    id: 'hook-01',
    title: 'Cinematic Hook Generator',
    category: 'Hooks',
    level: 'Beginner',
    prompt:
      'You are my short-form script writer. Create 12 cinematic hooks for [niche] that feel like a movie trailer. Use pattern interrupts, emotional contrast, and curiosity gaps. Keep each hook under 14 words.',
  },
  {
    id: 'hook-02',
    title: 'Cold Open Story Frame',
    category: 'Hooks',
    level: 'Pro',
    prompt:
      'Turn this lesson into a cold-open story: [lesson]. Start in the middle of action, add one high-stakes line, then reveal the lesson at the end with a plot-twist style payoff.',
  },
  {
    id: 'engine-01',
    title: '30-Day Content Vault',
    category: 'Content Engine',
    level: 'Beginner',
    prompt:
      'Build me a 30-day content calendar for [audience] who wants [outcome]. Mix educational, authority, behind-the-scenes, and conversion posts. Include hook + CTA + platform adaptation for X, LinkedIn, and IG.',
  },
  {
    id: 'engine-02',
    title: 'One Idea, 15 Assets',
    category: 'Content Engine',
    level: 'Pro',
    prompt:
      'Repurpose this core idea: [idea]. Output 15 assets: 3 tweets, 3 carousel outlines, 2 shorts scripts, 2 newsletter intros, 2 lead magnet angles, 3 sales CTA variations.',
  },
  {
    id: 'offer-01',
    title: 'Offer Repositioning Prompt',
    category: 'Offers',
    level: 'Pro',
    prompt:
      'I sell [offer]. Reposition it for premium buyers by rewriting promise, mechanism, proof, and urgency. Remove generic language. Make it feel exclusive and outcomes-driven.',
  },
  {
    id: 'brand-01',
    title: 'Authority Narrative Builder',
    category: 'Personal Brand',
    level: 'Beginner',
    prompt:
      'Create my authority story arc using: before, breaking point, discovery, framework, and mission. Use punchy language and keep it usable for About page + pinned post + podcast intro.',
  },
];

const CATEGORIES = ['All', 'Hooks', 'Content Engine', 'Offers', 'Personal Brand'] as const;

export default function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const q = query.toLowerCase();
      const matchesQuery =
        item.title.toLowerCase().includes(q) ||
        item.prompt.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const handleCopy = async (item: PromptItem) => {
    await navigator.clipboard.writeText(item.prompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#070A14] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(108,99,255,0.26),transparent_30%),radial-gradient(circle_at_80%_5%,rgba(236,72,153,0.22),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.2),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-10 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/30 bg-indigo-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-indigo-200">
            <Film className="h-3.5 w-3.5" />
            Prompts Vault
          </div>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Power Moves Prompt Vault</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300 md:text-lg">
            A cinematic prompt app where people can browse, search, and copy your best prompts instantly.
            Styled for dramatic contrast, neon glow, and premium creator energy.
          </p>
        </motion.header>

        <section className="mb-7 grid gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 md:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompts, outcomes, or categories..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
                  activeCategory === cat
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredPrompts.map((item) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-indigo-400/20 px-3 py-1 text-[11px] font-semibold text-indigo-200">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400">{item.level}</span>
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">{item.title}</h3>
              <p className="mb-5 line-clamp-6 text-sm text-slate-300">{item.prompt}</p>
              <button
                onClick={() => handleCopy(item)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500/20"
              >
                {copiedId === item.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedId === item.id ? 'Copied' : 'Copy Prompt'}
              </button>
            </motion.article>
          ))}
        </section>

        <footer className="mt-10 flex items-center gap-2 text-sm text-slate-400">
          <Sparkles className="h-4 w-4 text-indigo-300" />
          {filteredPrompts.length} prompts ready to copy.
        </footer>
      </div>
    </div>
  );
}
