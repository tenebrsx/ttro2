import { useState } from "react";

export interface CustomerPhoto {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  customerName: string;
  customerAvatar?: string;
  customerLocation?: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  dessertTags: string[];
  rating?: number;
  isVerified: boolean;
  socialPlatform?: "instagram" | "facebook" | "twitter" | "tiktok";
  socialHandle?: string;
  eventType?: string;
  orderNumber?: string;
}

export const useCustomerPhotoShowcase = () => {
  const [photos, setPhotos] = useState<CustomerPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPhotos = async (limit: number = 20) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockPhotos: CustomerPhoto[] = Array.from(
        { length: limit },
        (_, i) => ({
          id: `photo-${Date.now()}-${i}`,
          imageUrl: `https://images.pexels.com/photos/${1126359 + i}/pexels-photo-${1126359 + i}.jpeg?auto=compress&cs=tinysrgb&w=800`,
          thumbnailUrl: `https://images.pexels.com/photos/${1126359 + i}/pexels-photo-${1126359 + i}.jpeg?auto=compress&cs=tinysrgb&w=300`,
          customerName: [
            "María González",
            "Ana Rodríguez",
            "Carmen Martínez",
            "Isabel Pérez",
            "Lucía Fernández",
          ][i % 5],
          customerAvatar: `https://images.pexels.com/photos/${1130626 + i}/pexels-photo-${1130626 + i}.jpeg?auto=compress&cs=tinysrgb&w=100`,
          customerLocation: "Santo Domingo, RD",
          rating: Math.floor(Math.random() * 2) + 4,
          caption: [
            "¡Absolutamente delicioso! Superó mis expectativas.",
            "Perfectos para mi celebración, todos quedaron encantados.",
            "La calidad y sabor son increíbles. Muy recomendado.",
          ][i % 3],
          likes: Math.floor(Math.random() * 50) + 10,
          comments: Math.floor(Math.random() * 15) + 5,
          shares: Math.floor(Math.random() * 10),
          timestamp: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
          ),
          dessertTags: [
            ["tarta", "chocolate"],
            ["macaron", "vainilla"],
            ["cupcake", "fresa"],
          ][i % 3],
          isVerified: Math.random() > 0.8,
          socialPlatform: ["instagram", "facebook", "twitter"][i % 3] as
            | "instagram"
            | "facebook"
            | "twitter",
          socialHandle: `user${i + 1}`,
          eventType: ["Cumpleaños", "Boda", "Aniversario"][i % 3],
          orderNumber: `ORD-${1000 + i}`,
        }),
      );

      setPhotos((prev) => [...prev, ...mockPhotos]);
      setHasMore(mockPhotos.length === limit);
    } catch (_error) {
      console.error("Error loading photos:", _error);
    } finally {
      setLoading(false);
    }
  };

  const submitPhoto = async (photo: FormData) => {
    try {
      // Simulate API call to submit user photo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real implementation, this would upload to your backend
      console.log("Photo submitted:", photo);

      // Refresh photos after submission
      setPhotos([]);
      await loadPhotos();
    } catch (error) {
      console.error("Error submitting photo:", error);
      throw error;
    }
  };

  const refreshPhotos = async () => {
    setPhotos([]);
    setHasMore(true);
    await loadPhotos();
  };

  return {
    photos,
    loading,
    hasMore,
    loadPhotos,
    submitPhoto,
    refreshPhotos,
  };
};
