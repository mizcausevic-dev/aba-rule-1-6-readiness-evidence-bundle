import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const EXPECTED_FAMILIES = 8;
const EXPECTED_EVIDENCE_KINDS = 35;

export function validateProfile(profile) {
  const errors = [];
  if (!profile || typeof profile !== "object" || Array.isArray(profile)) {
    return ["profile must be a JSON object"];
  }
  if (profile.evidence_bundle_profile_version !== "0.1") {
    errors.push("evidence_bundle_profile_version must be 0.1");
  }
  for (const field of ["profile_id", "title", "purpose"]) {
    if (typeof profile[field] !== "string" || !profile[field].trim()) {
      errors.push(`${field} must be a non-empty string`);
    }
  }
  if (!Array.isArray(profile.obligation_families)) {
    errors.push("obligation_families must be an array");
    return errors;
  }
  if (profile.obligation_families.length !== EXPECTED_FAMILIES) {
    errors.push(`expected ${EXPECTED_FAMILIES} obligation families`);
  }
  const codes = new Set();
  const kinds = new Set();
  let evidenceCount = 0;
  profile.obligation_families.forEach((family, index) => {
    const label = `obligation_families[${index}]`;
    if (!family || typeof family !== "object" || Array.isArray(family)) {
      errors.push(`${label} must be an object`);
      return;
    }
    for (const field of ["code", "title", "citation", "summary"]) {
      if (typeof family[field] !== "string" || !family[field].trim()) {
        errors.push(`${label}.${field} must be a non-empty string`);
      }
    }
    if (typeof family.code === "string") {
      if (codes.has(family.code)) errors.push(`duplicate family code: ${family.code}`);
      codes.add(family.code);
    }
    if (!Array.isArray(family.required_evidence_kinds) ||
        family.required_evidence_kinds.length === 0) {
      errors.push(`${label}.required_evidence_kinds must be a non-empty array`);
      return;
    }
    for (const kind of family.required_evidence_kinds) {
      evidenceCount++;
      if (typeof kind !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(kind)) {
        errors.push(`${label} has an invalid evidence-kind identifier`);
      } else {
        if (kinds.has(kind)) errors.push(`duplicate evidence kind: ${kind}`);
        kinds.add(kind);
      }
    }
  });
  if (evidenceCount !== EXPECTED_EVIDENCE_KINDS) {
    errors.push(`expected ${EXPECTED_EVIDENCE_KINDS} evidence kinds, got ${evidenceCount}`);
  }
  return errors;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const file = process.argv[2] ?? "profile.json";
  try {
    const profile = JSON.parse(readFileSync(file, "utf8"));
    const errors = validateProfile(profile);
    if (errors.length) {
      for (const error of errors) console.error(`FAIL: ${error}`);
      process.exitCode = 1;
    } else {
      console.log(`OK: ${EXPECTED_FAMILIES} issue families, ${EXPECTED_EVIDENCE_KINDS} evidence kinds`);
    }
  } catch (error) {
    console.error(`FAIL: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
