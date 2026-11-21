# Protected products — immutable boundaries

The Vulnerability Scanner and Cyber Academy are protected flagship products under the TECHNOVA master brief.

## Explicit prohibitions

Do not change, redesign, rewrite, relocate, rebrand, refactor, simplify, merge, replace or improve either product without specific written approval.

Protected aspects include:
- UI, colours, layout, typography, spacing and visual identity
- Wording, navigation, buttons, component hierarchy and routes
- Existing scanner workflow, restrictions and functionality
- Academy content, prominence, structure and working behaviour

## Safe integration approach

1. Identify the exact upstream repository commit and file tree.
2. Import the original source and required dependencies into a clearly labelled vendor snapshot.
3. Preserve upstream licenses and notices.
4. Record original repository, commit, import date and checksums.
5. Do not edit snapshot files.
6. Build new modules, adapters, APIs and routes outside the protected snapshot.
7. If integration requires a protected change, stop and request approval.

## Regression gate

Before and after every integration:
- Build the protected products using their original supported commands.
- Verify their routes load and core interactions remain available.
- Run existing scanner tests and an authorised safe test target where the source supports it.
- Verify Academy navigation/content and a representative learning journey.
- Compare protected-file diffs against the imported baseline.
- Record exact commands, results and limitations.

A successful file import is not proof that a product is runnable. A passing build is not proof that scanning or learning workflows work end-to-end.

## Current status

This file records requirements only. The complete protected source inventory, dependency closure, runtime checks and regression evidence must be added after the source audit. The original HEARTCODE repository must remain untouched.
