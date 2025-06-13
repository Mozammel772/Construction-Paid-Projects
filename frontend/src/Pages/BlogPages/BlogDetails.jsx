// src/pages/BlogDetails.jsx

import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DividerAnimation from "../../components/Animation/DividerAnimation";
import ShareModal from "./ShareModal";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  const blogUrl = `https://your-domain.com/blog-us/${id}`; // <-- Replace with your actual URL

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/blog/blog/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        setError("Blog not found.");
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <DividerAnimation titte="Blog-Details" />

      <h1 className="text-2xl lg:text-3xl font-bold text-green-700 mb-4">{blog.title}</h1>

      {/* Blog Image */}
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-xl mb-4"
        />
      )}
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        {/* Author Info */}
        <div className="flex items-center space-x-4">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring-2 ring-offset-2">
              <img src={blog.authorUrl} alt={blog.authorName} />
            </div>
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-lg">
              {blog.authorName}
            </p>
            <p className="text-green-700 font-bold uppercase text-sm">
              {blog.authorRole}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Posted on: {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Share Button */}
        <div>
          <button
            onClick={() => setShowShareModal(true)}
            className="bg-green-800 hover:bg-green-900 text-white px-4 py-1 rounded"
          >
            Share
          </button>
        </div>
      </div>
   <h1 className="text-xl lg:text-2xl font-bold text-green-700 mb-4 ">{blog.name}</h1>
      {/* Blog Content */}
      <div
        className="text-gray-700 prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
      ></div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          blogTitle={blog.title}
          blogUrl={blogUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default BlogDetails;
