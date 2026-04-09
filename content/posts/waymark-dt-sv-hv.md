+++
title = '[Waymark Preset]至天の座アルカディア零式：ヘビー級'
date = 2026-04-09T14:19:09+09:00
draft = false
description = ""
categories = ["FFXIV"]
tags = ["FFXIV", "WaymarkPlugin"]
series = ["Waymark Preset"]
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
![m9s](/images/posts/waymark/m9s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":1069,"A":{"X":91.466,"Y":0.0,"Z":82.276,"ID":0,"Active":true},"B":{"X":118.841,"Y":0.0,"Z":91.493,"ID":1,"Active":true},"C":{"X":108.715,"Y":0.0,"Z":118.746,"ID":2,"Active":true},"D":{"X":81.592,"Y":0.0,"Z":108.614,"ID":3,"Active":true},"One":{"X":108.812,"Y":0.0,"Z":81.512,"ID":4,"Active":true},"Two":{"X":118.71,"Y":0.0,"Z":108.73,"ID":5,"Active":true},"Three":{"X":91.523,"Y":0.0,"Z":118.635,"ID":6,"Active":true},"Four":{"X":81.155,"Y":0.0,"Z":91.398,"ID":7,"Active":true}}
```

## 2層

{{< collapse summary="画像を開く" >}}
![m10s](/images/posts/waymark/m10s.png)
{{< /collapse >}}

```json
{"Name":"犬丸","MapID":1071,"A":{"X":99.982,"Y":0.0,"Z":87.919,"ID":0,"Active":true},"B":{"X":112.095,"Y":0.0,"Z":99.821,"ID":1,"Active":true},"C":{"X":99.848,"Y":0.0,"Z":112.947,"ID":2,"Active":true},"D":{"X":87.867,"Y":0.0,"Z":99.952,"ID":3,"Active":true},"One":{"X":94.251,"Y":0.0,"Z":95.879,"ID":4,"Active":true},"Two":{"X":105.586,"Y":0.0,"Z":95.878,"ID":5,"Active":true},"Three":{"X":105.63,"Y":0.0,"Z":104.409,"ID":6,"Active":true},"Four":{"X":94.399,"Y":0.0,"Z":104.385,"ID":7,"Active":true}}
```

## 3層

{{< collapse summary="画像を開く" >}}
![m11s](/images/posts/waymark/m11s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":1073,"A":{"X":99.944,"Y":0.0,"Z":89.959,"ID":0,"Active":true},"B":{"X":110.08,"Y":0.0,"Z":99.993,"ID":1,"Active":true},"C":{"X":99.961,"Y":0.0,"Z":110.016,"ID":2,"Active":true},"D":{"X":90.064,"Y":0.0,"Z":99.945,"ID":3,"Active":true},"One":{"X":83.936,"Y":0.0,"Z":86.696,"ID":4,"Active":true},"Two":{"X":115.89,"Y":0.0,"Z":86.796,"ID":5,"Active":true},"Three":{"X":115.998,"Y":0.0,"Z":113.232,"ID":6,"Active":true},"Four":{"X":84.019,"Y":0.0,"Z":113.138,"ID":7,"Active":true}}
```

## 4層前半

{{< collapse summary="画像を開く" >}}
![m12s-1](/images/posts/waymark/m12s-1.png)
{{< /collapse >}}

```json
{"Name":"前半","MapID":1075,"A":{"X":100.059,"Y":0.0,"Z":91.156,"ID":0,"Active":true},"B":{"X":108.922,"Y":0.0,"Z":100.022,"ID":1,"Active":true},"C":{"X":100.013,"Y":0.0,"Z":108.867,"ID":2,"Active":true},"D":{"X":91.167,"Y":0.0,"Z":100.034,"ID":3,"Active":true},"One":{"X":89.375,"Y":0.0,"Z":94.724,"ID":4,"Active":true},"Two":{"X":110.605,"Y":0.0,"Z":94.706,"ID":5,"Active":true},"Three":{"X":110.603,"Y":0.0,"Z":105.26,"ID":6,"Active":true},"Four":{"X":89.409,"Y":0.0,"Z":105.278,"ID":7,"Active":true}}
```

## 4層後半

{{< collapse summary="画像を開く" >}}
![m12s-2](/images/posts/waymark/m12s-2.png)
{{< /collapse >}}

```json
{"Name":"後半","MapID":1075,"A":{"X":100.098,"Y":0.0,"Z":86.334,"ID":0,"Active":true},"B":{"X":113.702,"Y":0.0,"Z":99.972,"ID":1,"Active":true},"C":{"X":99.986,"Y":0.0,"Z":113.573,"ID":2,"Active":true},"D":{"X":86.269,"Y":0.0,"Z":99.844,"ID":3,"Active":true},"One":{"X":91.883,"Y":0.0,"Z":91.784,"ID":4,"Active":true},"Two":{"X":108.079,"Y":0.0,"Z":91.711,"ID":5,"Active":true},"Three":{"X":108.167,"Y":0.0,"Z":108.17,"ID":6,"Active":true},"Four":{"X":91.834,"Y":0.0,"Z":108.206,"ID":7,"Active":true}}
```
