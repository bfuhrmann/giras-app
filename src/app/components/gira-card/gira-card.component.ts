import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gira } from '../../models/gira.model';
import { environment } from '../../../environments/environment';
import { dataCompletaFormatada, diaDoMes, mesAbreviado } from '../../utils/date.util';

@Component({
  selector: 'app-gira-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gira-card.component.html',
  styleUrl: './gira-card.component.scss',
})
export class GiraCardComponent {
  @Input({ required: true }) gira!: Gira;
  @Input() index = 0;

  imageFailed = false;

  get imageUrl(): string {
    const caminho = this.gira.imageGira;
    if (!caminho) return '';
    if (caminho.startsWith('http')) return caminho;

    const raiz = environment.apiRoot;
    if (!raiz) {
      console.warn(
        '[GiraCard] environment.apiRoot está vazio — verifique src/environments/environment.ts. ' +
          `Sem isso, a imagem "${caminho}" vira um caminho relativo ao próprio app.`,
      );
      return caminho;
    }

    const raizSemBarra = raiz.replace(/\/+$/, '');
    const caminhoComBarra = caminho.startsWith('/') ? caminho : `/${caminho}`;
    return `${raizSemBarra}${caminhoComBarra}`;
  }

  get dia(): number {
    return diaDoMes(this.gira.dateGira);
  }

  get mesAbrev(): string {
    return mesAbreviado(this.gira.dateGira);
  }

  get dataFormatada(): string {
    return dataCompletaFormatada(this.gira.dateGira);
  }

  onImageError(): void {
    console.error(
      `[GiraCard] Falha ao carregar imagem. URL tentada: "${this.imageUrl}" ` +
        `| valor bruto de imageGira vindo da API: "${this.gira.imageGira}"`,
    );
    this.imageFailed = true;
  }
}
