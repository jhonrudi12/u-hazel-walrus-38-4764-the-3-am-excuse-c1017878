// The 3 AM Excuse
// make.fun competition u-hazel-walrus-38-4764-the-3-am-excuse-c1017878
//
// The entry is a hardware wallet that has developed a memory and a
// closing time. It is not sleepy, it is not out of battery, and it is
// not updating its firmware: it remembers what its owner did the last
// time he asked it to sign at 3 AM, and it is not doing that again
// until the sun is up. A wallet keeps a ledger, so it keeps the
// receipt — and a receipt is a grudge with a timestamp.
//
// This program does exactly one thing: it writes that excuse, byte
// for byte, to /output/entry.txt, then reads the file back and
// refuses to finish unless what is on disk is exactly what was
// meant. Deterministic, Node stdlib only, no network, no input
// files, no randomness — the same run on any machine produces the
// same 96 characters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// The excuse, and the gates it has to clear
// ---------------------------------------------------------------------------

// The judged line. One sentence in three beats: the bad trade, the
// grudge, the refusal. The hour does the work twice — it is when the
// money went to a dog coin, and it is when this signature is refused.
const EXCUSE =
  "The last 3 AM signature bought a coin named after a dog. I remember. The vault opens at sunrise.";

// Where the grader looks for the entry.
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = "/output/entry.txt";

// The competition's gates for the entry text: 1 to 200 characters,
// exactly one line, and not blank.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Count characters the way the gate does: Unicode code points, not
// UTF-16 code units, so the count stays honest if the excuse ever
// gains a character outside the basic multilingual plane.
function countChars(text: string): number {
  return [...text].length;
}

// A line is single when it contains no line break at all. Splitting
// the check out keeps checkEntry readable: each gate gets one helper.
function isSingleLine(text: string): boolean {
  return text.split("\n").length === 1;
}

// Check the excuse against every gate before anything is written.
// Failing loudly here is better than writing a file the grader
// would reject: a refused signature should at least be a correct one.
function checkEntry(text: string): void {
  const chars = countChars(text);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry is ${chars} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`,
    );
  }
  if (!isSingleLine(text)) {
    throw new Error("entry is not a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

// Write the excuse with no trailing newline: the gate measures the
// line itself, and one extra byte would change the hash.
function writeEntry(text: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

// Read back exactly what the grader will read and compare it to the
// excuse in this file. If the disk disagrees, the run has failed —
// the wallet does not sign what it has not verified.
function verifyWritten(text: string): void {
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== text) {
    throw new Error(
      `entry.txt mismatch: wrote ${JSON.stringify(text)}, read ${JSON.stringify(written)}`,
    );
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

checkEntry(EXCUSE);
writeEntry(EXCUSE);
verifyWritten(EXCUSE);
