// libs/web/shared/vite.config.mts
import { defineConfig } from "file:///C:/Users/maxos/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/diary-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/maxos/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/diary-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///C:/Users/maxos/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/diary-app/node_modules/vite-plugin-dts/dist/index.mjs";
import * as path from "path";
import { nxViteTsPaths } from "file:///C:/Users/maxos/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/diary-app/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "c:\\Users\\maxos\\OneDrive\\\u0420\u0430\u0431\u043E\u0447\u0438\u0439 \u0441\u0442\u043E\u043B\\diary-app\\libs\\web\\shared";
var vite_config_default = defineConfig({
  root: __vite_injected_original_dirname,
  cacheDir: "../../../node_modules/.vite/libs/web/shared",
  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: "src",
      tsConfigFilePath: path.join(__vite_injected_original_dirname, "tsconfig.lib.json"),
      skipDiagnostics: true
    })
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: "../../../dist/libs/web/shared",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "shared",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ["react", "react-dom", "react/jsx-runtime"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicy93ZWIvc2hhcmVkL3ZpdGUuY29uZmlnLm10cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcImM6XFxcXFVzZXJzXFxcXG1heG9zXFxcXE9uZURyaXZlXFxcXFx1MDQyMFx1MDQzMFx1MDQzMVx1MDQzRVx1MDQ0N1x1MDQzOFx1MDQzOSBcdTA0NDFcdTA0NDJcdTA0M0VcdTA0M0JcXFxcZGlhcnktYXBwXFxcXGxpYnNcXFxcd2ViXFxcXHNoYXJlZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiYzpcXFxcVXNlcnNcXFxcbWF4b3NcXFxcT25lRHJpdmVcXFxcXHUwNDIwXHUwNDMwXHUwNDMxXHUwNDNFXHUwNDQ3XHUwNDM4XHUwNDM5IFx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQzQlxcXFxkaWFyeS1hcHBcXFxcbGlic1xcXFx3ZWJcXFxcc2hhcmVkXFxcXHZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYzovVXNlcnMvbWF4b3MvT25lRHJpdmUvJUQwJUEwJUQwJUIwJUQwJUIxJUQwJUJFJUQxJTg3JUQwJUI4JUQwJUI5JTIwJUQxJTgxJUQxJTgyJUQwJUJFJUQwJUJCL2RpYXJ5LWFwcC9saWJzL3dlYi9zaGFyZWQvdml0ZS5jb25maWcubXRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9J3ZpdGVzdCcgLz5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBueFZpdGVUc1BhdGhzIH0gZnJvbSAnQG54L3ZpdGUvcGx1Z2lucy9ueC10c2NvbmZpZy1wYXRocy5wbHVnaW4nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByb290OiBfX2Rpcm5hbWUsXG4gIGNhY2hlRGlyOiAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy52aXRlL2xpYnMvd2ViL3NoYXJlZCcsXG5cbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbnhWaXRlVHNQYXRocygpLFxuICAgIGR0cyh7XG4gICAgICBlbnRyeVJvb3Q6ICdzcmMnLFxuICAgICAgdHNDb25maWdGaWxlUGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ3RzY29uZmlnLmxpYi5qc29uJyksXG4gICAgICBza2lwRGlhZ25vc3RpY3M6IHRydWUsXG4gICAgfSksXG4gIF0sXG5cbiAgLy8gVW5jb21tZW50IHRoaXMgaWYgeW91IGFyZSB1c2luZyB3b3JrZXJzLlxuICAvLyB3b3JrZXI6IHtcbiAgLy8gIHBsdWdpbnM6IFsgbnhWaXRlVHNQYXRocygpIF0sXG4gIC8vIH0sXG5cbiAgLy8gQ29uZmlndXJhdGlvbiBmb3IgYnVpbGRpbmcgeW91ciBsaWJyYXJ5LlxuICAvLyBTZWU6IGh0dHBzOi8vdml0ZWpzLmRldi9ndWlkZS9idWlsZC5odG1sI2xpYnJhcnktbW9kZVxuICBidWlsZDoge1xuICAgIG91dERpcjogJy4uLy4uLy4uL2Rpc3QvbGlicy93ZWIvc2hhcmVkJyxcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcbiAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLFxuICAgIH0sXG4gICAgbGliOiB7XG4gICAgICAvLyBDb3VsZCBhbHNvIGJlIGEgZGljdGlvbmFyeSBvciBhcnJheSBvZiBtdWx0aXBsZSBlbnRyeSBwb2ludHMuXG4gICAgICBlbnRyeTogJ3NyYy9pbmRleC50cycsXG4gICAgICBuYW1lOiAnc2hhcmVkJyxcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxuICAgICAgLy8gQ2hhbmdlIHRoaXMgdG8gdGhlIGZvcm1hdHMgeW91IHdhbnQgdG8gc3VwcG9ydC5cbiAgICAgIC8vIERvbid0IGZvcmdldCB0byB1cGRhdGUgeW91ciBwYWNrYWdlLmpzb24gYXMgd2VsbC5cbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBFeHRlcm5hbCBwYWNrYWdlcyB0aGF0IHNob3VsZCBub3QgYmUgYnVuZGxlZCBpbnRvIHlvdXIgbGlicmFyeS5cbiAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC9qc3gtcnVudGltZSddLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLFlBQVksVUFBVTtBQUN0QixTQUFTLHFCQUFxQjtBQUw5QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFFVixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxJQUFJO0FBQUEsTUFDRixXQUFXO0FBQUEsTUFDWCxrQkFBdUIsVUFBSyxrQ0FBVyxtQkFBbUI7QUFBQSxNQUMxRCxpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1Isc0JBQXNCO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsTUFDZix5QkFBeUI7QUFBQSxJQUMzQjtBQUFBLElBQ0EsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUE7QUFBQTtBQUFBLE1BR1YsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQSxNQUViLFVBQVUsQ0FBQyxTQUFTLGFBQWEsbUJBQW1CO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
