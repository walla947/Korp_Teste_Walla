import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ProdutoService, Produto } from '../../services/produto';

@Component({
  selector: 'app-produtos',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit {
  produtos: Produto[] = [];
  novoProduto: Produto = { codigo: '', descricao: '', saldo: 0 };

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getAll().subscribe(data => {
      this.produtos = data;
      this.cdr.detectChanges();
    });
  }

  salvar() {
    this.produtoService.create(this.novoProduto).subscribe(() => {
      this.novoProduto = { codigo: '', descricao: '', saldo: 0 };
      this.carregarProdutos();
    });
  }
}