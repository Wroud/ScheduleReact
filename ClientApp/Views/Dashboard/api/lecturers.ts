import * as JsonQuery from "@app/middlewares/JsonQuery";
import { IFaculty } from "@app/store/database/Faculty";

export const LecturersApi = {
    load: () => JsonQuery.Get<IFaculty[]>(`Home/GetLecturers/`, "get"),
};
