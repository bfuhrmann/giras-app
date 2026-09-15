import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { GiraCardComponent } from '../gira-card/gira-card.component';
import { GiraService } from '../../services/gira.service';
import { Gira } from '../../models/gira.model';
import { NOMES_MESES, ordenarGiras } from '../../utils/date.util';

type MesOpcao = { valor: number; nome: string };

@Component({
  selector: 'app-giras-page',
  standalone: true,
  imports: [CommonModule, FormsModule, GiraCardComponent],
  templateUrl: './giras-page.component.html',
  styleUrl: './giras-page.component.scss',
})
export class GirasPageComponent implements OnInit {
  readonly giras = signal<Gira[]>([]);

  /** true só na primeira carga da página (sem dados anteriores pra mostrar). */
  readonly carregandoInicial = signal(true);
  /** true quando o usuário troca o mês no select (já existem cards na tela). */
  readonly trocandoMes = signal(false);

  readonly erro = signal(false);

  readonly meses: MesOpcao[] = NOMES_MESES.map((nome, i) => ({
    valor: i + 1,
    nome: nome[0].toUpperCase() + nome.slice(1),
  }));

  mesSelecionado = new Date().getMonth() + 1;
  private ehCargaInicial = true;

  constructor(private readonly giraService: GiraService) {}

  ngOnInit(): void {
    this.carregarMesAtual();
  }

  get nomeMesSelecionado(): string {
    return this.meses.find((m) => m.valor === this.mesSelecionado)?.nome ?? '';
  }

  private carregarMesAtual(): void {
    this.carregandoInicial.set(true);
    this.erro.set(false);

    this.giraService
      .getMesAtual()
      .pipe(
        finalize(() => {
          this.carregandoInicial.set(false);
          this.ehCargaInicial = false;
        }),
      )
      .subscribe({
        next: (giras) => this.giras.set(ordenarGiras(giras)),
        error: () => this.erro.set(true),
      });
  }

  onMesChange(mes: number): void {
    this.mesSelecionado = mes;
    this.trocandoMes.set(true);
    this.erro.set(false);

    this.giraService
      .getPorMes(mes)
      .pipe(finalize(() => this.trocandoMes.set(false)))
      .subscribe({
        next: (giras) => this.giras.set(ordenarGiras(giras)),
        error: () => this.erro.set(true),
      });
  }

  tentarNovamente(): void {
    if (this.ehCargaInicial) {
      this.carregarMesAtual();
    } else {
      this.onMesChange(this.mesSelecionado);
    }
  }
}
