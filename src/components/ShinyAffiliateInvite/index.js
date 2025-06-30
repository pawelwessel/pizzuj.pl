import Link from "next/link";

export const ShinyAffiliateInvite = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-2xl p-6 md:p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 group">
      {/* Animated background shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Sparkle effects */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full animate-ping"></div>
      <div className="absolute top-6 right-8 w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-500"></div>
      
      <div className="relative z-10 text-center">
        <div className="mb-4">
          <span className="text-3xl md:text-4xl animate-bounce">💰</span>
          <span className="text-2xl md:text-3xl ml-2 animate-pulse">✨</span>
        </div>
        
        <h3 className="font-heading text-white text-xl md:text-2xl font-bold mb-3 drop-shadow-lg">
          Dołącz do Programu Partnerskiego!
        </h3>
        
        <p className="font-body text-white/90 text-sm md:text-base mb-6 max-w-md mx-auto leading-relaxed">
          Zarabiaj do <span className="font-bold text-white">30%</span> prowizji promując najlepsze pizzerie w Polsce
        </p>
        
        <Link
          href="/affiliate"
          className="inline-flex items-center gap-2 bg-white text-amber-600 font-bold py-3 px-6 md:px-8 rounded-full hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
        >
          <span>Zacznij zarabiać</span>
          <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
        </Link>
        
        <div className="mt-4 flex items-center justify-center gap-4 text-white/80 text-xs md:text-sm">
          <div className="flex items-center gap-1">
            <span>⚡</span>
            <span>Szybkie płatności</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🎯</span>
            <span>Wysokie prowizje</span>
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};