import { IErrorMessage } from "@app/middlewares/JsonQuery";
import { ILecturer } from "@app/store/database";
import {
    createAction,
    createPayloadAction,
    prepareActions,
} from "redux-subreducer";

const from = "Views/Dashboard";

export const { actions, creators, mapDispatch, mapCreators } = prepareActions({
    ui: {
    },
    lecturers: {
        setLoading: createAction("Lecturers loading...", from),
        setLoaded: createAction("Lecturers loaded", from),
        requestLoad: createAction("Loading Lecturers", from),
        setLecturers: createPayloadAction<string[]>("set lecturers[]", from),
    },
    lecturer: {
        edit: createPayloadAction<string>("Edit Lecturer", from),
        requestDelete: createPayloadAction<string>("Delete Lecturer", from),
    },
    form: {
        setLoading: createAction("Form loading...", from),
        setLoaded: createAction("Form loaded", from),
        reset: createAction("Reset form", from),
        setValue: createPayloadAction<ILecturer>("Update Lecturer", from),
        setErrors: createPayloadAction<IErrorMessage[]>("Set errors[]", from),
        requestSave: createAction("Save Lecturer", from),
        requestAdd: createAction("Add Lecturer", from),
    },
});
