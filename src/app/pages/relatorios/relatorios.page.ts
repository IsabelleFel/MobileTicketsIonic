import { Component } from '@angular/core';
import { TicketService, Ticket, TipoSenha } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  standalone: false
})
export class RelatoriosPage {
  periodo = 'diario';
  historico: Ticket[] = [];
  stats = {
    totalEmitidas: 0, totalAtendidas: 0,
    spEmitidas: 0, spAtendidas: 0,
    sgEmitidas: 0, sgAtendidas: 0,
    seEmitidas: 0, seAtendidas: 0
  };

  constructor(private ticketService: TicketService) {}

  ionViewWillEnter() {
    this.historico = this.ticketService.getHistorico();
    this.calcularStats();
  }

  calcularStats() {
    const h = this.historico;
    this.stats = {
      totalEmitidas: h.length,
      totalAtendidas: h.filter(t => t.atendido).length,
      spEmitidas: h.filter(t => t.tipo === 'SP').length,
      spAtendidas: h.filter(t => t.tipo === 'SP' && t.atendido).length,
      sgEmitidas: h.filter(t => t.tipo === 'SG').length,
      sgAtendidas: h.filter(t => t.tipo === 'SG' && t.atendido).length,
      seEmitidas: h.filter(t => t.tipo === 'SE').length,
      seAtendidas: h.filter(t => t.tipo === 'SE' && t.atendido).length
    };
  }

  getBadge(tipo: TipoSenha): string {
    return tipo === 'SP' ? 'danger' : tipo === 'SE' ? 'success' : 'primary';
  }
}
