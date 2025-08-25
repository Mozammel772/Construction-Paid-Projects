// import banner from "../../../public/Banner2.jpg";
// const Banner = () => {
//   return (
//     <div className="my-5">
//       <div
//         className="hero min-h-[50vh] rounded-xl"
//         style={{
//           backgroundImage: `url(${banner})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="hero-overlay bg-black bg-opacity-60 rounded-xl"></div>
//         <div className="hero-content text-neutral-content justify-start w-full px-10">
//           <div>
//             <h1 className="text-3xl md:text-5xl font-bold leading-tight ">
//               Ravalement & rénovation <br /> de qualité pour votre tranquillité
//             </h1>
//             <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md text-lg font-semibold">
//               Demander un devis
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
import { useEffect, useState } from "react";
import banner from "../../../public/Banner2.jpg";

const Banner = () => {
  const [loading, setLoading] = useState(false);

  // Calendly script load
  useEffect(() => {
    const head = document.querySelector("head");

    // Widget JS
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    head.appendChild(script);

    // Widget CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    head.appendChild(link);

    // Custom CSS for orange highlights inside Calendly popup
    const style = document.createElement("style");
    style.innerHTML = `
      .calendly-popup .calendly-day.available {
        background-color: #f16541 !important;
        border-color: #f16541 !important;
      }
      .calendly-popup .calendly-day.available:hover {
        background-color: #ff7a50 !important;
      }
    `;
    head.appendChild(style);

    return () => {
      head.removeChild(script);
      head.removeChild(link);
      head.removeChild(style);
    };
  }, []);

  // Click handler
  const handleCalendlyClick = () => {
    setLoading(true);
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/amdecorenovation-fr/30min?hide_gdpr_banner=1&text_color=afb0b1&primary_color=f16541",
    });

    // Close loader after 1 second (popup opens instantly)
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="my-5">
      <div
        className="hero min-h-[70vh] rounded-xl"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60 rounded-xl"></div>
        <div className="hero-content text-neutral-content justify-start w-full px-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
              Ravalement & rénovation <br /> de qualité pour votre tranquillité
            </h1>
            <button
              onClick={handleCalendlyClick}
              disabled={loading}
              className={`mt-10 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Chargement..." : "Demander un devis"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
