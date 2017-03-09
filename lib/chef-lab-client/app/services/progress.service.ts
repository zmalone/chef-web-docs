import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { ReplaySubject } from 'rxjs'

@Injectable()
export class ProgressService {
  public activeUserProgress: ReplaySubject<any> = new ReplaySubject(1)

  constructor(
    private http: Http,
  ) {}

  public start(page: any) {
    return this.updateDateStamp(page, 'started_at')
  }

  public complete(page: any) {
    return this.updateDateStamp(page, 'completed_at')
  }

  public getLastStarted(section: string, module: string) {
    const data = this.getProgress(section, module)
    const incomplete = Object.keys(data).filter(key => {
      return !data[key].completed_at
    })
    const sorted = incomplete.sort((a, b) => {
      return data[a].started_at > data[b].started_at ? 1 : data[a].started_at < data[b].started_at ? -1 : 0
    })
    return data[sorted[0]] || {}
  }

  private updateDateStamp(page: any, field: string) {
    if (!page.section || !page.id) return
    const section = page.section
    const pageId = page.id
    const dataLocal = this.getProgress()

    // Build full and partial data objects
    dataLocal[section] = dataLocal[section] || {}
    dataLocal[section][pageId] = dataLocal[section][pageId] || {}
    const dataChange = {}
    dataChange[section] = {}
    dataChange[section][pageId] = {}
    dataLocal[section][pageId].url = page.url
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

  private getProgress(section?: string, item?: string) {
    const existing = localStorage.getItem('userProgressInfo')
    let data = (existing) ? JSON.parse(existing) : {}
    if (section) {
      data = data[section] || {}
      if (item) {
        const ret = {}
        Object.keys(data).forEach(key => {
          if (key.match(new RegExp('^' + item + '(\/.+)?$'))) {
            ret[key] = data[key]
          }
        })
        return ret
      }
    }
    return data
  }
}
