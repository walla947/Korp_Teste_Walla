using System.Text.Json.Serialization;

namespace FaturamentoService.Models;

public class ItemNota
{
    public int Id { get; set; }
    public int NotaFiscalId { get; set; }
    public int ProdutoId { get; set; }
    public string ProdutoDescricao { get; set; } = string.Empty;
    public int Quantidade { get; set; }

    [JsonIgnore]
    public NotaFiscal? NotaFiscal { get; set; }
}