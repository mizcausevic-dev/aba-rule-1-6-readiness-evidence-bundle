import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validateBuilderFixture } from "../scripts/validate-builder-fixture.mjs";

const profile = JSON.parse(readFileSync(new URL("../profile.json", import.meta.url), "utf8"));
const meta = JSON.parse(readFileSync(new URL("../fixtures/synthetic-bundle/meta.json", import.meta.url), "utf8"));
const paths = ["fictional-ai-use-policy.md", "fictional-vendor-review.md"];

test("synthetic fixture maps every content item to a declared profile evidence kind", () => {
  assert.deepEqual(validateBuilderFixture(profile, meta, paths), []);
});

test("rejects a stale evidence-kind mapping", () => {
  const changed = structuredClone(meta);
  changed.itemMetadata["synthetic-policy"].labels.evidence_kind = "not-in-profile";
  assert.match(validateBuilderFixture(profile, changed, paths).join("; "), /valid profile evidence kind/);
});

test("rejects missing content mappings and synthetic labels", () => {
  const changed = structuredClone(meta);
  delete changed.itemIds["fictional-vendor-review.md"];
  changed.bundle.labels.synthetic = "false";
  const errors = validateBuilderFixture(profile, changed, paths).join("; ");
  assert.match(errors, /itemIds must map every content file/);
  assert.match(errors, /declare synthetic content/);
});
