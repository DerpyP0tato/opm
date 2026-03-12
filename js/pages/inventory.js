// Inventory & Supply Page
Pages.inventory = {
  render() {
    this.renderInventoryList();
    this.renderRegionalDemand();
    this.renderSupplyShipments();
  },

  renderInventoryList() {
    const container = document.getElementById('inventory-list');
    if (!container) return;

    const fillClass = { critical: 'fill-danger', warning: 'fill-warning', good: 'fill-success' };

    container.innerHTML = DATA.inventory.map((item, i) => {
      const pct = Math.round((item.stock / item.capacity) * 100);
      return `
        <div class="inventory-item">
          <div class="inv-info">
            <div class="inv-name">${item.name}</div>
            <div class="inv-sku">${item.sku}</div>
          </div>
          <div class="inv-bar">
            <div class="progress-bar">
              <div class="progress-fill ${fillClass[item.status]}" style="width: ${pct}%"></div>
            </div>
            <div class="inv-level">
              <span>${item.stock} / ${item.capacity} units</span>
              <span>${pct}%</span>
            </div>
          </div>
          <div class="inv-days">
            <div class="days-value" style="color: ${item.daysSupply <= 7 ? 'var(--danger-600)' : item.daysSupply <= 14 ? 'var(--warning-600)' : 'var(--success-600)'}">${item.daysSupply}</div>
            <div class="days-label">days supply</div>
          </div>
          ${item.reorderQty > 0 ? `<button class="btn btn-sm btn-primary" onclick="Pages.inventory.reorder(${i})">Reorder ${item.reorderQty}</button>` : `<span class="badge badge-success"><span class="badge-dot"></span>Stocked</span>`}
        </div>
      `;
    }).join('');
  },

  renderRegionalDemand() {
    const canvas = document.getElementById('chart-regional-demand');
    if (!canvas) return;
    const d = DATA.regionalDemand;
    Charts.bar(canvas, {
      labels: d.labels,
      height: 220,
      datasets: [
        { data: d.current, color: Charts.colors.primary },
        { data: d.forecast, color: Charts.colors.primaryLight },
      ],
    });
  },

  renderSupplyShipments() {
    const container = document.getElementById('supply-shipments');
    if (!container) return;

    const statusBadge = (status) => {
      const type = { 'Processing': 'neutral', 'Shipped': 'info', 'In Transit': 'info', 'Customs': 'warning' }[status] || 'neutral';
      return `<span class="badge badge-${type}"><span class="badge-dot"></span>${status}</span>`;
    };

    container.innerHTML = `
      <table class="data-table">
        <thead><tr>
          <th>PO Number</th><th>Item</th><th>Quantity</th><th>Origin</th><th>Status</th><th>ETA</th>
        </tr></thead>
        <tbody>
          ${DATA.supplyShipments.map(s => `<tr>
            <td class="table-mono">${s.id}</td>
            <td>${s.item}</td>
            <td>${s.qty}</td>
            <td>${s.origin}</td>
            <td>${statusBadge(s.status)}</td>
            <td>${s.eta}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    `;
  },

  reorder(index) {
    const item = DATA.inventory[index];
    App.toast(`Reorder placed: ${item.reorderQty}× ${item.name}`, 'success');
  },
};
