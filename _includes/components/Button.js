export default ({
  url = null,
  label = '',
  size = '',
  name = '',
  attr = '',
}) => {
  return `
<a ${url ? `href="${url}"` : ''} class="button ${
    size ? `button_${size}` : ''
  } ${name}" ${attr}>
  <span class="button--label">${label}</span>
  </a>
`;
};
