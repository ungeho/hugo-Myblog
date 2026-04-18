+++
title = '[FFXIV Waymark Presets]Abyssos (Savage)'
date = 2026-04-09T13:21:22+09:00
draft = false
description = ""
categories = ["FFXIV"]
tags = ["FFXIV", "WaymarkPlugin"]
series = ["FFXIV Waymark Presets"]
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

## P5S

{{< collapse summary="Open Image" >}}
![p5s](/images/posts/waymark/p5s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":873,"A":{"X":100.0,"Y":-300.0,"Z":87.0,"ID":0,"Active":true},"B":{"X":113.0,"Y":-300.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":-300.0,"Z":113.0,"ID":2,"Active":true},"D":{"X":87.0,"Y":-300.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":107.424,"Y":-300.0,"Z":92.575,"ID":4,"Active":true},"Two":{"X":107.424,"Y":-300.0,"Z":107.424,"ID":5,"Active":true},"Three":{"X":92.575,"Y":-300.0,"Z":107.424,"ID":6,"Active":true},"Four":{"X":92.575,"Y":-300.0,"Z":92.575,"ID":7,"Active":true}}
```

## P6S

{{< collapse summary="Open Image" >}}
![p6s](/images/posts/waymark/p6s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":881,"A":{"X":108.978,"Y":0.0,"Z":91.432,"ID":0,"Active":true},"B":{"X":115.072,"Y":0.0,"Z":100.072,"ID":1,"Active":true},"C":{"X":109.026,"Y":0.0,"Z":108.851,"ID":2,"Active":true},"D":{"X":105.182,"Y":0.0,"Z":99.969,"ID":3,"Active":true},"One":{"X":91.044,"Y":0.0,"Z":91.07,"ID":4,"Active":true},"Two":{"X":84.077,"Y":0.0,"Z":100.253,"ID":5,"Active":true},"Three":{"X":90.907,"Y":0.0,"Z":108.882,"ID":6,"Active":true},"Four":{"X":94.926,"Y":0.0,"Z":99.912,"ID":7,"Active":true}}
```

## P7S

{{< collapse summary="Open Image" >}}
![p7s](/images/posts/waymark/p7s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":877,"A":{"X":113.369,"Y":0.0,"Z":86.434,"ID":0,"Active":true},"B":{"X":119.137,"Y":0.0,"Z":95.71,"ID":1,"Active":true},"C":{"X":112.968,"Y":0.0,"Z":99.795,"ID":2,"Active":true},"D":{"X":113.236,"Y":0.0,"Z":93.02,"ID":3,"Active":true},"One":{"X":86.039,"Y":0.0,"Z":86.028,"ID":4,"Active":true},"Two":{"X":80.574,"Y":0.0,"Z":95.45,"ID":5,"Active":true},"Three":{"X":86.424,"Y":0.0,"Z":99.842,"ID":6,"Active":true},"Four":{"X":86.249,"Y":0.0,"Z":92.911,"ID":7,"Active":true}}
```

## P8S-1

{{< collapse summary="Open Image" >}}
![p8s-1](/images/posts/waymark/p8s-1.png)
{{< /collapse >}}

```json
{"Name":"前半","MapID":884,"A":{"X":100.0,"Y":0.0,"Z":91.5,"ID":0,"Active":true},"B":{"X":108.5,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":108.5,"ID":2,"Active":true},"D":{"X":91.5,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":91.5,"Y":0.0,"Z":91.5,"ID":4,"Active":true},"Two":{"X":108.5,"Y":0.0,"Z":91.5,"ID":5,"Active":true},"Three":{"X":108.5,"Y":0.0,"Z":108.5,"ID":6,"Active":true},"Four":{"X":91.5,"Y":0.0,"Z":108.5,"ID":7,"Active":true}}
```

## P8S-2

{{< collapse summary="Open Image" >}}
![p8s-2](/images/posts/waymark/p8s-2.png)
{{< /collapse >}}

```json
{"Name":"後半","MapID":884,"A":{"X":99.981,"Y":0.0,"Z":80.38,"ID":0,"Active":true},"B":{"X":119.542,"Y":0.0,"Z":100.018,"ID":1,"Active":true},"C":{"X":100.031,"Y":0.0,"Z":119.393,"ID":2,"Active":true},"D":{"X":80.591,"Y":0.0,"Z":99.891,"ID":3,"Active":true},"One":{"X":99.979,"Y":0.0,"Z":85.013,"ID":4,"Active":true},"Two":{"X":99.89,"Y":0.0,"Z":94.893,"ID":5,"Active":true},"Three":{"X":89.96,"Y":0.0,"Z":89.653,"ID":6,"Active":true},"Four":{"X":110.085,"Y":0.0,"Z":89.897,"ID":7,"Active":true}}
```
