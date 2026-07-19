Once combat begins, CardPG becomes a very different game. When combat begins, the group will be given a clear objective to meet for combat to end. Combat will end when the objective has been met, or all enemies are defeated.

### Equipment
Characters carry [Equipment](../Mechanics/Equipment.md) that can aid them in combat. Most equipment can be purchased between adventures, but some can also be found as loot.

### Mechanics
You will have a hand of cards selected from your [Card Pool](../Mechanics/Card%20Pool.md), and each round you will select two of those cards to use that turn. You will choose one of your selected cards to establish your place in the initiative order. Initiative is ascending, from 1-99. On your turn, you can use both cards, in one of three ways:

* Use the ability on the card
* Make a basic attack (2 damage)
* Make a basic move (3 spaces)

Whenever you make an attack, you will roll 4DF and the Luck Die. You will add or subtract your die result from the base value of the attack, which will determine the damage dealt.

Once a card has been used, it goes to your discard pile.

### Armor and Damage
Both characters and enemies have an **armor** value. When an attack deals damage, armor reduces it by its full value — 5 damage against a target with 2 armor deals 3 damage. If damage is reduced to zero or below, no damage is dealt. **Status effects will be triggered, even if an attack value is 0.**

The **Pierce** keyword is spent against Bolster first, and any leftover reduces effective armor. **Bypass** ignores the Shield buff entirely but does not affect armor.

**Bolster**: for the next several attacks against you — one per remaining stack — reduce damage by 1 each. Each time you take a hit, one Bolster stack is consumed (whether or not the attack deals damage). Bolster stacks do not expire at end of round — they last until used up.

**Shield** negates entire attacks. Each incoming attack consumes one Shield stack and deals 0 damage. The **Bypass** keyword ignores Shield entirely.

### Luck Dice
Players and enemies both have a D20 luck die, rolled along with the 4DF. 

**Player Die**

| Roll | Effect |
|------|--------|
| 1 | Card is **expended** (moves to exile instead of discard) |
| 2 | **Miss** — attack fails |
| 3–17 | No effect |
| 18 | Gain **Fate Point** |
| 19 | Card **returns to hand** (not discarded) |
| 20 | **Critical** — double dealt damage |

**Enemy Die**

| Roll | Effect |
|------|--------|
| 1 | **Miss** — attack fails |
| 2 | Enemy is **Slowed** |
| 3–17 | No effect |
| 18 | Enemy inflicts **Exhaust** (target discards a card) |
| 19 | Enemy inflicts **Muddle** (target exiles a card) |
| 20 | **Critical** — double dealt damage |

### Rounds and Turns
At the start of each round, players will select their cards in secret, and enemies will choose an action for the turn. One of these cards will be your lead card, and its initiative value will determine the initiative order (ascending).

If you have fewer than two cards in hand, you must rest instead.

* **Short Rest**: One of your discarded cards is exiled at random, and you recover the rest. You can play your turn as normal.
* **Long Rest**: You recover all discarded cards from your discard pile. Your initiative is set to 99 this turn, and you will not act this round.

On your turn, you can use both cards you selected.

Once all combatants have acted, end-of-round keywords will trigger, all timed status effects will tick down, and a new round will begin.

### Ongoing Cards
Some cards have the **Ongoing** keyword. When you play one of these, instead of going to your discard pile it moves to your **ongoing zone**, where it remains active until the effect ends.

Ongoing cards may apply effects at the start or end of each round, react to events like being attacked, or summon creatures that act on your behalf.

You can choose to end one of your own ongoing cards whenever you want, so long as it's not during another player or enemy's action. Send it to your discard pile as normal. An enemy's **Stun** can also end one of your ongoing cards.

### Exhaustion and Death
Each player and enemy has a health value. Attacks will deal damage to health. Any time you take damage, you may exile a card from your hand or discard pile instead of taking damage. This represents your character becoming tired, and losing access to your full suite of options.

If your health would be reduced to 0 and you cannot exile a card from your hand or discard pile, your character is **killed**.

### Fleeing
Running out of cards is dangerous, but it isn't the same as dying. If, at the start of a round, your hand and discard pile combined have fewer than two cards — nothing to select from, and nothing to rest with — your character **flees** the fight.

- You survive to fight another day.
- You are locked out of future gold and XP rewards until you return to Camp and Town. (Gold and XP you've already earned this adventure are not lost.)

Fleeing and dying are the two ways an adventure can end badly for a character — dying is permanent, fleeing is not.

### Field Rest
Between fights, you get a short time to catch your breath. This happens automatically as soon as the encounter ends:

* All of your discarded, active, and ongoing cards return to hand.
* Your equipment resets
* You lose all buffs and conditions
* 2 cards are restored from your exile zone straight back into your hand (all of them, if you have fewer than 2 exiled).
* You heal 5 health.