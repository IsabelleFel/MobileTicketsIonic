import { Injectable } from '@angular/core';

export type TipoSenha = 'SP' | 'SG' | 'SE';

export interface Ticket {
  numero: string;
  tipo: TipoSenha;
  dataEmissao: Date;
  dataAtendimento?: Date;
  guiche?: number;
  atendido: boolean;
  descartado: boolean;
}

@Injectable({ providedIn: 'root' })
export class TicketService {

  private filasSP: Ticket[] = [];
  private filasSG: Ticket[] = [];
  private filasSE: Ticket[] = [];
  private historico: Ticket[] = [];
  private ultimasChamadas: Ticket[] = [];

  private sequencias: Record<TipoSenha, number> = { SP: 0, SG: 0, SE: 0 };
  private ultimoTipoChamado: TipoSenha | null = null;
  private guiches = [1, 2, 3]; // número de guichês disponíveis

  // Gera número no formato YYMMDD-PPSQ
  private gerarNumero(tipo: TipoSenha): string {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    this.sequencias[tipo]++;
    const sq = String(this.sequencias[tipo]).padStart(2, '0');
    return `${yy}${mm}${dd}-${tipo}${sq}`;
  }

  emitirSenha(tipo: TipoSenha): Ticket {
    // 5% das senhas serão descartadas (não atendidas por responsabilidade do cliente)
    const descartado = Math.random() < 0.05;

    const ticket: Ticket = {
      numero: this.gerarNumero(tipo),
      tipo,
      dataEmissao: new Date(),
      atendido: false,
      descartado
    };

    if (!descartado) {
      if (tipo === 'SP') this.filasSP.push(ticket);
      else if (tipo === 'SE') this.filasSE.push(ticket);
      else this.filasSG.push(ticket);
    }

    this.historico.push(ticket);
    return ticket;
  }

  // Lógica de prioridade: SP -> SE|SG -> SP -> SE|SG
  chamarProximo(): Ticket | null {
    const hora = new Date().getHours();
    if (hora < 7 || hora >= 17) return null;

    let proximo: Ticket | undefined;

    if (this.ultimoTipoChamado !== 'SP' && this.filasSP.length > 0) {
      proximo = this.filasSP.shift();
      this.ultimoTipoChamado = 'SP';
    } else if (this.filasSE.length > 0) {
      proximo = this.filasSE.shift();
      this.ultimoTipoChamado = 'SE';
    } else if (this.filasSG.length > 0) {
      proximo = this.filasSG.shift();
      this.ultimoTipoChamado = 'SG';
    } else if (this.filasSP.length > 0) {
      proximo = this.filasSP.shift();
      this.ultimoTipoChamado = 'SP';
    }

    if (!proximo) return null;

    proximo.dataAtendimento = new Date();
    proximo.guiche = this.guiches[Math.floor(Math.random() * this.guiches.length)];
    proximo.atendido = true;

    this.ultimasChamadas.unshift(proximo);
    if (this.ultimasChamadas.length > 5) this.ultimasChamadas.pop();

    return proximo;
  }

  finalizarAtendimento(ticket: Ticket): void {
    ticket.dataAtendimento = new Date();
  }

  getUltimasChamadas(): Ticket[] {
    return this.ultimasChamadas;
  }

  getFilas() {
    return {
      SP: this.filasSP.length,
      SG: this.filasSG.length,
      SE: this.filasSE.length
    };
  }

  getHistorico(): Ticket[] {
    return this.historico;
  }

  getTM(tipo: TipoSenha): number {
    if (tipo === 'SP') {
      const base = 15;
      const variacao = (Math.random() * 10) - 5; // -5 a +5
      return base + variacao;
    }
    if (tipo === 'SE') {
      return Math.random() < 0.95 ? 1 : 5;
    }
    // SG
    const base = 5;
    const variacao = (Math.random() * 6) - 3; // -3 a +3
    return base + variacao;
  }

  encerrarExpediente() {
    // Descarta senhas restantes
    [...this.filasSP, ...this.filasSG, ...this.filasSE].forEach(t => {
      t.descartado = true;
    });
    this.filasSP = [];
    this.filasSG = [];
    this.filasSE = [];
  }

  resetarSequencias() {
    this.sequencias = { SP: 0, SG: 0, SE: 0 };
  }
}