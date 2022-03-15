using ApiOne.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace ApiOne.Controllers
{
    [Route("api/[controller]")]
      public class InputController : ControllerBase
    {
         IInputRepository inputRepository;
        public InputController( )
        {
            inputRepository = new InputRepository();

        }


        [HttpPost("/generateFileInput/")]
        public void generateFileInput([FromBody] Ftp ftp)
        {  inputRepository.generateFileInput(ftp);}

   
 
    }
}