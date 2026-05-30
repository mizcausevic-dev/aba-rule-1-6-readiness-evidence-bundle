# aba-rule-1-6-readiness-evidence-bundle

> **LegalTech Evidence Bundle (compliance) — Spec #3 of the LegalTech 6-pack.** Profile of the [Evidence Bundle spec](https://github.com/mizcausevic-dev/evidence-bundle-spec) scoped to law firms + legal-AI vendors. Covers ABA Model Rules 1.1c8 / 1.6 / 1.6(c) / 1.7 / 1.9 / 3.3 / 5.3 / 5.5 plus attorney-client privilege preservation plus work-product doctrine preservation plus state-bar overlay obligations.

Part of the [Kinetic Gain Protocol Suite](https://suite.kineticgain.com).

> Status: v0.1 draft. Profile at [`profile.json`](./profile.json).

## What this bundle is

A **structured readiness checklist** that a law firm or legal-AI vendor can build (and an outside-counsel ethics-program reviewer can audit) toward eight obligation families:

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

**35 required evidence kinds total** across the 8 families. Every one is a discrete artifact a reviewer can ask to see (a written policy document, a contract clause excerpt, an attestation, a log).

## What this bundle is NOT

- Not a state-bar attestation. State bar disciplinary counsel may use this as a starting point during an investigation, but the bundle itself is not a finding.
- Not a substitute for outside-counsel ethics-program review.
- Not state-specific (state-bar overlays are referenced inside the families, not separated out as a 9th family).
- Not criminal-defense-specific (Sixth Amendment effective-assistance + Brady disclosure obligations need a separate overlay).
- Not judge-facing (judicial AI use rules bind judges, not attorneys).

## Use

```bash
# Validate the profile is well-formed
node -e "JSON.parse(require('fs').readFileSync('profile.json','utf8'))"

# Or feed it into the evidence-bundle-builder (the cross-vertical tool)
npx evidence-bundle-builder build --profile profile.json --inputs ./your-evidence/
```

## Composes with

- [`evidence-bundle-spec`](https://github.com/mizcausevic-dev/evidence-bundle-spec) — the upstream spec this profile conforms to
- [`evidence-bundle-builder`](https://github.com/mizcausevic-dev/evidence-bundle-builder) — the cross-vertical bundle assembler
- [`matter-decision-record-audit-stream`](https://github.com/mizcausevic-dev/matter-decision-record-audit-stream) — the sibling Operator audit-stream that produces hash-chained evidence consumable by this bundle
- [`state-bar-ai-disclosure-tracker`](https://github.com/mizcausevic-dev/state-bar-ai-disclosure-tracker) — the sibling state-bar tracker that contextualizes obligation-family evidence
- [`attorney-client-data-vault-contract-profile`](https://github.com/mizcausevic-dev/attorney-client-data-vault-contract-profile) — the sibling vault contract profile
- [Kinetic Gain Protocol Suite](https://suite.kineticgain.com) — umbrella

## Compliance posture

**Readiness scaffolding** for ABA Model Rules + privilege + work-product programs. Producing a complete bundle is evidence of program maturity, not ABA-compliance certification. State bar discipline + outside-counsel attestation are separate processes. Per the standing public-language guardrail across the Suite.

## License

Profile + supporting documentation: MIT.
