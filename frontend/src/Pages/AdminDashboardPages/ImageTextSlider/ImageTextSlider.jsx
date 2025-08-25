// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const ImageTextSlider = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const axiosPublic = useAxiosPublic();

//   // image upload helper
//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append("image", file);
//     const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

//     const res = await axiosPublic.post(
//       `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//       formData
//     );

//     if (res.data && res.data.data.url) {
//       return res.data.data.url;
//     } else {
//       throw new Error("Image upload failed");
//     }
//   };

//   const onSubmit = async (data) => {
//     if (!image) {
//       Swal.fire({
//         icon: "warning",
//         title: "Image Required!",
//         text: "Please upload an image before submitting.",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const imageUrl = await uploadImage(image);

//       const sliderData = {
//         title: data.title,
//         description: data.message,
//         buttonUrl: data.buttonUrl,
//         image: imageUrl,
//         createdAt: new Date().toISOString(),
//       };

//       const res = await axiosPublic.post("/imagetextslider", sliderData);

//       if (res.status === 200 || res.status === 201) {
//         Swal.fire({
//           icon: "success",
//           title: "Submitted!",
//           text: "Your slider data has been submitted successfully.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         reset();
//         setImage(null);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed!",
//           text: "Could not submit data. Try again later.",
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: err.message || "Something went wrong!",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10 border border-orange-400">
//       <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
//         Image and Text Slider
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             {...register("title", { required: "Title is required" })}
//             className="input input-bordered w-full bg-orange-50 border-orange-300 rounded-lg px-3 py-2"
//             placeholder="Enter title"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             rows={4}
//             {...register("message", { required: "Description is required" })}
//             className="textarea textarea-bordered w-full bg-orange-50 border-orange-300 rounded-lg px-3 py-2"
//             placeholder="Write description..."
//           />
//           {errors.message && (
//             <p className="text-red-500 text-sm">{errors.message.message}</p>
//           )}
//         </div>

//         {/* Button URL */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Button Url
//           </label>
//           <input
//             type="url"
//             {...register("buttonUrl", { required: "Button URL is required" })}
//             className="input input-bordered w-full bg-orange-50 border-orange-300 rounded-lg px-3 py-2"
//             placeholder="Enter button url (e.g. https://example.com)"
//           />
//           {errors.buttonUrl && (
//             <p className="text-red-500 text-sm">{errors.buttonUrl.message}</p>
//           )}
//         </div>

//         {/* Image */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Upload Image <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="file-input file-input-bordered w-full bg-orange-50 border-orange-300 rounded-lg"
//           />
//           {image && (
//             <img
//               src={URL.createObjectURL(image)}
//               alt="Preview"
//               className="mt-4 w-full h-40 object-cover rounded-md border border-orange-300"
//               onLoad={(e) => URL.revokeObjectURL(e.target.src)}
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`btn w-full text-white rounded-lg py-2 ${
//             loading
//               ? "bg-orange-300 cursor-not-allowed"
//               : "bg-orange-500 hover:bg-orange-600"
//           }`}
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ImageTextSlider;
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ImageTextSlider = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sliders, setSliders] = useState([]); // history list
  const axiosPublic = useAxiosPublic();

  // ✅ Fetch existing history
  const fetchSliders = async () => {
    try {
      const res = await axiosPublic.get("/imagetextslider");
      setSliders(res.data || []);
    } catch (err) {
      console.error("Error fetching sliders:", err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

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

  // ✅ Submit handler
  const onSubmit = async (data) => {
    if (!image) {
      Swal.fire({
        icon: "warning",
        title: "Image Required!",
        text: "Please upload an image before submitting.",
      });
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(image);

      const sliderData = {
        title: data.title,
        description: data.message,
        buttonUrl: data.buttonUrl,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      const res = await axiosPublic.post("/imagetextslider", sliderData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Your slider data has been submitted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setImage(null);
        fetchSliders(); // refresh history
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

  // ✅ Delete handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/imagetextslider/${id}`);
          Swal.fire("Deleted!", "Your slider has been deleted.", "success");
          fetchSliders(); // refresh after delete
        } catch (err) {
          Swal.fire("Error!", "Failed to delete. Try again.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10 border border-orange-400">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
        Image and Text Slider
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full bg-orange-50 border-orange-300 rounded-lg px-3 py-2"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={4}
            {...register("message", { required: "Description is required" })}
            className="textarea textarea-bordered w-full bg-orange-50 border-orange-300 rounded-lg px-3 py-2"
            placeholder="Write description..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Button URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Button Url
          </label>
          <input
            type="url"
            {...register("buttonUrl", { required: "Button URL is required" })}
            className="input input-bordered w-full bg-orange-50 border-orange-300 rounded-lg px-3 py-2"
            placeholder="Enter button url (e.g. https://example.com)"
          />
          {errors.buttonUrl && (
            <p className="text-red-500 text-sm">{errors.buttonUrl.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image <span className="text-red-500">*</span>
          </label>
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
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* ✅ History List */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">
          Slider History
        </h3>
        {sliders.length === 0 ? (
          <p className="text-gray-500">No slider data found.</p>
        ) : (
          <ul className="space-y-4">
            {sliders.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between p-4 border border-orange-300 rounded-lg bg-orange-50"
              >
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ImageTextSlider;
