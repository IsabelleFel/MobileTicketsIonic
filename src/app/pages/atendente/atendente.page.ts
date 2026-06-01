import { Component } from '@angular/core';
import { TicketService, Ticket } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-atendente',
  templateUrl: './atendente.page.html',
  standalone: false
})
export class AtendentePage {
  emAtendimento: Ticket | null = null;
  tmAtual = 0;
  mensagem = '';

  constructor(private ticketService: TicketService) {}

  chamarProximo() {
    if (this.emAtendimento) {
      this.mensagem = 'Finalize o atendimento atual antes de chamar o próximo.';
      return;
    }

    const proximo = this.ticketService.chamarProximo();
    if (proximo) {
      this.emAtendimento = proximo;
      this.tmAtual = this.ticketService.getTM(proximo.tipo);
      this.mensagem = '';
    } else {
      this.mensagem = 'Nenhuma senha na fila ou fora do expediente (7h-17h).';
    }
  }

  finalizarAtendimento() {
    if (!this.emAtendimento) return;

    this.ticketService.finalizarAtendimento(this.emAtendimento);
    this.mensagem = `Atendimento ${this.emAtendimento.numero} finalizado.`;
    this.emAtendimento = null;
    this.tmAtual = 0;
  }

  encerrarExpediente() {
    this.ticketService.encerrarExpediente();
    this.mensagem = 'Expediente encerrado. Senhas restantes descartadas.';
    this.emAtendimento = null;
  }
}