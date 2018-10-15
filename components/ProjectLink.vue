<template>
  <li class="project-link"><a :href=`#${href}`><slot>{{ title }}</slot></a></li>
</template>

<script>
export default {
  name: 'ProjectLink',
  props: [
    'href',
    'title'
  ]
}
</script>
