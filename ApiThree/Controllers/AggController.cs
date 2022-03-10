using ApiThree.Contexts;
using ApiThree.Models;
using Microsoft.AspNetCore.Mvc;
 using System;

namespace ApiThree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     public class AggController : ControllerBase
    {
        private readonly AggDbContext _context;
        private readonly InputDbContext _contextInput;
        private readonly RadioDbContext _contextRadio;

        IAggRepository AggRepository;
        public AggController(AggDbContext context, InputDbContext contextInput, RadioDbContext contextRadio)
        {
            _context = context;
            _contextInput = contextInput;
            _contextRadio = contextRadio;
            AggRepository = new AggRepository();

        }
 
        [HttpGet("/getAllAgg/")]
        public object getAllAGG_SLOT_HOURLY() {  return AggRepository.getAllAgg(_context);  }

        
        [HttpPost("/AddAgg/")]
        public void PostAGG_SLOT_HOURLY([FromBody] Agg AGG_SLOT_HOURLY) { AggRepository.AddAgg(_context, AGG_SLOT_HOURLY);}



    //    [HttpPut("/update/{{date}}")]
        [HttpPost("/update/")]
        public Agg update() {
           

            return AggRepository.update(_context,_contextInput,_contextRadio);  // date
        }



    }
}