using Dapper;
using StudentManagementAPI.Data;
using StudentManagementAPI.Models;
using System.Data;

namespace StudentManagementAPI.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly DapperContext _context;

        public StudentRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Student>> GetAllStudentsAsync()
        {
            using var connection = _context.CreateConnection();
            
            var students = await connection.QueryAsync<Student>(
                "sp_GetAllStudents",
                commandType: CommandType.StoredProcedure
            );

            return students;
        }

        public async Task<Student?> GetStudentByIdAsync(int studentId)
        {
            using var connection = _context.CreateConnection();
            
            var parameters = new DynamicParameters();
            parameters.Add("StudentId", studentId, DbType.Int32);

            var student = await connection.QueryFirstOrDefaultAsync<Student>(
                "sp_GetStudentById",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return student;
        }

        public async Task<Student> CreateStudentAsync(CreateStudentDto studentDto)
        {
            using var connection = _context.CreateConnection();
            
            var parameters = new DynamicParameters();
            parameters.Add("FirstName", studentDto.FirstName, DbType.String);
            parameters.Add("LastName", studentDto.LastName, DbType.String);
            parameters.Add("Email", studentDto.Email, DbType.String);
            parameters.Add("Phone", studentDto.Phone, DbType.String);
            parameters.Add("DateOfBirth", studentDto.DateOfBirth, DbType.DateTime);
            parameters.Add("Address", studentDto.Address, DbType.String);
            parameters.Add("City", studentDto.City, DbType.String);
            parameters.Add("State", studentDto.State, DbType.String);
            parameters.Add("ZipCode", studentDto.ZipCode, DbType.String);

            var student = await connection.QueryFirstAsync<Student>(
                "sp_CreateStudent",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return student;
        }

        public async Task<Student?> UpdateStudentAsync(UpdateStudentDto studentDto)
        {
            using var connection = _context.CreateConnection();
            
            var parameters = new DynamicParameters();
            parameters.Add("StudentId", studentDto.StudentId, DbType.Int32);
            parameters.Add("FirstName", studentDto.FirstName, DbType.String);
            parameters.Add("LastName", studentDto.LastName, DbType.String);
            parameters.Add("Email", studentDto.Email, DbType.String);
            parameters.Add("Phone", studentDto.Phone, DbType.String);
            parameters.Add("DateOfBirth", studentDto.DateOfBirth, DbType.DateTime);
            parameters.Add("Address", studentDto.Address, DbType.String);
            parameters.Add("City", studentDto.City, DbType.String);
            parameters.Add("State", studentDto.State, DbType.String);
            parameters.Add("ZipCode", studentDto.ZipCode, DbType.String);

            var student = await connection.QueryFirstOrDefaultAsync<Student>(
                "sp_UpdateStudent",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return student;
        }

        public async Task<bool> DeleteStudentAsync(int studentId)
        {
            using var connection = _context.CreateConnection();
            
            var parameters = new DynamicParameters();
            parameters.Add("StudentId", studentId, DbType.Int32);

            var result = await connection.ExecuteAsync(
                "sp_DeleteStudent",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return result > 0;
        }
    }
}
