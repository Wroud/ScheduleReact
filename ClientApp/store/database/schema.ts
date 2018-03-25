import { schema } from "normalizr";

// schema definitions
const lecturer = new schema.Entity("lecturers");
const faculty = new schema.Entity("faculties", {
    dean: lecturer,
});

export const Schemas = {
    lecturers: [lecturer],
    faculties: [faculty],
};
