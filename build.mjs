import { build } from "esbuild"
import { glob } from "fs/promises"

const jsxOptions = {
  jsx: "transform",
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
}

// Step 1: transpile JSX → JS alongside source files (no bundling)
const jsxFiles = await Array.fromAsync(glob("**/*.jsx", {
  exclude: (p) => p.startsWith("node_modules"),
}))

await build({
  entryPoints: jsxFiles,
  bundle: false,
  format: "esm",
  ...jsxOptions,
  outExtension: { ".js": ".js" },
  allowOverwrite: true,
  outdir: ".",
})

// Step 2: bundle each subpath entry point into a self-contained ESM file
// written to dist/. Source index files are never overwritten.
//
// This inlines all internal cross-directory imports (e.g. ../utils/format.js)
// so CDN bundlers like jsDelivr don't fail traversing the package tree.
// All npm packages (react, xlsx, etc.) stay external — jsDelivr resolves
// react from its own CDN; xlsx is a dynamic import and resolves at runtime.
await build({
  entryPoints: {
    inputs: "inputs/index.js",
    ui: "ui/index.js",
    charts: "charts/index.js",
  },
  bundle: true,
  format: "esm",
  ...jsxOptions,
  packages: "external",
  outdir: "dist",
})
