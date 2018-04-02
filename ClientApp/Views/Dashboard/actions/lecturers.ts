import {
    createAction,
    createPayloadAction,
    prepareActions,
} from "@app/middlewares/redux-subreducer";
import { ILecturer } from "@app/store/database";

const from = "Views/Dashboard";

export const { actions, creators, mapDispatch, mapCreators } = prepareActions({
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
});
