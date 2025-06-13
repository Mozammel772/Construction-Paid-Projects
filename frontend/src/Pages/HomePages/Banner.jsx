import banner from "../../../public/Banner2.jpg";
const Banner = () => {
  return (
    <div className="my-5">
      <div
        className="hero min-h-[50vh] rounded-xl"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60 rounded-xl"></div>
        <div className="hero-content text-neutral-content justify-start w-full px-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight ">
              Ravalement & rénovation <br /> de qualité pour votre tranquillité
            </h1>
            <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md text-lg font-semibold">
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
