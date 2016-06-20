using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularMVCTest1.Security;

namespace AngularMVCTest1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            SessionPersister.Username = string.Empty;
            return View();
        }

        public JsonResult GetGifts ()
        {
            var db = new GiftsDBEntities1();
            var gifts = db.Gifts.ToList();
            return Json(gifts, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInfo()
        {
            var db = new GiftsDBEntities1();
            var info = db.Info.ToList();
            return Json(info, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddInfo (string customerName, string all_address, string order)
        {
            var db = new GiftsDBEntities1();
            db.Info.Add(new Info() { CustomerName = customerName, Address = all_address, OrderInfo = order });
            try
            {

                db.SaveChanges();

            }
            catch (DbEntityValidationException ex)
            {
                foreach (DbEntityValidationResult validationError in ex.EntityValidationErrors)
                {
                    Response.Write("Object: " + validationError.Entry.Entity.ToString());
                    Response.Write("");
                        foreach (DbValidationError err in validationError.ValidationErrors)
                    {
                        Response.Write(err.ErrorMessage + "");
                        }
                }
            }
            var info = db.Info.ToList();
            return Json(info, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult FormalizeInfo(int id, string employeeName, DateTime date, bool formal)
        {
            var db = new GiftsDBEntities1();
            Info _info = db.Info.FirstOrDefault(x => x.OrderId == id);
            _info.Employee = employeeName;
            _info.FormalizationDate = date;
            _info.Formalizated = formal;
            try
            {
                db.SaveChanges();

            }
            catch (DbEntityValidationException ex)
            {
                foreach (DbEntityValidationResult validationError in ex.EntityValidationErrors)
                {
                    Response.Write("Object: " + validationError.Entry.Entity.ToString());
                    Response.Write("");
                    foreach (DbValidationError err in validationError.ValidationErrors)
                    {
                        Response.Write(err.ErrorMessage + "");
                    }
                }
            }
            var info = db.Info.ToList();
            return Json(info, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult DoneInfo(int id, bool deliv)
        {
            var db = new GiftsDBEntities1();
            Info _info = db.Info.FirstOrDefault(x => x.OrderId == id);
            _info.Delivered = deliv;
            try
            {
                db.SaveChanges();

            }
            catch (DbEntityValidationException ex)
            {
                foreach (DbEntityValidationResult validationError in ex.EntityValidationErrors)
                {
                    Response.Write("Object: " + validationError.Entry.Entity.ToString());
                    Response.Write("");
                    foreach (DbValidationError err in validationError.ValidationErrors)
                    {
                        Response.Write(err.ErrorMessage + "");
                    }
                }
            }
            var info = db.Info.ToList();
            return Json(info, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult ReformalizeInfo(int id, bool formal)
        {
            var db = new GiftsDBEntities1();
            Info _info = db.Info.FirstOrDefault(x => x.OrderId == id);
            _info.Formalizated = formal;
            try
            {
                db.SaveChanges();

            }
            catch (DbEntityValidationException ex)
            {
                foreach (DbEntityValidationResult validationError in ex.EntityValidationErrors)
                {
                    Response.Write("Object: " + validationError.Entry.Entity.ToString());
                    Response.Write("");
                    foreach (DbValidationError err in validationError.ValidationErrors)
                    {
                        Response.Write(err.ErrorMessage + "");
                    }
                }
            }
            var info = db.Info.ToList();
            return Json(info, JsonRequestBehavior.AllowGet);
        }
    }
}