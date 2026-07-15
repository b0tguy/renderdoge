import { cp, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

const { uvPath } = await import("@titaniumnetwork-dev/ultraviolet");
const { baremuxPath } = await import("@mercuryworkshop/bare-mux/node");
const { bareModulePath } = await import("@mercuryworkshop/bare-as-module3");
const { epoxyPath } = await import("@mercuryworkshop/epoxy-transport");

const targets = [
  { src: uvPath, dest: join(dist, "uv"), filter: (p) => !p.endsWith("uv.config.js") },
  { src: baremuxPath, dest: join(dist, "baremux") },
  { src: bareModulePath, dest: join(dist, "baremod") },
  { src: epoxyPath, dest: join(dist, "epoxy") },
];

for (const { src, dest, filter } of targets) {
  await mkdir(dest, { recursive: true });
  await cp(src, dest, { recursive: true, force: true, filter });
  console.log(`Copied ${src} -> ${dest}`);
}

console.log("Static proxy assets ready for a fully static deploy (e.g. GitHub Pages).");
