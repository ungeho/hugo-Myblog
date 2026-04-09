+++
title = '[Waymark Preset]万魔殿パンデモニウム零式：天獄編'
date = 2026-04-09T13:30:15+09:00
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
![p9s](/images/posts/waymark/p9s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":937,"A":{"X":100.0,"Y":0.0,"Z":86.05,"ID":0,"Active":true},"B":{"X":113.95,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":113.95,"ID":2,"Active":true},"D":{"X":86.05,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":109.864,"Y":0.0,"Z":90.135,"ID":4,"Active":true},"Two":{"X":109.864,"Y":0.0,"Z":109.864,"ID":5,"Active":true},"Three":{"X":90.135,"Y":0.0,"Z":109.864,"ID":6,"Active":true},"Four":{"X":90.135,"Y":0.0,"Z":90.135,"ID":7,"Active":true}}
```

## 2層

{{< collapse summary="画像を開く" >}}
![p10s](/images/posts/waymark/p10s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":939,"A":{"X":91.898,"Y":0.0,"Z":85.354,"ID":0,"Active":true},"B":{"X":108.234,"Y":0.0,"Z":85.355,"ID":1,"Active":true},"C":{"X":91.951,"Y":0.0,"Z":99.815,"ID":2,"Active":true},"D":{"X":108.077,"Y":0.0,"Z":99.815,"ID":3,"Active":true},"One":{"X":91.702,"Y":0.0,"Z":111.233,"ID":4,"Active":true},"Two":{"X":108.209,"Y":0.0,"Z":111.297,"ID":5,"Active":true},"Three":{"X":99.834,"Y":0.0,"Z":111.352,"ID":6,"Active":true},"Four":{"X":99.817,"Y":0.0,"Z":98.11,"ID":7,"Active":true}}
```

## 3層

{{< collapse summary="画像を開く" >}}
![p11s](/images/posts/waymark/p11s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":941,"A":{"X":100.254,"Y":0.0,"Z":87.109,"ID":0,"Active":true},"B":{"X":112.971,"Y":0.0,"Z":99.939,"ID":1,"Active":true},"C":{"X":99.947,"Y":0.0,"Z":112.982,"ID":2,"Active":true},"D":{"X":87.072,"Y":0.0,"Z":100.008,"ID":3,"Active":true},"One":{"X":109.116,"Y":0.0,"Z":90.811,"ID":4,"Active":true},"Two":{"X":109.233,"Y":0.0,"Z":109.129,"ID":5,"Active":true},"Three":{"X":90.827,"Y":0.0,"Z":109.133,"ID":6,"Active":true},"Four":{"X":90.895,"Y":0.0,"Z":90.816,"ID":7,"Active":true}}
```

## 4層前半

{{< collapse summary="画像を開く" >}}
![p12s-1](/images/posts/waymark/p12s-1.png)
{{< /collapse >}}

```json
{"Name":"前半マーカー（ぬけまる）","MapID":943,"A":{"X":100.049,"Y":0.0,"Z":81.363,"ID":0,"Active":true},"B":{"X":118.977,"Y":0.0,"Z":99.983,"ID":1,"Active":true},"C":{"X":99.819,"Y":0.0,"Z":118.997,"ID":2,"Active":true},"D":{"X":81.01,"Y":0.0,"Z":100.065,"ID":3,"Active":true},"One":{"X":110.051,"Y":0.0,"Z":90.069,"ID":4,"Active":true},"Two":{"X":109.923,"Y":0.0,"Z":109.992,"ID":5,"Active":true},"Three":{"X":89.963,"Y":0.0,"Z":110.033,"ID":6,"Active":true},"Four":{"X":89.887,"Y":0.0,"Z":90.03,"ID":7,"Active":true}}
```

## 4層後半

{{< collapse summary="画像を開く" >}}
![p12s-2](/images/posts/waymark/p12s-2.png)
{{< /collapse >}}

```json
{"Name":"後半マーカー(game8)","MapID":943,"A":{"X":97.25,"Y":0.0,"Z":92.5,"ID":0,"Active":true},"B":{"X":102.75,"Y":0.0,"Z":92.5,"ID":1,"Active":true},"C":{"X":102.834,"Y":0.0,"Z":97.21,"ID":2,"Active":true},"D":{"X":97.264,"Y":0.0,"Z":97.263,"ID":3,"Active":true},"One":{"X":99.011,"Y":0.0,"Z":80.93,"ID":4,"Active":true},"Two":{"X":119.063,"Y":0.0,"Z":90.153,"ID":5,"Active":true},"Three":{"X":105.5,"Y":0.0,"Z":101.0,"ID":6,"Active":true},"Four":{"X":94.5,"Y":0.0,"Z":101.0,"ID":7,"Active":true}}
```
