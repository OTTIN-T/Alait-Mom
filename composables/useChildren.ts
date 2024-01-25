interface UseChildren {
  formatWeight: (weight: number) => number
  formartSize: (size: number) => number
}

export const useChildren = (): UseChildren => {
  function formatWeight(weight: number): number {
    if (weight.toString().includes('.') || weight.toString().includes(',')) {
      return weight
    }
    if (weight < 1000) {
      return weight / 100
    }
    return weight / 1000
  }

  function formartSize(size: number): number {
    if (size.toString().includes(',')) {
      return Math.floor(parseFloat(size.toString().replaceAll(',', '.')))
    }
    return Math.floor(parseFloat(size.toString()))
  }
  return {
    formatWeight,
    formartSize,
  }
}
