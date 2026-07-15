#!/usr/bin/env python3
"""Insert a blank line wherever a table is immediately followed by a
heading, or a prose/emphasis line is immediately followed by a list item,
with no blank line between them. Obsidian tolerates this; standard
CommonMark (what MkDocs uses) does not — a table run-on swallows the next
line as a malformed row, and a list glued to a paragraph doesn't render as
a list at all. Usage: python3 scripts/fix_blank_lines.py <docs-dir>"""
import re
import sys
from pathlib import Path

def fix_text(text: str) -> str:
    lines = text.split("\n")
    out = []
    for i, line in enumerate(lines):
        out.append(line)
        if i + 1 >= len(lines):
            continue
        cur_s, nxt_s = line.strip(), lines[i + 1].strip()
        if not cur_s or not nxt_s:
            continue
        cur_is_table = cur_s.startswith("|")
        nxt_is_heading = nxt_s.startswith("#")
        cur_is_list = bool(re.match(r"^[-*]\s", cur_s))
        cur_is_heading = cur_s.startswith("#")
        nxt_is_list = bool(re.match(r"^[-*]\s", nxt_s))
        if cur_is_table and nxt_is_heading:
            out.append("")
        elif nxt_is_list and not cur_is_list and not cur_is_heading:
            out.append("")
    return "\n".join(out)

def main():
    docs = Path(sys.argv[1] if len(sys.argv) > 1 else "docs")
    changed = 0
    for path in sorted(docs.rglob("*.md")):
        original = path.read_text(encoding="utf-8")
        fixed = fix_text(original)
        if fixed != original:
            path.write_text(fixed, encoding="utf-8")
            changed += 1
            print(f"fixed: {path.relative_to(docs)}")
    print(f"\n{changed} file(s) changed.")

if __name__ == "__main__":
    main()
