const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

const promoForm = document.querySelector('.ad-form');
const avatarInput = promoForm.querySelector('.ad-form-header__input');
const avatarPreview = promoForm.querySelector('.ad-form-header__preview');
const photoInput = promoForm.querySelector('.ad-form__input');
const photoPreview = promoForm.querySelector('.ad-form__photo');

avatarInput.addEventListener('change', () => {
  setImagePreview(avatarInput, avatarPreview);
});

photoInput.addEventListener('change', () => {
  setImagePreview(photoInput, photoPreview);
});

const setImagePreview = (inputField, previewField) => {
  const file = inputField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => {
    return fileName.endsWith(extension)
  });

  previewField.innerHTML = '';

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = document.createElement('img');
      image.src = reader.result;
      previewField.appendChild(image);
      previewField.style.padding = '0';
      previewField.style.display = 'flex';
      previewField.style.justifyContent = 'center';
      previewField.style.alignItems = 'center';
      previewField.style.overflow = 'hidden';
    });

    reader.readAsDataURL(file);
  }
}
