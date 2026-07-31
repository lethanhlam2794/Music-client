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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Upload, CheckCircle, AlertCircle } from "lucide-react";
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
    <Card className="max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Tải lên bài hát
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Title */}
          <FormField
            name="title"
            label="Tiêu đề"
            required
            error={errors.title}
          >
            <Input
              placeholder="Nhập tiêu đề bài hát"
              {...register("title")}
            />
          </FormField>

          {/* Artist */}
          <FormField
            name="artist"
            label="Nghệ sĩ"
            required
            error={errors.artist}
          >
            <Input
              placeholder="Nhập tên nghệ sĩ"
              {...register("artist")}
            />
          </FormField>

          {/* Genre */}
          <FormField
            name="genre"
            label="Thể loại"
            required
            error={errors.genre}
          >
            <Select
              value={watch("genre")}
              onValueChange={(value) => {
                if (value) setValue("genre", value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn thể loại" />
              </SelectTrigger>
              <SelectContent>
                {genreOptions.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Lyrics */}
          <FormField
            name="lyrics"
            label="Lời bài hát"
            error={errors.lyrics}
          >
            <Textarea
              placeholder="Nhập lời bài hát (tùy chọn)"
              className="min-h-[120px]"
              {...register("lyrics")}
            />
          </FormField>

          {/* Music File */}
          <FormField
            name="file"
            label="File nhạc"
            required
            error={errors.file}
          >
            <Input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("file", file, { shouldValidate: true });
                }
              }}
            />
            <FormDescription>
              Hỗ trợ: MP3, WAV, OGG, FLAC, AAC (tối đa 50MB)
            </FormDescription>
          </FormField>

          {/* Avatar */}
          <FormField
            name="avatar"
            label="Ảnh đại diện"
            required
            error={errors.avatar}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("avatar", file, { shouldValidate: true });
                  handleAvatarChange(file);
                }
              }}
            />
            <FormDescription>
              Hỗ trợ: JPG, PNG, WEBP, GIF (tối đa 10MB)
            </FormDescription>
          </FormField>

          {/* Avatar size info */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border">
            <Info className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Ảnh sẽ được resize về kích thước 400x250px để trưng bày. Vui lòng chọn ảnh phù hợp để có kết quả tốt nhất.
            </p>
          </div>

          {/* Resize error */}
          {resizeError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-destructive" />
              <p className="text-sm text-destructive">{resizeError}</p>
            </div>
          )}

          {/* Previews */}
          {(previewAvatar || resizedPreview) && (
            <div className="space-y-4">
              {previewAvatar && (
                <div>
                  <p className="text-sm font-medium mb-2">Ảnh gốc:</p>
                  <NextImage
                    src={previewAvatar}
                    alt="Original Preview"
                    width={400}
                    height={250}
                    className="w-full h-auto rounded-lg border"
                    unoptimized
                  />
                </div>
              )}
              {resizedPreview && (
                <div>
                  <p className="text-sm font-medium mb-2">Ảnh sau resize (400x250):</p>
                  <NextImage
                    src={resizedPreview}
                    alt="Resized Preview"
                    width={400}
                    height={250}
                    className="w-full h-auto rounded-lg border"
                    unoptimized
                  />
                </div>
              )}
            </div>
          )}

          {/* Submit button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Đang tải lên...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Tải lên
              </>
            )}
          </Button>

          {/* Success message */}
          {success && (
            <div className={cn(
              "flex items-start gap-2 p-3 rounded-lg border",
              "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
            )}>
              <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
              <p className="text-sm text-green-800 dark:text-green-200">
                Tải lên thành công!
              </p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Submit error (e.g. avatar resize failed) */}
          {submitError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-destructive" />
              <p className="text-sm text-destructive">{submitError}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}