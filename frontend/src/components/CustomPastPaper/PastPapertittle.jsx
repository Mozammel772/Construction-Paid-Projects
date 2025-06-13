import { motion } from "framer-motion";
import Lottie from "lottie-react";
import underline from "../../../lottie-animation/underline.json";

const PastPapertittle = ({ tittle, subTittle }) => {
  const fullTitle = `${tittle} ${subTittle}`;

  // Dynamically adjust font size based on full title length
  const getFontSize = () => {
    const length = fullTitle.length;
    if (length < 15) return "text-2xl";
    if (length < 25) return "text-2xl";
    if (length < 50) return "text-xl";
    return "text-xl"; // very long text
  };

  return (
    <div className="relative mb-10">
      <div className="inline-block relative">
        <h1
          className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-red-400 whitespace-nowrap ${getFontSize()} md:text-2xl lg:text-3xl`}
        >
          {tittle}{" "}
          <motion.span
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              type: "tween",
            }}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400"
          >
            {subTittle}
          </motion.span>
        </h1>

        {/* Underline Animation */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[420px] mx-auto">
          <Lottie animationData={underline} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default PastPapertittle;
