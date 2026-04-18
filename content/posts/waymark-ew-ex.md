+++
title = '[FFXIV Waymark Presets]暁月のフィナーレ 極討滅戦'
date = 2026-04-09T11:40:10+09:00
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

## 極ゾディアーク討滅戦

{{< collapse summary="画像を開く" >}}
![ゾディアーク](/images/posts/waymark/ew-ex-zodiark.png)
{{< /collapse >}}

```json
{"Name":"A Safespot for Snakes","MapID":803,"A":{"X":100.0,"Y":0.0,"Z":90.0,"ID":0,"Active":true},"B":{"X":114.0,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":114.0,"ID":2,"Active":true},"D":{"X":86.0,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":86.002,"Y":0.0,"Z":86.057,"ID":4,"Active":true},"Two":{"X":114.0,"Y":0.0,"Z":86.0,"ID":5,"Active":true},"Three":{"X":114.0,"Y":0.0,"Z":114.0,"ID":6,"Active":true},"Four":{"X":86.0,"Y":0.0,"Z":114.0,"ID":7,"Active":true}}
```

## 終極の戦い

{{< collapse summary="画像を開く" >}}
![終極](/images/posts/waymark/ew-ex-endsinger.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":846,"A":{"X":100.0,"Y":0.0,"Z":81.5,"ID":0,"Active":true},"B":{"X":118.5,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":100.0,"ID":2,"Active":true},"D":{"X":81.5,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":113.435,"Y":0.0,"Z":86.564,"ID":4,"Active":true},"Two":{"X":113.435,"Y":0.0,"Z":113.435,"ID":5,"Active":true},"Three":{"X":86.564,"Y":0.0,"Z":113.435,"ID":6,"Active":true},"Four":{"X":86.564,"Y":0.0,"Z":86.564,"ID":7,"Active":true}}
```

## 極バルバリシア討滅戦

{{< collapse summary="画像を開く" >}}
![バルバリシア](/images/posts/waymark/ew-ex-stormsCrown.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":871,"A":{"X":100.0,"Y":0.0,"Z":92.5,"ID":0,"Active":true},"B":{"X":107.5,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":107.5,"ID":2,"Active":true},"D":{"X":92.5,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":105.3,"Y":0.0,"Z":94.696,"ID":4,"Active":true},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":94.696,"Y":0.0,"Z":105.3,"ID":6,"Active":true},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

## 極ゴルベーザ討滅戦

{{< collapse summary="画像を開く" >}}
![ゴルベーザ](/images/posts/waymark/ew-ex-voidcastDais.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":950,"A":{"X":99.968,"Y":0.029,"Z":86.151,"ID":0,"Active":true},"B":{"X":114.023,"Y":0.03,"Z":99.854,"ID":1,"Active":true},"C":{"X":99.916,"Y":0.029,"Z":113.893,"ID":2,"Active":true},"D":{"X":85.854,"Y":0.03,"Z":99.784,"ID":3,"Active":true},"One":{"X":100.0,"Y":0.03,"Z":100.0,"ID":4,"Active":true},"Two":{"X":102.755,"Y":0.03,"Z":97.236,"ID":5,"Active":false},"Three":{"X":102.664,"Y":0.03,"Z":102.676,"ID":6,"Active":false},"Four":{"X":97.184,"Y":0.029,"Z":102.615,"ID":7,"Active":false}}
```

## 極ルビカンテ討滅戦

{{< collapse summary="画像を開く" >}}
![ルビカンテ](/images/posts/waymark/ew-ex-mountOrdeals.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":924,"A":{"X":100.0,"Y":0.0,"Z":88.5,"ID":0,"Active":true},"B":{"X":111.5,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":111.5,"ID":2,"Active":true},"D":{"X":88.5,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":91.868,"Y":0.0,"Z":91.868,"ID":4,"Active":true},"Two":{"X":108.131,"Y":0.0,"Z":91.868,"ID":5,"Active":true},"Three":{"X":108.131,"Y":0.0,"Z":108.131,"ID":6,"Active":true},"Four":{"X":91.868,"Y":0.0,"Z":108.131,"ID":7,"Active":true}}
```

## 極ゼロムス討滅戦

{{< collapse summary="画像を開く" >}}
![ゼロムス](/images/posts/waymark/ew-ex-abyssalFraCture.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":965,"A":{"X":92.09,"Y":0.0,"Z":81.309,"ID":0,"Active":true},"B":{"X":107.906,"Y":0.0,"Z":81.276,"ID":1,"Active":true},"C":{"X":100.053,"Y":0.0,"Z":99.98,"ID":2,"Active":true},"D":{"X":0.0,"Y":0.0,"Z":0.0,"ID":3,"Active":false},"One":{"X":81.123,"Y":0.0,"Z":81.106,"ID":4,"Active":true},"Two":{"X":118.899,"Y":0.0,"Z":81.096,"ID":5,"Active":true},"Three":{"X":118.846,"Y":0.0,"Z":92.094,"ID":6,"Active":true},"Four":{"X":81.007,"Y":0.0,"Z":92.1,"ID":7,"Active":true}}
```
