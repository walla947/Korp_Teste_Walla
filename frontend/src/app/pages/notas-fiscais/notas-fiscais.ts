import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NotaFiscalService, NotaFiscal, ItemNota } from '../../services/nota-fiscal';
import { ProdutoService, Produto } from '../../services/produto';

@Component({
  selector: 'app-notas-fiscais',
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './notas-fiscais.html',
  styleUrl: './notas-fiscais.css',
})
export class NotasFiscais implements OnInit {
  notas: NotaFiscal[] = [];
  produtos: Produto[] = [];
  itens: ItemNota[] = [];
  produtoSelecionadoId: number = 0;
  quantidade: number = 1;

  constructor(
    private notaService: NotaFiscalService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.carregarNotas();
    this.carregarProdutos();
  }

  carregarNotas() {
    this.notaService.getAll().subscribe(data => this.notas = data);
  }

  carregarProdutos() {
    this.produtoService.getAll().subscribe(data => this.produtos = data);
  }

  adicionarItem() {
    const produto = this.produtos.find(p => p.id === this.produtoSelecionadoId);
    if (!produto) return;
    this.itens = [...this.itens, {
      produtoId: produto.id!,
      produtoDescricao: produto.descricao,
      quantidade: this.quantidade
    }];
    this.produtoSelecionadoId = 0;
    this.quantidade = 1;
  }

  removerItem(index: number) {
    this.itens = this.itens.filter((_, i) => i !== index);
  }

  criarNota() {
    if (this.itens.length === 0) return;
    const nota: NotaFiscal = { itens: this.itens };
    this.notaService.create(nota).subscribe(() => {
      this.itens = [];
      this.carregarNotas();
    });
  }
}