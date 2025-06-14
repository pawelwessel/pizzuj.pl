"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function PizzeriaSlugSlider() {
  return (
    <div>
      <Slider {...settings}>
        {pizzeriaData.photos?.map((photo, index) => (
          <div key={index} className="px-2">
            <Image
              src={photo}
              alt={`Zdjęcie ${index + 1} z ${pizzeriaData.name}`}
              width={400}
              height={300}
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
