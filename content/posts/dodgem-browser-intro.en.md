+++
title = "\"Dodgem Browser\": a Browser Game Developed with AI Assistance"
date = 2026-04-06T00:58:00+09:00
draft = false
description = "An English companion article introducing Dodgem Browser, a browser-based Dodgem game with local play, CPU opponents, and online multiplayer, developed with AI assistance."
categories = ["Programming"]
tags = ["game", "browser game", "React", "TypeScript", "Dodgem"]
series = ["Introducing Apps Developed with AI Assistance"]
showtoc = true
tocopen = true
math = false
+++

{{< ai_translation_notice source="/posts/dodgem-browser-intro/" title="AI-assisted English companion" >}}
This English page presents a project I developed with AI assistance, with AI also used to help draft and translate the article.  
It is written as a creator-side introduction, not as an outside review.
{{< /ai_translation_notice >}}

{{< summary title="Quick Summary" >}}
- `Dodgem Browser` is a browser-based Dodgem game
- It supports local play, CPU matches, and online multiplayer
- I wanted the project to be easy to play, easy to revisit, and easy to keep extending
{{< /summary >}}

{{< linkcard
  url="https://github.com/ungeho/dodgem-browser"
  title="GitHub: ungeho/dodgem-browser"
  desc="A browser-based Dodgem game that I developed with AI assistance."
  meta="Repository"
/>}}

## What kind of game is this?

`Dodgem Browser` is a **browser-based Dodgem game that I developed with AI assistance**.  
It starts from the classic board-game idea, but I did not want it to be just a bare rules implementation. I wanted it to feel easy to play, easy to inspect, and easy to grow.

The main goals were simple:

- make it comfortable to play in a browser
- include CPU play and online play in the same project
- keep the rule logic easy to maintain later

## What it can do

### Three play modes

The game supports:

- local human vs. human
- CPU matches
- online multiplayer

That means it works both as something to casually test alone and as something you can actually play with someone else.

### Features for following the game state

I also wanted matches to be easy to read back and understand.

- legal move highlighting
- selected piece highlighting
- previous move display
- movement path visualization
- Undo
- game logs
- replay

So instead of only rendering a board, the app tries to make the match state readable as it develops.

### Rule variations

There are also multiple rule variations:

- Classic 4x4
- Wide 5x5
- Sprint 5x5

That helps the same core game feel different depending on board size and pace.

## What I cared about in the rules

As the README mentions, this implementation uses **simple and consistent local rules** for areas that often become ambiguous.

{{< compare left="What mattered in the rules" right="What I did for that" >}}
- reduce ambiguity
- make the board easier to read and play
- keep the rule logic understandable in code
<!--split-->
- centralize logic in `rules.ts`
- define legal moves and win/loss states explicitly
- separate rule variations into dedicated definitions
{{< /compare >}}

Board games like this often become harder around edge cases rather than around the board itself, so I wanted those decisions to live in the game logic instead of being scattered through the UI.

## CPU and online play

On the CPU side, the project uses three internal strategies:

- `random`
- `heuristic`
- `lookahead`

These are exposed as:

- Easy
- Normal
- Hard

For online play, I split it into two paths:

- local-tab play using `BroadcastChannel`
- remote play through a WebSocket server

I liked this split because it lowers the barrier to trying the online layer.  
You can start with something lightweight, then move to remote play when needed.

## Sharing and revisiting games

Another part I cared about was making game states easy to revisit.

- position sharing
- settings sharing
- game log sharing
- replay

So the app is not only about playing a match once.  
It is also about being able to look back at a position and talk about how it developed.

## Technical structure

Technically, the app is built in a fairly straightforward React + TypeScript + Vite stack.

{{< compare left="Frontend side" right="Logic and helper side" >}}
- React 18
- TypeScript
- Vite
- CSS
<!--split-->
- rules logic
- CPU logic
- session / Undo handling
- share link generation
- online helpers
{{< /compare >}}

The project is split into modules like:

- `rules.ts`
- `variants.ts`
- `cpu.ts`
- `session.ts`
- `share.ts`
- `online.ts`

That structure matters to me because it keeps the UI and game logic separated enough that the project still feels easy to grow.

## Who this is for

{{< steps >}}
1. someone who wants a board game to play casually in the browser
2. someone who wants CPU play and online play in one project
3. someone who wants logs and replay features for reviewing matches
4. someone who is also interested in how game logic is implemented
{{< /steps >}}

If you are mainly looking for a flashy action game, this is probably aiming in a different direction.  
This project is more about clarity, rule handling, and a playable browser-game experience.

## FAQ

{{< faq q="Does it support online multiplayer?" >}}
Yes.  
It supports both local-tab multiplayer and remote multiplayer through a WebSocket server.
{{< /faq >}}

{{< faq q="How strong is the CPU?" >}}
There are three exposed difficulty levels: Easy, Normal, and Hard.  
Internally, the game switches between `random`, `heuristic`, and `lookahead` strategies.
{{< /faq >}}

{{< faq q="Can I review a game later?" >}}
Yes.  
Undo, logs, replay, and share links make it easier to revisit how a match unfolded.
{{< /faq >}}

## Closing thoughts

{{< article_points title="What I wanted this app to do" >}}
- make Dodgem feel comfortable to play in the browser
- keep CPU, online play, and sharing in one project
- keep the rules implementation readable and easy to maintain
- make matches easy to revisit through logs and replay
{{< /article_points >}}

`Dodgem Browser` is not just a plain rules port.  
I built it as a browser game that feels pleasant to play while still being structured in a way that is easy to keep extending.  
I think it works well both for people who simply want to play and for people who enjoy looking at how game logic is put together.
