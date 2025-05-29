import { FaCheckCircle } from "react-icons/fa";

export default function Page() {
  return (
    <div className="golden flex items-center justify-center">
      <div className="bg-white flex flex-col p-3 mt-12 w-[300px]">
        <h2 className="text-xl lg:text-3xl text-black text-center">Za darmo</h2>
        <ul>
          <li className="flex">
            <div className="min-w-9 h-auto aspect-square">
              <FaCheckCircle className="text-green-500 w-6 h-6" />
            </div>
            <span className="ml-2">
              Dodaj swoją pizzerię do naszej bazy danych
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
