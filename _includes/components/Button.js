module.exports = ({ url = null, label = '', size = '', name = '' }) => {
  return `
<a ${url ? `href="${url}"` : ''} class="button ${
    size ? `button_${size}` : ''
  } ${name}">
  <span class="button--label">${label}</span>
  </a>
`;
};
