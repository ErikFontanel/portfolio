export default ({
  url = null,
  label = '',
  size = '',
  name = '',
  attr = '',
  inverted = false,
}) => {
  return `
<a ${url ? `href="${url}"` : ''} class="button
 ${ size ? `button_${size}` : '' }
 ${ inverted ? `inverted` : '' }
 ${name}" ${attr}>
  <span class="button--label">${label}</span>
  </a>
`;
};
