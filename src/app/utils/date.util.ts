const DIAS_SEMANA = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
];

const MESES = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

const MESES_ABREV = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

/** dateGira vem sem timezone (ex.: "2026-09-01T19:30:00"); interpretamos como horário local. */
function parseLocal(dateGira: string): Date {
  return new Date(dateGira.replace(' ', 'T'));
}

export function diaDoMes(dateGira: string): number {
  return parseLocal(dateGira).getDate();
}

export function mesAbreviado(dateGira: string): string {
  return MESES_ABREV[parseLocal(dateGira).getMonth()];
}

export function diaSemanaAbrev(dateGira: string): string {
  return DIAS_SEMANA[parseLocal(dateGira).getDay()].slice(0, 3);
}

/** Ex.: "terça-feira, 8 de setembro às 19h30" */
export function dataCompletaFormatada(dateGira: string): string {
  const d = parseLocal(dateGira);
  const diaSemana = DIAS_SEMANA[d.getDay()];
  const dia = d.getDate();
  const mes = MESES[d.getMonth()];
  const horas = d.getHours().toString().padStart(2, '0');
  const minutos = d.getMinutes().toString().padStart(2, '0');
  return `${diaSemana}, ${dia} de ${mes} às ${horas}h${minutos}`;
}

export const NOMES_MESES = MESES;
