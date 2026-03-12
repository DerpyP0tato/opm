// Dashboard Page
Pages.dashboard = {
  render() {
    this.renderMetrics();
    this.renderAlerts();
    this.renderShipments();
    this.renderForecastChart();
  },

  renderMetrics() {
    const container = document.getElementById('dashboard-metrics');
    if (!container) return;
    const icons = {
      flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6m-5 0v6.5L4 18a1 1 0 001 1h14a1 1 0 001-1l-6-8.5V3"/></svg>',
      cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>',
      package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>',
      alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>',
      truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    };

    const bgColors = {
      flask: 'background: var(--primary-100); color: var(--primary-600)',
      cpu: 'background: var(--info-100); color: var(--info-600)',
      package: 'background: var(--warning-100); color: var(--warning-600)',
      alert: 'background: var(--danger-100); color: var(--danger-600)',
      refresh: 'background: var(--success-100); color: var(--success-600)',
      truck: 'background: var(--neutral-100); color: var(--neutral-600)',
    };

    container.innerHTML = DATA.dashboardMetrics.map(m => `
      <div class="metric-tile">
        <div class="metric-header">
          <span class="metric-label">${m.label}</span>
          <div class="metric-icon" style="${bgColors[m.icon]}">${icons[m.icon]}</div>
        </div>
        <div class="metric-value">${m.value}</div>
        ${m.change ? `<div class="metric-change ${m.trend}">${m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : '•'} ${m.change}</div>` : ''}
      </div>
    `).join('');
  },

  renderAlerts() {
    const container = document.getElementById('dashboard-alerts');
    if (!container) return;

    const iconSvg = {
      warning: '<svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      danger: '<svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info: '<svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      success: '<svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    };

    const actionLabels = {
      replenish: 'Approve Replenishment',
      review: 'Review Details',
      schedule: 'Schedule Service',
      reallocate: 'View & Reallocate',
    };

    container.innerHTML = DATA.dashboardAlerts.map((a, i) => `
      <div class="alert-card alert-${a.type}">
        ${iconSvg[a.type]}
        <div class="alert-text">
          <div class="alert-title">${a.title}</div>
          <div class="alert-desc">${a.desc}</div>
          ${a.actionable ? `<div class="alert-actions">
            <button class="btn btn-sm btn-primary" onclick="Pages.dashboard.handleAction('${a.action}', ${i})">${actionLabels[a.action]}</button>
            <button class="btn btn-sm btn-ghost">Dismiss</button>
          </div>` : ''}
        </div>
        <span class="alert-time">${a.time}</span>
      </div>
    `).join('');
  },

  renderShipments() {
    const container = document.getElementById('dashboard-shipments');
    if (!container) return;

    const statusBadge = (status) => {
      const type = { 'In Transit': 'info', 'Customs': 'warning', 'Delivered': 'success', 'Processing': 'neutral' }[status] || 'neutral';
      return `<span class="badge badge-${type}"><span class="badge-dot"></span>${status}</span>`;
    };

    container.innerHTML = `
      <table class="data-table">
        <thead><tr>
          <th>Shipment ID</th><th>Origin</th><th>Destination</th><th>Status</th><th>ETA</th>
        </tr></thead>
        <tbody>
          ${DATA.shipments.map(s => `<tr>
            <td class="table-mono">${s.id}</td>
            <td>${s.origin}</td>
            <td>${s.dest}</td>
            <td>${statusBadge(s.status)}</td>
            <td>${s.eta}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    `;
  },

  renderForecastChart() {
    const canvas = document.getElementById('chart-demand-forecast');
    if (!canvas) return;
    const d = DATA.demandForecast;
    Charts.line(canvas, {
      labels: d.labels,
      height: 200,
      datasets: [
        { data: d.actual, color: Charts.colors.primary, fill: true, dots: true },
        { data: d.forecast, color: Charts.colors.neutral400, dashed: true, fill: false, dots: true },
      ],
    });
  },

  handleAction(action, i) {
    switch (action) {
      case 'replenish':
        App.showModal('modal-replenish');
        break;
      case 'review':
        App.navigateTo('bioprocess');
        break;
      case 'schedule':
        App.navigateTo('hardware');
        break;
      case 'reallocate':
        App.navigateTo('control-tower');
        break;
    }
  },
};
