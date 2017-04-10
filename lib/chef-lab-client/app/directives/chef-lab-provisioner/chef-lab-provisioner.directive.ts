import { Directive, ElementRef, Input, HostListener, Renderer } from '@angular/core'
import { URLSearchParams } from '@angular/http'

declare const jQuery: any

@Directive({
  selector: '.chef-lab-provisioner',

})
export class ChefLabProvisionerDirective {
  @Input()
  force: boolean

  @Input()
  provisioner: string

  @Input()
  type: string

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
  ) {}

  @HostListener('click', ['$event'])
  clicked(e) {
    e.preventDefault()

    if (this.force) {
      jQuery('#skytap-modal').foundation('reveal', 'close')

      const urlFor = (type, id) => {
        const chefLabUrl = process.env.CHEF_LAB_URL || 'http://localhost:3000'
        let url = chefLabUrl + '/labs/' + type.replace(/-/g, '/')
        const params = new URLSearchParams()
        params.set('uid', id)
        url += '/provision' + (id ? '?' + params.toString() : '')
        return url
      }

      if (this.provisioner === 'skytap') {
        (window as any).open(urlFor(this.type, this.visitor().id), '_blank')
      }
    } else {
      jQuery('#skytap-modal').foundation('reveal', 'open')
    }
  }

  visitor(v?) {
    if (v) {
      localStorage.setItem('visitor', JSON.stringify(v))
    } else {
      v = JSON.parse(localStorage.getItem('visitor')) || {
        id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16|0, v = c === 'x' ? r : (r&0x3|0x8) // tslint:disable-line
          return v.toString(16)
        }),
        prefs: {
          suppressSkytapModal: false,
        },
      }
    }
    return v
  }

}
