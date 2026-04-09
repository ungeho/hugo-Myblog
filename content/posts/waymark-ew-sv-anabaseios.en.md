+++
title = '[Waymark Preset]Anabaseios (Savage)'
date = 2026-04-09T13:30:15+09:00
draft = false
description = ""
categories = ["FFXIV"]
tags = ["FFXIV", "WaymarkPlugin"]
series = ["Waymark Preset"]
showtoc = true
tocopen = true
math = false
+++

{{< ai_translation_notice sourceLang="Japanese" targetLang="English" >}}
This companion article follows the same Waymark Preset template in English.
{{< /ai_translation_notice >}}

{{< summary title="What This Article Covers" >}}
- A Waymark Preset article for XIVLauncher users
- How to copy and import the preset
- A screenshot and code block for each content section
{{< /summary >}}

{{< linkcard 
  url="https://github.com/Infiziert90/WaymarkPresetPlugin"
  title="Waymark Preset Plugin"
  desc="The Waymark Preset Plugin repository. Check this first if you need setup details."
  meta="Repository"
/>}}

## How to Use This Article

This template assumes that `XIVLauncher` and `Waymark Preset Plugin` are already installed.

## How to Import

{{< faq q="How do I import a preset from a code block?" >}}

1. Copy the preset you want from a code block
2. Type `/pwaymark` in the in-game chat to open `Waymark Library`
3. Open the `Import Options` tab
4. Focus the field labeled `Paste a preset here and click "Import".`, then press `Ctrl + V`
5. Click the `Import` button

{{< /faq >}}

{{< faq q="How do I place an imported preset into a field marker slot?" >}}

1. Type `/pwaymark` in the in-game chat to open `Waymark Library`
2. Open the tab for the content you want
3. Select the preset you want, or choose `Imported`
4. In `Preset Info`, choose the target field marker slot from the menu next to `Copy to slot`
5. Click `Copy to slot`

{{< /faq >}}

## P9S

{{< collapse summary="Open Image" >}}
![p9s](/images/posts/waymark/p9s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":937,"A":{"X":100.0,"Y":0.0,"Z":86.05,"ID":0,"Active":true},"B":{"X":113.95,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":113.95,"ID":2,"Active":true},"D":{"X":86.05,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":109.864,"Y":0.0,"Z":90.135,"ID":4,"Active":true},"Two":{"X":109.864,"Y":0.0,"Z":109.864,"ID":5,"Active":true},"Three":{"X":90.135,"Y":0.0,"Z":109.864,"ID":6,"Active":true},"Four":{"X":90.135,"Y":0.0,"Z":90.135,"ID":7,"Active":true}}
```

## P10S

{{< collapse summary="Open Image" >}}
![p10s](/images/posts/waymark/p10s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":939,"A":{"X":91.898,"Y":0.0,"Z":85.354,"ID":0,"Active":true},"B":{"X":108.234,"Y":0.0,"Z":85.355,"ID":1,"Active":true},"C":{"X":91.951,"Y":0.0,"Z":99.815,"ID":2,"Active":true},"D":{"X":108.077,"Y":0.0,"Z":99.815,"ID":3,"Active":true},"One":{"X":91.702,"Y":0.0,"Z":111.233,"ID":4,"Active":true},"Two":{"X":108.209,"Y":0.0,"Z":111.297,"ID":5,"Active":true},"Three":{"X":99.834,"Y":0.0,"Z":111.352,"ID":6,"Active":true},"Four":{"X":99.817,"Y":0.0,"Z":98.11,"ID":7,"Active":true}}
```

## P11S

{{< collapse summary="Open Image" >}}
![p11s](/images/posts/waymark/p11s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":941,"A":{"X":100.254,"Y":0.0,"Z":87.109,"ID":0,"Active":true},"B":{"X":112.971,"Y":0.0,"Z":99.939,"ID":1,"Active":true},"C":{"X":99.947,"Y":0.0,"Z":112.982,"ID":2,"Active":true},"D":{"X":87.072,"Y":0.0,"Z":100.008,"ID":3,"Active":true},"One":{"X":109.116,"Y":0.0,"Z":90.811,"ID":4,"Active":true},"Two":{"X":109.233,"Y":0.0,"Z":109.129,"ID":5,"Active":true},"Three":{"X":90.827,"Y":0.0,"Z":109.133,"ID":6,"Active":true},"Four":{"X":90.895,"Y":0.0,"Z":90.816,"ID":7,"Active":true}}
```

## P12S-1

{{< collapse summary="Open Image" >}}
![p12s-1](/images/posts/waymark/p12s-1.png)
{{< /collapse >}}

```json
{"Name":"前半マーカー（ぬけまる）","MapID":943,"A":{"X":100.049,"Y":0.0,"Z":81.363,"ID":0,"Active":true},"B":{"X":118.977,"Y":0.0,"Z":99.983,"ID":1,"Active":true},"C":{"X":99.819,"Y":0.0,"Z":118.997,"ID":2,"Active":true},"D":{"X":81.01,"Y":0.0,"Z":100.065,"ID":3,"Active":true},"One":{"X":110.051,"Y":0.0,"Z":90.069,"ID":4,"Active":true},"Two":{"X":109.923,"Y":0.0,"Z":109.992,"ID":5,"Active":true},"Three":{"X":89.963,"Y":0.0,"Z":110.033,"ID":6,"Active":true},"Four":{"X":89.887,"Y":0.0,"Z":90.03,"ID":7,"Active":true}}
```

## P12S-2

{{< collapse summary="Open Image" >}}
![p12s-2](/images/posts/waymark/p12s-2.png)
{{< /collapse >}}

```json
{"Name":"後半マーカー(game8)","MapID":943,"A":{"X":97.25,"Y":0.0,"Z":92.5,"ID":0,"Active":true},"B":{"X":102.75,"Y":0.0,"Z":92.5,"ID":1,"Active":true},"C":{"X":102.834,"Y":0.0,"Z":97.21,"ID":2,"Active":true},"D":{"X":97.264,"Y":0.0,"Z":97.263,"ID":3,"Active":true},"One":{"X":99.011,"Y":0.0,"Z":80.93,"ID":4,"Active":true},"Two":{"X":119.063,"Y":0.0,"Z":90.153,"ID":5,"Active":true},"Three":{"X":105.5,"Y":0.0,"Z":101.0,"ID":6,"Active":true},"Four":{"X":94.5,"Y":0.0,"Z":101.0,"ID":7,"Active":true}}
```
