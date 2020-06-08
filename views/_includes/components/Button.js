module.exports = ({ url = null, label = '', size = null }) => `
<a ${url ? `href="${url}"` : ''} class="button ${
  size ? `button_${size}` : size
}">${label}</a>
`;
