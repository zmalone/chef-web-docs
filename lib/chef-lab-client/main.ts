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
  // Fallback to static HTML page without Angular enhancements
  // With progressive enhancement of an HTML site, if Angular were to quietly fail it would still
  // allow a user to go through the content, but it would not track the user's progress.
  console.error('Error bootstrapping Angular', e)
  const appRoot = window.document.getElementsByTagName('app-root')
  appRoot[0].innerHTML = (window as any).mainTemplate
}
