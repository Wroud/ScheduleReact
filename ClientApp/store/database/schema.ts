import { schema } from "normalizr";
import { FacultyTableName } from "./Faculty";
import { LecturerTableName } from "./Lecturer";

// schema definitions
const lecturer = new schema.Entity(LecturerTableName);
const faculty = new schema.Entity(FacultyTableName, {
    dean: lecturer,
});

export const Schemas = {
    lecturers: [lecturer],
    faculties: [faculty],
};
