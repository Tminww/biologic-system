import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primevue/themes/aura';

 theme: {
        
    }

const preset = definePreset(Aura, {
  semantic: {
    primary: palette('{blue}'), 
    surface: palette('{viva}')  
  }
})

export const primeTheme = {
      preset: preset,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',
            cssLayer: false
        }};
