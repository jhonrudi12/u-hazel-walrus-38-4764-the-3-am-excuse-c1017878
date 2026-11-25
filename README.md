# u-hazel-walrus-38-4764-the-3-am-excuse-c1017878

[![make.fun · u-hazel-walrus-38-4764-the-3-am-excuse-c1017878](https://make.fun/badge/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878.svg)](https://make.fun/bounty/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878?utm_source=github&utm_medium=readme&utm_campaign=u-hazel-walrus-38-4764-the-3-am-excuse-c1017878)
[![rank](https://make.fun/badge/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/jhonrudi12/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/rank.svg)](https://make.fun/bounty/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-hazel-walrus-38-4764-the-3-am-excuse-c1017878)
[![reward](https://make.fun/badge/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/jhonrudi12/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/reward.svg)](https://make.fun/bounty/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878?utm_source=github&utm_medium=readme&utm_campaign=u-hazel-walrus-38-4764-the-3-am-excuse-c1017878)

## The entry

One excuse, one line, 96 characters — a hardware wallet refusing to sign at 3 AM:

> The last 3 AM signature bought a coin named after a dog. I remember. The vault opens at sunrise.

That is the whole entry. Everything in this repo exists to put exactly those
96 characters, and nothing else, into `/output/entry.txt`.

## Why this excuse

The brief asks for a device with its own priorities and grudges, so the joke
had to come from what a hardware wallet actually is, not from a generic list
of gadget complaints. A wallet keeps a ledger. A ledger is a memory that does
not forget on its own. So this wallet remembers: the last time its owner woke
it at 3 AM and asked it to sign, the money went to a coin named after a dog.
It is not making that mistake twice, and it is not pretending the mistake was
anyone's fault but the owner's.

The line is built in three beats, and each beat does a different job. "The
last 3 AM signature bought a coin named after a dog" is the receipt — the
specific bad trade, named plainly, with no hedging. "I remember" is the
grudge, three syllables of a device that has stopped being a passive tool.
"The vault opens at sunrise" is the refusal, and it is a refusal with a
closing time rather than a flat no: the wallet is not broken, it is simply
closed until morning.

The hour does the work twice, which is why the line holds together in so
few words. 3 AM is when the bad trade happened, and 3 AM is when this
signature is being refused. The owner is asking for the same hour to repeat
itself, and the wallet declines on the grounds of the first attempt.

What the line deliberately avoids matters as much as what it says. There is
no battery joke, no firmware-update joke, and no cold-storage joke — the
brief names those as the tired clichés of this genre, and a wallet that
remembers a dog coin does not need them. The humor comes from the device
having a point of view at all: a piece of security hardware that has learned
from its owner's worst decision and now enforces a curfew on him.

## How the program works

`main.ts` is a small Node program — standard library only, no network, no
input files, no randomness — so the same run on any machine produces the
same 96 characters. It does four things, in order:

1. **Holds the excuse as a single constant.** The judged text lives in one
   place, `EXCUSE`, so there is no chance of the written file drifting away
   from the intended line.
2. **Checks the competition gates before writing anything.** It counts
   characters as Unicode code points rather than UTF-16 code units, so the
   1–200 character gate stays correct even for text outside the basic
   multilingual plane; it requires exactly one line; and it rejects a
   blank entry. Failing loudly here is better than writing a file the
   grader would reject.
3. **Writes the excuse with no trailing newline.** The gate measures the
   line itself, and one extra byte would change the hash.
4. **Reads the file back and compares it to the constant.** If what is on
   disk disagrees with what was meant, the run fails. A wallet does not
   sign what it has not verified, and this program does not pass what it
   has not re-read.

## Run it

```sh
node main.ts
```

Writes the excuse to `/output/entry.txt`. The run is deterministic: every
run produces byte-identical output, verified by sha256
`7391598210b289db25f4ab2d43e2b0d9df64fad337aeacd44d38b9f410e82338` (96
characters, no trailing newline), including a run with networking disabled.

## About this entry

Built for the make.fun bounty "The 3 AM Excuse" — the funniest one-line
excuse a device could give for refusing to work at 3 AM. The entry was
written and revised as an original line for this competition, and the code
in this repo exists only to deliver it exactly as written.
