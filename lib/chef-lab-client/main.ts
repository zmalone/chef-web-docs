import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { AppModule} from './app/app.module'

if (process.env.NODE_ENV === 'production') {
  enableProdMode()
}

try {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(function (e) {
    console.error(e)
  })
} catch (e) {
  // TODO: Log these (and other) errors somewhere.
  // With progressive enhancement of an HTML site, if Angular were to quietly fail it would still
  // allow a user to go through the content, but it would not track the user's progress.
  console.log('Bootstrap error', e)
  // Fallback to static HTML page without Angular enhancements
  const appRoot = window.document.getElementsByTagName('app-root')
  appRoot[0].innerHTML = (window as any).mainTemplate
}
