import Image from "next/image";
import Link from "next/link";
import HeroImage from "../../public/hero.jpeg";

export default function Hero() {
  return (
    <section className="bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-2">

        {/* Left Content */}
        <div>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            Hi, I&apos;m <span className="text-[#D4AF37]">Ahmad</span> <br />
            Brown.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-400">
            I'm a retired United States Navy veteran who found a new mission behind the lens.
            <br></br>
            After years of service, I settled in Jacksonville, Florida, where I turned my lifelong passion for storytelling into photography and videography.
            <br></br>
            I specialize in capturing authentic moments and high-impact visuals that tell real stories and preserve memories that matter.
          </p>

          {/* <div className="mt-8 flex items-center gap-4">
            <Link
              href="/portfolio"
              className="rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              View Portfolio
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-[#D4AF37] px-6 py-3 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
            >
              Contact Me
            </Link>
          </div> */}
        </div>

        {/* Right Image */}
        <div className="relative h-[420px] md:h-[600px] md:-mr-24">
          <Image
            src={HeroImage}
            alt="Madi Visuals photographer holding camera"
            fill
            priority
            className="rounded-xl object-cover"
          />
        </div>

      </div>
    </section>
  );
}
