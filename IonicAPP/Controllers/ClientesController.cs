using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ClienteRestAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClienteRestAPI.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/clientes")]
    public class ClientesController : Controller
    {
        private readonly ClienteContext _context;

        public ClientesController(ClienteContext context)
        {
            _context = context;
        }
        // GET api/clientes
        // MÉTODO GET QUE FAZ A LISTAGEM DE TODOS OS CLIENTES CADASTRADOS NO SISTEMA
        [HttpGet]
        public IEnumerable<Cliente> Get()
        {
            //BUSCA E RETORNA TODOS OS CLIENTES CADASTRADOS NO BANCO
            IEnumerable<Cliente> clientes  = _context.Clientes;
            return clientes;
        }

        // GET api/clientes/5
        [HttpGet("{cpfCliente}")]
        public Cliente Get(long cpfCliente)
        {
            //BUSCA O CLIENTE NO BANCO E O RETORNA
            Cliente cliente = _context.Clientes.Find(cpfCliente);
            if (cliente != null)
            {
                return cliente;
            }
            else
            {
                return null;
            }
        }

        // GET api/clientes/5
        [HttpGet("por_email/{email}")]
        public Cliente Get(string Email)
        {
            //BUSCA O CLIENTE NO BANCO E O RETORNA
            Cliente cliente = _context.Clientes.FirstOrDefault(c => c.Email == Email);
            return cliente;
        }

        // POST api/clientes/login
        [HttpPost("login")]
        public IActionResult Login(string Email, string Senha)
        {
            if (Email != null && Senha != null)
            {
                Cliente cliente = _context.Clientes.FirstOrDefault(c => c.Email == Email);
                if (cliente != null)
                {
                    //CASO O CLIENTE TINHA SIDO AUTENTICADO, RETORN UM OK;
                    if (cliente.Senha == Senha)
                        return Ok();
                    else
                        return NotFound();
                }
                else
                {
                    //RETORNA ERRO CASO O CLIENTE NAO SEJA ENCONTRADO
                    return NotFound();
                }
            }
            else
            {
                //RETORNA ERRO CASO O CLIENTE NAO SEJA ENCONTRADO
                return NotFound();
            }
        }

        // POST api/clientes
        [HttpPost]
        public IActionResult Post(Cliente cliente)
        {
            if(cliente != null && TryValidateModel(cliente)) { 
                //CASO OS DADOS RECEBIDOS SEJAM VÁLIDOS E NÃO EXISTA UM CLIENTE COM O MESMO CPF, OS DADOS SÃO SALVOS NO BANCO DE DADOS
                if (!(_context.Clientes.Any(c => c.CpfCliente == cliente.CpfCliente)) && !(_context.Clientes.Any(c => c.Email == cliente.Email)))
                {
                    //INSERE O CLIENTE NO BANCO
                    _context.Clientes.Add(cliente);
                    //SALVA AS ALTERAÇÕESS
                    _context.SaveChanges();
                    return Ok();
                }
                else
                {
                    //RETORNA ERRO DE CONFLITO
                    return StatusCode(409);
                }
            }
            else
            {   
                //RETORNA ERRO DE BAD REQUEST
                return BadRequest();
            }
        }

        // PUT api/clientes/5
        //MÉTODO PARA REALIZAR UPDATE EM UM CLIENTE
        [HttpPut("{cpfCliente}")]
        public IActionResult Put(long cpfCliente, Cliente cliente)
        {
            if(cpfCliente > 0 && cliente != null && TryValidateModel(cliente))
            {
             
                Cliente oldClient = _context.Clientes.Find(cpfCliente);
                if (cliente.Email != oldClient.Email && !_context.Clientes.Any(c => c.Email == cliente.Email) && (cliente.CpfCliente != oldClient.CpfCliente && !_context.Clientes.Any(c => c.CpfCliente == cliente.CpfCliente)))
                {
                    if (cliente.Email != null) oldClient.Email = cliente.Email;
                    if (cliente.Endereco != null) oldClient.Endereco = cliente.Endereco;
                    if (cliente.Estado != null) oldClient.Estado = cliente.Estado;
                    if (cliente.Municipio != null) oldClient.Municipio = cliente.Municipio;
                    if (cliente.Nome != null) oldClient.Nome = cliente.Nome;
                    if (cliente.Senha != null) oldClient.Senha = cliente.Senha;
                    //BUSCA O CLIENTE NO BANCO E ATUALIZA SEUS DADOS

                    //SALVA AS ALTERAÇÕES
                    _context.SaveChanges();
                    return Ok();
                }
                else
                {
                    //RETORNA ERRO DE CONFLITO
                    return StatusCode(409);
                }
               
            }
            else
            {
                //RETORNA ERRO DE BAD REQUEST
                return BadRequest();
            }
           
        }

        // DELETE api/clientes/5
        [HttpDelete("{cpfCliente}")]
        public void Delete(long cpfCliente)
        {
            //PROCURA O CLIENTE NO BANCO
            Cliente cliente = _context.Clientes.Find(cpfCliente);
            if (cliente != null)
            {
                //CASO O CLIENTE TENHA SIDO ENCONTRADO, ELE É REMOVIDO DO BANCO
                _context.Remove(cliente);
                //SALVA AS ALTERAÇÕES
                _context.SaveChanges();
            }
        }
    }
}
