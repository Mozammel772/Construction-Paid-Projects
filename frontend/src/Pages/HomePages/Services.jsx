// import { motion } from "framer-motion";
// import Bathroom from "../../../public/Bathroom.jpg";
// import Flooring from "../../../public/Flooring.jpg";
// import Interior from "../../../public/Interior.jpg";
// import Painting from "../../../public/Painting.jpeg";
// import Plastering from "../../../public/Plastering.png";
// import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

// // Reusable Card Component
// const ServiceCard = ({ image, title, description }) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       className="relative bg-cover bg-center h-72 md:h-96 rounded-lg overflow-hidden"
//       style={{ backgroundImage: `url(${image})` }}
//     >
//       <div className="absolute inset-0 bg-black/60 md:opacity-0 hover:opacity-100 transition-opacity duration-500 text-white flex flex-col justify-center items-center p-6">
//         <h3 className="text-xl font-bold mb-2">{title}</h3>
//         <p className="text-sm text-center">{description}</p>
//         <button className="mt-4 text-sm uppercase px-5 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 rounded">
//           découvrir
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// const Services = () => {
//   return (
//     <div className="my-10">
//       <TittleAnimation tittle="Nos Services" subtittle="Services " />

//       {/* Responsive Grid with 4 Services */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
//         <ServiceCard
//           // Interior redesign
//           image={Interior}
//           title="Redesign intérieur (cloisons, solutions décoratives)"
//           description="Création et optimisation d’espaces intérieurs grâce à des cloisons modulables et des solutions décoratives innovantes pour un environnement harmonieux."
//         />
//         <ServiceCard
//           // Plastering
//           image={Plastering}
//           title="Plâtrage et isolation"
//           description="Travaux de plâtrage précis et solutions d’isolation thermique et phonique pour améliorer le confort et l’efficacité énergétique de votre habitat."
//         />
//         <ServiceCard
//           image={Flooring}
//           title="Revêtement de sol (carrelage, parquet)"
//           description="Pose professionnelle de carrelage et parquet de haute qualité, offrant résistance et élégance pour tous vos espaces intérieurs."
//         />
//         <ServiceCard
//           image={Bathroom}
//           title="Rénovation salle de bain et cuisine"
//           description="Rénovation complète et personnalisée de vos salles de bain et cuisines, alliant fonctionnalité moderne et design esthétique."
//         />
//         <ServiceCard
//           image={Painting}
//           title="Peinture (intérieur/extérieur)"
//           description="Des finitions soignées pour murs, plafonds et façades, avec des peintures durables et esthétiques adaptées à tous types de surfaces."
//         />
//       </div>
//     </div>
//   );
// };

// export default Services;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Utility function to truncate text to 50 words
const truncateText = (text, wordLimit = 50) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + " ...";
};

// Reusable Card Component
const ServiceCard = ({ image, title, description, buttonUrl }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative bg-cover bg-center h-72 md:h-96 rounded-lg overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/60 md:opacity-0 hover:opacity-100 transition-opacity duration-500 text-white flex flex-col justify-center items-center p-6">
        <h3 className="text-xl font-bold mb-2">{truncateText(title, 50)}</h3>
        <p className="text-sm text-center">{truncateText(description, 50)}</p>
        {buttonUrl && (
          <a
            href={buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm uppercase px-5 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 rounded"
          >
            découvrir
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Services = () => {
  const axiosPublic = useAxiosPublic();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosPublic.get("/imagetextslider"); // 🔥 Backend থেকে data আসবে
        setServices(res.data || []);
      } catch (err) {
        console.error("Failed to load services:", err);
      }
    };

    fetchServices();
  }, [axiosPublic]);

  return (
    <div className="my-10">
      <TittleAnimation tittle="Nos Services" subtittle="Services " />

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard
              key={service._id}
              image={service.image}
              title={service.title}
              description={service.description}
              buttonUrl={service.buttonUrl}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">
            Aucun service trouvé
          </p>
        )}
      </div>
    </div>
  );
};

export default Services;
