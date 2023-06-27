export interface UpdateProfileRequest {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    skills: string[] | null;
    discordURL: string | null;
    gitHubURL: string | null;
}