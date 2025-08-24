import React, { useContext, useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import StoreContext from "../../context/storeContext";
import { base_url } from "../../config/config";
import axios from "axios";
import { htmlToText } from "html-to-text";
import { toast } from "react-hot-toast";

const NewsContent = () => {
  // Decode HTML entities
  const decodeHtmlEntities = (str) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  const { store } = useContext(StoreContext);
  const [news, setNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [parPage, setParPage] = useState(5);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  const [res, setRes] = useState({ id: "", loader: false });

  const getNews = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      setNews(data.news);
      setAllNews(data.news);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // Delete news
  const deleteNews = async (newsId) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        const { data } = await axios.delete(
          `${base_url}/api/news/delete/${newsId}`,
          {
            headers: { Authorization: `Bearer ${store.token}` },
          }
        );
        toast.success(data.message);
        getNews();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Pagination setup
  useEffect(() => {
    if (news.length > 0) {
      setPages(Math.ceil(news.length / parPage));
    }
  }, [news, parPage]);

  // Search news
  const searchNews = (e) => {
    const keyword = e.target.value.toLowerCase();
    setNews(allNews.filter((n) => n.title.toLowerCase().includes(keyword)));
    setPage(1);
    setParPage(5);
  };

  // Filter by status
  const filterByStatus = (e) => {
    const status = e.target.value;
    if (!status) {
      setNews(allNews);
    } else {
      setNews(allNews.filter((n) => n.status === status));
    }
    setPage(1);
    setParPage(5);
  };

  // Update news status
  const updateStatus = async (status, newsId) => {
    try {
      setRes({ id: newsId, loader: true });
      const { data } = await axios.put(
        `${base_url}/api/news/status-update/${newsId}`,{status},
        { headers: { "Authorization": `Bearer ${store.token}` } }
      );
      toast.success(data.message);
      getNews();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRes({ id: "", loader: false });
    }
  };

  // Render status badge
  const renderStatusBadge = (n) => {
    const isLoading = res.loader && res.id === n._id;
    const label = isLoading ? "Loading..." : n.status;

    if (store?.userInfo?.role === "admin") {
      const colors = {
        pending: "bg-blue-200 text-blue-800",
        active: "bg-green-200 text-green-800",
        deactive: "bg-red-200 text-red-800",
      };
      const nextStatus =
        n.status === "pending"
          ? "active"
          : n.status === "active"
          ? "deactive"
          : "active";

      return (
        <span
          onClick={() => updateStatus(nextStatus, n._id)}
          className={`px-2 py-[2px] rounded-md text-xs cursor-pointer ${colors[n.status]}`}
        >
          {label}
        </span>
      );
    } else {
      const colors = {
        pending: "bg-yellow-200 text-yellow-800",
        active: "bg-green-200 text-green-800",
        deactive: "bg-red-200 text-red-800",
      };
      return (
        <span
          className={`px-2 py-[2px] rounded-md text-xs ${colors[n.status]}`}
        >
          {label}
        </span>
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <select
          onChange={filterByStatus}
          className="w-48 px-4 py-2 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">--- Select Status ---</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>
        <input
          type="text"
          placeholder="Search News"
          onChange={searchNews}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="py-4 px-6 text-left">Sr.</th>
              <th className="py-4 px-6 text-left">News Title</th>
              <th className="py-4 px-6 text-left">News Image</th>
              <th className="py-4 px-6 text-left">Category Name</th>
              <th className="py-4 px-6 text-left">Short Description</th>
              <th className="py-4 px-6 text-left">Date</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {news.length > 0 &&
              news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
                <tr key={n._id} className="border-t">
                  <td className="py-4 px-6">{(page - 1) * parPage + i + 1}</td>
                  <td className="py-4 px-6">{n.title.slice(0, 15)}...</td>
                  <td className="py-4 px-6">
                    <img
                      src={n.image}
                      alt="News"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-4 px-6">{n.category}</td>
                  <td className="py-4 px-6">
                    {htmlToText(decodeHtmlEntities(n.description || ""), {
                      wordwrap: false,
                      selectors: [{ selector: "img", format: "skip" }],
                    }).slice(0, 15)}
                    ...
                  </td>
                  <td className="py-4 px-6">{n.date}</td>
                  <td className="py-4 px-6">{renderStatusBadge(n)}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3 text-gray-500">
                      <Link
                        to="#"
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/dashboard/news/edit/${n._id}`}
                        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-800"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deleteNews(n._id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-800"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center py-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold">News Per Page:</label>
          <select
            value={parPage}
            onChange={(e) => {
              setParPage(parseInt(e.target.value));
              setPage(1);
            }}
            className="px-4 py-2 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="font-bold">
            {news.length > 0
              ? `${(page - 1) * parPage + 1}-${Math.min(
                  page * parPage,
                  news.length
                )} of ${news.length}`
              : "0 results"}
          </span>
          <MdArrowBackIos
            onClick={() => page > 1 && setPage(page - 1)}
            className={`w-6 h-6 cursor-pointer ${
              page > 1
                ? "text-gray-800 hover:text-black"
                : "text-gray-300 cursor-not-allowed"
            }`}
          />
          <MdArrowForwardIos
            onClick={() => page < pages && setPage(page + 1)}
            className={`w-6 h-6 cursor-pointer ${
              page < pages
                ? "text-gray-800 hover:text-black"
                : "text-gray-300 cursor-not-allowed"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
