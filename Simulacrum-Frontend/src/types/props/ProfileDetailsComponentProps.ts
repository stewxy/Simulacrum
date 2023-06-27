import { Project } from "../Project";

export interface ProfileDetailsComponentProps {
    DetailName: string;
    Projects: Project[],
    IconType: React.ReactNode
}