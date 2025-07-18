"use client";
import { useState, useEffect } from "react";
import ArrayWithPlaces from "../ArrayWithPlaces";
import AdvertiseYourself from "../AdvertiseYourself";
import CtaButton from "../CtaButton";

export default function LegacyWrapper({ pizzerias }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on server for legacy components
  }

  return (
    <>
      {/* Legacy components for backward compatibility */}
      {pizzerias && pizzerias.length > 0 && (
        <div className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <ArrayWithPlaces placesData={pizzerias} />
          </div>
        </div>
      )}

      <AdvertiseYourself />
      <CtaButton />
    </>
  );
}
