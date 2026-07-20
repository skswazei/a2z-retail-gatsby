import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TestimonialSlider = ({ testimonials, prevClass, nextClass }: { testimonials: Testimonial[]; prevClass: string; nextClass: string }) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={24}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      speed={800}
      navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      className="!py-4 !px-1"
      style={{ alignItems: "stretch" } as any}
    >
      {testimonials.map((t, i) => (
        <SwiperSlide key={i} style={{ height: "auto" }}>
          <div className="card-elevated h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4B36BF]/20">
            <p className="text-base font-medium text-foreground mb-6 flex-1">"{t.quote}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4B36BF] to-[#568EF5] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

interface Partner {
  src: string;
  alt: string;
}

export const PartnerSlider = ({ partners, onSwiper, prevClass, nextClass }: { partners: Partner[]; onSwiper?: (swiper: any) => void; prevClass?: string; nextClass?: string }) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      navigation={prevClass && nextClass ? { prevEl: `.${prevClass}`, nextEl: `.${nextClass}` } : undefined}
      spaceBetween={12}
      slidesPerView={2}
      // Scale logos per viewport. Without these, slidesPerView=3 forced the
      // slider wider than small screens and overflowed the page horizontally.
      breakpoints={{
        480: { slidesPerView: 2, spaceBetween: 24 },
        768: { slidesPerView: 3, spaceBetween: 32 },
      }}
      grabCursor={true}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      speed={800}
      onSwiper={onSwiper}
      // w-full + min-w-0 let it shrink inside the flex parent (flex items
      // default to min-width:auto, which is what pushed it past the viewport).
      className="!py-4 w-full min-w-0"
      style={{ maxWidth: "700px" }}
    >
      {partners.map((p) => (
        <SwiperSlide key={p.alt}>
          <div className="flex justify-center">
            {/* Fluid on mobile (w-full + max-w) so the logo fills its slide instead
                of leaving dead space; fixed sizes from sm+ keep the desktop look. */}
            <div className="relative aspect-square w-full max-w-[160px] p-2
              sm:w-[160px] sm:h-[160px] sm:max-w-none sm:p-5 md:w-[180px] md:h-[180px] xl:w-[200px] xl:h-[200px]
              bg-white
              transition-all duration-300 origin-center
              hover:scale-110 hover:z-10">
              <div className="w-full h-full relative flex items-center justify-center">
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-contain rounded-full overflow-hidden border border-border shadow-md transition-all duration-300"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
