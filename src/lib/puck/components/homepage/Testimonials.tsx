import { ComponentConfig } from "@measured/puck";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export interface TestimonialsProps {
  // Content
  sectionTitle: string;
  sectionSubtitle: string;
  showTitle: boolean;
  
  // Display Mode
  displayMode: "grid" | "carousel";
  layout: "card" | "quote" | "minimal";
  
  // Grid Settings
  columns: number;
  maxTestimonials: number;
  
  // Carousel Settings (Swiper)
  slidesPerView: number;
  slidesPerViewTablet: number;
  slidesPerViewMobile: number;
  spaceBetween: number;
  autoplay: boolean;
  autoplayDelay: number;
  loop: boolean;
  navigation: boolean;
  pagination: boolean;
  effect: "slide" | "fade";
  
  // Display Options
  showAvatar: boolean;
  showName: boolean;
  showRole: boolean;
  showRating: boolean;
  showDate: boolean;
  
  // Styling
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  accentColor: string;
  borderRadius: "none" | "sm" | "md" | "lg" | "xl";
}

export const Testimonials: ComponentConfig<TestimonialsProps> = {
  label: "Testimonials",
  
  fields: {
    // Section Header
    sectionTitle: {
      type: "text",
      label: "Section Title",
    },
    sectionSubtitle: {
      type: "text",
      label: "Section Subtitle",
    },
    showTitle: {
      type: "radio",
      label: "Show Section Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Display Mode
    displayMode: {
      type: "select",
      label: "Display Mode",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel (Swiper)", value: "carousel" },
      ],
    },
    layout: {
      type: "select",
      label: "Testimonial Layout",
      options: [
        { label: "Card", value: "card" },
        { label: "Quote", value: "quote" },
        { label: "Minimal", value: "minimal" },
      ],
    },
    
    // Grid Settings
    columns: {
      type: "number",
      label: "Columns (Grid)",
      min: 1,
      max: 4,
    },
    maxTestimonials: {
      type: "number",
      label: "Maximum Testimonials",
      min: 1,
      max: 20,
    },
    
    // Carousel Settings
    slidesPerView: {
      type: "number",
      label: "Slides Per View (Desktop)",
      min: 1,
      max: 3,
    },
    slidesPerViewTablet: {
      type: "number",
      label: "Slides Per View (Tablet)",
      min: 1,
      max: 2,
    },
    slidesPerViewMobile: {
      type: "number",
      label: "Slides Per View (Mobile)",
      min: 1,
      max: 1,
    },
    spaceBetween: {
      type: "number",
      label: "Space Between Slides (px)",
      min: 0,
      max: 100,
    },
    autoplay: {
      type: "radio",
      label: "Auto-play Carousel",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    autoplayDelay: {
      type: "number",
      label: "Auto-play Delay (ms)",
      min: 2000,
      max: 10000,
    },
    loop: {
      type: "radio",
      label: "Loop Carousel",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    navigation: {
      type: "radio",
      label: "Show Navigation Arrows",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    pagination: {
      type: "radio",
      label: "Show Pagination",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    effect: {
      type: "select",
      label: "Transition Effect",
      options: [
        { label: "Slide", value: "slide" },
        { label: "Fade", value: "fade" },
      ],
    },
    
    // Display Options
    showAvatar: {
      type: "radio",
      label: "Show Avatar",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showName: {
      type: "radio",
      label: "Show Customer Name",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showRole: {
      type: "radio",
      label: "Show Role/Company",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showRating: {
      type: "radio",
      label: "Show Star Rating",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showDate: {
      type: "radio",
      label: "Show Date",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Styling
    backgroundColor: {
      type: "text",
      label: "Background Color (hex)",
    },
    textColor: {
      type: "text",
      label: "Text Color (hex)",
    },
    cardBackground: {
      type: "text",
      label: "Card Background (hex)",
    },
    accentColor: {
      type: "text",
      label: "Accent Color (hex)",
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
  },
  
  defaultProps: {
    sectionTitle: "What Our Customers Say",
    sectionSubtitle: "Real reviews from real customers",
    showTitle: true,
    displayMode: "carousel",
    layout: "card",
    columns: 3,
    maxTestimonials: 6,
    slidesPerView: 2,
    slidesPerViewTablet: 1,
    slidesPerViewMobile: 1,
    spaceBetween: 32,
    autoplay: true,
    autoplayDelay: 5000,
    loop: true,
    navigation: true,
    pagination: true,
    effect: "slide",
    showAvatar: true,
    showName: true,
    showRole: true,
    showRating: true,
    showDate: false,
    backgroundColor: "#f9fafb",
    textColor: "#000000",
    cardBackground: "#ffffff",
    accentColor: "#3b82f6",
    borderRadius: "lg",
  },
  
  render: (props) => {
    // Mock testimonials
    const mockTestimonials = [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Fashion Designer",
        avatar: "https://i.pravatar.cc/150?img=1",
        rating: 5,
        date: "2 days ago",
        text: "Absolutely love the quality and fast shipping! The products exceeded my expectations. Will definitely order again.",
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Tech Entrepreneur",
        avatar: "https://i.pravatar.cc/150?img=2",
        rating: 5,
        date: "1 week ago",
        text: "Best customer service I've ever experienced. They went above and beyond to make sure I was satisfied with my purchase.",
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        role: "Marketing Manager",
        avatar: "https://i.pravatar.cc/150?img=3",
        rating: 4,
        date: "2 weeks ago",
        text: "Great selection of products and very user-friendly website. The checkout process was smooth and hassle-free.",
      },
      {
        id: 4,
        name: "James Wilson",
        role: "Software Developer",
        avatar: "https://i.pravatar.cc/150?img=4",
        rating: 5,
        date: "3 weeks ago",
        text: "I'm impressed by the attention to detail and quality. The packaging was beautiful too!",
      },
    ].slice(0, props.maxTestimonials);
    
    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };
    
    const renderStars = (rating: number) => {
      return (
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
        </div>
      );
    };
    
    const renderTestimonial = (testimonial: any) => (
      <div
        key={testimonial.id}
        className={`testimonial-card p-6 ${radiusClasses[props.borderRadius] || 'rounded-lg'} shadow-lg`}
        style={{ backgroundColor: props.cardBackground }}
      >
        {/* Rating */}
        {props.showRating && (
          <div className="mb-4">
            {renderStars(testimonial.rating)}
          </div>
        )}
        
        {/* Quote Icon for Quote Layout */}
        {props.layout === "quote" && (
          <div className="text-6xl mb-4" style={{ color: props.accentColor, opacity: 0.2 }}>
            "
          </div>
        )}
        
        {/* Testimonial Text */}
        <p className="text-lg mb-6 italic" style={{ color: props.textColor }}>
          "{testimonial.text}"
        </p>
        
        {/* Author Info */}
        <div className="flex items-center gap-4">
          {props.showAvatar && (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            {props.showName && (
              <p className="font-bold" style={{ color: props.textColor }}>
                {testimonial.name}
              </p>
            )}
            {props.showRole && (
              <p className="text-sm opacity-70" style={{ color: props.textColor }}>
                {testimonial.role}
              </p>
            )}
            {props.showDate && (
              <p className="text-xs opacity-50 mt-1" style={{ color: props.textColor }}>
                {testimonial.date}
              </p>
            )}
          </div>
        </div>
      </div>
    );
    
    return (
      <div
        className="testimonials-section py-16"
        style={{ backgroundColor: props.backgroundColor }}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          {props.showTitle && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-2" style={{ color: props.textColor }}>
                {props.sectionTitle}
              </h2>
              {props.sectionSubtitle && (
                <p className="text-lg opacity-80" style={{ color: props.textColor }}>
                  {props.sectionSubtitle}
                </p>
              )}
            </div>
          )}
          
          {/* Testimonials Display */}
          {props.displayMode === "grid" ? (
            // Grid Layout
            <div
              className="grid gap-8"
              style={{
                gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
              }}
            >
              {mockTestimonials.map(renderTestimonial)}
            </div>
          ) : (
            // Carousel Layout with Swiper
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              slidesPerView={props.slidesPerViewMobile}
              spaceBetween={props.spaceBetween}
              navigation={props.navigation}
              pagination={props.pagination ? { clickable: true } : false}
              autoplay={
                props.autoplay
                  ? {
                      delay: props.autoplayDelay,
                      disableOnInteraction: false,
                    }
                  : false
              }
              loop={props.loop}
              effect={props.effect}
              breakpoints={{
                640: {
                  slidesPerView: props.slidesPerViewTablet,
                },
                1024: {
                  slidesPerView: props.slidesPerView,
                },
              }}
              className="testimonials-swiper"
            >
              {mockTestimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  {renderTestimonial(testimonial)}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    );
  },
};

export default Testimonials;
