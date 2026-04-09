+++
title = '[Waymark Preset]アナザーダンジョン 異聞アロアロ島'
date = 2026-04-09T14:55:45+09:00
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

## 1ボス

{{< collapse summary="画像を開く" >}}
![1boss](/images/posts/waymark/aloalo1.png)
{{< /collapse >}}

### ノーマル(1BOSS)

```json
{"Name":"1ボス","MapID":979,"A":{"X":0.0,"Y":0.0,"Z":-15.0,"ID":0,"Active":true},"B":{"X":15.0,"Y":0.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":0.0,"Y":0.0,"Z":15.0,"ID":2,"Active":true},"D":{"X":-15.0,"Y":0.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

### 零式(1BOSS)

```json
{"Name":"1ボス","MapID":980,"A":{"X":0.0,"Y":0.0,"Z":-10.0,"ID":0,"Active":true},"B":{"X":10.0,"Y":0.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":0.0,"Y":0.0,"Z":10.0,"ID":2,"Active":true},"D":{"X":-10.0,"Y":0.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

## 2ボス

{{< collapse summary="画像を開く" >}}
![2boss](/images/posts/waymark/aloalo2.png)
{{< /collapse >}}

### ノーマル(2BOSS)

```json
{"Name":"2ボス","MapID":979,"A":{"X":200.0,"Y":-300.0,"Z":-12.0,"ID":0,"Active":true},"B":{"X":212.0,"Y":-300.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":200.0,"Y":-300.0,"Z":12.0,"ID":2,"Active":true},"D":{"X":188.0,"Y":-300.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

### 零式(2BOSS)

```json
{"Name":"2ボス","MapID":980,"A":{"X":200.0,"Y":-300.0,"Z":-12.0,"ID":0,"Active":true},"B":{"X":212.0,"Y":-300.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":200.0,"Y":-300.0,"Z":12.0,"ID":2,"Active":true},"D":{"X":188.0,"Y":-300.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":0.0,"Y":0.0,"Z":0.0,"ID":4,"Active":false},"Two":{"X":0.0,"Y":0.0,"Z":0.0,"ID":5,"Active":false},"Three":{"X":0.0,"Y":0.0,"Z":0.0,"ID":6,"Active":false},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":false}}
```

## 3ボス

{{< collapse summary="画像を開く" >}}
![3boss](/images/posts/waymark/aloalo3.png)
{{< /collapse >}}

### ノーマル(3BOSS)

```json
{"Name":"3ボス","MapID":979,"A":{"X":-200.0,"Y":-200.0,"Z":-7.0,"ID":0,"Active":true},"B":{"X":-193.0,"Y":-200.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":-200.0,"Y":-200.0,"Z":7.0,"ID":2,"Active":true},"D":{"X":-207.0,"Y":-200.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":-189.3934,"Y":-200.0,"Z":-10.606602,"ID":4,"Active":true},"Two":{"X":-189.3934,"Y":-200.0,"Z":10.606602,"ID":5,"Active":true},"Three":{"X":-210.6066,"Y":-200.0,"Z":10.606602,"ID":6,"Active":true},"Four":{"X":-210.6066,"Y":-200.0,"Z":-10.606602,"ID":7,"Active":true}}
```

### 零式(3BOSS)

```json
{"Name":"3ボス","MapID":980,"A":{"X":-200.0,"Y":-200.0,"Z":-7.0,"ID":0,"Active":true},"B":{"X":-193.0,"Y":-200.0,"Z":0.0,"ID":1,"Active":true},"C":{"X":-200.0,"Y":-200.0,"Z":7.0,"ID":2,"Active":true},"D":{"X":-207.0,"Y":-200.0,"Z":0.0,"ID":3,"Active":true},"One":{"X":-189.3934,"Y":-200.0,"Z":-10.606602,"ID":4,"Active":true},"Two":{"X":-189.3934,"Y":-200.0,"Z":10.606602,"ID":5,"Active":true},"Three":{"X":-210.6066,"Y":-200.0,"Z":10.606602,"ID":6,"Active":true},"Four":{"X":-210.6066,"Y":-200.0,"Z":-10.606602,"ID":7,"Active":true}}
```
