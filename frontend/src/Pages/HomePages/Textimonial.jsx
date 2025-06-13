import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import banner from "../../../public/Banner.jpg";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const Testimonial = () => {
  return (
    <div>
      <TittleAnimation
        tittle=" Students Reviews"
        subtittle="Course Complete Students Reviews"
      />
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
            <div className="bg-white border-l-4 border-indigo-400 shadow-md rounded-lg p-10 flex flex-col justify-between gap-4 h-[400px]">
              <div className="flex items-start gap-4">
                <img
                  src={banner}
                  alt="Client"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-indigo-600">Sophie M.</p>
                  <div className="text-yellow-500 text-base mb-2">★★★★☆</div>
                  <p className="text-gray-700 text-justify">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Distinctio pariatur possimus dicta, suscipit quod
                    necessitatibus, tenetur iusto accusamus natus quos
                    consequatur minima et labore obcaecati? Sed labore quia
                    dolorem quo!
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial 2 */}
          <SwiperSlide>
            <div className="bg-white border-l-4 border-orange-600 shadow-md rounded-lg p-10 flex flex-col justify-between gap-4 h-[400px]">
              <div className="flex items-start gap-4">
                <img
                  src={banner}
                  alt="Client"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-orange-600">Vincent R.</p>
                  <div className="text-yellow-500 text-base mb-2">★★★★★</div>
                  <p className="text-gray-700 text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis, omnis ipsum ullam, consequatur dignissimos eaque
                    incidunt dolores numquam vero eum qui culpa error magni esse
                    vel, porro aspernatur praesentium tenetur.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial 3 */}
          <SwiperSlide>
            <div className="bg-white border-l-4 border-blue-400 shadow-md rounded-lg p-10 flex flex-col justify-between gap-4 h-[400px]">
              <div className="flex items-start gap-4">
                <img
                  src={banner}
                  alt="Client"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-blue-600">Alex P.</p>
                  <div className="text-yellow-500 text-base mb-2">★★★★★</div>
                  <p className="text-gray-700 text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis iste voluptas eveniet soluta iure harum assumenda
                    aliquid possimus nobis voluptatem accusamus sequi neque
                    facere dolorem commodi, mollitia ratione delectus quasi!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quam maxime unde eos, nisi repellat eligendi illo architecto
                    aliquam sint
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default Testimonial;
