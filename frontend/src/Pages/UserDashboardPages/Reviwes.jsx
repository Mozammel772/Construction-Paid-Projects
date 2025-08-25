import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ReviewForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // image upload helper
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

    const res = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      formData
    );

    if (res.data && res.data.data.url) {
      return res.data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const reviewData = {
        name: data.name,
        rating: parseInt(data.rating),
        message: data.message,
        image: imageUrl,
        createdAt: new Date().toISOString(),
        email: user?.email || "",
      };

      const res = await axiosPublic.post("/review", reviewData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Your review is pending admin approval.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setImage(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not submit review. Try again later.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10 border border-orange-400">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
        Submit Your Review
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full bg-orange-50 border-orange-300 rounded-lg px-3 py-2"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <select
            {...register("rating", { required: "Rating is required" })}
            className="select select-bordered w-full bg-orange-50 border-orange-300 rounded-lg"
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} Star</option>
            ))}
          </select>
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}
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
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input file-input-bordered w-full bg-orange-50 border-orange-300 rounded-lg"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-4 w-full h-40 object-cover rounded-md border border-orange-300"
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn w-full text-white rounded-lg py-2 ${
            loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
