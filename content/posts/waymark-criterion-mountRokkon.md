+++
title = '[FFXIV Waymark Presets]アナザーダンジョン 異聞六根山'
date = 2026-04-09T14:45:53+09:00
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
![1boss](/images/posts/waymark/rokkon1.png)
{{< /collapse >}}

### ノーマル(1BOSS)

```json
{"Name":"1ボス","MapID":946,"A":{"X":0.0,"Y":0.0,"Z":-116.5,"ID":0,"Active":true},"B":{"X":16.5,"Y":0.0,"Z":-100.0,"ID":1,"Active":true},"C":{"X":0.0,"Y":0.0,"Z":-83.5,"ID":2,"Active":true},"D":{"X":-16.5,"Y":0.0,"Z":-100.0,"ID":3,"Active":true},"One":{"X":12.197592,"Y":0.0,"Z":-112.19759,"ID":4,"Active":true},"Two":{"X":12.197592,"Y":0.0,"Z":-87.80241,"ID":5,"Active":true},"Three":{"X":-12.197592,"Y":0.0,"Z":-87.80241,"ID":6,"Active":true},"Four":{"X":-12.197592,"Y":0.0,"Z":-112.19759,"ID":7,"Active":true}}
```

### 零式(1BOSS)

```json
{"Name":"1ボス","MapID":947,"A":{"X":0.0,"Y":0.0,"Z":-116.5,"ID":0,"Active":true},"B":{"X":16.5,"Y":0.0,"Z":-100.0,"ID":1,"Active":true},"C":{"X":0.0,"Y":0.0,"Z":-83.5,"ID":2,"Active":true},"D":{"X":-16.5,"Y":0.0,"Z":-100.0,"ID":3,"Active":true},"One":{"X":12.197592,"Y":0.0,"Z":-112.19759,"ID":4,"Active":true},"Two":{"X":12.197592,"Y":0.0,"Z":-87.80241,"ID":5,"Active":true},"Three":{"X":-12.197592,"Y":0.0,"Z":-87.80241,"ID":6,"Active":true},"Four":{"X":-12.197592,"Y":0.0,"Z":-112.19759,"ID":7,"Active":true}}
```

## 2ボス

{{< collapse summary="画像を開く" >}}
![2boss](/images/posts/waymark/rokkon2.png)
{{< /collapse >}}

### ノーマル(2BOSS)

```json
{"Name":"2ボス","MapID":946,"A":{"X":300.004,"Y":7.0,"Z":-134.946,"ID":0,"Active":true},"B":{"X":315.014,"Y":7.0,"Z":-120.074,"ID":1,"Active":true},"C":{"X":299.967,"Y":7.0,"Z":-105.04,"ID":2,"Active":true},"D":{"X":285.059,"Y":7.0,"Z":-120.048,"ID":3,"Active":true},"One":{"X":307.495,"Y":7.0,"Z":-108.202,"ID":4,"Active":true},"Two":{"X":292.376,"Y":7.0,"Z":-108.371,"ID":5,"Active":true},"Three":{"X":319.63,"Y":7.0,"Z":-108.394,"ID":6,"Active":true},"Four":{"X":280.324,"Y":7.0,"Z":-108.302,"ID":7,"Active":true}}
```

### 零式(2BOSS)

```json
{"Name":"2ボス","MapID":947,"A":{"X":299.682,"Y":7.0,"Z":-134.729,"ID":0,"Active":true},"B":{"X":314.964,"Y":7.0,"Z":-119.988,"ID":1,"Active":true},"C":{"X":299.944,"Y":6.999,"Z":-105.125,"ID":2,"Active":true},"D":{"X":285.126,"Y":7.0,"Z":-119.842,"ID":3,"Active":true},"One":{"X":307.575,"Y":6.999,"Z":-108.191,"ID":4,"Active":true},"Two":{"X":292.317,"Y":7.0,"Z":-108.322,"ID":5,"Active":true},"Three":{"X":319.588,"Y":7.0,"Z":-108.159,"ID":6,"Active":true},"Four":{"X":280.416,"Y":7.0,"Z":-108.327,"ID":7,"Active":true}}
```

## 3ボス

{{< collapse summary="画像を開く" >}}
![3boss](/images/posts/waymark/rokkon3.png)
{{< /collapse >}}

### ノーマル(3BOSS)

```json
{"Name":"3ボス","MapID":946,"A":{"X":-200.0,"Y":-195.0,"Z":-14.0,"ID":0,"Active":true},"B":{"X":-186.0,"Y":-195.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":-200.0,"Y":-195.0,"Z":14.0,"ID":2,"Active":true},"D":{"X":-214.0,"Y":-195.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

### 零式(3BOSS)

```json
{"Name":"3ボス","MapID":947,"A":{"X":-200.0,"Y":-195.0,"Z":-14.0,"ID":0,"Active":true},"B":{"X":-186.0,"Y":-195.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":-200.0,"Y":-195.0,"Z":14.0,"ID":2,"Active":true},"D":{"X":-214.0,"Y":-195.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":307.575,"Y":6.999,"Z":-108.191,"ID":4,"Active":false},"Two":{"X":292.317,"Y":7.0,"Z":-108.322,"ID":5,"Active":false},"Three":{"X":319.588,"Y":7.0,"Z":-108.159,"ID":6,"Active":false},"Four":{"X":280.416,"Y":7.0,"Z":-108.327,"ID":7,"Active":false}}
```
