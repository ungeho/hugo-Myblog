+++
title = '[Waymark Preset]漆黒のヴィランズ 極討滅戦'
date = 2026-04-09T11:20:04+09:00
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

## 極ハーデス討滅戦

{{< collapse summary="画像を開く" >}}
![極ハーデス](/images/posts/waymark/sb-ex-hades.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":693,"A":{"X":100.031,"Y":0.0,"Z":95.419,"ID":0,"Active":true},"B":{"X":104.603,"Y":0.0,"Z":100.039,"ID":1,"Active":true},"C":{"X":99.891,"Y":0.0,"Z":104.642,"ID":2,"Active":true},"D":{"X":95.372,"Y":0.0,"Z":100.011,"ID":3,"Active":true},"One":{"X":94.992,"Y":0.0,"Z":95.907,"ID":4,"Active":true},"Two":{"X":105.084,"Y":0.0,"Z":95.911,"ID":5,"Active":true},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

## 極エメラルドウェポン破壊作戦

{{< collapse summary="画像を開く" >}}
![極エメラルドウェポン](/images/posts/waymark/sb-ex-eweapon.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":763,"A":{"X":112.65,"Y":0.0,"Z":81.903,"ID":0,"Active":true},"B":{"X":117.918,"Y":0.0,"Z":112.132,"ID":1,"Active":true},"C":{"X":88.236,"Y":0.0,"Z":117.529,"ID":2,"Active":true},"D":{"X":81.966,"Y":0.0,"Z":87.211,"ID":3,"Active":true},"One":{"X":109.471,"Y":0.0,"Z":82.017,"ID":4,"Active":true},"Two":{"X":117.692,"Y":0.0,"Z":108.943,"ID":5,"Active":true},"Three":{"X":91.256,"Y":0.0,"Z":117.55,"ID":6,"Active":true},"Four":{"X":81.799,"Y":0.0,"Z":90.64,"ID":7,"Active":true}}
```
