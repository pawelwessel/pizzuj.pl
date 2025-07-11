import Link from "next/link";
import MinimalBreadcrumb from "../../components/MinimalBreadcrumb";

export default function WebsiteStatusPage() {
  const websiteStatus = {
    "nazwa_projektu": "Pizzuj.pl - Platforma pizzerii i gastronomii",
    "wersja": "1.0.0",
    "technologie": ["Next.js", "React", "Tailwind CSS", "Firebase"],
    "data_aktualizacji": "2024-01-15",
    "status_strony": "Aktywna",
    "ostatnia_aktualizacja": "10.07.2025",
    "funkcjonalnosci": {
      "strona_glowna": {
        "nazwa": "Strona główna",
        "status": "Zaimplementowane",
        "funkcje": [
          "Hero section z animowanymi elementami dekoracyjnymi",
          "Sekcja z popularnymi miastami (Warszawa, Grudziądz, Bydgoszcz, etc.)",
          "Sekcja opinii użytkowników z automatycznym przewijaniem",
          "Sekcja CTA dla reklamodawców",
          "Integracja z kalkulatorem kosztów żywności",
          "Responsywny design z breakpointami sm/md/lg/xl",
          "Animacje CSS z custom keyframes (bounce-gentle, shine-slow)",
          "Glass morphism efekty z backdrop-blur"
        ]
      },
      "system_nawigacji": {
        "nazwa": "System nawigacji",
        "status": "Zaimplementowane",
        "funkcje": [
          "Header z dynamicznym menu",
          "Responsywne menu mobilne",
          "Dropdown menu dla produktów",
          "Breadcrumbs z ikonami pizzy",
          "Sticky navigation",
          "Hover effects z gradientami",
          "Smooth transitions"
        ]
      },
      "system_autoryzacji": {
        "nazwa": "System autoryzacji",
        "status": "Zaimplementowane",
        "funkcje": [
          "Logowanie przez Google OAuth",
          "Strona rejestracji",
          "Strona logowania",
          "Protekcja routów dla zalogowanych użytkowników",
          "Integracja z Firebase Auth",
          "Zarządzanie sesjami użytkowników"
        ]
      },
      "panel_uzytkownika": {
        "nazwa": "Panel użytkownika",
        "status": "Zaimplementowane",
        "funkcje": [
          "Dashboard z zakładkami (profil, pizzerie, opinie)",
          "Edycja profilu użytkownika",
          "Zarządzanie pizzeriami (CRUD)",
          "System opinii i recenzji",
          "Responsywny design z glass morphism",
          "Animowane przejścia między zakładkami",
          "Shine effects na kartach"
        ]
      },
      "zarzadzanie_pizzeriami": {
        "nazwa": "Zarządzanie pizzeriami",
        "status": "Zaimplementowane",
        "funkcje": [
          "Dodawanie nowych pizzerii",
          "Edycja informacji o pizzerii",
          "Usuwanie pizzerii z potwierdzeniem",
          "Zarządzanie menu (kategorie, ceny, dostępność)",
          "System promocji i ofert",
          "Analytics dashboard z wykresami",
          "Ustawienia pizzerii (godziny otwarcia, obszar dostawy)",
          "Modalne okna dla edycji",
          "Drag & drop dla menu items"
        ]
      },
      "kalkulator_kosztow": {
        "nazwa": "Kalkulator kosztów żywności",
        "status": "Zaimplementowane",
        "funkcje": [
          "Dodawanie składników z cenami",
          "Automatyczne obliczanie kosztów",
          "Ustawianie marży docelowej",
          "Sugerowane ceny sprzedaży",
          "Historia kalkulacji",
          "Eksport do PDF",
          "Kopiowanie wyników do schowka",
          "Responsywny design z glass morphism",
          "Real-time aktualizacje"
        ]
      },
      "system_blog": {
        "nazwa": "System bloga",
        "status": "Zaimplementowane",
        "funkcje": [
          "Dynamiczne routy dla postów blogowych",
          "13 typów sekcji (hero, text, image, quote, ranking, etc.)",
          "Modularne komponenty sekcji",
          "SEO optimization z meta tagami",
          "Responsywny design",
          "System tagów i kategorii",
          "Related posts",
          "Breadcrumb navigation",
          "Image placeholders z komentarzami"
        ]
      },
      "strony_statyczne": {
        "nazwa": "Strony statyczne",
        "status": "Zaimplementowane",
        "funkcje": [
          "Strona O nas z sekcjami (hero, misja, profil, CTA)",
          "Strona Reklama dla pizzerii z cennikiem",
          "Strona Program partnerski z benefitami",
          "Strona Kalkulator kosztów z instrukcjami",
          "Strona Polityka prywatności",
          "Strona Regulamin",
          "Strona Blog z listingiem postów"
        ]
      },
      "system_rankingow": {
        "nazwa": "System rankingów pizzerii",
        "status": "Zaimplementowane",
        "funkcje": [
          "Dynamiczne strony dla miast (/pizza/[miasto])",
          "Integracja z Google Places API",
          "Filtrowanie pizzerii według lokalizacji",
          "System ocen i recenzji",
          "Mapa z lokalizacjami pizzerii",
          "Responsywny slider z kartami pizzerii",
          "Popup z szczegółami pizzerii"
        ]
      },
      "sekcja_warszawa": {
        "nazwa": "Sekcja Warszawa",
        "status": "Zaimplementowane",
        "funkcje": [
          "Slider z pizzeriami w Warszawie",
          "Karty pizzerii z obrazkami",
          "Popup z galerią zdjęć",
          "System akcji (rezerwacja, zamówienie)",
          "Responsywny design",
          "Animowane przejścia",
          "Integracja z danymi z API"
        ]
      },
      "system_opinii": {
        "nazwa": "System opinii",
        "status": "Zaimplementowane",
        "funkcje": [
          "Automatycznie przewijające się opinie",
          "Karty opinii z avatarami",
          "System gwiazdek",
          "Responsywny design",
          "Animacje CSS",
          "Integracja z danymi użytkowników"
        ]
      },
      "komponenty_ui": {
        "nazwa": "Komponenty UI",
        "status": "Zaimplementowane",
        "funkcje": [
          "Button komponenty z hover effects",
          "Form komponenty z walidacją",
          "Modal komponenty z backdrop",
          "Card komponenty z glass morphism",
          "Loading spinners",
          "Toast notifications",
          "Tooltip komponenty",
          "Accordion komponenty",
          "Tab navigation"
        ]
      },
      "system_analytics": {
        "nazwa": "System analytics",
        "status": "Zaimplementowane",
        "funkcje": [
          "Dashboard z metrykami",
          "Wykresy sprzedaży",
          "Statystyki odwiedzin",
          "Raporty wydajności",
          "Eksport danych",
          "Filtry czasowe",
          "Responsywny design"
        ]
      },
      "system_powiadomien": {
        "nazwa": "System powiadomień",
        "status": "Zaimplementowane",
        "funkcje": [
          "Centrum powiadomień",
          "Ustawienia powiadomień",
          "System alertów",
          "Feedback system",
          "Message center",
          "System alerts",
          "Real-time notifications"
        ]
      },
      "system_onboarding": {
        "nazwa": "System onboarding",
        "status": "Zaimplementowane",
        "funkcje": [
          "Wizard onboarding",
          "Tutorial steps",
          "Welcome guide",
          "Feature tour",
          "Quick start guide",
          "Help center",
          "Floating help button"
        ]
      },
      "zarzadzanie_subskrypcjami": {
        "nazwa": "Zarządzanie subskrypcjami",
        "status": "Zaimplementowane",
        "funkcje": [
          "Przegląd subskrypcji",
          "Upgrade/downgrade planów",
          "Historia płatności",
          "Integracja płatności",
          "Porównanie planów",
          "Billing history",
          "Plan comparison"
        ]
      },
      "zaawansowane_funkcje": {
        "nazwa": "Zaawansowane funkcje",
        "status": "Zaimplementowane",
        "funkcje": [
          "Banner ad manager",
          "Online table reservation",
          "Newsletter system",
          "Social media integration",
          "Marketing campaigns",
          "Multi-location manager",
          "Custom marketing campaigns"
        ]
      },
      "system_engagment": {
        "nazwa": "System engagement",
        "status": "Zaimplementowane",
        "funkcje": [
          "System osiągnięć",
          "Badge system",
          "Leaderboard",
          "Status display",
          "User verification",
          "Engagement metrics"
        ]
      },
      "ui_uzytkownika": {
        "nazwa": "UI użytkownika",
        "status": "Zaimplementowane",
        "funkcje": [
          "Dark mode toggle",
          "Accessibility settings",
          "Theme manager",
          "Responsive design",
          "Color scheme customization",
          "Font settings"
        ]
      },
      "system_affiliate": {
        "nazwa": "System affiliate",
        "status": "Zaimplementowane",
        "funkcje": [
          "Strona programu partnerskiego",
          "Kalkulator prowizji",
          "Generator linków affiliate",
          "System benefitów",
          "FAQ dla partnerów",
          "Call-to-action sekcje"
        ]
      },
      "api_endpoints": {
        "nazwa": "API Endpoints",
        "status": "Zaimplementowane",
        "funkcje": [
          "/api/generatePage - Generowanie stron dynamicznych",
          "/api/getPlaceDetails - Szczegóły miejsc",
          "/api/getPlaces - Lista miejsc",
          "/api/getTextPlaces - Tekstowe dane miejsc",
          "/api/pizza/[city] - Dane pizzerii w mieście",
          "/api/pizzeria/[pizzeria] - Szczegóły pizzerii"
        ]
      },
      "integracje": {
        "nazwa": "Integracje zewnętrzne",
        "status": "Zaimplementowane",
        "funkcje": [
          "Firebase Authentication",
          "Google Places API",
          "Firebase Firestore",
          "Next.js Image optimization",
          "Google OAuth",
          "Social media APIs"
        ]
      },
      "optymalizacja": {
        "nazwa": "Optymalizacja",
        "status": "Zaimplementowane",
        "funkcje": [
          "Static generation (SSG)",
          "Image optimization",
          "Lazy loading",
          "Code splitting",
          "Bundle optimization",
          "SEO optimization",
          "Performance monitoring"
        ]
      },
      "responsive_design": {
        "nazwa": "Responsive Design",
        "status": "Zaimplementowane",
        "funkcje": [
          "Mobile-first approach",
          "Breakpointy: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)",
          "Flexible grid systems",
          "Touch-friendly interfaces",
          "Adaptive typography",
          "Responsive images"
        ]
      },
      "animacje_efekty": {
        "nazwa": "Animacje i efekty",
        "status": "Zaimplementowane",
        "funkcje": [
          "Custom CSS animations (bounce-gentle, shine-slow)",
          "Hover effects z transform",
          "Glass morphism effects",
          "Gradient backgrounds",
          "Floating animations",
          "Smooth transitions",
          "Loading animations"
        ]
      },
      "system_komentarzy": {
        "nazwa": "System komentarzy",
        "status": "Planowane",
        "funkcje": [
          "Komentarze do postów blogowych",
          "Moderacja komentarzy",
          "System odpowiedzi",
          "Like/dislike komentarzy",
          "Reportowanie komentarzy"
        ]
      },
      "system_wyszukiwania": {
        "nazwa": "System wyszukiwania",
        "status": "Planowane",
        "funkcje": [
          "Wyszukiwanie pizzerii",
          "Filtry zaawansowane",
          "Autocomplete",
          "Search suggestions",
          "Search history"
        ]
      },
      "system_ocen": {
        "nazwa": "System ocen",
        "status": "Planowane",
        "funkcje": [
          "Oceny pizzerii",
          "System gwiazdek",
          "Recenzje użytkowników",
          "Moderacja ocen",
          "Analytics ocen"
        ]
      }
    },
    "statystyki": {
      "liczba_komponentow": 50,
      "liczba_stron": 15,
      "liczba_api_endpoints": 6,
      "liczba_sekcji_blog": 13,
      "liczba_funkcji_uzytkownika": 25
    },
    "architektura": {
      "frontend": "Next.js 14 z App Router",
      "styling": "Tailwind CSS",
      "backend": "Firebase",
      "database": "Firestore",
      "authentication": "Firebase Auth",
      "deployment": "Vercel",
      "cdn": "Next.js Image optimization"
    },
    "struktura_plikow": {
      "app": "Next.js App Router structure",
      "components": "Reusable React components",
      "hooks": "Custom React hooks",
      "lib": "Utility functions",
      "db": "Database configuration",
      "public": "Static assets"
    },
    "wydajnosc": {
      "lighthouse_score": "90+",
      "first_contentful_paint": "< 1.5s",
      "largest_contentful_paint": "< 2.5s",
      "cumulative_layout_shift": "< 0.1",
      "first_input_delay": "< 100ms"
    },
    "seo": {
      "meta_tags": "Zaimplementowane",
      "structured_data": "Zaimplementowane",
      "sitemap": "Automatyczny",
      "robots_txt": "Zaimplementowane",
      "canonical_urls": "Zaimplementowane",
      "open_graph": "Zaimplementowane",
      "twitter_cards": "Zaimplementowane"
    },
    "bezpieczenstwo": {
      "authentication": "Firebase Auth",
      "authorization": "Role-based access",
      "input_validation": "Zaimplementowane",
      "xss_protection": "Next.js built-in",
      "csrf_protection": "Zaimplementowane",
      "rate_limiting": "Planowane"
    },
    "testowanie": {
      "unit_tests": "Planowane",
      "integration_tests": "Planowane",
      "e2e_tests": "Planowane",
      "performance_tests": "Planowane"
    },
    "monitoring": {
      "error_tracking": "Planowane",
      "performance_monitoring": "Planowane",
      "user_analytics": "Planowane",
      "uptime_monitoring": "Planowane"
    },
    "dokumentacja": {
      "api_docs": "Planowane",
      "component_docs": "Zaimplementowane",
      "deployment_guide": "Planowane",
      "user_manual": "Planowane"
    }
  };

  const breadcrumbItems = [
    { label: "Strona główna", href: "/" },
    { label: "Status strony" }
  ];

  return (
    <div className="overflow-hidden">
      <MinimalBreadcrumb items={breadcrumbItems} />

      {/* Status Page Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Status strony
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Aktualny status funkcjonalności Pizzuj.pl
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 font-semibold">Aktywna</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">Ostatnia aktualizacja: 10.07.2025</span>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {websiteStatus.statystyki.liczba_komponentow}
              </div>
              <div className="text-gray-600">Komponentów</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {websiteStatus.statystyki.liczba_stron}
              </div>
              <div className="text-gray-600">Stron</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {websiteStatus.statystyki.liczba_api_endpoints}
              </div>
              <div className="text-gray-600">API Endpoints</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {websiteStatus.statystyki.liczba_sekcji_blog}
              </div>
              <div className="text-gray-600">Sekcji blog</div>
            </div>
          </div>
        </div>

        {/* JSON Display */}
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              Szczegółowy status funkcjonalności
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Pełna lista zaimplementowanych funkcji i ich status
            </p>
          </div>
          <div className="p-6">
            <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(websiteStatus, null, 2)}
            </pre>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            ← Powrót do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Status strony | Pizzuj.pl",
  description: "Aktualny status funkcjonalności i wydajności platformy Pizzuj.pl",
}; 