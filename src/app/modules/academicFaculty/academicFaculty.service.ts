import QueryBuilder from "../../builder/QueryBuilder";
import { FacultySearchableFields } from "./academicFaculty.constant";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {



  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    AcademicFaculty.find(),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllFacultiesFromDB
};
