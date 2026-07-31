import Image from "next/image";

export function GocChuaLanh(){
    return(
        <div className="w-full h-[40vh] mb-6 rounded-lg overflow-hidden">
        <Image
          src="/GocChuaLanh.png"
          alt="Chủ đề và thể loại"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    )
}
