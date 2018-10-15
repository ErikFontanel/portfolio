const Home = () => import('~/components/Home');
const About = () => import('~/components/About');
const Project = () => import('~/components/ProjectSingle');

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/project/:path',
    component: Project
  }
];
