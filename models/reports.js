const { query } = require('../database');

module.exports.generateModulesPerformance = function generateModulesPerformance() {
    const sql = 'SELECT * FROM get_modules_performance() AS result';
    return query(sql)
        .then(function (result) {
            const rows = result.rows;
            return rows;
        })
        .catch(function (error) {
            throw error;
        });
};
//-- Create a function to count the number of each grade, grouped by module
// CREATE OR REPLACE FUNCTION get_modules_performance()
// RETURNS TABLE (
// mod_registered VARCHAR(10),
// grade CHAR(2),
// grade_count BIGINT
// ) AS
// $$
// BEGIN
// -- Use RETURN QUERY to define the query to be executed
// RETURN QUERY
// -- TODO: Write the query to count the number of each grade, grouped by module
// SELECT 
//   s.mod_registered,
//   s.grade,
//   COUNT(s.mark) AS grade_count
// FROM stud_mod_performance s
// GROUP BY s.mod_registered, s.grade
// ORDER BY s.mod_registered, s.grade;
// END;
// $$
// LANGUAGE plpgsql;

// //CREATE OR REPLACE FUNCTION get_grade_point(grade_input CHAR(2))
// RETURNS NUMERIC
// AS $$
// DECLARE
// grade_point NUMERIC;
// BEGIN
// -- Base on output
// grade_point := CASE
// WHEN grade_input = 'AD' THEN 4.0
// WHEN grade_input = 'A' THEN 4.0
// WHEN grade_input = 'B+' THEN 3.5
// WHEN grade_input = 'B' THEN 3.0
// WHEN grade_input = 'C+' THEN 2.5
// WHEN grade_input = 'C' THEN 2.0
// WHEN grade_input = 'D+' THEN 1.5
// WHEN grade_input = 'D' THEN 1.0
// WHEN grade_input = 'F' THEN 0.0
// ELSE NULL -- Assign NULL for invalid grades
// END;
// IF grade_point IS NULL THEN
// RAISE EXCEPTION 'Invalid Grade: %', grade_input;
// END IF;
// RETURN grade_point;
// END;
// $$ LANGUAGE plpgsql;
module.exports.calculateStudentsGPA = function calculateStudentsGPA() {
    const sql = 'CALL calculate_students_gpa()';
    return query(sql)
        .then(function (result) {
            console.log('Calculating students GPA');
        })
        .catch(function (error) {
            throw error;
        });
};

// -- Stored Procedure to calculate and update GPAs for all students
// CREATE OR REPLACE PROCEDURE calculate_students_gpa()
// AS $$
// DECLARE
// -- Declare variables for procedure
// v_adm_no CHAR(4);
// v_mod_performance RECORD;
// total_credit_units INT; -- total credit unit for each student in nested loop
// total_weighted_grade_points NUMERIC; -- total grade points for each student in nested loop
// computed_gpa NUMERIC; -- gpa for each student
// BEGIN
// -- Loop through stud_mod_performance
// FOR v_adm_no IN (
// -- TODO: Retrieve the distinct admission numbers from stud_mod_performance (SELECT DISTINCT)
// SELECT DISTINCT adm_no
// FROM stud_mod_performance
// )
// LOOP
// -- Initialize total credit units and weighted grade points
// total_credit_units := 0;
// total_weighted_grade_points := 0;
// -- Nested loop that iterates over module performance records for a specific student
// FOR v_mod_performance IN
// -- TODO:
// -- Retrieve the module performances for the specific student (SELECT)
// SELECT mod_registered, mark, credit_unit, grade
// FROM stud_mod_performance
// JOIN module ON stud_mod_performance.mod_registered = module.mod_code
// WHERE adm_no == v_adm_no
// -- Join the stud_mod_performance table with the module table to get the credit unit and grade for each module (JOIN)
// -- Use the v_adm_no variable to filter for a specific student (WHERE)
// LOOP
// -- TODO:
// -- 1 Calculate the total credit units and weighted grade points for the student based on the gpa formula.
// -- 2 Use the get_grade_point function to map grade to grade points
// total_credit_units := total_credit_units + v_mod_performance.credit_unit;
// total_weighted_grade_points := total_weighted_grade_points
// 	*(v_mod_performance.credit_unit*get_grade_point(v_mod_performance.grade));
// END LOOP;
// -- Calculate GPA if total credit units are greater than 0
// IF total_credit_units > 0 THEN
// computed_gpa := total_weighted_grade_points / total_credit_units;
// -- TODO:
// -- Update the student table with the computed gpa
// -- use today's date for gpa_last_updated
// UPDATE student SET gpa = computed_gpa, gpa_last_updated = CURRENT_DATE WHERE adm_no = v_admin_no;
// END IF;
// END LOOP;
// END;
// $$ LANGUAGE plpgsql;
module.exports.generateAttendance = function generateAttendance() {
    // TODO: Fix this sql query to invoke the corresponding database function/procedure 
    const sql = '';
    return query(sql)
        .then(function (result) {
            const rows = result.rows;
            return rows;
        })
        .catch(function (error) {
            throw error;
        });
};
