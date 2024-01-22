export default defineAppConfig({
  ui: {
    primary: 'my-primary',
    gray: 'my-gray',
    secondary: 'my-secondary',
    accent: 'my-accent',
    button: {
      variant: {
        solid: 'dark:text-white hover:dark:bg-my-secondary hover:bg-my-secondary',
        soft: 'hover:dark:text-white hover:text-black',
      },
      size: {
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
      },
    },
    table: {
      td: {
        color: 'text-black dark:text-white',
      },
    },
  },
})
