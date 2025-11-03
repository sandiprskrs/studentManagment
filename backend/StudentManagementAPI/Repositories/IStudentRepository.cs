using StudentManagementAPI.Models;

namespace StudentManagementAPI.Repositories
{
    public interface IStudentRepository
    {
        Task<IEnumerable<Student>> GetAllStudentsAsync();
        Task<Student?> GetStudentByIdAsync(int studentId);
        Task<Student> CreateStudentAsync(CreateStudentDto studentDto);
        Task<Student?> UpdateStudentAsync(UpdateStudentDto studentDto);
        Task<bool> DeleteStudentAsync(int studentId);
    }
}
