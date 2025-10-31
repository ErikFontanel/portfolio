---
thumbnail: cloom-thumb.jpg
client: Cloom
date: 2019-01-01
title: 30 minutes you'll never regret
tags:
  - project
  - product design
  - startup
  - webapp
  - fitness
list_layout: portrait:1-col.njk
role: Product Design Lead
team: Sanne Wijbenga, Nan Damhuis, Evan Kluin, Rick de Hoop, and the Cloom team
---

Cloom is a start-up offering live group workouts with real trainers — from the comfort of home. I joined as Product Design Lead to design the online fitness experience, define the product’s UX foundations, and set up a scalable design workflow and design system.

{% gallery {
  css: 'full-width',
  caption: ''
} %}

@[local]({{ page.url }}cloomworkout.mp4)

{% endgallery %}

Born during the Covid-19 pandemic, Cloom set out to recreate the social energy of a group workout in a digital format. I joined the founding team to design the entire MVP experience, from the member portal and workout interface to the marketing website.

To accelerate design and development, I created a comprehensive design system in Figma, ensuring visual consistency and efficient iteration. I also contributed directly to the front-end implementation, developing several [Vue3](https://vuejs.org) components and documenting them in [StorybookJS](https://storybook.js.org).

{% gallery {
  css: 'devices full-width',
  caption: 'Cloom Member Area and Class Schedule'
} %}
{% image 'cloom-schedule.png', 'Cloom Workout Experience' %}
{% image 'cloom-member-area-workout.png', 'Cloom Member area' %}
{% endgallery %}

One major challenge was creating the Workout Manager — a system allowing trainers to easily compose and manage classes. The initial plan called for a custom backend solution requiring weeks of development.

Instead, I proposed and prototyped an Airtable-based alternative within two days, demonstrating how off-the-shelf tools could validate complex logic before full development. This prototype became the blueprint for the final backend system, saving significant time and resources.

{% list "Results" %}

- Designed and shipped a fully functional MVP with consistent UX and visual language.
- Established a design system and workflow that scaled as the product grew.
- Accelerated validation through Airtable-based prototyping, directly influencing backend design.
- Improved collaboration between design and engineering through shared component libraries in Figma and Storybook.

{% endlist %}
