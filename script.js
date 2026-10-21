// =====================================================================
// CALCULADORA DE ELEVADORES DE CANECAS — script.js
// Dados extraídos da planilha de memória de cálculo (Planilhas 1 e 4)
// =====================================================================

// Tabela de canecas (objetos com propriedades nomeadas)
const CANECAS = [
  { fatorPerfil: 0.7067, largura: 150, projecao: 100, altura: 110, vol75: 0.795, vol100: 1.060, passo: 220, correiaPol: 8, tambor: 260, cap125: 16, cap150: 19, cap170: 22 },
  { fatorPerfil: 1.0867, largura: 200, projecao: 125, altura: 135, vol75: 1.630, vol100: 2.173, passo: 275, correiaPol: 10, tambor: 320, cap125: 27, cap150: 32, cap170: 35 },
  { fatorPerfil: 1.5052, largura: 225, projecao: 150, altura: 155, vol75: 2.540, vol100: 3.387, passo: 300, correiaPol: 11, tambor: 350, cap125: 38, cap150: 45, cap170: 50 },
  { fatorPerfil: 1.5093, largura: 250, projecao: 150, altura: 155, vol75: 2.830, vol100: 3.773, passo: 300, correiaPol: 12, tambor: 380, cap125: 40, cap150: 50, cap170: 55 },
  { fatorPerfil: 1.5067, largura: 300, projecao: 150, altura: 155, vol75: 3.390, vol100: 4.520, passo: 300, correiaPol: 14, tambor: 440, cap125: 50, cap150: 60, cap170: 70 },
  { fatorPerfil: 2.0444, largura: 300, projecao: 175, altura: 180, vol75: 4.600, vol100: 6.133, passo: 350, correiaPol: 14, tambor: 440, cap125: 60, cap150: 70, cap170: 80 },
  { fatorPerfil: 2.0495, largura: 350, projecao: 175, altura: 180, vol75: 5.380, vol100: 7.173, passo: 350, correiaPol: 16, tambor: 500, cap125: 70, cap150: 80, cap170: 95 },
  { fatorPerfil: 2.7352, largura: 350, projecao: 200, altura: 210, vol75: 7.180, vol100: 9.573, passo: 400, correiaPol: 16, tambor: 500, cap125: 80, cap150: 95, cap170: 110 },
  { fatorPerfil: 2.7463, largura: 410, projecao: 200, altura: 210, vol75: 8.445, vol100: 11.260, passo: 400, correiaPol: 18, tambor: 550, cap125: 95, cap150: 115, cap170: 130 },
  { fatorPerfil: 2.3333, largura: 450, projecao: 210, altura: 185, vol75: 7.875, vol100: 10.500, passo: 440, correiaPol: 20, tambor: 600, cap125: 100, cap150: 125, cap170: 140 },
  { fatorPerfil: 2.3980, largura: 500, projecao: 210, altura: 220, vol75: 8.993, vol100: 11.990, passo: 440, correiaPol: 22, tambor: 650, cap125: 115, cap150: 140, cap170: 155 },
  { fatorPerfil: 2.7297, largura: 550, projecao: 200, altura: 210, vol75: 11.260, vol100: 15.013, passo: 400, correiaPol: 24, tambor: 700, cap125: 125, cap150: 150, cap170: 170 },
  { fatorPerfil: 3.0091, largura: 550, projecao: 210, altura: 220, vol75: 12.413, vol100: 16.550, passo: 420, correiaPol: 24, tambor: 700, cap125: 140, cap150: 170, cap170: 190 },
  { fatorPerfil: 3.6000, largura: 600, projecao: 230, altura: 240, vol75: 16.200, vol100: 21.600, passo: 460, correiaPol: 26, tambor: 760, cap125: 160, cap150: 190, cap170: 220 },
  { fatorPerfil: 4.2311, largura: 450, projecao: 250, altura: 260, vol75: 14.280, vol100: 19.040, passo: 500, correiaPol: 20, tambor: 600, cap125: 130, cap150: 155, cap170: 170 },
  { fatorPerfil: 4.2347, largura: 500, projecao: 250, altura: 260, vol75: 15.880, vol100: 21.173, passo: 500, correiaPol: 22, tambor: 650, cap125: 140, cap150: 170, cap170: 190 },
  { fatorPerfil: 4.2356, largura: 600, projecao: 250, altura: 260, vol75: 19.060, vol100: 25.413, passo: 500, correiaPol: 26, tambor: 760, cap125: 170, cap150: 200, cap170: 230 },
  { fatorPerfil: 4.2359, largura: 650, projecao: 250, altura: 260, vol75: 20.650, vol100: 27.533, passo: 500, correiaPol: 28, tambor: 810, cap125: 185, cap150: 220, cap170: 250 },
  { fatorPerfil: 4.2362, largura: 700, projecao: 250, altura: 260, vol75: 22.240, vol100: 29.653, passo: 500, correiaPol: 30, tambor: 860, cap125: 200, cap150: 240, cap170: 270 },
  { fatorPerfil: 4.1857, largura: 700, projecao: 265, altura: 320, vol75: 21.975, vol100: 29.300, passo: 350, correiaPol: 30, tambor: 860, cap125: 280, cap150: 340, cap170: 380 },
  { fatorPerfil: 4.2667, largura: 750, projecao: 270, altura: 320, vol75: 24.000, vol100: 32.000, passo: 350, correiaPol: 32, tambor: 920, cap125: 300, cap150: 370, cap170: 420 },
];

let canecaSelecionada = null;

// =====================================================================
// PREENCHER TABELA DE CANECAS
// =====================================================================
function preencherTabela() {
  const tbody = document.getElementById('corpoCanecas');
  if (!tbody) return;
  CANECAS.forEach((c, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.largura}</td>
      <td>${c.altura}</td>
      <td>${c.vol75.toFixed(3)}</td>
      <td>${c.vol100.toFixed(3)}</td>
      <td>${c.passo}</td>
      <td>${c.correiaPol}"</td>
      <td>${c.cap150.toFixed(1)}</td>
    `;
    tr.style.cursor = 'pointer';
    tr.onclick = () => selecionarCaneca(i, tr);
    tbody.appendChild(tr);
  });
}

function selecionarCaneca(idx, tr) {
  document.querySelectorAll('#corpoCanecas tr').forEach(r => r.classList.remove('selecionada'));
  tr.classList.add('selecionada');
  canecaSelecionada = CANECAS[idx];
}

// =====================================================================
// TABELA DE MOTORREDUTORES WEG — Série WCG20 V (Vertical) + W22 IR3
// Dados baseados no catálogo WEG para elevadores de canecas (4 polos / 60 Hz)
// Colunas: [cv, kw, carcaca, frame, torque_nm, link_weg, link_busca]
// =====================================================================
// Link de busca WEG — catálogo BR em português (funciona sem login)
function wegBusca(termo) {
  return 'https://www.weg.net/catalog/weg/BR/pt/search/?text=' + encodeURIComponent(termo);
}
// Link direto pelo código do produto (mais preciso)
function wegLink(codigo) {
  return 'https://www.weg.net/catalog/weg/BR/pt/search/?text=' + encodeURIComponent(codigo);
}

const MOTORREDUTORES_WEG = [
  { cv: 1, kw: 0.75, frame: '80', carcaca: 'W22 IR3 Premium', torque: 4.2, rpm_motor: 1720, codigo: '11638247', link: wegBusca('W22 IR3 Premium 1 cv 4P 80 60Hz') },
  { cv: 2, kw: 1.5, frame: 'L90S', carcaca: 'W22 IR3 Premium', torque: 8.3, rpm_motor: 1730, codigo: '11543943', link: wegBusca('W22 IR3 Premium 2 cv 4P L90S 60Hz') },
  { cv: 3, kw: 2.2, frame: 'L90L', carcaca: 'W22 IR3 Premium', torque: 12.1, rpm_motor: 1730, codigo: '11397215', link: wegBusca('W22 IR3 Premium 3 cv 4P L90L 60Hz') },
  { cv: 5, kw: 3.7, frame: 'L100L', carcaca: 'W22 IR3 Premium', torque: 20.4, rpm_motor: 1740, codigo: '11603327', link: wegBusca('W22 IR3 Premium 5 cv 4P L100L 60Hz') },
  { cv: 7.5, kw: 5.5, frame: 'L112M', carcaca: 'W22 IR3 Premium', torque: 30.3, rpm_motor: 1750, codigo: '11390991', link: wegBusca('W22 IR3 Premium 7.5 cv 4P L112M 60Hz') },
  { cv: 10, kw: 7.5, frame: '132S', carcaca: 'W22 IR3 Premium', torque: 40.9, rpm_motor: 1750, codigo: '11407291', link: wegBusca('W22 IR3 Premium 10 cv 4P 132S 60Hz') },
  { cv: 15, kw: 11, frame: '132M/L', carcaca: 'W22 IR3 Premium', torque: 60.6, rpm_motor: 1750, codigo: '11402561', link: wegBusca('W22 IR3 Premium 15 cv 4P 132M 60Hz') },
  { cv: 20, kw: 15, frame: '160M', carcaca: 'W22 IR3 Premium', torque: 82.0, rpm_motor: 1750, codigo: '11405420', link: wegBusca('W22 IR3 Premium 20 cv 4P 160M 60Hz') },
  { cv: 25, kw: 18.5, frame: '160L', carcaca: 'W22 IR3 Premium', torque: 101, rpm_motor: 1755, codigo: '11401241', link: wegBusca('W22 IR3 Premium 25 cv 4P 160L 60Hz') },
  { cv: 30, kw: 22, frame: '180M', carcaca: 'W22 IR3 Premium', torque: 120, rpm_motor: 1755, codigo: '11340931', link: wegBusca('W22 IR3 Premium 30 cv 4P 180M 60Hz') },
  { cv: 40, kw: 30, frame: '200M', carcaca: 'W22 IR3 Premium', torque: 163, rpm_motor: 1760, codigo: '11280268', link: wegBusca('W22 IR3 Premium 40 cv 4P 200M 60Hz') },
  { cv: 50, kw: 37, frame: '200L', carcaca: 'W22 IR3 Premium', torque: 201, rpm_motor: 1760, codigo: '11413374', link: wegBusca('W22 IR3 Premium 50 cv 4P 200L 60Hz') },
  { cv: 60, kw: 45, frame: '225S/M', carcaca: 'W22 IR3 Premium', torque: 244, rpm_motor: 1760, codigo: '11277442', link: wegBusca('W22 IR3 Premium 60 cv 4P 225S 60Hz') },
  { cv: 75, kw: 55, frame: '225S/M', carcaca: 'W22 IR3 Premium', torque: 298, rpm_motor: 1765, codigo: '11094315', link: wegBusca('W22 IR3 Premium 75 cv 4P 225S 60Hz') },
  { cv: 100, kw: 75, frame: '250S/M', carcaca: 'W22 IR3 Premium', torque: 406, rpm_motor: 1765, codigo: '11094316', link: wegBusca('W22 IR3 Premium 100 cv 4P 250S 60Hz') },
];

// =====================================================================
// SELECIONAR MOTORREDUTOR WEG conforme CV calculado
// Retorna o modelo exato + o imediatamente acima (alternativa)
// =====================================================================
function selecionarMotorWEG(cv_necessario) {
  const idx = MOTORREDUTORES_WEG.findIndex(m => m.cv >= cv_necessario);
  if (idx === -1) return { principal: MOTORREDUTORES_WEG[MOTORREDUTORES_WEG.length - 1], alternativa: null };
  const principal = MOTORREDUTORES_WEG[idx];
  const alternativa = MOTORREDUTORES_WEG[idx + 1] || null;
  return { principal, alternativa };
}

// =====================================================================
// HELPER: parseDecimal — aceita vírgula (1,5) ou ponto (1.5)
// =====================================================================
function parseDecimal(val) {
  if (val === null || val === undefined) return NaN;
  return parseFloat(String(val).trim().replace(',', '.'));
}

// =====================================================================
// HELPER: formatar número BR
// =====================================================================
function fmtN(valor, decimais = 2) {
  return isNaN(valor) ? '—' : valor.toFixed(decimais).replace('.', ',');
}

// =====================================================================
// CÁLCULO PRINCIPAL
// =====================================================================
function calcular() {
  const tag = document.getElementById('tag').value || '—';
  const Q_proj = parseDecimal(document.getElementById('capacidade').value);
  const gamma = parseDecimal(document.getElementById('densidade').value);
  const H = parseDecimal(document.getElementById('altura').value);
  const v = parseDecimal(document.getElementById('velocidade').value);
  const CF1 = parseDecimal(document.getElementById('cf1').value);
  const CF2 = parseDecimal(document.getElementById('cf2').value);
  const Tu = parseDecimal(document.getElementById('tu').value);
  const pTad_max = parseDecimal(document.getElementById('ptad').value) || 75;
  const pTad_min = 50;

  // ---- VALIDAÇÕES ----
  const erros = [];
  if (isNaN(Q_proj) || Q_proj <= 0) erros.push('Capacidade de projeto');
  if (isNaN(gamma) || gamma <= 0) erros.push('Peso específico');
  if (isNaN(H) || H <= 0) erros.push('Altura do elevador');
  if (isNaN(v) || v <= 0) erros.push('Velocidade da correia');
  if (isNaN(CF1) || CF1 <= 0) erros.push('CF1');
  if (isNaN(CF2) || CF2 <= 0) erros.push('CF2');
  if (!canecaSelecionada) erros.push('Caneca (selecione na tabela)');

  if (erros.length > 0) {
    document.getElementById('resultado').innerHTML = `
      <div class="alerta erro animate-in">
        <i class="fas fa-exclamation-circle"></i>
        <div><strong>Campos obrigatórios não preenchidos:</strong><br>${erros.join(', ')}</div>
      </div>`;
    return;
  }

  const c = canecaSelecionada;
  const V_75 = c.vol75;       // litros a 75%
  const passo = c.passo;       // mm
  const corrPol = c.correiaPol;  // largura da correia em polegadas
  const tambor = c.tambor;      // diâmetro do tambor em mm
  const n_fil = 1;             // 1 fileira de canecas (padrão)

  // ---- 1. CAPACIDADE ----
  // Q = 3600 * V(m³) * n * v * CF1 * CF2 * γ / e(m)
  const V_m3 = V_75 / 1000;        // L → m³
  const e_m = passo / 1000;       // mm → m
  const Q_m3h = (3600 * V_m3 * n_fil * v * CF1 * CF2) / e_m;
  const Q_th = Q_m3h * gamma;

  // ---- 2. PESO POR METRO DE MATERIAL ----
  // Pm = 1000 * n * γ * V / e
  const Pm = (1000 * n_fil * gamma * V_75) / passo; // kg/m

  // ---- 3. COMPRIMENTO DA CORREIA (aberta) ----
  // Ca = π * D + 2 * H
  const D_tambor = tambor / 1000;   // mm → m
  const Ca = Math.PI * D_tambor + 2 * H;

  // ---- 4. TENSÕES DA CORREIA ----
  // Estimativa do peso da correia por metro (baseado na largura em pol)
  const Pc = corrPol * 0.35;        // kg/m (estimativa)

  // Tensão lado tenso: Tt = (Pm + Pc) * H * fator_atrito
  const Tt = (Pm + Pc) * H * 1.25;
  const corr_largura_mm = corrPol * 25.4;

  // Número mínimo de lonas
  const Nm = Tt / (Tu * (corr_largura_mm / 10));
  const Nm_min = Math.ceil(Nm);
  const Nm_rec = Math.max(4, Nm_min);

  // %Tad calculado — limites conforme entrada do usuário
  const pTad_calc = (Tt / (Tu * (corr_largura_mm / 10) * Nm_rec)) * 100;
  const pTad_ok = pTad_calc >= pTad_min && pTad_calc <= pTad_max;

  // Diâmetro mínimo do rolo (referência prática)
  const D_rolo_calc = (corr_largura_mm + 100) / 1000; // m

  // ---- 5. POTÊNCIA ----
  // Ne = (Q * H * g) / (3600 * η) — usa o maior entre calculado e projeto
  const eta = 0.85;
  const Q_ne = Math.max(Q_th, Q_proj); // garante motor não subdimensionado
  const Ne_kw = (Q_ne * H * 9.81) / (3600 * eta);
  const Ne_proj = Ne_kw * 1.20;     // fator de segurança 20%
  const Ne_cv = Ne_proj / 0.7355;

  // Seleção WEG
  const { principal: weg, alternativa: wegAlt } = selecionarMotorWEG(Ne_cv);

  // ---- 6. ALERTAS ----
  const alertas = [];
  if (Q_th < Q_proj * 0.95)
    alertas.push(`Capacidade calculada (${Q_th.toFixed(1)} t/h) abaixo do projeto (${Q_proj.toFixed(1)} t/h). Considere caneca maior ou maior velocidade.`);
  if (v < 1.2 || v > 2.5)
    alertas.push('Velocidade fora da faixa recomendada (1,2 – 2,5 m/s para elevadores centrífugos).');
  if (pTad_calc > pTad_max)
    alertas.push(`%Tad calculado (${pTad_calc.toFixed(1)}%) acima do limite máximo (${pTad_max}%). Aumente o número de lonas ou use correia de maior resistência.`);
  if (pTad_calc < pTad_min)
    alertas.push(`%Tad calculado (${pTad_calc.toFixed(1)}%) abaixo do mínimo recomendado (${pTad_min}%). O número de lonas pode estar superdimensionado.`);
  if (CF1 > 1.0)
    alertas.push('CF1 > 1,0 não é recomendado. Utilize no máximo 1,0.');

  // ---- RENDERIZAR RESULTADO ----
  const corStatus = pTad_ok ? 'ok' : 'warn';
  const elResultado = document.getElementById('resultado');

  elResultado.innerHTML = `
    <div class="res-tag animate-in">
      <i class="fas fa-tag"></i>${tag}
    </div>

    <!-- Cards principais -->
    <div class="res-grid animate-in">
      <div class="res-card">
        <div class="lbl"><i class="fas fa-tachometer-alt" style="margin-right:5px"></i>Capacidade m³/h</div>
        <div class="val">${fmtN(Q_m3h, 1)}</div>
        <div class="val-unit">m³/h</div>
      </div>
      <div class="res-card verde">
        <div class="lbl"><i class="fas fa-weight-hanging" style="margin-right:5px"></i>Capacidade t/h</div>
        <div class="val">${fmtN(Q_th, 1)}</div>
        <div class="val-unit">t/h &nbsp;(proj: ${fmtN(Q_proj, 1)} t/h)</div>
      </div>
      <div class="res-card azul">
        <div class="lbl"><i class="fas fa-ruler-vertical" style="margin-right:5px"></i>Peso por metro</div>
        <div class="val">${fmtN(Pm, 2)}</div>
        <div class="val-unit">kg/m de material elevado</div>
      </div>
      <div class="res-card amarelo">
        <div class="lbl"><i class="fas fa-circle-notch" style="margin-right:5px"></i>Comp. Correia (aberta)</div>
        <div class="val">${fmtN(Ca, 2)}</div>
        <div class="val-unit">metros</div>
      </div>
    </div>

    <!-- Caneca selecionada -->
    <div class="caneca-result-box animate-in">
      <h4><i class="fas fa-archive" style="margin-right:6px"></i>Caneca Selecionada</h4>
      <div class="caneca-specs">
        <div class="caneca-spec-item">
          <div class="sv">${c.largura} mm</div>
          <div class="sk">Largura</div>
        </div>
        <div class="caneca-spec-item">
          <div class="sv">${fmtN(c.vol75, 3)} L</div>
          <div class="sk">Volume 75%</div>
        </div>
        <div class="caneca-spec-item">
          <div class="sv">${c.passo} mm</div>
          <div class="sk">Passo</div>
        </div>
        <div class="caneca-spec-item">
          <div class="sv">${c.correiaPol}"</div>
          <div class="sk">Correia (pol)</div>
        </div>
        <div class="caneca-spec-item">
          <div class="sv">Ø${c.tambor} mm</div>
          <div class="sk">Tambor</div>
        </div>
        <div class="caneca-spec-item">
          <div class="sv">${fmtN(c.cap150, 1)} t/h</div>
          <div class="sk">Cap. ref. 1,5 m/s</div>
        </div>
      </div>
    </div>

    <!-- Tensões da correia -->
    <div class="tensoes-box animate-in">
      <h4><i class="fas fa-compress-arrows-alt" style="margin-right:6px"></i>Tensões da Correia</h4>
      <div class="tensoes-row">
        <span class="tkey">Resistência selecionada (Tu)</span>
        <span class="tval">${Tu} kgf/cm.lona</span>
      </div>
      <div class="tensoes-row">
        <span class="tkey">Tensão lado tenso estimada (Tt)</span>
        <span class="tval">${fmtN(Tt, 1)} kgf</span>
      </div>
      <div class="tensoes-row">
        <span class="tkey">Nº mínimo de lonas calculado</span>
        <span class="tval">${fmtN(Nm, 2)}</span>
      </div>
      <div class="tensoes-row">
        <span class="tkey">Nº de lonas recomendado</span>
        <span class="tval">${Nm_rec} lonas</span>
      </div>
      <div class="tensoes-row">
        <span class="tkey">%Tad calculado (mín 50%, máx 75%)</span>
        <span class="tval ${corStatus}">${fmtN(pTad_calc, 1)}% ${pTad_ok ? '✓' : '⚠'}</span>
      </div>
      <div class="tensoes-row">
        <span class="tkey">Diâmetro mínimo do rolo (referência)</span>
        <span class="tval">${fmtN(D_rolo_calc * 1000, 0)} mm</span>
      </div>
    </div>

    <!-- Motor WEG -->
    <div class="weg-box animate-in">
      <div class="weg-header">
        <div class="weg-logo-wrap">
          <i class="fas fa-bolt"></i>
          <span>Seleção WEG Sugerida</span>
        </div>
        <a href="${wegLink(weg.codigo)}" target="_blank" rel="noopener" class="weg-btn-catalogo">
          <i class="fas fa-search"></i> Buscar no Catálogo WEG
        </a>
      </div>

      <div class="weg-principal">
        <div class="weg-cv">${weg.cv} CV <span class="weg-kw">(${weg.kw} kW)</span></div>
        <div class="weg-modelo">${weg.carcaca} &nbsp;·&nbsp; Carcaça ${weg.frame} &nbsp;·&nbsp; 4 Polos / 60 Hz</div>
        <div class="weg-modelo">Torque nominal ≈ ${weg.torque} N·m &nbsp;·&nbsp; ${weg.rpm_motor} rpm</div>
        <div class="weg-modelo" style="margin-top:4px">
          <i class="fas fa-barcode" style="margin-right:5px;opacity:.7"></i>
          Código WEG: <strong style="letter-spacing:.5px">${weg.codigo}</strong>
          <span style="font-size:11px;opacity:.65;margin-left:6px">(use para localizar no site ou junto ao seu distribuidor)</span>
        </div>
        <div class="weg-ne">Potência calculada: <strong>${fmtN(Ne_cv, 1)} CV</strong> &nbsp;·&nbsp; fator de serviço aplicado: 1,20</div>
      </div>

      <div class="weg-specs-grid">
        <div class="weg-spec">
          <div class="weg-spec-label">Potência calculada</div>
          <div class="weg-spec-val">${fmtN(Ne_kw, 2)} kW</div>
        </div>
        <div class="weg-spec">
          <div class="weg-spec-label">Com fs 1,20</div>
          <div class="weg-spec-val">${fmtN(Ne_proj, 2)} kW</div>
        </div>
        <div class="weg-spec">
          <div class="weg-spec-label">Motor sugerido</div>
          <div class="weg-spec-val">${weg.cv} CV / ${weg.kw} kW</div>
        </div>
        <div class="weg-spec">
          <div class="weg-spec-label">Folga de potência</div>
          <div class="weg-spec-val">${fmtN(((weg.kw / Ne_proj) - 1) * 100, 1)}%</div>
        </div>
      </div>

      ${wegAlt ? `
      <div class="weg-alternativa">
        <span class="weg-alt-label"><i class="fas fa-layer-group"></i> Alternativa imediatamente superior:</span>
        <a href="${wegLink(wegAlt.codigo)}" target="_blank" rel="noopener" class="weg-alt-link">
          ${wegAlt.cv} CV — ${wegAlt.carcaca} ${wegAlt.frame}
          &nbsp;<span style="opacity:.7;font-size:11px">(cód. ${wegAlt.codigo})</span>
          &nbsp;→&nbsp; Buscar no catálogo WEG
        </a>
      </div>` : ''}
    </div>

    ${alertas.map(a => `
      <div class="alerta animate-in">
        <i class="fas fa-exclamation-triangle"></i>
        <span>⚠️ ${a}</span>
      </div>`).join('')}

    <hr class="sep">
    <div class="formulas-rodape">
      <strong>Fórmulas aplicadas:</strong><br>
      Q = 3600 · V · n · v · CF1 · CF2 · γ / e &nbsp;|&nbsp;
      Pm = 1000 · n · γ · V / e &nbsp;|&nbsp;
      Ca = π · D + 2H &nbsp;|&nbsp;
      Ne = (Q · H · 9,81) / (3600 · η)
    </div>

    <button class="btn-pdf animate-in" onclick="gerarPDF()">
      <i class="fas fa-file-pdf"></i> Gerar Relatório PDF
    </button>
  `;

  // Salvar no histórico
  salvarHistorico({
    tag, data: new Date().toLocaleString('pt-BR'),
    Q_proj: fmtN(Q_proj, 1), Q_th: fmtN(Q_th, 1), Q_m3h: fmtN(Q_m3h, 1),
    gamma: fmtN(gamma, 2), H: fmtN(H, 1), v: fmtN(v, 3),
    CF1: fmtN(CF1, 3), CF2: fmtN(CF2, 2), Tu,
    caneca: `${c.largura}mm / ${c.altura}mm`,
    Pm: fmtN(Pm, 2), Ca: fmtN(Ca, 2),
    Nm_rec, pTad_calc: fmtN(pTad_calc, 1),
    motor: `${weg.cv} CV — ${weg.carcaca} ${weg.frame}`,
    Ne_cv: fmtN(Ne_cv, 1), Ne_proj: fmtN(Ne_proj, 2),
  });

  // Salvar dados técnicos para uso no orçamento
  window._ultimoCalculo = {
    tag, Q_proj, Q_th, gamma, H, v, CF1, CF2, Tu,
    c, Nm_rec, Ca, Ne_kw, Ne_proj, Ne_cv,
    weg, corrLarguraMm: corr_largura_mm,
  };
  // Atualizar painel de orçamento com resumo técnico
  sincronizarResumoOrcamento();

  // Scroll suave até o resultado em mobile
  elResultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =====================================================================
// ORÇAMENTO — ESTIMATIVA DE CUSTOS
// Referências de mercado brasileiro (valores médios em R$, base 2024-2025)
// =====================================================================

// Tabela base de preços unitários por componente
// Os valores são por unidade (salvo quando indicado por metro ou CV)
const ORC_PRECOS = {
  // Estrutura metálica: R$/metro de altura (tubo + chapa + travessas)
  estrutura_por_metro: 1850,

  // Correia: R$/metro (por polegada de largura como fator)
  correia_por_metro_por_pol: 38,

  // Canecas: R$/unidade (estimativa por tamanho — passo em mm como fator)
  caneca_base: 18,           // R$ base por caneca
  caneca_por_100mm_passo: 4, // adicional por 100mm de passo

  // Tambor motriz + esticador (par): R$ base + fator por diâmetro
  tambores_base: 4800,
  tambores_por_mm_diametro: 8.5,

  // Mancais (2 pares): R$ base + fator por diâmetro do tambor
  mancais_base: 1200,
  mancais_por_mm_diametro: 1.8,

  // Motor WEG W22 IR3 Premium: R$/CV (escala regressiva)
  motor_ate10cv: 680,
  motor_10a30cv: 550,
  motor_30a75cv: 430,
  motor_acima75cv: 360,

  // Redutor (acoplado ao motor): R$/kW
  redutor_por_kw: 210,

  // Chave de partida / inversor de frequência: R$/CV
  partida_por_cv: 95,

  // Painel elétrico + cabeamento: R$/CV + base
  painel_base: 2200,
  painel_por_cv: 55,

  // Caçamba de alimentação (boot): R$ fixo + fator altura
  boot_base: 3600,
  boot_por_metro_altura: 60,

  // Cabeçote (head) + calha de descarga
  cabecote_base: 4200,
  cabecote_por_metro_altura: 45,

  // Inspeção + telas de acesso (por andaime / trecho de 3m)
  acesso_por_trecho3m: 750,

  // Pintura industrial (por m² — estimado pela estrutura)
  pintura_por_m2: 65,
};

// ---- Auxiliar: formata valor em R$ ----
function fmtBRL(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// ---- Sincroniza o resumo técnico no painel de orçamento ----
function sincronizarResumoOrcamento() {
  const aviso = document.getElementById('orc-aviso-calc');
  const resumo = document.getElementById('orc-resumo-tecnico');
  const grid = document.getElementById('orc-resumo-grid');
  if (!aviso || !resumo || !grid) return;

  const uc = window._ultimoCalculo;
  if (!uc) return;

  aviso.style.display = 'none';
  resumo.style.display = 'block';

  grid.innerHTML = [
    { lbl: 'Elevador / TAG', val: uc.tag },
    { lbl: 'Altura (cc)', val: `${fmtN(uc.H, 1)} m` },
    { lbl: 'Capacidade', val: `${fmtN(uc.Q_th, 1)} t/h` },
    { lbl: 'Caneca', val: `${uc.c.largura} × ${uc.c.altura} mm` },
    { lbl: 'Correia', val: `${uc.c.correiaPol}" / ${uc.Nm_rec} lonas` },
    { lbl: 'Motor sugerido', val: `${uc.weg.cv} CV / ${uc.weg.kw} kW` },
  ].map(it => `
    <div class="orc-resumo-item">
      <span class="ori-lbl">${it.lbl}</span>
      <span class="ori-val">${it.val}</span>
    </div>
  `).join('');
}

// ---- Calcula preço do motor conforme CV ----
function precoPorCV(cv) {
  const p = ORC_PRECOS;
  if (cv <= 10) return cv * p.motor_ate10cv;
  if (cv <= 30) return cv * p.motor_10a30cv;
  if (cv <= 75) return cv * p.motor_30a75cv;
  return cv * p.motor_acima75cv;
}

// ---- FUNÇÃO PRINCIPAL DO ORÇAMENTO ----
function gerarOrcamento() {
  const uc = window._ultimoCalculo;
  const elRes = document.getElementById('orc-resultado');

  if (!uc) {
    elRes.innerHTML = `
      <div class="alerta erro animate-in">
        <i class="fas fa-exclamation-circle"></i>
        <div><strong>Cálculo não encontrado.</strong> Execute o cálculo do elevador primeiro e depois gere o orçamento.</div>
      </div>`;
    return;
  }

  const regiao = parseDecimal(document.getElementById('orc-regiao').value) || 1.00;
  const cambio = parseDecimal(document.getElementById('orc-cambio').value) || 5.70;
  const contingPct = parseDecimal(document.getElementById('orc-contingencia').value) || 0.15;
  const montagemPct = parseDecimal(document.getElementById('orc-montagem').value) || 0;
  const fretePct = parseDecimal(document.getElementById('orc-frete').value) || 0;

  const p = ORC_PRECOS;
  const H = uc.H;
  const c = uc.c;
  const cv = uc.weg.cv;
  const kw = uc.weg.kw;

  // Número estimado de canecas: Ca / (passo em m)
  const nCanecas = Math.ceil((uc.Ca / (c.passo / 1000)) * 1.05); // +5% sobressalente

  // Comprimento da correia com sobra de emenda
  const corrMetros = uc.Ca * 1.05;

  // Metros de correia × pol largura (fator)
  const custoCorreia = corrMetros * c.correiaPol * p.correia_por_metro_por_pol;

  // Canecas
  const precoCaneca = p.caneca_base + (c.passo / 100) * p.caneca_por_100mm_passo;
  const custoCanecas = nCanecas * precoCaneca;

  // Estrutura metálica
  const custoEstrutura = H * p.estrutura_por_metro;

  // Tambores
  const custoTambores = p.tambores_base + c.tambor * p.tambores_por_mm_diametro;

  // Mancais
  const custoMancais = p.mancais_base + c.tambor * p.mancais_por_mm_diametro;

  // Motor
  const custoMotor = precoPorCV(cv);

  // Redutor
  const custoRedutor = kw * p.redutor_por_kw;

  // Partida / inversor
  const custoPartida = cv * p.partida_por_cv;

  // Painel elétrico
  const custoPainel = p.painel_base + cv * p.painel_por_cv;

  // Boot (caçamba alimentação)
  const custoBoot = p.boot_base + H * p.boot_por_metro_altura;

  // Cabeçote
  const custoCabecote = p.cabecote_base + H * p.cabecote_por_metro_altura;

  // Acesso / inspeção
  const trechos = Math.ceil(H / 3);
  const custoAcesso = trechos * p.acesso_por_trecho3m;

  // Pintura (estimativa área estrutura)
  const m2Estimado = H * (c.largura / 1000 + 0.6) * 2;
  const custoPintura = m2Estimado * p.pintura_por_m2;

  // Aplicar fator regional
  const itens = [
    { nome: 'Estrutura Metálica', icone: 'fa-industry', val: custoEstrutura, det: `${fmtN(H, 1)} m altura × R$ ${p.estrutura_por_metro.toLocaleString('pt-BR')}/m` },
    { nome: 'Correia', icone: 'fa-grip-lines', val: custoCorreia, det: `${fmtN(corrMetros, 1)} m × ${c.correiaPol}" larg.` },
    { nome: `Canecas (×${nCanecas})`, icone: 'fa-archive', val: custoCanecas, det: `${c.largura}×${c.altura} mm — ${fmtBRL(precoCaneca)}/un. +5% sobress.` },
    { nome: 'Tambores (par)', icone: 'fa-circle-notch', val: custoTambores, det: `Ø${c.tambor} mm motriz + esticador` },
    { nome: 'Mancais', icone: 'fa-dot-circle', val: custoMancais, det: '2 pares — compatível com o tambor' },
    { nome: `Motor ${cv} CV WEG W22`, icone: 'fa-bolt', val: custoMotor, det: `${cv} CV / ${kw} kW — W22 IR3 Premium` },
    { nome: 'Redutor', icone: 'fa-cogs', val: custoRedutor, det: `${fmtN(kw, 1)} kW saída` },
    { nome: 'Partida / Inversor', icone: 'fa-plug', val: custoPartida, det: `${cv} CV` },
    { nome: 'Painel Elétrico', icone: 'fa-th-large', val: custoPainel, det: 'Painel CCM + cabeamento estimado' },
    { nome: 'Boot / Alimentação', icone: 'fa-funnel-dollar', val: custoBoot, det: `Caçamba + guia de entrada — ${fmtN(H, 1)} m` },
    { nome: 'Cabeçote + Descarga', icone: 'fa-layer-group', val: custoCabecote, det: 'Calha de saída + vedação' },
    { nome: 'Acesso / Inspeção', icone: 'fa-ladder', val: custoAcesso, det: `${trechos} trechos de 3 m` },
    { nome: 'Pintura Industrial', icone: 'fa-paint-roller', val: custoPintura, det: `≈ ${fmtN(m2Estimado, 0)} m² — primer + esmalte` },
  ].map(it => ({ ...it, val: it.val * regiao }));

  const subtotal = itens.reduce((s, it) => s + it.val, 0);
  const contingencia = subtotal * contingPct;
  const montagem = subtotal * montagemPct;
  const frete = subtotal * fretePct;
  const total = subtotal + contingencia + montagem + frete;
  const totalMin = total * 0.85;
  const totalMax = total * 1.20;

  // Cores para o gráfico de barras
  const CORES = [
    '#003D58', '#005578', '#F37021', '#1db87e', '#1a78b8',
    '#f5a623', '#7b2d8b', '#e53935', '#00796b', '#6d4c41',
    '#455a64', '#546e7a', '#78909c',
  ];

  const itensPorcentagem = itens.map(it => ({ ...it, pct: (it.val / subtotal) * 100 }));
  const itensOrdenados = [...itensPorcentagem].sort((a, b) => b.val - a.val);

  elRes.innerHTML = `
    <!-- Total geral -->
    <div class="orc-total-box animate-in">
      <div class="orc-total-lbl"><i class="fas fa-receipt" style="margin-right:6px"></i>Estimativa Total do Elevador</div>
      <div class="orc-total-val">${fmtBRL(total)}</div>
      <div class="orc-total-range">Faixa: ${fmtBRL(totalMin)} — ${fmtBRL(totalMax)}</div>
      <div class="orc-total-aviso">
        <i class="fas fa-info-circle"></i>
        Valores de referência de mercado, base 2024-2025. Não substitui cotação formal.
      </div>
    </div>

    <!-- Composição de custos (gráfico de barras) -->
    <div class="orc-grafico animate-in">
      <div class="orc-grafico-titulo"><i class="fas fa-chart-bar" style="margin-right:5px"></i>Composição por Item (% do subtotal)</div>
      <div class="orc-barra-wrap">
        ${itensOrdenados.map((it, i) => `
          <div class="orc-barra-row">
            <div class="orc-barra-lbl" title="${it.nome}">${it.nome}</div>
            <div class="orc-barra-track">
              <div class="orc-barra-fill" style="width:${it.pct.toFixed(1)}%;background:${CORES[i % CORES.length]}"></div>
            </div>
            <div class="orc-barra-pct">${it.pct.toFixed(0)}%</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Itens detalhados -->
    <div class="orc-itens animate-in">
      ${itensPorcentagem.map((it, i) => `
        <div class="orc-item">
          <div class="orc-item-icon" style="background:${CORES[i % CORES.length]}22;color:${CORES[i % CORES.length]}">
            <i class="fas ${it.icone}"></i>
          </div>
          <div class="orc-item-info">
            <div class="orc-item-nome">${it.nome}</div>
            <div class="orc-item-detalhe">${it.det}</div>
          </div>
          <div>
            <div class="orc-item-val">${fmtBRL(it.val)}</div>
            <div class="orc-item-pct">${it.pct.toFixed(1)}%</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Subtotal + adicionais -->
    <div class="orc-subtotal animate-in">
      <span class="orc-sub-lbl">Subtotal Equipamentos</span>
      <span class="orc-sub-val">${fmtBRL(subtotal)}</span>
    </div>

    ${(contingencia + montagem + frete) > 0 ? `
    <div class="orc-adicionais animate-in">
      <div class="orc-adicionais-titulo"><i class="fas fa-plus-circle" style="margin-right:5px"></i>Adicionais aplicados</div>
      ${contingencia > 0 ? `
      <div class="orc-adicional-row">
        <span class="oa-lbl"><i class="fas fa-shield-alt" style="margin-right:5px"></i>Contingência (${(contingPct * 100).toFixed(0)}%)</span>
        <span class="oa-val">+ ${fmtBRL(contingencia)}</span>
      </div>` : ''}
      ${montagem > 0 ? `
      <div class="orc-adicional-row">
        <span class="oa-lbl"><i class="fas fa-hard-hat" style="margin-right:5px"></i>Montagem (${(montagemPct * 100).toFixed(0)}%)</span>
        <span class="oa-val">+ ${fmtBRL(montagem)}</span>
      </div>` : ''}
      ${frete > 0 ? `
      <div class="orc-adicional-row">
        <span class="oa-lbl"><i class="fas fa-truck" style="margin-right:5px"></i>Frete / Logística (${(fretePct * 100).toFixed(0)}%)</span>
        <span class="oa-val">+ ${fmtBRL(frete)}</span>
      </div>` : ''}
    </div>` : ''}

    <!-- Total final reforçado -->
    <div class="orc-subtotal animate-in" style="background:var(--azul);border-color:var(--azul);padding:12px 14px">
      <span class="orc-sub-lbl" style="color:#a0beca;font-size:.8125rem">TOTAL ESTIMADO</span>
      <span class="orc-sub-val" style="color:var(--branco);font-size:1.25rem">${fmtBRL(total)}</span>
    </div>

    <!-- Disclaimer -->
    <div class="orc-disclaimer animate-in">
      <i class="fas fa-exclamation-circle"></i>
      <strong>Aviso:</strong> Este orçamento é uma estimativa paramétrica baseada em preços médios de mercado
      (referência: Sul/Sudeste do Brasil, 2024-2025). Os valores reais podem variar conforme fornecedor, prazo,
      especificações técnicas detalhadas, acabamento e condições comerciais. Utilize como referência preliminar
      e solicite cotações formais antes de qualquer decisão de investimento.
    </div>
  `;
}

// =====================================================================
// INICIALIZAÇÃO
// =====================================================================
preencherTabela();

// =====================================================================
// HISTÓRICO DE CÁLCULOS — localStorage
// =====================================================================
const HIST_KEY = 'elev_historico_v1';

function salvarHistorico(dados) {
  const hist = carregarHistorico();
  hist.unshift(dados); // mais recente primeiro
  if (hist.length > 20) hist.pop(); // máximo 20 registros
  localStorage.setItem(HIST_KEY, JSON.stringify(hist));
}

function carregarHistorico() {
  try { return JSON.parse(localStorage.getItem(HIST_KEY)) || []; }
  catch { return []; }
}

// Verificar se há dados para restaurar vindos da página de histórico
(function restaurarSessao() {
  const raw = sessionStorage.getItem('elev_restaurar');
  if (!raw) return;
  sessionStorage.removeItem('elev_restaurar');
  try {
    const h = JSON.parse(raw);
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    set('tag', h.tag === '—' ? '' : h.tag);
    set('capacidade', h.Q_proj);
    set('densidade', h.gamma);
    set('altura', h.H);
    set('velocidade', h.v);
    set('cf1', h.CF1);
    set('cf2', h.CF2);
    set('tu', h.Tu);
    document.getElementById('resultado').innerHTML = `
      <div class="alerta info animate-in">
        <i class="fas fa-info-circle"></i>
        <span>Dados do cálculo <strong>${h.tag}</strong> restaurados do histórico.
        Selecione a caneca na tabela e clique em <strong>Calcular</strong> para recalcular.</span>
      </div>`;
  } catch (e) { console.warn('Erro ao restaurar sessão:', e); }
})();

function restaurarCalculo(idx) {
  const h = carregarHistorico()[idx];
  if (!h) return;
  sessionStorage.setItem('elev_restaurar', JSON.stringify(h));
  window.location.href = 'index.html';
}

// =====================================================================
// PÁGINA HISTÓRICO — tabela completa
// =====================================================================

function renderizar() {
  const hist = carregarHistorico();
  const wrap = document.getElementById('hist-wrap');
  const count = document.getElementById('count-texto');
  if (!wrap || !count) return;

  count.innerHTML = hist.length === 0
    ? 'Nenhum cálculo salvo ainda.'
    : `<strong>${hist.length}</strong> cálculo${hist.length > 1 ? 's' : ''} salvo${hist.length > 1 ? 's' : ''}`;

  if (hist.length === 0) {
    wrap.innerHTML = `
      <div class="hist-vazio-full">
        <i class="fas fa-history"></i>
        <p>Nenhum cálculo foi realizado ainda.<br>Volte para a calculadora e faça seu primeiro dimensionamento.</p>
        <a href="index.html"><i class="fas fa-calculator"></i> Ir para a Calculadora</a>
      </div>`;
    return;
  }

  const linhas = hist.map((h, i) => `
    <tr onclick="toggleDetalhe(${i})" style="cursor:pointer">
      <td class="td-tag">${h.tag}</td>
      <td class="td-data">${h.data}</td>
      <td><strong>${h.Q_th}</strong> t/h</td>
      <td class="col-oculta-mobile">${h.Q_m3h} m³/h</td>
      <td class="col-oculta-mobile">${h.H} m</td>
      <td class="col-oculta-mobile">${h.caneca}</td>
      <td>
        ${parseFloat(h.pTad_calc) <= 75
      ? `<span class="badge-status badge-ok"><i class="fas fa-check"></i> ${h.pTad_calc}%</span>`
      : `<span class="badge-status badge-warn"><i class="fas fa-exclamation-triangle"></i> ${h.pTad_calc}%</span>`
    }
      </td>
      <td class="col-oculta-mobile">${h.motor}</td>
      <td>
        <div class="td-acoes">
          <a href="index.html" class="btn-row" onclick="usarCalculo(${i}, event)">
            <i class="fas fa-redo"></i> Usar
          </a>
          <button class="btn-row danger" onclick="excluirCalculo(${i}, event)">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </td>
    </tr>
    <tr class="detail-row" id="detail-${i}" style="display:none">
      <td colspan="9">
        <div class="detail-inner">
          <div class="detail-item"><div class="di-lbl">Capacidade de Projeto</div><div class="di-val">${h.Q_proj} t/h</div></div>
          <div class="detail-item"><div class="di-lbl">Cap. Calculada (t/h)</div><div class="di-val">${h.Q_th} t/h</div></div>
          <div class="detail-item"><div class="di-lbl">Cap. Calculada (m³/h)</div><div class="di-val">${h.Q_m3h} m³/h</div></div>
          <div class="detail-item"><div class="di-lbl">Peso Específico (γ)</div><div class="di-val">${h.gamma} t/m³</div></div>
          <div class="detail-item"><div class="di-lbl">Altura (cc)</div><div class="di-val">${h.H} m</div></div>
          <div class="detail-item"><div class="di-lbl">Velocidade</div><div class="di-val">${h.v} m/s</div></div>
          <div class="detail-item"><div class="di-lbl">CF1</div><div class="di-val">${h.CF1}</div></div>
          <div class="detail-item"><div class="di-lbl">CF2</div><div class="di-val">${h.CF2}</div></div>
          <div class="detail-item"><div class="di-lbl">Tu</div><div class="di-val">${h.Tu} kgf/cm</div></div>
          <div class="detail-item"><div class="di-lbl">Caneca</div><div class="di-val">${h.caneca}</div></div>
          <div class="detail-item"><div class="di-lbl">Pm (kg/m)</div><div class="di-val">${h.Pm}</div></div>
          <div class="detail-item"><div class="di-lbl">Comp. Correia</div><div class="di-val">${h.Ca} m</div></div>
          <div class="detail-item"><div class="di-lbl">Lonas rec.</div><div class="di-val">${h.Nm_rec}</div></div>
          <div class="detail-item"><div class="di-lbl">%Tad calc.</div><div class="di-val">${h.pTad_calc}%</div></div>
          <div class="detail-item"><div class="di-lbl">Potência</div><div class="di-val">${h.Ne_cv} CV</div></div>
          <div class="detail-item"><div class="di-lbl">Motor WEG</div><div class="di-val">${h.motor}</div></div>
        </div>
      </td>
    </tr>
  `).join('');

  wrap.innerHTML = `
    <table class="hist-table">
      <thead>
        <tr>
          <th><i class="fas fa-tag"></i> TAG</th>
          <th><i class="fas fa-clock"></i> Data/Hora</th>
          <th><i class="fas fa-weight-hanging"></i> Cap. (t/h)</th>
          <th class="col-oculta-mobile"><i class="fas fa-tachometer-alt"></i> Cap. (m³/h)</th>
          <th class="col-oculta-mobile"><i class="fas fa-arrows-alt-v"></i> Altura</th>
          <th class="col-oculta-mobile"><i class="fas fa-archive"></i> Caneca</th>
          <th><i class="fas fa-chart-line"></i> %Tad</th>
          <th class="col-oculta-mobile"><i class="fas fa-bolt"></i> Motor</th>
          <th><i class="fas fa-cog"></i> Ações</th>
        </tr>
      </thead>
      <tbody>${linhas}</tbody>
    </table>`;
}

function toggleDetalhe(i) {
  const row = document.getElementById(`detail-${i}`);
  if (!row) return;
  row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
}

function usarCalculo(i, event) {
  event.stopPropagation();
  const h = carregarHistorico()[i];
  if (!h) return;
  sessionStorage.setItem('elev_restaurar', JSON.stringify(h));
  window.location.href = 'index.html';
}

function excluirCalculo(i, event) {
  event.stopPropagation();
  if (!confirm('Remover este cálculo do histórico?')) return;
  const hist = carregarHistorico();
  hist.splice(i, 1);
  localStorage.setItem(HIST_KEY, JSON.stringify(hist));
  renderizar();
}

function limparTudo() {
  if (!confirm('Deseja apagar todo o histórico de cálculos? Esta ação não pode ser desfeita.')) return;
  localStorage.removeItem(HIST_KEY);
  renderizar();
}

function exportarCSV() {
  const hist = carregarHistorico();
  if (hist.length === 0) { alert('Nenhum cálculo para exportar.'); return; }

  const cabecalho = ['TAG', 'Data', 'Q_proj(t/h)', 'Q_calc(t/h)', 'Q_calc(m³/h)',
    'gamma(t/m3)', 'H(m)', 'v(m/s)', 'CF1', 'CF2', 'Tu', 'Caneca',
    'Pm(kg/m)', 'Ca(m)', 'Nm_rec', '%Tad', 'Ne_cv(CV)', 'Motor WEG'];

  const linhas = hist.map(h => [
    h.tag, h.data, h.Q_proj, h.Q_th, h.Q_m3h,
    h.gamma, h.H, h.v, h.CF1, h.CF2, h.Tu, h.caneca,
    h.Pm, h.Ca, h.Nm_rec, h.pTad_calc, h.Ne_cv, h.motor
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(';'));

  const csv = [cabecalho.join(';'), ...linhas].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `historico_elevadores_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('hist-wrap')) renderizar();
});

// =====================================================================
// PRÉ-DIMENSIONAMENTO (lógica inversa)
// Entrada: capacidade desejada (t/h) + γ + altura máxima disponível
// Saída: lista das canecas que atendem + velocidade sugerida
// =====================================================================
function preDimensionar() {
  const Q_desej = parseDecimal(document.getElementById('pre-capacidade').value);
  const gamma = parseDecimal(document.getElementById('pre-gamma').value);
  const H_max = parseDecimal(document.getElementById('pre-altura').value);
  const v_sug = parseDecimal(document.getElementById('pre-velocidade').value) || 1.5;
  const CF1 = parseDecimal(document.getElementById('pre-cf1').value) || 0.75;
  const CF2 = parseDecimal(document.getElementById('pre-cf2').value) || 1.0;

  const erros = [];
  if (isNaN(Q_desej) || Q_desej <= 0) erros.push('Capacidade desejada');
  if (isNaN(gamma) || gamma <= 0) erros.push('Peso específico');
  if (isNaN(H_max) || H_max <= 0) erros.push('Altura disponível');

  const cont = document.getElementById('pre-resultado');
  if (erros.length > 0) {
    cont.innerHTML = `<div class="alerta erro animate-in"><i class="fas fa-exclamation-circle"></i><div><strong>Preencha:</strong> ${erros.join(', ')}</div></div>`;
    return;
  }

  // Para cada caneca, calcular a velocidade necessária para atingir Q_desej
  // Q = 3600 * V_m3 * v * CF1 * CF2 * gamma / e_m  →  v = Q*e_m / (3600*V_m3*CF1*CF2*gamma)
  const n_fil = 1;
  const resultados = CANECAS.map((c, idx) => {
    const V_m3 = c.vol75 / 1000;
    const e_m = c.passo / 1000;
    const v_nec = (Q_desej * e_m) / (3600 * V_m3 * n_fil * CF1 * CF2 * gamma);
    const Q_v_sug = (3600 * V_m3 * n_fil * v_sug * CF1 * CF2 * gamma) / e_m;
    const viavel = v_nec >= 1.2 && v_nec <= 2.5;
    return { idx, c, v_nec, Q_v_sug, viavel };
  }).filter(r => r.v_nec <= 2.5); // só canecas que conseguem atingir dentro do limite

  // Ordenar: viáveis primeiro, depois por menor velocidade necessária
  resultados.sort((a, b) => {
    if (a.viavel && !b.viavel) return -1;
    if (!a.viavel && b.viavel) return 1;
    return a.v_nec - b.v_nec;
  });

  if (resultados.length === 0) {
    cont.innerHTML = `<div class="alerta erro animate-in"><i class="fas fa-exclamation-circle"></i><span>Nenhuma caneca da tabela consegue atingir ${fmtN(Q_desej, 1)} t/h com os parâmetros informados. Revise a capacidade ou o peso específico.</span></div>`;
    return;
  }

  const linhas = resultados.slice(0, 6).map(r => {
    const status = r.viavel ? 'pre-viavel' : 'pre-aviso';
    const icone = r.viavel ? '✓' : '⚠';
    const Ne_kw = (Q_desej * H_max * 9.81) / (3600 * 0.85);
    const Ne_cv = (Ne_kw * 1.20) / 0.7355;
    const { principal: weg } = selecionarMotorWEG(Ne_cv);
    return `
      <tr class="${status}" onclick="usarSugestao(${r.idx}, '${fmtN(r.v_nec, 3).replace(',', '.')}')">
        <td>${icone} ${r.c.largura}mm / ${r.c.altura}mm</td>
        <td>${fmtN(r.c.vol75, 3)} L</td>
        <td>${r.c.passo} mm</td>
        <td><strong>${fmtN(r.v_nec, 3)} m/s</strong></td>
        <td>${fmtN(r.Q_v_sug, 1)} t/h @ ${fmtN(v_sug, 2)}m/s</td>
        <td>${weg.cv} CV</td>
      </tr>`;
  }).join('');

  cont.innerHTML = `
    <div class="pre-tabela-wrap animate-in">
      <p class="pre-hint"><i class="fas fa-mouse-pointer"></i> Clique em uma linha para carregar a sugestão na calculadora</p>
      <table class="pre-table">
        <thead>
          <tr>
            <th>Caneca</th>
            <th>Vol. 75%</th>
            <th>Passo</th>
            <th>Vel. necessária</th>
            <th>Cap. @ v sugerida</th>
            <th>Motor est.</th>
          </tr>
        </thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>`;
}

function usarSugestao(idxCaneca, velocidade) {
  // Preenche a calculadora principal com os dados do pré-dimensionamento
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  set('capacidade', document.getElementById('pre-capacidade').value);
  set('densidade', document.getElementById('pre-gamma').value);
  set('altura', document.getElementById('pre-altura').value);
  set('velocidade', velocidade);
  set('cf1', document.getElementById('pre-cf1').value || '0,75');
  set('cf2', document.getElementById('pre-cf2').value || '1,0');

  // Selecionar a caneca na tabela
  const linhas = document.querySelectorAll('#corpoCanecas tr');
  linhas.forEach(r => r.classList.remove('selecionada'));
  if (linhas[idxCaneca]) {
    linhas[idxCaneca].classList.add('selecionada');
    canecaSelecionada = CANECAS[idxCaneca];
    linhas[idxCaneca].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Rolar para a calculadora e avisar
  document.getElementById('sec-calculadora').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('resultado').innerHTML = `
    <div class="alerta info animate-in">
      <i class="fas fa-check-circle"></i>
      <span>Sugestão carregada! Caneca <strong>${CANECAS[idxCaneca][1]}mm</strong> selecionada, velocidade <strong>${velocidade} m/s</strong>. Clique em <strong>Calcular</strong> para confirmar.</span>
    </div>`;
}

// =====================================================================
// GERAR RELATÓRIO PDF via janela de impressão do browser
// =====================================================================
function escaparHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function gerarPDF() {
  const tag = document.getElementById('tag').value || 'Sem TAG';
  const data = new Date().toLocaleDateString('pt-BR');
  const conteudo = document.getElementById('resultado').innerHTML;

  const janela = window.open('', '_blank', 'width=900,height=700');
  if (!janela) {
    alert('O navegador bloqueou a abertura do relatório.\nPermita pop-ups para este site e tente novamente.');
    return;
  }
  janela.document.write(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório — ${escaparHTML(tag)}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    :root {
      --azul: #003D58; --laranja: #F37021; --laranja-esc: #d95f1c;
      --cinza-bg: #eef3f6; --cinza-borda: #dce3e7; --cinza-card: #f4f7f9;
      --cinza-input: #f8fafb; --texto-sec: #5a6d75; --branco: #fff;
      --verde: #1db87e; --amarelo: #f5a623; --azul-medio: #005578;
      --amarelo-bg: #fff8e1; --amarelo-txt: #7a5500;
      --erro: #e53935; --erro-bg: #fff0f0; --erro-txt: #7a0000;
      --font-display: 'Barlow Condensed', sans-serif;
      --font-body: 'Barlow', sans-serif;
      --radius-sm: 8px; --radius-md: 10px; --radius-lg: 12px;
      --shadow-md: 0 4px 16px rgba(0,61,88,.10);
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: var(--font-body); color: var(--azul); padding: 30px 40px; font-size: 13px; }

    /* Cabeçalho do relatório */
    .rel-header {
      display: flex; justify-content: space-between; align-items: center;
      background: var(--azul); color: #fff; padding: 18px 24px;
      border-radius: var(--radius-lg); margin-bottom: 24px;
    }
    .rel-header h1 { font-family: var(--font-display); font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
    .rel-header .rel-meta { font-size: 12px; color: #a0beca; text-align: right; }
    .rel-header .rel-meta strong { color: var(--laranja); display: block; font-size: 18px; font-family: var(--font-display); }

    /* Dados de entrada */
    .rel-secao { margin-bottom: 20px; }
    .rel-secao h2 {
      font-family: var(--font-display); font-size: 14px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.5px; color: var(--azul);
      border-left: 4px solid var(--laranja); padding-left: 8px; margin-bottom: 10px;
    }
    .rel-entrada-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
    }
    .rel-entrada-item {
      background: var(--cinza-card); border-radius: var(--radius-sm); padding: 8px 10px;
    }
    .rel-entrada-item .lbl { font-size: 10px; text-transform: uppercase; color: var(--texto-sec); font-weight: 600; letter-spacing: 0.3px; }
    .rel-entrada-item .val { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--azul); }

    /* Reutilizar classes do style.css original */
    .res-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .res-card { background: var(--cinza-card); border-radius: var(--radius-md); padding: 10px 14px; border-left: 5px solid var(--laranja); }
    .res-card.verde { border-left-color: var(--verde); }
    .res-card.azul  { border-left-color: var(--azul); }
    .res-card.amarelo { border-left-color: var(--amarelo); }
    .res-card .lbl { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--texto-sec); margin-bottom: 3px; }
    .res-card .val { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--azul); line-height: 1; }
    .res-card .val-unit { font-size: 12px; color: var(--texto-sec); margin-top: 2px; }
    .caneca-result-box { background: linear-gradient(135deg, var(--azul) 0%, var(--azul-medio) 100%); border-radius: var(--radius-lg); padding: 14px 18px; color: #fff; margin-bottom: 12px; }
    .caneca-result-box h4 { font-family: var(--font-display); font-size: 13px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 10px; color: #a0d0e8; text-transform: uppercase; }
    .caneca-specs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .caneca-spec-item { text-align: center; }
    .caneca-spec-item .sv { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--laranja); }
    .caneca-spec-item .sk { font-size: 10px; color: #a0d0e8; margin-top: 2px; }
    .tensoes-box { background: var(--cinza-card); border-radius: var(--radius-md); padding: 12px 16px; border: 1.5px solid var(--cinza-borda); margin-bottom: 12px; }
    .tensoes-box h4 { font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--azul); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.3px; }
    .tensoes-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px dashed var(--cinza-borda); font-size: 12px; }
    .tensoes-row:last-child { border-bottom: none; }
    .tensoes-row .tkey { color: var(--texto-sec); }
    .tensoes-row .tval { font-weight: 700; color: var(--azul); }
    .tensoes-row .tval.ok { color: var(--verde); }
    .tensoes-row .tval.warn { color: var(--amarelo); }
    .weg-box { border-radius: var(--radius-lg); border: 2px solid var(--azul); margin-bottom: 12px; overflow: hidden; }
    .weg-header { background: var(--azul); padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; }
    .weg-logo-wrap { display: flex; align-items: center; gap: 8px; color: #fff; font-family: var(--font-display); font-size: 13px; font-weight: 700; text-transform: uppercase; }
    .weg-logo-wrap i { color: var(--laranja); }
    .weg-btn-catalogo { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 16px; background: var(--laranja); color: #fff; font-size: 11px; font-weight: 700; text-decoration: none; font-family: var(--font-display); }
    .weg-principal { padding: 12px 16px 8px; border-bottom: 1px solid var(--cinza-borda); }
    .weg-cv { font-family: var(--font-display); font-size: 28px; font-weight: 800; color: var(--azul); line-height: 1; margin-bottom: 3px; }
    .weg-kw { font-size: 15px; font-weight: 600; color: var(--texto-sec); }
    .weg-modelo { font-size: 11px; color: var(--texto-sec); margin-top: 2px; }
    .weg-ne { margin-top: 6px; font-size: 11px; color: var(--texto-sec); background: var(--cinza-card); border-radius: 4px; padding: 4px 8px; }
    .weg-ne strong { color: var(--azul); }
    .weg-specs-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid var(--cinza-borda); }
    .weg-spec { padding: 8px 10px; border-right: 1px solid var(--cinza-borda); text-align: center; }
    .weg-spec:last-child { border-right: none; }
    .weg-spec-label { font-size: 9px; font-weight: 600; text-transform: uppercase; color: var(--texto-sec); margin-bottom: 3px; }
    .weg-spec-val { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--azul); }
    .weg-alternativa { padding: 8px 16px; display: flex; align-items: center; gap: 8px; background: var(--cinza-card); font-size: 11px; }
    .weg-alt-label { color: var(--texto-sec); font-weight: 600; display: flex; align-items: center; gap: 4px; }
    .weg-alt-link { color: var(--laranja); font-weight: 700; text-decoration: none; }
    .alerta { border-radius: var(--radius-sm); padding: 8px 12px; font-size: 12px; display: flex; gap: 7px; align-items: flex-start; margin-bottom: 6px; background: var(--amarelo-bg); border: 1.5px solid var(--amarelo); color: var(--amarelo-txt); }
    .alerta i { color: var(--amarelo); flex-shrink: 0; }
    .alerta.info { background: #e8f4fd; border-color: #60b4e8; color: #0d3a5e; }
    .alerta.info i { color: #1a78b8; }
    .sep { border: none; border-top: 1.5px solid var(--cinza-borda); margin: 14px 0; }
    .formulas-rodape { font-size: 10px; color: var(--texto-sec); line-height: 1.7; }
    .res-tag { font-family: var(--font-display); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--texto-sec); margin-bottom: 10px; }
    .res-tag i { color: var(--laranja); margin-right: 5px; }
    .btn-pdf { display: none; }
    .animate-in { animation: none; opacity: 1; transform: none; }

    /* Rodapé */
    .rel-footer {
      margin-top: 24px; padding-top: 14px; border-top: 2px solid var(--cinza-borda);
      display: flex; justify-content: space-between; font-size: 11px; color: var(--texto-sec);
    }
    .rel-footer strong { color: var(--laranja); }

    @media print {
      body { padding: 15px 20px; }
      .rel-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .caneca-result-box { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .weg-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .res-card { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="rel-header">
    <div>
      <h1>Relatório de Dimensionamento</h1>
      <div style="font-size:12px;color:#a0beca;margin-top:4px">Elevador de Canecas — i9TMG Engenharia</div>
    </div>
    <div class="rel-meta">
      <strong>${escaparHTML(tag)}</strong>
      Emitido em: ${data}
    </div>
  </div>

  <div class="rel-secao">
    <h2><i class="fas fa-sliders-h" style="margin-right:6px;color:var(--laranja)"></i>Dados de Entrada</h2>
    <div class="rel-entrada-grid">
      <div class="rel-entrada-item"><div class="lbl">Capacidade de Projeto</div><div class="val">${document.getElementById('capacidade').value} t/h</div></div>
      <div class="rel-entrada-item"><div class="lbl">Peso Específico (γ)</div><div class="val">${document.getElementById('densidade').value} t/m³</div></div>
      <div class="rel-entrada-item"><div class="lbl">Altura (cc)</div><div class="val">${document.getElementById('altura').value} m</div></div>
      <div class="rel-entrada-item"><div class="lbl">Velocidade</div><div class="val">${document.getElementById('velocidade').value} m/s</div></div>
      <div class="rel-entrada-item"><div class="lbl">CF1 — Enchimento</div><div class="val">${document.getElementById('cf1').value}</div></div>
      <div class="rel-entrada-item"><div class="lbl">CF2 — Homogeneidade</div><div class="val">${document.getElementById('cf2').value}</div></div>
      <div class="rel-entrada-item"><div class="lbl">Resistência Correia (Tu)</div><div class="val">${document.getElementById('tu').value} kgf/cm</div></div>
      <div class="rel-entrada-item"><div class="lbl">%Tad admissível</div><div class="val">${document.getElementById('ptad').value}%</div></div>
    </div>
  </div>

  <div class="rel-secao">
    <h2><i class="fas fa-chart-bar" style="margin-right:6px;color:var(--laranja)"></i>Resultados</h2>
    ${conteudo}
  </div>

  <div class="rel-footer">
    <span>Ferramenta desenvolvida por <strong>MuriSystems</strong> para i9TMG Engenharia</span>
    <span>Os resultados devem ser revisados por engenheiro responsável antes de uso em projeto executivo.</span>
  </div>

  <script>
    window.onload = () => {
      // Remover botão PDF e animações dentro do relatório
      document.querySelectorAll('.btn-pdf').forEach(b => b.remove());
      setTimeout(() => window.print(), 600);
    };
  <\/script>
</body>
</html>`);
  janela.document.close();
}


/* ================================================================
   MENU DE ACESSIBILIDADE — acessibilidade.js
   Gerencia: modo escuro, alto contraste, tamanho de fonte
   ================================================================ */

(function () {
  'use strict';

  const PREFS_KEY = 'elev_acess_v1';

  // Padrão
  const defaultPrefs = {
    tema: 'light',        // 'light' | 'dark'
    contraste: false,     // true = alto contraste (só ativo com tema=dark)
    fonte: 'normal',      // 'pequena' | 'normal' | 'grande'
  };

  /* ── Persistência ── */
  function loadPrefs() {
    try { return Object.assign({}, defaultPrefs, JSON.parse(localStorage.getItem(PREFS_KEY))); }
    catch { return { ...defaultPrefs }; }
  }

  function savePrefs(p) {
    localStorage.setItem(PREFS_KEY, JSON.stringify(p));
    // Compatibilidade com código legado que lia 'elev_tema'
    localStorage.setItem('elev_tema', p.tema);
  }

  /* ── Aplicar preferências no <html> ── */
  function applyPrefs(p) {
    const html = document.documentElement;

    // Tema
    html.classList.toggle('dark', p.tema === 'dark');

    // Alto contraste (só faz sentido no modo escuro)
    html.classList.toggle('alto-contraste', p.tema === 'dark' && p.contraste);

    // Fonte
    html.classList.remove('fonte-sm', 'fonte-md', 'fonte-lg');
    if (p.fonte === 'pequena') html.classList.add('fonte-sm');
    if (p.fonte === 'grande') html.classList.add('fonte-lg');
    // 'normal' não adiciona classe (reset)
  }

  /* ── Atualizar estado visual dos botões do painel ── */
  function syncUI(p) {
    // Tema
    const btnLight = document.getElementById('acess-btn-light');
    const btnDark = document.getElementById('acess-btn-dark');
    if (btnLight) btnLight.classList.toggle('active', p.tema === 'light');
    if (btnDark) btnDark.classList.toggle('active', p.tema === 'dark');

    // Contraste
    const btnContraste = document.getElementById('acess-btn-contraste');
    if (btnContraste) {
      btnContraste.classList.toggle('active', p.contraste);
      btnContraste.disabled = p.tema !== 'dark';
      btnContraste.style.opacity = p.tema !== 'dark' ? '0.35' : '1';
    }

    // Fonte
    ['pequena', 'normal', 'grande'].forEach(f => {
      const b = document.getElementById('acess-btn-fonte-' + f);
      if (b) b.classList.toggle('active', p.fonte === f);
    });

    // Ícone e label do toggle
    const iconeTema = document.getElementById('acess-icone-tema');
    if (iconeTema) {
      iconeTema.className = p.tema === 'dark'
        ? 'fas fa-moon'
        : 'fas fa-universal-access';
    }

    // Indicador visual no botão de abertura (ponto laranja se algo não-padrão)
    const dot = document.getElementById('acess-indicador');
    if (dot) {
      const modified = p.tema !== 'light' || p.contraste || p.fonte !== 'normal';
      dot.style.display = modified ? 'inline-block' : 'none';
    }
  }

  /* ── Toggle do painel ── */
  function togglePanel() {
    const panel = document.getElementById('acess-panel');
    const toggle = document.getElementById('acess-toggle');
    if (!panel) return;
    const open = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);

    if (open) {
      // Fechar ao clicar fora
      setTimeout(() => {
        document.addEventListener('click', closeOnOutside, { once: true });
      }, 0);
    }
  }

  function closeOnOutside(e) {
    const panel = document.getElementById('acess-panel');
    const toggle = document.getElementById('acess-toggle');
    if (!panel) return;
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      // re-attach se ainda está aberto
      setTimeout(() => {
        if (panel.classList.contains('open')) {
          document.addEventListener('click', closeOnOutside, { once: true });
        }
      }, 0);
    }
  }

  /* ── Ações públicas ── */
  window.acessSetTema = function (tema) {
    const p = loadPrefs();
    p.tema = tema;
    savePrefs(p);
    applyPrefs(p);
    syncUI(p);
  };

  window.acessToggleContraste = function () {
    const p = loadPrefs();
    if (p.tema !== 'dark') return; // só disponível no escuro
    p.contraste = !p.contraste;
    savePrefs(p);
    applyPrefs(p);
    syncUI(p);
  };

  window.acessSetFonte = function (tamanho) {
    const p = loadPrefs();
    p.fonte = tamanho;
    savePrefs(p);
    applyPrefs(p);
    syncUI(p);
  };

  window.acessReset = function () {
    savePrefs({ ...defaultPrefs });
    applyPrefs(defaultPrefs);
    syncUI(defaultPrefs);
  };

  window.acessTogglePanel = togglePanel;

  /* ── Inicialização ── */
  // Aplicar prefs assim que o script carrega (antes do DOM completo, para evitar flash)
  applyPrefs(loadPrefs());

  // Sincronizar UI depois que o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', function () {
    syncUI(loadPrefs());
  });

  // Compatibilidade: a função alternarTema() ainda funciona como toggle simples
  window.alternarTema = function () {
    const p = loadPrefs();
    p.tema = p.tema === 'dark' ? 'light' : 'dark';
    if (p.tema === 'light') p.contraste = false; // reset contraste ao sair do dark
    savePrefs(p);
    applyPrefs(p);
    syncUI(p);
  };

})();