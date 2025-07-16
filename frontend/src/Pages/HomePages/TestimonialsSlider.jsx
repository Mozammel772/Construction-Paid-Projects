// import "swiper/css";
// import "swiper/css/pagination";

// import { Autoplay, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import banner from "../../../public/Banner2.jpg";

// const TestimonialsSlider = () => {
//   return (
//     <section className="bg-orange-50 py-12 px-4">
//       <h2 className="text-3xl font-bold text-center mb-8 text-orange-700">
//         Avis de nos clients
//       </h2>

//       <Swiper
//         slidesPerView={1}
//         spaceBetween={20}
//         pagination={{ clickable: true }}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         modules={[Pagination, Autoplay]}
//         className="max-w-4xl mx-auto"
//       >
//         {/* Testimonial 1 */}
//         <SwiperSlide>
//           <div className="bg-white border-l-4 border-orange-400 shadow-md rounded-lg p-10 flex items-start gap-4 min-h-[200px] md:min-h-[250px]">
//             <img
//               src={banner}
//               alt="Client"
//               className="w-14 h-14 rounded-full object-cover"
//             />
//             <div>
//               <p className="font-semibold text-orange-600">Sophie M.</p>
//               <div className="text-yellow-500 text-sm mb-2">★★★★☆</div>
//               <p className="text-gray-700">
//                 Très bonne communication et réactivité. Je recommande sans
//                 hésitation ! Très bonne communication et réactivité Très bonne
//                 communication et réactivité Très bonne communication et
//                 réactivité
//               </p>
//             </div>
//           </div>
//         </SwiperSlide>

//         {/* Testimonial 2 */}
//         <SwiperSlide>
//           <div className="bg-white border-l-4 border-orange-600 shadow-md rounded-lg p-10 flex items-start gap-4 min-h-[200px] md:min-h-[250px]">
//             <img
//               src={banner}
//               alt="Client"
//               className="w-14 h-14 rounded-full object-cover"
//             />
//             <div>
//               <p className="font-semibold text-orange-600">Vincent R.</p>
//               <div className="text-yellow-500 text-sm mb-2">★★★★★</div>
//               <p className="text-gray-700">
//                 Travail de qualité et équipe très professionnelle. Le résultat
//                 est impeccable !
//               </p>
//             </div>
//           </div>
//         </SwiperSlide>

//         {/* Testimonial 3 */}
//         <SwiperSlide>
//           <div className="bg-white border-l-4 border-orange-800 shadow-md rounded-lg p-10 flex items-start gap-4 min-h-[200px] md:min-h-[250px]">
//             <img
//               src={banner}
//               alt="Client"
//               className="w-14 h-14 rounded-full object-cover"
//             />
//             <div>
//               <p className="font-semibold text-orange-600">Alex P.</p>
//               <div className="text-yellow-500 text-sm mb-2">★★★★★</div>
//               <p className="text-gray-700">
//                 Une équipe à l'écoute et un travail parfait. Merci pour tout !
//               </p>
//             </div>
//           </div>
//         </SwiperSlide>
//       </Swiper>
//     </section>
//   );
// };

// export default TestimonialsSlider;

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// import banner from "/Banner.jpg";

const Testimonial = () => {
  const banner =
    "https://static.vecteezy.com/system/resources/previews/028/885/619/large_2x/modern-banner-background-design-banner-template-with-dynamic-wave-shapes-free-vector.jpg";
  return (
    <div>
      <section className="bg-gray-100 py-12 px-4 rounded-md">
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
            <div className="bg-white border-l-4 border-indigo-600 shadow-md rounded-lg p-5 lg:p-10 flex flex-col gap-4 min-h-[450px]">
              <div className="flex items-start gap-4">
                <img
                  src={
                    banner ||
                    "https://static.vecteezy.com/system/resources/previews/028/885/619/large_2x/modern-banner-background-design-banner-template-with-dynamic-wave-shapes-free-vector.jpg"
                  }
                  alt="Client"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-indigo-600">Alex P.</p>
                  <div className="text-yellow-500 text-base">★★★★★</div>
                </div>
              </div>

              <p className="text-gray-700 text-justify">
                Très bonne communication et réactivité. Je recommande sans
                hésitation ! Très bonne communication et réactivité Très bonne
                communication et réactivité Très bonne communication et
                réactivité
              </p>
            </div>
          </SwiperSlide>

          {/* Testimonial 2 */}
          <SwiperSlide>
            <div className="bg-white border-l-4 border-blue-600 shadow-md rounded-lg p-8 lg:p-10 flex flex-col gap-4 min-h-[450px]">
              <div className="flex items-start gap-4">
                <img
                  src={banner}
                  alt="Client"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-blue-600">Alex P.</p>
                  <div className="text-yellow-500 text-base">★★★★★</div>
                </div>
              </div>

              <p className="text-gray-700 text-justify">
                Travail de qualité et équipe très professionnelle. Le résultat
                est impeccable !
              </p>
            </div>
          </SwiperSlide>

          {/* Testimonial 3 */}

          <SwiperSlide>
            <div className="bg-white border-l-4 border-orange-600 shadow-md rounded-lg p-8 lg:p-10 flex flex-col gap-4 min-h-[450px]">
              <div className="flex items-start gap-4">
                <img
                  src={banner}
                  alt="Client"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-orange-600">Alex P.</p>
                  <div className="text-yellow-500 text-base">★★★★★</div>
                </div>
              </div>

              <p className="text-gray-700 text-justify">
                Une équipe à l'écoute et un travail parfait. Merci pour tout !
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default Testimonial;
