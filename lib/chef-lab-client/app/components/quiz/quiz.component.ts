import { Component, OnInit, Input } from '@angular/core'
import { SiteDataService } from '../../services/site-data.service'
import { ProgressService } from '../../services/progress.service'

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  public questions: Array<Object>
  public hasQuiz = false
  public submitted = false
  public complete = false
  public answers: Array<string> = []
  public correctAnswers: Array<string> = []
  public submittedAnswers: Array<string> = []
  public numCorrect = 0
  public isUnitComplete = false
  public isModuleComplete = false
  public isTrackComplete = false
  public showSpecialCoaster = false
  public specialCoaster: string
  public trackCoaster: string

  constructor(
    private siteDataService: SiteDataService,
    private progressService: ProgressService,
  ) {}

  ngOnInit() {
    this.questions = this.siteDataService.currentPage().quiz || []
    this.correctAnswers = this.questions.map((question: any) => {
      return String(question.answer)
    })
    this.hasQuiz = (this.questions.length > 0)
    const enableSpecialCoaster = !localStorage.getItem('shownSpecialCoaster')

    this.progressService.activeUserProgress.subscribe(() => {
      const coasters = this.siteDataService.coasters()
      const moduleId = this.progressService.getModuleRoot(this.siteDataService.currentPage().id)
      const trackId = this.progressService.getTracksByModule(moduleId)[0]
      this.isUnitComplete = !!this.progressService.isComplete('units', this.siteDataService.currentPage().id)
      this.isModuleComplete = !!this.progressService.isComplete('modules', moduleId)
      this.isTrackComplete = !!this.progressService.isComplete('tracks', trackId)
      this.showSpecialCoaster = this.progressService.getAchievements('grand-opening') &&
          enableSpecialCoaster && !this.isTrackComplete
      if (this.showSpecialCoaster) localStorage.setItem('shownSpecialCoaster', 'true')

      // Complete the quiz if this unit is complete (and the user refreshes or returns to this page)
      if (this.isUnitComplete) {
        this.answers = this.correctAnswers.concat()
        this.processSubmission()
      }

      // Get coaster images from global coasters data
      this.specialCoaster = coasters.filter(coaster => { return coaster.id === 'grand-opening' })[0]
      this.trackCoaster = coasters.filter(coaster => { return coaster.id === trackId })[0]

    }, console.error)
  }

  public onSubmit() {
    if (this.processSubmission()) {
      this.progressService.completePage(this.siteDataService.currentPage().id).subscribe()
    }
  }

  private processSubmission() {
    this.submittedAnswers = this.answers.concat()
    if (this.submittedAnswers.length === 0) return
    this.submitted = true
    const correct = this.correctAnswers
    this.numCorrect = this.answers.reduce((sum, answer, index) => {
      return (correct[index] === answer) ? sum + 1 : sum
    }, 0)
    return this.complete = (this.numCorrect >= this.questions.length)
  }
}
