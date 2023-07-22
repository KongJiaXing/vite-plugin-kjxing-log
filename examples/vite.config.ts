import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginKjxingLog from "vite-plugin-kjxing-log";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VitePluginKjxingLog({
          all: false,
          modular: ["system", "login"],
          withBaseStyle: false,
          styles: [
              {
                  paddingTop: 2,
                  paddingRight: 5,
                  paddingBottom: 2,
                  paddingLeft: 5,
                  borderRadius: 10,
                  fontWeight: 700,
                  color: '#fff',
                  background: '#484848'
              }
          ]
      })
  ],
})
