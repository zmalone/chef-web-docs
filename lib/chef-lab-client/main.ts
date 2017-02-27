import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule} from './app/app.module';

if (environment.production) {
  enableProdMode();
}

try {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(function (e) {
    console.error(e);
  });
} catch (e) {
  console.log('Bootstrap error', e);
  // Fallback to static HTML page without Angular enhancements
  const appRoot = window.document.getElementsByTagName('app-root');
  appRoot[0].innerHTML = (window as any).mainTemplate;
}
