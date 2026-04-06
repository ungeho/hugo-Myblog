+++
title = "\"Black Path Game\": a Browser Game Developed with AI Assistance"
date = 2026-04-06T01:05:00+09:00
draft = false
description = "An English companion article introducing Black Path Game, a browser-based path-building game with missing cells, traps, and time limits, developed with AI assistance."
categories = ["Programming"]
tags = ["game", "browser game", "React", "TypeScript", "puzzle game"]
series = ["Introducing Apps Developed with AI Assistance"]
showtoc = true
tocopen = true
math = false
+++

{{< ai_translation_notice source="/posts/black-path-game-intro/" title="AI-assisted English companion" >}}
This English page presents a project I developed with AI assistance, with AI also used to help draft and translate the article.  
It is written as a creator-side introduction, not as an outside review.
{{< /ai_translation_notice >}}

{{< summary title="Quick Summary" >}}
- `Black Path Game` is a browser-based two-player path-building game
- It is inspired by Black, but the current version plays quite differently
- Missing cells, traps, and per-turn time limits are the core ideas that define this variant
{{< /summary >}}

{{< linkcard
  url="https://github.com/ungeho/black-path-variant"
  title="GitHub: ungeho/black-path-variant"
  desc="A browser-based Black-inspired game variant that I developed with AI assistance."
  meta="Repository"
/>}}

## Screenshot

![Black Path Game gameplay screen](/images/posts/black-path-game/gameplay.png)

The current screen layout is built around **the board in the center, a HUD at the top, and a settings panel on the right**.  
Even after adding more rule layers, I wanted the interface to stay readable enough that players can still understand what their options are at a glance.

## What kind of game is this?

`Black Path Game` is a **browser-based two-player path-building game that I developed with AI assistance**.  
It is loosely rooted in the idea behind Black, but I did not want to make a strict recreation. Instead, I wanted to push it toward a different style of head-to-head reading game through **missing cells, traps, and time limits**.

The main goals were:

- keep the rules readable
- create stronger mind games for competitive play
- make the game work both against another person and against AI

## What is Black Path Game?

The original `Black Path Game` is generally attributed to Larry Black in 1960.  
At its core, it is a two-player board game about extending a path while avoiding the move that sends that path out through the edge of the board.

My version borrows that basic idea, but then adds:

- fixed and random missing cells
- hidden-information traps
- short per-turn time limits

So I think it is more accurate to describe this project as a **competitive Black-inspired variant** rather than a direct reproduction of the original game.

## What do you do in the game?

You place tiles on the next available cell at the tip of the path and keep extending it forward.  
The starting cross tile is already placed in the top-left corner, and the route grows from there.

At a basic level, the flow is:

- place a tile at the current path frontier
- let the path auto-follow through existing tiles
- lose if your move pushes the route into danger

But this version adds more pressure than that.  
The bottom-right corner is always a missing cell, and the game can also add **extra random missing cells** based on the selected setting.

## The three biggest ideas in this variant

### Missing cells

The bottom-right cell is always missing.  
On top of that, you can add a chosen number of **random missing cells** to the board.

That means you are not only trying to avoid the edge of the board.  
You are also constantly evaluating where the holes are and how they distort safe-looking routes.

I like this because it changes the board without making the interface more complicated.

### Traps

The trap system is the most distinctive part of this variant.

Each player can place a configured number of traps on chosen cells before the main game begins.  
A trap does not block the cell entirely. Instead, it disables **one of the three tile choices** that would normally be available there.

So when the path reaches that cell later, the number of options is reduced.

{{< compare left="When traps overlap on the same cell" right="What happens to the choices" >}}
- both players block the same tile type
- both players block different tile types
<!--split-->
- the cell still has 2 choices
- the cell is reduced to just 1 choice
{{< /compare >}}

That makes traps more interesting than simple forbidden cells.  
They reshape future branching.

Another important point is visibility:  
you can see the traps that **you** placed, but you cannot see the traps placed by the opponent.  
So the game includes hidden information and reading the other player's intentions.

### Time limits

The current version also supports per-turn time limits: `none / 3s / 5s / 7s / 9s`.

That changes the feel of the game a lot:

- you cannot spend forever trying to infer trap positions
- endgames become sharper and more stressful
- even familiar boards feel different under short thinking time

This matters because it pushes the game away from being only a calm puzzle and closer to being a tense competitive duel.

## Screen structure and controls

The current layout is split into:

- the board
- a top HUD
- a right-side panel for actions and game settings

The right panel lets you change:

- `PvP / vs AI`
- `Easy / Medium / Hard`
- `first / second`
- board size
- missing cell count
- trap count
- time limit

So the app is not locked into one static ruleset.  
You can tune the shape of the match quite a lot from the same screen.

On the board side, I tried to keep the state readable through:

- legal-move highlighting
- visible route flow
- readable recent progression
- trap placement visibility for the current player during the trap phase

## It also supports AI matches

The game supports both local PvP and `vs AI`.  
The AI has three difficulty levels: `Easy`, `Medium`, and `Hard`.

That helps when:

- you just want to learn the rules
- you want to test a configuration quickly
- you want to practice the feel of missing cells and traps without another player

## What kind of mind game does it create?

What makes this game interesting is that you are not only reading the visible route.

You are also thinking about:

- where the missing cells are
- whether a future cell may have reduced options because of traps
- how much you can read before the timer runs out

{{< steps >}}
1. read the visible danger in the current route
2. watch for lines that can collapse into missing cells
3. imagine what hidden traps the opponent may have placed
4. make that decision quickly if a time limit is active
{{< /steps >}}

That layering is what gives this variant its personality.

## Technical structure

Technically, this is a React + TypeScript + Vite browser game.

{{< compare left="UI side" right="Game-logic side" >}}
- React
- TypeScript
- Vite
- CSS Modules
<!--split-->
- board state
- legal move generation
- game flow
- trap placement
- AI search
{{< /compare >}}

The implementation separates responsibilities across files like:

- `engine.ts`
- `moveGenerator.ts`
- `rules.ts`
- `ai.ts`

That helps because even if the README is outdated, the current rules are still fairly easy to track from the code.

## Who this is for

{{< steps >}}
1. someone who likes games that look simple but hide deeper reading
2. someone who enjoys hidden information and reduced-option traps
3. someone who wants both local PvP and AI play in one browser game
4. someone curious about a Black-inspired variant rather than a strict recreation
{{< /steps >}}

If you want a very faithful implementation of the original idea, this is probably aiming somewhere else.  
This project is better understood as a Black-inspired competitive variant with its own personality.

## FAQ

{{< faq q="Is this the same as the original Black?" >}}
Not exactly.  
It starts from a similar idea, but missing cells, traps, and time limits change the game quite a lot.
{{< /faq >}}

{{< faq q="How do traps work visually?" >}}
You can inspect the traps that you placed, but you cannot see the opponent's trap locations.  
So the game includes hidden information during real play.
{{< /faq >}}

{{< faq q="What if both players trap the same cell?" >}}
If both players block the same tile type, the cell still has 2 choices.  
If they block different tile types, the cell is reduced to just 1 remaining choice.
{{< /faq >}}

## Closing thoughts

{{< article_points title="What I wanted this app to do" >}}
- build a Black-inspired game that develops a different kind of mind game
- increase tension through missing cells, traps, and short time limits
- make it playable both as PvP and as an AI game
- keep the UI readable even after adding extra rule layers
{{< /article_points >}}

`Black Path Game` is my attempt to take a familiar core idea and bend it toward a more competitive, more deceptive variant.  
With missing cells, hidden-information traps, and short timers working together, it becomes much more tense than the clean board layout first suggests.
