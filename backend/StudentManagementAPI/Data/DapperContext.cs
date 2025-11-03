using Microsoft.Data.SqlClient;
using System.Data;

namespace StudentManagementAPI.Data
{
    public class DapperContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection") 
                ?? throw new ArgumentNullException("Connection string not found");
        }

        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);
    }
}
