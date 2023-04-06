import generator from "generate-password";

export const generateStrongPassword = () => {
  const password = generator.generate({
    length: 12,
    numbers: true,
    uppercase: true,
    symbols: true,
    strict: true,
  });

  return password;
};
