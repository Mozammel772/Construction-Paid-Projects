import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

// 🔧 Helper to limit words
const limitWords = (text, maxWords) => {
  const words = text?.split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

const BlogHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosPublic.get(`blog/blog?email=${user?.email}`);
        setBlogs(res.data || []);
      } catch (error) {
        toast.error("❌ Failed to load blog history.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchBlogs();
  }, [user, axiosPublic]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;
    try {
      const res = await axiosPublic.delete(`/blog/blog/${id}`);
      if (res.status === 200) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        toast.success("✅ Blog deleted successfully.");
      } else {
        toast.error("❌ Failed to delete blog.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="min-h-screen  text-white py-12 px-4 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-400">
        📝 Your Blog History
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-400">
          <p>No blogs found.</p>
          <p className="text-sm mt-1">Start writing your first blog today!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md ">
          <table className="table table-zebra w-full text-sm">
            <thead className="text-cyan-400 uppercase text-xs">
              <tr>
                <th>SL</th>
                <th>Image</th>
                <th>Title (max 30 words)</th>
                <th>Author</th>
                <th>Content (max 100 words)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="w-16 h-16 rounded">
                      <img src={blog.imageUrl} alt="Blog" className="rounded" />
                    </div>
                  </td>
                  <td className="font-semibold text-cyan-300">
                    {limitWords(blog.title, 20)}
                  </td>
                  <td>{blog.name}</td>
                  <td className="text-gray-400">
                    {
                      // Strip HTML tags for clean preview
                      limitWords(blog.content.replace(/<[^>]+>/g, ""), 50)
                    }
                  </td>
                  <td className="flex gap-2">
                    <Link
                      to={`/admin-dashboard/edit-blog/${blog._id}`}
                      className="btn btn-xs btn-outline btn-info"
                      title="Edit Blog"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-xs btn-outline btn-error"
                      title="Delete Blog"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6" className="text-right text-xs text-gray-400">
                  Total Blogs: {blogs.length}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </section>
  );
};

export default BlogHistory;
