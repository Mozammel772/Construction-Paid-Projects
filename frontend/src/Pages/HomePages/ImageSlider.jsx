import { useRef, useState } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import after1 from "../../../public/After1.jpg";
import after2 from "../../../public/After2.jpg";
import before1 from "../../../public/Before1.jpg";
import before2 from "../../../public/Before2.jpg";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const ImageSlider = () => {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [pairIndex, setPairIndex] = useState(0);

  const imagePairs = [
    { before: before1, after: after1 },
    { before: before2, after: after2 },
    // { before: image3, after: before1 },
  ];

  const handleMove = (e) => {
    if (!isDragging) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = (x / bounds.width) * 100;
    setSliderPos(Math.max(10, Math.min(90, percentage)));
  };

  const nextSlide = () => {
    setPairIndex((prev) => (prev + 1) % imagePairs.length);
    setSliderPos(50); // Reset slider
  };

  const { before, after } = imagePairs[pairIndex];

  return (
    <div>
      <div>
        <TittleAnimation tittle="travaux antérieurs" subtittle="antérieurs" />
      </div>
      <div className="flex flex-col items-center gap-4 py-6 bg-white">
        <div
          ref={containerRef}
          className="relative w-full max-w-7xl mx-auto h-[400px] overflow-hidden rounded-lg shadow-lg aspect-video"
          onMouseMove={handleMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            handleMove({ clientX: touch.clientX });
          }}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* After Image */}
          <img
            src={after}
            alt="After"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* Before Image */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={before}
              alt="Before"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Divider Line */}
          <div
            className="absolute top-0 h-full border-l-4 border-orange-800 z-20"
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
              className="w-16 h-16 rounded-full bg-white shadow-2xl border-4 border-orange-800 flex items-center justify-center cursor-grab hover:scale-105 active:scale-95 transition"
            >
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white font-extrabold">
                  <BsArrowsMove />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full mt-4">
          {/* Pagination Dots Center */}
          <div className="flex justify-center items-center">
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

          {/* Next Button Right */}
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
