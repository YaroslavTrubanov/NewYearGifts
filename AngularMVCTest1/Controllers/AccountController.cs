using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularMVCTest1.ViewModels;
using AngularMVCTest1.Models;
using AngularMVCTest1.Security;
using System.Web.Security;


namespace AngularMVCTest1.Controllers
{
    public class AccountController : Controller
    {
        [AllowAnonymous]
        public ActionResult Login()
        {
            return PartialView();
        }

        [CustomAuthorize(Roles = "employee")]
        public ActionResult Formalization()
        {
            return PartialView();
        }

        [CustomAuthorize(Roles = "editor")]
        public ActionResult Delivery()
        {
            return PartialView();
        }

        [CustomAuthorize(Roles = "admin")]
        public ActionResult Dashboard()
        {
            return PartialView();
        }

        [CustomAuthorize(Roles = "admin, editor, employee")]
        public ActionResult Success()
        {
            return PartialView();
        }

        [HttpPost]
        public ActionResult Login(AccountViewModel avm)
        {
            AccountModel am = new AccountModel();
            if(string.IsNullOrEmpty(avm.Account.Username) || string.IsNullOrEmpty(avm.Account.Password) || am.login(avm.Account.Username, avm.Account.Password) == null)
            {
                ViewBag.Error = "Неверный логин или пароль";
                return View("login");
            }
            
            SessionPersister.Username = avm.Account.Username;
            return View("success");

        }

        public ActionResult Logout()
        {
            SessionPersister.Username = string.Empty;
            return RedirectToAction("Login");
        }
    }
}