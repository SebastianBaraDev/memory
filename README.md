# Memory Game

A memory card game for two players, built with **Vite**, **TypeScript** and **Sass** as a project at the Developer Akademie.

**Live demo:** https://sebastian-bara.developerakademie.net/

## How to play

1. Click **Play** on the home screen.
2. Choose your settings:
   - **Game theme**: Code vibes, Gaming, DA Projects or Foods
   - **Starting player**: Blue or Orange
   - **Board size**: 16, 24 or 36 cards
3. Click **Start**.
4. The current player flips two cards:
   - **Pair found**: the player gets a point and goes again.
   - **No pair**: the cards flip back and the other player's turn begins.
5. When all pairs are found, the game shows the final score and then the winner (or a draw).

You can leave a running game with the **Exit** button at any time. Your last settings stay selected for the next game.

## Features

- 4 themes, each with its own cards, colors and fonts
- 3 board sizes
- Game over, winner and draw screens
- Exit dialog
- Desktop and widescreen layout (from 1440px)

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) (version 20 or newer) and npm
- [Git](https://git-scm.com/)

### Installation

```bash
git clone https://github.com/SebastianBaraDev/memory.git
cd memory
npm install
```

### Development server

```bash
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

### Production build

```bash
npm run build
```

The finished game is in the `dist` folder. To try the build locally, run `npm run preview`. To publish it, upload the **contents** of `dist` to the root folder of your web server.

## Project structure

```
memory/
├── index.html              # entry point, contains <main id="screen">
├── public/
│   ├── fonts/              # self-hosted fonts
│   └── img/                # icons and the images of all 4 themes
└── src/
    ├── scripts/
    │   ├── main.ts         # start, navigation between screens
    │   ├── game.ts         # game logic (turns, pairs, scores)
    │   ├── settings.ts     # settings screen logic
    │   ├── card.ts         # Card class
    │   ├── timer-manager.ts# TimerManager class
    │   ├── *-template.ts   # HTML templates of the screens
    │   ├── types.ts        # TypeScript interfaces
    │   └── utils.ts        # helper functions
    └── styles/             # Sass partials (one per screen + themes)
```

## Tech stack

- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
