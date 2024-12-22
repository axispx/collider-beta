export const calculateCollision = (anti, pro) => {
  // Step 1: Calculate u (= mean)
  const u =
    Math.abs(anti - pro) > 0 && Math.abs(anti - pro) < 1
      ? 1
      : Math.abs(anti - pro);

  // Step 2: Calculate s (= standard deviation)
  const s =
    anti + pro > 0 && anti + pro < 1
      ? 1
      : Math.abs(anti - pro) === 0
      ? (anti + pro) / 2
      : (anti + pro) / (2 * Math.abs(anti - pro));

  // Step 3: Generate a normal distribution in -5s to 5s range
  const distribution = [];
  const range = Array.from(
    { length: 100 },
    (_, i) => u - 5 * s + (i / 99) * 10 * s
  );

  for (let x of range) {
    const value =
      Math.exp(-Math.pow(x - u, 2) / (2 * Math.pow(s, 2))) /
      (Math.sqrt(2 * Math.PI) * s);
    distribution.push({ x, value });
  }

  // Step 4: Generate a normal distribution within range > 0
  const curve = [];
  const short = Array.from(
    { length: 100 },
    (_, i) => u - 5 * s + (i / 99) * 10 * s
  ).filter((value) => value >= 0);

  for (let x of short) {
    const value =
      Math.exp(-Math.pow(x - u, 2) / (2 * Math.pow(s, 2))) /
      (Math.sqrt(2 * Math.PI) * s);
    curve.push({ x, value });
  }

  return { u, s, range, distribution, short, curve };
};
