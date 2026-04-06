+++
title = "Floating-Point Numbers"
date = 2025-12-07T19:03:04+09:00
draft = false
description = "An English AI translation of the original article on why floating-point numbers cannot represent every real number exactly and how that creates numerical error."
categories = ["Programming"]
tags = ["floating point", "IEEE754", "numerical computing", "error", "programming"]
series = ["Computing with Numbers"]
showtoc = true
tocopen = false
math = true
+++

{{< ai_translation_notice source="/posts/float/" >}}
This page is an AI-translated English edition of the original Japanese article.  
Formulas and examples were preserved where possible, but the wording has been lightly adapted for clarity in English.
{{< /ai_translation_notice >}}

---

> This article belongs to the **Computing with Numbers** series.  
> [**1. Floating-Point Numbers**](../float) **<- you are here**  
> [**2. Interval Arithmetic**](../interval)  
> [**3. Numerical Integration**](../numericalIntegration)  
> [**4. Numerical Differentiation**](../numericalDifferentiation)  
> [**5. Automatic Differentiation**](../autoDiff)

---

When people first meet floating-point arithmetic, one of the classic surprises is that **`0.1 + 0.2` does not become exactly `0.3`**.  
The reason is simple in spirit: computers store numbers in a finite binary format, and that format cannot represent every real number exactly.

## Does `(x - a) + a = x` always hold?

Mathematically, the following identity is always true:

$$
(x-a)+a=x
$$

On a computer, however, this equality can fail because intermediate results may lose information.

### Loss of significance

If a very small number is added to a very large number, the smaller value can disappear when the result is rounded to the available precision.  
The missing low-order bits are not “approximately visible later”; they are simply gone after rounding.

### Catastrophic cancellation

When two nearly equal numbers are subtracted, many leading digits cancel.  
The remaining result can contain only a few meaningful digits, so relative error becomes much larger.

### How to reduce those problems

The standard ideas are:

- avoid subtracting nearly equal quantities when a numerically stable reformulation exists
- change the order of computation so that large rounding steps happen later
- use higher precision or interval-based validation when correctness matters more than speed

## Numerical representation in a computer

### Not every real number can be represented exactly

A computer stores a finite bit pattern, so the number of representable values is finite within any fixed format.  
Real numbers are not finite in that sense, which means exact one-to-one storage is impossible from the start.

## IEEE floating-point numbers

The common IEEE 754 format stores a value using:

- a **sign bit**
- a **mantissa / significand**
- an **exponent**

### Sign bit

The sign bit selects positive or negative values.

### Mantissa / significand

The significand carries the meaningful digits of the number.  
Its finite width directly limits precision.

### Exponent

The exponent shifts the scale of the significand, allowing both very large and very small values to be represented.

### Special exponent patterns

Some exponent patterns are reserved for special cases such as:

- `+0` and `-0`
- subnormal numbers
- `+inf` and `-inf`
- `NaN`

### Precision tiers

Single precision and double precision mainly differ in the number of exponent and significand bits they provide.  
Double precision has a much wider dynamic range and more accurate significand storage.

### Why not all real numbers fit

Binary floating-point represents numbers of the form

$$
\pm m \times 2^e
$$

with a finite significand.  
That means only numbers compatible with a finite binary expansion can be stored exactly.

### Values that *can* be represented exactly

Integers within range, powers of two, and fractions such as `1/2`, `1/4`, and `3/8` work well because they terminate in base 2.

## Would decimal floating point remove all error?

Not really.  
Decimal floating-point can exactly store values like `0.1`, but it still has finite precision.  
Once the operation sequence becomes long enough or the values vary too much in scale, rounding problems still appear.

## What about fixed-point numbers?

Fixed-point arithmetic is excellent when the scale is known in advance, such as money with two decimal places.  
The tradeoff is range.  
You gain predictable resolution, but lose the flexible exponent that floating-point numbers provide.

## If I still need strictly correct bounds

That is where interval arithmetic, exact symbolic methods, or arbitrary-precision libraries become useful.  
They cost more in implementation effort or runtime, but they let us reason about correctness more directly.

## Summary

Floating-point numbers are not “broken.”  
They are a practical engineering format with finite precision, finite range, and well-defined behavior.  
Once you understand that limitation, the strange examples stop looking random and start looking like consequences of the representation itself.
