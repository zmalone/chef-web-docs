import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from './http-client.service'

@Injectable()
export class ProgressService {
  public activeUserProgress: BehaviorSubject<any> = new BehaviorSubject(1)

  constructor(
    private http: HttpClient,
  ) {}

  init() {
    this.initUserProgressData()
  }

  public start(page: any) {
    return this.updateDateStamp(page, 'started_at')
  }

  public complete(page: any) {
    return this.updateDateStamp(page, 'completed_at')
  }

  public getLastStarted(section: 'modules' | 'tracks', item: string) {
    const data = this.getUserProgressData(section, item)
    const incomplete = Object.keys(data).filter(key => {
      return !data[key].completed_at
    })
    const sorted = incomplete.sort((a, b) => {
      return data[a].started_at > data[b].started_at ? 1 : data[a].started_at < data[b].started_at ? -1 : 0
    })
    return data[sorted[0]] || {}
  }

  public getProgress(section: 'modules' | 'tracks', item: string) {
    const treeData = (window as any).dataTree
    const baseData = treeData[section][item]
    if (!baseData) return 0
    const baseTimeRange = baseData.remaining || [0, 0]
    const baseTimeAvg = baseTimeRange.reduce((a, b) => { return a + b }) / baseTimeRange.length
    const userData = this.getUserProgressData(section, item)
    const complete = Object.keys(userData).filter(key => {
      return userData[key].completed_at
    })
    let userCompletedAvg = 0
    complete.forEach(module_id => {
      const completeItem = treeData['modules'][module_id]
      if (completeItem) {
        const completedTimeRange = completeItem.minutes || [0, 0]
        const completedTimeAvg = completedTimeRange.reduce((a, b) => { return a + b }) / completedTimeRange.length
        userCompletedAvg += completedTimeAvg
      }
    })

    return (baseTimeAvg) ? Math.min(100, Math.max(0, Math.round(100 * userCompletedAvg / baseTimeAvg))) : 0
  }

  private updateDateStamp(page: any, field: string) {
    if (!page.section || !page.id) return
    const section = page.section
    const pageId = page.id
    const dataLocal = this.activeUserProgress.getValue()

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

  private getUserProgressData(section?: 'modules' | 'tracks', item?: string) {
    let data = this.activeUserProgress.getValue()
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

  private initUserProgressData() {
    const existing = localStorage.getItem('userProgressInfo')
    const data = (existing) ? JSON.parse(existing) : {}
    this.activeUserProgress.next(data)
    return data
  }
}
