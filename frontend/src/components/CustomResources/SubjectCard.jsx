import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Card will come from bottom to top
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

// Text will come from left to right
const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      delay: 0.3,
      ease: "easeInOut",
    },
  },
};

const SubjectCard = ({ title, path }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative border border-indigo-800 rounded-xl bg-gradient-to-br from-green-100/40 to-green-200/20 
        backdrop-blur-md hover:shadow-2xl hover:scale-[1.10] active:scale-[1.10] transition-all duration-300 ease-in-out
        text-green-900 px-8 py-12 flex flex-col items-center justify-center text-center gap-4
        shadow-md hover:backdrop-blur-lg hover:bg-opacity-50"
    >
      <motion.h3
        variants={titleVariants}
        className="text-xl md:text-2xl lg:text-2xl font-bold transition-all duration-300 
          group-hover:scale-50 group-hover:opacity-80"
      >
        {title}
      </motion.h3>

      <Link to={path}>
        <FaArrowRight
          size={36}
          className="text-white bg-indigo-900 rounded-full p-2 transition-all duration-300 transform
            group-hover:translate-x-2 group-hover:scale-125 group-hover:bg-indigo-900
            group-active:translate-x-2 group-active:scale-125 group-active:bg-green-900
            opacity-90"
        />
      </Link>
    </motion.div>
  );
};

export default SubjectCard;


