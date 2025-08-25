import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ReviewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axiosPublic.get(`/review/${id}`);
        const review = res.data;
        setValue("name", review.name);
        setValue("rating", review.rating);
        setValue("message", review.message);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not load review data.",
        });
      }
    };

    fetchReview();
  }, [id, setValue, axiosPublic]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosPublic.put(`/review/${id}`, data);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Review has been successfully updated.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(`/admin-dashboard/reviws-details/${id}`);
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <TittleAnimation tittle="Edit Review" subtittle="Admin Editing" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full bg-orange-50 border-orange-300 rounded-lg px-3 py-2"
            placeholder="Enter name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <select
            {...register("rating", { required: "Rating is required" })}
            className="select select-bordered w-full bg-orange-50 border-orange-300 rounded-lg"
          >
            <option value="">Select Rating</option>
            {[1,2,3,4,5].map(star => (
              <option key={star} value={star}>{star} Star</option>
            ))}
          </select>
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            rows={4}
            {...register("message", { required: "Message is required" })}
            className="textarea textarea-bordered w-full bg-orange-50 border-orange-300 rounded-lg px-3 py-2"
            placeholder="Write your review..."
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn w-full text-white rounded-lg py-2 ${
            loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Submitting..." : "Update Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewsEdit;
