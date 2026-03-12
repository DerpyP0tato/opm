// Hardware Workflows Page
Pages.hardware = {
  render() {
    this.renderDevices();
    this.renderWorkflowDiagram();
    this.renderMaintenance();
  },

  renderDevices() {
    const container = document.getElementById('device-grid');
    if (!container) return;

    const icons = {
      layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>',
      search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
      droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>',
      rotate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',
      refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>',
      thermometer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg>',
    };

    const bgColors = {
      success: 'background: var(--success-50); color: var(--success-600)',
      warning: 'background: var(--warning-50); color: var(--warning-600)',
      danger: 'background: var(--danger-50); color: var(--danger-600)',
    };

    container.innerHTML = DATA.devices.map(d => `
      <div class="device-card">
        <div class="device-icon" style="${bgColors[d.statusType] || bgColors.success}">
          ${icons[d.icon] || icons.cpu}
        </div>
        <div class="device-name">${d.name}</div>
        <div class="device-type">${d.type}</div>
        <div class="device-status-row">
          <span class="badge badge-${d.statusType}"><span class="badge-dot"></span>${d.status}</span>
          <span class="text-xs text-muted">Synced ${d.lastSync}</span>
        </div>
        <div class="device-status-row mt-2">
          <span class="text-xs text-muted">Next Calibration</span>
          <span class="text-xs" style="color: ${d.nextCal === 'Overdue' ? 'var(--danger-600)' : 'var(--neutral-700)'}; font-weight: 500">${d.nextCal}</span>
        </div>
      </div>
    `).join('');
  },

  renderWorkflowDiagram() {
    const container = document.getElementById('workflow-diagram');
    if (!container) return;

    const nodeIcons = [
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    ];

    let html = '';
    DATA.workflowNodes.forEach((node, i) => {
      html += `
        <div class="workflow-node ${node.active ? 'node-active' : ''}">
          <div class="node-icon">${nodeIcons[i]}</div>
          <div class="node-label">${node.label}</div>
          <div class="node-status">${node.status}</div>
        </div>
      `;
      if (i < DATA.workflowNodes.length - 1) {
        html += `<div class="workflow-connector ${node.active && DATA.workflowNodes[i + 1].active ? 'connector-active' : ''}"></div>`;
      }
    });
    container.innerHTML = html;
  },

  renderMaintenance() {
    const container = document.getElementById('maintenance-table');
    if (!container) return;

    const prioStyle = { High: 'danger', Medium: 'warning', Low: 'info' };
    const statusStyle = { Overdue: 'danger', Scheduled: 'success', Pending: 'neutral' };

    container.innerHTML = `
      <table class="data-table">
        <thead><tr>
          <th>Device</th><th>Task</th><th>Due Date</th><th>Priority</th><th>Status</th><th></th>
        </tr></thead>
        <tbody>
          ${DATA.maintenanceSchedule.map(m => `<tr>
            <td style="font-weight:500">${m.device}</td>
            <td>${m.task}</td>
            <td>${m.due}</td>
            <td><span class="badge badge-${prioStyle[m.priority]}"><span class="badge-dot"></span>${m.priority}</span></td>
            <td><span class="badge badge-${statusStyle[m.status]}"><span class="badge-dot"></span>${m.status}</span></td>
            <td><button class="btn btn-sm btn-secondary" onclick="Pages.hardware.scheduleService('${m.device}')">Action</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    `;
  },

  scheduleService(device) {
    App.toast(`Service request submitted for ${device}`, 'success');
  },
};
