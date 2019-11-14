using System.Threading.Tasks;

namespace VegaStarter.Core.Interfaces
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }

}
