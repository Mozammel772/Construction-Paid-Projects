import axios from "axios";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminGenerateToken = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateToken = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.amdeco-renovation.fr/token/generate-token"
      );
      setToken(res.data.token);

      Swal.fire({
        icon: "success",
        title: "Jeton généré!",
        text: `Jeton: ${res.data.token}`,
        confirmButtonColor: "#f97316", // orange-500
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Generate Token",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (token) {
      await navigator.clipboard.writeText(token);
      Swal.fire({
        icon: "success",
        title: "Copié!",
        text: "Jeton copié dans le presse-papiers.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border border-orange-200">
      <h1 className="text-2xl font-bold mb-4 text-center text-orange-600">
        Générateur de jetons d'administration
      </h1>

      <button
        onClick={handleGenerateToken}
        disabled={loading}
        className="btn btn-primary w-full bg-orange-500 hover:bg-orange-600 border-none"
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm text-white"></span>
        ) : (
          "Générer le jeton"
        )}
      </button>

      {token && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <span className="font-mono text-lg">{token}</span>
            <button
              onClick={handleCopy}
              className="btn btn-sm btn-outline btn-info ml-4"
            >
              <FaCopy size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGenerateToken;
