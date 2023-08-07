export function getNameInitialLetters(name: string) {
  const splittedName = name.split(' ');
  return splittedName.length >= 2
    ? (splittedName[0].charAt(0) + splittedName[1].charAt(0)).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}
