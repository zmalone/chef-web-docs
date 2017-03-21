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
      return (data[a].started_at > data[b].started_at) ? -1 : 1
    })
    return (data[sorted[0]]) ? {...{ id: sorted[0] }, ...data[sorted[0]] } : {}
  }

  public getLastAccessed(section: 'modules' | 'tracks', item: string) {
    const data = this.getUserProgressData(section, item)
    const sorted = Object.keys(data).sort((a, b) => {
      const dateA = [data[a].started_at, data[a].completed_at].sort().reverse()[0]
      const dateB = [data[b].started_at, data[b].completed_at].sort().reverse()[0]
      return (dateA > dateB) ? -1 : 1
    })
    return (data[sorted[0]]) ? {...{ id: sorted[0] }, ...data[sorted[0]] } : {}
  }

  public getLastCompleted(section: 'modules' | 'tracks', item: string) {
    const data = this.getUserProgressData(section, item)
    const complete = Object.keys(data).filter(key => {
      return data[key].completed_at
    })
    const sorted = complete.sort((a, b) => {
      return (data[a].completed_at > data[b].completed_at) ? -1 : 1
    })
    return (data[sorted[0]]) ? {...{ id: sorted[0] }, ...data[sorted[0]] } : {}
  }

  public getModuleProgress(pageId: string) {
    const moduleData = (window as any).dataTree['modules']

    // Determine the active item from which to generate time estimates
    // See if the item passed is the current path, or the module root
    if (!moduleData[pageId]) return 0
    let activeItemId = pageId
    if (moduleData[pageId].parent === 'modules') {
      // Get the user's current path through this module or track
      // TODO: Consider validating the last started item to ensure it follows the last completed
      const lastAccessed = this.getLastAccessed('modules', pageId)
      if (lastAccessed.id) activeItemId = lastAccessed.id
    }

    // Get all the module IDs within the active path (parents, siblings, and children)
    const activePathIds = this.getActivePathIds(activeItemId)

    // Get the base time for the current path
    const currentPageData = moduleData[activeItemId]
    if (!currentPageData) return 0
    const baseTimeRange = [0, 0]

    // Use the parent of the current item for finding children and siblings, unless the parent is a multipage
    let parent = currentPageData.parent
    const childRoot = (parent && !moduleData[parent].is_fork) ? parent : activeItemId
    if (moduleData[childRoot].remaining) {
      baseTimeRange[0] += moduleData[childRoot].remaining[0]
      baseTimeRange[1] += moduleData[childRoot].remaining[1]
    }

    // Add parent path time
    if (moduleData[childRoot] && moduleData[childRoot].parent) {
      parent = moduleData[childRoot].parent
      while (parent) {
        const parentData = moduleData[parent]
        if (parentData.minutes) {
          baseTimeRange[0] += parentData.minutes[0]
          baseTimeRange[1] += parentData.minutes[1]
        }
        parent = parentData.parent
      }
    }

    const baseTimeAvg = baseTimeRange.reduce((a, b) => { return a + b }) / baseTimeRange.length

    // Add up the the user's time completed for the current path
    const moduleId = this.getModuleRoot(pageId)
    const userData = this.getUserProgressData('modules', moduleId)
    const complete = Object.keys(userData).filter(key => {
      return userData[key].completed_at
    })
    let userCompletedAvg = 0
    complete.forEach(completeId => {
      if (activePathIds.indexOf(completeId) > -1) {
        const completeItem = moduleData[completeId]
        if (completeItem) {
          const completedTimeRange = completeItem.minutes || [0, 0]
          const completedTimeAvg = completedTimeRange.reduce((a, b) => { return a + b }) / completedTimeRange.length
          userCompletedAvg += completedTimeAvg
        }
      }
    })

    return (baseTimeAvg) ? Math.min(100, Math.max(0, Math.round(100 * userCompletedAvg / baseTimeAvg))) : 0
  }

  private getActivePathIds(activeItemId) {
    const moduleData = (window as any).dataTree['modules']
    let ids = []
    if (!moduleData[activeItemId]) return ids

    // Use the parent of the current item for finding children and siblings, unless the parent is a multipage
    let parent = moduleData[activeItemId].parent
    const childRoot = (parent && !moduleData[parent].is_fork) ? parent : activeItemId
    ids.unshift(childRoot)

    // Add parent path IDs
    if (moduleData[childRoot] && moduleData[childRoot].parent) {
      parent = moduleData[childRoot].parent
      while (parent) {
        ids.unshift(parent)
        parent = moduleData[parent].parent
      }
    }

    // Add sibling and child items
    ids = ids.concat(this.getChildPathIds(childRoot))
    return ids
  }

  private getChildPathIds(activeItemId) {
    const moduleData = (window as any).dataTree['modules']
    let ids = []
    if (moduleData[activeItemId] && moduleData[activeItemId].children) {
      moduleData[activeItemId].children.forEach((child) => {
        ids.push(child)
        ids = ids.concat(this.getChildPathIds(child))
      })
    }
    return ids
  }

  private getModuleRoot(pageId) {
    const moduleData = (window as any).dataTree['modules']
    let moduleRoot = moduleData[pageId]
    while (moduleRoot.parent && moduleRoot.parent !== 'modules') {
      pageId = moduleRoot.parent
      moduleRoot = moduleData[pageId]
    }
    return pageId
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
