+++
title = '[Waymark Preset]万魔殿パンデモニウム零式：辺獄編'
date = 2026-04-09T13:08:09+09:00
draft = true
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
![p1s](/images/posts/waymark/p1s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":809,"A":{"X":100.162,"Y":0.0,"Z":96.835,"ID":0,"Active":true},"B":{"X":103.721,"Y":0.0,"Z":100.128,"ID":1,"Active":true},"C":{"X":99.919,"Y":0.0,"Z":103.221,"ID":2,"Active":true},"D":{"X":96.735,"Y":0.0,"Z":99.773,"ID":3,"Active":true},"One":{"X":109.99,"Y":0.0,"Z":90.898,"ID":4,"Active":true},"Two":{"X":109.466,"Y":0.0,"Z":109.281,"ID":5,"Active":true},"Three":{"X":90.763,"Y":0.0,"Z":109.375,"ID":6,"Active":true},"Four":{"X":90.627,"Y":0.0,"Z":90.71,"ID":7,"Active":true}}
```

## 2層

{{< collapse summary="画像を開く" >}}
![p2s](/images/posts/waymark/p2s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":811,"A":{"X":112.261,"Y":0.499,"Z":87.969,"ID":0,"Active":true},"B":{"X":112.499,"Y":0.5,"Z":112.661,"ID":1,"Active":true},"C":{"X":87.493,"Y":0.5,"Z":112.267,"ID":2,"Active":true},"D":{"X":87.257,"Y":0.5,"Z":87.431,"ID":3,"Active":true},"One":{"X":99.964,"Y":0.0,"Z":90.34,"ID":4,"Active":true},"Two":{"X":109.638,"Y":0.0,"Z":99.966,"ID":5,"Active":true},"Three":{"X":100.012,"Y":0.0,"Z":109.578,"ID":6,"Active":true},"Four":{"X":90.462,"Y":0.0,"Z":99.896,"ID":7,"Active":true}}
```

## 3層

{{< collapse summary="画像を開く" >}}
![p3s](/images/posts/waymark/p3s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":807,"A":{"X":100.014,"Y":0.0,"Z":81.27,"ID":0,"Active":true},"B":{"X":118.705,"Y":0.0,"Z":100.152,"ID":1,"Active":true},"C":{"X":99.982,"Y":0.0,"Z":118.989,"ID":2,"Active":true},"D":{"X":80.633,"Y":0.0,"Z":99.67,"ID":3,"Active":true},"One":{"X":100.06,"Y":0.0,"Z":93.201,"ID":4,"Active":true},"Two":{"X":106.4,"Y":0.0,"Z":100.039,"ID":5,"Active":true},"Three":{"X":99.992,"Y":0.0,"Z":106.355,"ID":6,"Active":true},"Four":{"X":94.041,"Y":0.0,"Z":100.008,"ID":7,"Active":true}}
```

## 4層前半

{{< collapse summary="画像を開く" >}}
![p4s-1](/images/posts/waymark/p4s-1.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":801,"A":{"X":100.052,"Y":0.0,"Z":84.688,"ID":0,"Active":true},"B":{"X":115.218,"Y":0.0,"Z":100.104,"ID":1,"Active":true},"C":{"X":99.796,"Y":0.0,"Z":115.112,"ID":2,"Active":true},"D":{"X":85.05,"Y":0.0,"Z":100.086,"ID":3,"Active":true},"One":{"X":100.035,"Y":0.0,"Z":92.599,"ID":4,"Active":true},"Two":{"X":107.656,"Y":0.0,"Z":99.893,"ID":5,"Active":true},"Three":{"X":99.974,"Y":0.0,"Z":107.382,"ID":6,"Active":true},"Four":{"X":92.531,"Y":0.0,"Z":99.883,"ID":7,"Active":true}}
```

## 4層後半

{{< collapse summary="画像を開く" >}}
![p4s-2](/images/posts/waymark/p4s-2.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":801,"A":{"X":104.546,"Y":0.0,"Z":85.536,"ID":0,"Active":true},"B":{"X":115.542,"Y":0.0,"Z":104.629,"ID":1,"Active":true},"C":{"X":94.977,"Y":0.0,"Z":114.871,"ID":2,"Active":true},"D":{"X":85.081,"Y":0.0,"Z":95.104,"ID":3,"Active":true},"One":{"X":97.794,"Y":0.0,"Z":81.883,"ID":4,"Active":true},"Two":{"X":118.87,"Y":0.0,"Z":97.379,"ID":5,"Active":true},"Three":{"X":102.141,"Y":0.0,"Z":118.746,"ID":6,"Active":true},"Four":{"X":81.274,"Y":0.0,"Z":101.538,"ID":7,"Active":true}}
```
