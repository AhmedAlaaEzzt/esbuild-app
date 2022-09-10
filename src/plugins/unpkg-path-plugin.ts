import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      console.log("setup function @@");
      console.log("build", build);

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        return { path: args.path, namespace: "a" };
      });



      
    },
  };
};



/**
 * index.js
 * import message from './message';
 * console.log(message);
 * 
 * massage.js
 * export default "hi there!"
 */