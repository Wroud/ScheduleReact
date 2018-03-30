import { schema } from "normalizr";
import { facultyTableName } from "./Faculty";
import { lecturerTableName } from "./Lecturer";

// schema definitions
const lecturer = new schema.Entity(lecturerTableName);
const faculty = new schema.Entity(facultyTableName, {
    dean: lecturer,
});

export const schemas = {
    lecturers: [lecturer],
    faculties: [faculty],
};
