import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const instructors = [
  {
    name: "Dr. Alice Dupont",
    subject: "Mathematics",
    image: "https://i.ibb.co/4m4JtbG/teacher1.jpg",
    rating: 5,
    bio: "Expert in Calculus, Algebra, and Advanced Geometry. Passionate about helping students succeed.",
    experience: 12,
    email: "alice.dupont@example.com",
    totalCourses: 18,
  },
  {
    name: "Mr. Jean Michel",
    subject: "Physics",
    image: "https://i.ibb.co/Yc2vbBJ/teacher2.jpg",
    rating: 4,
    bio: "Energetic Physics teacher with a love for quantum theory and practical experiments.",
    experience: 8,
    email: "jean.michel@example.com",
    totalCourses: 10,
  },
  {
    name: "Ms. Léa Moreau",
    subject: "English Literature",
    image: "https://i.ibb.co/hZ70MLy/teacher3.jpg",
    rating: 5,
    bio: "Specialist in Shakespeare and modern literature, helping students find joy in reading",
    experience: 6,
    email: "lea.moreau@example.com",
    totalCourses: 15,
  },
  {
    name: "Ms. Léa Moreau",
    subject: "English Literature",
    image: "https://i.ibb.co/hZ70MLy/teacher3.jpg",
    rating: 5,
    bio: "Specialist in Shakespeare and modern literature, helping students find joy in reading",
    experience: 6,
    email: "lea.moreau@example.com",
    totalCourses: 15,
  },
];

const Instructors = () => {
  return (
    <section className="mb-20 px-4 py-12">
      <TittleAnimation
        tittle="Our Instructors"
        subtittle=" 🌟 Meet Our Expert Instructors"
      />
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}
        className="max-w-7xl mx-auto"
      >
        {instructors.map((ins, i) => (
          <SwiperSlide key={i}>
            <div className="h-full flex">
              <div className="bg-white/30 backdrop-blur-xl border border-orange-200 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-md w-full mx-auto flex flex-col">
                <div className="flex flex-col items-center text-center flex-grow">
                  <img
                    src={ins.image}
                    alt={ins.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-orange-700 mb-1">
                    {ins.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{ins.subject}</p>
                  <div className="text-yellow-500 text-sm mb-2">
                    {"★".repeat(ins.rating)}
                    {"☆".repeat(5 - ins.rating)}
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {ins.bio}
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 mb-4 text-left w-full px-4">
                    <li>
                      <strong>📚 Courses:</strong> {ins.totalCourses}+
                    </li>
                    <li>
                      <strong>🎓 Experience:</strong> {ins.experience} years
                    </li>
                    <li>
                      <strong>📧 Email:</strong>{" "}
                      <span className="text-orange-600">{ins.email}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Container */}
      <div className="custom-pagination mt-8 flex justify-center" />

      {/* Pagination styling */}
      <style>{`
        /* Default bullets */
        .custom-pagination .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background-color: #fbbf24; /* amber-400 */
          opacity: 0.6;
          margin: 0 6px !important;
          transition: background-color 0.3s, opacity 0.3s;
        }
        /* Active bullet */
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #ea580c; /* orange-600 */
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Instructors;
