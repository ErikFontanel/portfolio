<template>
  <div class="site-header">
    <h1 class="page-title">
      {{title}}<br>
      {{subtitle}}
    </h1>


  <nav class="primary"></nav>

  <nav class="projects">
    <ul>
      <project-link v-for="(project, index) in projects"
        :key="index"
        :href="project.path"
        >{{ project.title }}</project-link>
    </ul>
  </nav>

  </div>
</template>

<script>
import ProjectLink from './ProjectLink';
import projects from '~/content/projects';

export default {
  components: {
    ProjectLink
  },
  data() {
    return {
      title: 'Erik Gelderblom',
      subtitle: 'Freelance UX Designer with Front-End skills',
      projects
    }
  }
}
</script>

