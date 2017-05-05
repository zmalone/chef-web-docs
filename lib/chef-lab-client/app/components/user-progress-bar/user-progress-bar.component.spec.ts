/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { UserProgressBarComponent } from './user-progress-bar.component'
import { SiteDataService } from '../../services/site-data.service'
import { ProgressService } from '../../services/progress.service'
import { UserProfileService } from '../../services/user-profile.service'
import { SegmentService } from '../../services/segment.service'
import { Angular2TokenService } from 'angular2-token'
import MockAngular2TokenService from '../../../mock/MockAngular2TokenService'
import MockSiteDataService from '../../../mock/MockSiteDataService'
import MockSegmentService from '../../../mock/MockSegmentService'

describe('UserProgressBarComponent', () => {

  let component: UserProgressBarComponent
  let fixture: ComponentFixture<UserProgressBarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProgressBarComponent ],
      providers: [
        ProgressService,
        UserProfileService,
        { provide: Angular2TokenService, useClass: MockAngular2TokenService },
        { provide: SiteDataService, useClass: MockSiteDataService },
        { provide: SegmentService, useClass: MockSegmentService },
      ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProgressBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
