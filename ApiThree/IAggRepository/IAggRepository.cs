using ApiThree.Contexts;
using ApiThree.Models;
using System;


namespace ApiThree
{
    public interface IAggRepository
    {

        Agg update(AggDbContext context, InputDbContext _contextInput, RadioDbContext _contextRadio);
 
        object getAllAgg(AggDbContext context);
        void AddAgg(AggDbContext context, Agg aGG_SLOT_HOURLY);
    }
}
