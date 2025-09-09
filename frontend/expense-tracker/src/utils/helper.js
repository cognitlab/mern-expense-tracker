export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let intitials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    intitials += words[i][0];
  }
  return intitials.toUpperCase();
};

export const addThousandsSeperator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

  return fractionalPart
  ? `${formattedInteger}.${fractionalPart}`
  : formattedInteger;
};