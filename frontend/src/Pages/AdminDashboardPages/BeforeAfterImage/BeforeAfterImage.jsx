import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const BeforeAfterImage = () => {
  const { handleSubmit, reset } = useForm();

  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const axiosPublic = useAxiosPublic();

  // fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axiosPublic.get("/beforeafterimage"); // ✅ fixed route
      setBlogs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e, type) => {
    if (type === "before") setBeforeImage(e.target.files[0]);
    else if (type === "after") setAfterImage(e.target.files[0]);
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

    const response = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      formData
    );

    if (response.data && response.data.data.url) {
      return response.data.data.url;
    } else {
      throw new Error("Image upload failed.");
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      let beforeImageUrl = "";
      let afterImageUrl = "";

      if (beforeImage) beforeImageUrl = await uploadImage(beforeImage);
      if (afterImage) afterImageUrl = await uploadImage(afterImage);

      const blogData = {
        beforeImage: beforeImageUrl,
        afterImage: afterImageUrl,
        createdAt: new Date().toISOString(),
      };

      const res = await axiosPublic.post("/beforeafterimage", blogData); // ✅ fixed route

      if (res.status === 200 || res.status === 201) {
        Swal.fire("Success", "Before/After Blog Created!", "success");
        reset();
        setBeforeImage(null);
        setAfterImage(null);
        fetchBlogs(); // refresh list
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/beforeafterimage/${id}`); // ✅ fixed route
          Swal.fire("Deleted!", "Blog has been deleted.", "success");
          fetchBlogs();
        } catch (error) {
          Swal.fire("Error", "Failed to delete blog", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-white">
      <Helmet>
        <title>Admin | Before After Blog</title>
      </Helmet>

      {/* Form */}
      <div className="max-w-5xl mx-auto bg-white border border-orange-400 shadow-lg rounded-xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-orange-700">
                Avant l'image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "before")}
                className="file-input file-input-bordered w-full"
              />
              {beforeImage && (
                <img
                  src={URL.createObjectURL(beforeImage)}
                  alt="Before Preview"
                  className="mt-4 w-full h-40 object-cover rounded-md"
                />
              )}
            </div>

            {/* After */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-orange-700">
                Après l'image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "after")}
                className="file-input file-input-bordered w-full"
              />
              {afterImage && (
                <img
                  src={URL.createObjectURL(afterImage)}
                  alt="After Preview"
                  className="mt-4 w-full h-40 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-full ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700 text-white"
            }`}
          >
            {loading ? "Soumission..." : "Publier le blog"}
          </button>
        </form>
      </div>

      {/* History */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-4">Historique des images avant/après</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="grid grid-cols-2">
                <img
                  src={blog.beforeImage}
                  alt="Before"
                  className="w-full h-40 object-cover"
                />
                <img
                  src={blog.afterImage}
                  alt="After"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="p-2 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterImage;
