+++
title = "Numerical Differentiation"
date = 2025-12-12T13:50:42+09:00
draft = false
description = "An AI-translated English edition of the original article on finite-difference differentiation, step size, and floating-point error."
categories = ["Programming"]
tags = ["numerical differentiation", "IEEE754", "numerical computing", "error", "programming"]
series = ["Computing with Numbers"]
showtoc = true
tocopen = false
math = true
+++

{{< ai_translation_notice source="/posts/numericalDifferentiation/" >}}
This English page was translated with AI from the original Japanese article.  
The discussion keeps the original focus on finite differences and practical numerical error.
{{< /ai_translation_notice >}}

---

> This article belongs to the **Computing with Numbers** series.  
> [**1. Floating-Point Numbers**](../float)  
> [**2. Interval Arithmetic**](../interval)  
> [**3. Numerical Integration**](../numericalIntegration)  
> [**4. Numerical Differentiation**](../numericalDifferentiation) **<- you are here**  
> [**5. Automatic Differentiation**](../autoDiff)

---

Numerical differentiation estimates derivatives from function values.  
The idea is straightforward, but the practical difficulty lies in balancing approximation error against floating-point rounding error.

## Numerical differentiation

Finite-difference formulas approximate derivatives by measuring how the function changes over a small step `h`.

### Choosing `h`

If `h` is too large, truncation error dominates.  
If `h` is too small, subtraction and rounding error dominate.  
A “smaller step is always better” intuition breaks down very quickly on a real computer.

### Forward difference

$$
f'(x) \approx \frac{f(x+h)-f(x)}{h}
$$

This is simple, but not especially accurate.

### Backward difference

$$
f'(x) \approx \frac{f(x)-f(x-h)}{h}
$$

Conceptually similar to the forward difference, just sampled from the other side.

### Central difference

$$
f'(x) \approx \frac{f(x+h)-f(x-h)}{2h}
$$

The central difference is often preferred because it cancels some lower-order error terms and tends to be much more accurate for the same step size.

## Implementation example

A practical implementation needs more than the formula itself:

- a stable evaluation path for `f(x)`
- a reasonable default for `h`
- awareness that the best `h` depends on both the function and the precision

## Summary

Numerical differentiation is easy to write and easy to misuse.  
Its results depend strongly on the step size and on the floating-point environment.  
That is exactly why automatic differentiation becomes so attractive in the next article of the series.
