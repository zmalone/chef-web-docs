import { Component, OnChanges, Input } from '@angular/core'
import { SiteDataService } from '../../services/site-data.service'

@Component({
  selector: 'social-share',
  templateUrl: './social-share.component.html',
})
export class SocialShareComponent implements OnChanges {
  private sharerUrls = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?',
    twitter: 'https://twitter.com/intent/tweet?',
    google: 'https://plus.google.com/share?',
    linkedin: 'https://www.linkedin.com/shareArticle?mini=true',
  }
  public facebookURL: string
  public googleURL: string
  public twitterURL: string
  public linkedinURL: string

  @Input()
  url: string

  @Input()
  socialData: any

  constructor(
    private siteDataService: SiteDataService,
  ) {}

  ngOnChanges() {
    const socialData = this.socialData || this.siteDataService.currentPage().socialShare
    const url = decodeURIComponent(this.siteDataService.baseUrl() + this.url)
    this.facebookURL = this.sharerUrls['facebook'] + 'u=' + url
    this.googleURL = this.sharerUrls['google'] + 'url=' + url
    this.twitterURL = this.sharerUrls['twitter'] + 'text=' +
      socialData['tweet_text'] + '&url=' + url
    this.linkedinURL = this.sharerUrls['linkedin'] + '&title=' + socialData['linkedin_title'] +
      '&summary=' + socialData['linkedin_summary'] + '&url=' + url
  }
}
