namespace FaturamentoService.Models;

public class NotaFiscal
{
    public int Id { get; set; }
    public int Numero { get; set; }
    public string Status { get; set; } = "Aberta";
    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
    public List<ItemNota> Itens { get; set; } = new();
}