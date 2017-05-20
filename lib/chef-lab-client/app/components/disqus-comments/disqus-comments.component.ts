import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'disqus-comments',
  template: '<div></div>',
})
export class DisqusCommentsComponent implements OnInit {
  constructor(
      private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.match(/(comment|post)-[0-9]+/)) {
          setTimeout(() => {
            document.getElementById('disqus_thread').style.display = ''
          })
        }
      }
    })
  }

}
