export default function generateSlug() {
  const getRandomLetters = (length: number) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  };

  const getRandomNumbers = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  };

  const part1 = getRandomLetters(2);
  const part2 = getRandomLetters(2);
  const part3 = getRandomNumbers(7);

  return `${part1}-${part2}${part3}`;
}
