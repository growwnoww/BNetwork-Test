// next.config.js
const nextConfig = {
    images: {
        domains: ["restcountries.com", "upload.wikimedia.org", "flagcdn.com","via.placeholder.com"],
    },
    reactStrictMode: true,

    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
};

module.exports = nextConfig;
