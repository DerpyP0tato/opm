// Corning BioOps — Canvas Chart Engine
const Charts = {
  colors: {
    primary: '#005EB8',
    primaryLight: '#7ab8ea',
    primaryFaint: 'rgba(0, 94, 184, 0.08)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#0ea5e9',
    neutral400: '#94a3b8',
    neutral200: '#e2e8f0',
    neutral100: '#f1f5f9',
    white: '#ffffff',
    text: '#1e2738',
    textMuted: '#64748b',
  },

  /**
   * Draw a line chart on the given canvas
   * @param {HTMLCanvasElement} canvas
   * @param {Object} opts - { labels, datasets: [{ data, color, fill }], yLabel }
   */
  line(canvas, opts) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = rect.width;
    const h = opts.height || 200;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const pad = { top: 20, right: 20, bottom: 30, left: 45 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    // Find data range
    let allVals = [];
    opts.datasets.forEach(ds => allVals.push(...ds.data.filter(v => v !== 0 && v !== null)));
    const minVal = Math.min(...allVals) * 0.95;
    const maxVal = Math.max(...allVals) * 1.05;
    const range = maxVal - minVal || 1;

    // Grid lines
    ctx.strokeStyle = this.colors.neutral200;
    ctx.lineWidth = 1;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.top + (ch / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cw, y);
      ctx.stroke();

      // Y labels
      const val = maxVal - (range / gridLines) * i;
      ctx.fillStyle = this.colors.textMuted;
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(this._formatNum(val), pad.left - 8, y + 4);
    }

    // X labels
    const labels = opts.labels;
    labels.forEach((label, i) => {
      const x = pad.left + (cw / (labels.length - 1)) * i;
      ctx.fillStyle = this.colors.textMuted;
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, h - 8);
    });

    // Draw datasets
    opts.datasets.forEach(ds => {
      const points = ds.data.map((val, i) => ({
        x: pad.left + (cw / (labels.length - 1)) * i,
        y: pad.top + ch - ((val - minVal) / range) * ch,
      })).filter((_, i) => ds.data[i] !== 0 && ds.data[i] !== null);

      if (points.length < 2) return;

      // Fill area
      if (ds.fill) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, pad.top + ch);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, pad.top + ch);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
        grad.addColorStop(0, ds.fillColor || 'rgba(0, 94, 184, 0.12)');
        grad.addColorStop(1, 'rgba(0, 94, 184, 0.01)');
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Line
      ctx.beginPath();
      ctx.strokeStyle = ds.color || this.colors.primary;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      if (ds.dashed) {
        ctx.setLineDash([6, 4]);
      } else {
        ctx.setLineDash([]);
      }

      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Dots
      if (ds.dots !== false) {
        points.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = ds.color || this.colors.primary;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = this.colors.white;
          ctx.fill();
        });
      }
    });
  },

  /**
   * Draw a horizontal bar chart
   */
  bar(canvas, opts) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = rect.width;
    const h = opts.height || 200;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const pad = { top: 20, right: 20, bottom: 30, left: 45 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    const labels = opts.labels;
    const datasets = opts.datasets;
    const maxVal = Math.max(...datasets.flatMap(ds => ds.data)) * 1.15;

    // Grid
    ctx.strokeStyle = this.colors.neutral200;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (ch / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cw, y);
      ctx.stroke();

      const val = maxVal - (maxVal / 4) * i;
      ctx.fillStyle = this.colors.textMuted;
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(this._formatNum(val), pad.left - 8, y + 4);
    }

    const totalBars = datasets.length;
    const groupWidth = cw / labels.length;
    const barWidth = (groupWidth * 0.6) / totalBars;
    const groupPad = groupWidth * 0.2;

    labels.forEach((label, i) => {
      const groupX = pad.left + groupWidth * i;

      datasets.forEach((ds, di) => {
        const x = groupX + groupPad + barWidth * di;
        const barH = (ds.data[i] / maxVal) * ch;
        const y = pad.top + ch - barH;

        ctx.fillStyle = ds.color || this.colors.primary;
        ctx.beginPath();
        this._roundRect(ctx, x, y, barWidth - 2, barH, 3);
        ctx.fill();
      });

      // X label
      ctx.fillStyle = this.colors.textMuted;
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      const labelX = groupX + groupWidth / 2;
      // Truncate long labels
      const shortLabel = label.length > 10 ? label.substring(0, 10) + '…' : label;
      ctx.fillText(shortLabel, labelX, h - 8);
    });
  },

  /**
   * Draw a gauge/arc
   */
  gauge(canvas, value, max, color) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 80;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = 32;
    const lw = 6;
    const startAngle = 0.75 * Math.PI;
    const endAngle = 2.25 * Math.PI;
    const pct = Math.min(value / max, 1);
    const valAngle = startAngle + (endAngle - startAngle) * pct;

    // Background arc
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = this.colors.neutral200;
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Value arc
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, valAngle);
    ctx.strokeStyle = color || this.colors.primary;
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Center text
    ctx.fillStyle = this.colors.text;
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(value), cx, cy);
  },

  // Utility
  _formatNum(n) {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    if (n >= 100) return Math.round(n).toString();
    return n.toFixed(1);
  },

  _roundRect(ctx, x, y, w, h, r) {
    if (h < 0) { y += h; h = -h; }
    r = Math.min(r, w / 2, h / 2);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  },
};
