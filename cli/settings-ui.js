const http = require('node:http');
const { exec } = require('node:child_process');
const {
  PRESETS,
  ALLOWED_ENUMS,
  getSettingsPaths,
  loadSettings,
  saveSettings,
  applyPreset,
  resetSettings,
  renderActiveSettingsMarkdown,
  syncSettingsToInstalledPlatforms,
} = require('./settings.js');

const CATEGORY_SCHEMA = [
  {
    title: '1. Orchestration & Execution Mode',
    badge: '🚦 Gate & Dispatch',
    fields: [
      { key: 'execution.mode', label: 'Execution Mode (Proactive Sub-agent First vs Mode A/B)' },
      {
        key: 'execution.modeAThresholdFiles',
        label: 'Known-Target Micro-Edit File Threshold (Proactive Sub-agents above this)',
        options: [1, 2, 3, 5, 10],
      },
      { key: 'workflows.defaultVariant', label: 'Default Slash Command Variant' },
      { key: 'workflows.naturalLanguageResearchTrigger', label: 'Natural-Language Research Trigger' },
    ],
  },
  {
    title: '2. Intelligence, Models & Research',
    badge: '🧠 Pro High Default',
    fields: [
      { key: 'models.subagentPolicy', label: 'Sub-Agent Model Policy' },
      { key: 'research.depth', label: 'Research & Brainstorm Depth' },
      { key: 'clarification.style', label: 'Socratic Clarification Style' },
      { key: 'teams.maxDebateRounds', label: 'Golden Triangle Max Debate Rounds' },
    ],
  },
  {
    title: '3. Coding Standards & Verification',
    badge: '📏 Pragmatic 2-Tier',
    fields: [
      { key: 'codingStandards.preset', label: '2-Tier Coding Standards Profile' },
      { key: 'verification.level', label: 'Verification & Testing Strictness' },
    ],
  },
  {
    title: '4. Deliverables & Localization',
    badge: '📂 Clean Git Tree',
    fields: [
      { key: 'deliverables.routing', label: 'Transient Artifact Routing' },
      { key: 'language.response', label: 'Response & Report Language' },
    ],
  },
];

function renderDashboardHtml() {
  const schemaJson = JSON.stringify(CATEGORY_SCHEMA);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>⚡ BoomOpen v5.5 — Unified Settings & Control Center</title>
  <style>
    :root { --bg: #07090e; --card: rgba(15, 23, 42, 0.76); --border: rgba(148, 163, 184, 0.18); --cyan: #00f0ff; --purple: #8b5cf6; --emerald: #10b981; --text: #f8fafc; --muted: #94a3b8; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
    body { background: radial-gradient(circle at 15% 15%, rgba(0, 240, 255, 0.12), transparent 35%), radial-gradient(circle at 85% 20%, rgba(139, 92, 246, 0.12), transparent 35%), var(--bg); color: var(--text); min-height: 100vh; padding: 24px; }
    .container { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
    .glass { background: var(--card); backdrop-filter: blur(16px); border: 1px solid var(--border); border-radius: 14px; padding: 18px 22px; }
    .header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px; }
    .title { font-size: 1.25rem; font-weight: 800; letter-spacing: 0.4px; background: linear-gradient(90deg, var(--cyan), #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .controls { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .pill { font-size: 0.78rem; padding: 5px 10px; border-radius: 999px; border: 1px solid var(--border); background: rgba(15, 23, 42, 0.9); color: var(--muted); }
    .pill.ok { border-color: rgba(16, 185, 129, 0.5); color: var(--emerald); }
    button, select { background: rgba(15, 23, 42, 0.95); color: var(--text); border: 1px solid var(--border); padding: 8px 14px; border-radius: 8px; font-size: 0.85rem; cursor: pointer; transition: 0.15s; }
    button:hover, select:hover { border-color: var(--cyan); }
    .btn-primary { background: linear-gradient(135deg, #0284c7, #7c3aed); border: none; font-weight: 600; }
    .btn-primary:hover { filter: brightness(1.12); }
    .presets { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
    .preset-card { cursor: pointer; border: 1px solid var(--border); border-radius: 12px; padding: 14px; background: rgba(15, 23, 42, 0.6); transition: 0.18s; }
    .preset-card.active, .preset-card:hover { border-color: var(--cyan); box-shadow: 0 0 18px rgba(0, 240, 255, 0.15); }
    .preset-card h4 { font-size: 0.95rem; margin-bottom: 6px; color: var(--cyan); }
    .preset-card p { font-size: 0.8rem; color: var(--muted); line-height: 1.4; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(520px, 1fr)); gap: 16px; }
    .cat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
    .field { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; gap: 12px; }
    .field label { font-size: 0.86rem; color: #e2e8f0; }
    .field code { display: block; font-size: 0.74rem; color: var(--muted); }
    pre { background: #05070b; border: 1px solid var(--border); border-radius: 10px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: #38bdf8; overflow-x: auto; line-height: 1.5; }
    #toast { font-size: 0.82rem; color: var(--emerald); font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="glass header">
      <div>
        <div class="title">⚡ BOOMOPEN v5.5 — UNIFIED SETTINGS & CONTROL CENTER</div>
        <div id="platforms" style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;"></div>
      </div>
      <div class="controls">
        <span id="toast"></span>
        <select id="scopeSelect">
          <option value="global">🌐 Global (~/.boomopen/settings.json)</option>
          <option value="project">📁 Project (./.boomopen.json)</option>
        </select>
        <button id="resetBtn">🔄 Reset Defaults</button>
        <button id="saveBtn" class="btn-primary">💾 Save & Sync to All 5 Platforms</button>
      </div>
    </div>
    <div class="presets" id="presetCards"></div>
    <div class="grid" id="categoriesGrid"></div>
    <div class="glass">
      <div class="cat-header"><h3>⚡ Live AOT Injected Entrypoint Block Preview</h3><span class="pill ok">0ms Turn-1 Overhead</span></div>
      <pre id="markdownPreview">Loading...</pre>
    </div>
  </div>
  <script>
    const SCHEMA = ${schemaJson};
    const PRESET_META = [
      { id: 'smart-hybrid', title: '⚡ Smart-Hybrid (Default v5.5)', desc: 'Mode A <= 2 known files; Proactive Sub-agent First on Turn 1 for > 2 files, unscoped exploration, or /cmd; NL Research → /research:team & /brainstorm:team.' },
      { id: 'solo-fast', title: '🚀 Solo-Fast (Direct Mode A)', desc: 'Force Mode A Direct Execution (≤10 files), :fast variant, Relaxed 600/800 lines.' },
      { id: 'deep-architect', title: '🧠 Deep-Architect (Strict Mode B)', desc: 'Force Mode B Multi-Agent Orchestrator, :hard variant, Strict 300/400 lines.' },
      { id: 'adversarial-team', title: '🔺 Adversarial-Team (Golden Triangle)', desc: 'Force 3-Agent Golden Triangle :team on all workflows, Strict 300/400 lines.' }
    ];
    let state = { settings: {}, allowedEnums: {}, scope: 'global' };
    const getVal = (obj, k) => k.split('.').reduce((a, p) => (a ? a[p] : undefined), obj);
    const setVal = (obj, k, v) => { const p = k.split('.'); let c = obj; for (let i = 0; i < p.length - 1; i++) c = c[p[i]] = c[p[i]] || {}; c[p[p.length - 1]] = v; };

    function renderUI(data) {
      state.settings = data.settings; state.allowedEnums = data.allowedEnums;
      document.getElementById('markdownPreview').textContent = data.markdownPreview;
      const platEl = document.getElementById('platforms');
      platEl.innerHTML = Object.entries(data.syncStatus || {}).map(([k, ok]) => \`<span class="pill \${ok ? 'ok' : ''}">\${ok ? '✅' : '⬚'} \${k}</span>\`).join('');
      document.getElementById('presetCards').innerHTML = PRESET_META.map(p => \`
        <div class="preset-card \${state.settings.preset === p.id ? 'active' : ''}" onclick="applyPresetClick('\${p.id}')">
          <h4>\${p.title}</h4><p>\${p.desc}</p>
        </div>\`).join('');
      document.getElementById('categoriesGrid').innerHTML = SCHEMA.map(cat => \`
        <div class="glass">
          <div class="cat-header"><h3>\${cat.title}</h3><span class="pill">\${cat.badge}</span></div>
          \${cat.fields.map(f => {
            const opts = state.allowedEnums[f.key] || [];
            const cur = String(getVal(state.settings, f.key));
            return \`<div class="field"><label>\${f.label}<code>\${f.key}</code></label>
              <select data-key="\${f.key}" onchange="onFieldChange(this.dataset.key, this.value)">
                \${opts.map(o => \`<option value="\${o}" \${String(o) === cur ? 'selected' : ''}>\${o}</option>\`).join('')}
              </select></div>\`;
          }).join('')}
        </div>\`).join('');
    }
    async function fetchState() {
      const r = await fetch('/api/settings?scope=' + state.scope);
      renderUI(await r.json());
    }
    window.onFieldChange = (k, v) => { setVal(state.settings, k, /^\\d+$/.test(v) ? Number(v) : v); state.settings.preset = 'custom'; };
    window.applyPresetClick = async (preset) => {
      const r = await fetch('/api/preset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ preset, scope: state.scope }) });
      const d = await r.json(); renderUI({ ...state, ...d, syncStatus: d.syncReport?.platforms });
      document.getElementById('toast').textContent = \`✅ Applied \${preset} (\${d.elapsedMs}ms)\`;
    };
    document.getElementById('scopeSelect').onchange = (e) => { state.scope = e.target.value; fetchState(); };
    document.getElementById('saveBtn').onclick = async () => {
      const r = await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings: state.settings, scope: state.scope }) });
      const d = await r.json(); renderUI({ ...state, ...d, syncStatus: d.syncReport?.platforms });
      document.getElementById('toast').textContent = \`✅ Saved & Synced (\${d.elapsedMs}ms)\`;
    };
    document.getElementById('resetBtn').onclick = async () => {
      const r = await fetch('/api/reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ scope: state.scope }) });
      const d = await r.json(); renderUI({ ...state, ...d, syncStatus: d.syncReport?.platforms });
      document.getElementById('toast').textContent = \`✅ Reset to Defaults (\${d.elapsedMs}ms)\`;
    };
    fetchState();
  </script>
</body>
</html>`;
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 100_000) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

async function handleSettingsApiRequest(req, res, options = {}) {
  const parsedUrl = new URL(req.url || '/', 'http://127.0.0.1');
  const pathname = parsedUrl.pathname;

  try {
    if (req.method === 'GET' && pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(renderDashboardHtml());
      return true;
    }
    if (req.method === 'GET' && pathname === '/api/settings') {
      const scope = parsedUrl.searchParams.get('scope') === 'project' ? 'project' : 'global';
      const opts = { ...options, scope };
      const settings = loadSettings(opts);
      const syncReport = syncSettingsToInstalledPlatforms(settings, opts);
      sendJson(res, 200, {
        ok: true,
        settings,
        presets: PRESETS,
        allowedEnums: ALLOWED_ENUMS,
        markdownPreview: renderActiveSettingsMarkdown(settings),
        syncStatus: syncReport.platforms,
        paths: getSettingsPaths(opts),
      });
      return true;
    }
    if (req.method === 'POST' && pathname === '/api/settings') {
      const body = await readRequestBody(req);
      const scope = body.scope === 'project' ? 'project' : 'global';
      const result = saveSettings(body.settings || {}, { ...options, scope });
      sendJson(res, 200, {
        ok: true,
        elapsedMs: result.syncReport?.elapsedMs ?? 0,
        settings: result.settings,
        markdownPreview: renderActiveSettingsMarkdown(result.settings),
        syncReport: result.syncReport,
      });
      return true;
    }
    if (req.method === 'POST' && pathname === '/api/preset') {
      const body = await readRequestBody(req);
      const scope = body.scope === 'project' ? 'project' : 'global';
      const result = applyPreset(body.preset, { ...options, scope });
      sendJson(res, 200, {
        ok: true,
        elapsedMs: result.syncReport?.elapsedMs ?? 0,
        settings: result.settings,
        markdownPreview: renderActiveSettingsMarkdown(result.settings),
        syncReport: result.syncReport,
      });
      return true;
    }
    if (req.method === 'POST' && pathname === '/api/reset') {
      const body = await readRequestBody(req);
      const scope = body.scope === 'project' ? 'project' : 'global';
      const result = resetSettings({ ...options, scope });
      sendJson(res, 200, {
        ok: true,
        elapsedMs: result.syncReport?.elapsedMs ?? 0,
        settings: result.settings,
        markdownPreview: renderActiveSettingsMarkdown(result.settings),
        syncReport: result.syncReport,
      });
      return true;
    }
    sendJson(res, 404, { ok: false, error: 'Not found' });
    return false;
  } catch (err) {
    sendJson(res, 400, { ok: false, error: err instanceof Error ? err.message : String(err) });
    return true;
  }
}

function startSettingsUiServer(options = {}) {
  const host = options.host || '127.0.0.1';
  const requestedPort = typeof options.port === 'number' ? options.port : 4567;
  const server = http.createServer((req, res) => {
    handleSettingsApiRequest(req, res, options);
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(requestedPort, host, () => {
      const addr = server.address();
      const activePort = typeof addr === 'object' && addr ? addr.port : requestedPort;
      const url = `http://${host}:${activePort}`;
      if (!options.silent) {
        console.log(`\n🌐 BoomOpen Web Control Center running at: ${url}`);
        console.log('   Press Ctrl+C to stop the server.\n');
      }
      if (options.openBrowser) {
        const openCmd =
          process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
        exec(openCmd, () => {});
      }
      resolve({ server, url, port: activePort });
    });
  });
}

module.exports = {
  renderDashboardHtml,
  handleSettingsApiRequest,
  startSettingsUiServer,
};
