import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, AsyncSubject } from 'rxjs'
import { ErrorHandlerService } from './error-handler.service'
import { Angular2TokenService } from 'angular2-token'

@Injectable()
export class ProgressService {
  public activeUserProgress: BehaviorSubject<any> = new BehaviorSubject(1)

  constructor(
    private errHandlerService: ErrorHandlerService,
    private _tokenService: Angular2TokenService,
  ) {
  }

  init() {
    this.initUserProgressData()
  }

  public trackCurrentPage() {
    return this.updateDateStamp('modules', (window as any).currentPage.id, 'started_at')
  }

  public complete(pageId: string) {
    const moduleId = this.getModuleRoot(pageId)
    // TODO: Refactor this. Ideally the updateDateStamp observable would be the if operator's "then"
    // argument, but this argument has to be an observable, and _tokenService.put is returning a hot
    // observable so it's too late to prevent the API call.
    return this.updateDateStamp('modules', pageId, 'completed_at')
      .concat(Observable.if(() => {
        if (!this.getNextPage(pageId)) {
          if (this.getModuleProgress(pageId) >= 100) {
            this.updateDateStamp('modules', moduleId, 'completed_at')
            return true
          }
        }
        return false
      }, Observable.of(true)))
  }

  public isComplete(section: 'modules' | 'tracks', pageId: string | void) {
    if (!pageId) return false
    const data = this.getUserProgressData(section, pageId)
    return data && data.completed_at
  }

  public getLastAccessed(section: 'modules' | 'tracks', pageId: string) {
    const data = this.getUserProgressData(section, pageId, true)
    const sorted = Object.keys(data).sort((a, b) => {
      const dateA = [data[a].started_at, data[a].completed_at].sort().reverse()[0]
      const dateB = [data[b].started_at, data[b].completed_at].sort().reverse()[0]
      return (dateA > dateB) ? -1 : 1
    })
    return data[sorted[0]] && {...{ id: sorted[0] }, ...data[sorted[0]] }
  }

  public getModuleProgress(pageId: string) {
    const moduleData = (window as any).dataTree.modules

    // Determine the active item from which to generate time estimates
    // See if the item passed is the current path, or the module root
    if (!moduleData[pageId]) return 0
    let activeItemId = pageId
    if (moduleData[pageId].parent === 'modules') {
      // Get the user's current path through this module or track
      // TODO: Consider validating the last started item to ensure it follows the last completed
      const lastAccessed = this.getLastAccessed('modules', pageId)
      if (lastAccessed) activeItemId = lastAccessed.id
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
    const userData = this.getUserProgressData('modules', moduleId, true)
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

  private getActivePathIds(activeItemId: string): Array<string> {
    const moduleData = (window as any).dataTree.modules
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

  private getChildPathIds(pageId: string): Array<string> {
    const moduleData = (window as any).dataTree.modules
    let ids = []
    if (moduleData[pageId] && moduleData[pageId].children) {
      moduleData[pageId].children.forEach((child) => {
        ids.push(child)
        ids = ids.concat(this.getChildPathIds(child))
      })
    }
    return ids
  }

  public getModuleRoot(pageId: string): string {
    const moduleData = (window as any).dataTree.modules
    let moduleRoot = moduleData[pageId]
    while (moduleRoot.parent && moduleRoot.parent !== 'modules') {
      pageId = moduleRoot.parent
      moduleRoot = moduleData[pageId]
    }
    return pageId
  }

  public getTrack(moduleId: string): string | void {
    const tracksData = (window as any).dataTree.tracks
    tracksData.tracks.children.forEach((trackId) => {
      tracksData[trackId].modules.forEach((trackModuleId) => {
        if (trackModuleId === moduleId) return trackId
      })
    })
  }

  // Should match the Ruby implementation: find_get_page() in page_helper.rb
  public getNextPage(pageId: string): string | void {
    const moduleData = (window as any).dataTree.modules
    if (!moduleData[pageId]) return
    if (moduleData[pageId].children) {
      return moduleData[pageId].children[0]
    } else if (moduleData[pageId].parent) {
      const parentId = moduleData[pageId].parent
      if (parentId === 'modules') return
      const parent = moduleData[parentId]
      const index = parent.children.indexOf(pageId)
      return parent.children[index + 1]
    }
  }

  private updateDateStamp(section: 'modules' | 'tracks', pageId: string, field: string) {
    const dataLocal = this.activeUserProgress.getValue()

    // Build full and partial data objects
    dataLocal[section] = dataLocal[section] || {}
    dataLocal[section][pageId] = dataLocal[section][pageId] || {}
    const dataChange = {}
    dataChange[section] = {}
    dataChange[section][pageId] = Object.assign({}, dataLocal[section][pageId])
    dataLocal[section][pageId][field] = dataChange[section][pageId][field] = new Date().toISOString()

    // Update local storage with the full data object
    localStorage.setItem('userProgressInfo', JSON.stringify(dataLocal))

    // Update the server with a partial objects of changes
    const httpObservable = this._tokenService.put('api/v1/progress', dataChange)

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

  private getUserProgressData(section?: 'modules' | 'tracks', pageId?: string, wildcard?: boolean) {
    let data = this.activeUserProgress.getValue()
    if (section) {
      data = data[section] || {}
      if (pageId) {
        if (wildcard) {
          const ret = {}
          Object.keys(data).forEach(key => {
            if (key.match(new RegExp('^' + pageId + '(\/.+)?$'))) {
              ret[key] = data[key]
            }
          })
          return ret
        } else {
          return data[pageId]
        }
      }
    }
    return data
  }

  private initUserProgressData() {
    return this._tokenService.get('api/v1/progress').map(res => res.json()).subscribe(
      res => {
        localStorage.setItem('userProgressInfo', res)
        this.activeUserProgress.next(res)
        this.trackCurrentPage()
      },
      error => {
        console.log('Error getting user progress from the database', error)
        const existing = localStorage.getItem('userProgressInfo')
        const data = (existing) ? JSON.parse(existing) : {}
        this.activeUserProgress.next(data)
        this.trackCurrentPage()
      },
    )
  }
}
