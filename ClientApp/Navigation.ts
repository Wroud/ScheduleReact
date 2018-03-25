export interface INavigationMember {
    title?: string;
    icon?: string;
    path?: string;
    exact?: boolean;
    url: string;

    subelemtns?: INavigationMember[];
}
