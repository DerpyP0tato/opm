// Subscription & Account Page
Pages.subscription = {
  render() {
    this.renderPlans();
    this.renderAccountInfo();
    this.renderModules();
    this.renderUsageChart();
  },

  renderPlans() {
    const container = document.getElementById('plan-grid');
    if (!container) return;

    container.innerHTML = DATA.plans.map(p => `
      <div class="plan-card ${p.active ? 'plan-active' : ''}">
        ${p.active ? '<div style="font-size:var(--text-xs); font-weight:var(--font-semibold); color:var(--primary-600); margin-bottom:var(--space-2)">CURRENT PLAN</div>' : ''}
        <div class="plan-name">${p.name}</div>
        <div class="plan-price">${p.price}<span>${p.period}</span></div>
        <ul class="plan-features">
          ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        ${p.active ? '<button class="btn btn-secondary w-full">Manage Plan</button>' : `<button class="btn btn-primary w-full" onclick="Pages.subscription.upgradePlan('${p.name}')">${p.price === 'Custom' ? 'Contact Sales' : 'Upgrade'}</button>`}
      </div>
    `).join('');
  },

  renderAccountInfo() {
    const container = document.getElementById('account-info');
    if (!container) return;
    const a = DATA.accountInfo;

    container.innerHTML = `
      <div class="card">
        <div class="card-header"><span class="card-title">Account Summary</span></div>
        <div style="display:flex; flex-direction:column; gap:var(--space-3);">
          <div style="display:flex; justify-content:space-between; font-size:var(--text-sm);">
            <span class="text-muted">Organization</span><span style="font-weight:500">${a.org}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-sm);">
            <span class="text-muted">Plan</span><span style="font-weight:500">${a.plan}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-sm);">
            <span class="text-muted">Connected Devices</span>
            <span style="font-weight:500">${a.devices} / ${a.maxDevices}</span>
          </div>
          <div class="progress-bar" style="margin-top: -4px">
            <div class="progress-fill fill-primary" style="width: ${(a.devices/a.maxDevices)*100}%"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-sm);">
            <span class="text-muted">Active Users</span>
            <span style="font-weight:500">${a.users} / ${a.maxUsers}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-sm);">
            <span class="text-muted">Support Tier</span>
            <span class="badge badge-info"><span class="badge-dot"></span>${a.supportTier}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-sm);">
            <span class="text-muted">Next Billing</span><span style="font-weight:500">${a.nextBilling}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-sm);">
            <span class="text-muted">Monthly</span><span style="font-weight:700; color:var(--primary-600)">${a.monthlySpend}</span>
          </div>
        </div>
      </div>
    `;
  },

  renderModules() {
    const container = document.getElementById('modules-list');
    if (!container) return;
    const a = DATA.accountInfo;

    container.innerHTML = a.modules.map((m, i) => `
      <div class="module-toggle">
        <div class="module-info">
          <span class="module-name">${m.name}</span>
          <span class="module-desc">${m.desc}</span>
        </div>
        <button class="toggle ${m.enabled ? 'active' : ''}" onclick="Pages.subscription.toggleModule(${i})" aria-label="Toggle ${m.name}"></button>
      </div>
    `).join('');
  },

  renderUsageChart() {
    const canvas = document.getElementById('chart-usage');
    if (!canvas) return;
    const d = DATA.usageAnalytics;
    Charts.line(canvas, {
      labels: d.labels,
      height: 200,
      datasets: [
        { data: d.apiCalls, color: Charts.colors.primary, fill: true },
        { data: d.dataPoints.map(v => v / 5), color: Charts.colors.success, fill: false, dashed: true },
      ],
    });
  },

  toggleModule(index) {
    DATA.accountInfo.modules[index].enabled = !DATA.accountInfo.modules[index].enabled;
    const m = DATA.accountInfo.modules[index];
    this.renderModules();
    App.toast(`${m.name} ${m.enabled ? 'enabled' : 'disabled'}`, m.enabled ? 'success' : '');
  },

  upgradePlan(name) {
    if (name === 'BioOps Enterprise') {
      App.toast('Sales team will contact you within 24 hours');
    } else {
      App.toast(`Upgrade to ${name} initiated`, 'success');
    }
  },
};
