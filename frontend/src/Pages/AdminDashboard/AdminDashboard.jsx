// import { useEffect, useState } from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const AdminDashboard = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//  const axiosPublic = useAxiosPublic();


//   const fetchPendingBlogs = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosPublic.get("/blog/blog?status=pending");
//       console.log("API response:", res.data); // Debug response

//       // Safely access the array
//       const blogList = Array.isArray(res.data)
//         ? res.data
//         : Array.isArray(res.data.data)
//         ? res.data.data
//         : [];

//       setBlogs(blogList);
//     } catch (err) {
//       console.error("Failed to load blogs", err);
//       setBlogs([]); // Fallback to empty array
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       setActionLoading(true);
//       await axiosPublic.patch(`/blog/blog/accept/${id}`);
//       setBlogs((prev) => prev.filter((blog) => blog._id !== id));
//     } catch (err) {
//       console.error("Approve failed", err);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       setActionLoading(true);
//       await axiosPublic.patch(`/blog/blog/reject/${id}`);
//       setBlogs((prev) => prev.filter((blog) => blog._id !== id));
//     } catch (err) {
//       console.error("Reject failed", err);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPendingBlogs();
//   }, []);

//   if (loading) {
//     return <div className="text-center text-lg p-5">Loading blogs...</div>;
//   }

//   if (!Array.isArray(blogs) || blogs.length === 0) {
//     return <div className="text-center text-gray-500 p-5">No pending blogs found.</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Pending Blog Approval</h2>
//       <div className="space-y-4">
//         {blogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="border bg-white shadow p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center"
//           >
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold">{blog.title}</h3>
//               <p className="text-sm text-gray-600">{blog.content?.slice(0, 100)}...</p>
//               <p className="text-xs text-gray-400 mt-1">Author: {blog.author || "Unknown"}</p>
//             </div>
//             <div className="mt-3 md:mt-0 flex space-x-2">
//               <button
//                 onClick={() => handleApprove(blog._id)}
//                 disabled={actionLoading}
//                 className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//               >
//                 <FaCheckCircle />
//                 Approve
//               </button>
//               <button
//                 onClick={() => handleReject(blog._id)}
//                 disabled={actionLoading}
//                 className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//               >
//                 <FaTimesCircle />
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPendingBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:9000/blog/blog?status=pending");
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
      await axios.patch(`http://localhost:9000/blog/blog/accept/${id}`);
      const approvedBlog = blogs.find(blog => blog._id === id);
      setBlogs(prev => prev.filter(blog => blog._id !== id));
      setApprovedBlogs(prev => [...prev, approvedBlog]);
    } catch (err) {
      console.error("Approve failed", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(true);
      await axios.patch(`http://localhost:9000/blog/blog/reject/${id}`);
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (err) {
      console.error("Reject failed", err);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  if (loading) {
    return <div className="text-center text-lg p-5">Loading blogs...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Blog Approval</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-500 p-5">No pending blogs found.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border bg-white shadow p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-sm text-gray-600">{blog.content?.slice(0, 100)}...</p>
                <p className="text-xs text-gray-400 mt-1">Author: {blog.author || "Unknown"}</p>
              </div>
              <div className="mt-3 md:mt-0 flex space-x-2">
                <button
                  onClick={() => handleApprove(blog._id)}
                  disabled={actionLoading}
                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  <FaCheckCircle />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(blog._id)}
                  disabled={actionLoading}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  <FaTimesCircle />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold my-6">Approved Blogs</h2>
      {approvedBlogs.length === 0 ? (
        <p className="text-gray-500 p-5">No approved blogs yet.</p>
      ) : (
        <div className="space-y-4">
          {approvedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="border bg-white shadow p-4 rounded-md"
            >
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600">{blog.content?.slice(0, 100)}...</p>
              <p className="text-xs text-gray-400 mt-1">Author: {blog.author || "Unknown"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
