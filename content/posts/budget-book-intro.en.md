+++
title = "\"Budget Book\": a Household Budget App Developed with AI Assistance"
date = 2026-04-06T00:40:00+09:00
draft = false
description = "An English companion article introducing Budget Book as a household budget app developed with AI assistance, focused on recording, summarizing, budgeting, and subscription tracking."
categories = ["Programming"]
tags = ["budget app", "React", "TypeScript", "SQLite", "web app"]
series = ["Introducing Apps Developed with AI Assistance"]
showtoc = true
tocopen = true
math = false
+++

{{< ai_translation_notice source="/posts/budget-book-intro/" title="AI-assisted English companion" >}}
This English page presents a project I developed with AI assistance, with AI also used to help draft and translate the article.  
It is written as a creator-side introduction, not as an outside review.
{{< /ai_translation_notice >}}

{{< summary title="Quick Summary" >}}
- `Budget Book` is a household budget web app I developed with AI assistance for simple but practical day-to-day use
- It includes transaction recording, category summaries, monthly budgets, subscription tracking, and CSV import/export
- I also designed it to work reasonably well on both desktop and mobile
{{< /summary >}}

{{< linkcard
  url="https://github.com/ungeho/budget-book"
  title="GitHub: ungeho/budget-book"
  desc="A household budget web app that I developed with AI assistance using React, TypeScript, Express, and SQLite."
  meta="Repository"
/>}}

## What kind of app is this?

`Budget Book` is a **household budget web app I developed with AI assistance, with an emphasis on keeping it simple to use**.  
I did not want it to be just a place to enter numbers.  
I wanted it to help me understand where money goes, how monthly spending looks, and how fixed costs and budgets behave over time.

The main ideas behind it were:

- make daily input feel manageable
- make summaries easy to read at a glance
- keep it usable on both desktop and mobile

## What it can do

{{< section_label tone="mint" >}}Transaction tracking{{< /section_label >}}

The app covers the core features I expect from a personal budget tool.

- record date, type, category, amount, and memo
- list, edit, and delete entries
- filter by month
- handle both income and expense entries

I wanted the basics to stay straightforward, while still being comfortable to revisit later.

{{< section_label tone="blue" >}}Summaries and charts{{< /section_label >}}

This part mattered a lot to me.

- monthly summary
- category breakdown
- donut chart
- six-month bar chart
- spending alerts

I wanted the app to answer not just “what did I enter?” but also “what happened this month?” and “where is the money going?”

### Monthly summary

The monthly summary pulls together:

- total income
- total expense
- overall balance
- monthly subscription cost

That gives a quick snapshot of the month without needing to inspect each transaction one by one.

### Category view

The category breakdown and donut chart are there to make spending patterns easier to read.  
I wanted large categories to stand out instead of disappearing into a long list of numbers.

### Monthly trend

Single-month numbers are useful, but trends matter too.  
That is why I added a six-month income / expense bar chart.  
I wanted this to be an app that is worth revisiting, not just an input form.

## Why I also added budgets and subscriptions

### Monthly budgets

The app lets you define per-category monthly budgets.

- set budget values
- display progress as a bar
- warn when usage crosses 80%
- show overruns in a stronger warning color

I wanted budget data to feel actionable instead of passive.

### Subscription tracking

Fixed costs also matter, so I added a separate subscription section.

- monthly and yearly subscription entries
- automatic monthly-cost conversion
- subscription list management

That makes it easier to notice when recurring costs are quietly growing.

## Spending alerts

There is also a lightweight alert system that detects categories whose spending increased by 30% or more compared with the previous month.

This is not meant to be deep financial analytics.  
It is more of a quick “did something suddenly jump?” signal.

## Layout and usability

### Desktop: two-column layout

On desktop, the app uses a two-column style layout:

- left side for input, subscriptions, and CSV I/O
- right side for summaries, charts, and the transaction list

That way, entering data and checking the result stay visually close.

### Mobile: tab-based flow

On smaller screens, I did not want to simply squeeze the desktop layout.  
Instead, the app switches to three mobile tabs:

- input
- stats
- list

That makes the mobile experience feel more intentional.

## Technical structure

The stack is fairly straightforward.

{{< compare left="Frontend" right="Backend" >}}
- React 19
- TypeScript (strict)
- Vite 8
- SVG-based charts
<!--split-->
- Express 5
- TypeScript
- SQLite
- better-sqlite3
{{< /compare >}}

For an app like this, I wanted a setup that stays lightweight and easy to reason about.  
SQLite felt especially appropriate for that.

## Setup

The development flow is simple:

```bash
npm install
npm run dev
```

That starts:

- the app server on `http://localhost:3001`
- the Vite dev server on `http://localhost:5173`

After building, the production app runs with `npm start`.  
It can also be accessed from another device on the same network.

## Who this is for

{{< steps >}}
1. someone who wants a straightforward household budget app in the browser
2. someone who wants summaries and category-level visibility, not just transaction input
3. someone who wants subscriptions and budget tracking in the same place
4. someone who expects both desktop and mobile usage
{{< /steps >}}

If your main goal is bank integration, automatic categorization, or full asset management, this project is probably aiming at a different level of complexity.

## FAQ

{{< faq q="Can it import and export CSV?" >}}
Yes.  
It supports both CSV export and CSV import, and the README notes that export is designed to work nicely with Excel through BOM-enabled UTF-8 output.
{{< /faq >}}

{{< faq q="Can I add my own categories?" >}}
Yes.  
The app includes default categories, but also allows custom categories to be added.
{{< /faq >}}

{{< faq q="Where is the data stored?" >}}
It uses SQLite and stores data in `data/budget-book.db`.  
On first launch, the necessary tables and default categories are created automatically.
{{< /faq >}}

## Closing thoughts

{{< article_points title="What I wanted this app to do" >}}
- make daily transaction input feel manageable
- make monthly summaries easy to understand
- keep budgets and subscription costs visible
- stay usable on both desktop and mobile
{{< /article_points >}}

`Budget Book` is the kind of app I wanted for myself: a budget tool that covers the important basics while still staying readable and approachable later.  
I want to keep growing it as a household budget app that feels practical to continue using.
