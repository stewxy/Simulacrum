import { Project } from "../Project"
import { Skill } from "../Skill"

export interface ProfileResponse {
    firstName: string,
    lastName: string,
    email: string,
    profilePicFileURL: string,

    skills: Skill[]

    gitHubURL: string,
    discordURL: string,

    assignedProjects: Project[],
    createdProjects: Project[]
}