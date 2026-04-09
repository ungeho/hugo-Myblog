+++
title = '[Waymark Preset]Another Mount Rokkon'
date = 2026-04-09T14:45:53+09:00
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
![1boss](/images/posts/waymark/rokkon1.png)
{{< /collapse >}}

### Normal(1BOSS)

```json
{"Name":"1ボス","MapID":946,"A":{"X":0.0,"Y":0.0,"Z":-116.5,"ID":0,"Active":true},"B":{"X":16.5,"Y":0.0,"Z":-100.0,"ID":1,"Active":true},"C":{"X":0.0,"Y":0.0,"Z":-83.5,"ID":2,"Active":true},"D":{"X":-16.5,"Y":0.0,"Z":-100.0,"ID":3,"Active":true},"One":{"X":12.197592,"Y":0.0,"Z":-112.19759,"ID":4,"Active":true},"Two":{"X":12.197592,"Y":0.0,"Z":-87.80241,"ID":5,"Active":true},"Three":{"X":-12.197592,"Y":0.0,"Z":-87.80241,"ID":6,"Active":true},"Four":{"X":-12.197592,"Y":0.0,"Z":-112.19759,"ID":7,"Active":true}}
```

### Savage(1BOSS)

```json
{"Name":"1ボス","MapID":947,"A":{"X":0.0,"Y":0.0,"Z":-116.5,"ID":0,"Active":true},"B":{"X":16.5,"Y":0.0,"Z":-100.0,"ID":1,"Active":true},"C":{"X":0.0,"Y":0.0,"Z":-83.5,"ID":2,"Active":true},"D":{"X":-16.5,"Y":0.0,"Z":-100.0,"ID":3,"Active":true},"One":{"X":12.197592,"Y":0.0,"Z":-112.19759,"ID":4,"Active":true},"Two":{"X":12.197592,"Y":0.0,"Z":-87.80241,"ID":5,"Active":true},"Three":{"X":-12.197592,"Y":0.0,"Z":-87.80241,"ID":6,"Active":true},"Four":{"X":-12.197592,"Y":0.0,"Z":-112.19759,"ID":7,"Active":true}}
```

## 2BOSS

{{< collapse summary="Open image" >}}
![2boss](/images/posts/waymark/rokkon2.png)
{{< /collapse >}}

### Normal(2BOSS)

```json
{"Name":"2ボス","MapID":946,"A":{"X":300.004,"Y":7.0,"Z":-134.946,"ID":0,"Active":true},"B":{"X":315.014,"Y":7.0,"Z":-120.074,"ID":1,"Active":true},"C":{"X":299.967,"Y":7.0,"Z":-105.04,"ID":2,"Active":true},"D":{"X":285.059,"Y":7.0,"Z":-120.048,"ID":3,"Active":true},"One":{"X":307.495,"Y":7.0,"Z":-108.202,"ID":4,"Active":true},"Two":{"X":292.376,"Y":7.0,"Z":-108.371,"ID":5,"Active":true},"Three":{"X":319.63,"Y":7.0,"Z":-108.394,"ID":6,"Active":true},"Four":{"X":280.324,"Y":7.0,"Z":-108.302,"ID":7,"Active":true}}
```

### Savage(2BOSS)

```json
{"Name":"2ボス","MapID":947,"A":{"X":299.682,"Y":7.0,"Z":-134.729,"ID":0,"Active":true},"B":{"X":314.964,"Y":7.0,"Z":-119.988,"ID":1,"Active":true},"C":{"X":299.944,"Y":6.999,"Z":-105.125,"ID":2,"Active":true},"D":{"X":285.126,"Y":7.0,"Z":-119.842,"ID":3,"Active":true},"One":{"X":307.575,"Y":6.999,"Z":-108.191,"ID":4,"Active":true},"Two":{"X":292.317,"Y":7.0,"Z":-108.322,"ID":5,"Active":true},"Three":{"X":319.588,"Y":7.0,"Z":-108.159,"ID":6,"Active":true},"Four":{"X":280.416,"Y":7.0,"Z":-108.327,"ID":7,"Active":true}}
```

## 3BOSS

{{< collapse summary="Open image" >}}
![3boss](/images/posts/waymark/rokkon3.png)
{{< /collapse >}}

### Normal(3BOSS)

```json
{"Name":"3ボス","MapID":946,"A":{"X":-200.0,"Y":-195.0,"Z":-14.0,"ID":0,"Active":true},"B":{"X":-186.0,"Y":-195.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":-200.0,"Y":-195.0,"Z":14.0,"ID":2,"Active":true},"D":{"X":-214.0,"Y":-195.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

### Savage(3BOSS)

```json
{"Name":"3ボス","MapID":947,"A":{"X":-200.0,"Y":-195.0,"Z":-14.0,"ID":0,"Active":true},"B":{"X":-186.0,"Y":-195.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":-200.0,"Y":-195.0,"Z":14.0,"ID":2,"Active":true},"D":{"X":-214.0,"Y":-195.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":307.575,"Y":6.999,"Z":-108.191,"ID":4,"Active":false},"Two":{"X":292.317,"Y":7.0,"Z":-108.322,"ID":5,"Active":false},"Three":{"X":319.588,"Y":7.0,"Z":-108.159,"ID":6,"Active":false},"Four":{"X":280.416,"Y":7.0,"Z":-108.327,"ID":7,"Active":false}}
