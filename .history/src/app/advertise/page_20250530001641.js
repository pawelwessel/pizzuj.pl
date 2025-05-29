import { FaCheckCircle } from "react-icons/fa";

export default function Page() {
  return (
    <div className="golden px-6 sm:px-12 lg:px-24 pb-12">
      <div className="text-white h-[40vh] items-center flex justify-center text-center">
        <h1 className="text-xl lg:text-3xl">Hej, a może... Pizzuj.pl!</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-12 golden">
        <div className="bg-white flex flex-col px-6 py-6">
          <h2 className="text-xl lg:text-3xl text-black text-center">
            Za darmo
          </h2>
          <ul>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Dodaj swoją pizzerię do naszej bazy danych
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Wyświetlaj swoje menu w pizzuj.pl</span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Umieść zdjęcia i informacje o swojej pizzerii
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Otrzymuj opinie i oceny od klientów</span>
            </li>
          </ul>
        </div>
        <div className="bg-white flex flex-col px-6 py-6">
          <h2 className="text-xl lg:text-3xl text-black text-center">
            Za darmo
          </h2>
          <ul>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Dodaj swoją pizzerię do naszej bazy danych
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Wyświetlaj swoje menu w pizzuj.pl</span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Umieść zdjęcia i informacje o swojej pizzerii
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Otrzymuj opinie i oceny od klientów</span>
            </li>
          </ul>
        </div>
        <div className="bg-white flex flex-col px-6 py-6">
          <h2 className="text-xl lg:text-3xl text-black text-center">
            Za darmo
          </h2>
          <ul>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Dodaj swoją pizzerię do naszej bazy danych
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Wyświetlaj swoje menu w pizzuj.pl</span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">
                Umieść zdjęcia i informacje o swojej pizzerii
              </span>
            </li>
            <li className="flex mt-12">
              <div className="min-w-9 h-auto aspect-square">
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              </div>
              <span className="ml-2">Otrzymuj opinie i oceny od klientów</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
