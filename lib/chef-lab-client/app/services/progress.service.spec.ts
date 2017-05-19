import { inject, async, TestBed } from '@angular/core/testing'

import { SiteDataService } from './site-data.service'
import { ProgressService } from './progress.service'
import { UserProfileService } from './user-profile.service'
import { SegmentService } from './segment.service'
import { Angular2TokenService } from 'angular2-token'
import MockAngular2TokenService from '../../mock/MockAngular2TokenService'
import MockSiteDataService from '../../mock/MockSiteDataService'
import MockSegmentService from '../../mock/MockSegmentService'

let progressService: ProgressService
let updateFieldSpy: any

describe('ProgressService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressService,
        UserProfileService,
        { provide: Angular2TokenService, useClass: MockAngular2TokenService },
        { provide: SiteDataService, useClass: MockSiteDataService },
        { provide: SegmentService, useClass: MockSegmentService },
      ],
    })
  }))

  beforeEach(inject([ ProgressService ], ps => {
    updateFieldSpy = spyOn(ps, 'updateField').and.callThrough()
    progressService = ps
    progressService.init()
  }))

  beforeEach(() => {
    let store = {}

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      // Assert that userProgressInfo was set as base64 encoded JSON
      if (key === 'userProgressInfo' && store[key]) {
        expect(JSON.parse(atob(store[key]))).toEqual(jasmine.any(Object))
      }
      return store[key]
    })
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      // Assert that userProgressInfo is set as base64 encoded JSON
      if (key === 'userProgressInfo') {
        expect(JSON.parse(atob(value))).toEqual(jasmine.any(Object))
      }
      return store[key] = value + ''
    })
    spyOn(localStorage, 'clear').and.callFake(function () {
      store = {}
    })
  })

  describe('getLearningType()', () => {
    it('should not return anything for the modules landing page', () => {
      expect(progressService.getLearningType('modules')).toBeFalsy()
    })

    it('should not return anything for the tracks landing page', () => {
      expect(progressService.getLearningType('tracks')).toBeFalsy()
    })

    it('should not return anything for unknown pages', () => {
      expect(progressService.getLearningType('foobar')).toBeFalsy()
    })

    it('should return "tracks" for a track page', () => {
      expect(progressService.getLearningType('infrastructure-automation')).toBe('tracks')
    })

    it('should return "modules" for a module page', () => {
      expect(progressService.getLearningType('manage-a-node')).toBe('modules')
    })

    it('should return "units" for a unit page', () => {
      expect(progressService.getLearningType('manage-a-node/rhel')).toBe('units')
    })
  })

  describe('init()', () => {
    it('should set initialize tracking for the current page', () => {
      progressService.init()
      // A module root page should be tracked as a module and as a unit
      expect(updateFieldSpy.calls.all()[0].args[0]).toBe('modules')
      expect(updateFieldSpy.calls.all()[0].args[1]).toBe('learn-the-basics')
      expect(Object.keys(updateFieldSpy.calls.all()[0].args[2])).toContain('started_at')
      expect(updateFieldSpy.calls.all()[1].args[0]).toBe('units')
      expect(updateFieldSpy.calls.all()[1].args[1]).toBe('learn-the-basics')
      expect(Object.keys(updateFieldSpy.calls.all()[1].args[2])).toContain('started_at')
      expect(localStorage.getItem).toHaveBeenCalled()
      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })

  describe('startPage()', () => {
    it('should set the started_at property for a track', () => {
      progressService.startPage('infrastructure-automation')
      expect(updateFieldSpy.calls.mostRecent().args[0]).toBe('tracks')
      expect(updateFieldSpy.calls.mostRecent().args[1]).toBe('infrastructure-automation')
      expect(Object.keys(updateFieldSpy.calls.mostRecent().args[2])).toContain('started_at')
      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })

  describe('isStarted()', () => {
    it('should verify that the current page has been started', () => {
      // progressService.init()
      expect(progressService.isStarted('modules', 'learn-the-basics')).toBe(true)
    })

    it('should verify that an invalid page has not been started', () => {
      // progressService.init()
      expect(progressService.isStarted('modules', 'foo-bar')).toBe(false)
    })
  })

  describe('completePage()', () => {
    it('should complete a unit page', () => {
      // progressService.init()
      expect(progressService.isComplete('units', 'learn-the-basics/rhel')).toBe(false)
      progressService.startPage('learn-the-basics/rhel')
      progressService.completePage('learn-the-basics/rhel').subscribe()
      expect(progressService.isComplete('units', 'learn-the-basics/rhel')).toBe(true)

      // The data should persist when reloading the page
      progressService.init()
      expect(progressService.isComplete('units', 'learn-the-basics/rhel')).toBe(true)
    })

    it('should award achievements when completing a track with one module of one unit', () => {
      expect(progressService.isComplete('units', 'getting-started-with-lcr')).toBe(false)
      expect(progressService.isComplete('modules', 'getting-started-with-lcr')).toBe(false)
      expect(progressService.isComplete('tracks', 'getting-started')).toBe(false)
      progressService.completePage('getting-started-with-lcr').subscribe()
      expect(progressService.isComplete('units', 'getting-started-with-lcr')).toBe(true)
      expect(progressService.isComplete('modules', 'getting-started-with-lcr')).toBe(true)
      expect(progressService.isComplete('tracks', 'getting-started')).toBe(true)
      const achievements = progressService.getAchievements()
      expect(Object.keys(achievements)).toEqual(['grand-opening', 'getting-started'])
    })

    it('should not allow anonymous users to track progress after a certain point', () => {
      expect(progressService.isComplete('tracks', 'getting-started')).toBe(false)
      expect(progressService.isComplete('modules', 'beyond-essentials')).toBe(false)
      expect(progressService.isComplete('tracks', 'beyond-essentials-track')).toBe(false)

      // Complete the getting started track
      progressService.completePage('getting-started-with-lcr').subscribe()
      expect(progressService.isComplete('tracks', 'getting-started')).toBe(true)

      // Start working another track
      progressService.completePage('beyond-essentials').subscribe()
      progressService.completePage('beyond-essentials/beyond-essentials-1').subscribe()
      progressService.completePage('beyond-essentials/beyond-essentials-2').subscribe()
      progressService.completePage('beyond-essentials/beyond-essentials-3').subscribe()
      expect(progressService.isComplete('units', 'beyond-essentials')).toBe(true)
      expect(progressService.isComplete('modules', 'beyond-essentials')).toBe(false)
      expect(progressService.isComplete('tracks', 'beyond-essentials-track')).toBe(false)

      // Complete the track
      progressService.completePage('beyond-essentials/beyond-essentials-4').subscribe()
      expect(progressService.isComplete('modules', 'beyond-essentials')).toBe(true)
      expect(progressService.isComplete('tracks', 'beyond-essentials-track')).toBe(true)

      // Attempt to complete another page
      progressService.completePage('be-a-secure-chef').subscribe()
      expect(progressService.isComplete('units', 'be-a-secure-chef')).toBe(false)
    })
  })
})
