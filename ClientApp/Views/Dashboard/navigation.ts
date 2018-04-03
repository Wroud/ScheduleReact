import { INavigationMember } from "@app/Navigation";

export const navigation: INavigationMember[] =
    [
        {
            url: "/",
            title: "Home",
            exact: true,
        },
        {
            url: "/Dashboard/",
            title: "Dashboard",
            path: "/Dashboard/",
        },
    ];

export const drawerNavigation: INavigationMember[] =
    [
        {
            url: "/Dashboard/",
            title: "Dashboard",
            path: "/Dashboard/",
            exact: true,
        },
        {
            url: "/Dashboard/Lecturers/",
            title: "Lecturers",
            path: "/Dashboard/Lecturers/",
        },
    ];
