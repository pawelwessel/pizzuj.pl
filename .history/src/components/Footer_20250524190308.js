import Image from "next/image";
import Link from "next/link";
import pizzuj from "../../public/assets/pizzuj2.png";
import removePolishSignsAndSpaces from "../lib/removePolishSignsAndSpaces";
export const Footer = () => {
  const links = [
    {
      title: "Cennik Reklam",
      content: "Jesteśmy najlepszą pizzerią w mieście!",
    },
    {
      title: "Kontakt",
      content: "Skontaktuj się z nami pod numerem 123-456-789.",
    },
    {
      title: "Regulamin",
      content: "Zapoznaj się z naszym regulaminem na stronie.",
    },
  ];
  const links2 = [
    {
      title: "Polityka prywatności",
      content: "Zapoznaj się z naszym regulaminem na stronie.",
    },
    {
      title: "Facebook",
      content: "Skontaktuj się z nami pod numerem 123-456-789.",
    },
    { title: "O mnie", content: "Jesteśmy najlepszą pizzerią w mieście!" },
  ];
  return (
    <footer className="flex flex-wrap gap-8 justify-between mt-10 bg-[#313131] px-6 md:px-12 py-6 text-black">
      <div className="flex flex-col gap-4">
        <Image
          src={pizzuj}
          alt="Pizzuj.pl Logo"
          width={150}
          height={50}
          className="w-[200px]"
        />
        <p className="uppercase font-bold text-white text-sm">
          &copy; 2025 Pizzuj.pl <br /> Wszelkie prawa zastrzeżone
        </p>
        <p className="text-white font-light text-xs">+48 721 417 154</p>
        <p className="text-white font-light text-xs">wesiudev@gmail.com</p>
      </div>
      <div className="flex space-x-4 flex-col">
        <h3 className="text-[#ffa920] text-2xl">Linki</h3>
        {links.map((link) => (
          <Link
            key={link.title}
            href={removePolishSignsAndSpaces(link.title)}
            className="text-white font-light px-4 py-2 rounded-full transition duration-300 ease-in-out"
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex space-x-4 flex-col">
        <h3 className="text-[#ffa920] text-2xl">Więcej linków</h3>
        {links2.map((link) => (
          <Link
            key={removePolishSignsAndSpaces(link.title)}
            href="#"
            className="text-white font-light px-4 py-2 rounded-full transition duration-300 ease-in-out"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </footer>
  );
};
