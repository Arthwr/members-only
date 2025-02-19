const awaitCustomWebComponents = async () => {
  const definedElements = new Set();
  const allElements = document.querySelectorAll('*');

  const promises = Array.from(allElements).map((element) => {
    const tagName = element.tagName.toLowerCase();
    if (tagName.includes('-')) {
      if (!definedElements.has(tagName)) {
        definedElements.add(tagName);
        return customElements.whenDefined(tagName);
      }
    }
  });

  await Promise.allSettled(promises);
  document.body.classList.add('ready');
};

document.addEventListener('DOMContentLoaded', awaitCustomWebComponents);
