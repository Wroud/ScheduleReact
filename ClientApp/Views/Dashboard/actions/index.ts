import {
    actions as lecturers,
    creators as lecturersCreators,
    maps as lecturersMaps,
} from "./lecturers";
import {
    actions as dashboard,
    creators as dashboardCreators,
} from "./module";

export const actions = {
    dashboard,
    lecturers,
};

export const actionCreators = {
    dashboard: dashboardCreators,
    lecturers: lecturersCreators,
};

export const actionsMaps = {
    lecturers: lecturersMaps,
};
