export const factorial = (n: number): number => {
  if (n < 0 || n % 1 !== 0) {
    throw new Error(`Invalid value n = ${n} for computing n!`)
  } else {
    let product = 1

    for (let i = 1; i <= n; i++) {
      product *= i
    }

    return product
  }
}

export const binomial = (n: number, k: number): number =>
  factorial(n) / (factorial(k) * factorial(n - k))
