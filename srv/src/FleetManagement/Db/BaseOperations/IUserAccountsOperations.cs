namespace FleetManagement.Db.BaseOperations
{
    public interface IUserAccountsOperations<T>
    {
        T GetByMail(string mail);
    }
}
