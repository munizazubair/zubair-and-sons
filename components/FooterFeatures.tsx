import { ShoppingBag, Sliders, Headset } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterFeaturesProps {
  onCardClick: (sectionId: string) => void;
  activeTab: string;
}

export default function FooterFeatures({ onCardClick, activeTab }: FooterFeaturesProps) {
  const cards = [
    {
      id: 'products',
      title: 'Products',
      description: 'Browse our selection of devices.',
      icon: ShoppingBag,
      gradient: 'from-orange-500/10 to-amber-500/10',
      borderHover: 'hover:border-orange-500/30',
      activeColor: 'text-orange-400',
    },
    {
      id: 'features',
      title: 'Features',
      description: 'Discover the latest innovations.',
      icon: Sliders,
      gradient: 'from-purple-500/10 to-pink-500/10',
      borderHover: 'hover:border-purple-500/30',
      activeColor: 'text-purple-400',
    },
    {
      id: 'support',
      title: 'Support',
      description: 'Get help and find answers.',
      icon: Headset,
      gradient: 'from-blue-500/10 to-cyan-500/10',
      borderHover: 'hover:border-blue-500/30',
      activeColor: 'text-blue-400',
    },
  ];

  return (
    <div className="w-full bg-[#1c0c1e] py-12 border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isActive = activeTab === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => onCardClick(card.id)}
              className={`group relative p-6 rounded-2xl bg-white/5 border ${
                isActive 
                  ? 'border-orange-500/40 bg-gradient-to-br ' + card.gradient 
                  : 'border-white/5'
              } ${card.borderHover} cursor-pointer transition-all duration-300 flex items-start gap-4 hover:bg-white/[0.08]`}
            >
              {/* Card background glowing border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Icon container */}
              <div className={`p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all ${
                isActive ? card.activeColor : 'text-white'
              }`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Text info */}
              <div className="space-y-1 relative z-10">
                <h3 className="font-display font-semibold text-lg text-white group-hover:text-white transition-colors flex items-center gap-2">
                  {card.title}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  )}
                </h3>
                <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
