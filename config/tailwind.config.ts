import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      heading: 'Montserrat',
      body: 'Montserrat',
      default: ['Montserrat', 'sans-serif'],
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    extend: {
      // 500 and 400 are overprinted with the same color for light and dark themes
      colors: {
        'my-primary': { ...colors.purple, '500': '#9C4EE6', '400': '#9C4EE6', DEFAULT: '#9C4EE6' },
        'my-secondary': { ...colors.violet, '500': '#8558ED', '400': '#8558ED', DEFAULT: '#8558ED' },
        'my-accent': { ...colors.blue, '500': '#3473D9', '400': '#3473D9', DEFAULT: '#3473D9' },
        'my-gray': { ...colors.slate, DEFAULT: colors.slate[500] },
        'my-surface-dark': '#0F172A',
        red: { ...colors.red, '500': '#B91C1C', '400': '#B91C1C', DEFAULT: '#B91C1C' },
        green: { ...colors.green, '500': '#15803D', '400': '#15803D', DEFAULT: '#15803D' },
        orange: { ...colors.orange, '500': '#C2410C', '400': '#C2410C', DEFAULT: '#C2410C' },
      },
    },
  },
}
