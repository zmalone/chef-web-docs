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

}
