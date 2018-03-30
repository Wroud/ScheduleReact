import {
    createAction,
    createActions,
    createPayloadAction,
    getCreators,
    mapActionsToProps,
} from "@app/middlewares/redux-subreducer";
import { ILecturer } from "@app/store/database";

const from = "Views/Dashboard";

export const actions = {
    lecturers: {
        setLoading: createAction("Lecturers loading...", from),
        setLoaded: createAction("Lecturers loaded", from),
        load: createAction("Loading Lecturers", from),
        update: createPayloadAction<string[]>("Update Lecturers", from),
    },
    lecturer: {
        edit: createPayloadAction<string>("Edit Lecturer", from),
        delete: createPayloadAction<string>("Delete Lecturer", from),
    },
    form: {
        setLoading: createAction("Form loading...", from),
        setLoaded: createAction("Form loaded", from),
        reset: createAction("Reset form", from),
        update: createPayloadAction<ILecturer>("Update Lecturer", from),
        save: createAction("Save Lecturer", from),
        add: createAction("Add Lecturer", from),
    },
};

export const actionCreators = {
    lecturers: createActions(getCreators(actions.lecturers)),
    lecturer: createActions(getCreators(actions.lecturer)),
    form: createActions(getCreators(actions.form)),
};

export const actopnsMap = {
    lecturers: mapActionsToProps(actionCreators.lecturers),
    lecturer: mapActionsToProps(actionCreators.lecturer),
    form: mapActionsToProps(actionCreators.form),
};
