import { Component, OnInit, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  public questions: Array<Object>
  public submitted = false
  public answers: Array<number> = []
  public correctAnswers: Array<number> = []
  public submittedAnswers: Array<number> = []
  public numCorrect = 0
  public isUnitComplete = false
  public isModuleComplete = false
  public isTrackComplete = false
  public showSpecialCoaster = false

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe(() => {
      const moduleId = this.progressService.getModuleRoot((window as any).currentPage.id)
      const trackId = this.progressService.getTrack(moduleId)
      this.isUnitComplete = !!this.progressService.isComplete('units', (window as any).currentPage.id)
      this.isModuleComplete = !!this.progressService.isComplete('modules', moduleId)
      this.isTrackComplete = !!this.progressService.isComplete('tracks', trackId)
      this.showSpecialCoaster = this.progressService.getAchievements('grand-opening') && !localStorage.getItem('shownSpecialCoaster')
      if (this.showSpecialCoaster) localStorage.setItem('shownSpecialCoaster', 'true')
    }, console.error)

    this.questions = (window as any).currentPage.quiz || []
    this.correctAnswers = this.questions.map((question: any) => {
      return question.answer
    })
  }

  public onSubmit() {
    this.submittedAnswers = this.answers.concat()
    if (this.submittedAnswers.length === 0) return
    this.submitted = true
    const correct = this.correctAnswers
    this.numCorrect = this.answers.reduce((sum, answer, index) => {
      return (correct[index] === Number(answer)) ? sum + 1 : sum
    }, 0)
    if (this.numCorrect >= this.questions.length) {
      this.progressService.completePage((window as any).currentPage.id).subscribe()
    }
  }
}
