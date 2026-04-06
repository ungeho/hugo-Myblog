+++
title = "Regular Star Polygons"
date = 2025-12-14T12:13:06+09:00
draft = false
description = "An AI-translated English edition of the original article on the names, properties, and construction of regular star polygons."
categories = ["Programming"]
tags = ["regular star polygon", "plane geometry", "programming", "geometry"]
series = ["Math and Programming"]
showtoc = true
tocopen = true
math = true
+++

{{< ai_translation_notice source="/posts/regularStarPolygon/" >}}
This English page was translated with AI from the original Japanese article.  
The original mixed personal motivation, geometry, and implementation notes; this English version keeps that overall flow.
{{< /ai_translation_notice >}}

When I was in elementary school, I watched *Fullmetal Alchemist* and genuinely wanted to draw my own transmutation circle.  
At the time I did not even know what search term to use for those beautiful “circle + lines + star” shapes.  
Much later I learned that one family of such figures is called the **regular star polygon**.

## Regular star polygons

### What is a regular star polygon?

A regular star polygon is a star-shaped figure obtained by connecting vertices of a regular `m`-gon with a fixed step size.  
It is commonly written in Schlaefli notation as:

$$
\{m, n\}
$$

where `m` is the number of equally spaced points on a circle and `n` tells us how far ahead to jump when connecting points.

### The algorithm

If the current vertex index is `i`, the next one is chosen by:

$$
i \mapsto (i+n)\bmod m
$$

This simple rule is enough to generate many famous star-shaped figures.

### Implementing a program to draw them

A program only needs a few ingredients:

- place `m` vertices at equal angular intervals on a circle
- choose a step `n`
- repeatedly connect vertex `i` to vertex `(i+n) mod m`

From there, you can draw the figure in any language or graphics environment you like.  
The original article continues with examples and implementation ideas.

## Summary

Regular star polygons are a clean meeting point between geometry and programming.  
They look mysterious at first, but once the indexing rule is visible, the construction becomes beautifully simple.
