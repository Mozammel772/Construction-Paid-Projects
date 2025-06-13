import { motion } from "motion/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Home = () => {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className=" min-h-[70vh] w-full ">
        <div className=" flex items-center flex-col-reverse lg:flex-row gap-6">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 px-2 ">
            <motion.h1
              className="text-4xl font-bold text-green-600"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              The best teachers, the best guidance.
            </motion.h1>

            <motion.p
              className="py-4 text-lg lg:text-xl text-justify"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              A world painted in the rhythm of numbers, nature governed by the
              laws of forces and energy, and the mysterious dance of atoms and
              molecules — our sole path to great knowledge. May your journey
              shine bright with the light of the Science Trinity.
            </motion.p>
            <button className="btn bg-indigo-800 text-white px-6 py-4 rounded-md text-base">
              Start Course
            </button>
          </div>

          {/* Swiper Carousel Section */}
          <div className="w-full lg:w-1/2 rounded-lg shadow-xl overflow-hidden">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              modules={[Autoplay, Pagination]}
              className="mySwiper h-full"
            >
              <SwiperSlide>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                  alt="Slide 1"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                  alt="Slide 2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                  alt="Slide 3"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
