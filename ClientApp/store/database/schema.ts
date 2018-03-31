import { schema } from "normalizr";
import { facultyTableName } from "./tables/Faculty";
import { lecturerTableName } from "./tables/Lecturer";

// schema definitions
const lecturer = new schema.Entity(lecturerTableName);
const faculty = new schema.Entity(facultyTableName, {
    dean: lecturer,
});

export const schemas = {
    [lecturerTableName]: [lecturer],
    [facultyTableName]: [faculty],
};
