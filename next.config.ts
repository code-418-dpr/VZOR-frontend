import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["localhost", "minio"],
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
