+++
title = "Image Converter: An Image Conversion App Developed with AI Assistance"
date = 2026-04-06T01:10:00+09:00
draft = false
description = "An introduction to Image Converter, an image conversion app developed with AI assistance that converts PNG, JPEG, and WebP directly in the browser."
categories = ["Programming"]
tags = ["Image Conversion", "Web App", "React", "Vite", "Browser Tool"]
series = ["Introducing Apps Developed with AI Assistance"]
showtoc = true
tocopen = true
math = false
+++

{{< ai_translation_notice source="/posts/image-converter-intro/" title="AI-assisted English companion" >}}
This English page introduces an app I developed with AI assistance, with AI also used to help draft and translate the article.  
It is meant to read like a creator-written introduction rather than a neutral outside review.
{{< /ai_translation_notice >}}

{{< summary title="Quick Summary" >}}
- `Image Converter` is a local-first browser tool for converting image formats quickly
- It supports drag and drop, manual file selection, and clipboard paste
- It focuses on PNG / JPEG / WebP conversion with a simple quality control for JPEG and WebP
{{< /summary >}}

{{< linkcard
  url="https://github.com/ungeho/image-converter"
  title="GitHub: ungeho/image-converter"
  desc="A simple browser-based image conversion app developed with AI assistance."
  meta="Repository"
/>}}

## What kind of app is it?

`Image Converter` is a **small browser tool I developed with AI assistance to convert local images into another format quickly**.  
I often run into small image tasks where I do not want to open a heavy editor or upload files to an online conversion service just to change the output format.

That is why I wanted it to feel like this:

- fast to open and use
- local-first, without server upload
- comfortable on both desktop and narrow mobile widths

For this kind of task, I think a **small focused tool** is often more useful than a feature-heavy editor.

## What can it do?

{{< section_label tone="mint" >}}Simple ways to load an image{{< /section_label >}}

The app supports three input flows that are useful in day-to-day use:

- drag and drop an image file
- choose a file manually
- paste an image from the clipboard

Clipboard paste is especially nice for screenshots, because you can copy an image and immediately bring it in with `Ctrl + V`.

{{< section_label tone="blue" >}}A focused set of output formats{{< /section_label >}}

The output formats are intentionally kept small and practical:

- PNG
- JPEG
- WebP

Instead of offering too many options, I wanted the app to cover the formats I actually use most often and make the choice obvious.

### You can compare before and after

The app shows both the original image and the converted result.  
That makes it easier to check:

- what you loaded
- what the converted image looks like
- how the file size changed

It is not just about saving a file. I wanted the conversion result to be easy to confirm at a glance.

### Quality only when it matters

JPEG and WebP can use a quality slider.  
PNG does not rely on that kind of quality setting in the same way, so the slider is disabled for PNG output.

That balance is intentional. I wanted the app to stay simple, while still exposing the one setting that matters when you need it.

## Why I kept it local-first

The app does not upload images to a server.  
Instead, it uses the browser's `canvas` API and completes the conversion entirely on the frontend.

The reason is straightforward:

- I did not want small conversions to depend on a server
- I wanted personal images to stay local
- I wanted the setup and operation to stay light

Online tools are convenient, but if all you need is a quick conversion, **finishing the whole job in the browser** feels more comfortable.

## Practical behavior and limitations

### JPEG cannot keep transparency

If you convert a transparent image to JPEG, transparent areas become white.  
The UI already hints at this behavior so it is easier to understand before downloading.

### PNG does not use the quality slider

PNG is lossless, so the quality slider does not apply in the same way it does for JPEG or WebP.  
That is why the app disables quality control when PNG is selected.

### Clipboard paste may vary by browser

Paste support is very useful, but it can still depend on browser and OS behavior.  
That is why drag and drop and manual selection are still part of the main flow.

## Technical structure

The implementation is intentionally lightweight.

{{< compare left="Frontend" right="Conversion Flow" >}}
- React 18
- Vite 5
- single-screen UI
<!--split-->
- `FileReader` for loading
- `Image` and `canvas` for drawing
- `canvas.toBlob()` for conversion
{{< /compare >}}

Rather than relying on a large external processing stack, the app stays close to what browsers already handle well.  
The feature set is limited, but the implementation is easy to understand and easy to keep lightweight.

## Setup

Running it locally is simple:

```bash
npm install
npm run dev
```

Once the Vite dev server starts, the app is ready in the browser.

## Who is it for?

{{< steps >}}
1. People who want to convert PNG / JPEG / WebP quickly
2. People who do not want to upload images to an online converter
3. People who often paste screenshots directly from the clipboard
4. People who want a small tool instead of opening a full image editor
{{< /steps >}}

If you need advanced editing such as resizing, cropping, color adjustments, or batch conversion, the current direction of `Image Converter` is probably not the right fit.

## FAQ

{{< faq q="What kinds of input images does it accept?" >}}
In practice, it accepts image files the browser can read, plus image data from the clipboard.  
That is also how the README describes the input side.
{{< /faq >}}

{{< faq q="Does it support AVIF or more formats?" >}}
Not right now.  
The current output formats are intentionally limited to PNG, JPEG, and WebP, though the README mentions more formats as a possible future extension.
{{< /faq >}}

{{< faq q="Are images uploaded to a server?" >}}
No.  
The conversion runs in the browser through `canvas`.
{{< /faq >}}

## Closing thoughts

{{< article_points title="What I wanted this app to do" >}}
- make image conversion feel lighter
- keep the workflow local and simple
- shorten the flow with drag and drop and paste
- make the practical output formats easy to choose
{{< /article_points >}}

`Image Converter` is not meant to replace a full editor. It is a **small tool for the moment when all you want is to change the image format and move on quickly**.  
If that is the kind of workflow you want, I think this app fits very well.
