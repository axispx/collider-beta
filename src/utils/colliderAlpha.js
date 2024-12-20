export const calculateDistribution = (anti, pro) => {
  if (anti === 0 && pro === 0) {
    throw new Error("BOTH_ANTI_AND_PRO_CANNOT_BE_ZERO");
  }

  // Step 1: Calculate u (= mean)
  const u = Math.max(anti / (anti + pro), pro / (anti + pro));

  // Step 2: Calculate s (= standard deviation)
  const s = (anti + pro) / Math.abs(anti - pro);

  // Step 3: Generate a normal distribution in -5s to 5s range
  const distribution = [];
  const range = Array.from(
    { length: 100 },
    (_, i) => u - 5 * s + (i / 99) * 10 * s
  );

  for (let x of range) {
    const value =
      anti === pro
        ? 0
        : Math.exp(-Math.pow(x - u, 2) / (2 * Math.pow(s, 2))) /
          (Math.sqrt(2 * Math.PI) * s);
    distribution.push({ x, value });
  }

  // Step 4: Generate a normal distribution within the range [0, 1]
  const curve = [];
  const short = Array.from({ length: 100 }, (_, i) => i / 99); // Generate 100 points evenly spaced between 0 and 1

  for (let x of short) {
    const value =
      anti === pro
        ? 0
        : Math.exp(-Math.pow(x - u, 2) / (2 * Math.pow(s, 2))) /
          (Math.sqrt(2 * Math.PI) * s);
    curve.push({ x, value });
  }

  return { u, s, range, distribution, short, curve };
};
