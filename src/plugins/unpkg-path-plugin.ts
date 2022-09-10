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

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        

        
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import message from './message';
              console.log(message);
            `,
          };
        } else {
          return {
            loader: "jsx",
            contents: 'export default "hi there!"',
          };
        }

        
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
