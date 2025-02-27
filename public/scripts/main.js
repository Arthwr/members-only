const customWebComponents = async () => {
  const definedElements = new Set();
  const allElements = document.querySelectorAll('*');

  const promises = Array.from(allElements)
    .map((element) => {
      const tagName = element.tagName.toLowerCase();
      if (tagName.includes('-')) {
        if (!definedElements.has(tagName)) {
          definedElements.add(tagName);
          return customElements.whenDefined(tagName);
        }

        return null;
      }
    })
    .filter(Boolean);

  await Promise.allSettled(promises);
  document.body.classList.add('ready');
};

const attachDialogListener = () => {
  const dialog = document.querySelector('.dialog-overview');
  const joinBtn = document.querySelector('.join-btn');

  if (dialog && joinBtn) {
    joinBtn.addEventListener('click', () => dialog.show());
  }
};

const updateMembership = () => {
  const inputValue = document.querySelector('.dialog-overview sl-input');
  const dialog = document.querySelector('.dialog-overview');

  const secretValue = inputValue.value.trim();
  if (!secretValue) return;

  const options = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ secret: secretValue }),
  };

  fetch('/joinclub', options)
    .then((response) => response.json())
    .then((data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      } else {
        console.log(data.alert);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  dialog.hide();
};

document.addEventListener('DOMContentLoaded', async () => {
  await customWebComponents();
  attachDialogListener();
});

document
  .querySelector('.dialog-overview sl-button')
  ?.addEventListener('click', updateMembership);
