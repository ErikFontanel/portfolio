module.exports = (listItems, title) => `
<div class="block list">
  ${title && `<div class="list--title"><h3>${title}</h3></div>`}
  ${listItems}
</div>
`;
