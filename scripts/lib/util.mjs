import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, "..", "..");
export const PUBLIC_DATA = path.join(ROOT, "public", "data");
export const CACHE = path.join(ROOT, "data-cache");

export function readJson(file, fallback = null) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return fallback; }
}

export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}

// Writes a browser data file: a comment header plus `window.NAME = {...};`
export function writeDataFile(file, varName, data, note) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const header = [
    "// GENERATED FILE — do not edit by hand. " + (note || ""),
    "// Written " + new Date().toISOString() + " by the Halftime data pipeline.",
    "",
  ].join("\n");
  fs.writeFileSync(file, header + "window." + varName + " = " + JSON.stringify(data, null, 2) + ";\n");
}

export function log(...args) { console.log("[" + new Date().toISOString().slice(11, 19) + "]", ...args); }

export function hoursAgo(iso) { return (Date.now() - new Date(iso).getTime()) / 36e5; }

// Season start year as API-Football counts it: a European season that
// starts in August 2026 is "2026" until the following June.
export function currentSeason(now = new Date()) {
  return now.getUTCMonth() >= 6 ? now.getUTCFullYear() : now.getUTCFullYear() - 1;
}

export function slug(s) {
  return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
