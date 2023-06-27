export interface Project {
    id: number,

    name: string,
    projectLead: {
        firstName: string,
        lastName: string,
        email: string,
        username: string
        profilePictureURL: string;
        id: string;
    },
    description: string,
    requiredSkills: string[],

    gitHubRepoURL: string,
    googleDriveURL: string,
    discordURL: string,
    jiraURL: string,

    dateCreated: Date,
    isAssigned: boolean,
    isInLiked: boolean
}