import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import banner from "../../../public/Banner2.jpg";

const TestimonialsSlider = () => {
  return (
    <section className="bg-orange-50 py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-700">
        Avis de nos clients
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="max-w-4xl mx-auto"
      >
        {/* Testimonial 1 */}
        <SwiperSlide>
          <div className="bg-white border-l-4 border-orange-400 shadow-md rounded-lg p-10 flex items-start gap-4 min-h-[200px] md:min-h-[250px]">
            <img
              src={banner}
              alt="Client"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-orange-600">Sophie M.</p>
              <div className="text-yellow-500 text-sm mb-2">★★★★☆</div>
              <p className="text-gray-700">
                Très bonne communication et réactivité. Je recommande sans
                hésitation ! Très bonne communication et réactivité Très bonne
                communication et réactivité Très bonne communication et
                réactivité
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonial 2 */}
        <SwiperSlide>
          <div className="bg-white border-l-4 border-orange-600 shadow-md rounded-lg p-10 flex items-start gap-4 min-h-[200px] md:min-h-[250px]">
            <img
              src={banner}
              alt="Client"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-orange-600">Vincent R.</p>
              <div className="text-yellow-500 text-sm mb-2">★★★★★</div>
              <p className="text-gray-700">
                Travail de qualité et équipe très professionnelle. Le résultat
                est impeccable !
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonial 3 */}
        <SwiperSlide>
          <div className="bg-white border-l-4 border-orange-800 shadow-md rounded-lg p-10 flex items-start gap-4 min-h-[200px] md:min-h-[250px]">
            <img
              src={banner}
              alt="Client"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-orange-600">Alex P.</p>
              <div className="text-yellow-500 text-sm mb-2">★★★★★</div>
              <p className="text-gray-700">
                Une équipe à l'écoute et un travail parfait. Merci pour tout !
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default TestimonialsSlider;
