const Footer = () => {
  const yearToRoman = (year: number): string => {
    const romanNumerals: { [key: number]: string } = {
      1000: "M",
      900: "CM",
      500: "D",
      400: "CD",
      100: "C",
      90: "XC",
      50: "L",
      40: "XL",
      10: "X",
      9: "IX",
      5: "V",
      4: "IV",
      1: "I",
    };

    let result = "";
    for (const value of Object.keys(romanNumerals).reverse()) {
      while (year >= Number(value)) {
        result += romanNumerals[Number(value)];
        year -= Number(value);
      }
    }
    return result;
  };

  const currentYear = yearToRoman(new Date().getFullYear());

  return (
    <footer className="mt-20 sm:mt-24 pt-8 border-t border-hairline">
      <p className="font-serif text-sm text-muted-faint">
        © {currentYear} · Akinkunmi
      </p>
    </footer>
  );
};

export default Footer;
