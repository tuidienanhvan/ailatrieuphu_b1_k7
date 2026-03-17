# PiAI Game Template (Hub-first)

## Runtime model
- Hub embeds game in `iframe`.
- Game sends `MINIGAME_READY` when booted.
- Hub sends `MINIGAME_DATA` with user + config + question pool.
- Game merges payload with local defaults and applies runtime overrides.
- Game sends `MINIGAME_RESULT` and `MINIGAME_PURCHASE` back to Hub.

## Main files
- `src/App.tsx`: bridge listener, config merge, runtime apply, root screen routing.
- `src/@game/runtime/config.ts`: `buildDefaultMergedConfig`, merge + apply helpers.
- `src/@game/defaults/*`: game/shop/question defaults (standalone fallback).
- `src/@platform/bridge/*`: message contract and sender/receiver.
- `src/@game/events/index.ts`: mutable event catalog for Hub overrides.

## Reuse for new games
1. Keep `src/@platform` as shared layer.
2. Replace `src/@game` implementation (theme, hooks, store, defaults).
3. Keep bridge payload contract unchanged so Hub can control config uniformly.
