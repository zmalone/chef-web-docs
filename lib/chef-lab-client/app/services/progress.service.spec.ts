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
    // spyOn(dispatcher, "emit")
    progressService = ps
  }))

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
})
