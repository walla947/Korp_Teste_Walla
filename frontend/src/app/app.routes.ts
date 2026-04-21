import { Routes } from '@angular/router';
import { Produtos } from './pages/produtos/produtos';
import { NotasFiscais } from './pages/notas-fiscais/notas-fiscais';
import { Impressao } from './pages/impressao/impressao';

export const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: Produtos },
  { path: 'notas', component: NotasFiscais },
  { path: 'impressao/:id', component: Impressao }
];