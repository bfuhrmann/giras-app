import { Component } from '@angular/core';

/**
 * ATUALIZE AQUI com os dados reais da tenda.
 * - whatsappNumero: só dígitos, com DDI+DDD (ex.: 55 11 91234-5678 -> "5511912345678")
 * - instagramUsuario: sem o "@"
 */
const CONTATO = {
  endereco: 'Av. Júlio Buono, 866 - Vila Gustavo, São Paulo/SP',
  telefoneExibicao: '(11) 91234-5678',
  whatsappNumero: '5511912345678',
  instagramUsuario: 'tendadeumbandacaboclatapaji',
};

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly endereco = CONTATO.endereco;
  readonly telefoneExibicao = CONTATO.telefoneExibicao;

  readonly whatsappUrl = `https://wa.me/${CONTATO.whatsappNumero}`;
  readonly instagramUrl = `https://instagram.com/${CONTATO.instagramUsuario}`;
  readonly instagramHandle = `@${CONTATO.instagramUsuario}`;

  get telefoneUrl(): string {
    return `tel:+${CONTATO.whatsappNumero}`;
  }

  readonly anoAtual = new Date().getFullYear();
}
