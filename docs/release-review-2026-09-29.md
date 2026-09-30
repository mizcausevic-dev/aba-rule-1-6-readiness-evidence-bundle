# Release review — 2026-09-29

**Status: BLOCKED for use as a legal-compliance or client-evidence product.**
This repository is a draft, public checklist. It contains no client evidence and
is not an Evidence Bundle manifest, state-specific legal analysis, bar approval,
or certification.

## Findings and scoped fixes

- Replaced an unusable `npx evidence-bundle-builder build --profile ...` example:
  the package returned npm `E404` on 2026-09-29, and the upstream builder has
  no documented profile interface. The README now offers a local validator.
- Corrected an AGPL changelog claim to the repository's MIT license and
  explained that the historical `1.0.0-prod` label does not establish readiness.
- Narrowed categorical legal claims. `required_evidence_kinds` denotes checklist
  completion, not a universal legal requirement. The ABA's Formal Opinion 512
  describes fact-dependent competence, confidentiality, communication,
  supervision, candor, and fee duties.
- Removed an unsupported `IL Bar Op 24-04` reference. The [ISBA 2024 index](https://www.isba.org/ethics/years)
  lists Opinions 24-01 and 24-02. Removed Texas Opinion 705 from the
  unauthorized-practice citation because the [opinion](https://www.legalethicstexas.com/resources/opinions/opinion-705/)
  discusses competence, confidentiality, oversight, and fees. The
  [California State Bar index](https://www.calbar.ca.gov/ru/node/4942) identifies
  its AI Practical Guidance as updated in May 2026, replacing the stale 2023
  reference. These source checks are not a jurisdictional legal review.
- Added structural validation and CI for eight issue families, 35 unique
  evidence kinds, nonempty metadata, and duplicate rejection.

## Checks run

- `node scripts/validate-profile.mjs profile.json`: exit 0; eight families,
  35 kinds.
- `node --test tests/validate-profile.test.mjs`: exit 0; 4/4 tests.
- `actionlint -color=false`: exit 0.
- `git diff --check`: exit 0.
- `gitleaks dir . --redact --no-banner --log-level warn --timeout 60`: exit 0,
  no findings reported in the working tree.
- `gitleaks git . --redact --no-banner --log-level warn --timeout 60` with a
  process-local `safe.directory`: exit 0, no findings reported in history.
  These scans do not prove the absence of secrets.

## Gates and rollback

Qualified counsel must review the relevant jurisdictions and actual evidence
before any customer-facing readiness claim. The upstream builder has no native
`--profile` interface. Candidate GitHub CI must run on each new review commit. No deployment
or publication was performed. Revert the review commit to roll back these
repository-only changes.

Useful next enrichment: source URLs and review dates for every legal anchor,
jurisdiction-specific overlays approved by counsel, and upstream builder support
for profile-aware validation rather than labels supplied by this repository.

## Technical unblock wave (same date)

- Added a two-file **synthetic** bundle with fixed metadata and a checked-in
  SHA-256 manifest. Its item labels map to two existing profile evidence-kind
  identifiers; this does not assert that any real control operates. A focused
  validator rejects stale kind IDs, missing file mappings, and absent synthetic
  labels. CI compiles the separate AGPL-licensed builder from immutable commit
  `6b9d666ea8205d4ad1e515321e8cdad7b387c59a`, assembles the fixture,
  verifies file hashes, and compares the generated manifest with the checked-in
  artifact. Both CI actions are pinned to commit SHAs and checkout credentials
  are not persisted. This is a tested fixture integration, not a native builder
  profile feature or a client-evidence workflow.
- Corrected the README's remaining stale California 2023 and Texas Opinion 705
  table cells and its Rule 5.3 description to match the narrowed profile.
- Executed `node scripts/validate-profile.mjs profile.json` (exit 0),
  `node scripts/validate-builder-fixture.mjs` (exit 0), and
  `node --test tests/validate-profile.test.mjs tests/validate-builder-fixture.test.mjs`
  (exit 0, 7/7). The pinned builder's `npm ci --ignore-scripts`,
  `npm run build`, and `npm test` exited 0 (17/17 builder tests). Its
  `npm audit --omit=dev --audit-level=high` exited 0 with zero reported
  production vulnerabilities; a full install reported five advisories in
  development tooling (three moderate, two high). The local CLI assembled and
  verified 2/2 items (exit 0 each), and a repeated build left the manifest's
  SHA-256 unchanged. `actionlint -color=false` exited 0.
- The new candidate workflow has not run on GitHub yet. No real client bundle,
  legal sufficiency, license compatibility for a distributed integration, or
  production controls were verified.
