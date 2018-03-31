import { openTable } from "./Table";
import { facultyTableName, IFaculty } from "./tables/Faculty";
import { ILecturer, lecturerTableName } from "./tables/Lecturer";

export const dbContext = {
    lecturers: openTable<ILecturer>(lecturerTableName),
    faculties: openTable<IFaculty>(facultyTableName),
};
