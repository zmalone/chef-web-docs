export class Achievement {
  constructor(
    public achievement_type: string,
    public earned_at: string,
    public related_name: string,
  ) {
  }
}
