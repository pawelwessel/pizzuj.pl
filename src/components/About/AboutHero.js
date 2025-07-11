import Image from "next/image";
import accent from "../../../public/assets/asset2.png";
import { ptSans } from "../../app/layout";

export default function AboutHero() {
  return (
    <div className="relative min-h-[40vh] w-full golden pt-20 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-orange-500/5 to-red-600/5 animate-pulse" />
      
      {/* Floating pizza decoration with enhanced animation */}
      <Image
        src={accent}
        alt="Pizza decoration"
        className="absolute h-32 lg:h-[40%] xl:h-[60%] w-auto opacity-10 right-6 lg:right-16 xl:right-24 top-12 lg:top-1/2 lg:-translate-y-1/2 z-0 animate-float"
        width={300}
        height={300}
      />
      
      {/* Additional decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-32 right-20 w-1 h-1 bg-orange-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-red-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-50 mx-auto w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3">
        <div className="flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-yellow-400/20 shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 transform hover:scale-[1.02]">
          <h1 className="text-center !text-white drop-shadow-lg shadow-black text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent animate-gradient">
            O Pizzuj.pl
          </h1>
          <div className="h-1 w-24 golden rounded-full mb-8 animate-pulse" />
          <p className={`!text-white text-lg lg:text-xl italic font-cocosharp font-light text-center max-w-3xl leading-relaxed ${ptSans.className}`}>
            Połączenie technologii i pasji do pizzy - poznaj historię Pizzuj.pl
          </p>
          
          {/* Subtle scroll indicator */}
          <div className="mt-8 flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-yellow-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-bounce" />
            </div>
            <span className="text-yellow-400/70 text-sm mt-2">Scroll</span>
          </div>
        </div>
      </div>
    </div>
  );
}
