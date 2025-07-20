import { Clock, BadgePercent, ShieldCheck, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: <Clock size={32} />,
    title: "Save Time & Effort",
    description: "No more switching between apps—we handle the entire grocery hunt for you."
  },
  {
    icon: <BadgePercent size={32} />,
    title: "Get the Best Prices",
    description: "Our AI compares prices across top platforms so you always save more."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure & Hassle-Free",
    description: "Order through us confidently—your data and payments are always safe."
  },
  {
    icon: <ThumbsUp size={32} />,
    title: "Delivered Your Way",
    description: "Choose express delivery, multiple-store savings, or one-click checkout—your choice."
  }
];

const Reasons = () => (
  <section className="py-20 bg-white dark:bg-zinc-950 px-4 text-center">
    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-zinc-900 dark:text-white">Why Choose Us?</h2>
    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 text-base md:text-lg">We built this to save you time, money, and stress—every time you shop for groceries.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {features.map((feature, i) => (
        <div key={i} className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow border border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
          <div className="mb-4 text-green-600 dark:text-yellow-400">{feature.icon}</div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Reasons;
