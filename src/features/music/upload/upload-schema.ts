import { z } from "zod";

const ACCEPTED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/flac",
  "audio/aac",
  "audio/m4a",
  "audio/x-m4a",
];

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB for audio
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB for images

export const uploadSchema = z.object({
  title: z
    .string()
    .min(1, "Tiêu đề là bắt buộc")
    .max(200, "Tiêu đề không được vượt quá 200 ký tự"),
  artist: z
    .string()
    .min(1, "Nghệ sĩ là bắt buộc")
    .max(200, "Nghệ sĩ không được vượt quá 200 ký tự"),
  genre: z.string().min(1, "Thể loại là bắt buộc"),
  lyrics: z.string().max(10000, "Lời bài hát không được vượt quá 10000 ký tự").default(""),
  file: z
    .instanceof(File, { message: "File nhạc là bắt buộc" })
    .refine((file) => ACCEPTED_AUDIO_TYPES.includes(file.type), {
      message: "Định dạng file không hợp lệ. Hỗ trợ: MP3, WAV, OGG, FLAC, AAC",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File nhạc không được vượt quá 50MB",
    }),
  avatar: z
    .instanceof(File, { message: "Ảnh đại diện là bắt buộc" })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Định dạng ảnh không hợp lệ. Hỗ trợ: JPG, PNG, WEBP, GIF",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: "Ảnh không được vượt quá 10MB",
    }),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

export const GENRE_OPTIONS = [
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
] as const;

export type GenreOption = (typeof GENRE_OPTIONS)[number];