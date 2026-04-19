+++
title = '[FFXIV Waymark Presets] 絶レイド'
date = 2026-04-19T15:21:44+09:00
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

---

## 絶バハムート討滅戦

{{< collapse summary="画像を開く" >}}
![ucob](/images/posts/waymark/ucob.png)
{{< /collapse >}}

```json
{"Name":"asellog(H3) marker","MapID":280,"A":{"X":0.0,"Y":0.0,"Z":-9.856,"ID":0,"Active":true},"B":{"X":8.0,"Y":0.0,"Z":4.0,"ID":1,"Active":true},"C":{"X":-8.0,"Y":0.0,"Z":4.0,"ID":2,"Active":true},"D":{"X":10.35,"Y":0.0,"Z":17.927,"ID":3,"Active":true},"One":{"X":17.927,"Y":0.0,"Z":-10.35,"ID":4,"Active":true},"Two":{"X":0.0,"Y":0.0,"Z":8.0,"ID":5,"Active":true},"Three":{"X":-17.927,"Y":0.0,"Z":10.35,"ID":6,"Active":true},"Four":{"X":0.0,"Y":0.0,"Z":0.0,"ID":7,"Active":true}}
```

---

## 絶アルテマウェポン破壊作戦

{{< collapse summary="画像を開く" >}}
![umu](/images/posts/waymark/umu.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":539,"A":{"X":100.0,"Y":0.0,"Z":93.5,"ID":0,"Active":true},"B":{"X":106.5,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":106.50013,"ID":2,"Active":true},"D":{"X":93.50011,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":100.0,"Y":0.0,"Z":100.0,"ID":4,"Active":true},"Two":{"X":100.0,"Y":0.0,"Z":82.0,"ID":5,"Active":true},"Three":{"X":112.728,"Y":0.0,"Z":87.272,"ID":6,"Active":true},"Four":{"X":100.0,"Y":0.0,"Z":100.0,"ID":7,"Active":false}}
```

---

## 絶アレキサンダー討滅戦

{{< collapse summary="画像を開く" >}}
![tea](/images/posts/waymark/tea.png)
{{< /collapse >}}

```json
{"Name":"絶アレキみんとっと","MapID":694,"A":{"X":99.982,"Y":0.0,"Z":93.067,"ID":0,"Active":true},"B":{"X":107.581,"Y":0.0,"Z":100.029,"ID":1,"Active":true},"C":{"X":100.075,"Y":0.0,"Z":107.499,"ID":2,"Active":true},"D":{"X":86.301,"Y":0.0,"Z":100.025,"ID":3,"Active":true},"One":{"X":106.66,"Y":0.0,"Z":83.679,"ID":4,"Active":true},"Two":{"X":113.811,"Y":0.0,"Z":99.963,"ID":5,"Active":true},"Three":{"X":99.98,"Y":0.0,"Z":99.86,"ID":6,"Active":true},"Four":{"X":93.524,"Y":0.0,"Z":83.926,"ID":7,"Active":true}}
```

---

## 絶竜詩戦争

### P1

{{< collapse summary="画像を開く" >}}
![dsr1](/images/posts/waymark/dsr1.png)
{{< /collapse >}}

```json
{"Name":"P1","MapID":788,"A":{"X":94.25,"Y":0.0,"Z":90.04071,"ID":0,"Active":true},"B":{"X":109.95929,"Y":0.0,"Z":94.25,"ID":1,"Active":true},"C":{"X":105.75,"Y":0.0,"Z":109.95929,"ID":2,"Active":true},"D":{"X":90.04071,"Y":0.0,"Z":105.75,"ID":3,"Active":true},"One":{"X":105.75,"Y":0.0,"Z":90.04071,"ID":4,"Active":true},"Two":{"X":109.95929,"Y":0.0,"Z":105.75,"ID":5,"Active":true},"Three":{"X":94.25,"Y":0.0,"Z":109.95929,"ID":6,"Active":true},"Four":{"X":90.04071,"Y":0.0,"Z":94.25,"ID":7,"Active":true}}
```

### P2

{{< collapse summary="画像を開く" >}}
![dsr2](/images/posts/waymark/dsr2.png)
{{< /collapse >}}

```json
{"Name":"P2","MapID":788,"A":{"X":100.0,"Y":0.0,"Z":80.0,"ID":0,"Active":true},"B":{"X":120.0,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":120.0,"ID":2,"Active":true},"D":{"X":80.0,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":114.142136,"Y":0.0,"Z":85.857864,"ID":4,"Active":true},"Two":{"X":114.142136,"Y":0.0,"Z":114.142136,"ID":5,"Active":true},"Three":{"X":85.857864,"Y":0.0,"Z":114.142136,"ID":6,"Active":true},"Four":{"X":85.857864,"Y":0.0,"Z":85.857864,"ID":7,"Active":true}}
```

---

## 絶オメガ検証戦

{{< collapse summary="画像を開く" >}}
![top](/images/posts/waymark/top.png)
{{< /collapse >}}

```json
{"Name":"ハムカツマーカー","MapID":908,"A":{"X":100.0,"Y":0.0,"Z":88.8,"ID":0,"Active":true},"B":{"X":111.2,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":111.2,"ID":2,"Active":true},"D":{"X":88.8,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":107.9196,"Y":0.0,"Z":92.0804,"ID":4,"Active":true},"Two":{"X":107.9196,"Y":0.0,"Z":107.9196,"ID":5,"Active":true},"Three":{"X":92.0804,"Y":0.0,"Z":107.9196,"ID":6,"Active":true},"Four":{"X":92.08041,"Y":0.0,"Z":92.0804,"ID":7,"Active":true}}
```

---

## 絶もうひとつの未来

{{< collapse summary="画像を開く" >}}
![fru](/images/posts/waymark/fru.png)
{{< /collapse >}}

```json
{"Name":"Imported","MapID":1006,"A":{"X":100.0,"Y":0.0,"Z":90.0,"ID":0,"Active":true},"B":{"X":110.0,"Y":0.0,"Z":100.0,"ID":1,"Active":true},"C":{"X":100.0,"Y":0.0,"Z":110.0,"ID":2,"Active":true},"D":{"X":90.0,"Y":0.0,"Z":100.0,"ID":3,"Active":true},"One":{"X":107.071,"Y":0.0,"Z":92.929,"ID":4,"Active":true},"Two":{"X":107.071,"Y":0.0,"Z":107.07,"ID":5,"Active":true},"Three":{"X":92.929,"Y":0.0,"Z":107.07,"ID":6,"Active":true},"Four":{"X":92.929,"Y":0.0,"Z":92.929,"ID":7,"Active":true}}
```
