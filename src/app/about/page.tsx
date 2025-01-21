import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-20 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">About Carmix</h1>
      <div className="grid md:grid-cols-2 gap-4 items-center">
        <div>
          <Image
            src="/about.webp"
            alt="Carmix Showroom"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-6">
            Carmix is a leading automotive company dedicated to providing exceptional vehicles that combine luxury, performance, and innovation. With years of experience in the industry, we have established ourselves as a trusted name in the world of automobiles.
          </p>
          <p className="text-lg mb-6">
            Our mission is to revolutionize the driving experience by offering a diverse range of high-quality vehicles that cater to the unique needs and preferences of our customers. From sleek sports cars to eco-friendly electric vehicles, we have something for every car enthusiast.
          </p>
          <p className="text-lg">
            At Carmix, we believe in pushing the boundaries of automotive technology while maintaining our commitment to sustainability and environmental responsibility. Join us on our journey to shape the future of transportation.
          </p>
        </div>
      </div>
    </div>
  )
}

