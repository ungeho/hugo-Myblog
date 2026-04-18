+++
title = '[FFXIV Waymark Presets]アナザーダンジョン 異聞シラディハ水道'
date = 2026-04-09T14:31:37+09:00
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

## 1ボス

{{< collapse summary="画像を開く" >}}
![1boss](/images/posts/waymark/sildihn1.png)
{{< /collapse >}}

### ノーマル(1BOSS)

```json
{"Name":"1ボス","MapID":878,"A":{"X":-335.0,"Y":470.999,"Z":-170.0,"ID":0,"Active":true},"B":{"X":-320.0,"Y":470.999,"Z":-155.0,"ID":1,"Active":true},"C":{"X":-335.0,"Y":470.999,"Z":-140.0,"ID":2,"Active":true},"D":{"X":-350.0,"Y":470.999,"Z":-155.0,"ID":3,"Active":true},"One":{"X":-335.0,"Y":470.999,"Z":-155.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

### 零式(1BOSS)

```json
{"Name":"1ボス","MapID":879,"A":{"X":-335.0,"Y":470.999,"Z":-170.0,"ID":0,"Active":true},"B":{"X":-320.0,"Y":470.999,"Z":-155.0,"ID":1,"Active":true},"C":{"X":-335.0,"Y":470.999,"Z":-140.0,"ID":2,"Active":true},"D":{"X":-350.0,"Y":470.999,"Z":-155.0,"ID":3,"Active":true},"One":{"X":-335.0,"Y":470.999,"Z":-155.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

## 2ボス

{{< collapse summary="画像を開く" >}}
![2boss](/images/posts/waymark/sildihn2.png)
{{< /collapse >}}

### ノーマル(2BOSS)

```json
{"Name":"2ボス","MapID":878,"A":{"X":-35.0,"Y":521.004,"Z":-280.0,"ID":0,"Active":true},"B":{"X":-25.0,"Y":521.004,"Z":-270.0,"ID":1,"Active":true},"C":{"X":-35.0,"Y":521.004,"Z":-260.0,"ID":2,"Active":true},"D":{"X":-45.0,"Y":521.004,"Z":-270.0,"ID":3,"Active":true},"One":{"X":-35.0,"Y":521.004,"Z":-270.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

### 零式(2BOSS)

```json
{"Name":"2ボス","MapID":879,"A":{"X":-35.0,"Y":521.004,"Z":-280.0,"ID":0,"Active":true},"B":{"X":-25.0,"Y":521.004,"Z":-270.0,"ID":1,"Active":true},"C":{"X":-35.0,"Y":521.004,"Z":-260.0,"ID":2,"Active":true},"D":{"X":-45.0,"Y":521.004,"Z":-270.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

## 3ボス

{{< collapse summary="画像を開く" >}}
![3boss](/images/posts/waymark/sildihn3.png)
{{< /collapse >}}

### ノーマル(3BOSS)

```json
{"Name":"3ボス","MapID":878,"A":{"X":286.424,"Y":533.0,"Z":-120.171,"ID":0,"Active":true},"B":{"X":0.0,"Y":0.0,"Z":0.0,"ID":1,"Active":false},"C":{"X":291.586,"Y":533.0,"Z":-90.283,"ID":2,"Active":true},"D":{"X":0.0,"Y":0.0,"Z":0.0,"ID":3,"Active":false},"One":{"X":282.296,"Y":533.0,"Z":-111.91,"ID":4,"Active":true},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":295.488,"Y":533.0,"Z":-98.028,"ID":6,"Active":true},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

### 零式(3BOSS)

```json
{"Name":"3ボス","MapID":879,"A":{"X":286.424,"Y":533.0,"Z":-120.171,"ID":0,"Active":true},"B":{"X":0.0,"Y":0.0,"Z":0.0,"ID":1,"Active":false},"C":{"X":291.586,"Y":533.0,"Z":-90.283,"ID":2,"Active":true},"D":{"X":0.0,"Y":0.0,"Z":0.0,"ID":3,"Active":false},"One":{"X":282.296,"Y":533.0,"Z":-111.91,"ID":4,"Active":true},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":295.488,"Y":533.0,"Z":-98.028,"ID":6,"Active":true},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```
