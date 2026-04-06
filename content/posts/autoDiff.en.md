+++
title = "Automatic Differentiation"
date = 2025-12-12T16:30:33+09:00
draft = false
description = "An AI-translated English edition of the original article on automatic differentiation with dual numbers and validated computation."
categories = ["Programming"]
tags = ["automatic differentiation", "dual numbers", "numerical computing", "error", "programming"]
series = ["Computing with Numbers"]
showtoc = true
tocopen = false
math = true
+++

{{< ai_translation_notice source="/posts/autoDiff/" >}}
This English page was translated with AI from the original Japanese article.  
It preserves the main ideas about dual numbers and validated automatic differentiation, while slightly compressing the longer implementation notes.
{{< /ai_translation_notice >}}

---

> This article belongs to the **Computing with Numbers** series.  
> [**1. Floating-Point Numbers**](../float)  
> [**2. Interval Arithmetic**](../interval)  
> [**3. Numerical Integration**](../numericalIntegration)  
> [**4. Numerical Differentiation**](../numericalDifferentiation)  
> [**5. Automatic Differentiation**](../autoDiff) **<- you are here**

---

Automatic differentiation computes derivatives by propagating derivative information together with ordinary values.  
It avoids the instability of finite differences while remaining much more practical than symbolic algebra for many programs.

## Automatic differentiation with dual numbers

The key object is the dual number

$$
a + b\varepsilon,\qquad \varepsilon^2 = 0
$$

If we substitute `x + \varepsilon` into a smooth function and expand it, the coefficient of `\varepsilon` becomes the derivative.  
That is the core idea behind forward-mode automatic differentiation.

### The dual-number principle from Taylor expansion

Taylor expansion makes the mechanism visible:

$$
f(x+\varepsilon)=f(x)+f'(x)\varepsilon
$$

because all higher powers vanish when `\varepsilon^2=0`.

### Matrix representation of dual numbers

Dual numbers can also be represented by special matrices.  
That view is mathematically elegant and can make some operator relationships easy to read.

### Implementation-level algorithm

In code, the essential pattern is:

- store a value component
- store a derivative component
- overload arithmetic and elementary functions so both parts move together

## Validated automatic differentiation with Python-FLINT

If the value and derivative parts are interval-aware, automatic differentiation can also produce **guaranteed bounds** instead of a single approximate number.

## Validated automatic differentiation with Arb (C++)

The same idea becomes more powerful in lower-level libraries when performance and tighter control matter.

## Why the Python version did not use the matrix form

The original Japanese article explains this carefully.  
The short version is:

### 1. Matrix operations are relatively expensive in Python

For a small dual-number object, general matrix machinery adds overhead without enough benefit.

### 2. Matrix functions can be more general than necessary

The matrix viewpoint is elegant, but the actual goal is only first-order derivative propagation.

### 3. Extensibility matters for higher-order differentiation

When implementation goals change, a direct derivative-aware representation can be easier to grow than a matrix-based abstraction.

### 4. The representation differs, but the essence is the same

Whether you use matrices or a custom dual-number type, the underlying mathematics is the same idea: carry derivative information through the computation graph.

## Summary

Automatic differentiation gives derivatives with machine-level efficiency and without the brittleness of finite differences.  
Dual numbers provide the clean conceptual foundation, and validated arithmetic makes the method even more attractive when correctness guarantees matter.
