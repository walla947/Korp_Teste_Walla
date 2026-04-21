import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotaFiscalService, NotaFiscal } from '../../services/nota-fiscal';

@Component({
  selector: 'app-impressao',
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './impressao.html',
  styleUrl: './impressao.css',
})
export class Impressao implements OnInit {
  nota: NotaFiscal | null = null;
  carregando = false;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private notaService: NotaFiscalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.notaService.getById(id).subscribe(data => {
      this.nota = data;
      this.cdr.detectChanges();
    });
  }

  imprimir() {
    if (!this.nota?.id) return;
    this.carregando = true;
    this.erro = '';
    this.notaService.imprimir(this.nota.id).subscribe({
      next: (nota) => {
        this.nota = nota;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.erro = err.error || 'Erro ao imprimir. Tente novamente.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}