import { FaChevronRight, FaFire, FaUsers } from "react-icons/fa";
import { FaStar, FaCrown, FaRocket, FaHeart, FaChartLine, FaBullhorn, FaGem } from "react-icons/fa6";
import PricingCard from "./PricingCard";

export default function PricingSection() {
  const freeFeatures = [
    { text: "Dodaj swoją pizzerię do bazy" },
    { text: "Podstawowe informacje o lokalu" },
    { text: "Do 3 zdjęć pizzerii" },
    { text: "Podstawowe menu (do 10 pozycji)" },
    { text: "Opinie i oceny klientów" },
  ];

  const premiumFeatures = [
    { 
      text: <strong className="text-primary-800">Wszystko z planu Starter +</strong> 
    },
    { text: "Promowanie w wynikach wyszukiwania" },
    { 
      icon: FaFire, 
      iconColor: "red", 
      text: "Znaczek \"Polecane\" przy pizzerii",
      animation: "scale-110"
    },
    { text: "Nieograniczone zdjęcia" },
    { text: "Pełne menu z kategoriami i opisami" },
    { text: "Promocje i oferty specjalne" },
    { 
      icon: FaUsers, 
      iconColor: "blue", 
      text: "Statystyki odwiedzin i zainteresowania",
      animation: "scale-110"
    },
    { 
      icon: FaGem, 
      iconColor: "purple", 
      text: "Priorytetowe wsparcie klienta",
      animation: "scale-110"
    },
  ];

  const enterpriseFeatures = [
    { 
      text: <strong className="text-accent-800">Wszystko z planu Premium +</strong> 
    },
    { 
      icon: FaBullhorn, 
      iconColor: "accent", 
      text: "Reklamy bannerowe na stronie głównej",
      animation: "scale-110"
    },
    { 
      icon: FaStar, 
      iconColor: "yellow", 
      text: "Pierwszeństwo w wynikach wyszukiwania",
      animation: "scale-110"
    },
    { 
      icon: FaChartLine, 
      iconColor: "green600", 
      text: "Zaawansowane analytics i raporty",
      animation: "scale-110"
    },
    { text: "Newsletter do klientów (500/miesiąc)" },
    { text: "Dedykowany opiekun klienta" },
    { text: "Możliwość rezerwacji stolików online" },
    { text: "Integracja z mediami społecznościowymi" },
    { 
      icon: FaGem, 
      iconColor: "pink", 
      text: "Ekskluzywne funkcje VIP",
      animation: "scale-110"
    },
    { text: "Własne kampanie marketingowe" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 xl:gap-12 mt-12 relative">
      {/* Free Plan */}
      <PricingCard
        plan="Free Starter"
        icon="heart"
        price={null}
        features={freeFeatures}
        ctaText="Rozpocznij za darmo"
        ctaLink="/register"
      />

      {/* Premium Plan */}
      <PricingCard
        plan="Premium"
        icon="crown"
        price="999 zł"
        features={premiumFeatures}
        ctaText="Wybierz Premium"
        ctaLink="/register?premium=true"
        isPopular={true}
      />

      {/* Enterprise Plan */}
      <PricingCard
        plan="Enterprise"
        icon="diamond"
        iconColor="accent"
        price="1499 zł"
        features={enterpriseFeatures}
        ctaText="Skontaktuj się z nami"
        ctaLink="/contact"
        isEnterprise={true}
      />
    </div>
  );
} 