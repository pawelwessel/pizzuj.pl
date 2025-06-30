import AffiliateHowMuchDoYouWantToEarn from "./AffiliateHowMuchDoYouWantToEarn";

export default function AffiliateHowItWorks() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto w-[90%] lg:w-4/5 xl:w-3/4 2xl:w-2/3 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-6">
            Jak działa nasz program partnerski?
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Prosty sposób na zarabianie z każdego polecenia
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 golden rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Zarejestruj się
            </h3>
            <p className="text-gray-600">
              Dołącz do naszego programu partnerskiego za darmo
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 golden rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Polecaj znajomym
            </h3>
            <p className="text-gray-600">
              Dziel się swoim unikalnym linkiem z przyjaciółmi
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 golden rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Zarabiaj prowizję
            </h3>
            <p className="text-gray-600">
              Otrzymuj 15% z każdego zamówienia Twoich poleceń
            </p>
          </div>
        </div>

        {/* Interactive Calculator Component */}
        <AffiliateHowMuchDoYouWantToEarn />
      </div>
    </section>
  );
}