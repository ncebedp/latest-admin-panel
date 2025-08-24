import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../config/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StoreContext from "../../context/storeContext";
import { useContext } from "react";

const EditWriter = () => {
    const {id} = useParams();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { store } = useContext(StoreContext);

  const [state, setState] = useState({
    name: "",
    email: "",
    category: "",
    role: "",
  });

      const getWriterData = async () => {
            try {
                const {data} = await axios.get(`${base_url}/api/news/writer/${id}`,{
                  headers: { Authorization: `Bearer ${store.token}` }
                });
                setState({
                    name: data.writer.name,
                    email: data.writer.email,
                    category: data.writer.category,
                    role: data.writer.role,
                })
            } catch (error) {
                toast.error("Failed to load writer data",error);
                
            }
        }
        useEffect(() => {
            getWriterData();
        },[id]);
          const inputHandle = (e) => {
    // Handle input changes
    setState({ ...state, [e.target.name]: e.target.value });
  };

   const handleUpdateWriter = async (e) => {
            e.preventDefault();
            try {
                setLoader(true);
                 await axios.put(`${base_url}/api/update/writer/${id}`, state,{
                  headers: { Authorization: `Bearer ${store.token}` }
                });
                setLoader(false);
                toast.success("Writer updated successfully");
                navigate('/dashboard/writers');
            } catch (error) {
                setLoader(false);
                toast.error("Unable to update writer",error);
                
            }
        }

  return (
    <div className="bg-white rounded-md ">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-semibold">Edit Users</h2>
        <Link
          to="/dashboard/writers"
          className="px-3 py-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-800"
        >
          View Users
        </Link>
      </div>
      <div className="p-4 ">
        <form onSubmit={handleUpdateWriter}>
          <div className="grid grid-cols-2 gap-x-8 mb-3">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="name"
                className="text-md font-semibold text-gray-600"
              >
                {" "}
                Name
              </label>
              <input
                onChange={inputHandle}
                value={state.name}
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="category"
                className="text-md font-semibold text-gray-600"
              >
                {" "}
                Category
              </label>
              <select
                onChange={inputHandle}
                value={state.category}
                name="category"
                className=" px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
                id="category"
              >
                <option value="">--- Select Category ---</option>
                <option value="Eduction">Eduction</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 mb-3">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="email"
                className="text-md font-semibold text-gray-600"
              >
                {" "}
                Email
              </label>
              <input
                onChange={inputHandle}
                value={state.email}
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="Role"
                className="text-md font-semibold text-gray-600"
              >
                {" "}
                Role
              </label>
              <input
                onChange={inputHandle}
                value={state.role}
                type="text"
                id="role"
                placeholder="Role"
                name="role"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              disabled={loader}
              type="submit"
              className="px-3 py-[6px] bg-blue-500 text-white rounded-md hover:bg-blue-800"
            >
              {loader ? "Loading..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWriter;
