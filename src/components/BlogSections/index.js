import Image from "next/image";
import { ptSans } from "../../app/layout";

// Hero Section Component
export function HeroSection({ title, subtitle, image, imageAlt, titleFont = "cocosharp-bold", subtitleFont = "ptSans-normal" }) {
  const getFontClass = (fontType) => {
    switch (fontType) {
      case "cocosharp-bold": return "font-cocosharp font-bold";
      case "cocosharp-light": return "font-cocosharp font-light";
      case "cocosharp-normal": return "font-cocosharp";
      case "ptSans-normal": return `${ptSans.className}`;
      case "ptSans-bold": return `${ptSans.className} font-bold`;
      default: return "font-cocosharp font-bold";
    }
  };

  return (
    <div className="mb-12 text-center">
      <h2 className={`text-3xl lg:text-4xl text-gray-800 mb-4 ${getFontClass(titleFont)}`}>
        {title}
      </h2>
      <p className={`text-xl text-gray-600 mb-8 ${getFontClass(subtitleFont)}`}>{subtitle}</p>
      {/* Placeholder for hero image */}
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">
          {/* <Image src={image} alt={imageAlt || title} width={800} height={400} className="rounded-lg" /> */}
          <p>Hero Image Placeholder: {imageAlt || title}</p>
        </div>
      </div>
    </div>
  );
}

// Text Section Component
export function TextSection({ content, className = "", fontType = "ptSans-normal", textSize = "text-lg", textColor = "text-gray-700" }) {
  const getFontClass = (fontType) => {
    switch (fontType) {
      case "cocosharp-bold": return "font-cocosharp font-bold";
      case "cocosharp-light": return "font-cocosharp font-light";
      case "cocosharp-normal": return "font-cocosharp";
      case "ptSans-normal": return `${ptSans.className}`;
      case "ptSans-bold": return `${ptSans.className} font-bold`;
      default: return `${ptSans.className}`;
    }
  };

  return (
    <div className={`mb-8 ${className}`}>
      <p className={`${textSize} leading-relaxed ${textColor} ${getFontClass(fontType)}`}>{content}</p>
    </div>
  );
}

// Image Section Component
export function ImageSection({ src, alt, caption, className = "" }) {
  return (
    <div className={`my-12 ${className}`}>
      {/* Placeholder for image */}
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <div className="text-gray-500">
          {/* <Image src={src} alt={alt} width={800} height={400} className="rounded-lg" /> */}
          <p>Image Placeholder: {alt}</p>
        </div>
      </div>
      {caption && (
        <p className="text-sm text-gray-500 text-center italic">{caption}</p>
      )}
    </div>
  );
}

// Quote Section Component
export function QuoteSection({ quote, author, className = "", quoteFont = "cocosharp-normal", authorFont = "ptSans-normal", backgroundColor = "bg-primary-50", borderColor = "border-primary-500" }) {
  const getFontClass = (fontType) => {
    switch (fontType) {
      case "cocosharp-bold": return "font-cocosharp font-bold";
      case "cocosharp-light": return "font-cocosharp font-light";
      case "cocosharp-normal": return "font-cocosharp";
      case "ptSans-normal": return `${ptSans.className}`;
      case "ptSans-bold": return `${ptSans.className} font-bold`;
      default: return `${ptSans.className}`;
    }
  };

  return (
    <div className={`my-12 p-8 ${backgroundColor} rounded-lg border-l-4 ${borderColor} ${className}`}>
      <blockquote className={`text-xl italic text-gray-700 mb-4 ${getFontClass(quoteFont)}`}>
        "{quote}"
      </blockquote>
      <cite className={`text-sm text-gray-600 ${getFontClass(authorFont)}`}>— {author}</cite>
    </div>
  );
}

// Ranking Section Component
export function RankingSection({ title, items, className = "", titleFont = "cocosharp-bold", itemFont = "ptSans-normal", showRating = true, showPosition = true, layout = "vertical" }) {
  const getFontClass = (fontType) => {
    switch (fontType) {
      case "cocosharp-bold": return "font-cocosharp font-bold";
      case "cocosharp-light": return "font-cocosharp font-light";
      case "cocosharp-normal": return "font-cocosharp";
      case "ptSans-normal": return `${ptSans.className}`;
      case "ptSans-bold": return `${ptSans.className} font-bold`;
      default: return `${ptSans.className}`;
    }
  };

  const renderItem = (item, index) => (
    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        {showPosition && (
          <span className="text-2xl font-bold text-primary-500">#{item.position}</span>
        )}
        {showRating && item.rating && (
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className={`text-sm text-gray-600 ${getFontClass(itemFont)}`}>{item.rating}</span>
          </div>
        )}
      </div>
      <h4 className={`text-xl font-semibold text-gray-800 mb-2 ${getFontClass(itemFont)}`}>{item.name}</h4>
      <p className={`text-gray-600 mb-2 ${getFontClass(itemFont)}`}>{item.description}</p>
      {item.address && <p className={`text-sm text-gray-500 ${getFontClass(itemFont)}`}>{item.address}</p>}
    </div>
  );

  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className={`text-2xl text-gray-800 mb-6 ${getFontClass(titleFont)}`}>{title}</h3>}
      <div className={layout === "horizontal" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
        {items.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
}

// Gallery Section Component
export function GallerySection({ images, title, className = "" }) {
  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
            <div className="text-gray-500">
              {/* <Image src={image.src} alt={image.alt} width={300} height={200} className="rounded-lg" /> */}
              <p>Gallery Image: {image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Video Section Component
export function VideoSection({ videoUrl, title, description, className = "" }) {
  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>}
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <div className="text-gray-500">
          {/* Video player would go here */}
          <p>Video Placeholder: {videoUrl}</p>
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-500 text-center">{description}</p>
      )}
    </div>
  );
}

// Call to Action Section Component
export function CTASection({ title, description, buttonText, buttonLink, className = "" }) {
  return (
    <div className={`my-12 p-8 bg-primary-500 rounded-lg text-center ${className}`}>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/90 mb-6">{description}</p>
      <a
        href={buttonLink}
        className="inline-block bg-white text-primary-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
      >
        {buttonText}
      </a>
    </div>
  );
}

// Info Box Section Component
export function InfoBoxSection({ title, content, type = "info", className = "" }) {
  const bgColor = type === "warning" ? "bg-yellow-50 border-yellow-500" : 
                  type === "error" ? "bg-red-50 border-red-500" : 
                  "bg-blue-50 border-blue-500";
  
  return (
    <div className={`my-8 p-6 rounded-lg border-l-4 ${bgColor} ${className}`}>
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}

// Step by Step Section Component
export function StepByStepSection({ title, steps, className = "" }) {
  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-gray-700">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Comparison Table Section Component
export function ComparisonTableSection({ title, headers, rows, className = "" }) {
  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {headers.map((header, index) => (
                <th key={index} className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-gray-200 px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// FAQ Section Component
export function FAQSection({ title, questions, className = "" }) {
  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>}
      <div className="space-y-4">
        {questions.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-800">{faq.question}</h4>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Testimonial Section Component
export function TestimonialSection({ testimonials, title, className = "", titleFont = "cocosharp-bold", layout = "grid", showAvatar = true, showRating = true }) {
  const getFontClass = (fontType) => {
    switch (fontType) {
      case "cocosharp-bold": return "font-cocosharp font-bold";
      case "cocosharp-light": return "font-cocosharp font-light";
      case "cocosharp-normal": return "font-cocosharp";
      case "ptSans-normal": return `${ptSans.className}`;
      case "ptSans-bold": return `${ptSans.className} font-bold`;
      default: return `${ptSans.className}`;
    }
  };

  const renderTestimonial = (testimonial, index) => (
    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        {showAvatar && (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <span className="text-gray-500 font-semibold">
              {testimonial.author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className={`font-semibold text-gray-800 ${getFontClass("ptSans-bold")}`}>{testimonial.author}</h4>
          <p className={`text-sm text-gray-500 ${getFontClass("ptSans-normal")}`}>{testimonial.position}</p>
        </div>
      </div>
      <p className={`text-gray-700 italic ${getFontClass("cocosharp-normal")}`}>"{testimonial.quote}"</p>
      {showRating && testimonial.rating && (
        <div className="flex items-center mt-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className={`text-2xl text-gray-800 mb-6 ${getFontClass(titleFont)}`}>{title}</h3>}
      <div className={layout === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
        {testimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
      </div>
    </div>
  );
}

// New Flexible Section Types

// Card Section Component
export function CardSection({ cards, title, className = "", titleFont = "cocosharp-bold", layout = "grid", cardStyle = "default" }) {
  const getFontClass = (fontType) => {
    switch (fontType) {
      case "cocosharp-bold": return "font-cocosharp font-bold";
      case "cocosharp-light": return "font-cocosharp font-light";
      case "cocosharp-normal": return "font-cocosharp";
      case "ptSans-normal": return `${ptSans.className}`;
      case "ptSans-bold": return `${ptSans.className} font-bold`;
      default: return `${ptSans.className}`;
    }
  };

  const getCardStyle = (style) => {
    switch (style) {
      case "glass": return "bg-white/80 backdrop-blur-sm border border-white/20";
      case "gradient": return "bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200";
      case "dark": return "bg-gray-800 text-white border border-gray-700";
      default: return "bg-white border border-gray-200";
    }
  };

  const renderCard = (card, index) => (
    <div key={index} className={`rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow ${getCardStyle(cardStyle)}`}>
      {card.icon && (
        <div className="text-3xl mb-4 text-primary-500">{card.icon}</div>
      )}
      <h4 className={`text-xl font-semibold mb-3 ${getFontClass("cocosharp-bold")}`}>{card.title}</h4>
      <p className={`text-gray-600 ${getFontClass("ptSans-normal")}`}>{card.content}</p>
      {card.link && (
        <a href={card.link} className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-semibold">
          Więcej →
        </a>
      )}
    </div>
  );

  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className={`text-2xl text-gray-800 mb-6 ${getFontClass(titleFont)}`}>{title}</h3>}
      <div className={layout === "horizontal" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {cards.map((card, index) => renderCard(card, index))}
      </div>
    </div>
  );
}

// Timeline Section Component
export function TimelineSection({ events, title, className = "", titleFont = "cocosharp-bold" }) {
  const getFontClass = (fontType) => {
    switch (fontType) {
      case "cocosharp-bold": return "font-cocosharp font-bold";
      case "cocosharp-light": return "font-cocosharp font-light";
      case "cocosharp-normal": return "font-cocosharp";
      case "ptSans-normal": return `${ptSans.className}`;
      case "ptSans-bold": return `${ptSans.className} font-bold`;
      default: return `${ptSans.className}`;
    }
  };

  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className={`text-2xl text-gray-800 mb-6 ${getFontClass(titleFont)}`}>{title}</h3>}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"></div>
              
              <div className="ml-16 bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-lg font-semibold text-gray-800 ${getFontClass("cocosharp-bold")}`}>
                    {event.title}
                  </h4>
                  <span className={`text-sm text-gray-500 ${getFontClass("ptSans-normal")}`}>
                    {event.date}
                  </span>
                </div>
                <p className={`text-gray-600 ${getFontClass("ptSans-normal")}`}>
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stats Section Component
export function StatsSection({ stats, title, className = "", titleFont = "cocosharp-bold", layout = "grid" }) {
  const getFontClass = (fontType) => {
    switch (fontType) {
      case "cocosharp-bold": return "font-cocosharp font-bold";
      case "cocosharp-light": return "font-cocosharp font-light";
      case "cocosharp-normal": return "font-cocosharp";
      case "ptSans-normal": return `${ptSans.className}`;
      case "ptSans-bold": return `${ptSans.className} font-bold`;
      default: return `${ptSans.className}`;
    }
  };

  return (
    <div className={`my-12 ${className}`}>
      {title && <h3 className={`text-2xl text-gray-800 mb-6 ${getFontClass(titleFont)}`}>{title}</h3>}
      <div className={layout === "horizontal" ? "grid grid-cols-2 md:grid-cols-4 gap-6" : "space-y-4"}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div className={`text-4xl font-bold text-primary-600 mb-2 ${getFontClass("cocosharp-bold")}`}>
              {stat.value}
            </div>
            <div className={`text-gray-600 ${getFontClass("ptSans-normal")}`}>
              {stat.label}
            </div>
            {stat.description && (
              <div className={`text-sm text-gray-500 mt-2 ${getFontClass("ptSans-normal")}`}>
                {stat.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Default export for all components
export default {
  HeroSection,
  TextSection,
  ImageSection,
  QuoteSection,
  RankingSection,
  GallerySection,
  VideoSection,
  CTASection,
  InfoBoxSection,
  StepByStepSection,
  ComparisonTableSection,
  FAQSection,
  TestimonialSection,
  CardSection,
  TimelineSection,
  StatsSection
}; 