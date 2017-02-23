import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: (window as any).mainTemplate || '<div>No template found for app-root!</div>',
})
export class AppComponent {
}
