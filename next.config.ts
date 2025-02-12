/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.hgmsites.net', 
      'encrypted-tbn0.gstatic.com', 
      'tribaltribune.org', 
      'resizing.flixster.com',
      'static.wikia.nocookie.net', 
      'upload.wikimedia.org', 
         'm.media-amazon.com'
    ],
  },
};

module.exports = nextConfig;
