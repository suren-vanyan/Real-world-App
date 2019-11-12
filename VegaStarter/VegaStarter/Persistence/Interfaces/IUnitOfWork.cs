using System.Threading.Tasks;

namespace VegaStarter.Persistence.Interfaces
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }

}
