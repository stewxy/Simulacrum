import { ProjectSkill } from "../ProjectSkill";

export interface CreateProjectRequest {
    projectName: string,
    description: string,
    desiredSkills: ProjectSkill[],

    gitHubRepoURL: string,
    googleDriveURL: string,
    discordURL: string,
    jiraURL: string
}