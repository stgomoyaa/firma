# The README as a designed artifact

A repository README is a shipped surface with its own slop shape, and it is usually the only page a project gets. Same rules as any other artifact here: honesty is a hard gate, em-dashes are banned, and the reader meets a demonstration before an explanation.

## The slop shape

You already know it, because almost every repository has it:

Title, a one-line description that could describe six other projects, a badge row that includes badges for services nobody configured, `## Features` as a bullet list of adjectives, `## Installation`, `## Usage` with one snippet, `## Contributing`, `## License`. No numbers, or numbers nobody can reproduce. Nothing about what the thing fails at.

It is not ugly. It is anonymous, and it makes a good project look like a template.

## The structure that works

Order matters, and the first move is the one people skip.

1. **Title, then a tagline written in the product's own voice.** The tagline is a sample of the thing, not a description of it. A compression tool's tagline should read compressed. A parser's should read precise.
2. **One-line value proposition containing a number.**
3. **A single-line nav TOC** with `·` separators.
4. **One paragraph:** what it is, what you install, what you get.
5. **Demonstration.** Before and after, side by side, with measured numbers. **This is section two, not section eight.** For a linter, two fixtures and their counts. For a parser, a raw response beside the normalised output. For a game or a mod, the real progression table read out of the source. For a prompt tool, the raw prompt beside the rewrite.
6. **The number that stays flat.** Alongside the number that flatters you, publish the one that does not. The reference example for this pattern shows "output tokens saved 65%" and "input tokens saved 0%" in the same block. Find your equivalent and print it.
7. **The one-line distinction:** what this touches and what it deliberately does not.
8. **Install.** One command, requirements, time estimate, safe-to-re-run.
9. **GitHub callouts** (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`) instead of walls of prose.
10. **A table showing the same input at different settings**, so the reader sees the axis rather than a list of modes.
11. **A "what you get" table:** thing → what it does.
12. **A numbers section**, per-item rows, each pointing at the committed and reproducible source of that number.
13. **An explicit "what this does not do" section.** See below. This is the highest-value section in the file.
14. **How it works:** a short numbered mechanism.
15. **Provenance and license**, license line in the project's voice.

## The section that generates trust

"What this does not do" is where a README stops sounding like marketing. It is also the section a model will quietly omit unless it is required, because every instinct pushes toward upside.

It has to name real losses, in the project's own terms:

- Where the tool is overhead rather than help, and on what kind of work.
- What it cannot do at all, and why that is a property of the domain rather than a missing feature.
- Which parts are untested, unmaintained, or tested only on one configuration.
- Where a number goes to zero, or negative.
- Which judgement calls are opinions rather than measurements.

A limitation stated plainly reads as confidence. A limitation discovered by a user after they adopted the thing reads as a lie.

## Every number is measured, and the command is named

No number goes into a README unless a command produced it in the session that wrote it. Not estimated, not remembered from an earlier version, not rounded up for a better sentence.

The discipline pays twice, and the second time is the one nobody expects:

> **Documenting an API honestly forces you to read it, and reading it finds bugs.**

Across four repositories done this way, writing the numbers section surfaced: an exported schema validator that was never called, so the README's claim of validation was false; a returned array whose flag was hardcoded so it could never be false, under a name that promised data the upstream API does not expose; a classification code recognised by one function and missing from the lookup table of another; an install command for a package that was never published; and a LICENSE file with an appendix appended after the licence text, which made the host report the repository as unlicensed while the badge claimed MIT.

None of those were found by reading code looking for bugs. All of them were found by trying to state a fact about the code and discovering the fact was not true.

If a claim cannot be verified, the honest move is to cut it or mark it. If verifying it reveals a defect, the defect is now the more valuable finding.

## Language, for a public repository

Write it in the language of the community you are publishing into, not the language you think in. That is usually English, and it is English even when every other artifact in the project is not: the surrounding ecosystem, the issue tracker, the forums where the thing gets discussed.

The locale gate in `copy.md` and `../locales/` governs **product copy for a market**. A README aimed at an open-source ecosystem is a different audience with a different default. Those two rules do not conflict; they apply to different surfaces. A skill written in English that enforces neutral Chilean Spanish in the interfaces it builds is coherent, and it reaches both audiences.

## Badges

Only badges backed by something real. A license badge, a language badge, a version badge, a star count. Never a build badge with no CI, never a coverage badge with no coverage, never "PRs welcome" as decoration.

Check that the host actually detects your license: an appendix appended after the licence text stops the detector matching it, and then the sidebar shows nothing while the badge claims MIT. Attributions go in `NOTICE.md`, and `LICENSE` stays the unmodified text.

## Gates

Added to the slop test when the artifact is a README.

1. Does a demonstration appear before the explanation, or is the first concrete thing an install command?
2. Is there a number in the file that no command in the repository can reproduce?
3. Is there a "what this does not do" section, and does it name a real loss rather than a humble-brag?
4. Is the number that does not flatter the project published next to the one that does?
5. Is there a badge for a service that is not configured?
6. Does the license file match what the badge claims, and does the host detect it?
7. Is the tagline a sample of the product, or a description of it?
8. Is any em-dash present in the file?
