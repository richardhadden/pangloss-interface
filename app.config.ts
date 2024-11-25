import UnpluginTypia from "@ryoppippi/unplugin-typia/vite";
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    plugins: [
      UnpluginTypia({
        enforce: "pre",
        cache: true,
        include: ["./src/*.ts", "./src/*.tsx"],
      }),
    ],
  },
});
