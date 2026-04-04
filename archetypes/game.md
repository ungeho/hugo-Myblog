+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
draft = true
description = ""
categories = ["Game"]
tags = ["NetGame"]
series = [""]
# 目次を付与するオプション <!-- omit in toc -->
showtoc = true
# 目次を開いた状態にする <!-- omit in toc -->
tocopen = true
# 数式を使いたい場合はtrueに設定する。 <!-- omit in toc -->
math = false
+++

{{< update_note date="{{ .Date.Format "2006-01-02" }}" >}}
初稿。あとで必要に応じて調整する。
{{< /update_note >}}

## この記事の内容

対象コンテンツ、前提、目的を書く。

## 準備

必要な設定、マクロ、持ち物などを書く。

## 手順 / ポイント

ステップや注意点を書く。

## 補足

必要なら FAQ や callout を使って補足する。
