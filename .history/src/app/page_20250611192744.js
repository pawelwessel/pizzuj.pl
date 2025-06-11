import Opinions from "../components/Opinions";
import { Footer } from "../components/Footer";
import Image from "next/image";
import pizza from "../../public/assets/pizza.png";
import accent2 from "../../public/assets/asset4.png";
import accent3 from "../../public/assets/asset5.png";
import CtaButton from "../components/CtaButton";
import { FaCheckCircle } from "react-icons/fa";
import { getDocument } from "../db/firebase";
import HeroSectionForHomePage from "../components/HeroSectionForHomePage";
import WarsawSection from "../components/WarsawSection";

export default async function Page() {
  const warsaw = await getDocument("pages", "warszawa");
  return (
    <div>
      <HeroSectionForHomePage />

      <CtaButton />
    </div>
  );
}
