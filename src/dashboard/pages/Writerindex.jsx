import React from 'react';
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
const Writerindex = () => {
    return (
 <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total News", value: 150, color: "text-red-500" },
          { title: "Pending News", value: 120, color: "text-purple-500" },
          { title: "Active News", value: 30, color: "text-cyan-500" },
          { title: "Deactive News", value: 15, color: "text-blue-500" },
        ].map((start, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center gap-2"
          >
            <span className={`text-4xl font-bold ${start.color}`}>
              {start.value}
            </span>
            <span className="text-md font-semibold text-gray-600">
              {start.title}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center pb-4 border-b border-gray-500">
          <h2 className="text-xl font-bold text-gray-600">Recent News</h2>
          <Link
            to="/news"
            className="text-blue-500 hover:text-blue-800 font-semibold transition duration-300"
          >
            View All
          </Link>
        </div>
        {/* Display recent news content */}
        <div className="overflow-x-auto mt-6">
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
              {[1, 2, 3, 4, 5].map((item, index) => (
                <tr key={index} className="border-t ">
                  <td className="py-4 px-6">1</td>
                  <td className="py-4 px-6">News Title</td>
                  <td className="py-4 px-6">
                    <img
                      src="https://www.hindustantimes.com/ht-img/img/2025/07/23/550x309/Jagdeep-Dhankhar_1752973616530_1752973616803_1753277180658.JPG"
                      alt="News"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-4 px-6">Category Name</td>
                  <td className="py-4 px-6">
                    Short description of the news content
                  </td>
                  <td className="py-4 px-6">02/02/2020</td>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

export default Writerindex;