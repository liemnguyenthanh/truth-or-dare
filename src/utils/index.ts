const GRAVATAR_URL = 'https://gravatar.com/avatar';
export const getAvatarUrl = (name: string) => {
  const enName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, 'd');
  //spacing to - and lowercase
  const spacedName = enName.replace(/\s+/g, '-').toLowerCase();
  //spaced name to number
  const numberName = spacedName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return `${GRAVATAR_URL}/${numberName}?s=400&d=robohash&r=x`;
}
