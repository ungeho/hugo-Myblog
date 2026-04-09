+++
title = '[Waymark Preset]Another Aloalo Island'
date = 2026-04-09T14:55:45+09:00
draft = true
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

## 1BOSS

{{< collapse summary="Open image" >}}
![1boss](/images/posts/waymark/aloalo1.png)
{{< /collapse >}}

### Normal(1BOSS)

```json
{"Name":"1ボス","MapID":979,"A":{"X":0.0,"Y":0.0,"Z":-15.0,"ID":0,"Active":true},"B":{"X":15.0,"Y":0.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":0.0,"Y":0.0,"Z":15.0,"ID":2,"Active":true},"D":{"X":-15.0,"Y":0.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

### Savage(1BOSS)

```json
{"Name":"1ボス","MapID":980,"A":{"X":0.0,"Y":0.0,"Z":-10.0,"ID":0,"Active":true},"B":{"X":10.0,"Y":0.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":0.0,"Y":0.0,"Z":10.0,"ID":2,"Active":true},"D":{"X":-10.0,"Y":0.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

## 2BOSS

{{< collapse summary="Open image" >}}
![2boss](/images/posts/waymark/aloalo2.png)
{{< /collapse >}}

### Normal(2BOSS)

```json
{"Name":"2ボス","MapID":979,"A":{"X":200.0,"Y":-300.0,"Z":-12.0,"ID":0,"Active":true},"B":{"X":212.0,"Y":-300.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":200.0,"Y":-300.0,"Z":12.0,"ID":2,"Active":true},"D":{"X":188.0,"Y":-300.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

### Savage(2BOSS)

```json
{"Name":"2ボス","MapID":980,"A":{"X":200.0,"Y":-300.0,"Z":-12.0,"ID":0,"Active":true},"B":{"X":212.0,"Y":-300.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":200.0,"Y":-300.0,"Z":12.0,"ID":2,"Active":true},"D":{"X":188.0,"Y":-300.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

## 3BOSS

{{< collapse summary="Open image" >}}
![3boss](/images/posts/waymark/aloalo3.png)
{{< /collapse >}}

### Normal(3BOSS)

```json
{"Name":"3ボス","MapID":979,"A":{"X":-200.0,"Y":-200.0,"Z":-7.0,"ID":0,"Active":true},"B":{"X":-193.0,"Y":-200.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":-200.0,"Y":-200.0,"Z":7.0,"ID":2,"Active":true},"D":{"X":-207.0,"Y":-200.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":-189.3934,"Y":-200.0,"Z":-10.606602,"ID":4,"Active":true},"Two":{"X":-189.3934,"Y":-200.0,"Z":10.606602,"ID":5,"Active":true},"Three":{"X":-210.6066,"Y":-200.0,"Z":10.606602,"ID":6,"Active":true},"Four":{"X":-210.6066,"Y":-200.0,"Z":-10.606602,"ID":7,"Active":true}}
```

### Savage(3BOSS)

```json
{"Name":"3ボス","MapID":980,"A":{"X":-200.0,"Y":-200.0,"Z":-7.0,"ID":0,"Active":true},"B":{"X":-193.0,"Y":-200.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":-200.0,"Y":-200.0,"Z":7.0,"ID":2,"Active":true},"D":{"X":-207.0,"Y":-200.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":-189.3934,"Y":-200.0,"Z":-10.606602,"ID":4,"Active":true},"Two":{"X":-189.3934,"Y":-200.0,"Z":10.606602,"ID":5,"Active":true},"Three":{"X":-210.6066,"Y":-200.0,"Z":10.606602,"ID":6,"Active":true},"Four":{"X":-210.6066,"Y":-200.0,"Z":-10.606602,"ID":7,"Active":true}}
```
