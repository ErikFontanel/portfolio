<template>
  <main>
    <nav-primary></nav-primary>
    <div class="wrapper">
      <slot name="content"></slot>
    </div>
  </main>
</template>

<script>
import NavPrimary from '~/components/NavPrimary.vue';

export default {
  data() {
    return {
      message: 'hello'
    }
  },
  components: {
    NavPrimary
  },
}
</script>
