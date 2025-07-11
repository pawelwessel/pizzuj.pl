import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { 
  FaStar, 
  FaCrown, 
  FaRocket, 
  FaHeart, 
  FaFire, 
  FaUsers, 
  FaChartLine, 
  FaBullhorn,
  FaGem
} from "react-icons/fa6";

const iconMap = {
  heart: FaHeart,
  crown: FaCrown,
  rocket: FaRocket,
  star: FaStar,
  fire: FaFire,
  users: FaUsers,
  chartLine: FaChartLine,
  bullhorn: FaBullhorn,
  gem: FaGem,
  diamond: FaGem,
};

const colorMap = {
  primary: "text-primary-500",
  accent: "text-accent-600",
  green: "text-green-500",
  red: "text-red-500",
  blue: "text-blue-500",
  yellow: "text-yellow-500",
  green600: "text-green-600",
  purple: "text-purple-500",
  pink: "text-pink-500",
};

export default function PricingCard({ 
  plan, 
  icon, 
  iconColor = "primary", 
  price, 
  period = "miesięcznie", 
  features, 
  ctaText, 
  ctaLink, 
  isPopular = false,
  isEnterprise = false 
}) {
  const IconComponent = iconMap[icon];
  
  return (
    <div className={`group relative flex flex-col p-8 xl:p-10 rounded-3xl border transition-all duration-700 transform hover:-translate-y-4 ${
      isPopular 
        ? "bg-gradient-to-br from-white via-orange-50 to-orange-100 border-orange-400 hover:border-orange-600 scale-105 hover:shadow-golden-xl shadow-golden-lg" 
        : isEnterprise 
        ? "bg-gradient-to-br from-white via-purple-50 to-purple-100 border-purple-400 hover:border-purple-600 hover:shadow-purple-xl shadow-purple-lg" 
        : "bg-white/90 backdrop-blur-sm border-gray-200/50 hover:border-primary-300 hover:shadow-large card-hover"
    }`}>
      {/* Premium glow effect */}
      {isPopular && (
        <div className="absolute -inset-1 bg-[#ffa920] rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
      )}
      
      {/* Enterprise glow effect */}
      {isEnterprise && (
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
      )}
      
      <div className={`relative ${isPopular || isEnterprise ? "bg-white rounded-3xl p-8 xl:p-10" : ""}`}>
        {isPopular && (
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-[#ffa920] to-[#ff8c00] text-white px-3 text-nowrap py-3 rounded-full text-sm font-bold flex items-center shadow-golden font-heading animate-pulse">
              <FaStar className="mr-2" />
              NAJPOPULARNIEJSZY
            </div>
          </div>
        )}

        {isEnterprise && (
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 text-nowrap py-3 rounded-full text-sm font-bold flex items-center shadow-lg font-heading animate-pulse">
              <FaGem className="mr-2" />
              PREMIUM ENTERPRISE
            </div>
          </div>
        )}

        <div className={`text-center mb-8 ${isPopular || isEnterprise ? "mt-6" : ""}`}>
          <div className="relative inline-block mb-6">
            <div className={`p-4 rounded-full ${
              isPopular 
                ? "bg-gradient-to-br from-orange-100 to-orange-200" 
                : isEnterprise 
                ? "bg-gradient-to-br from-purple-100 to-purple-100"
                : "bg-gray-100"
            }`}>
              <IconComponent className={`${colorMap[iconColor]} text-5xl transition-transform duration-300 group-hover:scale-110`} />
            </div>
            <div className={`absolute inset-0 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isPopular ? "bg-orange-300/40" : isEnterprise ? "bg-purple-300/40" : "bg-primary-200/30"
            }`}></div>
          </div>
          <h2 className="font-heading text-2xl lg:text-3xl xl:text-4xl text-gray-900 font-bold mb-4">
            {plan}
          </h2>
          <div className="relative">
            {price && (
              <>
                <div className={`text-5xl xl:text-6xl font-bold mb-2 ${
                  isPopular ? "bg-gradient-to-r from-orange-600 to-[#ffa920] bg-clip-text text-transparent" :
                  isEnterprise ? "bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent" :
                  "text-zinc-800"
                }`}>
                  {price}
                </div>
                <p className="font-body text-lg text-gray-600">{period}</p>
              </>
            )}
          </div>
        </div>

        <ul className="flex-grow space-y-5 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group/item">
              <div className="min-w-6 h-6 mt-1.5">
                {feature.icon ? (
                  <feature.icon className={`${colorMap[feature.iconColor] || "text-green-500"} w-5 h-5 transition-transform duration-200 group-hover/item:${feature.animation || "translate-x-1"}`} />
                ) : (
                  <FaChevronRight className="text-green-500 w-5 h-5 transition-transform duration-200 group-hover/item:translate-x-1" />
                )}
              </div>
              <span className="ml-4 font-body text-gray-700 leading-relaxed">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        <Link 
          href={ctaLink} 
          className={`mx-auto block w-max max-w-full font-cocosharp text-center font-semibold py-4 px-6 w-full rounded-2xl transition-all duration-300 border-2 transform hover:scale-105 relative overflow-hidden group ${
            isPopular 
              ? "bg-gradient-to-r from-[#ffa920] to-[#ff8c00] text-white border-[#ffa920] hover:shadow-golden-lg" 
              : isEnterprise 
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-500 hover:shadow-lg" 
              : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-500 hover:to-black hover:text-white text-gray-800 border-gray-200 hover:border-primary-500 hover:shadow-golden"
          }`}
        >
          <span className="relative z-10">{ctaText}</span>
          {/* Enhanced sparkling animation elements */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
            <div className="absolute bottom-6 right-4 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute top-1/3 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/4 left-6 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{animationDelay: '1.2s'}}></div>
            <div className="absolute bottom-1/4 right-8 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '1.4s'}}></div>
          </div>
        </Link>
      </div>
    </div>
  );
} 