import { Component } from '@angular/core';
import { TicketService, Ticket, TipoSenha } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.page.html',
  standalone: false
})
export class PainelPage {
  ultimasChamadas: Ticket[] = [];
  filas = { SP: 0, SG: 0, SE: 0 };

  constructor(private ticketService: TicketService) {}

  ionViewWillEnter() {
    this.atualizar();
  }

  atualizar() {
    this.ultimasChamadas = this.ticketService.getUltimasChamadas();
    this.filas = this.ticketService.getFilas();
  }

  getBadgeColor(tipo: TipoSenha): string {
    return tipo === 'SP' ? 'danger' : tipo === 'SE' ? 'success' : 'primary';
  }
}