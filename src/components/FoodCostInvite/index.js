import Link from "next/link";
import Image from "next/image";

export default function FoodCostInvite() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 bg-primary-300/20 rounded-full animate-bounce-gentle" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-20 right-20 w-12 h-12 bg-primary-400/30 rounded-full animate-bounce-gentle" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary-200/15 rounded-full animate-bounce-gentle" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-10 right-1/3 w-8 h-8 bg-primary-500/25 rounded-full animate-bounce-gentle" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="glass bg-gradient-to-br from-white/70 via-primary-50/60 to-primary-100/40 border border-primary-200/40 rounded-3xl lg:rounded-5xl p-8 lg:p-12 backdrop-blur-sm shadow-golden-lg hover:shadow-large transition-all duration-500 transform hover:-translate-y-2">
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left side - Text content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-300/30 rounded-full px-4 py-2 text-sm font-cocosharp text-primary-700">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                Nowe narzędzie
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="font-cocosharp-bold-italic text-3xl sm:text-4xl lg:text-5xl text-gray-800 leading-tight">
                  Kalkuluj koszty{" "}
                  <span className="text-primary-500 relative">
                    jak profesjonalista
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transform -rotate-1"></div>
                  </span>
                </h2>
                <p className="font-cocosharp text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Zwiększ rentowność swojej pizzerii dzięki precyzyjnym kalkulacjom kosztów żywności. 
                  <span className="font-semibold text-primary-600"> Za darmo!</span>
                </p>
              </div>

              {/* Features list */}
              <div className="space-y-4">
                {[
                  { icon: "🧮", text: "Oblicz dokładne koszty składników" },
                  { icon: "📈", text: "Optymalizuj marżę zysku" },
                  { icon: "🎯", text: "Podejmuj świadome decyzje cenowe" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-primary-200/30 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-lg">
                      {feature.icon}
                    </div>
                    <span className="font-cocosharp text-gray-700 font-medium">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link href="/food-cost" className="group">
                  <button className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-cocosharp font-semibold px-8 py-4 rounded-2xl shadow-golden transition-all duration-300 transform hover:scale-105 hover:shadow-golden-lg">
                    <span className="relative z-10 flex items-center gap-2 text-lg">
                      Zacznij kalkulować
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </span>
                    
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right side - Visual element */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 lg:p-12 shadow-medium">
                {/* Calculator mockup */}
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                        🍕
                      </div>
                      <div>
                        <h3 className="font-cocosharp font-semibold text-gray-800">Pizza Margherita</h3>
                        <p className="text-sm text-gray-500">Koszt składników</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { ingredient: "Ciasto", cost: "2.50 zł" },
                        { ingredient: "Sos pomidorowy", cost: "1.20 zł" },
                        { ingredient: "Mozzarella", cost: "4.80 zł" },
                        { ingredient: "Bazylia", cost: "0.50 zł" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">{item.ingredient}</span>
                          <span className="text-sm font-semibold text-primary-600">{item.cost}</span>
                        </div>
                      ))}
                      
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-cocosharp font-semibold text-gray-800">Całkowity koszt:</span>
                          <span className="font-cocosharp-bold-italic text-xl text-primary-600">9.00 zł</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">Sugerowana cena (30% marża):</span>
                          <span className="font-semibold text-green-600">11.70 zł</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-400 rounded-full animate-bounce-gentle" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-300 rounded-full animate-bounce-gentle" style={{ animationDelay: "1.5s" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}