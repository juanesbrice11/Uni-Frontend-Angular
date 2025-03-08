import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from './app/services/auth.service'
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, Edit, Trash2 } from 'lucide-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(AuthService) ,
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ Edit, Trash2 }))
  ]
}).catch(err => console.error(err));
