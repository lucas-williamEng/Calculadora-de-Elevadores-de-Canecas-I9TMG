# Calculadora de Elevadores de Canecas — I9TMG

Projeto desenvolvido em equipe na disciplina de Jornada de Aprendizagem (UniSenai PR), a partir de um desafio real trazido pela I9TMG, fabricante de equipamentos industriais. Ferramenta web para dimensionamento de elevadores de canecas. Roda inteiramente no navegador, sem servidor ou banco de dados.

🔗 **[Acessar a calculadora](https://calculadora-elevador-caneca-i9tmg.vercel.app/)**

## O que faz

- **Pré-dimensionamento** — o engenheiro informa a capacidade desejada, peso específico do material, altura e velocidade de referência. O sistema sugere as canecas compatíveis com base nesses requisitos, funcionando por lógica inversa.
- **Cálculo completo** — a partir da caneca selecionada na tabela interativa, calcula:
  - Capacidade real (Q em t/h)
  - Tensões da correia (T1, T2 e número de lonas)
  - Potência do motor (Pm em kW)
  - Motor normalizado WEG mais próximo, com link para o catálogo
- **Estimativa de orçamento** — após o cálculo, gera uma estimativa de custo configurável por região, taxa de câmbio, margem de contingência, montagem e frete.
- **Histórico** — todos os cálculos ficam salvos no navegador automaticamente. É possível recarregar qualquer cálculo anterior na calculadora ou exportar o histórico em CSV.
- **Relatório em PDF** — os resultados podem ser exportados em PDF diretamente pela interface.

## Páginas

| Arquivo | Descrição |
|---|---|
| `index.html` | Calculadora principal (pré-dimensionamento, cálculo e orçamento) |
| `instrucoes.html` | Manual de uso, fórmulas, diagrama do equipamento e exemplos |
| `historico.html` | Histórico de cálculos salvos no navegador |
| `style.css` | Estilos, temas (claro/escuro/alto contraste) e responsividade |
| `script.js` | Toda a lógica de cálculo, tabela de canecas e motores WEG |

## Como rodar

Não tem build, não tem dependência. Só abrir o `index.html` no navegador.

Para servir localmente (evita restrições de CORS em alguns navegadores):

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

## Acessibilidade

O painel de acessibilidade no cabeçalho oferece modo escuro, alto contraste e três tamanhos de fonte. As preferências ficam salvas entre sessões via localStorage.

## Atualizar tabela de canecas ou motores

Os dados técnicos ficam no início do `script.js`, nos arrays `CANECAS` e `MOTORREDUTORES_WEG`. Qualquer atualização no catálogo da empresa é feita diretamente nesses objetos.

## Autores

Daniel Figueiredo, Erick Yuri, Gabriel Garcia, João Henrique, Lucas Indalencio e Lucas William.
