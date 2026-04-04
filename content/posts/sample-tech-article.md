+++
title = "技術記事サンプル"
date = 2026-04-04T09:20:00+09:00
draft = true
description = "技術記事テンプレートの実戦寄りサンプル。summary、steps、compare、code、table の使い方をまとめています。"
categories = ["Programming"]
tags = ["sample", "tech", "template"]
series = ["Blog Customization"]
showtoc = true
tocopen = true
math = false
+++

{{< summary title="この記事の見本ポイント" >}}
- 導入で何を扱う記事かをすぐ伝える
- 手順、比較、コード、表を無理なく混ぜる
- 補足は callout や collapse に逃がして本文を細く保つ
{{< /summary >}}

## この記事の前提

技術記事では、最初の数段落で「何が分かるか」「どこまで扱うか」が見えるだけでかなり読みやすくなります。  
このサンプルでは、短い導入のあとに手順、比較、コード、表を素直に並べています。

> [!TIP] 書き始めのコツ
> 最初に `description` と `series` を決めておくと、一覧や関連記事まで自然にまとまりやすくなります。

## 手順を書く

{{< steps >}}
1. 結論を先に短く書く
2. 前提条件や環境を書く
3. 実装や設定をコードで示す
4. うまくいかなかったときの補足を末尾へ寄せる
{{< /steps >}}

## 選択肢を比較する

{{< compare left="短く済ませる" right="丁寧に説明する" >}}
- 読み始めやすい
- 雑記やメモ向き
- 更新もしやすい
<!--split-->
- 後から読み返しやすい
- 初心者にもやさしい
- シリーズ記事に向いている
{{< /compare >}}

## コードを見せる

```python
from pathlib import Path

def list_markdown_files(root: str) -> list[str]:
    return sorted(str(path) for path in Path(root).glob("*.md"))
```

{{< collapse summary="補足: コードブロックが長いとき" >}}
長めのコードは最初から全部見せなくても大丈夫です。  
本文の流れを止めたくない場合は、別節に分けるか `collapse` を使うと収まりやすくなります。
{{< /collapse >}}

## 表で整理する

| 項目 | 目的 | ひとこと |
| --- | --- | --- |
| `description` | 一覧と OGP | 短くても入れると強い |
| `series` | 関連導線 | 連載や同テーマ記事に効く |
| `showtoc` | 目次表示 | 長文ならほぼ有効 |

## まとめ

技術記事では、構成そのものをシンプルに保つのがいちばん効きます。  
サンプルとして使うときは、不要な装飾を削って、自分の記事に必要な部分だけ持っていくのがおすすめです。
