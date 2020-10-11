﻿using System;
using System.Collections.Generic;
using System.Text;

namespace SEDC.FoodApp.Auth.Models
{
    public class RegisterRequestModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
    }
}
