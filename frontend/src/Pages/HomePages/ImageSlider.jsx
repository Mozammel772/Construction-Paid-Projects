// import { useRef, useState } from "react";
// import { BsArrowsMove } from "react-icons/bs";
// import { FaArrowRight } from "react-icons/fa";
// import after1 from "../../../public/After1.jpg";
// import after2 from "../../../public/After2.jpg";
// import before1 from "../../../public/Before1.jpg";
// import before2 from "../../../public/Before2.jpg";
// import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

// const ImageSlider = () => {
//   const containerRef = useRef(null);
//   const [sliderPos, setSliderPos] = useState(50);
//   const [isDragging, setIsDragging] = useState(false);
//   const [pairIndex, setPairIndex] = useState(0);

//   const imagePairs = [
//     { before: before1, after: after1 },
//     { before: before2, after: after2 },
//   ];

//   const handleMove = (e) => {
//     if (!isDragging || !containerRef.current) return;
//     const bounds = containerRef.current.getBoundingClientRect();
//     const clientX = e.clientX ?? e.touches?.[0]?.clientX;
//     const x = clientX - bounds.left;
//     const percentage = (x / bounds.width) * 100;
//     setSliderPos(Math.max(0, Math.min(100, percentage)));
//   };

//   const nextSlide = () => {
//     setPairIndex((prev) => (prev + 1) % imagePairs.length);
//     setSliderPos(50); // Reset
//   };

//   const { before, after } = imagePairs[pairIndex];

//   return (
//     <div>
//       <TittleAnimation tittle="travaux antérieurs" subtittle="antérieurs" />

//       <div className="flex flex-col items-center gap-4 py-6 bg-white">
//         <div
//           ref={containerRef}
//           className="relative w-full max-w-7xl mx-auto overflow-hidden aspect-video rounded-lg shadow-lg select-none touch-none h-[200px] md:h-[400px] lg:h-[600px]"
//           onMouseMove={handleMove}
//           onMouseUp={() => setIsDragging(false)}
//           onMouseLeave={() => setIsDragging(false)}
//           onTouchMove={handleMove}
//           onTouchEnd={() => setIsDragging(false)}
//         >
//           {/* After Image */}
//           <img
//             src={after}
//             alt="After"
//             className="absolute top-0 left-0 w-full h-full object-cover"
//             draggable={false}
//           />

//           {/* Before Image using clip-path */}
//           <img
//             src={before}
//             alt="Before"
//             className="absolute top-0 left-0 w-full h-full object-cover z-10"
//             style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
//             draggable={false}
//           />

//           {/* Divider Line */}
//           <div
//             className="absolute top-0 h-full w-0.5 md:w-1 bg-orange-600 z-20"
//             style={{ left: `${sliderPos}%` }}
//           />

//           {/* Drag Handle */}
//           <div
//             className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
//             style={{ left: `${sliderPos}%` }}
//           >
//             <div
//               onMouseDown={() => setIsDragging(true)}
//               onTouchStart={() => setIsDragging(true)}
//               className="w-16 h-16 rounded-full bg-white shadow-2xl border-4 border-orange-600 flex items-center justify-center cursor-grab hover:scale-105 active:scale-95 transition"
//             >
//               <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
//                 <BsArrowsMove className="text-white text-2xl" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Pagination + Next Button */}
//         <div className="relative w-full mt-4">
//           {/* Pagination */}
//           <div className="flex justify-center">
//             <div className="flex gap-2">
//               {imagePairs.map((_, i) => (
//                 <span
//                   key={i}
//                   className={`w-3 h-3 rounded-full transition ${
//                     i === pairIndex ? "bg-orange-500 scale-110" : "bg-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Next Button */}
//           <div className="absolute right-0 top-1/2 -translate-y-1/2">
//             <button
//               onClick={nextSlide}
//               className="bg-white border border-orange-500 hover:bg-orange-500 hover:text-white py-2 px-6 rounded-md shadow-md transition text-sm sm:text-base"
//             >
//               <FaArrowRight size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;
import { useEffect, useRef, useState } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ImageSlider = () => {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [pairIndex, setPairIndex] = useState(0);
  const [imagePairs, setImagePairs] = useState([]);

  const axiosPublic = useAxiosPublic();

  // 🔥 backend থেকে image গুলো লোড করব
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axiosPublic.get("/beforeafterimage");
        if (res.data && res.data.length > 0) {
          // backend থেকে আসা before/after image গুলোকে pair বানাই
          const pairs = res.data.map((item) => ({
            before: item.beforeImage,
            after: item.afterImage,
          }));
          setImagePairs(pairs);
        }
      } catch (error) {
        console.error("Failed to fetch before/after images", error);
      }
    };

    fetchImages();
  }, [axiosPublic]);

  const handleMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const x = clientX - bounds.left;
    const percentage = (x / bounds.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, percentage)));
  };

  const nextSlide = () => {
    setPairIndex((prev) => (prev + 1) % imagePairs.length);
    setSliderPos(50); // Reset middle
  };

  if (imagePairs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Loading before/after images...
      </div>
    );
  }

  const { before, after } = imagePairs[pairIndex];

  return (
    <div>
      <TittleAnimation tittle="travaux antérieurs" subtittle="antérieurs" />

      <div className="flex flex-col items-center gap-4 py-6 bg-white">
        <div
          ref={containerRef}
          className="relative w-full max-w-7xl mx-auto overflow-hidden aspect-video rounded-lg shadow-lg select-none touch-none h-[200px] md:h-[400px] lg:h-[600px]"
          onMouseMove={handleMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchMove={handleMove}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* After Image */}
          <img
            src={after}
            alt="After"
            className="absolute top-0 left-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* Before Image */}
          <img
            src={before}
            alt="Before"
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            draggable={false}
          />

          {/* Divider Line */}
          <div
            className="absolute top-0 h-full w-0.5 md:w-1 bg-orange-600 z-20"
            style={{ left: `${sliderPos}%` }}
          />

          {/* Drag Handle */}
          <div
            className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${sliderPos}%` }}
          >
            <div
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              className="w-16 h-16 rounded-full bg-white shadow-2xl border-4 border-orange-600 flex items-center justify-center cursor-grab hover:scale-105 active:scale-95 transition"
            >
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <BsArrowsMove className="text-white text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination + Next Button */}
        <div className="relative w-full mt-4">
          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              {imagePairs.map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full transition ${
                    i === pairIndex ? "bg-orange-500 scale-110" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button
              onClick={nextSlide}
              className="bg-white border border-orange-500 hover:bg-orange-500 hover:text-white py-2 px-6 rounded-md shadow-md transition text-sm sm:text-base"
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
