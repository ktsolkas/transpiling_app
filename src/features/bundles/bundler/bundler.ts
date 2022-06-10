import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkgPathPlugin";
import { fetchPlugin } from "./plugins/fetchPlugin";

let esbuildInitialized = false;
const bundle = async (rawCode: string) => {
  if (!esbuildInitialized) {
    console.log(1);
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
