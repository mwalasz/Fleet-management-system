﻿using System.ComponentModel.DataAnnotations;

namespace FleetManagement.Authentication.Models
{
    public class AuthenticationParams
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
