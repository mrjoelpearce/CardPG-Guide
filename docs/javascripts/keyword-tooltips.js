/**
 * Keyword hover tooltips — same technique as the CardPG system's build
 * tester (tools/build-tester.html's highlightKeywords()), adapted for
 * static prose instead of +keyword:X action-step syntax. Descriptions are
 * copied from this guide's own Mechanics/Keywords.md table — keep them in
 * sync if that page changes.
 */
(function () {
  const KEYWORDS = {
    Heal: "Restore X health to yourself or a chosen ally.",
    Restore: "Pull X cards from your discard pile back into your hand. You choose which ones.",
    Recover: "Randomly retrieve X cards from your exile and return them to your discard pile.",
    Cure: "Remove X conditions from yourself or an ally. Cannot remove buffs.",
    Pierce: "This attack bypasses X points of the target's Bolster and armor — spent against Bolster first, then any leftover reduces armor.",
    Bypass: "This attack ignores Shield entirely.",
    Range: "This attack can reach targets up to X spaces away.",
    Push: "Shove the target X spaces directly away from you.",
    Pull: "Drag the target X spaces directly toward you.",
    Stun: "The target immediately loses one buff or one ongoing card effect. The defender chooses which.",
    Coerce: "Force one enemy to move up to X spaces toward another combatant and attack them for X damage.",
    Muddle: "Enemy ability. X of your cards are randomly exiled from your hand.",
    Exhaust: "Enemy ability. You must discard X cards from your hand of your choice.",
    Ongoing: "This card enters your ongoing effect zone.",
    Expend: "This card is exiled immediately if used for its card effect.",
    Burn: "Take 2 damage at the end of this round, then this condition clears.",
    Bleed: "Take 1 damage at the end of each round for X rounds.",
    Freeze: "Move 1 fewer space on every movement action. Clears at end of round.",
    Curse: "Take 1 additional damage from every attack you receive, for X rounds.",
    Weaken: "Deal 1 less damage with every attack you make, for X rounds.",
    Blind: "You may only target enemies within 2 spaces, until end of round.",
    Shock: "Take 1 damage each time you make an attack, for up to X attacks.",
    Poison: "You cannot heal, restore, or recover cards for X rounds.",
    Slow: "Your initiative drops to last place next round.",
    Bolster: "For the next X attacks against you, reduce damage by 1.",
    Shield: "The next X attacks against you are completely negated. Max 3 stacks.",
    Retaliate: "The next X times you are attacked, the attacker automatically takes 1 damage.",
    Hide: "Enemies cannot target you. Lasts until you attack — clears the moment you do, however many rounds that takes.",
    Haste: "Gain +1 space on every movement action.",
    Bless: "Your bad luck die results (1 and 2) have no effect on you. You are also immune to Curse, Poison and Weaken.",
    Boost: "Your attacks roll at +2.",
  };

  const PATTERN = new RegExp("\\b(" + Object.keys(KEYWORDS).join("|") + ")\\b", "g");
  const SKIP_TAGS = new Set(["A", "CODE", "PRE", "SCRIPT", "STYLE", "SPAN"]);

  function collectMatchingTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        PATTERN.lastIndex = 0;
        if (!PATTERN.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        for (let el = node.parentElement; el && el !== root; el = el.parentElement) {
          if (SKIP_TAGS.has(el.tagName)) return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    return nodes;
  }

  function wrapNode(node) {
    const text = node.nodeValue;
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    PATTERN.lastIndex = 0;
    let m;
    while ((m = PATTERN.exec(text))) {
      if (m.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
      }
      const span = document.createElement("span");
      span.className = "kw-hover";
      span.title = KEYWORDS[m[1]];
      span.textContent = m[0];
      frag.appendChild(span);
      lastIndex = m.index + m[0].length;
    }
    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    node.parentNode.replaceChild(frag, node);
  }

  function run() {
    const content = document.querySelector(".md-content");
    if (!content) return;
    for (const node of collectMatchingTextNodes(content)) wrapNode(node);
  }

  // MkDocs Material's navigation.instant feature swaps page content via
  // client-side routing rather than a full reload — document$ is the
  // documented hook to re-run page-processing JS after each such swap.
  if (typeof document$ !== "undefined") {
    document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
