// src/components/music/musicForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { uploadMusicThunk } from "@/redux/MusicSlice";

const genres = [
  "Buồn",
  "Vui",
  "Rap",
  "Rock",
  "Pop",
  "Jazz",
  "Blues",
  "Country",
  "Hip-Hop",
  "Electronic",
];

const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return reject(new Error("Canvas context not available"));
      }

      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      // Resize canvas to new dimensions
      canvas.width = width; // Sửa lỗi: gán kích thước mới cho canvas
      canvas.height = height; // Sửa lỗi: gán kích thước mới cho canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Image resizing failed"));
          }
        },
        file.type,
        1 // Sử dụng quality = 1 để giữ nguyên chất lượng ảnh
      );
    };

    img.onerror = (e) => {
      console.error("Error loading image:", e); // Xử lý lỗi khi load ảnh
      reject(new Error("Error loading image"));
    };

    reader.readAsDataURL(file);
  });
};

const MusicForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState(genres[0]);
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [lyrics, setLyrics] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [resizedPreview, setResizedPreview] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector((state: RootState) => state.music);

  useEffect(() => {
    // Show an alert when the user enters the page
    alert(
      "Hình ảnh sẽ được phóng to hoặc thu nhỏ kích thước 400 x 250px để trưng bày. Mong bạn chọn hình ảnh vừa khung để ưng ý!"
    );
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      try {
        setPreviewAvatar(URL.createObjectURL(selectedFile));
        const resizedFile = await resizeImage(selectedFile, 400, 250);
        setAvatar(resizedFile);

        // Create a preview of the resized image
        const reader = new FileReader();
        reader.onload = () => {
          setResizedPreview(reader.result as string);
        };
        reader.readAsDataURL(resizedFile);
      } catch (err) {
        alert("Error resizing avatar image: " + err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !avatar) {
      alert("Please select both music file and avatar image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append("file", file);
    formData.append("avatar", avatar);
    formData.append("lyrics", lyrics);

    dispatch(uploadMusicThunk(formData));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Upload Music</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-800">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Artist */}
        <div className="mb-6">
          <label htmlFor="artist" className="block text-sm font-medium text-gray-800">
            Artist
          </label>
          <input
            type="text"
            id="artist"
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>

        {/* Genre */}
        <div className="mb-6">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-800">
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Lyrics */}
        <div className="mb-6">
          <label htmlFor="lyrics" className="block text-sm font-medium text-gray-800">
            Lyrics
          </label>
          <textarea
            id="lyrics"
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            rows={5}
          />
        </div>

        {/* Music File */}
        <div className="mb-6">
          <label htmlFor="file" className="block text-sm font-medium text-gray-800">
            Music File
          </label>
          <input
            type="file"
            id="file"
            className="mt-2 block w-full p-3 text-gray-800"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>

        {/* Avatar */}
        <div className="mb-6">
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-800">
            Avatar Image
          </label>
          <input
            type="file"
            id="avatar"
            className="mt-2 block w-full p-3 text-gray-800"
            onChange={handleAvatarChange}
            required
          />
        </div>

        {/* Previews */}
        <div className="mb-6">
          {previewAvatar && (
            <div>
              <p className="text-gray-800 font-medium mb-2">Original Image Preview:</p>
              <img src={previewAvatar} alt="Original Preview" className="mb-4 w-full h-auto rounded-lg" />
            </div>
          )}
          {resizedPreview && (
            <div>
              <p className="text-gray-800 font-medium mb-2">Resized Image Preview:</p>
              <img src={resizedPreview} alt="Resized Preview" className="mb-4 w-full h-auto rounded-lg" />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Success/Error Messages */}
      {success && <p className="text-green-600 mt-4 text-center">File uploaded successfully!</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default MusicForm;
