import { INavigationMember } from "@app/Navigation";

export const navigation: INavigationMember[] =
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
        {
            url: "/Dashboard/",
            title: "Dashboard",
            path: "/Dashboard/",
        },
    ];
