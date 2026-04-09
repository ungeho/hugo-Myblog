+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
draft = false
description = ""
categories = ["Programming"]
tags = [""]
series = [""]
# 目次を付与するオプション <!-- omit in toc -->
showtoc = true
# 目次を開いた状態にする <!-- omit in toc -->
tocopen = false
# 数式を使いたい場合はtrueに設定する。 <!-- omit in toc -->
math = false
+++

{{< section_label text="Overview" >}}

ここに記事の概要を書く。

{{< summary title="Quick Summary" >}}
- この記事で何を扱うか
- 先に知っておくとよいこと
- 読み終えると何が分かるか
{{< /summary >}}

## 背景

前提や背景を書く。

## 本題

必要ならコード、表、図を使って整理する。

## まとめ

最後に要点をまとめる。
