+++
title = 'My First Post'
date = 2024-01-22T19:01:13+09:00
draft = true
categories = ["test"]
math = true
+++

`draft = true`にした場合

`hugo server` で `-D` オプションを付与しないと表示されない。

現在は、デフォルトで`draft = false`

これは、マークダウンのテストです。

tagsは"test"

descriptionは"てすと"

てすとてすと

**太字**

_イタリック_

# これは見出しです。

~~取り消し線~~



* Fruit
  * Apple
  * Orange
  * Banana

1. 手順1
    1. 手順1-1
    2. 手順1-2
    3. 手順1-3

>引用

|列１|列２|列３|
|---|---|---|
|a|bb|ccc|
|xxx|yy|z|

注釈１[^1]
[^1]: これは注釈

[リンク](https://supercutelalafell.netlify.app/)

`コード`

罫線

------

コードブロック

言語の識別子を書くと対応したシンタックスハイライトが適用される。

{linenos=inline}を追加する事で、行番号をつけられる。

```javascript{linenos=inline}
var s = "JavaScript syntax highlighting";
alert(s);
```

{hl_lines=[1, 3,"5-9"]}のように、網掛けしたい行を指定することで
任意に網掛けを行う事が出来る。


```python {hl_lines=[1, 3,"5-9"]}
s = "Python syntax highlighting"

print s
# 総和
sum = 0
for i in range(10) {
    sum += i
}
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```


```
copy text
```

~~AnanteテーマではKatexは使えなかったのでこちら[^2]を参考にした。~~

PaperModテーマでもKatexは使えなかったのでこちら[^2]を参考にした。

[^2]: [Hugo で KaTeX](https://blog.atusy.net/2019/05/09/katex-in-hugo/)

~~`layouts/partials/site-footer.html` に追記する。~~

PaperModでは `layouts/partials/footer.html` に追記

$$
f(x)= ∑_{k=0}^{∞} \frac{ f^{(k)}(x_0)}{n!} \left( x-x_0 \right)^k
$$

$\LaTeX{}$
