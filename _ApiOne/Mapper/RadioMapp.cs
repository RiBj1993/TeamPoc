using ApiOne.Models;
using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace ApiOne.Mapper
{
    public sealed class RadioMapp : ClassMap<Radio>
    {
        public RadioMapp()
        {
            AutoMap(CultureInfo.InvariantCulture);
           Map(m => m.Name_file).Name("File Name");
            Map(m => m.Header).Name("Field Name");
            Map(m => m.Status).Name("Status");

        }
    }
}
