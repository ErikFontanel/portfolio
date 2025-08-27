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

Cloom is a start-up offering live group workouts with a real trainer from the comfort of your home. I designed the online fitness experience and set up a design workflow and -system.

{% gallery {
  css: 'full-width',
  caption: ''
} %}

@[local]({{ page.url }}cloomworkout.mp4)

{% endgallery %}

Born during the Covid-19 pandemic, I joined Cloom's founding team to design their MVP. I created the entire user experience, including the member portal, workout interface, and marketing website. To accelerate the prototyping- and development process, I created a comprehensive design system in Figma and even contributed some components in code using Vue3 and StorybookJS.

{% gallery {
  css: 'devices full-width',
  caption: 'Cloom Member Area and Class Schedule'
} %}
{% image 'cloom-schedule.png', 'Cloom Workout Experience' %}
{% image 'cloom-member-area-workout.png', 'Cloom Member area' %}
{% endgallery %}

A key challenge was building the Workout Manager - a system for trainers to easily compose and manage classes. While the team initially planned a custom solution requiring weeks of development, I proposed and prototyped an Airtable-based alternative in just two days. This proof-of-concept demonstrated significant time savings and became the foundation of our backend system.
