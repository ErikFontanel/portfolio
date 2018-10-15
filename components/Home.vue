<template>
  <main-layout>
    <template slot="content">
      <Intro/>
    </template>
  </main-layout>
</template>


<script>
import MainLayout from '~/layouts/Main';
import Intro from '~/components/Intro';

export default {
  components: {
    MainLayout,
    Intro
  }
}
</script>
