+++
title = "Numerical Integration"
date = 2025-12-10T20:28:15+09:00
draft = false
description = "An AI-translated English edition of the original article on numerical integration, including the trapezoidal rule, DE formula, and interval-based validation."
categories = ["Programming"]
tags = ["numerical integration", "IEEE754", "numerical computing", "error", "programming"]
series = ["Computing with Numbers"]
showtoc = true
tocopen = false
math = true
+++

{{< ai_translation_notice source="/posts/numericalIntegration/" >}}
This English page was translated with AI from the original Japanese article.  
Some derivation details were shortened slightly, but the overall structure and conclusions were preserved.
{{< /ai_translation_notice >}}

---

> This article belongs to the **Computing with Numbers** series.  
> [**1. Floating-Point Numbers**](../float)  
> [**2. Interval Arithmetic**](../interval)  
> [**3. Numerical Integration**](../numericalIntegration) **<- you are here**  
> [**4. Numerical Differentiation**](../numericalDifferentiation)  
> [**5. Automatic Differentiation**](../autoDiff)

---

Numerical integration asks how we can approximate an integral when an analytic antiderivative is unavailable or impractical.

## Numerical integration

The basic approach is to replace a continuous area with a computable approximation.  
As the discretization becomes finer, the approximation may converge toward the true value.

## A case that is hard to integrate analytically

Even when a function is perfectly smooth, an elementary closed-form antiderivative may not exist.  
That is the point where numerical integration becomes a practical tool rather than just a classroom technique.

## Numerical integration methods

### Trapezoidal rule

The trapezoidal rule approximates the curve by straight-line segments over small subintervals.  
It is easy to implement and works surprisingly well for many ordinary problems.

### Double Exponential Formula

The double exponential method is designed for difficult integrals, especially when the integrand has endpoint behavior that hurts simpler schemes.  
After a suitable variable transform, the integrand decays extremely fast, which makes truncation and discretization efficient.

### DE transform

The transform changes variables so that the important region becomes easier to sample numerically.  
The strength of the method is not magic; it is the fact that the transformed integrand becomes much better behaved for quadrature.

### A concrete DE example

The Japanese original walks through an example in detail.  
The main lesson is that a carefully chosen transformation can outperform naive refinement of a simpler rule.

### Implementation example

A practical implementation needs:

- step-size selection
- truncation limits
- a stopping condition or precision target

### Comparing trapezoidal and DE methods

The trapezoidal rule wins on simplicity.  
The DE formula often wins on difficult integrals and faster error decay when the transform matches the problem well.

### Comparing error decay

A good numerical method is not only about “getting an answer,” but about how fast the error decreases as work increases.  
That is why convergence plots and validation matter.

## Accuracy guarantees with interval arithmetic

If you combine numerical integration with interval arithmetic, you can turn approximate computation into **validated computation**.  
Instead of trusting a single floating-point answer, you can obtain a range that is guaranteed to contain the exact integral.

## Summary

Numerical integration is the art of turning an intractable integral into a controlled approximation.  
The trapezoidal rule gives a clean baseline, the DE formula offers powerful refinement for harder cases, and interval arithmetic helps turn approximation into something numerically trustworthy.
