import { ComponentConfig } from "@measured/puck";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { StarIcon } from '@heroicons/react/20/solid';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export interface TestimonialCarouselProps {
  // Layout
  layout: "card" | "quote" | "minimal";
  cardsPerView: number;
  cardsPerViewTablet: number;
  cardsPerViewMobile: number;
  
  // Swiper Effect
  effect: "slide" | "fade";
  
  // Navigation
  showNavigation: boolean;
  navigationColor: string;
  
  // Pagination
  showPagination: boolean;
  paginationType: "bullets" | "fraction";
  paginationColor: string;
  
  // Autoplay
  enableAutoplay: boolean;
  autoplayDelay: number;
  pauseOnHover: boolean;
  
  // Behavior
  loop: boolean;
  spaceBetween: number;
  centeredSlides: boolean;
  
  // Content
  showAvatar: boolean;
  showRating: boolean;
  showRole: boolean;
  
  // Styling
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  accentColor: string;
  borderRadius: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  cardShadow: "none" | "sm" | "md" | "lg" | "xl";
  
  // Spacing
  paddingY: number;
  paddingX: number;
}

const MOCK_TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "Absolutely love this product! The quality exceeded my expectations and shipping was super fast. Will definitely be ordering again!",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Happy Customer",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    text: "Best purchase I've made this year. The customer service was exceptional and the product quality is outstanding.",
  },
  {
    id: "3",
    name: "Emma Williams",
    role: "Repeat Customer",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 4,
    text: "Great product at a reasonable price. Highly recommend to anyone looking for quality and value.",
  },
  {
    id: "4",
    name: "David Martinez",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    text: "Five stars! The attention to detail and craftsmanship is evident in every aspect of this product.",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    role: "Satisfied Customer",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "I was skeptical at first, but this product has completely changed my mind. Worth every penny!",
  },
];

export const TestimonialCarousel: ComponentConfig<TestimonialCarouselProps> = {
  label: "Testimonial Carousel (Swiper)",
  
  fields: {
    // Layout
    layout: {
      type: "select",
      label: "Layout Style",
      options: [
        { label: "Card", value: "card" },
        { label: "Quote", value: "quote" },
        { label: "Minimal", value: "minimal" },
      ],
    },
    cardsPerView: {
      type: "number",
      label: "Cards Per View (Desktop)",
      min: 1,
      max: 4,
    },
    cardsPerViewTablet: {
      type: "number",
      label: "Cards Per View (Tablet)",
      min: 1,
      max: 3,
    },
    cardsPerViewMobile: {
      type: "number",
      label: "Cards Per View (Mobile)",
      min: 1,
      max: 2,
    },
    
    // Swiper Effect
    effect: {
      type: "select",
      label: "Transition Effect",
      options: [
        { label: "Slide", value: "slide" },
        { label: "Fade", value: "fade" },
      ],
    },
    
    // Navigation
    showNavigation: {
      type: "radio",
      label: "Show Navigation Arrows",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    navigationColor: {
      type: "text",
      label: "Navigation Color (hex)",
    },
    
    // Pagination
    showPagination: {
      type: "radio",
      label: "Show Pagination",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    paginationType: {
      type: "select",
      label: "Pagination Type",
      options: [
        { label: "Bullets", value: "bullets" },
        { label: "Fraction", value: "fraction" },
      ],
    },
    paginationColor: {
      type: "text",
      label: "Pagination Color (hex)",
    },
    
    // Autoplay
    enableAutoplay: {
      type: "radio",
      label: "Enable Autoplay",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    autoplayDelay: {
      type: "number",
      label: "Autoplay Delay (ms)",
      min: 1000,
      max: 10000,
    },
    pauseOnHover: {
      type: "radio",
      label: "Pause on Hover",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Behavior
    loop: {
      type: "radio",
      label: "Loop",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    spaceBetween: {
      type: "number",
      label: "Space Between Cards (px)",
      min: 0,
      max: 50,
    },
    centeredSlides: {
      type: "radio",
      label: "Centered Slides",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Content
    showAvatar: {
      type: "radio",
      label: "Show Avatar",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showRating: {
      type: "radio",
      label: "Show Rating",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showRole: {
      type: "radio",
      label: "Show Role/Title",
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
    cardBackground: {
      type: "text",
      label: "Card Background Color (hex)",
    },
    textColor: {
      type: "text",
      label: "Text Color (hex)",
    },
    accentColor: {
      type: "text",
      label: "Accent Color (ratings/quotes)",
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
        { label: "2XL", value: "2xl" },
      ],
    },
    cardShadow: {
      type: "select",
      label: "Card Shadow",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    
    // Spacing
    paddingY: {
      type: "number",
      label: "Padding Top/Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingX: {
      type: "number",
      label: "Padding Left/Right (px)",
      min: 0,
      max: 200,
    },
  },
  
  defaultProps: {
    layout: "card",
    cardsPerView: 3,
    cardsPerViewTablet: 2,
    cardsPerViewMobile: 1,
    effect: "slide",
    showNavigation: true,
    navigationColor: "#1f2937",
    showPagination: true,
    paginationType: "bullets",
    paginationColor: "#3b82f6",
    enableAutoplay: true,
    autoplayDelay: 5000,
    pauseOnHover: true,
    loop: true,
    spaceBetween: 24,
    centeredSlides: false,
    showAvatar: true,
    showRating: true,
    showRole: true,
    backgroundColor: "#f9fafb",
    cardBackground: "#ffffff",
    textColor: "#1f2937",
    accentColor: "#f59e0b",
    borderRadius: "lg",
    cardShadow: "md",
    paddingY: 80,
    paddingX: 20,
  },
  
  render: (props) => {
    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
    };
    
    const shadowClasses = {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };
    
    const renderStars = (rating: number) => {
      return (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className="w-5 h-5"
              style={{ color: star <= rating ? props.accentColor : "#d1d5db" }}
            />
          ))}
        </div>
      );
    };
    
    const renderTestimonial = (testimonial: typeof MOCK_TESTIMONIALS[0]) => {
      if (props.layout === "card") {
        return (
          <div
            className={`testimonial-card p-6 h-full flex flex-col ${radiusClasses[props.borderRadius]} ${shadowClasses[props.cardShadow]}`}
            style={{
              backgroundColor: props.cardBackground,
              color: props.textColor,
            }}
          >
            {props.showRating && (
              <div className="mb-4">{renderStars(testimonial.rating)}</div>
            )}
            
            <p className="text-base mb-6 flex-1 leading-relaxed">
              "{testimonial.text}"
            </p>
            
            <div className="flex items-center gap-3">
              {props.showAvatar && (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                {props.showRole && (
                  <div className="text-sm opacity-70">{testimonial.role}</div>
                )}
              </div>
            </div>
          </div>
        );
      }
      
      if (props.layout === "quote") {
        return (
          <div
            className={`testimonial-quote p-8 h-full flex flex-col ${radiusClasses[props.borderRadius]} ${shadowClasses[props.cardShadow]} border-l-4`}
            style={{
              backgroundColor: props.cardBackground,
              color: props.textColor,
              borderLeftColor: props.accentColor,
            }}
          >
            <svg
              className="w-10 h-10 mb-4 opacity-30"
              fill={props.accentColor}
              viewBox="0 0 24 24"
            >
              <path d="M6.5 10c-1.5 0-2.5 1-2.5 2.5S5 15 6.5 15 9 14 9 12.5 8 10 6.5 10zm11 0c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5 2.5-1 2.5-2.5-1-2.5-2.5-2.5z" />
            </svg>
            
            <p className="text-lg mb-6 flex-1 leading-relaxed italic">
              {testimonial.text}
            </p>
            
            {props.showRating && (
              <div className="mb-4">{renderStars(testimonial.rating)}</div>
            )}
            
            <div className="flex items-center gap-3">
              {props.showAvatar && (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-bold text-lg">{testimonial.name}</div>
                {props.showRole && (
                  <div className="opacity-70">{testimonial.role}</div>
                )}
              </div>
            </div>
          </div>
        );
      }
      
      // Minimal layout
      return (
        <div
          className={`testimonial-minimal p-6 h-full flex flex-col text-center ${radiusClasses[props.borderRadius]}`}
          style={{
            backgroundColor: props.cardBackground,
            color: props.textColor,
          }}
        >
          {props.showAvatar && (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            />
          )}
          
          {props.showRating && (
            <div className="mb-4 flex justify-center">
              {renderStars(testimonial.rating)}
            </div>
          )}
          
          <p className="text-base mb-4 flex-1 leading-relaxed">
            "{testimonial.text}"
          </p>
          
          <div className="font-semibold">{testimonial.name}</div>
          {props.showRole && (
            <div className="text-sm opacity-70">{testimonial.role}</div>
          )}
        </div>
      );
    };
    
    return (
      <div
        className="testimonial-carousel"
        style={{
          backgroundColor: props.backgroundColor,
          paddingTop: `${props.paddingY}px`,
          paddingBottom: `${props.paddingY}px`,
          paddingLeft: `${props.paddingX}px`,
          paddingRight: `${props.paddingX}px`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            slidesPerView={props.cardsPerViewMobile}
            spaceBetween={props.spaceBetween}
            navigation={props.showNavigation}
            pagination={
              props.showPagination
                ? {
                    type: props.paginationType,
                    clickable: true,
                  }
                : false
            }
            effect={props.effect}
            autoplay={
              props.enableAutoplay
                ? {
                    delay: props.autoplayDelay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: props.pauseOnHover,
                  }
                : false
            }
            loop={props.loop}
            centeredSlides={props.centeredSlides}
            breakpoints={{
              640: {
                slidesPerView: props.cardsPerViewTablet,
              },
              1024: {
                slidesPerView: props.cardsPerView,
              },
            }}
            className={props.effect === "fade" ? "swiper-fade" : ""}
          >
            {MOCK_TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                {renderTestimonial(testimonial)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <style jsx>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: ${props.navigationColor} !important;
          }
          .swiper-pagination-bullet-active {
            background-color: ${props.paginationColor} !important;
          }
          .swiper-pagination-fraction {
            color: ${props.paginationColor};
          }
        `}</style>
      </div>
    );
  },
};

export default TestimonialCarousel;
