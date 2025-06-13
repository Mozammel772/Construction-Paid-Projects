import { FaHardHat, FaShieldAlt, FaStopwatch } from "react-icons/fa";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const Exprience = () => {
  return (
    <div className="py-12 text-center">
      <div>
        <TittleAnimation tittle="Pourquoi nous faire confiance" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-14 px-5 rounded-md">
        {/* Section 1: Orange */}
        <div className="flex flex-col items-center bg-orange-100 p-6 rounded-lg shadow-md">
          <FaHardHat className="text-4xl text-orange-900 mb-2" />
          <h3 className="font-semibold text-lg text-orange-800">Expérience</h3>
          <p className="text-sm text-orange-700">10 ans de savoir-faire</p>
        </div>

        {/* Section 2: Green */}
        <div className="flex flex-col items-center bg-orange-100 p-6 rounded-lg shadow-md">
          <FaShieldAlt className="text-4xl text-orange-900 mb-2" />
          <h3 className="font-semibold text-lg text-orange-800">Garantie</h3>
          <p className="text-sm text-orange-700">Travaux couverts & assurés</p>
        </div>

        {/* Section 3: Blue */}
        <div className="flex flex-col items-center bg-orange-100 p-6 rounded-lg shadow-md">
          <FaStopwatch className="text-4xl text-orange-900 mb-2" />
          <h3 className="font-semibold text-lg text-orange-800">Réactivité</h3>
          <p className="text-sm text-orange-700">Interlocuteur unique et dédié</p>
        </div>
      </div>
    </div>
  );
};

export default Exprience;
