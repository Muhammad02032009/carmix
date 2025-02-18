/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.hgmsites.net",
      "encrypted-tbn0.gstatic.com",
      "tribaltribune.org",
      "resizing.flixster.com",
      "static.wikia.nocookie.net",
      "upload.wikimedia.org",
      "m.media-amazon.com",
      "www.iihs.org",
      "media.toyota.co.uk",
      "s1.cdn.autoevolution.com",
      "di-uploads-pod24.dealerinspire.com"
    ],
  },
};

module.exports = nextConfig;
