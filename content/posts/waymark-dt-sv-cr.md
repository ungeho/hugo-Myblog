+++
title = '[Waymark Preset]至天の座アルカディア零式：クルーザー級'
date = 2026-04-09T14:05:18+09:00
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
![m5s](/images/posts/waymark/m5s.png)
{{< /collapse >}}

```json
{"Name":"ぬけまる","MapID":1020,"A":{"X":100.0,"Y":0.0,"Z":85.0,"ID":0,"Active":true},"B":{"X":115.0,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":115.0,"ID":2,"Active":true},"D":{"X":85.0,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":107.5,"Y":0.0,"Z":92.5,"ID":4,"Active":true},"Two":{"X":107.5,"Y":0.0,"Z":107.5,"ID":5,"Active":true},"Three":{"X":92.5,"Y":0.0,"Z":107.5,"ID":6,"Active":true},"Four":{"X":92.5,"Y":0.0,"Z":92.5,"ID":7,"Active":true}}
```

## 2層

{{< collapse summary="画像を開く" >}}
![m6s](/images/posts/waymark/m6s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":1022,"A":{"X":100.0,"Y":0.0,"Z":90.0,"ID":0,"Active":true},"B":{"X":110.0,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":110.0,"ID":2,"Active":true},"D":{"X":90.0,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":92.92893,"Y":0.0,"Z":92.92893,"ID":4,"Active":true},"Two":{"X":107.07107,"Y":0.0,"Z":92.92893,"ID":5,"Active":true},"Three":{"X":107.07107,"Y":0.0,"Z":107.07107,"ID":6,"Active":true},"Four":{"X":92.92893,"Y":0.0,"Z":107.07107,"ID":7,"Active":true}}
```

## 3層

{{< collapse summary="画像を開く" >}}
![m7s](/images/posts/waymark/m7s.png)
{{< /collapse >}}

```json
{"Name":"さり式","MapID":1024,"A":{"X":99.92,"Y":-200.0,"Z":-4.996,"ID":0,"Active":true},"B":{"X":103.535,"Y":0.0,"Z":1.539,"ID":1,"Active":true},"C":{"X":100.022,"Y":-200.0,"Z":14.979,"ID":2,"Active":true},"D":{"X":96.582,"Y":0.0,"Z":8.031,"ID":3,"Active":true},"One":{"X":89.948,"Y":-200.0,"Z":-4.967,"ID":4,"Active":true},"Two":{"X":109.984,"Y":-200.0,"Z":-5.097,"ID":5,"Active":true},"Three":{"X":110.141,"Y":-200.0,"Z":14.731,"ID":6,"Active":true},"Four":{"X":89.975,"Y":-200.0,"Z":15.112,"ID":7,"Active":true}}
```

## 4層

{{< collapse summary="画像を開く" >}}
![m8s](/images/posts/waymark/m8s.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":1026,"A":{"X":100.37,"Y":0.0,"Z":89.183,"ID":0,"Active":true},"B":{"X":110.797,"Y":0.0,"Z":99.939,"ID":1,"Active":true},"C":{"X":99.958,"Y":-150.0,"Z":118.652,"ID":2,"Active":true},"D":{"X":89.523,"Y":0.0,"Z":99.668,"ID":3,"Active":true},"One":{"X":92.64,"Y":0.0,"Z":91.955,"ID":4,"Active":true},"Two":{"X":107.281,"Y":0.0,"Z":92.1,"ID":5,"Active":true},"Three":{"X":107.282,"Y":0.0,"Z":107.345,"ID":6,"Active":true},"Four":{"X":91.741,"Y":0.0,"Z":107.16,"ID":7,"Active":true}}
```
