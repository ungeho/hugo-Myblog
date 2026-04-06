+++
title = "\"LAN Library\": a Local Library and Manga Viewer I Developed with AI Assistance"
date = 2026-04-06T00:30:00+09:00
draft = false
description = "An English companion article introducing LAN Library as a project developed with AI assistance: a local-only library and manga viewer designed for use within a home network."
categories = ["Programming"]
tags = ["LAN", "manga viewer", "local app", "React", "TypeScript"]
series = ["Introducing Apps Developed with AI Assistance"]
showtoc = true
tocopen = true
math = false
+++

{{< ai_translation_notice source="/posts/lan-library-intro/" title="AI-assisted English companion" >}}
This English page presents a project I developed with AI assistance, with AI also used to help draft and translate the article.  
It is meant to read like a creator-written introduction rather than a neutral outside review.
{{< /ai_translation_notice >}}

{{< summary title="Quick Summary" >}}
- `LAN Library` is a local library / manga viewer I developed with AI assistance for use inside a home LAN
- It supports both folders and ZIP files, along with drag-and-drop import and reading progress tracking
- I designed the bookshelf, detail page, and reader as separate parts of one simple home-library flow
{{< /summary >}}

{{< linkcard
  url="https://github.com/ungeho/lan-library"
  title="GitHub: ungeho/lan-library"
  desc="A local-only library and manga viewer that I developed with AI assistance for home-network use."
  meta="Repository"
/>}}

## What kind of app is this?

`LAN Library` is a **local library / manga viewer that I developed with AI assistance to live inside a home network**.  
Instead of pushing the collection into a cloud service, I wanted something that keeps the library on my own machine or NAS and opens it from other devices on the same LAN.

That design choice shaped the whole project.

- local-first
- LAN-friendly
- one server, multiple devices around the house

It is not meant to be a social reading platform.  
I built it to be **your own bookshelf, available where you actually live**.

## What it can do

{{< section_label tone="mint" >}}Import and management{{< /section_label >}}

On the management side, I tried to make the app practical enough to keep using after the collection grows.

- supports folders and ZIP files
- automatically detects content under `library/`
- accepts ZIP files via drag and drop
- can switch the library path with `LIBRARY_DIR`
- lets you edit title, section, series, volume, and categories
- supports bulk editing
- includes ratings
- tracks reading status and progress

I did not want this to stop at being “just an image viewer.”  
I wanted it to keep working as an actual bookshelf.

{{< section_label tone="blue" >}}Reading experience{{< /section_label >}}

The reader view also goes beyond simple page display.

- single-page / spread toggle
- right-to-left / left-to-right reading direction
- fullscreen mode
- keyboard navigation
- left / right click zones for navigation
- center click to show or hide UI

Reading direction is stored in `localStorage`, reading progress is remembered, and nearby pages are preloaded.  
Those are small details, but they reflect the kind of reading experience I wanted the app to have.

## The screen flow

I also wanted each page to have a very clear role.

### 1. Bookshelf

The bookshelf page handles discovery and organization.

- section tabs
- text search
- series filter
- category filter
- reading-status filter
- sorting by title, created date, page count, last read date, and rating
- bulk edit mode

Series entries are grouped together and ordered by volume, which helps the library feel closer to a real shelf than to a flat file list.

### 2. Detail page

The detail page combines reading access with metadata editing.

- cover display
- read button
- section, series, volume, and category display
- star rating
- reading-status updates
- creation of new sections, series, and categories
- thumbnail grid

That was a deliberate design choice.  
I wanted metadata editing to happen close to the reading flow, not in a totally separate admin-only screen.

### 3. Reader

The reader is clearly built for actual use.

- `ArrowLeft / ArrowRight` for navigation
- `PageUp / PageDown` support
- `Space` for next page
- `F` to toggle spread mode
- `Esc` to hide UI or leave fullscreen

The left/right behavior also respects the reading direction, which matters a lot for manga, so I made sure that part felt natural.

## What I wanted this project to do well

{{< compare left="What I tried to prioritize" right="What I intentionally did not aim for" >}}
- a clear and consistent scope
- local / LAN use as a real strength, not an afterthought
- a simple import flow
- bookshelf, metadata, and reader features that connect naturally
<!--split-->
- it is not meant for cloud-first reading
- setup is still more technical than a public web service
- sharing, syncing, and recommendations are outside its main goal
{{< /compare >}}

What matters most to me is that the project has a clear purpose.  
It is aimed at a specific reading environment, and I tried to make the feature set support that environment consistently.

## Setup is easy to picture

I also tried to keep the startup flow simple:

```bash
npm install
npm run dev
```

- frontend: `http://localhost:5173`
- API server: `http://localhost:3001`
- another device on the LAN: `http://<host-ip>:5173`

The library structure is also straightforward:

```text
library/
├── Work A/
├── Work B.zip
└── Work C/
```

That “just put files here and let the app find them” feeling was important to me for a local tool like this.

## Who this is for

I think this app fits people who:

{{< steps >}}
1. already keep image folders or ZIP-based books on their own machine or NAS
2. want to read them from a tablet or another PC inside the house
3. want better organization than a plain folder view
4. prefer a local-first setup over uploading everything to a cloud service
{{< /steps >}}

If that sounds like your use case, this project will probably make sense.

## FAQ

{{< faq q="Does it support archive formats other than ZIP?" >}}
The README explicitly lists **ZIP** support.  
For images, it mentions JPG, PNG, WebP, GIF, and AVIF.
{{< /faq >}}

{{< faq q="Can it work with a NAS library?" >}}
Yes. The README mentions `LIBRARY_DIR`, which makes it possible to point the server at a NAS or external storage location.
{{< /faq >}}

{{< faq q="Is it only a viewer, or also a library manager?" >}}
It is both. Based on the code and README, it supports sections, series, categories, volume numbers, ratings, and reading status in addition to the viewer itself.
{{< /faq >}}

## Closing thoughts

{{< article_points title="What I wanted this app to be" >}}
- a LAN-only, local-first library and manga viewer
- something that connects import, organization, and reading in one flow
- a reader with small but meaningful usability details such as saved progress and nearby-page preloading
- a personal bookshelf that feels comfortable across devices at home
{{< /article_points >}}

Rather than trying to become everything at once, I wanted `LAN Library` to stay focused on one very specific and understandable goal:  
**make a private home-network bookshelf comfortable to use.**
