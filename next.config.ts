import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "9000",
                pathname: "/vzor/**",
            },
            {
                protocol: "http",
                hostname: "minio",
                port: "9000",
                pathname: "/vzor/**",
            },
        ],
    },
};

export default nextConfig;
