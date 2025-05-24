import Link from "next/link";
export const Footer = () => {
  const popups = [
    { title: "O nas", content: "Jesteśmy najlepszą pizzerią w mieście!" },
    {
      title: "Kontakt",
      content: "Skontaktuj się z nami pod numerem 123-456-789.",
    },
    {
      title: "Regulamin",
      content: "Zapoznaj się z naszym regulaminem na stronie.",
    },
  ];
  return (
    <footer className="mt-10 bg-[#313131] px-6 md:px-12 py-6 text-center text-black">
      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex space-x-4">
          {popups.map((popup) => (
            <Link
              key={popup.title}
              href="#"
              className="text-white font-light bg-zinc-800 hover:bg-zinc-600 px-4 py-2 rounded-full transition duration-300 ease-in-out"
            >
              {popup.title}
            </Link>
          ))}
        </div>
        <p className="uppercase font-bold text-white text-sm">
          &copy; 2025 Pizzuj.pl <br /> Wszelkie prawa zastrzeżone
        </p>
        <Link href="tel:+48721417154" className="text-white font-light">
          +48 721 417 154
        </Link>
        <Link
          href="mailto:wesiudev@gmail.com"
          className="text-white font-light"
        >
          Email
        </Link>
      </div>
    </footer>
  );
};
