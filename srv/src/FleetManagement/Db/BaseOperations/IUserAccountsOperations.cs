using FleetManagement.Entities.Accounts.UserAccounts;

namespace FleetManagement.Db.BaseOperations
{
    public interface IUserAccountsOperations<T>
    {
        T GetByMail(string mail);
        int AddNewAndGetId(INewAccountParams newAccount);
    }
}
