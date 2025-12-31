import React from 'react';
import { X, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const UpgradeModal = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  const benefits = [
    {
      icon: <Sparkles className="text-primary" size={20} />,
      title: "Exclusive Full Trailers",
      description: "Access full-length exclusive trailers for all major releases."
    },
    {
      icon: <Zap className="text-primary-magenta" size={20} />,
      title: "HD & 4K Playback",
      description: "Experience trailers in stunning high definition with no buffering."
    },
    {
      icon: <ShieldCheck className="text-green-400" size={20} />,
      title: "No Interruptions",
      description: "Ad-free experience while watching your favorite previews."
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      ></div>
      
      <div className="relative glass-panel w-full max-w-lg rounded-[2.5rem] overflow-hidden border-white/10 shadow-[0_0_100px_rgba(0,242,255,0.2)] animate-in fade-in zoom-in duration-300">
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-magenta to-primary animate-pulse"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-10 pt-16 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <Sparkles className="text-primary animate-pulse" size={40} />
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
          </div>

          <h2 className="text-3xl font-display font-black text-white mb-2">Upgrade to Premium</h2>
          <p className="text-gray-400 mb-10">Choose the best way to enjoy your cinematic journey.</p>

          <div className="space-y-6 mb-10 text-left">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 items-start p-4 glass-panel rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="mt-1 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{benefit.title}</h4>
                  <p className="text-xs text-gray-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={onUpgrade}
              className="w-full bg-primary text-black py-4 rounded-2xl font-black tracking-widest uppercase hover:shadow-[0_0_25px_rgba(0,242,255,0.6)] hover:scale-[1.02] transition-all"
            >
              Get Premium Access - ₹499/mo
            </button>
            <button 
              onClick={onClose}
              className="text-xs font-bold text-gray-500 hover:text-white tracking-[0.2em] uppercase transition-colors"
            >
              Maybe Later
            </button>
          </div>

          <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest flex items-center justify-center gap-2">
            <CheckCircle2 size={12} /> SECURE CRYCRY-ENCRYPTED PAYMENT
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
