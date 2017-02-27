import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule} from './app/app.module';

if (process.env.NODE_ENV === 'production') {
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
