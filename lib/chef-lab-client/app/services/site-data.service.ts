import { Injectable } from '@angular/core'

@Injectable()
export class SiteDataService {

  constructor() {
  }

  public currentPage(): any {
    return (window as any).currentPage
  }

  public dataTree(): any {
    return (window as any).dataTree
  }

  public coasters(): any {
    return (window as any).coasters
  }

  public baseUrl(): string {
    const loc = window.location
    const baseUrl = (loc.origin) ? loc.origin : loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '')
    return baseUrl
  }
}
