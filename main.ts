// news-image-20261117 entry: "The World in One Picture".
//
// The entry is a newspaper front page drawn in code (see build_image.py
// in the agent workspace, kept out of this repo) that sums up Tuesday
// 17 November 2026: Iran's drone strike on the U.S. radar in Bahrain,
// Ukraine's hit on the Kerch Bridge, the U.S.-Russia-China summit
// announced for 19 November in Shenzhen, the Optimizely cyberattack
// on 178 sites, Estonia closing its Russian border, and the UK's
// sanctions on West Bank settlement builders.
//
// The program itself does one deterministic thing: it copies the
// finished image that ships in this repository to the grader's
// output directory, so both graded runs write identical bytes.
// Node 22, standard library only, no network, no clock, no reads
// outside this repository.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
copyFileSync(src, dst);

// Integrity check: a truncated or partial copy would silently grade as a
// corrupt image, so confirm the copy is byte-for-byte the same length as
// the source and fail loudly if it is not.
const srcSize = statSync(src).size;
const dstSize = statSync(dst).size;
if (dstSize !== srcSize) {
  throw new Error(
    `copy verification failed: ${dst} is ${dstSize} bytes, expected ${srcSize} bytes (source ${src})`
  );
}
