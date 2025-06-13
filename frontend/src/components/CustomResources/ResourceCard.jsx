// import { Link } from "react-router-dom";

// const ResourceCard = ({ title, description, link }) => {
//   return (
//     <div
//       className="card w-full mx-auto mb-5 rounded-lg overflow-hidden border border-green-800
//         backdrop-blur-md bg-white/70
//         transition-all duration-300 ease-in-out
//         hover:shadow-2xl hover:scale-[1.10] hover:backdrop-blur-lg"
//     >
//       <figure
//         className="h-24 md:h-32 lg:h-40 flex items-center justify-center text-center px-4 py-8 md:px-8 md:py-14
//         bg-gradient-to-br from-green-100/40 to-green-200/20"
//       >
//         <h2 className="text-xl md:text-2xl lg:text-3xl text-green-900 font-bold text-center transition-transform duration-300 ease-in-out hover:scale-125 hover:text-green-500">
//           {title}
//         </h2>
//       </figure>

//       <div className="card-body text-gray-600 min-h-28 text-justify p-2 md:p-3 lg:p-4 bg-white">
//         <p>{description}</p>
//       </div>

//       <div className="w-full px-2 pb-4">
//         <Link
//           to={link}
//           className="w-full block text-center bg-green-900 text-white text-xs md:text-base lg:text-lg font-semibold py-2 rounded-md transition-all duration-300 hover:bg-green-600 shadow-md hover:shadow-lg"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Get Access
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ResourceCard;







import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ResourceCard = ({ title, description, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="card w-full mx-auto mb-2 rounded-lg overflow-hidden border border-indigo-800 
        backdrop-blur-md bg-white/70
        transition-all duration-300 ease-in-out
        hover:shadow-2xl hover:scale-[1.20] hover:backdrop-blur-lg"
    >
      <figure
        className="h-24 md:h-32 lg:h-40 flex items-center justify-center text-center px-4 py-8 md:px-8 md:py-14
        bg-gradient-to-br from-green-100/40 to-green-200/20"
      >
        <motion.h2
          whileHover={{ scale: 1.2, color: "#16a34a" }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-xl md:text-2xl lg:text-3xl text-green-900 font-bold text-center"
        >
          {title}
        </motion.h2>
      </figure>

      <div className="card-body text-gray-600 min-h-28 text-justify p-2 md:p-3 lg:p-4 bg-white">
        <p>{description}</p>
      </div>

      <div className="w-full px-2 pb-4">
        <Link
          to={link}
          className="w-full block text-center bg-indigo-900 text-white text-xs md:text-base lg:text-lg font-semibold py-2 rounded-md transition-all duration-300 hover:bg-indigo-600 shadow-md hover:shadow-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Access
        </Link>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
