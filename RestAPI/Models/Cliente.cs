using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ClienteRestAPI.Models
{
    [Table("CLIENTE")]
    public class Cliente
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Email { get; set; }
        [Key]
        [Required]
        public long CpfCliente { get; set; }
        [Required]
        public string Endereco { get; set; }
        [Required]
        public string Estado { get; set; }
        [Required]
        public string Municipio { get; set; }
        [Required]
        public string Senha { get; set; }

    }
}
