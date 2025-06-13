import { motion } from "framer-motion";

const ResourcesTittle = ({ tittle, subTittle }) => {
  const fullTitle = `${tittle} ${subTittle}`;

  // Font size based on fullTitle length
  const getFontSize = () => {
    const length = fullTitle.length;
    if (length < 15) return "text-3xl";
    if (length < 30) return "text-2xl";
    return "text-xl";
  };

  return (
    <motion.div
      className="relative mb-10 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1
        className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-red-400 whitespace-nowrap ${getFontSize()} md:text-3xl lg:text-4xl`}
      >
        {tittle}{" "}
        <motion.span
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400"
        >
          {subTittle}
        </motion.span>
      </h1>

      <motion.div
        className="w-full my-5 rounded-full "
        style={{
          height: "2px",
          backgroundImage:
            "radial-gradient(circle at center, rgba(22,163,74,1) 0%, rgba(234,88,12,0.8) 25%, rgba(234,88,12,0.4) 45%, transparent 70%)",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default ResourcesTittle;
