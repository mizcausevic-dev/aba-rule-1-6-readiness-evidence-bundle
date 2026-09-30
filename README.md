# aba-rule-1-6-readiness-evidence-bundle

> **LegalTech readiness checklist.** This draft profile organizes evidence a law firm or legal-AI vendor may use when reviewing AI-related professional-responsibility controls. It is a companion to the [Evidence Bundle spec](https://github.com/mizcausevic-dev/evidence-bundle-spec), not an Evidence Bundle manifest or a claim of schema conformance.

Part of the [Kinetic Gain Protocol Suite](https://suite.kineticgain.com).

> Status: v0.1 draft. Profile at [`profile.json`](./profile.json). The historical `v1.0-prod` Git tag does not change this draft status.

## What this bundle is

A **structured readiness checklist** for discussion with qualified counsel and the firm's security team. It groups suggested evidence under eight issue families:

| # | Family | Anchor |
| --- | --- | --- |
| 1 | Competence with Technology | ABA Rule 1.1 Comment 8 + ABA Formal Op 512 |
| 2 | Confidentiality + Reasonable Efforts | ABA Rule 1.6 + 1.6(c) + CA Bar Practical Guidance 2023 |
| 3 | Conflict of Interest | ABA Rule 1.7 + 1.9 |
| 4 | Candor Toward the Tribunal (anti-hallucination) | ABA Rule 3.3 + Mata v. Avianca + PA Joint Op 2024-200 |
| 5 | Supervision of AI as Non-Lawyer Assistant | ABA Rule 5.3 + ABA Formal Op 512 |
| 6 | Unauthorized Practice of Law Screen | ABA Rule 5.5 + TX COLE Op 705 |
| 7 | Attorney-Client Privilege Preservation | Common-law privilege + state evidence codes |
| 8 | Work-Product Doctrine Preservation | Fed. R. Civ. P. 26(b)(3) + Hickman v. Taylor |

**35 evidence kinds** across the 8 families. `required_evidence_kinds` means required to complete *this profile*, not that every artifact is mandated by an ABA rule, a court, or a state bar. The right evidence and safeguards depend on the tool, client data, matter, and jurisdiction.

## What this bundle is NOT

- Not a state-bar attestation. State bar disciplinary counsel may use this as a starting point during an investigation, but the bundle itself is not a finding.
- Not a substitute for outside-counsel ethics-program review.
- Not state-specific. State-bar opinions are mentioned as research leads; no state-by-state overlay is implemented or verified here.
- Not criminal-defense-specific (Sixth Amendment effective-assistance + Brady disclosure obligations need a separate overlay).
- Not judge-facing (judicial AI use rules bind judges, not attorneys).

## Use

```bash
# Validate JSON structure, unique evidence identifiers, and the documented counts
node scripts/validate-profile.mjs profile.json

# Run the validator's regression tests
node --test tests/validate-profile.test.mjs
```

This repository does not assemble client evidence. Keep client names, matter details,
privileged material, and work product out of this public profile and its tests.
The separate [Evidence Bundle builder](https://github.com/mizcausevic-dev/evidence-bundle-builder)
uses a bundle directory plus metadata to create a manifest; it has no documented
`--profile`/`--inputs` interface, and its npm package was unavailable when checked
on 2026-09-29. Follow its repository instructions if you choose to use it.

## Composes with

- [`evidence-bundle-spec`](https://github.com/mizcausevic-dev/evidence-bundle-spec) — the separate upstream bundle format that this checklist can inform
- [`evidence-bundle-builder`](https://github.com/mizcausevic-dev/evidence-bundle-builder) — the cross-vertical bundle assembler
- [`matter-decision-record-audit-stream`](https://github.com/mizcausevic-dev/matter-decision-record-audit-stream) — the sibling Operator audit-stream that produces hash-chained evidence consumable by this bundle
- [`state-bar-ai-disclosure-tracker`](https://github.com/mizcausevic-dev/state-bar-ai-disclosure-tracker) — the sibling state-bar tracker that contextualizes obligation-family evidence
- [`attorney-client-data-vault-contract-profile`](https://github.com/mizcausevic-dev/attorney-client-data-vault-contract-profile) — the sibling vault contract profile
- [Kinetic Gain Protocol Suite](https://suite.kineticgain.com) — umbrella

## Compliance posture

**Readiness scaffolding**, not legal advice, a finding that controls operate,
or ABA/state-bar certification. A completed checklist does not establish that
client information was protected or privilege preserved. Counsel must assess
the applicable jurisdiction and facts, inspect actual artifacts, and decide
whether any client disclosure or informed consent is required. See the
[ABA Model Rules comparison charts](https://www.americanbar.org/groups/professional_responsibility/policy/rule_charts/)
and [ABA Formal Opinion 512](https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf)
for primary starting points. Formal Opinion 512 explains that client consent
depends on how the tool uses information relating to a representation.

No client or matter data belongs in the public repository. Actual evidence
bundles need restricted access, retention/deletion rules, and reviewer-approved
redaction before disclosure.

## License

Profile + supporting documentation: MIT.
