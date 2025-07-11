import { FaStar, FaRocket, FaCrown, FaGem } from "react-icons/fa6";

export default function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-orange-300/20 rounded-full blur-xl animate-bounce-gentle"></div>
      <div
        className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-green-200/30 to-orange-300/20 rounded-full blur-lg animate-bounce-gentle"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-300/20 to-orange-400/15 rounded-full blur-2xl animate-bounce-gentle"
        style={{ animationDelay: "2s" }}
      ></div>
      
      <div
        className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-purple-200/20 to-purple-300/15 rounded-full blur-lg animate-bounce-gentle"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-gradient-to-br from-green-300/25 to-orange-400/20 rounded-full blur-xl animate-bounce-gentle"
        style={{ animationDelay: "1.5s" }}
      ></div>
      
      <FaStar className="absolute top-32 left-1/4 text-orange-200/40 text-2xl animate-bounce-gentle" style={{ animationDelay: "0.3s" }} />
      <FaRocket className="absolute top-1/2 right-1/3 text-green-200/35 text-3xl animate-bounce-gentle" style={{ animationDelay: "0.8s" }} />
      <FaCrown className="absolute bottom-1/3 left-1/5 text-orange-300/30 text-2xl animate-bounce-gentle" style={{ animationDelay: "1.2s" }} />
      <FaGem className="absolute top-1/4 right-1/5 text-purple-200/40 text-2xl animate-bounce-gentle" style={{ animationDelay: "0.6s" }} />
      
      <div className="absolute top-16 right-1/4 w-1 h-1 bg-[#ffa920]/60 rounded-full animate-ping" style={{ animationDelay: "0.4s" }}></div>
      <div className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-[#ffa920]/50 rounded-full animate-pulse" style={{ animationDelay: "0.9s" }}></div>
      <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-[#ffa920]/70 rounded-full animate-bounce" style={{ animationDelay: "1.1s" }}></div>
    </div>
  );
} 