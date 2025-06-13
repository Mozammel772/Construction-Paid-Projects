
import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DividerAnimation from "../../components/Animation/DividerAnimation";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:9000/blog/blog", {
          withCredentials: true,
        });
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blogs.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading blogs...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">{error}</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <DividerAnimation titte=" 📚 Latest Blogs" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-lg rounded-xl p-4 border hover:shadow-2xl transition flex flex-col h-full"
          >
            {blog.imageUrl && (
              <Link to={`/blog-us/${blog._id}`}>
                <img
                  src={blog.imageUrl}
                  alt="Blog"
                  className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
                />
              </Link>
            )}

            <div
              className="text-gray-700 prose max-w-none line-clamp-3 flex-grow"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            ></div>

            {/* Author section - always at bottom */}
            <div className="flex my-5 items-center mt-6">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                  <img
                    src={blog.authorUrl}
                    alt={blog.authorName}
                  />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 line-clamp-1">
                  {blog.authorName}
                </p>
                <p className="text-green-900 font-bold uppercase text-xs line-clamp-1">
                  {blog.authorRole}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
