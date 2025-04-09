import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Make My Team",
    short_name: "MakeMyTeam",
    description: "AI assistant for HR to form teams based on available resources",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0f2c",
    theme_color: "#0c0f2c",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
