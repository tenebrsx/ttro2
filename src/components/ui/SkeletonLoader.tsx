import React from "react";
import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  type?: "text" | "card" | "avatar" | "image" | "button" | "custom";
  count?: number;
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

const shimmerAnimation = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear",
  },
};

const pulseAnimation = {
  animate: {
    opacity: [0.6, 1, 0.6],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "text",
  count = 1,
  className = "",
  width = "w-full",
  height = "h-4",
  rounded = true,
}) => {
  const baseClasses = `bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${
    rounded ? "rounded" : ""
  }`;

  const shimmerClasses = `${baseClasses} bg-[length:200%_100%] animate-pulse`;

  const renderSkeleton = () => {
    switch (type) {
      case "text":
        return (
          <div className="space-y-2">
            {Array.from({ length: count }).map((_, index) => (
              <motion.div
                key={index}
                className={`${shimmerClasses} ${width} ${height} ${className}`}
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
                  backgroundSize: "200% 100%",
                }}
                {...shimmerAnimation}
              />
            ))}
          </div>
        );

      case "card":
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}
              >
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    className="w-12 h-12 bg-gray-200 rounded-full"
                    {...pulseAnimation}
                  />
                  <div className="flex-1 space-y-2">
                    <motion.div
                      className="h-4 bg-gray-200 rounded w-1/3"
                      {...pulseAnimation}
                    />
                    <motion.div
                      className="h-3 bg-gray-200 rounded w-1/4"
                      {...pulseAnimation}
                    />
                  </div>
                </div>

                {/* Image placeholder */}
                <motion.div
                  className="w-full h-48 bg-gray-200 rounded-lg mb-4"
                  {...pulseAnimation}
                />

                {/* Content lines */}
                <div className="space-y-2">
                  <motion.div
                    className="h-4 bg-gray-200 rounded w-full"
                    {...pulseAnimation}
                  />
                  <motion.div
                    className="h-4 bg-gray-200 rounded w-3/4"
                    {...pulseAnimation}
                  />
                  <motion.div
                    className="h-4 bg-gray-200 rounded w-1/2"
                    {...pulseAnimation}
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6">
                  <motion.div
                    className="h-8 bg-gray-200 rounded w-20"
                    {...pulseAnimation}
                  />
                  <motion.div
                    className="h-8 bg-gray-200 rounded w-24"
                    {...pulseAnimation}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "avatar":
        return (
          <div className="flex space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <motion.div
                key={index}
                className={`w-12 h-12 bg-gray-200 rounded-full ${className}`}
                {...pulseAnimation}
              />
            ))}
          </div>
        );

      case "image":
        return (
          <div
            className={`grid gap-4 ${count > 1 ? "grid-cols-2 md:grid-cols-3" : ""}`}
          >
            {Array.from({ length: count }).map((_, index) => (
              <motion.div
                key={index}
                className={`aspect-square bg-gray-200 rounded-lg ${className}`}
                {...pulseAnimation}
              />
            ))}
          </div>
        );

      case "button":
        return (
          <div className="flex space-x-3">
            {Array.from({ length: count }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-10 bg-gray-200 rounded-lg px-6 ${className}`}
                {...pulseAnimation}
              />
            ))}
          </div>
        );

      case "custom":
      default:
        return (
          <motion.div
            className={`${shimmerClasses} ${width} ${height} ${className}`}
            style={{
              backgroundImage:
                "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
              backgroundSize: "200% 100%",
            }}
            {...shimmerAnimation}
          />
        );
    }
  };

  return <div className="animate-pulse">{renderSkeleton()}</div>;
};

// Specialized skeleton components
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = "",
}) => <SkeletonLoader type="text" count={lines} className={className} />;

export const CardSkeleton: React.FC<{ count?: number; className?: string }> = ({
  count = 1,
  className = "",
}) => <SkeletonLoader type="card" count={count} className={className} />;

export const ImageSkeleton: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 1, className = "" }) => (
  <SkeletonLoader type="image" count={count} className={className} />
);

export const AvatarSkeleton: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 1, className = "" }) => (
  <SkeletonLoader type="avatar" count={count} className={className} />
);

export const ButtonSkeleton: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 1, className = "" }) => (
  <SkeletonLoader type="button" count={count} className={className} />
);

// Page-specific skeleton layouts
export const MenuPageSkeleton: React.FC = () => (
  <div className="max-w-6xl mx-auto p-6 space-y-8">
    {/* Header */}
    <div className="text-center space-y-4">
      <SkeletonLoader
        type="text"
        width="w-1/2"
        height="h-8"
        className="mx-auto"
      />
      <SkeletonLoader
        type="text"
        width="w-3/4"
        height="h-4"
        className="mx-auto"
      />
    </div>

    {/* Filter buttons */}
    <div className="flex justify-center space-x-4">
      <ButtonSkeleton count={5} />
    </div>

    {/* Menu items grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardSkeleton count={6} />
    </div>
  </div>
);

export const GalleryPageSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto p-6 space-y-8">
    {/* Header */}
    <div className="text-center space-y-4">
      <SkeletonLoader
        type="text"
        width="w-1/3"
        height="h-8"
        className="mx-auto"
      />
      <SkeletonLoader
        type="text"
        width="w-2/3"
        height="h-4"
        className="mx-auto"
      />
    </div>

    {/* Image grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ImageSkeleton count={9} />
    </div>
  </div>
);

export const ContactPageSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto p-6 space-y-8">
    {/* Header */}
    <div className="text-center space-y-4">
      <SkeletonLoader
        type="text"
        width="w-1/2"
        height="h-8"
        className="mx-auto"
      />
      <SkeletonLoader
        type="text"
        width="w-3/4"
        height="h-4"
        className="mx-auto"
      />
    </div>

    {/* Contact form */}
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <SkeletonLoader type="text" width="w-24" height="h-4" />
          <SkeletonLoader type="text" width="w-full" height="h-12" />
        </div>
      ))}
      <SkeletonLoader type="button" width="w-full" height="h-12" />
    </div>
  </div>
);

export default SkeletonLoader;
