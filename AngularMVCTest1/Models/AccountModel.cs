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
            listAccounts.Add(new Account { Username = "Мороз", Password = "Мороз", Roles = "admin" });
            listAccounts.Add(new Account { Username = "Лошадка", Password = "Лошадка", Roles = "editor" });
            listAccounts.Add(new Account { Username = "helper", Password = "helper", Roles = "employee" });
            listAccounts.Add(new Account { Username = "Лиса", Password = "Лиса", Roles = "employee" });
            listAccounts.Add(new Account { Username = "Енот", Password = "Енот", Roles = "employee" });
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