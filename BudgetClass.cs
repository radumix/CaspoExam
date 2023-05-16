using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;

namespace CaspoExam
{
    public class BudgetClass
    {
        public int Add(BudgetModel budgetModel)
        {
            int result = 0;
           
            try
            {

                using (SqlConnection conn = new SqlConnection(ConnectionClass.AppSettings[(int)EnumKeys.DBConn]))
                {
                    conn.Open();
                    SqlCommand sql_cmnd = new SqlCommand("sp_add_budget", conn);
                    sql_cmnd.CommandType = CommandType.StoredProcedure;
                    sql_cmnd.Parameters.AddWithValue("@country", SqlDbType.Decimal).Value = budgetModel.country;
                    sql_cmnd.Parameters.AddWithValue("@month", SqlDbType.NVarChar).Value = budgetModel.month;
                    sql_cmnd.Parameters.AddWithValue("@city", SqlDbType.NVarChar).Value = budgetModel.city;
                    sql_cmnd.Parameters.AddWithValue("@budget", SqlDbType.NVarChar).Value = budgetModel.budget;


                    result = sql_cmnd.ExecuteNonQuery();
                    conn.Close();

                    if (result == 0)
                    {
                        result = 0;
                    }
                    else
                    {
                        result = 1;
                    }

                }

            }
            catch (Exception e)
            {
                throw e;
            }

            return result;
        }


        public string List()
        {
            
            DataTable dt = new DataTable();
            try
            {

                using (SqlConnection conn = new SqlConnection(ConnectionClass.AppSettings[(int)EnumKeys.DBConn]))
                {
                    SqlCommand sqlComm = new SqlCommand("[dbo].[sp_get_budget]", conn);
                    sqlComm.CommandType = CommandType.StoredProcedure;

                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = sqlComm;
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.Fill(dt);
                }

            }
            catch (Exception e)
            {
                throw e;
            }

            return JsonConvert.SerializeObject(dt);
        }


        public string SearchBudget(string country, string quarter)
        {

            DataTable dt = new DataTable();
            try
            {

                using (SqlConnection conn = new SqlConnection(ConnectionClass.AppSettings[(int)EnumKeys.DBConn]))
                {
                    SqlCommand sqlComm = new SqlCommand("[dbo].[sp_get_budget_by_cq]", conn);
                    sqlComm.CommandType = CommandType.StoredProcedure;
                    sqlComm.Parameters.AddWithValue("@country", SqlDbType.Int).Value = country;
                    sqlComm.Parameters.AddWithValue("@quarter", SqlDbType.Int).Value = quarter;

                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = sqlComm;
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.Fill(dt);
                }

            }
            catch (Exception e)
            {
                throw e;
            }

            return JsonConvert.SerializeObject(dt);
        }
    }
}
