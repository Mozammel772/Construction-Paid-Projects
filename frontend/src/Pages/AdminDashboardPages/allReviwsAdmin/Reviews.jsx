import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Reviews = () => {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const fetchPendingreview = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get("/review/?status=pending");
      console.log(res.data);
      setReview(res.data || []);
    } catch (err) {
      console.error("Failed to load review", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingreview();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy, h:mm a"); // Example: June 15, 2025, 7:30 PM
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto p-2">
      <TittleAnimation
        tittle="Nombre total d'avis en attente"
        subtittle={`Aujourd'hui, tous les avis en attente (${review.length})`}
      />

      {review.length === 0 ? (
        <div className="text-center p-5 space-y-4">
          <p className="text-gray-500">
            Aucun avis en attente trouvé ou échec du chargement.
          </p>
          <button
            onClick={fetchPendingreview}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            🔁 Recharger
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mt-6">
          {review.map((blog) => (
            <div
              key={blog._id}
              className="card w-full bg-white border border-orange-100 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Image */}
              {/* <figure className="rounded-t-2xl overflow-hidden p-2">
                <img
                  src={blog.image || "https://via.placeholder.com/300x200"}
                  alt="Blog"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure> */}
              <div className="card-body p-4 space-y-3 bg-orange-50">
                <p className="text-base text-gray-600">
                  Nom:{" "}
                  <span className="text-orange-600 font-medium">
                    {blog.name?.slice(0, 40)} ...
                  </span>
                </p>
                <p className="text-sm text-orange-600 italic">
                  📅 Publié le {formatDate(blog.createdAt)}
                </p>
                <p className="mt-2">
                  <strong>Statut:</strong>{" "}
                  <span
                    className={`${
                      review.status === "accepted"
                        ? "text-green-500"
                        : review.status === "rejected"
                        ? "text-red-500"
                        : "text-orange-500"
                    } font-semibold`}
                  >
                    {review.status || "pending"}
                  </span>
                </p>

                {/* Button */}
                <div className="card-actions pt-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin-dashboard/reviws-details/${blog._id}`
                      )
                    }
                    className="btn w-[95%] btn-base lg:btn-lg bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2 mx-auto"
                  >
                    Voir les détails
                  </button>
                </div>
              </div>

              {/* Content */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
