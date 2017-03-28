import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, AsyncSubject } from 'rxjs'
import { UserProfileService } from './user-profile.service'
import { Angular2TokenService } from 'angular2-token'
type LearningType = 'achievements' | 'tracks' | 'modules' | 'units'

@Injectable()
export class ProgressService {
  public activeUserProgress: BehaviorSubject<any> = new BehaviorSubject({})
  private isAuthenticated = false
  private wasAnonymous = false

  constructor(
    private userProfileService: UserProfileService,
    private _tokenService: Angular2TokenService,
  ) {
  }

  init() {
    this.userProfileService.isAuthenticated().subscribe((next) => {
      this.isAuthenticated = next
      if (!this.isAuthenticated) {
        this.wasAnonymous = true
      }
      this.initUserProgressData()
    })
  }

  public startCurrentPage() {
    return this.updateField('units', (window as any).currentPage.id, { 'started_at': new Date().toISOString() })
  }

  public complete(pageId: string) {
    return this.updateField('units', pageId, { 'completed_at': new Date().toISOString() })
      .concat(
        this.completeModule(pageId),
        this.completeTrack(pageId),
        this.awardAchievements(),
      )
  }

  public getAchievements(id?: string) {
    const data = this.getUserProgressData('achievements') || {}
    if (id) return data[id]
    return data
  }

  private completeModule(pageId: string) {
    const moduleId = this.getModuleRoot(pageId)
    const currentState = this.getUserProgressData('modules', moduleId) || {}
    const newData = {}
    if (!currentState.started_at) newData['started_at'] = new Date().toISOString()
    if (!currentState.completed_at && !this.getNextPage(pageId)) {
      if (this.getModuleProgress(pageId) >= 100) {
        newData['completed_at'] = new Date().toISOString()
      }
    }
    if (newData) return this.updateField('modules', moduleId, newData)
    return Observable.from([])
  }

  private completeTrack(pageId: string) {
    const moduleId = this.getModuleRoot(pageId)
    const trackId = this.getTrack(moduleId)
    if (trackId) {
      const currentState = this.getUserProgressData('tracks', trackId) || {}
      const newData = {}
      if (!currentState.started_at) newData['started_at'] = new Date().toISOString()
      if (!currentState.completed_at) {
        const trackData = (window as any).dataTree.tracks[trackId]
        const modules = trackData && trackData.modules || {}
        const complete = Object.keys(modules).filter(module => {
          return this.getUserProgressData('modules', module).completed_at
        })
        if (complete.length === Object.keys(modules).length) {
          newData['completed_at'] = new Date().toISOString()
        }
      }
      if (newData) return this.updateField('modules', moduleId, newData)
    }
    return Observable.from([])
  }

  private awardAchievements() {
    const modulesData = this.getUserProgressData('modules')
    const achievementsData = this.getUserProgressData('achievements')

    // // If any modules have been completed, grant the special edition "grand opening" coaster
    if (Object.keys(modulesData).filter((id) => { return modulesData[id].completed_at }).length > 0) {
      if (Object.keys(achievementsData).filter((id) => { return id === 'grand-opening' }).length === 0) {
        return this.updateField('achievements', 'grand-opening', {
          'achievement_type': 'standard',
          'earned_at': new Date().toISOString(),
        })
      }
    }
    return Observable.from([])
  }

  public isComplete(section: LearningType, pageId: string | void) {
    if (!pageId) return false
    const data = this.getUserProgressData(section, pageId)
    return data && data.completed_at
  }

  public getLastAccessed(section: LearningType, pageId: string) {
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
      while (parent && parent !== 'modules') {
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
    const userData = this.getUserProgressData('units', moduleId, true)
    const complete = Object.keys(userData).filter(key => {
      return userData[key].completed_at
    })
    let userCompletedAvg = 0
    const activePathIdsCompleted = complete.filter(completeId => {
      const inPath = activePathIds.indexOf(completeId) > -1
      if (inPath) {
        const completeItem = moduleData[completeId]
        if (completeItem) {
          const completedTimeRange = completeItem.minutes || [0, 0]
          const completedTimeAvg = completedTimeRange.reduce((a, b) => { return a + b }) / completedTimeRange.length
          userCompletedAvg += completedTimeAvg
        }
      }
      return inPath
    })

    // If there isn't any base time, we'll figure progress by number of units completed
    if (baseTimeAvg) {
      return Math.min(100, Math.max(0, Math.round(100 * userCompletedAvg / baseTimeAvg)))
    } else {
      return Math.min(100, Math.max(0, Math.round(100 * activePathIdsCompleted.length / activePathIds.length)))
    }
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
      while (parent && parent !== 'modules') {
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

  private updateField(section: LearningType, pageId: string, fieldValues: object) {
    const dataLocal = this.activeUserProgress.getValue()

    // Build full and partial data objects
    dataLocal[section] = dataLocal[section] || {}
    dataLocal[section][pageId] = dataLocal[section][pageId] || {}
    const dataChange = {}
    dataChange[section] = {}
    dataChange[section][pageId] = Object.assign({}, dataLocal[section][pageId])
    Object.assign(dataChange[section][pageId], fieldValues)
    Object.assign(dataLocal[section][pageId], fieldValues)

    // Update local storage with the full data object
    localStorage.setItem('userProgressInfo', JSON.stringify(dataLocal))

    // If not logged in, skip the API call
    if (!this.isAuthenticated) {
      this.activeUserProgress.next(dataLocal)
      return Observable.from([])
    }

    // Update the server with a partial objects of changes
    const httpObservable = this._tokenService.put('api/v1/progress', dataChange).share()

    // Register all handlers to make RxJS catch exceptions, which other subscribers may need
    // See https://github.com/ReactiveX/rxjs/issues/2145
    httpObservable.subscribe(
      () => {},
      res => {
        // TODO: Revisit and refine this behavior, but ensure that a user who's logged out
        // as far as the server is concerned doesn't stay "logged in" on the client.
        if (res.status === 401) {
          this.userProfileService.signOut()
        }
        this.activeUserProgress.next(dataLocal)
      },
      () => {
        this.activeUserProgress.next(dataLocal)
      },
    )

    return httpObservable
  }

  private getUserProgressData(section?: LearningType, pageId?: string, wildcard?: boolean) {
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
    let existing = localStorage.getItem('userProgressInfo')
    existing = (existing) ? JSON.parse(existing) : {}

    if (!this.isAuthenticated) {
      this.activeUserProgress.next(existing)
      this.startCurrentPage()
      return Observable.from([])
    }

    // Transfer all local progress to the server
    if (this.wasAnonymous) {
      Object.keys(existing).forEach(section => {
        Object.keys(existing[section]).forEach(id => {
          this.updateField(section as LearningType, id, existing[section][id])
        })
      })
      this.wasAnonymous = false
    }

    return this._tokenService.get('api/v1/progress').map(res => res.json()).subscribe(
      res => {
        localStorage.setItem('userProgressInfo', res)
        this.activeUserProgress.next(res)
        this.startCurrentPage()
      },
      error => {
        console.log('Error getting user progress from the database', error)
        this.activeUserProgress.next(existing)
        this.startCurrentPage()
      },
    )
  }
}
