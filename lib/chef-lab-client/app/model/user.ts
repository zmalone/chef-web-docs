export class User {
  constructor(
    public first_name: string,
    public last_name: string,
    public display_name: string,
    public email: string,
    public nickname: string,
    public role: string,
    public company: string,
    public created_at: string,
    public share_profile: boolean
  ) {
  }
}
