import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { ReplaySubject } from 'rxjs'

@Injectable()
export class ProgressService {
  public activeUserProgress: ReplaySubject<any> = new ReplaySubject(1)

  constructor(
    private http: Http,
  ) {}

  public start(pageUrl: string) {
    return this.updateDateStamp(pageUrl, 'started_at')
  }

  public complete(pageUrl: string) {
    return this.updateDateStamp(pageUrl, 'completed_at')
  }

  private updateDateStamp(pageUrl: string, field: string) {
    const { type, pageId } = this.parseUrl(pageUrl)
    const dataLocal = this.getProgress()

    // Build full and partial data objects
    dataLocal[type] = dataLocal[type] || {}
    dataLocal[type][pageId] = dataLocal[type][pageId] || {}
    const dataChange = {}
    dataChange[type] = {}
    dataChange[type][pageId] = {}
    dataLocal[type][pageId][field] = dataChange[type][pageId][field] = new Date().toISOString()

    // Update local storage with the full data object
    localStorage.setItem('userProgressInfo', JSON.stringify(dataLocal))

    // Update the server with a partial objects of changes
    const httpObservable = this.http.put(process.env.API_ENDPOINT + '/api/v1/progress', dataChange)
      .share()
    // Register all handlers to make RxJS catch exceptions, which other subscribers may need
    // See https://github.com/ReactiveX/rxjs/issues/2145
    httpObservable.subscribe(
      () => {},
      () => {
        this.activeUserProgress.next(dataLocal)
      },
      () => {
        this.activeUserProgress.next(dataLocal)
      },
    )
    return httpObservable
  }

  private parseUrl(pageUrl: string) {
    const match = pageUrl.match(/^\/?(modules|tracks)\/(.+)$/) || []
    return {
      type: match[1] || '',
      pageId: match[2] || '',
    }
  }

  private getProgress(type?: string) {
    const existing = localStorage.getItem('userProgressInfo')
    const data = (existing) ? JSON.parse(existing) : {}
    return (type) ? data[data] : data
  }
}
