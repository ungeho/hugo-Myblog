+++
title = 'Test Waymark'
date = 2026-04-09T10:22:19+09:00
draft = true
description = ""
categories = ["FFXIV"]
tags = ["FFXIV", "WaymarkPlugin"]
series = ["FFXIV Waymark Presets"]
showtoc = true
tocopen = true
math = false
+++


{{< summary title="この記事の内容" >}}
- `XIVLauncher`の`Waymark Preset Plugin`のプリセット集
- `Waymark Preset Plugin`経由で任意のフィールドマーカーを入手
- コードブロックからプリセットをコピー
{{< /summary >}}

{{< linkcard 
  url="[/posts/example/](https://github.com/Infiziert90/WaymarkPresetPlugin)"
  title="Waymark Preset Plugin"
  desc="Waymark Preset Pluginのリポジトリ"
  meta="Repository"
/>}}

## 導入方法

`XIVLauncher`と`Waymark Preset Plugin`は導入済みであることを前提とします。

{{< faq q="フィールドマーカーの導入方法は？" >}}

1. 任意のコードブロックから導入したいプリセットをコピー
2. ゲーム内チャットで `/pwaymark`で`Waymark Library`を開く
3. `Import Options`タブを開く
4. `Paste a preset here and click "Import".`と記載された部分にフォーカスして`Ctrl + V`
5. `Import`ボタンをクリック

{{< /faq >}}

{{< faq q="導入したフィールドマーカーを設置するには？" >}}

1. ゲーム内チャットで `/pwaymark`で`Waymark Library`を開く
2. 任意のコンテンツ名のタブを開く
3. 任意のプリセットまたは`Imported`をクリック
4. `Preset Info`の`Copy to slot`の隣のメニューから、上書きしたいフィールドマーカーのスロット番号を選択する
5. `Copy to slot`ボタンを押す

{{< /faq >}}

## コンテンツ名 1

ここにこのコンテンツでの使い方や意図を書く。

![コンテンツ名 1 の画像](/images/posts/waymark/example-1.png)

```json
{
  "Name": "Content 1",
  "MapID": 0
}
```

## コンテンツ名 2

ここにこのコンテンツでの使い方や意図を書く。

![コンテンツ名 2 の画像](/images/posts/waymark/example-2.png)

```json
{
  "Name": "Content 2",
  "MapID": 0
}
```

## コンテンツ名 3

ここにこのコンテンツでの使い方や意図を書く。

![コンテンツ名 3 の画像](/images/posts/waymark/example-3.png)

```json
{
  "Name": "Content 3",
  "MapID": 0
}
```
