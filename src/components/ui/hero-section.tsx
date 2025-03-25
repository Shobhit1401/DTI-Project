
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  backgroundClass?: string;
  children?: ReactNode;
  className?: string;
}

const HeroSection = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
  backgroundOverlay = true,
  backgroundClass,
  children,
  className,
}: HeroSectionProps) => {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
      style={{
        minHeight: "calc(100vh - 4rem)",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background color or overlay */}
      {backgroundOverlay && !backgroundImage && (
        <div
          className={cn(
            "absolute inset-0 bg-dairy-400",
            backgroundClass
          )}
        ></div>
      )}
      
      {/* Image overlay */}
      {backgroundImage && backgroundOverlay && (
        <div className="absolute inset-0 bg-black/40"></div>
      )}

      <div className="container relative z-10 px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl animate-fade-in">
          {title}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 md:text-xl animate-fade-in animation-delay-200">
          {subtitle}
        </p>
        
        {buttonText && buttonLink && (
          <Link
            to={buttonLink}
            className="button-animation inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-medium text-dairy-600 shadow-md transition-colors hover:bg-gray-100 animate-fade-in animation-delay-300"
          >
            {buttonText}
          </Link>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
