import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { validateProfile } from "./validate-profile.mjs";

const FIXTURE_DIR = new URL("../fixtures/synthetic-bundle/", import.meta.url);

function contentPaths(dir, base = dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    const entry = lstatSync(path);
    if (entry.isSymbolicLink()) throw new Error(`fixture content must not contain symlinks: ${path}`);
    if (entry.isDirectory()) return contentPaths(path, base);
    if (!entry.isFile()) throw new Error(`fixture content must contain regular files only: ${path}`);
    return [relative(base, path).split(sep).join("/")];
  }).sort();
}

export function validateBuilderFixture(profile, meta, paths) {
  const errors = validateProfile(profile);
  if (errors.length) return errors;
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) {
    return ["fixture metadata must be an object"];
  }
  if (!meta.bundle || meta.bundle.labels?.profile_id !== profile.profile_id ||
      meta.bundle.labels?.synthetic !== "true") {
    errors.push("bundle must identify this profile and declare synthetic content");
  }
  const ids = meta.itemIds;
  const metadata = meta.itemMetadata;
  if (!ids || typeof ids !== "object" || Array.isArray(ids) ||
      !metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return [...errors, "itemIds and itemMetadata must be objects"];
  }
  if (paths.length === 0) errors.push("fixture content must not be empty");
  if (JSON.stringify(Object.keys(ids).sort()) !== JSON.stringify([...paths].sort())) {
    errors.push("itemIds must map every content file and no other path");
  }
  const kinds = new Set(profile.obligation_families.flatMap((family) => family.required_evidence_kinds));
  const itemIds = Object.values(ids);
  if (new Set(itemIds).size !== itemIds.length ||
      itemIds.some((id) => typeof id !== "string" || !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(id))) {
    errors.push("itemIds must be unique, valid bundle item identifiers");
  }
  if (JSON.stringify(Object.keys(metadata).sort()) !== JSON.stringify([...itemIds].sort())) {
    errors.push("itemMetadata must describe each mapped item and no other item");
  }
  for (const id of itemIds) {
    const item = metadata[id];
    if (!item || typeof item.description !== "string" || !item.description.trim() ||
        item.labels?.profile_id !== profile.profile_id || item.labels?.synthetic !== "true" ||
        !kinds.has(item.labels?.evidence_kind)) {
      errors.push(`itemMetadata.${id} must have a description, valid profile evidence kind, and synthetic label`);
    }
  }
  return errors;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    const profile = JSON.parse(readFileSync(new URL("../profile.json", import.meta.url), "utf8"));
    const meta = JSON.parse(readFileSync(new URL("meta.json", FIXTURE_DIR), "utf8"));
    const paths = contentPaths(fileURLToPath(new URL("content/", FIXTURE_DIR)));
    const errors = validateBuilderFixture(profile, meta, paths);
    if (errors.length) {
      for (const error of errors) console.error(`FAIL: ${error}`);
      process.exitCode = 1;
    } else {
      console.log(`OK: ${paths.length} synthetic content items map to profile evidence kinds`);
    }
  } catch (error) {
    console.error(`FAIL: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
