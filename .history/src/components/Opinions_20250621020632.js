import accentImage from "../../public/assets/accentpizza.png";
import accentImage2 from "../../public/assets/asset8.png";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
export default function Opinions() {
  return (
    <main className="overflow-hidden bg-[#333333] !text-gray-300 h-max relative px-6 md:px-12 pb-12 w-full">
      <div className="text-center gap-4 flex flex-col my-12">
        <p className="font-normal text-yellow-600 text-sm">PIZZUJ.PL</p>
        <h2 className="text-xl md:text-2xl font-bold uppercase">
          Opinie o pizzeriach
        </h2>
        <div className="bg-white/50 h-px w-4/5 sm:w-1/2 lg:w-1/5 mx-auto" />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="w-[97.5%] lg:w-max rounded-md bg-[#a0a0a0]/20 p-4 lg:p-8 h-[60vh] flex overflow-hidden">
          <div className="animate-from-top-to-bottom w-full">
            <div className="flex flex-col items-center w-full">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  author={review.author}
                  comment={review.comment}
                  restaurant={review.restaurant}
                  favoritePizza={review.favoritePizza}
                />
              ))}
              {/* Duplicate the content for seamless loop */}
              {reviews.map((review, index) => (
                <ReviewCard
                  key={`dup-${index}`}
                  author={review.author}
                  comment={review.comment}
                  restaurant={review.restaurant}
                  favoritePizza={review.favoritePizza}
                />
              ))}
            </div>
          </div>
        </div>
        <Image
          src={accentImage}
          width={800}
          height={1230}
          alt="Opinie o pizzeriach PNG"
          className="w-[200px] opacity-30 absolute -left-[120px] -top-[75px] z-0 rotate-[80deg] lg:w-[250px] lg:opacity-10"
        />
        <Image
          src={accentImage2}
          width={800}
          height={1230}
          alt="Opinie o pizzeriach PNG"
          className="w-[20vw] sm:w-[13vw] opacity-40 sm:opacity-30 lg:opacity-10 xl:opacity-15 absolute right-4 lg:right-[3%] z-0 bottom-2 hidden sm:block"
        />
      </div>
    </main>
  );
}
export const ReviewCard = ({ author, comment, restaurant, favoritePizza }) => (
  <div className="animate-from-top-to-bottom-and-forwards w-full sm:w-[500px] lg:w-[600px] flex items-start justify-between border-b border-white py-4">
    <div className="text-sm w-full">
      <div className="flex items-center w-full justify-between">
        <p className="font-bold uppercase !text-white">{author}</p>
        <div className="flex gap-1">
          <FaStar className="text-xs mt-1 text-yellow-600" />
          <FaStar className="text-xs mt-1 text-yellow-600" />
          <FaStar className="text-xs mt-1 text-yellow-600" />
          <FaStar className="text-xs mt-1 text-yellow-600" />
          <FaStar className="text-xs mt-1 text-yellow-600" />
        </div>
      </div>
      <p className="text-xs mt-1 tracking-wide !text-white">{favoritePizza}</p>
      <p className="text-xs mt-1 tracking-wide !text-white">{comment}</p>
    </div>
  </div>
);
const reviews = [
  {
    author: "Jan Kowalski",
    comment: "Najlepsza pizza w mieście!",
    restaurant: "Tutti Santi",
    favoritePizza: "Santa Clara",
  },
  {
    author: "Anna Nowak",
    comment: "Uwielbiam ich ciasto!",
    restaurant: "Parmegiano",
    favoritePizza: "Margherita",
  },
  {
    author: "Piotr Wiśniewski",
    comment: "Szybka dostawa i pyszne jedzenie.",
    restaurant: "Santa Porte",
    favoritePizza: "Margherita",
  },
  {
    author: "Jan Kowalski",
    comment: "Najlepsza pizza w mieście!",
    restaurant: "Tutti Santi",
    favoritePizza: "Santa Clara",
  },
  {
    author: "Anna Nowak",
    comment: "Uwielbiam ich ciasto!",
    restaurant: "Parmegiano",
    favoritePizza: "Margherita",
  },
  {
    author: "Piotr Wiśniewski",
    comment: "Szybka dostawa i pyszne jedzenie.",
    restaurant: "Santa Porte",
    favoritePizza: "Margherita",
  },
  {
    author: "Jan Kowalski",
    comment: "Najlepsza pizza w mieście!",
    restaurant: "Tutti Santi",
    favoritePizza: "Santa Clara",
  },
  {
    author: "Anna Nowak",
    comment: "Uwielbiam ich ciasto!",
    restaurant: "Parmegiano",
    favoritePizza: "Margherita",
  },
  {
    author: "Piotr Wiśniewski",
    comment: "Szybka dostawa i pyszne jedzenie.",
    restaurant: "Santa Porte",
    favoritePizza: "Margherita",
  },
];
