// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useForm } from "react-hook-form";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import "./QuillCustom.css";

// const EditBlog = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosPublic = useAxiosPublic();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const [editorContent, setEditorContent] = useState("");
//   const [imagePreview, setImagePreview] = useState("");
//   const [newImage, setNewImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Load existing blog data
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await axiosPublic.get(`/blog/blog/${id}`);
//         const blog = res.data;
//         reset(blog);
//         setEditorContent(blog.content);
//         setImagePreview(blog.imageUrl);
//       } catch (error) {
//         toast.error("Failed to load blog.");
//       }
//     };
//     fetchBlog();
//   }, [id, reset, axiosPublic]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setNewImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       let imageUrl = imagePreview;

//       if (newImage) {
//         const formData = new FormData();
//         formData.append("image", newImage);
//         const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

//         const response = await axiosPublic.post(
//           `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//           formData
//         );

//         if (response.data && response.data.data.url) {
//           imageUrl = response.data.data.url;
//         } else {
//           toast.error("Image upload failed");
//           return;
//         }
//       }

//       const updatedBlog = {
//         title: data.title,
//         name: data.name,
//         content: editorContent,
//         imageUrl,
//       };

//       const res = await axiosPublic.put(`/blog/blog/${id}`, updatedBlog);
//       if (res.data?.message === "Blog updated successfully") {
//         toast.success("Blog updated!");
//         navigate("/dashboard/blog-list");
//       } else {
//         toast.error("Update failed.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const quillModules = {
//     toolbar: [
//       [{ font: [] }],
//       [{ size: ["small", false, "large", "huge"] }],
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ script: "sub" }, { script: "super" }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       [{ direction: "rtl" }],
//       [{ align: [] }],
//       ["blockquote", "code-block"],
//       ["link", "clean"],
//     ],
//   };

//   return (
//     <div className="min-h-screen max-w-4xl mx-auto text-white py-12 px-6 md:px-12">
//       <Helmet>
//         <title>Edit Blog</title>
//       </Helmet>

//       <h2 className="text-4xl font-extrabold mb-8 text-yellow-400 text-center">Edit Blog</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div>
//           <label className="block mb-2 text-sm font-semibold text-yellow-300">Blog Title</label>
//           <input
//             type="text"
//             {...register("title", { required: "Title is required" })}
//             className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           />
//           {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-semibold text-yellow-300">Blog Name</label>
//           <input
//             type="text"
//             {...register("name", { required: "Name is required" })}
//             className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           />
//           {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-semibold text-yellow-300">Content</label>
//           <ReactQuill
//             theme="snow"
//             value={editorContent}
//             onChange={setEditorContent}
//             modules={quillModules}
//             className="rounded-lg overflow-hidden"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-semibold text-yellow-300">Upload New Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="file:bg-yellow-500 file:text-white file:rounded-lg file:px-5 file:py-2 file:border-0 text-sm"
//           />
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="Blog"
//               className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md"
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 rounded-lg text-lg font-bold tracking-wide transition duration-200 ${
//             loading ? "bg-slate-600 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-700"
//           }`}
//         >
//           {loading ? "Updating..." : "Update Blog"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBlog;




import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import "./QuillCustom.css";

const EditBlog = () => {
  const { id } = useParams(); // get blog ID from URL
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blog/blog/${id}`);
        const blog = res.data;
        reset({ title: blog.title, name: blog.name });
        setEditorContent(blog.content);
        setExistingImageUrl(blog.imageUrl);
      } catch (err) {
        toast.error("Failed to load blog data.");
      }
    };

    if (id) fetchBlog();
  }, [id, reset, axiosPublic]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (!editorContent || editorContent === "<p><br></p>") {
      toast.error("Blog content cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = existingImageUrl;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

        const imgbbResponse = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );

        if (imgbbResponse.data?.data?.url) {
          imageUrl = imgbbResponse.data.data.url;
        } else {
          toast.error("Image upload failed! Try again.");
          return;
        }
      }

      const updatedBlog = {
        title: data.title,
        name: data.name,
        content: editorContent,
        imageUrl,
        updatedAt: new Date().toISOString(),
      };

      const res = await axiosPublic.put(`/blog/blog/${id}`, updatedBlog);
      if (res.status === 200) {
       alert("Blog updated successfully!");
        // navigate("/dashboard/blog-history");
      } else {
        toast.error("Failed to update blog.");
      }
    } catch (err) {
      toast.error("Something went wrong while updating blog.");
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "clean"],
    ],
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto text-white py-12 px-6 md:px-12">
      <Helmet>
        <title>Edit Blog</title>
      </Helmet>

      <h2 className="text-4xl font-extrabold mb-8 text-blue-400 text-center">Edit Blog Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-blue-300">Blog Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-blue-300">Blog Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-blue-300">Content</label>
          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            modules={quillModules}
            className="rounded-lg overflow-hidden"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-blue-300">Upload New Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file:bg-blue-500 file:text-white file:rounded-lg file:px-5 file:py-2 file:border-0 text-sm"
          />
          {existingImageUrl && !image && (
            <img
              src={existingImageUrl}
              alt="Current"
              className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md"
            />
          )}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md"
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-lg font-bold tracking-wide transition duration-200 ${
            loading ? "bg-slate-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
