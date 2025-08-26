import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import "./QuillCustom.css";

const EditMyPostHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [editorContent, setEditorContent] = useState("");
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blog/blog/${id}`);
        const blog = res.data;
        setValue("title", blog.title);
        setValue("category", blog.category);
        setValue("review", blog.review);
        setEditorContent(blog.content);
        setBeforePreview(blog.beforeImage);
        setAfterPreview(blog.afterImage);
      } catch (err) {
        toast.error("Failed to load blog data.");
      }
    };
    fetchBlog();
  }, [id, setValue, axiosPublic]);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "before") {
      setBeforeFile(file);
      setBeforePreview(URL.createObjectURL(file));
    } else {
      setAfterFile(file);
      setAfterPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=a616b7cb4177b6d22010843ec1f12500`,
      formData
    );
    return res.data?.data?.url || "";
  };

  const onSubmit = async (data) => {
    if (!editorContent || editorContent === "<p><br></p>") {
      toast.error("Content is required.");
      return;
    }

    setLoading(true);
    try {
      let beforeUrl = beforePreview;
      let afterUrl = afterPreview;

      if (beforeFile) beforeUrl = await uploadImage(beforeFile);
      if (afterFile) afterUrl = await uploadImage(afterFile);

      const updatedData = {
        title: data.title,
        category: data.category,
        review: data.review,
        content: editorContent,
        beforeImage: beforeUrl,
        afterImage: afterUrl,
      };

      await axiosPublic.put(`/blog/blog/${id}`, updatedData);
      Swal.fire({
        icon: "success",
        title: "Post Updated",
        text: "Your post has been successfully updated!",
        confirmButtonColor: "#d97706",
      }).then(() => {
        navigate(`/user-dashboard/my-post-history-details/${id}`);
      });
    } catch (err) {
      toast.error("Update failed. Try again.");
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
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "clean"],
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <TittleAnimation tittle="Modifier mon message" subtittle="Modification de mon message" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-semibold text-orange-700">Titre:</label>
          <input
            type="text"
            {...register("title", { required: "Titre est requis" })}
            className="input input-bordered w-full bg-orange-50"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="font-semibold text-orange-700">Catégorie:</label>
          <select
            {...register("category", { required: "Catégorie est requise" })}
            className="select select-bordered w-full bg-orange-50"
          >
            <option value="">Sélectionner</option>
            <option value="Electrician">Électricien</option>
            <option value="Plumber">Plombier</option>
            <option value="Carpenter">Charpentier</option>
            <option value="Painter">Peintre</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-orange-700">Récension:</label>
          <textarea
            rows={3}
            {...register("review", { required: "Récension est requise" })}
            className="textarea textarea-bordered w-full bg-orange-50"
          />
        </div>

        <div>
          <label className="font-semibold text-orange-700">Contenu:</label>
          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            modules={quillModules}
            className="bg-white border border-orange-300 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-orange-700 font-medium">Image Avant:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, "before")}
              className="file-input w-full"
            />
            {beforePreview && (
              <img
                src={beforePreview}
                className="mt-3 rounded-md h-40 object-cover"
              />
            )}
          </div>

          <div>
            <label className="text-orange-700 font-medium">Image Après:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, "after")}
              className="file-input w-full"
            />
            {afterPreview && (
              <img
                src={afterPreview}
                className="mt-3 rounded-md h-40 object-cover"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-base lg:btn-lg w-full text-white font-semibold ${
            loading ? "bg-orange-300" : "bg-orange-600 hover:bg-orange-700"
          }`}
          disabled={loading}
        >
          {loading ? "Mise à jour..." : "Mettre à jour le message"}
        </button>
      </form>
    </div>
  );
};

export default EditMyPostHistory;
