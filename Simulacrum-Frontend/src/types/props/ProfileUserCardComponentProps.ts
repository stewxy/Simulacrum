import { Skill } from "../Skill";

export interface ProfileUserCardComponentProps {
    firstName: string;
    lastName: string;
    userProfilePic: string;
    projectsJoined: number;
    ownProfile: boolean;
    projectsCreated: number;
    interestTags: Skill[];
    githubURL: string;
    discordURL: string;
    emailURL: string;
}