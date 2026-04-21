using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaturamentoService.Data;
using FaturamentoService.Models;

namespace FaturamentoService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotasFiscaisController : ControllerBase
{
    private readonly FaturamentoContext _context;
    private readonly IHttpClientFactory _httpClientFactory;

    public NotasFiscaisController(FaturamentoContext context, IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var notas = await _context.NotasFiscais.Include(n => n.Itens).ToListAsync();
        return Ok(notas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var nota = await _context.NotasFiscais.Include(n => n.Itens).FirstOrDefaultAsync(n => n.Id == id);
        if (nota == null) return NotFound();
        return Ok(nota);
    }

    [HttpPost]
    public async Task<IActionResult> Create(NotaFiscal nota)
    {
        var ultimaNota = await _context.NotasFiscais.OrderByDescending(n => n.Numero).FirstOrDefaultAsync();
        nota.Numero = (ultimaNota?.Numero ?? 0) + 1;
        nota.Status = "Aberta";
        nota.DataCriacao = DateTime.UtcNow;

        _context.NotasFiscais.Add(nota);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = nota.Id }, nota);
    }

    [HttpPost("{id}/imprimir")]
    public async Task<IActionResult> Imprimir(int id)
    {
        var nota = await _context.NotasFiscais.Include(n => n.Itens).FirstOrDefaultAsync(n => n.Id == id);
        if (nota == null) return NotFound();
        if (nota.Status != "Aberta") return BadRequest("Apenas notas com status Aberta podem ser impressas.");

        try
        {
            var client = _httpClientFactory.CreateClient("EstoqueService");

            foreach (var item in nota.Itens)
            {
                var response = await client.GetAsync($"/api/Produtos/{item.ProdutoId}");
                if (!response.IsSuccessStatusCode)
                    return StatusCode(502, $"Serviço de estoque indisponível para o produto {item.ProdutoId}.");

                var produto = await response.Content.ReadFromJsonAsync<ProdutoDto>();
                if (produto == null) return StatusCode(502, "Erro ao ler produto do estoque.");
                if (produto.Saldo < item.Quantidade)
                    return BadRequest($"Saldo insuficiente para o produto {produto.Descricao}.");

                produto.Saldo -= item.Quantidade;
                await client.PutAsJsonAsync($"/api/Produtos/{produto.Id}", produto);
            }
        }
        catch (Exception)
        {
            return StatusCode(503, "Serviço de estoque está indisponível. Tente novamente mais tarde.");
        }

        nota.Status = "Fechada";
        await _context.SaveChangesAsync();
        return Ok(nota);
    }
}

public class ProdutoDto
{
    public int Id { get; set; }
    public string Codigo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public int Saldo { get; set; }
}