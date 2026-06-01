import { Component } from '@angular/core';
import { TicketService, TipoSenha, Ticket } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-totem',
  templateUrl: './totem.page.html',
  standalone: false
})
export class TotemPage {
  ultimaSenha: Ticket | null = null;

  constructor(private ticketService: TicketService) {}
  
  emitir(tipo: TipoSenha) {
    this.ultimaSenha = this.ticketService.emitirSenha(tipo);
  }
}