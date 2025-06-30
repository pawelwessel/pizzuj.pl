"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AffiliateHowMuchDoYouWantToEarn() {
  const [monthlyGoal, setMonthlyGoal] = useState(5000);
  const [animatedEarnings, setAnimatedEarnings] = useState(0);
  const [animatedCommission, setAnimatedCommission] = useState(0);
  const [animatedReferrals, setAnimatedReferrals] = useState(0);

  // Commission rate (15% example)
  const commissionRate = 0.15;
  const avgOrderValue = 45; // Average pizza order value

  // Calculate metrics
  const requiredReferrals = Math.ceil(
    monthlyGoal / (avgOrderValue * commissionRate)
  );
  const dailyReferrals = Math.ceil(requiredReferrals / 30);
  const yearlyEarnings = monthlyGoal * 12;

  // Animate numbers when goal changes
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepDelay = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedEarnings(Math.floor(monthlyGoal * easeOutQuart));
      setAnimatedCommission(
        Math.floor(monthlyGoal * commissionRate * easeOutQuart)
      );
      setAnimatedReferrals(Math.floor(requiredReferrals * easeOutQuart));

      currentStep++;

      if (currentStep > steps) {
        clearInterval(timer);
        setAnimatedEarnings(monthlyGoal);
        setAnimatedCommission(Math.floor(monthlyGoal * commissionRate));
        setAnimatedReferrals(requiredReferrals);
      }
    }, stepDelay);

    return () => clearInterval(timer);
  }, [monthlyGoal, requiredReferrals]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMotivationalMessage = () => {
    if (monthlyGoal < 2000) return "Świetny początek! 🚀";
    if (monthlyGoal < 5000) return "Ambitny cel! 💪";
    if (monthlyGoal < 10000) return "Myślisz jak przedsiębiorca! 🔥";
    return "Poziom CEO! 👑";
  };

  return (
    <div className="relative py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full animate-pulse"></div>
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-orange-200/20 to-yellow-200/20 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Moving pizza icons */}
        <div
          className="absolute top-20 left-10 w-8 h-8 text-orange-300 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🍕
        </div>
        <div
          className="absolute top-40 right-20 w-8 h-8 text-orange-300 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          🍕
        </div>
        <div
          className="absolute bottom-20 left-20 w-8 h-8 text-orange-300 animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          🍕
        </div>
      </div>

      <div className="relative z-10 mx-auto w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-6">
            Ile chcesz zarabiać miesięcznie?
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Ustaw swój cel finansowy, a pokażemy Ci, ile polecanych zamówień
            potrzebujesz
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Interactive Calculator */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-orange-100">
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Twój miesięczny cel finansowy:
                </label>

                {/* Custom Range Slider */}
                <div className="relative mb-6">
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="500"
                    value={monthlyGoal}
                    onChange={(e) => setMonthlyGoal(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ffa920 0%, #ffa920 ${
                        ((monthlyGoal - 1000) / 19000) * 100
                      }%, #f3f4f6 ${
                        ((monthlyGoal - 1000) / 19000) * 100
                      }%, #f3f4f6 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1 000 PLN</span>
                    <span>20 000 PLN</span>
                  </div>
                </div>

                {/* Animated Goal Display */}
                <div className="text-center py-6">
                  <div className="inline-flex items-center space-x-2 text-4xl lg:text-5xl font-bold golden bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    <span className="animate-pulse">💰</span>
                    <span className="tabular-nums !text-zinc-800">
                      {formatCurrency(animatedEarnings)}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 mt-2 font-medium">
                    {getMotivationalMessage()}
                  </p>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[2000, 5000, 10000, 15000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMonthlyGoal(preset)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      monthlyGoal === preset
                        ? "golden text-white transform scale-105 shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                    }`}
                  >
                    {formatCurrency(preset)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Calculations Display */}
          <div className="space-y-6">
            {/* Monthly Stats Card */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-l-4 border-orange-400 transform transition-all duration-500 hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📊</span>
                Statystyki miesięczne
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl lg:text-3xl font-bold text-orange-600 tabular-nums">
                    {animatedReferrals}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Zdobyte restauracje
                  </div>
                </div>
                <div className="text-center bg-green-50 rounded-xl">
                  <div className="text-2xl lg:text-3xl font-bold text-green-600 tabular-nums">
                    {Math.floor(animatedCommission)}%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Twoja prowizja
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Goals Card */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-l-4 border-blue-400 transform transition-all duration-500 hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">⏰</span>
                Cele dzienne
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  Polecenia dziennie:
                </span>
                <span className="text-3xl font-bold text-blue-600 tabular-nums">
                  ~{dailyReferrals}
                </span>
              </div>
              <div className="mt-4 bg-blue-50 p-3 rounded-xl">
                <p className="text-sm text-blue-700">
                  To tylko{" "}
                  <strong>
                    {dailyReferrals} polecenie
                    {dailyReferrals > 1 ? (dailyReferrals < 5 ? "a" : "ń") : ""}
                  </strong>{" "}
                  dziennie!
                </p>
              </div>
            </div>

            {/* Yearly Projection Card */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-l-4 border-purple-400 transform transition-all duration-500 hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🚀</span>
                Projekcja roczna
              </h3>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 tabular-nums">
                  {formatCurrency(yearlyEarnings)}
                </div>
                <p className="text-purple-700 font-medium mt-2">
                  Potencjalny zarobek rocznie
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-8 rounded-3xl text-white shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Gotowy na start? 🏁
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Dołącz do naszego programu partnerskiego i zacznij zarabiać już
              dziś!
            </p>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Rozpocznij teraz
            </button>
          </div>
        </div>
      </div>

      {/* Custom slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffa920, #ff8f00);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(255, 169, 32, 0.4);
          transition: all 0.3s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 20px rgba(255, 169, 32, 0.6);
        }

        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffa920, #ff8f00);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(255, 169, 32, 0.4);
        }
      `}</style>
    </div>
  );
}
