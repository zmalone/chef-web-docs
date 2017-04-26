import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class SegmentService {

  constructor() {
  }

  // See https://segment.com/docs/sources/website/analytics.js/ for documentation

  public identify(...args: Array<any>): Observable<any> {
    const identifyFn = Observable.bindCallback((window as any).analytics.identify)
    return identifyFn.apply(this, args)
  }

  public track(...args: Array<any>): Observable<any> {
    const trackFn = Observable.bindCallback((window as any).analytics.track)
    return trackFn.apply(this, args)
  }

  public page(...args: Array<any>): Observable<any> {
    const pageFn = Observable.bindCallback((window as any).analytics.page)
    return pageFn.apply(this, args)
  }

  public reset() {
    (window as any).analytics.reset()
  }

}
