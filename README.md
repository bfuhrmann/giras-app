# Calendário de Giras

Projeto Angular (standalone components, Angular 18) que exibe em cards as giras públicas
retornadas pela API do TUCT-SP, com um seletor de mês.

## Como rodar

```bash
npm install
npm start
```

A aplicação sobe em `http://localhost:4200`.

## Comportamento

- **Ao carregar a página**: chama `GET /api/v1/giras/publicas/mes-atual` e exibe o mês atual.
- **Ao trocar o mês no select**: chama `GET /api/v1/giras/publicas/mes/{mes}` (1 a 12) e
  atualiza os cards.
- Estados de carregamento (skeleton), erro (com botão "Tentar novamente") e lista vazia
  já estão tratados.

## Estrutura

```
src/app/
  components/
    giras-page/   -> tela principal (header + select + grid)
    gira-card/     -> card individual de cada gira
  services/
    gira.service.ts -> chamadas HTTP para a API
  models/
    gira.model.ts   -> tipagem do retorno da API
  utils/
    date.util.ts    -> formatação de datas em pt-BR sem depender de locale do Angular
```

## Observação sobre as imagens

O campo `imageGira` retorna um caminho relativo (ex.: `/imgGira/pretovelho.png`). O card monta
a URL final como `environment.apiRoot + imageGira`. Se a imagem não existir ou a URL não for
essa, o card cai automaticamente em um ícone de fallback — ajuste `apiRoot` em
`src/environments/environment.ts` se a base de imagens for diferente.
