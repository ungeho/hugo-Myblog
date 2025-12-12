+++
title = '数値微分'
date = 2025-12-12T13:50:42+09:00
draft = false
categories = ["Programming"]
tags = ["Float", "IEEE754", "数値計算", "誤差", "プログラミング", "数値微分"]
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
> [**4. 数値微分**](../numericalDifferentiation) **👈 今ここ**  

---

コンピューターを用いた具体的な計算によって関数の傾きを求める手法を**数値微分(numerical differentiation)** と呼びます。  
  
微分の定義そのものは極限を用いて表されますが、コンピューター上では無限に小さい変化量を扱うことができません。  
そのため、**有限の差分を用いて「微分を近似する」** 方法が必要になります。

## 数値微分

まず、微分は次のように定義されています。

$$
\begin{aligned}
f^{\prime}(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
\end{aligned}
$$

しかし、実際の計算では$h$を**無限に小さくすることはできません。**  
そのため、有限の小さな$h$を用いて**差分によって近似する**必要があります。  
  
数値微分でよく用いられる差分近似として

- **前進差分(Forward Difference)**
- **後退差分(Backward Difference)**
- **中心差分(Central Difference)**

があります。

---

### hの選び方

数値微分では

- **$h$ が大きい $\to$ 離散化誤差が大きい**
- **$h$ が小さすぎる $\to$ 浮動小数点演算の丸めにより情報落ちが発生しやすい**

というトレードオフがあります。  

そこで、IEEE 754 の倍精度浮動小数点数の機械イプシロン $\epsilon$ を用いると、
丸め誤差と離散化誤差のバランスをとる代表的なステップ幅の選び方として

$$
\begin{aligned}
h = \sqrt{\epsilon}\max(1, |x|)
\end{aligned}
$$

がよく用いられます。倍精度（仮数部 52 bit）の場合は

$$
\begin{aligned}
\epsilon = 2^{-52}
\end{aligned}
$$

となります。  
  
これは，$x+h$ や $x-h$ を計算したときに，
丸め誤差と離散化誤差の影響が釣り合うように選ばれたステップ幅であり，
数値微分において誤差を小さく抑えることを目的としています。
  
さらに高精度の浮動小数点数を用いる場合には、その仮数部ビット数に応じて、$ x \neq 0$のとき$\epsilon = 2^{-52}$の$-52$の部分を調整すればよいです。  
また、このときの$x = 0$のときの$h = 2^{-52}$ についても、任意で調整してください。

---

### 前進差分(Forward Difference)

$$
\begin{aligned}
f^{\prime}(x) &\approx \frac{f(x + h) - f(x)}{h} \\\\
h &= \sqrt{\epsilon}\max(1, |x|)
\end{aligned}
$$

前進差分の誤差は$O(h)$です。

---

### 後退差分(Backward Difference)

$$
\begin{aligned}
f^{\prime}(x) &\approx \frac{f(x) - f(x - h)}{h} \\\\
h &= \sqrt{\epsilon}\max(1, |x|)
\end{aligned}
$$

後退差分の誤差は$O(h)$です。

---

### 中心差分(Central Difference)

$$
\begin{aligned}
f^{\prime}(x) &\approx \frac{f(x + h) - f(x - h)}{2h} \\\\
h &= \sqrt{\epsilon}\max(1, |x|)
\end{aligned}
$$

中心差分の誤差は$O(h^{2})$であり、前進差分や後退差分より精度が高く、通常もっともよく利用される差分近似です。

## 数値微分の実装例

ここでは、紹介した中でもっとも精度の良い中心差分を用いた数値微分の実装例を紹介します。

```python
import math

# 浮動小数点数の機械イプシロン
# 浮動小数点数の精度を上げた場合はここを変更
EPS = 2.0**-52

# hの定義
def step_size(x: float) -> float:
    return math.sqrt(EPS) * max(1.0, abs(x))

# 数値微分f'(x)
def diff(f, x: float) -> float:

    h = step_size(x)

    # 前進差分
    # return ((f(x + h)) - f(x)) / h
    # 後退差分
    # return (f(x) - f(x - h)) / h
    # 中心差分
    return (f(x + h) - f(x - h)) / (2.0 * h)

# f(x) の定義
def func(x) -> float:
    return x**2 + 3.0

x = 2.0

# f(x) と f'(x) の表示
print(f"f({x:5.2f})  = {func(x):10.6f}")
print(f"f'({x:5.2f}) = {diff(func, x):10.6f}")
```

実行結果

```bash
f( 2.00)  =   7.000000
f'( 2.00) =   4.000000
```

## まとめ

数値微分は、微分の定義に基づきながらも、コンピューターでは扱えない「極限」を有限差分で近似する手法です。  
特に中心差分は誤差が小さく、実用的な精度を得やすいためよく用いられます。  
  
また、ステップ幅$h$は数値微分の精度を決める重要な要素であり、大きすぎても小さすぎても誤差が増えてしまいます。  
  
IEEE754の機械イプシロンを用いた

$$
\begin{aligned}
h = \sqrt{\epsilon}\max(1, |x|)
\end{aligned}
$$

という選び方は、丸め誤差と離散化誤差のバランスがよく、多くの応用で実用的です。  
  
実装例として中心差分をPythonで示しましたが、これは他の言語でも同様の考え方で使えます。  
数値微分は数値解法・最適化・微分方程式の計算など、多くの分野の基盤となる重要な技法です。
