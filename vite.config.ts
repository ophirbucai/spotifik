import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
      include: "**/*.svg"
    })
  ],
  server: {
    proxy: {
      ...mode === "development" ? {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true
        }
      } : {},
      "/images": {
        target: "https://i.ytimg.com/vi/",
        changeOrigin: true,
        rewrite: path => (path.replace(/^\/images/, "") + "/mqdefault.jpg")
      },
      "/thumb": {
        target: "https://is1-ssl.mzstatic.com/image/thumb/",
        changeOrigin: true,
        rewrite: path => (path.replace(/^\/thumb/, ""))
        /*+ '/source/100x100bb.jpg')*/
      }
    }
  },
  build: {
    outDir: "../song-server/public"
  }
}));
