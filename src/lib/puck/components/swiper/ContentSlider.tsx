import { ComponentConfig } from "@measured/puck";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, EffectCube, EffectCoverflow, EffectFlip } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-flip';

interface ContentSlide {
  title: string;
  description: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  htmlContent: string;
}

export interface ContentSliderProps {
  // Slides
  slides: ContentSlide[];
  
  // Layout
  slideHeight: "sm" | "md" | "lg" | "xl" | "full";
  contentWidth: "full" | "contained";
  contentPosition: "left" | "center" | "right";
  
  // Swiper Effect
  effect: "slide" | "fade" | "cube" | "coverflow" | "flip";
  
  // Navigation
  showNavigation: boolean;
  navigationColor: string;
  navigationPosition: "center" | "bottom";
  
  // Pagination
  showPagination: boolean;
  paginationType: "bullets" | "fraction" | "progressbar";
  paginationColor: string;
  
  // Autoplay
  enableAutoplay: boolean;
  autoplayDelay: number;
  pauseOnHover: boolean;
  
  // Behavior
  loop: boolean;
  speed: number;
  
  // Overlay
  enableOverlay: boolean;
  overlayColor: string;
  overlayOpacity: number;
}

const MOCK_SLIDES: ContentSlide[] = [
  {
    title: "Welcome to Our Store",
    description: "Discover amazing products and unbeatable deals",
    backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    backgroundColor: "#1e293b",
    textColor: "#ffffff",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    buttonColor: "#3b82f6",
    htmlContent: "",
  },
  {
    title: "New Collection",
    description: "Fresh styles for the season",
    backgroundImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    backgroundColor: "#0f172a",
    textColor: "#ffffff",
    buttonText: "Explore",
    buttonLink: "/collection",
    buttonColor: "#8b5cf6",
    htmlContent: "",
  },
  {
    title: "Special Offer",
    description: "Up to 50% off selected items",
    backgroundImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
    backgroundColor: "#7c2d12",
    textColor: "#ffffff",
    buttonText: "Get Deal",
    buttonLink: "/sale",
    buttonColor: "#ef4444",
    htmlContent: "",
  },
];

export const ContentSlider: ComponentConfig<ContentSliderProps> = {
  label: "Content Slider (Swiper)",
  
  fields: {
    // Slides
    slides: {
      type: "array",
      label: "Slides",
      arrayFields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
        backgroundImage: { type: "text", label: "Background Image URL" },
        backgroundColor: { type: "text", label: "Background Color (hex)" },
        textColor: { type: "text", label: "Text Color (hex)" },
        buttonText: { type: "text", label: "Button Text" },
        buttonLink: { type: "text", label: "Button Link" },
        buttonColor: { type: "text", label: "Button Color (hex)" },
        htmlContent: { type: "textarea", label: "Custom HTML (optional)" },
      },
      defaultItemProps: {
        title: "New Slide",
        description: "Add your description here",
        backgroundImage: "",
        backgroundColor: "#1e293b",
        textColor: "#ffffff",
        buttonText: "Learn More",
        buttonLink: "#",
        buttonColor: "#3b82f6",
        htmlContent: "",
      },
    },
    
    // Layout
    slideHeight: {
      type: "select",
      label: "Slide Height",
      options: [
        { label: "Small (400px)", value: "sm" },
        { label: "Medium (500px)", value: "md" },
        { label: "Large (600px)", value: "lg" },
        { label: "Extra Large (700px)", value: "xl" },
        { label: "Full Screen", value: "full" },
      ],
    },
    contentWidth: {
      type: "select",
      label: "Content Width",
      options: [
        { label: "Full Width", value: "full" },
        { label: "Contained", value: "contained" },
      ],
    },
    contentPosition: {
      type: "select",
      label: "Content Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    
    // Swiper Effect
    effect: {
      type: "select",
      label: "Transition Effect",
      options: [
        { label: "Slide", value: "slide" },
        { label: "Fade", value: "fade" },
        { label: "Cube", value: "cube" },
        { label: "Coverflow", value: "coverflow" },
        { label: "Flip", value: "flip" },
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
    navigationPosition: {
      type: "select",
      label: "Navigation Position",
      options: [
        { label: "Center", value: "center" },
        { label: "Bottom", value: "bottom" },
      ],
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
        { label: "Fraction (1/5)", value: "fraction" },
        { label: "Progress Bar", value: "progressbar" },
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
    speed: {
      type: "number",
      label: "Transition Speed (ms)",
      min: 200,
      max: 2000,
    },
    
    // Overlay
    enableOverlay: {
      type: "radio",
      label: "Enable Image Overlay",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    overlayColor: {
      type: "text",
      label: "Overlay Color (hex)",
    },
    overlayOpacity: {
      type: "number",
      label: "Overlay Opacity (%)",
      min: 0,
      max: 100,
    },
  },
  
  defaultProps: {
    slides: MOCK_SLIDES,
    slideHeight: "lg",
    contentWidth: "contained",
    contentPosition: "center",
    effect: "fade",
    showNavigation: true,
    navigationColor: "#ffffff",
    navigationPosition: "center",
    showPagination: true,
    paginationType: "bullets",
    paginationColor: "#ffffff",
    enableAutoplay: true,
    autoplayDelay: 5000,
    pauseOnHover: true,
    loop: true,
    speed: 600,
    enableOverlay: true,
    overlayColor: "#000000",
    overlayOpacity: 40,
  },
  
  render: (props) => {
    const heightClasses = {
      sm: "h-[400px]",
      md: "h-[500px]",
      lg: "h-[600px]",
      xl: "h-[700px]",
      full: "h-screen",
    };
    
    const contentAlignClasses = {
      left: "items-start text-left",
      center: "items-center text-center",
      right: "items-end text-right",
    };
    
    return (
      <div className="content-slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade, EffectCube, EffectCoverflow, EffectFlip]}
          effect={props.effect}
          navigation={props.showNavigation}
          pagination={
            props.showPagination
              ? {
                  type: props.paginationType,
                  clickable: true,
                }
              : false
          }
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
          speed={props.speed}
          className={`${heightClasses[props.slideHeight]}`}
        >
          {props.slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="slide-content relative w-full h-full flex flex-col justify-center"
                style={{
                  backgroundColor: slide.backgroundColor,
                  backgroundImage: slide.backgroundImage
                    ? `url(${slide.backgroundImage})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                {props.enableOverlay && slide.backgroundImage && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: props.overlayColor,
                      opacity: props.overlayOpacity / 100,
                    }}
                  />
                )}
                
                {/* Content */}
                <div className={`relative z-10 ${props.contentWidth === "contained" ? "container mx-auto px-4" : "px-8"}`}>
                  <div className={`flex flex-col ${contentAlignClasses[props.contentPosition]} gap-6 max-w-2xl ${props.contentPosition === "center" ? "mx-auto" : ""}`}>
                    {slide.htmlContent ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: slide.htmlContent }}
                        style={{ color: slide.textColor }}
                      />
                    ) : (
                      <>
                        <h2
                          className="text-4xl md:text-5xl lg:text-6xl font-bold"
                          style={{ color: slide.textColor }}
                        >
                          {slide.title}
                        </h2>
                        
                        <p
                          className="text-lg md:text-xl lg:text-2xl"
                          style={{ color: slide.textColor }}
                        >
                          {slide.description}
                        </p>
                        
                        {slide.buttonText && (
                          <div>
                            <a
                              href={slide.buttonLink}
                              className="inline-block px-8 py-4 text-lg font-semibold rounded-lg transition-transform hover:scale-105"
                              style={{
                                backgroundColor: slide.buttonColor,
                                color: "#ffffff",
                              }}
                            >
                              {slide.buttonText}
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <style jsx>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: ${props.navigationColor} !important;
          }
          .swiper-pagination-bullet,
          .swiper-pagination-bullet-active {
            background-color: ${props.paginationColor} !important;
          }
          .swiper-pagination-fraction,
          .swiper-pagination-progressbar-fill {
            background-color: ${props.paginationColor} !important;
          }
        `}</style>
      </div>
    );
  },
};

export default ContentSlider;
