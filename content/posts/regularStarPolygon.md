+++
title = '星形正多角形'
date = 2025-12-14T12:13:06+09:00
draft = false
categories = ["Programming"]
tags = ["星形正多角形","regular star polygon","平面幾何学図形","プログラミング"]
# 目次を付与するオプション <!-- omit in toc -->
showtoc = true
# 目次を開いた状態にする <!-- omit in toc -->
tocopen = true
# 数式を使いたい場合はtrueに設定する。 <!-- omit in toc -->
math = true
+++

私が小学生の頃、『鋼の錬金術師』というアニメを観て、
「オリジナルの錬成陣を描いてみたい」と本気で思っていた時期がありました。

描き方を調べようと図書館に行ったものの、そもそも **何と調べればいいのか** が分かりません。
円と線と星のような、あの独特な図形に、名前があるとは想像もしていなかったのです。

今思えば、あれらはきっと理屈のある図形だったのでしょう。今の私なら、もしかすると描けるかもわかりません。

もっとも、あの頃その描き方を知っていたとしたら、人生に数多ある黒歴史を、いくつか余計に増やしていた可能性は高いのですが。

## 星形正多角形(regular star polygon)

私が **星形正多角形(regular star polygon)** という言葉を知ったのは次の動画のおかげです。  
  
{{< youtube id="hvS1OUmKifI" >}}
  
星形正多角形について非常に分かりやすく整理されており、その生成アルゴリズムについても、動画内で丁寧に解説されています。

正直なところ、この動画を紹介するだけで話は完結してしまいそうです。
しかしそれでは少し味気ないので、
本記事では 星形正多角形のアルゴリズムを整理し、実装の観点からまとめてみたいと思います。

---

### 星形正多角形とは？

正$d$角形としたとき、$d$は2より大きい有理数です。

$$
\begin{aligned}
d > 2,\quad d \in \mathbb{Q}
\end{aligned}
$$

このとき$d$は、正の整数$m$,$n$を用いて次のように表せます。

$$
\begin{aligned}
d = \frac{m}{n}
\end{aligned}
$$

ただし

$$
\begin{aligned}
\frac{m}{n} > 2,\quad m,n \in \mathbb{Z}_{>0}
\end{aligned}
$$

ここで導入した$d = \frac{m}{n}$という表現は、単に「正$d$角形」を一般化するだけのものではありません。  
実はこの分数表現は、そのまま**星形正多角形を表すための記法**へとつながっています。  
  
**円周上に等間隔で$m$個の点を配置**し、そこから **$n$個先の点を順に結んでいく** と考えます。  
このとき得られる図形を

$$
\begin{aligned}
\\{m/n\\}
\end{aligned}
$$

と表し、これを**星形正多角形**とよびます。

- $n = 1$ の場合は通常の正$m$角形  
- $n > 1$ の場合は星形の図形が現れる

という点で、先ほどの$d = \frac{m}{n}$は「正多角形」から「星形正多角形」への自然な拡張になっています。  
  
つまり、**分数で表された角形は、線の結び方そのものを意味している**ということです。
  
円の中心座標を $ (x_{\text{center}}, y_{\text{center}}) $、半径を$r$、角度を$ \theta$（度）とすると、円周上の点$ (x, y)$は次のように表せます。

$$
\begin{aligned}
x &= x_{\text{center}} + r \cos\left(\frac{\theta \pi}{180}\right) \\\\
y &= y_{\text{center}} + r \sin\left(\frac{\theta \pi}{180}\right)
\end{aligned}
$$

のように表せます。

ここで、円周上の等間隔の$m$個の点を基準に、そこから$n$個先の点を順に結んでいきます。  
  
線を引く回数を$i = 0,1,2,\dots$とすると、実際に参照する点の番号は

$$
\begin{aligned}
(i n) \bmod m
\end{aligned}
$$

で与えられます。

円周上の座標は$m$等分されているため、このときの角度$\theta$は

$$
\begin{aligned}
\theta_{i} = \bigl( (i n) \bmod m\bigr) \frac{360}{m}
\end{aligned}
$$

と表せます。

---

### 星形正多角形を描画するプログラムの実装

実装にあたって、最も悩ましいと感じていたのが、`2.5` のように**分数ではない形式で値が入力された場合、それをどのように分数として扱うか** という点でした。

しかし、`Python` には `fractions` という標準ライブラリが用意されています。  
これを利用することで、有理数を分数の形に変換することができます。

`Fraction`オブジェクトに変換すると

- 分子：`frac.numerator`
- 分母：`frac.denominator`

のように、それぞれ整数として取得できます。

この仕組みを使えば、入力形式に依存せず$\\{m/n\\}$ の形で星形正多角形を統一的に扱うことが可能になります。

```python
frac = Fraction(s)
m = frac.numerator
n = frac.denominator
```

---

#### Pythonでの実装

pythonを使って実装すると

```python
import os
from fractions import Fraction
from PIL import Image, ImageDraw
import math
import re
from math import gcd


def is_num(s: str) -> bool:
    try:
        float(s)
        return True
    except ValueError:
        return False


def input_m_n():
    os.system('cls')
    while True:
        s = input("2より大きい有理数(d>2) または m/n (m/n>2, m>=3, m/2>n>=1) を入力してください: ")

        # まず Fraction にできる形かどうかを判定
        if not is_num(s):
            if re.match(r"^\d+/\d+$", s) is None:
                os.system('cls')
                print("※数字 もしくは 整数/整数 の形で入力してください。")
                continue

        try:
            frac = Fraction(s)  # "3.5" も "7/2" もOK
        except ZeroDivisionError:
            os.system('cls')
            print("※分母は0より大きい値を入力してください。(n>0)")
            continue
        except ValueError:
            os.system('cls')
            print("※数値として解釈できませんでした。")
            continue

        if frac <= 2:
            os.system('cls')
            print("※ 2より大きい値を入力してください。")
            continue

        # ここから m/n に合わせる（m=分子, n=分母）
        m = frac.numerator     # 頂点数側にしたい
        n = frac.denominator   # ステップ側にしたい
        if m < 3:
            os.system('cls')
            print("m >= 3 を満たしてください。")
            continue
        if n < 1 or (m * 0.5) <= n :
            os.system('cls')
            print("m/2 > n >= 1 を満たしてください。")
            continue

        return m, n  # (頂点数 m, ステップ n)


def poly_info(m, n):
    d = m / n
    print(f"正\t{d}({m}/{n})\t角形")
    print(f"頂点\t{m}\t\t個")
    print("内角約\t" + str(180 * (float(d) - 2.0) / float(d)) + "\t\t度")


def point_on_circle(cx, cy, r, deg):
    rad = deg * math.pi / 180.0
    return (cx + r * math.cos(rad), cy + r * math.sin(rad))


def poly_draw(m, n, size=1024):
    img = Image.new("RGB", (size, size), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    cx = img.width * 0.5
    cy = img.height * 0.5
    r = min(img.width, img.height) * 0.375

    # 見た目の向き（上向きスタート）
    first_ang = -90

    # 1) m 個の頂点を用意
    theta = 360.0 / m
    vertices = [point_on_circle(cx, cy, r, first_ang + j * theta)
                for j in range(m)]

    # 2) gcd(m, n) に応じて複数成分を描く
    g = gcd(m, n)
    for start in range(g):
        j = start
        pts = [vertices[j]]
        while True:
            j = (j + n) % m
            pts.append(vertices[j])
            if j == start:
                break
        draw.line(pts, fill=(0, 0, 255), width=1, joint="curve")

    os.makedirs("img/png", exist_ok=True)
    path = f"img/png/regularStarPolygon_{m}_{n}.png"
    img.save(path)
    img.show()


def main():
    m, n = input_m_n()
    poly_info(m, n)
    poly_draw(m, n)


if __name__ == "__main__":
    main()
```

---

#### 実行結果1：5/2(2.5)角形

```bash
2より大きい有理数(d>2) または m/n (m/n>2, m>=3, m/2>n>=1) を入力してください: 5/2
正      2.5(5/2)        角形
頂点    5               個
内角約  36.0            度
```

![regular star polygon1](/img/png/regularStarPolygon01.png)

---

#### 実行結果2：9/2(4.5)角形

```bash
2より大きい有理数(d>2) または m/n (m/n>2, m>=3, m/2>n>=1) を入力してください: 4.5
正      4.5(9/2)        角形
頂点    9               個
内角約  100.0           度
```

![regular star polygon2](/img/png/regularStarPolygon02.png)

---

#### 実行結果3：157/50(3.14)角形

```bash
2より大きい有理数(d>2) または m/n (m/n>2, m>=3, m/2>n>=1) を入力してください: 3.14
正      3.14(157/50)                    角形
頂点    157                             個
内角約  65.35031847133759               度
```

![regular star polygon3](/img/png/regularStarPolygon03.png)

---

#### 実行結果4：2.1(21/10)角形

```bash
2より大きい有理数(d>2) または m/n (m/n>2, m>=3, m/2>n>=1) を入力してください: 2.1
正      2.1(21/10)                      角形
頂点    21                              個
内角約  8.571428571428578               度
```

![regular star polygon3](/img/png/regularStarPolygon04.png)

---

#### 補足

`3.14`のような有限小数は必ず有理数であり、`Fraction("3.14")=157/50`のように厳密な分数へ変換できます。(また、`Fraction(3.14)`のように浮動小数点数を直接渡すと丸め誤差が入るため、文字列で渡すのが安全です。)  
本稿に載せたプログラムの場合は、分数の形の入力がより安全になります。

## まとめ

本記事では、**星形正多角形(regular star polygon)** を題材に

- **円周上の$m$等分された点を「$n$個先へ結ぶ」という単純なルール**
- **そのルールがどのように星形の図形として現れるか**
- **星形の図形をPythonでどのように実装できるか**

について整理しました。

子供の頃に「なんとなく不思議でかっこいい」と感じていた図形は、実際には**明確な数学的構造とシンプルなアルゴリズム** によって成り立っていることがあります。  
一見複雑に見える星形の模様も、「円を$m$等分し、$n$ずつ進む」という規則を繰り返しているだけです。  
  
また、`fractions.Fraction`を用いることで、`2.5`や`3.14`のような入力も安全に分数へ変換でき、$\\{m/n\\}$の形で統一的に扱えることを確認しました。  
  
かつては名前すらわからなかった「錬成陣のような図形」が今では数式とコードで再現できるようになりました。  
もしこの記事が、「昔ちょっと憧れた図形」や「数学とプログラミングのつながり」を改めて楽しむきっかけになれば幸いです。
