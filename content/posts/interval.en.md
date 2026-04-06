+++
title = "Interval Arithmetic"
date = 2025-12-09T14:46:40+09:00
draft = false
description = "An AI-translated English edition of the original article introducing interval arithmetic and how it preserves guaranteed bounds even in the presence of rounding error."
categories = ["Programming"]
tags = ["interval arithmetic", "IEEE754", "numerical computing", "error", "programming"]
series = ["Computing with Numbers"]
showtoc = true
tocopen = false
math = true
+++

{{< ai_translation_notice source="/posts/interval/" >}}
This English page was translated with AI from the original Japanese article.  
Library names and technical terms were kept as close to the source as possible.
{{< /ai_translation_notice >}}

---

> This article belongs to the **Computing with Numbers** series.  
> [**1. Floating-Point Numbers**](../float)  
> [**2. Interval Arithmetic**](../interval) **<- you are here**  
> [**3. Numerical Integration**](../numericalIntegration)  
> [**4. Numerical Differentiation**](../numericalDifferentiation)  
> [**5. Automatic Differentiation**](../autoDiff)

---

Interval arithmetic stores a number not as a single point, but as a **closed interval** that is guaranteed to contain the true value.

Instead of writing only `x`, we write:

$$
x \in [a,b]
$$

and perform arithmetic in a way that keeps the true answer inside the resulting interval.

## Interval arithmetic

The central idea is simple: every operation must produce an interval that contains **all possible results** of the exact operation.

For example:

$$
[a,b] + [c,d] = [a+c,\; b+d]
$$

and similarly for subtraction, multiplication, and division with attention to sign and zero crossings.

### Types of interval arithmetic

There are multiple practical styles:

- simple textbook interval arithmetic
- outward-rounded interval arithmetic implemented on top of floating-point hardware
- library-supported validated arithmetic with higher-level functions

What matters is not the notation alone, but the guarantee that rounding always expands the interval outward rather than shrinking it incorrectly.

### Why it gives accuracy guarantees

Ordinary floating-point computations may drift away from the true answer without telling you by how much.  
Interval arithmetic instead carries a range, so the output says:

- the result is somewhere in this interval
- and the interval is guaranteed to contain the exact value

That makes it especially useful when correctness matters more than having a single compact decimal string.

### Libraries for interval arithmetic

In practice, using a library is the easiest path.  
The original Japanese article introduces **Python-FLINT**, which provides interval-like functionality built on top of the Arb/FLINT ecosystem.

### Installing Python-FLINT on Windows

The main point is to avoid implementing validated arithmetic from scratch if a solid library already exists.  
For experimentation, Python gives a comfortable environment.  
For heavy numerical work, the underlying C/C++ libraries provide the real strength.

## Summary

Interval arithmetic is a way to say not only “this is the computed answer,” but also “the true answer is definitely inside this range.”  
That makes it a powerful companion to floating-point computation whenever numerical trustworthiness matters.
