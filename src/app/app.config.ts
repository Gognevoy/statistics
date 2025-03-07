import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideStore } from '@ngrx/store';
import { dataReducer } from './store/data.reducer';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideStore({ dataState: dataReducer }),
    provideHttpClient(),
    providePrimeNG({
      theme: { preset: Aura },
    }),
  ]
};
