const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
`;

const fragmentShader = `
  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform float uTime;

  void main() {
    float time = uTime * 0.75;
    vec2 repeat = vec2(2., 6.);
    // To repeat the uvs we need to multiply them by a scalar
    // and then get the fractional part of it so they from 0 to 1
    // To move them continuously we have to add time
    // to the x or y component, to change the direction
    vec2 uv = fract(vUv * repeat + vec2(-time, 0.));

    vec3 texture = texture2D(uTexture, uv).rgb;
    // texture *= vec3(uv.x, uv.y, 1.); // To help visualize the repeated uvs

    gl_FragColor = vec4(texture, 1.);
  }
`;

module.exports = {
  vert: vertexShader,
  frag: fragmentShader
};
