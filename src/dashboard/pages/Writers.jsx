import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
// import { toast } from 'react-toastify';
import { base_url } from "../../config/config";
import StoreContext from "../../context/storeContext";
import { toast } from "react-hot-toast";

const Writers = () => {
  const { store } = useContext(StoreContext);
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(false);
  const get_writer = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news/writer`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      setWriters(data.writers);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_writer();
  }, []);

  const handleDeleteWriter = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this writer?");
  if (!confirmDelete) return;
   setLoading(true);
    try {
    await axios.delete(`${base_url}/api/delete/writer/${id}`, {
      headers: { Authorization: `Bearer ${store.token}` },
    });
    toast.success("Writer deleted successfully");
    get_writer();
    } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-400">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        <Link
          to="/dashboard/writer/add"
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-800 transition duration-300"
        >
          Add Users
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="py-4 px-6 text-left">Sr.</th>
              <th className="py-4 px-6 text-left">Users Name</th>
              <th className="py-4 px-6 text-left">Users Image</th>
              <th className="py-4 px-6 text-left">Category Name</th>
              <th className="py-4 px-6 text-left">Users Roll</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {writers.map((item, index) => (
              <tr key={index} className="border-t ">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{item.name}</td>
                <td className="py-4 px-6">
                  <img
                    src="https://www.hindustantimes.com/ht-img/img/2025/07/23/550x309/Jagdeep-Dhankhar_1752973616530_1752973616803_1753277180658.JPG"
                    alt="News"
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="py-4 px-6">{item.category}</td>
                <td className="py-4 px-6">{item.role}</td>
                <td className="py-4 px-6">{item.email}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-green-200 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-3 text-gray-500">
                    <Link
                      to="#"
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/dashboard/writer/edit/${item._id}`}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-800"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteWriter(item._id)}
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
    </div>
  );
};

export default Writers;
