+++
title = '[FFXIV Waymark Presets] {{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
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

## Content Name 1

{{< collapse summary="Open image" >}}
![Hades](/images/posts/waymark/sb-ex-hades.png)
{{< /collapse >}}

```json
{
  "Name": "Content 1",
  "MapID": 0
}
```

## Content Name 2

{{< collapse summary="Open image" >}}
![Hades](/images/posts/waymark/sb-ex-hades.png)
{{< /collapse >}}

```json
{
  "Name": "Content 2",
  "MapID": 0
}
```

## Content Name 3

{{< collapse summary="Open image" >}}
![Hades](/images/posts/waymark/sb-ex-hades.png)
{{< /collapse >}}

```json
{
  "Name": "Content 3",
  "MapID": 0
}
```
