using FileHelpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ApiOne.Models
{
    public class Radio
    {
        public string Name_file { get; set; }

        public string Header { get; set; }
        public string Status { get; set; }
    }
}
