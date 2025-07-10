export interface CustomerReview {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  customerLocation: string;
  productId?: string;
  orderNumber?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  featured: boolean;
  helpful: number;
  platform: 'website' | 'instagram' | 'facebook' | 'google' | 'whatsapp';
  orderType: 'cumpleanos' | 'boda' | 'aniversario' | 'corporativo' | 'baby-shower' | 'graduacion' | 'otro';
  createdAt: Date;
  updatedAt: Date;
  response?: {
    message: string;
    respondedAt: Date;
    respondedBy: string;
  };
}

export interface CustomerTestimonial {
  id: string;
  customerName: string;
  customerAvatar?: string;
  customerTitle?: string;
  customerLocation: string;
  testimonial: string;
  rating: number;
  eventType: string;
  productOrdered: string;
  images?: string[];
  videoUrl?: string;
  featured: boolean;
  platform: 'website' | 'instagram' | 'facebook' | 'google' | 'whatsapp';
  createdAt: Date;
  tags: string[];
}

export interface BusinessMetrics {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalOrders: number;
  satisfactionRate: number;
  responseTime: string;
  returningCustomers: number;
  yearsInBusiness: number;
}

// Sample Customer Reviews
export const customerReviews: CustomerReview[] = [
  {
    id: 'review-001',
    customerId: 'customer-001',
    customerName: 'María González',
    customerAvatar: '/images/customers/maria-g.jpg',
    customerLocation: 'Santo Domingo, RD',
    productId: 'tarta-chocolate-premium',
    orderNumber: 'CNC-2024-001',
    rating: 5,
    title: 'Increíble atención y sabor',
    comment: 'Increíble atención y sabor! Hice el pedido para el cumpleaños de mi hija y quedó perfecto. La tarta de chocolate estaba deliciosa y la decoración superó mis expectativas. Definitivamente volveré a pedir!',
    images: [
      '/images/reviews/maria-g-1.jpg',
      '/images/reviews/maria-g-2.jpg'
    ],
    verified: true,
    featured: true,
    helpful: 24,
    platform: 'whatsapp',
    orderType: 'cumpleanos',
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-10-15'),
    response: {
      message: '¡Muchas gracias María! Fue un placer crear algo especial para el cumpleaños de tu hija. Nos alegra saber que todo estuvo perfecto. ¡Esperamos verte pronto!',
      respondedAt: new Date('2024-10-16'),
      respondedBy: 'Rosa - Cucinanostrard'
    }
  },
  {
    id: 'review-002',
    customerId: 'customer-002',
    customerName: 'Carlos Ramírez',
    customerAvatar: '/images/customers/carlos-r.jpg',
    customerLocation: 'Santiago, RD',
    productId: 'macarons-franceses-clasicos',
    orderNumber: 'CNC-2024-002',
    rating: 5,
    title: 'Los macarons más ricos que he probado',
    comment: 'Los macarons más ricos que he probado en la ciudad. Pedí una caja para mi aniversario y mi esposa quedó encantada. La calidad es excelente y el servicio muy profesional.',
    verified: true,
    featured: true,
    helpful: 18,
    platform: 'instagram',
    orderType: 'aniversario',
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-09-20'),
    response: {
      message: '¡Qué alegría Carlos! Los aniversarios merecen los mejores detalles. Gracias por confiar en nosotros para tu momento especial. ¡Feliz aniversario!',
      respondedAt: new Date('2024-09-21'),
      respondedBy: 'Rosa - Cucinanostrard'
    }
  },
  {
    id: 'review-003',
    customerId: 'customer-003',
    customerName: 'Ana Sofía López',
    customerAvatar: '/images/customers/ana-s.jpg',
    customerLocation: 'La Romana, RD',
    productId: 'cupcakes-tematicos-cumpleanos',
    orderNumber: 'CNC-2024-003',
    rating: 5,
    title: 'Excelente servicio desde el primer contacto',
    comment: 'Excelente servicio desde el primer contacto por WhatsApp. Me ayudaron a elegir el postre perfecto para el evento corporativo. Todos los invitados preguntaron quién había hecho los cupcakes!',
    verified: true,
    featured: true,
    helpful: 32,
    platform: 'whatsapp',
    orderType: 'corporativo',
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-11-05'),
    response: {
      message: 'Ana Sofía, ¡qué felicidad! Los eventos corporativos son especiales para nosotros. Nos encanta ser parte del éxito de tu empresa. ¡Gracias por elegirnos!',
      respondedAt: new Date('2024-11-06'),
      respondedBy: 'Rosa - Cucinanostrard'
    }
  },
  {
    id: 'review-004',
    customerId: 'customer-004',
    customerName: 'Roberto Mendoza',
    customerAvatar: '/images/customers/roberto-m.jpg',
    customerLocation: 'Puerto Plata, RD',
    productId: 'tiramisu-individual-premium',
    orderNumber: 'CNC-2024-004',
    rating: 5,
    title: 'La mejor repostería de la zona',
    comment: 'La mejor repostería de la zona! He pedido varias veces y siempre superan mis expectativas. Los ingredientes se sienten frescos y la presentación es impecable. Muy recomendado!',
    verified: true,
    featured: false,
    helpful: 15,
    platform: 'google',
    orderType: 'otro',
    createdAt: new Date('2024-08-12'),
    updatedAt: new Date('2024-08-12'),
    response: {
      message: 'Roberto, eres un cliente muy especial para nosotros. Tu fidelidad nos motiva a seguir mejorando cada día. ¡Mil gracias por tu confianza!',
      respondedAt: new Date('2024-08-13'),
      respondedBy: 'Rosa - Cucinanostrard'
    }
  },
  {
    id: 'review-005',
    customerId: 'customer-005',
    customerName: 'Patricia Jiménez',
    customerAvatar: '/images/customers/patricia-j.jpg',
    customerLocation: 'San Pedro de Macorís, RD',
    productId: 'galletas-decoradas-boda',
    orderNumber: 'CNC-2024-005',
    rating: 5,
    title: 'Perfectas para nuestra boda',
    comment: 'Las galletas para nuestra boda estuvieron perfectas! Cada una era una obra de arte y los invitados no paraban de comentar lo hermosas que estaban. Rosa entendió exactamente lo que queríamos.',
    images: [
      '/images/reviews/patricia-j-1.jpg',
      '/images/reviews/patricia-j-2.jpg',
      '/images/reviews/patricia-j-3.jpg'
    ],
    verified: true,
    featured: true,
    helpful: 28,
    platform: 'instagram',
    orderType: 'boda',
    createdAt: new Date('2024-07-22'),
    updatedAt: new Date('2024-07-22'),
    response: {
      message: 'Patricia, ¡qué honor haber sido parte de tu día especial! Las bodas son mágicas y nos encanta contribuir a esa magia. ¡Felicidades y mucha felicidad!',
      respondedAt: new Date('2024-07-23'),
      respondedBy: 'Rosa - Cucinanostrard'
    }
  },
  {
    id: 'review-006',
    customerId: 'customer-006',
    customerName: 'José Miguel Torres',
    customerAvatar: '/images/customers/jose-m.jpg',
    customerLocation: 'Baní, RD',
    productId: 'tarta-red-velvet-temporada',
    orderNumber: 'CNC-2024-006',
    rating: 4,
    title: 'Muy buena calidad',
    comment: 'Muy buena calidad y presentación. La Red Velvet estaba deliciosa, aunque me hubiera gustado un poco más de cream cheese frosting. En general, muy satisfecho con el servicio.',
    verified: true,
    featured: false,
    helpful: 12,
    platform: 'facebook',
    orderType: 'cumpleanos',
    createdAt: new Date('2024-09-03'),
    updatedAt: new Date('2024-09-03'),
    response: {
      message: 'José Miguel, gracias por tu feedback constructivo. Tomaremos en cuenta tu sugerencia sobre el frosting. ¡Nos encanta mejorar con cada pedido!',
      respondedAt: new Date('2024-09-04'),
      respondedBy: 'Rosa - Cucinanostrard'
    }
  }
];

// Featured Testimonials
export const customerTestimonials: CustomerTestimonial[] = [
  {
    id: 'testimonial-001',
    customerName: 'María González',
    customerAvatar: '/images/customers/maria-g.jpg',
    customerTitle: 'Cumpleañera',
    customerLocation: 'Santo Domingo, RD',
    testimonial: 'Increíble atención y sabor! Hice el pedido para el cumpleaños de mi hija y quedó perfecto. La tarta de chocolate estaba deliciosa y la decoración superó mis expectativas. Definitivamente volveré a pedir!',
    rating: 5,
    eventType: 'Cumpleaños Infantil',
    productOrdered: 'Tarta de Chocolate Premium',
    images: [
      '/images/testimonials/maria-g-event.jpg'
    ],
    featured: true,
    platform: 'whatsapp',
    createdAt: new Date('2024-10-15'),
    tags: ['Foto del cliente', 'Evento', 'Quinta vez']
  },
  {
    id: 'testimonial-002',
    customerName: 'Carlos Ramírez',
    customerAvatar: '/images/customers/carlos-r.jpg',
    customerTitle: 'Aniversario',
    customerLocation: 'Santiago, RD',
    testimonial: 'Los macarons más ricos que he probado en la ciudad. Pedí una caja para mi aniversario y mi esposa quedó encantada. La calidad es excelente y el servicio muy profesional.',
    rating: 5,
    eventType: 'Aniversario de Bodas',
    productOrdered: 'Macarons Franceses Clásicos',
    featured: true,
    platform: 'instagram',
    createdAt: new Date('2024-09-20'),
    tags: ['Foto del cliente', 'Cliente habitual']
  },
  {
    id: 'testimonial-003',
    customerName: 'Ana Sofía López',
    customerAvatar: '/images/customers/ana-s.jpg',
    customerTitle: 'Eventos Corporativos',
    customerLocation: 'La Romana, RD',
    testimonial: 'Excelente servicio desde el primer contacto por WhatsApp. Me ayudaron a elegir el postre perfecto para el evento corporativo. Todos los invitados preguntaron quién había hecho los cupcakes!',
    rating: 5,
    eventType: 'Evento Corporativo',
    productOrdered: 'Cupcakes Temáticos',
    featured: true,
    platform: 'whatsapp',
    createdAt: new Date('2024-11-05'),
    tags: ['Pedidos Regulares']
  },
  {
    id: 'testimonial-004',
    customerName: 'Roberto Mendoza',
    customerAvatar: '/images/customers/roberto-m.jpg',
    customerTitle: 'Cliente Regular',
    customerLocation: 'Puerto Plata, RD',
    testimonial: 'La mejor repostería de la zona! He pedido varias veces y siempre superan mis expectativas. Los ingredientes se sienten frescos y la presentación es impecable. Muy recomendado!',
    rating: 5,
    eventType: 'Pedidos Regulares',
    productOrdered: 'Tiramisú Individual Premium',
    featured: true,
    platform: 'google',
    createdAt: new Date('2024-08-12'),
    tags: ['Reseña Regular']
  }
];

// Business Metrics
export const businessMetrics: BusinessMetrics = {
  totalReviews: 500,
  averageRating: 4.9,
  ratingDistribution: {
    5: 445,
    4: 42,
    3: 10,
    2: 2,
    1: 1
  },
  totalOrders: 1200,
  satisfactionRate: 98,
  responseTime: '< 30min',
  returningCustomers: 78,
  yearsInBusiness: 8
};

// Utility functions
export const getFeaturedReviews = (): CustomerReview[] => {
  return customerReviews.filter(review => review.featured);
};

export const getReviewsByRating = (rating: number): CustomerReview[] => {
  return customerReviews.filter(review => review.rating === rating);
};

export const getReviewsByProduct = (productId: string): CustomerReview[] => {
  return customerReviews.filter(review => review.productId === productId);
};

export const getReviewsByPlatform = (platform: string): CustomerReview[] => {
  return customerReviews.filter(review => review.platform === platform);
};

export const getReviewsByOrderType = (orderType: string): CustomerReview[] => {
  return customerReviews.filter(review => review.orderType === orderType);
};

export const getVerifiedReviews = (): CustomerReview[] => {
  return customerReviews.filter(review => review.verified);
};

export const getFeaturedTestimonials = (): CustomerTestimonial[] => {
  return customerTestimonials.filter(testimonial => testimonial.featured);
};

export const getTestimonialsByEventType = (eventType: string): CustomerTestimonial[] => {
  return customerTestimonials.filter(testimonial =>
    testimonial.eventType.toLowerCase().includes(eventType.toLowerCase())
  );
};

export const getRecentReviews = (limit: number = 5): CustomerReview[] => {
  return customerReviews
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

export const getTopRatedReviews = (limit: number = 10): CustomerReview[] => {
  return customerReviews
    .filter(review => review.rating === 5)
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, limit);
};

export const getReviewsWithImages = (): CustomerReview[] => {
  return customerReviews.filter(review => review.images && review.images.length > 0);
};

export const calculateAverageRating = (): number => {
  if (customerReviews.length === 0) return 0;
  const totalRating = customerReviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / customerReviews.length) * 10) / 10;
};

export const getRatingDistribution = () => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  customerReviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++;
  });
  return distribution;
};

export const getReviewStats = () => {
  const total = customerReviews.length;
  const verified = getVerifiedReviews().length;
  const withImages = getReviewsWithImages().length;
  const withResponse = customerReviews.filter(review => review.response).length;

  return {
    total,
    verified,
    withImages,
    withResponse,
    verificationRate: Math.round((verified / total) * 100),
    responseRate: Math.round((withResponse / total) * 100),
    averageHelpful: Math.round(
      customerReviews.reduce((sum, review) => sum + review.helpful, 0) / total
    )
  };
};
