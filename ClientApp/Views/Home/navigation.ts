import { INavigationMember } from "@app/Navigation";

export const Navigation: INavigationMember[] =
    [
        {
            url: "/",
            title: "Home",
            exact: true,
        },
        {
            url: "/Counter/",
            title: "Counter",
            path: "/Counter/:startDateIndex?",
        },
    ];
