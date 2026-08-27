const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const read = (relPath) => fs.readFileSync(path.join(root, relPath), "utf8");
const exists = (relPath) => fs.existsSync(path.join(root, relPath));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const failures = [];

const scripts = JSON.parse(read("package.json")).scripts || {};
for (const forbiddenScript of ["build:css", "build:tailwind", "build:tailwind:watch"]) {
  if (Object.prototype.hasOwnProperty.call(scripts, forbiddenScript)) {
    failures.push(`Starter package.json must not define \`${forbiddenScript}\`; build ownership belongs to gem repos.`);
  }
}

const config = read("_config.yml");
for (const required of ["al_folio_core", "al_folio_distill", "al_cookie", "al_icons", "al_math"]) {
  if (!new RegExp(`^\\s*-\\s*${escapeRegExp(required)}\\s*$`, "m").test(config)) {
    failures.push(`\`_config.yml\` plugins must include \`${required}\`.`);
  }
}
if (!/^\s*theme:\s*al_folio_core\s*$/m.test(config)) {
  failures.push("`_config.yml` must keep `theme: al_folio_core` for thin-starter wiring.");
}

for (const libraryKey of ["fontawesome", "academicons", "scholar-icons"]) {
  if (!new RegExp(`^\\s{2}${escapeRegExp(libraryKey)}:\\s*$`, "m").test(config)) {
    failures.push(`\`_config.yml\` must define \`third_party_libraries.${libraryKey}\`.`);
  }
}

for (const forbiddenPath of ["_includes", "_layouts", "_sass", "_scripts", "assets/tailwind", "tailwind.config.js", "assets/webfonts"]) {
  if (exists(forbiddenPath)) {
    failures.push(`Starter must not own core component path \`${forbiddenPath}\`.`);
  }
}

if (failures.length > 0) {
  console.error("Starter style contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Starter style contract check passed.");
