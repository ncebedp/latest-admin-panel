import React , { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../config/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StoreContext from '../../context/storeContext';
import { useContext } from "react";

const AddWriter = () => {
          const [state, setState] = useState({
                  name: '',
                  email: '',
                  password: '',
                  category: ''
          });
          // console.log(state);
  const inputHandle = (e) => {
    // Handle input changes
    setState({ ...state, [e.target.name]: e.target.value });
  };
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const {store} = useContext(StoreContext);
            
    const submit = async (e) => {
            e.preventDefault();
            try {
                setLoader(true);
                const {data} = await axios.post(`${base_url}/api/writer/add`, state,{
                  headers: { "Authorization": `Bearer ${store.token}` }
                });
                setLoader(false);
                // console.log(data);
                toast.success(data.message);
                navigate('/dashboard/writers');
            } catch (error) {
                setLoader(false);
                toast.error(error.response.data.message);
                
            }
        }
    
  return (
    <div className="bg-white rounded-md ">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-semibold">Add Users</h2>
        <Link
          to="/dashboard/writers"
          className="px-3 py-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-800"
        >
         View Users
        </Link>
      </div>
      <div className="p-4 ">
        <form onSubmit={submit}>
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
              <label htmlFor="email" className="text-md font-semibold text-gray-600"> Email</label>
              <input onChange={inputHandle}
              value={state.email} type="email" id="email" placeholder="Email" name="email"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="password" className="text-md font-semibold text-gray-600"> Password</label>
              <input onChange={inputHandle}
              value={state.password} type="password" id="password" placeholder="Password" name="password"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <button  disabled={loader} type="submit" className="px-3 py-[6px] bg-blue-500 text-white rounded-md hover:bg-blue-800">
              {loader ? "Loading..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWriter;
