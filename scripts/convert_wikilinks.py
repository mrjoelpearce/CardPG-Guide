#!/usr/bin/env python3
"""One-time conversion: Obsidian [[wikilinks]] -> standard relative Markdown
links, for publishing the vault as a plain MkDocs site. Run once, then delete
(or keep for future re-syncs from the Obsidian vault)."""
import re
import urllib.parse
from pathlib import Path

DOCS = Path(__file__).parent / "docs"

# Build filename (no extension, lowercased) -> actual Path relative to DOCS.
index = {}
for path in DOCS.rglob("*.md"):
    key = path.stem.lower()
    if key in index:
        print(f"WARNING: duplicate note name '{key}': {index[key]} and {path}")
    index[key] = path

WIKILINK_RE = re.compile(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]")

unresolved = []

def convert_file(path: Path):
    text = path.read_text(encoding="utf-8")

    def repl(m):
        target, display = m.group(1).strip(), m.group(2)
        label = (display or target).strip()
        key = target.lower()
        if key not in index:
            unresolved.append((path, target))
            # No such page exists (e.g. a keyword mentioned in passing) —
            # match the vault's own convention elsewhere of just bolding
            # the mention instead of linking it.
            return f"**{label}**"
        target_path = index[key]
        rel = Path(
            "../" * (len(path.parent.relative_to(DOCS).parts))
        ) / target_path.relative_to(DOCS) if path.parent != DOCS else target_path.relative_to(DOCS)
        # Compute a real relative path from this file's directory to the target.
        rel = Path(
            urllib.parse.quote(
                str(Path(
                    *[".."] * len(path.parent.relative_to(DOCS).parts)
                ) / target_path.relative_to(DOCS))
            )
        )
        return f"[{label}]({rel.as_posix()})"

    new_text = WIKILINK_RE.sub(repl, text)
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False

changed = 0
for path in sorted(DOCS.rglob("*.md")):
    if convert_file(path):
        changed += 1

print(f"Converted wikilinks in {changed} file(s).")
if unresolved:
    print(f"\n{len(unresolved)} wikilink(s) had no matching page (converted to bold text instead):")
    for path, target in unresolved:
        print(f"  {path.relative_to(DOCS)}: [[{target}]]")
