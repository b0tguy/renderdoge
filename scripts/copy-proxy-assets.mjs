// Copies the proxy engine's client-side static assets into public/ BEFORE `vite build` runs.
// These normally get served on-the-fly from node_modules by server.js (via @fastify/static),
// which works fine when the frontend and backend are the same origin/server.
// A static-only host (GitHub Pages, jsdelivr, etc.) has no server process to do that serving,
// so this script makes them real files inside public/ before the build — which also lets
// Vite's own HTML processor correctly prefix every reference to them with `base`, the same
// way it already does for files that were already in public/ (e.g. public/scram, public/uv/uv.config.js).
import { cp, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(root, "public");

const { uvPath } = await import("@titaniumnetwork-dev/ultraviolet");
const { baremuxPath } = await import("@mercuryworkshop/bare-mux/node");
const { bareModulePath } = await import("@mercuryworkshop/bare-as-module3");
const { epoxyPath } = await import("@mercuryworkshop/epoxy-transport");

const targets = [
  { src: uvPath, dest: join(publicDir, "uv"), filter: (p) => !p.endsWith("uv.config.js") },
  { src: baremuxPath, dest: join(publicDir, "baremux") },
  { src: bareModulePath, dest: join(publicDir, "baremod") },
  { src: epoxyPath, dest: join(publicDir, "epoxy") },
];

for (const { src, dest, filter } of targets) {
  await mkdir(dest, { recursive: true });
  await cp(src, dest, { recursive: true, force: true, filter });
  console.log(`Copied ${src} -> ${dest}`);
}

console.log("Proxy engine assets staged in public/ — ready for `vite build`.");
