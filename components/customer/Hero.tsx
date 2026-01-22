import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full">
      <div
        className="
        relative
        w-full
        aspect-video [aspectRatio:16/5]
        max-h-90
        overflow-hidden
        rounded-4xl
      "
      >
        <Image
          src="/images/Hero.png"
          alt="Collection Atoum-ra"
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
