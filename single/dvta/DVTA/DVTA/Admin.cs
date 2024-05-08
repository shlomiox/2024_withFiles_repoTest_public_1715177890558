﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using System.IO;
using DBAccess;
namespace DVTA
{
    public partial class Admin : Form
    {
        string pathtodownload = null;
        String time;
        public Admin()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void btnFtp_Click(object sender, EventArgs e)
        {

            ftptext.Text = "Please wait while uploading your data";          
           
            Thread backgroundThread = new Thread(new ThreadStart(() =>
                {
                    DBAccessClass db = new DBAccessClass();

                    db.openConnection();

                    DataTable dt = db.getExpensesOfAll();

                    //pathtodownload = Environment.GetEnvironmentVariable("USERPROFILE") + @"\" + "Downloads";
                    pathtodownload = Path.GetTempPath();             
                  
                    
                    dt.WriteToCsvFile(pathtodownload+"admin.csv");

                    db.closeConnection();

                    Upload("ftp://192.168.56.110", "dvta", "p@ssw0rd", @pathtodownload+"admin.csv");
                    
                    //cleaning up - Delete files in temp folder

                    try
                    {
                        System.IO.Directory.Delete(@pathtodownload, true);
                    }
                    catch(Exception exp){

                        Console.WriteLine(exp);
                    }
                    
                }));
            backgroundThread.Start();           
           
        }
        private static void Upload(string ftpServer, string userName, string password, string filename)
        {

            
            using (System.Net.WebClient client = new System.Net.WebClient())
            {

                try
                {
                  
                   
   
                    client.Credentials = new System.Net.NetworkCredential(userName, password);
                    client.UploadFile(ftpServer + "/" + new FileInfo(filename).Name, "STOR", filename);

                    MessageBox.Show("Success");
                    return;
                }
                catch(Exception ftpexc){

           
                    MessageBox.Show("Looks like this file already exists on the server");
                }
            }
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void Admin_Load(object sender, EventArgs e)
        {

        }

     
    }
}
