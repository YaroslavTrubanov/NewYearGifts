using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCTest1.Models
{
    public class AccountModel
    {
        private List<Account> listAccounts = new List<Account>();

        public AccountModel()
        {
            listAccounts.Add(new Account { Username = "moroz", Password = "moroz", Roles = "admin" });
            listAccounts.Add(new Account { Username = "deliveryman", Password = "deliveryman", Roles = "editor" });
            listAccounts.Add(new Account { Username = "helper", Password = "helper", Roles = "employee" });
        }

        public Account find(string username)
        {
            return listAccounts.Where(acc => acc.Username.Equals(username)).FirstOrDefault();
        }

        public Account login(string username, string password)
        {
            return listAccounts.Where(acc => acc.Username.Equals(username) && acc.Password.Equals(password)).FirstOrDefault();
        }
    }
}