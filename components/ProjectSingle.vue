<template>
  <article>
    <h1>{{ title }}</h1>
    {{ images.shift() }}
    {{ description }}
    {{ images }}

  </article>
</template>

<script>
export default {
  data: () => ({ })
}
</script>
