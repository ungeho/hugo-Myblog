+++
title = "\"LoL Cooldown Overlay\": a League of Legends Spell Cooldown Overlay Developed with AI Assistance"
date = 2026-04-06T00:50:00+09:00
draft = false
description = "An English companion article introducing LoL Cooldown Overlay, a manual enemy spell cooldown overlay for League of Legends developed with AI assistance."
categories = ["League of Legends"]
tags = ["League of Legends", "overlay", "Electron", "React", "TypeScript"]
series = ["Introducing Apps Developed with AI Assistance"]
showtoc = true
tocopen = true
math = false
+++

{{< ai_translation_notice source="/posts/lol-cooldown-overlay-intro/" title="AI-assisted English companion" >}}
This English page presents a project I developed with AI assistance, with AI also used to help draft and translate the article.  
It is written as a creator-side introduction, not as an outside review.
{{< /ai_translation_notice >}}

{{< summary title="Quick Summary" >}}
- `LoL Cooldown Overlay` is a manual enemy spell cooldown overlay for League of Legends
- It does not read game memory and does not automate input
- It is intentionally designed to avoid Vanguard and rules-related risk as much as possible
{{< /summary >}}

{{< linkcard
  url="https://github.com/ungeho/lol-cooldown-overlay"
  title="GitHub: ungeho/lol-cooldown-overlay"
  desc="A League of Legends spell cooldown overlay that I developed with AI assistance."
  meta="Repository"
/>}}

## What kind of app is this?

`LoL Cooldown Overlay` is a **manual enemy spell cooldown overlay for League of Legends**.  
The most important design decision is also the simplest one: it does **not** read game memory and it does **not** automate actions.

That means the tool is built around three ideas:

- no automatic detection
- manual interaction
- fast enough overlay controls to still feel practical

I cared a lot about that choice.  
The biggest reason was that I wanted to avoid getting anywhere near Riot Vanguard or rules-related risk, and keep the app on a path that feels safer from a ban-risk point of view.  
Instead of pushing toward partial automation, I wanted to make a **manual overlay that still feels good to use**.

## What it can do

### Champion data management

The app starts with editable champion data.

- English and Japanese champion names
- champion registration, editing, and search
- favorites
- patch-based filtering
- skill-rank-specific cooldown data
- custom skill icons

I did not want the overlay to exist in isolation.  
I wanted the underlying champion data to be something I could maintain properly over time.

### Overlay features

On the overlay side, the features are focused on in-match usage.

- transparent frameless overlay
- always-on-top window
- click a skill button to start a countdown
- click again to cancel
- estimated skill rank by level bracket
- cooldown reduction based on Ability Haste
- settings mode for position, opacity, and scale
- configurable hotkeys

The goal here is not “a database app with a floating window.”  
It is an overlay that still makes sense during an actual match.

## Why I kept it fully manual

The biggest characteristic of this project is that it stays fully manual.

{{< compare left="Why I chose manual tracking" right="What that required" >}}
- I wanted to stay away from Vanguard and policy-related risk
- I wanted a direction that feels safer from a ban-risk perspective
- I did not want to rely on memory reading or automation at all
<!--split-->
- interaction has to be quick
- level and AH adjustments have to be easy
- the overlay itself must stay unobtrusive
{{< /compare >}}

Manual tracking sounds inconvenient at first, but it makes a lot of sense when the goal is to avoid that kind of risk entirely.  
That is why I cared so much about UI flow, hotkeys, and overlay behavior: if everything must stay manual, the manual path has to feel practical.

## Level brackets and cooldown calculation

The code estimates skill ranks from champion data, level brackets, and max-order information.

For regular skills, it uses:

- available skill points by level
- R rank-up timing
- the champion's `maxOrder`

to estimate Q/W/E/R ranks.

Then it layers in:

- Ability Haste
- cooldown offset adjustment
- Flash handling with Cosmic Insight

This part matters because I wanted the display to feel closer to what players actually care about in a match, not just to be a generic timer.

## Screen structure

### Editor page

The editor page handles:

- champion list
- search
- patch filtering
- favorites
- champion editing
- settings
- overlay launch

Favorite champions are shown first in the launch area so frequently used entries stay easy to access.

### Overlay page

The overlay page brings together:

- champion name
- sound toggle
- settings mode toggle
- close button
- level bracket bar
- AH input
- cooldown offset
- countdown sound timing
- dedicated Flash handling
- skill buttons

In settings mode, the overlay can be repositioned and resized directly, which helps it stay usable without taking over the screen.

## Hotkeys and usability

The app also supports configurable key bindings.  
By default:

- `Ctrl + Shift + S` toggles settings mode
- `Ctrl + Shift + X` closes the overlay
- `Ctrl + Shift + Right` moves to the next level bracket
- `Ctrl + Shift + Left` moves to the previous level bracket

That matters because overlays become annoying very quickly if they can only be managed through clumsy mouse interaction.

## Technical structure

Overall, the project is a fairly straightforward Electron app.

{{< compare left="UI side" right="Desktop side" >}}
- React
- TypeScript
- Vite
- separate editor and overlay views
<!--split-->
- Electron
- split `main` and `preload`
- IPC for settings and data
- local JSON persistence
{{< /compare >}}

The app stores data under `%APPDATA%/lol-cooldown-overlay/`, including:

- `champions.json`
- `settings.json`

That kind of explicit local storage felt right for this type of utility.

## Who this is for

{{< steps >}}
1. someone who wants to track enemy spell cooldowns manually in LoL
2. someone who does not want to rely on automatic detection or memory reading
3. someone who wants a lightweight overlay on top of the game
4. someone who wants editable champion data by patch
{{< /steps >}}

If your goal is fully automatic cooldown tracking, this tool is probably aiming at a different philosophy.

## FAQ

{{< faq q="Does it detect enemy skills automatically?" >}}
No.  
The tool is intentionally built around **fully manual interaction**.  
That design choice is mainly about staying away from Vanguard and rules-related risk as much as possible.
{{< /faq >}}

{{< faq q="Do I need to manually choose every skill rank?" >}}
Not entirely.  
The app estimates likely skill ranks from level brackets, then applies things like Ability Haste on top of that.
{{< /faq >}}

{{< faq q="Can I adjust how the overlay looks?" >}}
Yes.  
The settings mode lets you change position, opacity, and scale, and it restores the previous placement automatically.
{{< /faq >}}

## Closing thoughts

{{< article_points title="What I wanted this app to do" >}}
- create a LoL cooldown overlay that fully commits to manual tracking
- keep the in-match UI lightweight and usable
- make cooldown display feel more realistic through level and AH handling
- let champion data be edited and maintained over time
{{< /article_points >}}

`LoL Cooldown Overlay` is not meant to be flashy automation.  
I built it as a **practical overlay that still feels good to use even when everything is manual**.  
For players who want to actively track information themselves, that tradeoff makes a lot of sense.
