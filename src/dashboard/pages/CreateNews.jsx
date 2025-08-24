import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaImage, FaImages } from "react-icons/fa";
import JoditEditor from "jodit-react";
import Gallery from "../components/Gallery";
import { base_url } from "../../config/config";
import toast from "react-hot-toast";
import axios from "axios";
import StoreContext from "../../context/storeContext";

const CreateNews = () => {
  const { store } = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);

  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [imagesLoader, setImagesLoader] = useState(false);

  // Main image handler
  const imageHandle = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setImg(URL.createObjectURL(files[0]));
      setImage(files[0]);
    }
  };

  // Add news
  const added = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoader(true);
      const { data } = await axios.post(
        `${base_url}/api/news/create`,
        formData,
        { headers: { Authorization: `Bearer ${store.token}` } }
      );
      setLoader(false);
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setImage("");
      setImg("");
    } catch (error) {
      setLoader(false);
      toast.error("Unable to create news");
    }
  };

  // Fetch images
  const get_images = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/images`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      setImages(data.images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_images();
  }, []);

  // Upload new gallery images
  const imageHandler = async (e) => {
    const files = e.target.files;
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      setImagesLoader(true);
      const { data } = await axios.post(
        `${base_url}/api/images/add`,
        formData,
        { headers: { Authorization: `Bearer ${store.token}` } }
      );
      setImagesLoader(false);
      toast.success(data.message);
      get_images();
    } catch (error) {
      console.log(error);
      setImagesLoader(false);
    }
  };

  // Insert image into editor
  const insertImageToEditor = (url) => {
    const html = `<img src="${url}" alt="image" />`;
    setDescription((prev) => prev + html);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <div className="flex justify-between items-center text-gray-700">
        <h2>Add News</h2>
        <Link
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 transition duration-300"
          to="/dashboard/news"
        >
          View All
        </Link>
      </div>
      <form onSubmit={added}>
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-md font-medium mb-2">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            className="w-full px-4 py-2 border rounded-md h-10"
            placeholder="Enter news title"
            required
          />
        </div>

        {/* Main image */}
        <div>
          <label
            htmlFor="img"
            className="w-full h-[240px] flex flex-col items-center justify-center cursor-pointer border-2 border-dashed mt-4"
          >
            {img ? (
              <img src={img} className="w-full h-full" alt="preview" />
            ) : (
              <div className="flex flex-col items-center">
                <FaImage className="text-4xl mb-2" />
                <span>Select Image</span>
              </div>
            )}
          </label>
          <input
            onChange={imageHandle}
            type="file"
            id="img"
            className="hidden"
            accept="image/*"
            required
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex justify-between items-center mt-4">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <FaImages
              onClick={() => setShow(true)}
              className="text-2xl text-blue-500 cursor-pointer"
            />
          </div>
          <JoditEditor
            ref={editor}
            value={description}
            tabIndex={1}
            onBlur={(value) => setDescription(value)}
          />
        </div>

        {/* Submit */}
        <div className="mt-4">
          <button
            disabled={loader}
            type="submit"
            className="px-3 py-[6px] bg-blue-500 text-white rounded-md"
          >
            {loader ? "Loading..." : "Add News"}
          </button>
        </div>
      </form>

      {show && (
        <Gallery
          setShow={setShow}
          images={images}
          imageHandler={imageHandler}
          onSelectImage={insertImageToEditor}
        />
      )}
    </div>
  );
};

export default CreateNews;
