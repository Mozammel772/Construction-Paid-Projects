import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PendingPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const fetchPendingBlogs = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get("/blog/blog?status=pending");
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setActionLoading(true);
      await axiosPublic.patch(`/blog/blog/accept/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Approve failed", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(true);
      await axiosPublic.patch(`/blog/blog/reject/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Reject failed", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      setActionLoading(true);
      await axiosPublic.delete(`/blog/blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  if (loading) {
    return <div className="text-center text-lg p-5">Loading blogs...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <TittleAnimation
        tittle="Total Pending Post"
        subtittle={`Today All Pending Post (${blogs.length})`}
      />

      {blogs.length === 0 ? (
        <p className="text-gray-500 p-5">No pending blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card w-96 bg-white border border-orange-100 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Image */}
              <figure className="rounded-t-2xl overflow-hidden p-2">
                <img
                  src={blog.afterImage || "https://via.placeholder.com/300x200"}
                  alt="Blog"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>

              {/* Content */}
              <div className="card-body p-4 space-y-3">
                <h2 className="card-title text-lg font-bold text-orange-700">
                  {blog.title?.slice(0, 30)}
                </h2>

                <div
                  className="text-sm text-gray-600 line-clamp-3 prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.content?.slice(0, 100)),
                  }}
                ></div>

                {/* Button */}
                <div className="card-actions  pt-2">
                  <button
                    onClick={() => navigate(`/admin-dashboard/post-management/pending-all-post-details/${blog._id}`)}
                    className="btn w-[90%] bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2"
                  >
                    Details Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingPost;
