import { FC } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  alt?: string;
}

const Logo: FC<LogoProps> = ({
  className = "",
  size = "md",
  alt = "Cucina Logo",
}) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logo-new.png"
        alt={alt}
        className={`${sizeClasses[size]} w-auto object-contain`}
        onError={(e) => {
          // Fallback to text logo if image fails to load
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
      <div className="hidden flex-col items-start">
        <span className="text-xl font-academy text-cocoa-500 cucina-logo tracking-academy">
          cucina
        </span>
        <span className="text-sm font-bodoni text-sage-500 cucina-tagline -mt-1">
          homemade goods
        </span>
      </div>
    </div>
  );
};

export default Logo;
