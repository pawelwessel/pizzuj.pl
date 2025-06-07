import Image from "next/image";
import Link from "next/link";
import pizzuj from "../../public/assets/pizzuj2.png";
import { createLinkFromText } from "../lib/createLinkFromText";
export const Footer = () => {
  const links = [
    { title: "Blog", href: "/blog" },
    {
      title: "Cennik Reklam",
      href: "/advertise",
    },
    {
      title: "Kontakt",
      href: "/contact",
    },
    {
      title: "Regulamin",
      href: "/terms",
    },
  ];
  const links2 = [
    {
      title: "Polityka prywatności",
      href: "/privacy",
    },
    {
      title: "Facebook",
      href: "/facebook",
    },
    { title: "O mnie", href: "/about" },
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
            href={createLinkFromText(link.title)}
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
            key={link.title}
            href={
              link.title !== "Facebook"
                ? createLinkFromText(link.title)
                : "https://www.facebook.com/pizzujpl"
            }
            className="text-white font-light px-4 py-2 rounded-full transition duration-300 ease-in-out"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </footer>
  );
};
