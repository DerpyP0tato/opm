// Operations Control Tower Page
Pages.controlTower = {
  render() {
    this.renderGlobalLabs();
    this.renderCategoryDemand();
    this.renderWarehouses();
    this.renderServiceTickets();
    this.renderBottlenecks();
  },

  renderGlobalLabs() {
    const container = document.getElementById('global-labs');
    if (!container) return;

    container.innerHTML = `<div class="region-grid">
      ${DATA.globalLabs.map(r => {
        const color = r.utilization >= 80 ? 'var(--success-600)' : r.utilization >= 65 ? 'var(--warning-600)' : 'var(--danger-600)';
        return `
          <div class="region-card">
            <div class="region-name">${r.region}</div>
            <div class="region-metric" style="color: ${color}">${r.utilization}%</div>
            <div class="region-sub">Utilization</div>
            <div style="margin-top: var(--space-2); display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--neutral-500);">
              <span>${r.labs} Labs</span>
              <span>${r.reactorsActive} Reactors</span>
            </div>
            <div class="progress-bar mt-2">
              <div class="progress-fill ${r.utilization >= 80 ? 'fill-success' : r.utilization >= 65 ? 'fill-warning' : 'fill-danger'}" style="width: ${r.utilization}%"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>`;
  },

  renderCategoryDemand() {
    const canvas = document.getElementById('chart-category-demand');
    if (!canvas) return;
    const d = DATA.categoryDemand;
    Charts.bar(canvas, {
      labels: d.labels,
      height: 220,
      datasets: [
        { data: d.values, color: Charts.colors.primary },
      ],
    });
  },

  renderWarehouses() {
    const container = document.getElementById('warehouse-table');
    if (!container) return;

    container.innerHTML = `
      <table class="data-table">
        <thead><tr>
          <th>Warehouse</th><th>Stock Level</th><th>Capacity</th><th>Open Orders</th><th></th>
        </tr></thead>
        <tbody>
          ${DATA.warehouseAllocation.map(w => `<tr>
            <td style="font-weight:500">${w.warehouse}</td>
            <td>
              <div style="display:flex; align-items:center; gap: var(--space-2);">
                <div class="progress-bar" style="width:100px">
                  <div class="progress-fill ${w.stock >= 80 ? 'fill-success' : w.stock >= 60 ? 'fill-warning' : 'fill-danger'}" style="width:${w.stock}%"></div>
                </div>
                <span class="text-sm">${w.stock}%</span>
              </div>
            </td>
            <td>${w.capacity}</td>
            <td>${w.orders}</td>
            <td><button class="btn btn-sm btn-secondary" onclick="Pages.controlTower.viewWarehouse('${w.warehouse}')">Details</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    `;
  },

  renderServiceTickets() {
    const container = document.getElementById('service-tickets');
    if (!container) return;

    const prioStyle = { High: 'danger', Medium: 'warning', Low: 'info' };
    const statusStyle = { 'In Progress': 'info', 'Open': 'neutral', 'Resolved': 'success', 'Escalated': 'danger' };

    container.innerHTML = `
      <table class="data-table">
        <thead><tr>
          <th>Ticket</th><th>Lab</th><th>Issue</th><th>Priority</th><th>Status</th><th>Assigned</th><th>Age</th>
        </tr></thead>
        <tbody>
          ${DATA.serviceTickets.map(t => `<tr>
            <td class="table-mono">${t.id}</td>
            <td>${t.lab}</td>
            <td>${t.issue}</td>
            <td><span class="badge badge-${prioStyle[t.priority]}"><span class="badge-dot"></span>${t.priority}</span></td>
            <td><span class="badge badge-${statusStyle[t.status]}"><span class="badge-dot"></span>${t.status}</span></td>
            <td>${t.assigned}</td>
            <td>${t.age}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    `;
  },

  renderBottlenecks() {
    const container = document.getElementById('bottlenecks');
    if (!container) return;

    const sevStyle = { High: 'danger', Medium: 'warning', Low: 'info' };

    container.innerHTML = DATA.supplyChainBottlenecks.map(b => `
      <div class="alert-card alert-${sevStyle[b.severity]}">
        <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div class="alert-text">
          <div class="alert-title">${b.item} — ${b.location}</div>
          <div class="alert-desc">${b.impact}</div>
          <div class="alert-desc mt-2" style="color: var(--success-600)">Action: ${b.action}</div>
        </div>
        <span class="badge badge-${sevStyle[b.severity]}">${b.severity}</span>
      </div>
    `).join('');
  },

  viewWarehouse(name) {
    App.toast(`Loading details for ${name}…`);
  },
};
