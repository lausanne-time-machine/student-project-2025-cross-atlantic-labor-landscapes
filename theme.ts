import { generateColors } from '@mantine/colors-generator';
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    'space': generateColors('#2C2C54'), // space cadet
    'amaranth': generateColors('#A40E4C'), // amaranth purple 
  },
  primaryColor: 'space'
});
