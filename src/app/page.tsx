import Request from "@/components/Request";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Next.js + FastAPI</h1>
      <Request />
      <Image
        src="/nextjs-fastapi.png"
        alt="Next.js + FastAPI"
        width={800}
        height={400}
      />
    </div>
  );
}
