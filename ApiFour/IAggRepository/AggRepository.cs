using ApiFour.Contexts;
using ApiFour.Models;
using FileHelpers;
 using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;

namespace ApiFour
{
    public class AggRepository : IAggRepository
    {
        public object getAgg(AggDbContext context)
        {
            return context.Todos.Select(c => new
            {
                NETWORK_SID = c.NETWORK_SID,
                RSL_DEVIATION = c.RSL_DEVIATION,
                checkpoint = c.checkpoint
            }).ToList();
        }

        public object getAgg_Between_Date1_U_Date2(AggDbContext context, DateTime date1, DateTime date2)
        {

            //not working  02/27/2022
        

            return context.Todos.ToList()
                                .Select(c => new  {
                NETWORK_SID = c.NETWORK_SID,
                RSL_DEVIATION = c.RSL_DEVIATION,
                checkpoint = c.checkpoint
            }).Where(b =>
DateTime.Compare(DateTime.Parse(b.checkpoint).ToUniversalTime(),  date1.ToUniversalTime())>=0)
         .Where(b =>
DateTime.Compare(DateTime.Parse(b.checkpoint).ToUniversalTime(), date2.ToUniversalTime()) < 0);
        }
        public void AddAgg(AggDbContext context, Agg aGG_SLOT_HOURLY)
        {
            context.Add(aGG_SLOT_HOURLY);
            context.SaveChanges();
        }



    }
}