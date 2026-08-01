"use client";

import NextImage from "next/image";
import { useMusicUploadForm } from "@/features/music/upload/use-music-upload-form";
import { FormField, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, Upload, CheckCircle, AlertCircle, Music, Image as ImageIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function MusicUploadForm() {
  const {
    form,
    loading,
    success,
    error,
    previewAvatar,
    resizedPreview,
    resizeError,
    submitError,
    handleAvatarChange,
    onSubmit,
    genreOptions,
  } = useMusicUploadForm();

  const { register, formState, watch, setValue } = form;
  const { errors } = formState;

  return (
    <div className="max-w-xl mx-auto my-8 glass-panel rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl shadow-violet-950/40">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <div className="size-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/30 mb-3">
          <Upload className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Tải Lên Bài Hát Mới</h2>
        <p className="text-xs text-muted-foreground mt-1">Chia sẻ sản phẩm âm nhạc của bạn với cộng đồng nghe nhạc</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Title & Artist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            name="title"
            label="Tiêu đề bài hát"
            required
            error={errors.title}
          >
            <Input
              placeholder="Ví dụ: Lạc Trôi"
              className="bg-white/5 border-white/10 text-xs rounded-xl focus:border-violet-500"
              {...register("title")}
            />
          </FormField>

          <FormField
            name="artist"
            label="Tên nghệ sĩ / Ca sĩ"
            required
            error={errors.artist}
          >
            <Input
              placeholder="Ví dụ: Sơn Tùng M-TP"
              className="bg-white/5 border-white/10 text-xs rounded-xl focus:border-violet-500"
              {...register("artist")}
            />
          </FormField>
        </div>

        {/* Genre */}
        <FormField
          name="genre"
          label="Thể loại bài hát"
          required
          error={errors.genre}
        >
          <Select
            value={watch("genre")}
            onValueChange={(value) => {
              if (value) setValue("genre", value);
            }}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-xs rounded-xl">
              <SelectValue placeholder="Chọn thể loại thích hợp" />
            </SelectTrigger>
            <SelectContent className="glass-panel border-white/10 text-foreground">
              {genreOptions.map((genre) => (
                <SelectItem key={genre} value={genre} className="text-xs">
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        {/* Lyrics */}
        <FormField
          name="lyrics"
          label="Lời bài hát (Lyrics)"
          error={errors.lyrics}
        >
          <Textarea
            placeholder="Nhập lời bài hát từng dòng..."
            className="min-h-[100px] bg-white/5 border-white/10 text-xs rounded-xl focus:border-violet-500"
            {...register("lyrics")}
          />
        </FormField>

        {/* File & Avatar Drag/Drop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Music File */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Music className="h-3.5 w-3.5 text-violet-400" />
              File âm thanh (Audio) <span className="text-rose-500">*</span>
            </label>
            <div className="relative border-2 border-dashed border-white/15 hover:border-violet-500/50 rounded-2xl p-4 text-center bg-white/5 transition-colors cursor-pointer">
              <Input
                type="file"
                accept="audio/*"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("file", file, { shouldValidate: true });
                  }
                }}
              />
              <Music className="h-6 w-6 text-violet-400 mx-auto mb-1 opacity-75" />
              <p className="text-xs font-semibold text-white truncate">
                {watch("file") ? (watch("file") as File).name : "Chọn file nhạc"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">MP3, WAV, FLAC (Tối đa 50MB)</p>
            </div>
            {errors.file && <p className="text-[11px] text-rose-400">{errors.file.message}</p>}
          </div>

          {/* Avatar Image */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-indigo-400" />
              Ảnh bìa bài hát <span className="text-rose-500">*</span>
            </label>
            <div className="relative border-2 border-dashed border-white/15 hover:border-indigo-500/50 rounded-2xl p-4 text-center bg-white/5 transition-colors cursor-pointer">
              <Input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("avatar", file, { shouldValidate: true });
                    handleAvatarChange(file);
                  }
                }}
              />
              <ImageIcon className="h-6 w-6 text-indigo-400 mx-auto mb-1 opacity-75" />
              <p className="text-xs font-semibold text-white truncate">
                {watch("avatar") ? (watch("avatar") as File).name : "Chọn ảnh bìa"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">JPG, PNG, WEBP (400x250px)</p>
            </div>
            {errors.avatar && <p className="text-[11px] text-rose-400">{errors.avatar.message}</p>}
          </div>
        </div>

        {/* Previews */}
        {(previewAvatar || resizedPreview) && (
          <div className="p-3 rounded-2xl glass-panel border border-white/10 space-y-3">
            {resizedPreview && (
              <div>
                <p className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-violet-400" /> Xem trước ảnh bìa hiển thị (400x250px):
                </p>
                <NextImage
                  src={resizedPreview}
                  alt="Resized Preview"
                  width={400}
                  height={250}
                  className="w-full h-40 object-cover rounded-xl border border-white/10 shadow-lg"
                  unoptimized
                />
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 py-6 text-sm font-bold text-white shadow-xl shadow-violet-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Upload className="h-4 w-4 animate-spin" />
              Đang tải bài hát lên...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Đăng Tải Ngay
            </>
          )}
        </Button>

        {/* Success message */}
        {success && (
          <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>Tải bài hát lên hệ thống thành công!</span>
          </div>
        )}

        {/* Error message */}
        {(error || submitError || resizeError) && (
          <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error || submitError || resizeError}</span>
          </div>
        )}
      </form>
    </div>
  );
}