import { ComponentConfig } from "@measured/puck";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export interface LogoCarouselProps {
  // Logos
  logoUrls: string;
  
  // Layout
  logosPerView: number;
  logosPerViewTablet: number;
  logosPerViewMobile: number;
  
  // Behavior
  enableAutoplay: boolean;
  autoplaySpeed: number;
  freeMode: boolean;
  loop: boolean;
  spaceBetween: number;
  
  // Styling
  grayscale: boolean;
  grayscaleHover: boolean;
  logoMaxHeight: number;
  backgroundColor: string;
  logoBackgroundColor: string;
  showBorder: boolean;
  borderColor: string;
  borderRadius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  
  // Spacing
  paddingY: number;
  paddingX: number;
}

const MOCK_LOGOS = [
  "https://via.placeholder.com/200x80?text=Brand+1",
  "https://via.placeholder.com/200x80?text=Brand+2",
  "https://via.placeholder.com/200x80?text=Brand+3",
  "https://via.placeholder.com/200x80?text=Brand+4",
  "https://via.placeholder.com/200x80?text=Brand+5",
  "https://via.placeholder.com/200x80?text=Brand+6",
  "https://via.placeholder.com/200x80?text=Brand+7",
  "https://via.placeholder.com/200x80?text=Brand+8",
];

export const LogoCarousel: ComponentConfig<LogoCarouselProps> = {
  label: "Logo Carousel (Swiper)",
  
  fields: {
    // Logos
    logoUrls: {
      type: "textarea",
      label: "Logo URLs (one per line)",
    },
    
    // Layout
    logosPerView: {
      type: "number",
      label: "Logos Per View (Desktop)",
      min: 2,
      max: 8,
    },
    logosPerViewTablet: {
      type: "number",
      label: "Logos Per View (Tablet)",
      min: 2,
      max: 6,
    },
    logosPerViewMobile: {
      type: "number",
      label: "Logos Per View (Mobile)",
      min: 1,
      max: 4,
    },
    
    // Behavior
    enableAutoplay: {
      type: "radio",
      label: "Enable Autoplay",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    autoplaySpeed: {
      type: "number",
      label: "Autoplay Speed (ms)",
      min: 500,
      max: 5000,
    },
    freeMode: {
      type: "radio",
      label: "Free Mode (smooth scroll)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    loop: {
      type: "radio",
      label: "Infinite Loop",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    spaceBetween: {
      type: "number",
      label: "Space Between Logos (px)",
      min: 0,
      max: 100,
    },
    
    // Styling
    grayscale: {
      type: "radio",
      label: "Grayscale Logos",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    grayscaleHover: {
      type: "radio",
      label: "Color on Hover",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    logoMaxHeight: {
      type: "number",
      label: "Logo Max Height (px)",
      min: 30,
      max: 200,
    },
    backgroundColor: {
      type: "text",
      label: "Section Background Color (hex)",
    },
    logoBackgroundColor: {
      type: "text",
      label: "Logo Background Color (hex)",
    },
    showBorder: {
      type: "radio",
      label: "Show Logo Border",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    borderColor: {
      type: "text",
      label: "Border Color (hex)",
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
        { label: "Full", value: "full" },
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
    logoUrls: MOCK_LOGOS.join('\n'),
    logosPerView: 6,
    logosPerViewTablet: 4,
    logosPerViewMobile: 2,
    enableAutoplay: true,
    autoplaySpeed: 2000,
    freeMode: true,
    loop: true,
    spaceBetween: 40,
    grayscale: true,
    grayscaleHover: true,
    logoMaxHeight: 60,
    backgroundColor: "#ffffff",
    logoBackgroundColor: "transparent",
    showBorder: false,
    borderColor: "#e5e5e5",
    borderRadius: "none",
    paddingY: 60,
    paddingX: 20,
  },
  
  render: (props) => {
    const logos = props.logoUrls
      .split('\n')
      .filter(url => url.trim())
      .map(url => url.trim());
    
    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    };
    
    return (
      <div
        className="logo-carousel"
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
            modules={[Autoplay, FreeMode]}
            slidesPerView={props.logosPerViewMobile}
            spaceBetween={props.spaceBetween}
            autoplay={
              props.enableAutoplay
                ? {
                    delay: props.autoplaySpeed,
                    disableOnInteraction: false,
                  }
                : false
            }
            freeMode={props.freeMode}
            loop={props.loop}
            breakpoints={{
              640: {
                slidesPerView: props.logosPerViewTablet,
              },
              1024: {
                slidesPerView: props.logosPerView,
              },
            }}
            className="logo-swiper"
          >
            {logos.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`logo-container flex items-center justify-center p-4 transition-all duration-300 ${
                    radiusClasses[props.borderRadius]
                  } ${props.showBorder ? "border-2" : ""} ${
                    props.grayscale ? "filter grayscale opacity-60" : ""
                  } ${props.grayscaleHover ? "hover:grayscale-0 hover:opacity-100" : ""}`}
                  style={{
                    backgroundColor: props.logoBackgroundColor,
                    borderColor: props.borderColor,
                    maxHeight: `${props.logoMaxHeight}px`,
                  }}
                >
                  <img
                    src={url}
                    alt={`Logo ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                    style={{
                      maxHeight: `${props.logoMaxHeight - 32}px`,
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <style jsx>{`
          .logo-container {
            cursor: pointer;
          }
          .swiper-slide {
            height: auto;
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    );
  },
};

export default LogoCarousel;
