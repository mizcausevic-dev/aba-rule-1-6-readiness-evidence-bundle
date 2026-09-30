import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validateProfile } from "../scripts/validate-profile.mjs";

const profile = JSON.parse(readFileSync(new URL("../profile.json", import.meta.url), "utf8"));

test("published profile has the documented structure and counts", () => {
  assert.deepEqual(validateProfile(profile), []);
});

test("duplicate evidence kinds are rejected", () => {
  const changed = structuredClone(profile);
  changed.obligation_families[1].required_evidence_kinds[0] =
    changed.obligation_families[0].required_evidence_kinds[0];
  assert.match(validateProfile(changed).join("; "), /duplicate evidence kind/);
});

test("missing family and evidence kind are rejected", () => {
  const changed = structuredClone(profile);
  changed.obligation_families.pop();
  assert.match(validateProfile(changed).join("; "), /expected 8 obligation families/);
  assert.match(validateProfile(changed).join("; "), /expected 35 evidence kinds/);
});

test("malformed profile is rejected", () => {
  assert.deepEqual(validateProfile(null), ["profile must be a JSON object"]);
});
