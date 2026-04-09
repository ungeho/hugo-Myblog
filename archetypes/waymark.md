+++
title = '[Waymark Preset] {{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
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

## コンテンツ名 1

{{< collapse summary="画像を開く" >}}
![極ハーデス](/images/posts/waymark/sb-ex-hades.png)
{{< /collapse >}}

```json
{
  "Name": "Content 1",
  "MapID": 0
}
```

## コンテンツ名 2

{{< collapse summary="画像を開く" >}}
![極ハーデス](/images/posts/waymark/sb-ex-hades.png)
{{< /collapse >}}

```json
{
  "Name": "Content 2",
  "MapID": 0
}
```

## コンテンツ名 3

{{< collapse summary="画像を開く" >}}
![極ハーデス](/images/posts/waymark/sb-ex-hades.png)
{{< /collapse >}}

```json
{
  "Name": "Content 3",
  "MapID": 0
}
```
