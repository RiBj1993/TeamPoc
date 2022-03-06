using ApiOne.Models;
using CsvHelper;
using FileHelpers;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Diagnostics;
using ApiOne.Mapper;

namespace ApiOne
{
    public class InputRepository : IInputRepository
    {
   
        public void generateFileInput( Ftp ftp)
        {
            string file = "";
 
            try
            {
                FtpWebRequest request =
                    (FtpWebRequest)WebRequest.Create("ftp://"+ftp.remoteHost+ftp.remotePath+ftp.remoteFilename1);
                request.Credentials = new NetworkCredential(ftp.remoteUser, ftp.remotePassword);
                request.Method = WebRequestMethods.Ftp.DownloadFile;
                using (Stream stream = request.GetResponse().GetResponseStream())


                using (var reader = new StreamReader(stream, Encoding.Default))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    csv.Context.RegisterClassMap<RadioMapp>();
                    var records = csv.GetRecords<Radio>();
                    if (ftp.remoteFilename == "SOEM1_TN_RADIO_LINK_POWER_20200312_001500.txt")
                        file = "RADIO_LINK_POWER";
                    else if (ftp.remoteFilename == "SOEM1_TN_RFInputPower_20210121_051500.txt")
                        file = "RF_INPUT_POWER";

                    remove_row_by_header(getDataByFileName(csv.GetRecords<Radio>(),file),ftp,file);

                }

            }
            catch (WebException e)
            {
                String status = ((FtpWebResponse)e.Response).StatusDescription;

            }
        }
        private List<Radio> getDataByFileName(IEnumerable<Radio> r,string filee)
        {
            List<Radio> radios = new List<Radio>();
            foreach (Radio rad in r)
            {
                if (rad.Name_file == filee)
                    radios.Add(rad);
               

            }

            return radios;

        }

        private void remove_row_by_header(IEnumerable<Radio> records,Ftp ftp,string filee)
        {


            string name_file = "";
            string target = "";
            List<string> lines = new List<string>();
            foreach (Radio rad in records)
            {
                if (rad.Name_file == filee)
                {
                    if (rad.Status == "DISABLED")
                    {
                        target = rad.Header;//the name of the column to skip
                        using (StreamReader reader = new StreamReader(DownloadFileFTP(ftp)))
                        {
                            // string target = "";//the name of the column to skip

                            int? targetPosition = null; //this will be the position of the column to remove if it is available in the csv file
                            string line;

                            List<string> collected = new List<string>();
                            while ((line = reader.ReadLine()) != null)
                            {

                                string[] split = line.Split(',');
                                collected.Clear();

                                //to get the position of the column to skip
                                for (int i = 0; i < split.Length; i++)
                                {
                                    if (string.Equals(split[i], target, StringComparison.OrdinalIgnoreCase))
                                    {
                                        targetPosition = i;
                                        break; //we've got what we need. exit loop
                                    }
                                }

                                //iterate and skip the column position if exist



                                for (int i = 0; i < split.Length; i++)
                                {
                                    if (targetPosition != null && i == targetPosition.Value) continue;

                                    collected.Add(split[i]);

                                }

                                lines.Add(string.Join(",", collected));



                            }
                        }

                    }
                }

                name_file = rad.Name_file;

            }



            //
            string filename = String.Format(name_file + DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + ".csv");

            CreateFile(lines, filename,ftp);




            /* string loc_file = @"D:\testCSV\" + filename;

             using (StreamWriter writer = new StreamWriter(@"D:\testCSV\" + filename, false))
             {
                 foreach (string line in lines)
                     writer.WriteLine(line);

             }

             ftp.AddFile(loc_file, parms);*/



        }

        private void CreateFile(List<string> reportData,string filename,Ftp ftp)
        {

            // Get the object used to communicate with the server.
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create("ftp://"+ftp.remoteHost+ftp.remotePath +filename);
            request.Method = WebRequestMethods.Ftp.UploadFile;

            request.Credentials = new NetworkCredential(ftp.remoteUser, ftp.remotePassword);


            var lines = reportData;
           /* IEnumerable<PropertyDescriptor> props = TypeDescriptor.GetProperties(typeof(Input)).OfType<PropertyDescriptor>();
            var header = string.Join(",", props.ToList().Select(x => x.Name));
            lines.Add(header);
            var valueLines = reportData.Select(row => string.Join(",", header.Split(',').Select(a => row.GetType().GetProperty(a).GetValue(row, null))));
            lines.AddRange(valueLines);*/
            byte[] data = reportData.SelectMany(s => Encoding.UTF8.GetBytes(s + Environment.NewLine)).ToArray();



            using (Stream requestStream = request.GetRequestStream())
            {
                requestStream.Write(data, 0, data.ToArray().Length);

            }

            using (FtpWebResponse response = (FtpWebResponse)request.GetResponse())
            {
                Console.WriteLine($"Upload File Complete, status {response.StatusDescription}");
            }

        }


        public Stream DownloadFileFTP(Ftp ftp)
        {

            // Get the object used to communicate with the server.
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create("ftp://" + ftp.remoteHost + ftp.remotePath + ftp.remoteFilename);
            request.Method = WebRequestMethods.Ftp.DownloadFile;

            // This example assumes the FTP site uses anonymous logon.
            request.Credentials = new NetworkCredential(ftp.remoteUser, ftp.remotePassword);

            FtpWebResponse response = (FtpWebResponse)request.GetResponse();

            Stream responseStream = response.GetResponseStream();
            return responseStream;

            /* StreamReader reader = new StreamReader(responseStream);
             Console.WriteLine(reader.ReadToEnd());






             Console.WriteLine($"Download Complete, status {response.StatusDescription}");

             reader.Close();
             response.Close();*/
        }
    }

}
