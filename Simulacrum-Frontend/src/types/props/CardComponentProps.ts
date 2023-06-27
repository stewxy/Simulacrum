import { Project } from "../Project";

export interface CardComponentProps extends Project {
    onLikeChange?(): void;
}