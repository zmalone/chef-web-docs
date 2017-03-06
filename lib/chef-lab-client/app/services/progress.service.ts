import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { ReplaySubject } from 'rxjs'

@Injectable()
export class ProgressService {
  public activeUserProgress: ReplaySubject<any> = new ReplaySubject(1)

  constructor(
    private http: Http,
  ) {}

  public start(section: string, pageId: string) {
    return this.updateDateStamp(section, pageId, 'started_at')
  }

  public complete(section: string, pageId: string) {
    return this.updateDateStamp(section, pageId, 'completed_at')
  }

  private updateDateStamp(section: string, pageId: string, field: string) {
    if (!section) return
    const dataLocal = this.getProgress()

    // Build full and partial data objects
    dataLocal[section] = dataLocal[section] || {}
    dataLocal[section][pageId] = dataLocal[section][pageId] || {}
    const dataChange = {}
    dataChange[section] = {}
    dataChange[section][pageId] = {}
    dataLocal[section][pageId][field] = dataChange[section][pageId][field] = new Date().toISOString()

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

  private getProgress(section?: string) {
    const existing = localStorage.getItem('userProgressInfo')
    const data = (existing) ? JSON.parse(existing) : {}
    return (section) ? data[data] : data
  }
}
