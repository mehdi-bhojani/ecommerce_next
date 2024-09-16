/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.pexels.com",
      "d30fs77zq6vq2v.cloudfront.net",
    ],
  },
  // experimental: {
  //   appDir: true,
  // },
};

export default nextConfig;
