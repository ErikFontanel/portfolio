module.exports = ({ url = null, label = '', size = null, name = null }) => {
  return `
<a ${url ? `href="${url}"` : ''} class="button ${
    size ? `button_${size}` : size
  } ${name}">
  <span class="button--label">${label}</span>
  </a>
`;
};
