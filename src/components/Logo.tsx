import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  alt = "Cucinanostrard Logo",
}) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logo.svg"
        alt={alt}
        className={`${sizeClasses[size]} w-auto object-contain`}
        onError={(e) => {
          // Fallback to text logo if image fails to load
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
      <span className="hidden text-xl font-cormorant text-mocha group-hover:text-sage transition-colors duration-200">
        Cucinanostrard
      </span>
    </div>
  );
};

export default Logo;
