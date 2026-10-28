// Standalone pages kept as the self-contained HTML they were built as, served at a clean URL.
const STATIC_PAGES = ['learning-marketing', 'how-ai-tutor-talk', 'learning-technologies'];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return STATIC_PAGES.map(slug => ({ source: `/${slug}`, destination: `/pages/${slug}.html` }));
  },
};

export default nextConfig;
