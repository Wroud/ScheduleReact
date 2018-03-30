import * as JsonQuery from "@app/middlewares/JsonQuery";
import { IFaculty, ILecturer } from "@app/store/database";

export const lecturersApi = {
    load: () => JsonQuery.Get<ILecturer[]>(`api/Dashboard/Lecturers/GetLecturers/`, "get"),
    addOrEdit: (lecturer: ILecturer) => JsonQuery.Send<ILecturer>(`api/Dashboard/Lecturers/AddOrEdit/`, "post", lecturer),
    delete: (id: string) => JsonQuery.Get<ILecturer>(`api/Dashboard/Lecturers/Delete/${id}`, "post"),
};
