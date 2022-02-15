const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

const promoForm = document.querySelector('.ad-form');
const avatarInput = promoForm.querySelector('#avatar');
const avatarPreview = promoForm.querySelector('.ad-form-header__preview img');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => {
    return fileName.endsWith(extension)
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
