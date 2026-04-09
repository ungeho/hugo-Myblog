+++
title = '[Waymark Preset]至天の座アルカディア零式：ライトヘビー級'
date = 2026-04-09T13:44:59+09:00
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
![m1s](/images/posts/waymark/m1s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":986,"A":{"X":100.0,"Y":0.0,"Z":90.0,"ID":0,"Active":true},"B":{"X":110.0,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":110.0,"ID":2,"Active":true},"D":{"X":90.0,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":110.0,"Y":0.0,"Z":95.0,"ID":4,"Active":true},"Two":{"X":110.0,"Y":0.0,"Z":105.0,"ID":5,"Active":true},"Three":{"X":90.0,"Y":0.0,"Z":105.0,"ID":6,"Active":true},"Four":{"X":90.0,"Y":0.0,"Z":95.0,"ID":7,"Active":true}}
```

## 2層

{{< collapse summary="画像を開く" >}}
![m2s](/images/posts/waymark/m2s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":988,"A":{"X":100.0,"Y":0.0,"Z":87.986,"ID":0,"Active":true},"B":{"X":113.798,"Y":0.0,"Z":99.891,"ID":1,"Active":true},"C":{"X":99.999,"Y":0.0,"Z":111.954,"ID":2,"Active":true},"D":{"X":86.144,"Y":0.0,"Z":99.937,"ID":3,"Active":true},"One":{"X":108.504,"Y":0.0,"Z":90.902,"ID":4,"Active":true},"Two":{"X":107.87,"Y":0.0,"Z":108.442,"ID":5,"Active":true},"Three":{"X":92.165,"Y":0.0,"Z":107.755,"ID":6,"Active":true},"Four":{"X":91.847,"Y":0.0,"Z":91.855,"ID":7,"Active":true}}
```

## 3層

{{< collapse summary="画像を開く" >}}
![m3s](/images/posts/waymark/m3s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":990,"A":{"X":100.0,"Y":0.0,"Z":93.2,"ID":0,"Active":true},"B":{"X":106.8,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":106.8,"ID":2,"Active":true},"D":{"X":93.2,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":108.342,"Y":0.0,"Z":91.483,"ID":4,"Active":true},"Two":{"X":108.273,"Y":0.0,"Z":108.354,"ID":5,"Active":true},"Three":{"X":91.516,"Y":0.0,"Z":108.231,"ID":6,"Active":true},"Four":{"X":91.686,"Y":0.0,"Z":91.665,"ID":7,"Active":true}}
```

## 4層

{{< collapse summary="画像を開く" >}}
![m4s](/images/posts/waymark/m4s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":992,"A":{"X":100.0,"Y":0.0,"Z":90.0,"ID":0,"Active":true},"B":{"X":110.0,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":110.0,"ID":2,"Active":true},"D":{"X":90.0,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":105.0,"Y":0.0,"Z":95.0,"ID":4,"Active":true},"Two":{"X":105.0,"Y":0.0,"Z":105.0,"ID":5,"Active":true},"Three":{"X":95.0,"Y":0.0,"Z":105.0,"ID":6,"Active":true},"Four":{"X":95.0,"Y":0.0,"Z":95.0,"ID":7,"Active":true}}
```
