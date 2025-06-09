"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";
import { createLinkFromText } from "../../lib/createLinkFromText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function WarsawSection({ placesData }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="goldenw-full px-12 lg:px-16 2xl:px-24 mb-12">
      <Slider {...settings}>
        {placesData?.map((place, index) => (
          <div key={index} className="px-2">
            <Link
              href={`/pizza/${createLinkFromText(
                place.city
              )}/${createLinkFromText(place.name)}`}
              className="text-left block text-lg font-bold group transition-colors"
            >
              <div className="rounded-xl relative h-full">
                <div className="flex flex-col xl:flex-row">
                  <div className="w-full">
                    <Image
                      src={place.photos[0] || "/assets/pizza.png"}
                      alt={place.name}
                      width={400}
                      height={400}
                      className="border-[#ffa920] rounded-xl w-full h-60 object-cover"
                    />
                  </div>
                  <div className="pt-2 xl:pt-0 w-full pl-0 xl:pl-4">
                    <div className="flex flex-col gap-1.5 duration-300">
                      <p className="group-hover:text-[#ffa920]">{place.name}</p>
                      <p className="flex items-center gap-2 text-sm">
                        <FaLocationArrow className="text-xl text-[#ec7308] duration-300" />
                        {place.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
