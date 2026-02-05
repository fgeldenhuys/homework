# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Grade 1 learning app featuring educational games for young children in South Africa. Currently implements a Sight Words game where children find and match words on a game board. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint with Next.js rules
npm run start    # Start production server
```

## Architecture

### Game State Management
The Sight Words game uses a reducer pattern (`src/hooks/useGameState.ts`) with these states:
- `idle` → `showingWord` → `playing` → `roundComplete` → (loop or `gameComplete`)

Actions: `START_GAME`, `START_ROUND`, `SELECT_WORD`, `NEXT_ROUND`, `RESET`

### Key Files
- `src/app/game/page.tsx` - Main game orchestrator, handles effects (confetti, sound, auto-advance)
- `src/hooks/useGameState.ts` - Game state reducer and actions
- `src/lib/words.ts` - 100 sight words, column color definitions, confusing word pairs
- `src/lib/gameLogic.ts` - Round word selection (avoids visually similar words), card positioning
- `src/types/game.ts` - TypeScript interfaces for GameState, GameConfig, GameAction

### Component Structure
- `StartScreen` - Word selection grid (10 columns), game settings
- `GameBoard` - Cork board with positioned word cards
- `WordCard` - Individual clickable word with color from its column
- `WordReveal` - Shows target word before each round
- `FeedbackOverlay` - Correct/incorrect visual feedback

### Tailwind Dynamic Classes
Word columns use dynamic Tailwind classes (e.g., `${column.colorSelected}`). These are safelisted in `tailwind.config.ts`. When adding new dynamic color classes, add them to the safelist.

### Custom Font
Uses "Simple Print" local font loaded in `src/app/layout.tsx` via CSS variable `--font-simple-print`.

### Configuration Persistence
User configuration (e.g., word selection) must be persisted to localStorage. When adding new config options that should survive between sessions, store them using the Web Storage API. See `StartScreen.tsx` for the pattern. Remember not to let the effect run before loading the existing config, or it will overwrite the previous selection.


## Issue Tracking

This project uses **bd (beads)** for issue tracking.
It is important to create and update beads for all changes made.
When I ask you to make changes, it is implied that you need to create and update beads accordingly.
AGENTS.md has more information.
