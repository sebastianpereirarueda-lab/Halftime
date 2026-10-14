# Research results

Drop files from Perplexity here (see docs/PERPLEXITY-TASKS.md), then ask Claude to plug them in.

## What has been plugged in

- **A1, kit facts** (batches 01-10, 100 shirts): run `node tools/plug-kit-facts.js`.
  It reads every `A1-kits-batch-*.md`, applies Claude's checked edits from `A1-corrections.json`,
  and writes the facts into `public/data/kits.js`. New batches dropped here are picked up the same way.
