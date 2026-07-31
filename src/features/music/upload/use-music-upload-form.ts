"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState, AppDispatch } from "@/store";
import { uploadMusicThunk } from "@/redux/MusicSlice";
import { uploadSchema, type UploadFormData, GENRE_OPTIONS } from "./upload-schema";
import { resizeImage, createObjectUrl } from "./resize-image";

const AVATAR_MAX_WIDTH = 400;
const AVATAR_MAX_HEIGHT = 250;

export function useMusicUploadForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector((state: RootState) => state.music);

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [resizedPreview, setResizedPreview] = useState<string | null>(null);
  const [resizedAvatarFile, setResizedAvatarFile] = useState<File | null>(null);
  const [resizeError, setResizeError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema) as Resolver<UploadFormData>,
    defaultValues: {
      title: "",
      artist: "",
      genre: GENRE_OPTIONS[0],
      lyrics: "",
      file: undefined as unknown as File,
      avatar: undefined as unknown as File,
    },
  });

  // Cleanup when previews change
  useEffect(() => {
    return () => {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
      if (resizedPreview) {
        URL.revokeObjectURL(resizedPreview);
      }
    };
  }, [previewAvatar, resizedPreview]);

  const handleAvatarChange = useCallback(
    async (file: File | undefined) => {
      if (!file) {
        setPreviewAvatar(null);
        setResizedPreview(null);
        setResizedAvatarFile(null);
        setResizeError(null);
        setSubmitError(null);
        return;
      }

      // Revoke previous URLs
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
      if (resizedPreview) {
        URL.revokeObjectURL(resizedPreview);
      }

      try {
        // Create preview of original
        const originalPreview = createObjectUrl(file);
        setPreviewAvatar(originalPreview.url);

        // Resize the image
        const resizedFile = await resizeImage(file, AVATAR_MAX_WIDTH, AVATAR_MAX_HEIGHT);
        setResizedAvatarFile(resizedFile);

        // Create preview of resized
        const resizedPreviewObj = createObjectUrl(resizedFile);
        setResizedPreview(resizedPreviewObj.url);

        setResizeError(null);
      } catch (err) {
        setResizeError("Không thể resize ảnh. Vui lòng thử lại với ảnh khác.");
        console.error("Error resizing avatar:", err);
      }
    },
    [previewAvatar, resizedPreview]
  );

  const onSubmit = useCallback(
    async (data: UploadFormData) => {
      if (!data.file || !resizedAvatarFile) {
        setSubmitError(
          "Ảnh đại diện chưa được xử lý. Vui lòng chọn lại ảnh và đợi resize hoàn tất."
        );
        return;
      }

      setSubmitError(null);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("artist", data.artist);
      formData.append("genre", data.genre);
      formData.append("file", data.file);
      formData.append("avatar", resizedAvatarFile);
      formData.append("lyrics", data.lyrics || "");

      dispatch(uploadMusicThunk(formData));
    },
    [dispatch, resizedAvatarFile]
  );

  const resetForm = useCallback(() => {
    form.reset();
    setPreviewAvatar(null);
    setResizedPreview(null);
    setResizedAvatarFile(null);
    setResizeError(null);
  }, [form]);

  return {
    form,
    loading,
    success,
    error,
    previewAvatar,
    resizedPreview,
    resizeError,
    submitError,
    handleAvatarChange,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm,
    genreOptions: GENRE_OPTIONS,
  };
}