+++
title = '[Waymark Preset]黄金のレガシー 極討滅戦'
date = 2026-04-09T12:35:39+09:00
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

## 極ヴァリガルマンダ討滅戦

{{< collapse summary="画像を開く" >}}
![極ヴァリガルマンダ](/images/posts/waymark/dt-ex-worqor.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":833,"A":{"X":92.017,"Y":0.0,"Z":92.126,"ID":0,"Active":true},"B":{"X":107.841,"Y":0.0,"Z":92.527,"ID":1,"Active":true},"C":{"X":114.514,"Y":0.0,"Z":99.631,"ID":2,"Active":true},"D":{"X":85.781,"Y":0.0,"Z":100.235,"ID":3,"Active":true},"One":{"X":94.574,"Y":0.0,"Z":94.754,"ID":4,"Active":true},"Two":{"X":105.394,"Y":0.0,"Z":94.973,"ID":5,"Active":true},"Three":{"X":105.2,"Y":0.0,"Z":104.91,"ID":6,"Active":true},"Four":{"X":94.525,"Y":0.0,"Z":104.767,"ID":7,"Active":true}}
```

## 極ゼレニア討滅戦

{{< collapse summary="画像を開く" >}}
![極ゼレニア](/images/posts/waymark/dt-ex-recollection.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":1031,"A":{"X":100.0,"Y":0.0,"Z":92.0,"ID":0,"Active":true},"B":{"X":108.0,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":108.0,"ID":2,"Active":true},"D":{"X":92.0,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":105.65685,"Y":0.0,"Z":94.34315,"ID":4,"Active":true},"Two":{"X":105.65685,"Y":0.0,"Z":105.65685,"ID":5,"Active":true},"Three":{"X":94.34315,"Y":0.0,"Z":105.65685,"ID":6,"Active":true},"Four":{"X":94.34315,"Y":0.0,"Z":94.699,"ID":7,"Active":true}}
```

## 極永遠の闇討滅戦

{{< collapse summary="画像を開く" >}}
![極永遠の闇](/images/posts/waymark/dt-ex-necron.png)
{{< /collapse >}}

```json
{"Name":"JP","MapID":1062,"A":{"X":100.0,"Y":0.0,"Z":92.0,"ID":0,"Active":true},"B":{"X":108.0,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":108.0,"ID":2,"Active":true},"D":{"X":92.0,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":95.0,"Y":0.0,"Z":86.5,"ID":4,"Active":true},"Two":{"X":105.0,"Y":0.0,"Z":86.5,"ID":5,"Active":true},"Three":{"X":103.0,"Y":0.0,"Z":92.0,"ID":6,"Active":true},"Four":{"X":97.0,"Y":0.0,"Z":92.0,"ID":7,"Active":true}}
```
