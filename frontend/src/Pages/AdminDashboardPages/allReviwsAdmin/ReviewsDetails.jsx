import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ReviewsDetails = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/review/${id}`);
        setReview(res.data);
      } catch (err) {
        console.error("Failed to load review", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id, axiosPublic]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy, h:mm a"); // Example: June 15, 2025, 7:30 PM
  };

  // ===== ACTIONS =====
  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await axiosPublic.patch(`/review/${id}/accept`);
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "L'avis a été approuvé avec succès.",
        confirmButtonColor: "#3085d6",
      });
      navigate("/admin-dashboard/reviws");
    } catch (err) {
      console.error("Approve failed", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Échec de l'approbation de l'avis.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);
      await axiosPublic.patch(`/review/${id}/reject`);
      Swal.fire({
        icon: "success",
        title: "Rejected!",
        text: "L'avis a été rejeté.",
        confirmButtonColor: "#3085d6",
      });
      navigate("/admin-dashboard/reviws");
    } catch (err) {
      console.error("Reject failed", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Échec du rejet de l'avis.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoading(true);
      await axiosPublic.delete(`/review/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Review has been deleted.",
        confirmButtonColor: "#3085d6",
      });
      navigate("/admin-dashboard/reviws");
    } catch (err) {
      console.error("Delete failed", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete review.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/admin-dashboard/reviws-edit/${id}`);
  };

  // ===== RENDER =====
  if (loading) return <LoadingSpinner />;
  if (!review) return <div className="text-center p-5">No review found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-10">
      <TittleAnimation
        tittle="Détails de l'avis en attente"
        subtittle="Gestion des avis administratifs"
      />

      <div className="bg-white border border-orange-100 rounded-xl shadow hover:shadow-md transition">
        {/* <figure className="rounded-t-2xl overflow-hidden p-2">
          <img
            src={review.image || "https://via.placeholder.com/300x200"}
            alt="Review"
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        </figure> */}

        <div className="p-6 space-y-4">
          <div className="py-2">
            <p className="text-sm text-orange-600 italic">
              📅 Soumis le {formatDate(review.createdAt)}
            </p>
          </div>

          <div className="py-5">
            <h1 className="text-lg font-semibold text-orange-700">
              Informations sur le réviseur
            </h1>
            <p className="text-base font-medium text-gray-700">
              Nom: {review.name}
            </p>
            <p className="text-base font-medium text-gray-700">
              Email: {review.email}
            </p>
            <p className="text-base font-medium text-gray-700">
              ôle: {review.role}
            </p>
          </div>

          <div className="py-5">
            <h2 className="text-xl font-semibold text-orange-700">
              Avis
            </h2>
            <p className="text-gray-800">{review.message}</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full py-10">
            <button
              onClick={handleApprove}
              className="w-full btn btn-base lg:btn-lg bg-green-500 hover:bg-green-600 text-white"
              disabled={actionLoading}
            >
              <FaCheck className="mr-1" /> Approuver
            </button>
            <button
              onClick={handleReject}
              className="w-full btn btn-base lg:btn-lg bg-yellow-500 hover:bg-yellow-600 text-white"
              disabled={actionLoading}
            >
              <FaTimes className="mr-1" /> Rejeter
            </button>
            <button
              onClick={handleEdit}
              className="w-full btn btn-base lg:btn-lg bg-blue-500 hover:bg-blue-600 text-white"
            >
              <FaEdit className="mr-1" /> Éditer
            </button>
            <button
              onClick={handleDelete}
              className="w-full btn btn-base lg:btn-lg bg-red-500 hover:bg-red-600 text-white"
              disabled={actionLoading}
            >
              <FaTrash className="mr-1" /> Supprimers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsDetails;
