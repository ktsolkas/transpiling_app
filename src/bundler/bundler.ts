import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let esbuildInitialized = false;
const bundle = async (rawCode: string) => {
  if (!esbuildInitialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: "esbuild.wasm",
    });
    esbuildInitialized = true;
  }

  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      //   define: { 'process.env.NODE_ENV': '"production"', global: 'window' }
    });
    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (err: any) {
    return {
      code: "",
      err: err.message,
    };
  }
};

export default bundle;