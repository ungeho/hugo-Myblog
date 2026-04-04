+++
title = "Shortcode Showcase"
date = 2026-04-04T10:00:00+09:00
draft = true
categories = ["Blog"]
tags = ["shortcode", "sample", "draft"]
showtoc = true
tocopen = true
math = false
description = "記事装飾 shortcode の見た目確認用ドラフト"
series = ["Blog Customization"]
+++

{{< summary title="このドラフトについて" >}}
- 新しく追加した装飾の見た目確認用です
- 公開前提ではなく、ローカル確認用の下書きです
- 不要になったらそのまま削除して大丈夫です
{{< /summary >}}

{{< section_label tone="pink" >}}基本ラベル{{< /section_label >}}

通常の文章の中で {{< badge >}}おすすめ{{< /badge >}} や {{< badge tone="mint" >}}初心者向け{{< /badge >}} のような小ラベルを入れられます。  
強調したい語句は {{< marker >}}やわらかいマーカー{{< /marker >}} や {{< marker color="mint" >}}色違いのマーカー{{< /marker >}} でも見せられます。

{{< section_label tone="blue" >}}Callout{{< /section_label >}}

> [!NOTE] note
> これは note の見た目確認です。

> [!TIP] tip
> これは tip の見た目確認です。

> [!IMPORTANT]- important
> 折りたたみ付き important の確認です。  
> `↑` や `→` のようなインラインコードの見え方もここで確認できます。

> [!WARNING]+ warning
> 最初から開いている warning の確認です。

> [!CAUTION] caution
> caution の色味確認です。

{{< section_label tone="mint" >}}手順表示{{< /section_label >}}

{{< steps >}}
1. 記事の最初に何をするかを書く
2. 必要ならコードや図を途中に入れる
3. 最後に注意点や補足をまとめる
{{< /steps >}}

{{< section_label tone="yellow" >}}比較{{< /section_label >}}

{{< compare left="メリット" right="デメリット" >}}
- 見た目が整理しやすい
- 情報の対比が一目でわかる
- 長文記事でも流し読みしやすい
<!--split-->
- 情報量が少ないと少し大げさになる
- 左右の情報量に差があると余白が出やすい
- 箇条書き前提のほうが使いやすい
{{< /compare >}}

{{< section_label tone="lavender" >}}用語カードと更新メモ{{< /section_label >}}

{{< term_card term="DPS" >}}
Damage Per Second の略で、ゲームでは火力役の意味で使うこともあります。
{{< /term_card >}}

{{< update_note date="2026-04 更新" tone="blue" >}}
- shortcode のサンプルを追加
- 見た目確認用のドラフト記事を作成
{{< /update_note >}}

{{< section_label >}}FAQ{{< /section_label >}}

{{< faq q="このページは公開されますか？" >}}
`draft = true` なので、通常の本番ビルドでは公開されません。
{{< /faq >}}

{{< faq q="削除しても大丈夫？" open="true" >}}
大丈夫です。見た目確認が終わったら、そのまま消して問題ありません。
{{< /faq >}}

{{< section_label tone="dark" >}}リンクカード{{< /section_label >}}

{{< linkcard
  url="/posts/"
  title="Posts 一覧"
  desc="記事一覧ページへの導線確認用リンクです。"
  meta="Internal"
/>}}

{{< linkcard
  url="https://gohugo.io/"
  title="Hugo Official Site"
  desc="外部リンクの見え方確認用です。"
  meta="External"
/>}}

{{< section_label tone="sakura" >}}折りたたみ補足{{< /section_label >}}

{{< collapse summary="補足を開く" >}}
この中に長い補足やちょっとした余談を書けます。  
記事本文を長くしすぎたくないときに便利です。
{{< /collapse >}}

## まとめ

このドラフトは、記事装飾の見た目を一通り確認するためのサンプルです。  
必要なものだけ実記事に持っていく想定で使ってください。
