"use client";
import { useState, useEffect } from "react";
import PopupHeader from "./PopupHeader";
import PopupContent from "./PopupContent";
import PopupActions from "./PopupActions";

export default function PizzaPlacePopup({ place, isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup Content */}
      <div className={`relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        {/* Header with image */}
        <PopupHeader place={place} onClose={onClose} />
        
        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          <PopupContent place={place} />
        </div>
        
        {/* Actions */}
        <PopupActions place={place} />
      </div>
    </div>
  );
} 