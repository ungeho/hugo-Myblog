+++
title = '自動微分'
date = 2025-12-12T16:30:33+09:00
draft = false
categories = ["Programming"]
tags = ["Float", "IEEE754", "数値計算", "誤差", "プログラミング", "自動微分", "双対数"]
# 目次を付与するオプション <!-- omit in toc -->
showtoc = true
# 目次を開いた状態にする <!-- omit in toc -->
tocopen = false
# 数式を使いたい場合はtrueに設定する。 <!-- omit in toc -->
math = true
+++

---

> 💡 **この記事は「コンピューターで計算する」シリーズの一部です。**  
> [**1. 浮動小数点数**](../float)  
> [**2. 区間演算**](../interval)  
> [**3. 数値積分**](../numericalIntegration)  
> [**4. 数値微分**](../numericalDifferentiation)  
> [**5. 自動微分**](../autoDiff) **👈 今ここ**  

---

**自動微分(Automatic Differentiation,AD)** は、関数を構成する演算をそのまま微分へ拡張することで、プログラム実行と同時に微分値を求める手法です。  
  
特に**双対数(Dual numbers)** を用いた手法では、入力を$x+\varepsilon$ として計算するだけで、関数値$f(x)$ と導関数$f^{\prime}(x)$ が同時に得られ、数値微分のような誤差がなく$h$ の選択が不要になります。

## 双対数を用いた自動微分

双対数（Dual Numbers）を用いた自動微分では、入力を

$$
\begin{aligned}
x + \varepsilon
\end{aligned}
$$

としたときの関数の値が

$$
\begin{aligned}
f(x + \varepsilon) = f(x) + \varepsilon f^{\prime}(x)
\end{aligned}
$$

という形になることを利用して微分値を得ます。  
  
ここで$\varepsilon$は次の性質をもつ特別な元です

$$
\begin{aligned}
\varepsilon &\neq 0\\\\
\varepsilon^{2} &= 0
\end{aligned}
$$

これは「$\varepsilon$ は二乗すると完全に消える」という意味を表します。

---

### テイラー展開から見た双対数の原理

ここで、次のテイラー級数を考えます。

$$
\begin{aligned}
f(x + a) = \sum_{n=0}^{\infty} \frac{f^{(n)} (x)}{n!}(a)^{n}
\end{aligned}
$$

に$a=\varepsilon$を代入すると

$$
\begin{aligned}
f(x + \varepsilon) = \sum_{n=0}^{\infty} \frac{f^{(n)} (x)}{n!}(\varepsilon)^{n}
\end{aligned}
$$

これを展開すると

$$
\begin{aligned}
f(x + \varepsilon) = f(x) + \varepsilon f^{\prime}(x) + \varepsilon^{2} \frac{f^{\prime\prime}(x)}{2!} +\varepsilon^{3}\frac{ f^{(3)}(x)}{3!} + \dots
\end{aligned}
$$

しかし、双対数の定義より

$$
\begin{aligned}
\varepsilon^{2} = 0
\end{aligned}
$$

であるため、二次以降の項が全て消えます。  
よって

$$
\begin{aligned}
f(x + \varepsilon) = f(x) + \varepsilon f^{\prime}(x)
\end{aligned}
$$

という非常にシンプルな形が得られます。  
ここで

- 実部：$f(x)$
- $\varepsilon$の係数：$f^{\prime}(x)$

が得られるため、双対数を使うことで**関数値と導関数**が同時に計算できるわけです。

---

### 双対数を行列で表現する

$$
\begin{aligned}
x + \varepsilon y
\end{aligned}
$$

は2 x 2 の上三角行列

$$
\begin{aligned}
\begin{pmatrix}
x & y \\\\
0 & x
\end{pmatrix}
\end{aligned}
$$

と全く同じ振る舞いをします。  
このとき、双対数$\varepsilon$ は

$$
\varepsilon =
\begin{aligned}
\begin{pmatrix}
0 & 1 \\\\
0 & 0
\end{pmatrix}
\end{aligned}
$$

であり、行列の積をとると

$$
\varepsilon^{2} =
\begin{aligned}
\begin{pmatrix}
0 & 1 \\\\
0 & 0
\end{pmatrix}
\times
\begin{pmatrix}
0 & 1 \\\\
0 & 0
\end{pmatrix}
\=
\begin{pmatrix}
0 & 0 \\\\
0 & 0
\end{pmatrix}
\end{aligned}
$$

したがって

$$
\begin{aligned}
\varepsilon &\neq 0\\\\
\varepsilon^{2} &= 0
\end{aligned}
$$

という双対数の性質が行列で正しく再現されています。

### 実装上のアルゴリズム

双対数を用いた自動微分は、双対数

$$
\begin{aligned}
x + \varepsilon y
\end{aligned}
$$

を扱えるように、**加算・乗算などの基本的な演算をオペレーターオーバーロードによって再定義する** ことで実現できます。  
具体的には、ほとんど行列演算の実装になります。  
  
代入演算子(`+=`,`-=`,`*=`,`/=`)や符号`-`は演算子を上書きした四則演算を使って演算します。  
一部の特殊関数は定義した特殊関数を使用します。  

---

#### 加算 +

$$
\begin{aligned}
\begin{pmatrix}
a & b \\\\
c & d
\end{pmatrix}
\+
\begin{pmatrix}
e & f \\\\
g & h
\end{pmatrix}
\=
\begin{pmatrix}
a+e & b+f \\\\
c+g & d+h
\end{pmatrix}
\end{aligned}
$$

より

$$
\begin{aligned}
(x + y \varepsilon) + (v + w \varepsilon)
\end{aligned}
$$

は

$$
\begin{aligned}
\begin{pmatrix}
x & y \\\\
0 & x
\end{pmatrix}
\+
\begin{pmatrix}
v & w \\\\
0 & v
\end{pmatrix}
\=
\begin{pmatrix}
x+v & y+w \\\\
0 & x+v
\end{pmatrix}
\end{aligned}
$$

まとめると

$$
\begin{aligned}
(x + y \varepsilon) + (v + w \varepsilon) =
\begin{pmatrix}
x+v & y+w \\\\
0 & x+v
\end{pmatrix}
\end{aligned}
$$

---

#### 減算 -

$$
\begin{aligned}
\begin{pmatrix}
a & b \\\\
c & d
\end{pmatrix}
\-
\begin{pmatrix}
e & f \\\\
g & h
\end{pmatrix}
\=
\begin{pmatrix}
a-e & b-f \\\\
c-g & d-h
\end{pmatrix}
\end{aligned}
$$

より

$$
\begin{aligned}
(x + y \varepsilon) + (v + w \varepsilon)
\end{aligned}
$$

は

$$
\begin{aligned}
\begin{pmatrix}
x & y \\\\
0 & x
\end{pmatrix}
\-
\begin{pmatrix}
v & w \\\\
0 & v
\end{pmatrix}
\=
\begin{pmatrix}
x-v & y-w \\\\
0 & x-v
\end{pmatrix}
\end{aligned}
$$

まとめると

$$
\begin{aligned}
(x + y \varepsilon) + (v + w \varepsilon) =
\begin{pmatrix}
x-v & y-w \\\\
0 & x-v
\end{pmatrix}
\end{aligned}
$$

---

#### スカラー倍

$$
\begin{aligned}
k(x + y \varepsilon)
\end{aligned}
$$

は

$$
\begin{aligned}
k
\begin{pmatrix}
x & y \\\\
0 & x
\end{pmatrix}
\=
\begin{pmatrix}
kx & ky \\\\
0 & kx
\end{pmatrix}
\end{aligned}
$$

まとめると

$$
\begin{aligned}
k(x + y \varepsilon) =
\begin{pmatrix}
kx & ky \\\\
0 & kx
\end{pmatrix}
\end{aligned}
$$

---

#### 乗算 *

$$
\begin{aligned}
\begin{pmatrix}
a & b \\\\
c & d
\end{pmatrix}
\times
\begin{pmatrix}
e & f \\\\
g & h
\end{pmatrix}
\=
\begin{pmatrix}
ae + bg & af + bh \\\\
ce + dg & cf + dh
\end{pmatrix}
\end{aligned}
$$

より

$$
\begin{aligned}
(x + y \varepsilon) \times (v + w \varepsilon)
\end{aligned}
$$

は

$$
\begin{aligned}
\begin{pmatrix}
x & y \\\\
0 & x
\end{pmatrix}
\times
\begin{pmatrix}
v & w \\\\
0 & v
\end{pmatrix}
\=
\begin{pmatrix}
xv & xw + yv \\\\
0 & xv
\end{pmatrix}
\end{aligned}
$$

まとめると

$$
\begin{aligned}
(x + y \varepsilon) \times (v + w \varepsilon) =
\begin{pmatrix}
xv & xw + yv \\\\
0 & xv
\end{pmatrix}
\end{aligned}
$$

---

#### 逆行列(除算 /)

$$
\begin{aligned}
A =
\begin{pmatrix}
a & b \\\\
c & d
\end{pmatrix},
\qquad
\det(A) = ad - bc \neq 0
\end{aligned}
$$

$$
\begin{aligned}
A^{-1}
= \frac{1}{ad - bc}
\begin{pmatrix}
d & -b \\\\
-c & a
\end{pmatrix}
\end{aligned}
$$

より

$$
\begin{aligned}
(x + y \varepsilon) \div (v + w \varepsilon)
\end{aligned}
$$

は$(v + w \varepsilon)$ の逆行列を求めて

$$
\begin{aligned}
v^{2} \neq 0
\end{aligned}
$$

より実部$v \neq 0$ のとき

$$
\begin{aligned}
&\begin{pmatrix}
x & y \\\\
0 & x
\end{pmatrix}
\times
\frac{1}{v^{2}}
\begin{pmatrix}
v & -w \\\\
0 & v
\end{pmatrix}\\\\
\=
&\begin{pmatrix}
x & y \\\\
0 & x
\end{pmatrix}
\times
\begin{pmatrix}
\frac{1}{v} & -\frac{w}{v^{2}} \\\\
0 & \frac{1}{v}
\end{pmatrix}\\\\
\=
&\begin{pmatrix}
\frac{x}{v} & -\frac{xw}{v^{2}}+\frac{y}{v} \\\\
0 & \frac{x}{v}
\end{pmatrix}\\\\
\=
&\begin{pmatrix}
\frac{x}{v} & \frac{yv-xw}{v^{2}} \\\\
0 & \frac{x}{v}
\end{pmatrix}
\end{aligned}
$$

まとめると

$$
\begin{aligned}
(x + y \varepsilon) \div (v + w \varepsilon) =
\begin{pmatrix}
\frac{x}{v} & \frac{yv-xw}{v^{2}} \\\\
0 & \frac{x}{v}
\end{pmatrix}
\end{aligned}
$$

---

#### 指数関数

与えられた$x + \varepsilon y$を次のように計算します。

$$
\begin{aligned}
\exp(x + \varepsilon y) = \exp(x) \times \exp(\varepsilon y)
\end{aligned}
$$

指数関数は与えられた行列を$X$としたとき$\exp(X)$は

$$
\begin{aligned}
\exp(X) = \sum_{k=0}^{\infty} \frac{X^{k}}{k!}
\end{aligned}
$$

です。  
  
実数部分$x$はそのまま

$$
\exp(x)
$$

とする。  
双対数$\varepsilon y$ は$\varepsilon^{2} = 0$より$k\ge2$のときの項が$0$になるので

$$
\begin{aligned}
\exp(\varepsilon y) = \sum_{k=0}^{\infty} \frac{(\varepsilon y)^{k}}{k!} = 1 + \varepsilon y
\end{aligned}
$$

になる。  
  
これをまとめると

$$
\begin{aligned}
\exp(x + \varepsilon y) = \exp(x) \times (1 + \varepsilon y) = \exp(x) + \varepsilon y \exp(x)
\end{aligned}
$$

になり

$$
\begin{aligned}
\exp(x + \varepsilon y) =
\begin{pmatrix}
\exp(x) &  y \exp(x) \\\\
0 & \exp(x)
\end{pmatrix}
\end{aligned}
$$

である。

---

#### 三角関数(sin,cos)

与えられた$x + \varepsilon y$を次のように計算します。

- 正弦関数(sin)の場合

$$
\begin{aligned}
\sin(x + \varepsilon y) = \sin(x)\times\cos(\varepsilon y) + \cos(x) \times \sin(\varepsilon y)
\end{aligned}
$$

- 余弦関数(cos)の場合

$$
\begin{aligned}
\cos(x + \varepsilon y) = \cos(x)\times\cos(\varepsilon y) - \sin(x) \times \sin(\varepsilon y)
\end{aligned}
$$

与えられた行列を$X$としたとき

- 正弦関数(sin)は

$$
\begin{aligned}
\sin(X) = \sum_{k=0}^{\infty} \frac{(-1)^{k}}{(2k + 1)!} X^{2k+1}
\end{aligned}
$$

- 余弦関数(cos)は

$$
\begin{aligned}
\cos(X) = \sum_{k=0}^{\infty} \frac{(-1)^{k}}{(2k)!} X^{2k}
\end{aligned}
$$

指数関数の時と同じように、実部$x$はそのまま

- 正弦関数(sin)

$$
\sin(x)
$$

- 余弦関数(cos)

$$
\cos(x)
$$

とする。  
双対数$\varepsilon y$ は$\varepsilon^{2} = 0$より$k\ge1$のときの項が$0$になるので

- 正弦関数(sin)は

$$
\begin{aligned}
\sin(\varepsilon y) = \sum_{k=0}^{\infty} \frac{(-1)^{k}}{(2k + 1)!} (\varepsilon y)^{2k+1}=\varepsilon y
\end{aligned}
$$

- 余弦関数(cos)は

$$
\begin{aligned}
\cos(\varepsilon y) = \sum_{k=0}^{\infty} \frac{(-1)^{k}}{(2k)!} (\varepsilon y)^{2k} = 1
\end{aligned}
$$

よって

- 正弦関数(sin)は

$$
\begin{aligned}
&\sin(x + \varepsilon y)\\\\
= &\sin(x)\times\cos(\varepsilon y) + \cos(x) \times \sin(\varepsilon y)\\\\
= &\sin(x) \times 1 + \cos(x) \times \varepsilon y \\\\
= &\sin(x) + \varepsilon y \cos(x)
\end{aligned}
$$

- 余弦関数(cos)は

$$
\begin{aligned}
&\cos(x + \varepsilon y)\\\\
= &\cos(x) \times \cos(\varepsilon y) - \sin(x) \times \sin(\varepsilon y)\\\\
= &\cos(x) \times 1 - \sin(x) \times \varepsilon y\\\\
= &\cos(x) - \varepsilon y \sin(x)
\end{aligned}
$$

まとめると

- 正弦関数(sin)

$$
\begin{aligned}
\sin(x + \varepsilon y) =
\begin{pmatrix}
\sin(x) & y \cos(x) \\\\
0 & \sin(x)
\end{pmatrix}
\end{aligned}
$$

- 余弦関数(cos)

$$
\begin{aligned}
\cos(x + \varepsilon y) =
\begin{pmatrix}
\cos(x) & - y \sin(x) \\\\
0 & \cos(x)
\end{pmatrix}
\end{aligned}
$$

---

#### 三角関数(tan)

$$
\begin{aligned}
\tan(x + y \varepsilon) = \frac{\sin(x + y\varepsilon)}{\cos(x + y\varepsilon)}
\end{aligned}
$$

により、三角関数(sin,cos)と乗算と逆行列(除算)を実装して、それらを利用ことで演算可能になる。

---

#### 対数関数(log)

与えられた$x + \varepsilon y$を次のように計算します。

$$
\begin{aligned}
x + y \varepsilon = x \times (1 + \frac{y \varepsilon}{x})
\end{aligned}
$$

より

$$
\begin{aligned}
\log(x \times (1 + \frac{y \varepsilon}{x})) = \log(x) + \log(1 + \frac{y \varepsilon} {x})
\end{aligned}
$$

対数関数は与えられた行列を$1 + X$としたとき$\log(1 + X)$は

$$
\begin{aligned}
\log(1 + X) = \sum_{k=1}^{\infty} \frac{(-1)^{k+1}}{k} X^{k}
\end{aligned}
$$

です。  
  
実数部分$x$はそのまま

$$
\begin{aligned}
\log(x)
\end{aligned}
$$

とする。
双対数$(1 + \frac{y \varepsilon}{x})$ は$\varepsilon^{2} = 0$より$k \ge 2$のときの項が$0$になるので

$$
\begin{aligned}
\log(1 + \frac{y \varepsilon}{x}) = \sum_{k=1}^{\infty} \frac{(-1)^{k+1}}{k} (\frac{y \varepsilon}{x})^{k} = \frac{y \varepsilon}{x}
\end{aligned}
$$

よって

$$
\begin{aligned}
\log(x \times (1 + \frac{y \varepsilon}{x})) = \log(x) + \frac{y \varepsilon}{x}
\end{aligned}
$$

まとめると

$$
\begin{aligned}
\log(x + y \varepsilon) =
\begin{pmatrix}
\log(x) & \frac{y}{x} \\\\
0 & \log(x)
\end{pmatrix}
\end{aligned}
$$

#### 累乗（power）

双対数の累乗 $X^n$ を計算する場合，指数 $n$ が整数か非整数かで扱いが異なります。

---

**1. $n$が整数の場合（整数乗）**

- $n = 0$のとき

$$
\begin{aligned}
X^{0} = I
\end{aligned}
$$

（単位行列を返す）

- $n > 0$のとき

$$
\begin{aligned}
  X^n = \underbrace{X X \cdots X}_{n\ \text{回}}
\end{aligned}
$$

（反復乗算）

- $n < 0$ のとき

$$
\begin{aligned}
X^n = (X^{-1})^{|n|}
\end{aligned}
$$

（逆行列を使って正の指数と同様に計算）

---

**2. $n$ が整数でない場合（実数乗・非整数指数）**

一般の実数指数 $n$ に対しては，指数関数と対数関数を使って

$$
\begin{aligned}
X^n = \exp\bigl(n \log X\bigr)
\end{aligned}
$$

と定義します。

これは実数の世界における定義

$$
\begin{aligned}
x^n = \exp\bigl(n\log x\bigr)
\end{aligned}
$$

の行列版です。

双対数は行列で表せるので

- `log(X)`（上三角行列の対数）  
- `exp(n log(X))`（上三角行列の指数）  

がすべて計算可能になり、任意実数指数の累乗を扱うことができます。

---

#### 平方根（Square root）

平方根は累乗の特別な場合として扱うことができます。  
すなわち

$$
\begin{aligned}
\sqrt{X} = X^{1/2}
\end{aligned}
$$

であるため、前節で定義した累乗演算 $X^n$ を指数 $n = 0.5$ として評価すれば平方根が計算できます。

---

#### 行列表現に対する平方根

双対数の行列表現

$$
\begin{aligned}
X =
\begin{pmatrix}
x & y \\\\
0 & x
\end{pmatrix}
\end{aligned}
$$

に対しては，

$$
\begin{aligned}
X^{1/2}
\=
\begin{pmatrix}
x^{1/2} & \frac{1}{2} x^{-1/2} y \\\\
0 & x^{1/2}
\end{pmatrix}
\end{aligned}
$$

となり，これは通常の平方根の微分法則

$$
\begin{aligned}
\frac{d}{dx} \sqrt{x} = \frac{1}{2\sqrt{x}}
\end{aligned}
$$

と一致しています。

---

#### 実装上の処理

- $n = 0.5$ として累乗演算 `pow(X, n)` を呼び出すだけでよい  
- 内部では  
  - 整数指数かどうかを判定  
  - 非整数なので  
    $$
    \begin{aligned}
      X^{0.5} = \exp\!\left(0.5 \log X\right)
    \end{aligned}
    $$
    の形で処理される

これにより，双対数に対する平方根が自然に計算できます。

---

## Python-FLINTを使った双対数による精度保証付き自動微分

双対数を使った自動微分では

$$
\begin{aligned}
x + \varepsilon y
\end{aligned}
$$

という形の数を用いることで、**関数値とその微分値**を同時に計算出来ます。  
  
さらに、実数部・微分値の計算に**Python-FLINTの`arb`型(実数のための区間演算)**を用いることで、丸め誤差を含めた **「真の値を必ず含む区間」としての自動微分の結果** を得ることができます。  
  
次のプログラムは、Python-FLINTを用いて、双対数により自動微分を行いつつ、`arb`による区間で精度保証を行う実装例です。

```python
from flint import arb, ctx


class DualArb:
    """
    Dual number over Arb:
        x + eps * dx  (eps^2 = 0)

    val: arb  — 実数部 x
    der: arb  — 微分値 dx
    """

    __slots__ = ("val", "der")

    def __init__(self, val=0, der=0):
        self.val = arb(val)
        self.der = arb(der)

    # --- ユーティリティ ---

    @staticmethod
    def lift(x):
        """スカラー or DualArb を DualArb に持ち上げる。"""
        if isinstance(x, DualArb):
            return x
        return DualArb(x, 0)

    def copy(self):
        return DualArb(self.val, self.der)

    def __repr__(self):
        return f"DualArb(val={self.val}, der={self.der})"

    # --- 四則演算 ---

    def __add__(self, other):
        other = DualArb.lift(other)
        return DualArb(self.val + other.val, self.der + other.der)

    __radd__ = __add__

    def __sub__(self, other):
        other = DualArb.lift(other)
        return DualArb(self.val - other.val, self.der - other.der)

    def __rsub__(self, other):
        other = DualArb.lift(other)
        return DualArb(other.val - self.val, other.der - self.der)

    def __neg__(self):
        return DualArb(-self.val, -self.der)

    def __mul__(self, other):
        other = DualArb.lift(other)
        # (x + eps dx)(y + eps dy) = xy + eps (x dy + y dx)
        val = self.val * other.val
        der = self.val * other.der + self.der * other.val
        return DualArb(val, der)

    __rmul__ = __mul__

    def __truediv__(self, other):
        other = DualArb.lift(other)
        # (x + eps dx) / (y + eps dy)
        # = (x / y) + eps * ( (dx*y - x*dy) / y^2 )
        inv = 1 / other.val
        val = self.val * inv
        der = (self.der * other.val - self.val * other.der) * (inv * inv)
        return DualArb(val, der)

    def __rtruediv__(self, other):
        # (a) / (x + eps dx)
        other = DualArb.lift(other)
        inv = 1 / self.val
        val = other.val * inv
        der = (other.der * self.val - other.val * self.der) * (inv * inv)
        return DualArb(val, der)

    # --- 累乗 ---

    def __pow__(self, n):
        """
        (x + eps dx)^n, n はスカラー（int/float/arb）だけ対応。
        d/dx x^n = n x^(n-1) を使う。
        """
        if isinstance(n, DualArb):
            raise TypeError("DualArb ** DualArb は未実装（スカラー指数だけ対応）。")

        n_arb = arb(n)
        val = self.val ** n_arb
        der = n_arb * (self.val ** (n_arb - 1)) * self.der
        return DualArb(val, der)

    def __rpow__(self, base):
        """
        base ** (x + eps dx)
        = exp((x + eps dx) * log(base))
        """
        base_arb = arb(base)
        if base_arb <= 0:
            raise ValueError("base は正の実数にしてね（log が必要になるので）。")

        # f(x) = base^x, f'(x) = base^x * log(base)
        val = base_arb ** self.val
        der = val * self.der * base_arb.log()
        return DualArb(val, der)

# --- elementary functions on DualArb ---

def dual_exp(x):
    """
    exp(x + eps dx) = exp(x) + eps * dx * exp(x)
    """
    x = DualArb.lift(x)
    v = x.val.exp()
    return DualArb(v, x.der * v)

def dual_log(x):
    """
    log(x + eps dx) = log(x) + eps * dx / x
    """
    x = DualArb.lift(x)
    return DualArb(x.val.log(), x.der / x.val)

def dual_sin(x):
    """
    sin(x + eps dx) = sin(x) + eps * dx * cos(x)
    """
    x = DualArb.lift(x)
    return DualArb(x.val.sin(), x.der * x.val.cos())

def dual_cos(x):
    """
    cos(x + eps dx) = cos(x) - eps * dx * sin(x)
    """
    x = DualArb.lift(x)
    return DualArb(x.val.cos(), -x.der * x.val.sin())

def dual_tan(x):
    """
    tan = sin / cos で実装（安直版）
    """
    return dual_sin(x) / dual_cos(x)

def dual_sqrt(x):
    """
    sqrt(x + eps dx) = sqrt(x) + eps * dx / (2 * sqrt(x))
    """
    x = DualArb.lift(x)
    v = x.val.sqrt()
    return DualArb(v, x.der / (2 * v))



def differentiate(f, x0, dps=50):
    ctx.dps = dps
    x = DualArb(x0, 1)
    y = f(x)
    if not isinstance(y, DualArb):
        y = DualArb.lift(y)
    return y.val, y.der

if __name__ == "__main__":
    from flint import arb

    # f(x) を DualArb で書く
    def f(x: DualArb) -> DualArb:
        # f(x) = x^3 + 2 * sin(x) * exp(x)
        return x**3 + 2 * dual_sin(x) * dual_exp(x)

    # xの値と精度を入力
    val, der = differentiate(f, x0=2, dps=80)

    # 結果出力
    print("-------------- 自動微分の結果出力 -------------------")
    print("f(x)  =", val)
    print("f'(x) =", der)


    # ここからは検算用（普通のarbで計算）

    # 検算用の x の 値をarbで入力
    x = arb(2)
    f_exact = x**3 + 2 * x.sin() * x.exp()
    # f'(x) = 3x^2 + 2[cos x * e^x + sin x * e^x]
    fprime_exact = 3 * x**2 + 2 * (x.cos() * x.exp() + x.sin() * x.exp())

    # 検算出力
    print("-------------- 検算用の結果出力 ---------------------")
    print("f(x) (exact-like)  =", f_exact)
    print("f'(x) (exact-like) =", fprime_exact)
```

実行結果

```bash
-------------- 自動微分の結果出力 -------------------
f(x)  = [21.437699394856499942536605542730404247329089189979126594003547131771280961691209 +/- 4.59e-79]
f'(x) = [19.287834753577782208311647433138084351108611465818774471674468084248344679936378 +/- 5.27e-79]
-------------- 検算用の結果出力 ---------------------
f(x) (exact-like)  = [21.437699394856499942536605542730404247329089189979126594003547131771280961691209 +/- 4.59e-79]
f'(x) (exact-like) = [19.287834753577782208311647433138084351108611465818774471674468084248344679936378 +/- 5.27e-79]
```

## まとめ

本記事では，双対数（Dual numbers）を用いた自動微分の仕組みについて

- **双対数の定義とテイラー展開から見た原理**  
- **双対数を 2×2 上三角行列表現に落とし込む方法**  
- **四則演算（加算・減算・乗算・除算）の具体的な式**  
- **exp, log, sin, cos, tan, 累乗，平方根といった初等関数の拡張方法**  
- **それらを土台にした実装アルゴリズム**

といった流れで整理しました。

---

双対数を使うことで

- 関数値 $f(x)$ と導関数 $f'(x)$ を **1 回の評価で同時に得られる**  
- 差分幅 $h$ の調整が不要で，**数値微分のようなステップサイズ起因の誤差がない**  
- 実装は「いつもの実数演算」をそのまま双対数（行列）に拡張するだけ

といった利点があることがわかります。

---

さらに，Python-FLINT の `arb` 型と組み合わせることで，

- 実数部・微分値のどちらも **「真値を含む区間」** として表現できる  
- 丸め誤差を含めた **精度保証付き自動微分** が実現できる  

というところまで到達しました。

---

数値微分・自動微分を並べて見たとき

- **数値微分：実装は簡単だが，誤差と $h$ の選び方に悩まされる**  
- **自動微分：精度保証には区間演算を用いるのみで良い**

という性質の違いがあり、とても気持ちのよい手法だと感じてもらえたら嬉しいです。

また双対数を使った自動微分は

- **$n$次の超双対数による$n$階微分の計算**

にも発展させることができます。
