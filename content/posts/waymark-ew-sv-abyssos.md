+++
title = '[FFXIV Waymark Presets]万魔殿パンデモニウム零式：煉獄編'
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


{{< summary title="この記事の内容" >}}
- `XIVLauncher` の `Waymark Preset Plugin` で利用できるプリセット記事
- コードブロックからプリセットをコピーして導入できる
- コンテンツごとに画像とコードを見比べながら確認できる
{{< /summary >}}

{{< linkcard 
  url="https://github.com/Infiziert90/WaymarkPresetPlugin"
  title="Waymark Preset Plugin"
  desc="Waymark Preset Plugin のリポジトリです。導入前に確認したいときはこちら。"
  meta="Repository"
/>}}

## 導入方法

`XIVLauncher` と `Waymark Preset Plugin` は導入済みであることを前提とします。

{{< faq q="フィールドマーカーの導入方法は？" >}}

1. 任意のコードブロックから導入したいプリセットをコピーする
2. ゲーム内チャットで `/pwaymark` を入力して `Waymark Library` を開く
3. `Import Options` タブを開く
4. `Paste a preset here and click "Import".` と書かれた欄にフォーカスして `Ctrl + V`
5. `Import` ボタンをクリックする

{{< /faq >}}

{{< faq q="導入したフィールドマーカーを設置できるようにするには？" >}}

1. ゲーム内チャットで `/pwaymark` を入力して `Waymark Library` を開く
2. 任意のコンテンツ名のタブを開く
3. 任意のプリセット、または `Imported` をクリックする
4. `Preset Info` の `Copy to slot` の隣にあるメニューから、上書きしたいフィールドマーカーのスロット番号を選ぶ
5. `Copy to slot` ボタンを押す

{{< /faq >}}

## 1層

{{< collapse summary="画像を開く" >}}
![p5s](/images/posts/waymark/p5s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":873,"A":{"X":100.0,"Y":-300.0,"Z":87.0,"ID":0,"Active":true},"B":{"X":113.0,"Y":-300.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":-300.0,"Z":113.0,"ID":2,"Active":true},"D":{"X":87.0,"Y":-300.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":107.424,"Y":-300.0,"Z":92.575,"ID":4,"Active":true},"Two":{"X":107.424,"Y":-300.0,"Z":107.424,"ID":5,"Active":true},"Three":{"X":92.575,"Y":-300.0,"Z":107.424,"ID":6,"Active":true},"Four":{"X":92.575,"Y":-300.0,"Z":92.575,"ID":7,"Active":true}}
```

## 2層

{{< collapse summary="画像を開く" >}}
![p6s](/images/posts/waymark/p6s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":881,"A":{"X":108.978,"Y":0.0,"Z":91.432,"ID":0,"Active":true},"B":{"X":115.072,"Y":0.0,"Z":100.072,"ID":1,"Active":true},"C":{"X":109.026,"Y":0.0,"Z":108.851,"ID":2,"Active":true},"D":{"X":105.182,"Y":0.0,"Z":99.969,"ID":3,"Active":true},"One":{"X":91.044,"Y":0.0,"Z":91.07,"ID":4,"Active":true},"Two":{"X":84.077,"Y":0.0,"Z":100.253,"ID":5,"Active":true},"Three":{"X":90.907,"Y":0.0,"Z":108.882,"ID":6,"Active":true},"Four":{"X":94.926,"Y":0.0,"Z":99.912,"ID":7,"Active":true}}
```

## 3層

{{< collapse summary="画像を開く" >}}
![p7s](/images/posts/waymark/p7s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":877,"A":{"X":113.369,"Y":0.0,"Z":86.434,"ID":0,"Active":true},"B":{"X":119.137,"Y":0.0,"Z":95.71,"ID":1,"Active":true},"C":{"X":112.968,"Y":0.0,"Z":99.795,"ID":2,"Active":true},"D":{"X":113.236,"Y":0.0,"Z":93.02,"ID":3,"Active":true},"One":{"X":86.039,"Y":0.0,"Z":86.028,"ID":4,"Active":true},"Two":{"X":80.574,"Y":0.0,"Z":95.45,"ID":5,"Active":true},"Three":{"X":86.424,"Y":0.0,"Z":99.842,"ID":6,"Active":true},"Four":{"X":86.249,"Y":0.0,"Z":92.911,"ID":7,"Active":true}}
```

## 4層前半

{{< collapse summary="画像を開く" >}}
![p8s-1](/images/posts/waymark/p8s-1.png)
{{< /collapse >}}

```json
{"Name":"前半","MapID":884,"A":{"X":100.0,"Y":0.0,"Z":91.5,"ID":0,"Active":true},"B":{"X":108.5,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":108.5,"ID":2,"Active":true},"D":{"X":91.5,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":91.5,"Y":0.0,"Z":91.5,"ID":4,"Active":true},"Two":{"X":108.5,"Y":0.0,"Z":91.5,"ID":5,"Active":true},"Three":{"X":108.5,"Y":0.0,"Z":108.5,"ID":6,"Active":true},"Four":{"X":91.5,"Y":0.0,"Z":108.5,"ID":7,"Active":true}}
```

## 4層後半

{{< collapse summary="画像を開く" >}}
![p8s-2](/images/posts/waymark/p8s-2.png)
{{< /collapse >}}

```json
{"Name":"後半","MapID":884,"A":{"X":99.981,"Y":0.0,"Z":80.38,"ID":0,"Active":true},"B":{"X":119.542,"Y":0.0,"Z":100.018,"ID":1,"Active":true},"C":{"X":100.031,"Y":0.0,"Z":119.393,"ID":2,"Active":true},"D":{"X":80.591,"Y":0.0,"Z":99.891,"ID":3,"Active":true},"One":{"X":99.979,"Y":0.0,"Z":85.013,"ID":4,"Active":true},"Two":{"X":99.89,"Y":0.0,"Z":94.893,"ID":5,"Active":true},"Three":{"X":89.96,"Y":0.0,"Z":89.653,"ID":6,"Active":true},"Four":{"X":110.085,"Y":0.0,"Z":89.897,"ID":7,"Active":true}}
```
