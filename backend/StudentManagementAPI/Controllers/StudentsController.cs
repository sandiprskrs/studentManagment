using Microsoft.AspNetCore.Mvc;
using StudentManagementAPI.Models;
using StudentManagementAPI.Repositories;

namespace StudentManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;
        private readonly ILogger<StudentsController> _logger;

        public StudentsController(
            IStudentRepository studentRepository,
            ILogger<StudentsController> logger)
        {
            _studentRepository = studentRepository;
            _logger = logger;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<Student>>>> GetAllStudents()
        {
            try
            {
                var students = await _studentRepository.GetAllStudentsAsync();
                return Ok(ApiResponse<IEnumerable<Student>>.SuccessResponse(
                    students, 
                    "Students retrieved successfully"
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving students");
                return StatusCode(500, ApiResponse<IEnumerable<Student>>.ErrorResponse(
                    "An error occurred while retrieving students",
                    new List<string> { ex.Message }
                ));
            }
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Student>>> GetStudent(int id)
        {
            try
            {
                var student = await _studentRepository.GetStudentByIdAsync(id);
                
                if (student == null)
                {
                    return NotFound(ApiResponse<Student>.ErrorResponse(
                        $"Student with ID {id} not found"
                    ));
                }

                return Ok(ApiResponse<Student>.SuccessResponse(
                    student,
                    "Student retrieved successfully"
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving student with ID {StudentId}", id);
                return StatusCode(500, ApiResponse<Student>.ErrorResponse(
                    "An error occurred while retrieving the student",
                    new List<string> { ex.Message }
                ));
            }
        }

        // POST: api/Students
        [HttpPost]
        public async Task<ActionResult<ApiResponse<Student>>> CreateStudent(
            [FromBody] CreateStudentDto studentDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ApiResponse<Student>.ErrorResponse(
                        "Invalid student data",
                        ModelState.Values
                            .SelectMany(v => v.Errors)
                            .Select(e => e.ErrorMessage)
                            .ToList()
                    ));
                }

                var student = await _studentRepository.CreateStudentAsync(studentDto);
                
                return CreatedAtAction(
                    nameof(GetStudent),
                    new { id = student.StudentId },
                    ApiResponse<Student>.SuccessResponse(
                        student,
                        "Student created successfully"
                    )
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating student");
                return StatusCode(500, ApiResponse<Student>.ErrorResponse(
                    "An error occurred while creating the student",
                    new List<string> { ex.Message }
                ));
            }
        }

        // PUT: api/Students/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<Student>>> UpdateStudent(
            int id,
            [FromBody] UpdateStudentDto studentDto)
        {
            try
            {
                if (id != studentDto.StudentId)
                {
                    return BadRequest(ApiResponse<Student>.ErrorResponse(
                        "Student ID mismatch"
                    ));
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ApiResponse<Student>.ErrorResponse(
                        "Invalid student data",
                        ModelState.Values
                            .SelectMany(v => v.Errors)
                            .Select(e => e.ErrorMessage)
                            .ToList()
                    ));
                }

                var student = await _studentRepository.UpdateStudentAsync(studentDto);
                
                if (student == null)
                {
                    return NotFound(ApiResponse<Student>.ErrorResponse(
                        $"Student with ID {id} not found"
                    ));
                }

                return Ok(ApiResponse<Student>.SuccessResponse(
                    student,
                    "Student updated successfully"
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating student with ID {StudentId}", id);
                return StatusCode(500, ApiResponse<Student>.ErrorResponse(
                    "An error occurred while updating the student",
                    new List<string> { ex.Message }
                ));
            }
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<object>>> DeleteStudent(int id)
        {
            try
            {
                var result = await _studentRepository.DeleteStudentAsync(id);
                
                if (!result)
                {
                    return NotFound(ApiResponse<object>.ErrorResponse(
                        $"Student with ID {id} not found"
                    ));
                }

                return Ok(ApiResponse<object>.SuccessResponse(
                    new { deletedId = id },
                    "Student deleted successfully"
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting student with ID {StudentId}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse(
                    "An error occurred while deleting the student",
                    new List<string> { ex.Message }
                ));
            }
        }
    }
}
