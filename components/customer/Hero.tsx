import Image from "next/image"


export default function Hero() {

  return (
    <div className="hero h-[25vh] mb-10 ">
      <Image
        src="/images/Hero.png"
        alt="Collection Atoum-ra"
        className="object-cover rounded-4xl"
        width={1200}
        height={300}
      />

    </div>
  )
};



