import { Skill } from "../Skill";

export interface UpdateProfileComponentProps {
    firstName: string;
    lastName: string;
    email: string;
    userProfilePic: string;
    interestTags: Skill[];
    gitHubURL: string;
    discordURL: string;
}