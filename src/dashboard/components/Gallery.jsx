import React from "react";
import { IoMdClose, IoMdImages } from "react-icons/io";

const Gallery = ({ setShow, images, imageHandler, onSelectImage }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-[9999]">
      <div className="w-full h-full relative">
        {/* Overlay */}
        <div className="bg-gray-400 opacity-80 w-full h-full absolute top-0 left-0 z-[998]"></div>

        {/* Gallery Box */}
        <div className="absolute bg-white w-[50%] p-3 rounded-sm h-[85vh] overflow-y-auto left-[50%] top-[50%] z-[999] -translate-x-[50%] -translate-y-[50%]">
          {/* Header */}
          <div className="pb-3 flex justify-between items-center w-full">
            <h2 className="font-semibold text-lg">Gallery</h2>
            <div
              onClick={() => setShow(false)}
              className="cursor-pointer"
            >
              <IoMdClose className="text-red-500 text-3xl hover:text-red-600 hover:border-red-800 hover:border-2" />
            </div>
          </div>

          {/* Upload Button */}
          <div>
            <label
              htmlFor="galleryImages"
              className="w-full h-[180px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed"
            >
              <div className="flex justify-center items-center flex-col gap-y-2">
                <span className="text-2xl">
                  <IoMdImages />
                </span>
                <span className="text-sm">Select Images</span>
              </div>
            </label>
            <input
              onChange={imageHandler}
              type="file"
              multiple
              id="galleryImages"
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Recent Images */}
          <div className="mt-4">
            <h3 className="mb-2 font-semibold">Recent Uploaded Images</h3>
            <div className="grid grid-cols-4 gap-2">
              {images.length > 0 ? (
                images.map((img, i) => (
                  <div
                    className="cursor-pointer"
                    key={i}
                    onClick={() => {
                      onSelectImage(img.url);
                      setShow(false);
                    }}
                  >
                    <img
                      src={img.url}
                      alt="uploaded"
                      className="w-full h-[100px] object-cover rounded hover:opacity-75"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-4 text-center">
                  No images found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
