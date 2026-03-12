// Bioprocess Operations Page
Pages.bioprocess = {
  render() {
    this.renderReactors();
    this.renderSensorChart();
  },

  renderReactors() {
    const container = document.getElementById('reactor-grid');
    if (!container) return;

    const statusBadge = (status, risk) => {
      const type = { normal: 'success', warning: 'danger', caution: 'warning' }[status] || 'neutral';
      return `<span class="badge badge-${type}"><span class="badge-dot"></span>${risk} Risk</span>`;
    };

    container.innerHTML = DATA.reactors.map(r => `
      <div class="reactor-card">
        <div class="reactor-card-header">
          <div>
            <div class="reactor-id">${r.id}</div>
            <div class="reactor-batch">Batch: ${r.batch}</div>
          </div>
          ${statusBadge(r.status, r.riskLevel)}
        </div>
        <div class="reactor-card-body">
          <div class="reactor-meta">
            <span>Phase: <strong>${r.phase}</strong></span>
            <span>Elapsed: ${r.elapsed}</span>
          </div>
          <div class="reactor-sensors">
            <div class="sensor-reading">
              <div class="sensor-label">pH</div>
              <div class="sensor-value">${r.sensors.pH.toFixed(2)} <span class="sensor-unit"></span></div>
            </div>
            <div class="sensor-reading">
              <div class="sensor-label">Temperature</div>
              <div class="sensor-value">${r.sensors.temp.toFixed(1)} <span class="sensor-unit">°C</span></div>
            </div>
            <div class="sensor-reading">
              <div class="sensor-label">Dissolved O₂</div>
              <div class="sensor-value">${r.sensors.dO2} <span class="sensor-unit">%</span></div>
            </div>
            <div class="sensor-reading">
              <div class="sensor-label">Gas Flow</div>
              <div class="sensor-value">${r.sensors.gasFlow.toFixed(1)} <span class="sensor-unit">L/min</span></div>
            </div>
          </div>
          ${r.aiRec ? `
          <div class="ai-recommendation">
            <div class="ai-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              AI Recommendation
            </div>
            <div class="ai-text">${r.aiRec}</div>
          </div>` : ''}
        </div>
      </div>
    `).join('');
  },

  renderSensorChart() {
    const canvas = document.getElementById('chart-sensor-trend');
    if (!canvas) return;
    const d = DATA.sensorTrend;
    Charts.line(canvas, {
      labels: d.labels,
      height: 220,
      datasets: [
        { data: d.pH.map(v => v * 10), color: Charts.colors.primary, fill: true, name: 'pH ×10' },
        { data: d.dO2, color: Charts.colors.success, fill: false, name: 'DO₂ %' },
        { data: d.temp.map(v => v), color: Charts.colors.warning, fill: false, name: 'Temp °C', dots: false },
      ],
    });
  },
};
