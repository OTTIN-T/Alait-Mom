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
      colors: {
        'my-primary': { ...colors.purple, DEFAULT: colors.purple[500] },
        'my-secondary': { ...colors.violet, DEFAULT: colors.violet[500] },
        'my-accent': { ...colors.blue, DEFAULT: colors.blue[500] },
        'my-gray': { ...colors.slate, DEFAULT: colors.slate[500] },
      },
    },
  },
}
