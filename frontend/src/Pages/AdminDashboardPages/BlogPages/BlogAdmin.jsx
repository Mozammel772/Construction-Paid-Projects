import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import "./QuillCustom.css";
const BlogAdmin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

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
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

        const imgbbResponse = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );

        if (imgbbResponse.data && imgbbResponse.data.data.url) {
          imageUrl = imgbbResponse.data.data.url;
        } else {
          toast.error("Image upload failed! Try again.");
          return;
        }
      }

      const blogData = {
        title: data.title,
        name: data.name,
        content: editorContent,
        imageUrl,
        createdAt: new Date().toISOString(),
        authorName: user.name,
        authorEmail: user.email,
        authorRole: user.role,
        authorUrl: user.imageUrl,
      };
console.log("content",editorContent)
      const res = await axiosPublic.post("/blog/blog", blogData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Blog post created successfully!");
        reset();
        setImage(null);
        setEditorContent("");
      } else {
        toast.error("Failed to create blog post.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
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
        <title>Admin | Create Blog Post</title>
      </Helmet>

      <div className="">
        <h2 className="text-4xl font-extrabold mb-8 text-blue-400 text-center">Create Blog Post</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-blue-300">Blog Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
            {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-blue-300">Blog Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog name"
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
            <label className="block mb-2 text-sm font-semibold text-blue-300">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:bg-blue-500 file:text-white file:rounded-lg file:px-5 file:py-2 file:border-0 text-sm"
            />
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
              loading
                ? "bg-slate-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Posting..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogAdmin;
