import React, { useState, useMemo } from 'react';
import {
  Settings, Table, BarChart2, Activity, Plus, Trash2,
  CheckCircle, Play, RefreshCw, Layers, Map, FileText, ChevronRight, Download
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import {
  TAGUCHI_ARRAYS,
  findOptimalArray,
  generateExperimentDesign,
  runTaguchiAnalysis
} from './utils/taguchiEngine';

const Dashboard = () => {
  // --- STATE ---
  const [factors, setFactors] = useState([
    { id: 1, name: 'Sintering Temp', levels: 3, levelNames: ['1100', '1200', '1300'] },
    { id: 2, name: 'Pressure', levels: 3, levelNames: ['20', '40', '60'] }
  ]);
  const [selectedOA, setSelectedOA] = useState('L9');
  const [results, setResults] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [mode, setMode] = useState('DESIGN'); // DESIGN or ANALYSIS

  // --- DERIVED ---
  const candidates = useMemo(() => findOptimalArray(factors.length, 'mixed', factors) || ['L4'], [factors]);
  const doePlan = useMemo(() => generateExperimentDesign(factors, selectedOA), [factors, selectedOA]);

  // --- ACTIONS ---
  const addFactor = () => {
    if (factors.length < 15) {
      setFactors([...factors, { id: Date.now(), name: `Factor ${factors.length + 1}`, levels: 3, levelNames: ['1', '2', '3'] }]);
    }
  };

  const updateLevels = (id, count) => {
    setFactors(factors.map(f => f.id === id ? {
      ...f, levels: count, levelNames: Array.from({ length: count }, (_, i) => `${i + 1}`)
    } : f));
  };

  const updateLevelName = (factorId, lIdx, name) => {
    setFactors(factors.map(f => {
      if (f.id === factorId) {
        const newNames = [...f.levelNames];
        newNames[lIdx] = name;
        return { ...f, levelNames: newNames };
      }
      return f;
    }));
  };

  const handleRunAnalysis = () => {
    const numeric = results.map(r => parseFloat(r) || 0);
    const res = runTaguchiAnalysis({
      OA: TAGUCHI_ARRAYS[selectedOA],
      results: numeric,
      factors: factors,
      goal: 'LARGER_IS_BETTER'
    });
    setAnalysis(res);
  };

  const exportToExcel = () => {
    let csv = "TAGUCHI EXPERIMENT DESIGN SUMMARY\n";
    csv += `Date,${new Date().toLocaleDateString()}\n`;
    csv += `Selected Array,${selectedOA}\n`;
    csv += `Total Runs,${doePlan.array.runs}\n`;
    csv += `Total Factors,${factors.length}\n\n`;

    csv += "FACTOR DETAILS\n";
    csv += "Factor,Levels,Level Values\n";
    factors.forEach(f => {
      csv += `"${f.name}",${f.levels},"${f.levelNames.join(" | ")}"\n`;
    });
    csv += "\n";

    csv += "EXPERIMENT WORKSHEET (DOE PLAN)\n";
    csv += "Run," + factors.map(f => `"${f.name}"`).join(",") + ",Response (Manual Entry)\n";

    doePlan.runs.forEach(run => {
      const row = [run.run];
      factors.forEach(f => {
        row.push(`"${run.settings[f.name].value}"`);
      });
      csv += row.join(",") + ",\n";
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Taguchi_DOE_Plan_${selectedOA}.csv`);
    link.setAttribute("style", "display:none");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <nav className="top-nav">
        <div className="logo"><Activity size={24} color="#007AFF" /> <span>Taguchi.Ai <small>Pro</small></span></div>
        <div className="mode-tabs">
          <button className={mode === 'DESIGN' ? 'active' : ''} onClick={() => setMode('DESIGN')}><Layers size={18} /> Design Design</button>
          <button className={mode === 'ANALYSIS' ? 'active' : ''} onClick={() => {
            setMode('ANALYSIS');
            if (results.length !== doePlan.array.runs) setResults(Array(doePlan.array.runs).fill(''));
          }}><BarChart2 size={18} /> Result Analysis</button>
        </div>
      </nav>

      <main className="main-content">
        {mode === 'DESIGN' ? (
          <div className="design-view animate-in">
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '24px' }}>
              <button className="btn-secondary" onClick={() => {
                const studyFactors = [
                  { id: 1, name: 'Sintering Temp (°C)', levels: 3, levelNames: ['1100', '1200', '1300'] },
                  { id: 2, name: 'Pressure (MPa)', levels: 3, levelNames: ['20', '40', '60'] },
                  { id: 3, name: 'Holding Time (min)', levels: 3, levelNames: ['30', '60', '90'] },
                  { id: 4, name: 'Additive %', levels: 3, levelNames: ['1', '2', '3'] }
                ];
                setFactors(studyFactors);
                setSelectedOA('L9');
              }}><FileText size={16} /> Load Ceramic Strength Study</button>
              <button className="btn-secondary" onClick={exportToExcel}><Download size={16} /> Download Excel Plan</button>
            </div>

            {/* STEP 1: FACTOR DEFINITION */}
            <div className="center-card">
              <div className="card-header">
                <Settings size={20} color="#007AFF" />
                <h2>Step 1: Define Control Factors & Levels</h2>
              </div>
              <p className="card-sub">Identify input variables and specify values for each level.</p>

              <div className="factor-grid">
                {factors.map((f, fIdx) => (
                  <div key={f.id} className="factor-card">
                    <div className="f-head">
                      <span className="idx">{String.fromCharCode(65 + fIdx)}</span>
                      <input className="f-name" value={f.name} onChange={(e) => setFactors(factors.map(fx => fx.id === f.id ? { ...fx, name: e.target.value } : fx))} />
                      <button className="f-del" onClick={() => setFactors(factors.filter(fx => fx.id !== f.id))}><Trash2 size={14} /></button>
                    </div>
                    <div className="f-body">
                      <div className="level-select">
                        <label>Factor Resolution</label>
                        <select value={f.levels} onChange={(e) => updateLevels(f.id, parseInt(e.target.value))}>
                          {[2, 3, 4, 5].map(l => <option key={l} value={l}>{l} Levels</option>)}
                        </select>
                      </div>
                      <div className="level-inputs">
                        {f.levelNames.map((ln, lIdx) => (
                          <div key={lIdx} className="l-row">
                            <span>L{lIdx + 1}</span>
                            <input type="text" placeholder={`Value ${lIdx + 1}`} value={ln} onChange={(e) => updateLevelName(f.id, lIdx, e.target.value)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="add-factor-btn" onClick={addFactor} style={{ minHeight: '180px' }}><Plus size={24} /> <span>Add Factor</span></button>
              </div>
            </div>

            {/* STEP 2: ARRAY SELECTION */}
            <div className="center-card" style={{ marginTop: '32px' }}>
              <div className="card-header">
                <Map size={20} color="#007AFF" />
                <h2>Step 2: Orthogonal Array Selection</h2>
              </div>
              <div className="oa-selection-spread">
                {candidates.map(c => (
                  <button key={c} className={`oa-box ${selectedOA === c ? 'active' : ''}`} onClick={() => setSelectedOA(c)}>
                    <div className="oa-id">{c}</div>
                    <div className="oa-meta">{TAGUCHI_ARRAYS[c]?.runs} Runs | {TAGUCHI_ARRAYS[c]?.factors} Cols</div>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: THE EXPERIMENT PLAN (Hardware Map) */}
            <div className="center-card experiment-plan" style={{ marginTop: '32px' }}>
              <div className="card-header">
                <Table size={20} color="#34C759" />
                <h2>Step 3: Experiment Worksheet (DOE Plan)</h2>
              </div>
              <table className="plan-table">
                <thead>
                  <tr>
                    <th>Run</th>
                    {factors.map(f => <th key={f.id}>{f.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {doePlan.runs.map((run, rIdx) => (
                    <tr key={rIdx}>
                      <td className="run-id">{run.run}</td>
                      {factors.map(f => (
                        <td key={f.id}>
                          <span className="lvl-badge">L{run.settings[f.name].level}</span>
                          <span className="lvl-val">{run.settings[f.name].value}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="plan-footer">
                <button className="btn-final" onClick={() => setMode('ANALYSIS')}>Proceed to Results Entry <ChevronRight /></button>
              </div>
            </div>
          </div>
        ) : (
          <div className="analysis-view animate-in">
            <div className="dual-view">
              {/* DATA ENTRY PANE */}
              <div className="entry-pane panel">
                <div className="card-header"><FileText size={20} color="#007AFF" /> <h2>Results Entry</h2></div>
                <div className="result-inputs">
                  {doePlan.runs.map((r, i) => (
                    <div key={i} className="res-row">
                      <label>Run {i + 1}</label>
                      <input type="number" step="0.01" value={results[i]} onChange={(e) => {
                        const nr = [...results]; nr[i] = e.target.value; setResults(nr);
                      }} />
                    </div>
                  ))}
                </div>
                <button className="btn-calc" onClick={handleRunAnalysis}>Calculate Performance & Robustness</button>
              </div>

              {/* VISUALIZATION PANE */}
              <div className="viz-pane">
                {!analysis ? (
                  <div className="empty-viz">
                    <Activity size={48} color="#ddd" />
                    <p>Enter experimental data on the left to generate insights.</p>
                  </div>
                ) : (
                  <div className="viz-content animate-in">
                    <div className="stats-strip">
                      <div className="stat-card"><label>Optimum Level</label> <strong>{analysis.predictedPerformance.toFixed(3)}</strong></div>
                      <div className="stat-card"><label>Process Efficiency</label> <strong>{analysis.grandMeanSN.toFixed(2)} dB</strong></div>
                    </div>

                    <div className="viz-card panel">
                      <h3>Main Effects Plot (S/N)</h3>
                      <div style={{ height: '300px' }}>
                        <ResponsiveContainer>
                          <LineChart data={analysis.effects[0].map((_, lIdx) => {
                            const entry = { level: `L${lIdx + 1}` };
                            factors.forEach((f, fIdx) => entry[f.name] = analysis.effects[fIdx][lIdx]);
                            return entry;
                          })}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="level" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} unit="dB" />
                            <Tooltip />
                            <Legend />
                            {factors.map((f, i) => <Line key={f.id} type="monotone" dataKey={f.name} stroke={['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE'][i % 5]} strokeWidth={3} dot={{ r: 6 }} />)}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="viz-card panel">
                      <h3>ANOVA Significance</h3>
                      <table className="stats-table">
                        <thead><tr><th>Factor</th><th>df</th><th>SS</th><th>F-Ratio</th><th>% Contrib</th></tr></thead>
                        <tbody>
                          {analysis.anovaTable.map((row, i) => (
                            <tr key={i}>
                              <td><strong>{row.factor}</strong></td>
                              <td>{row.df}</td>
                              <td>{row.ss.toFixed(4)}</td>
                              <td>{row.f.toFixed(2)}</td>
                              <td style={{ color: '#007AFF' }}><strong>{row.contribution.toFixed(1)}%</strong></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        :root { --accent: #007AFF; --bg: #f5f5f7; --text: #1d1d1f; --border: #d2d2d7; }
        .app-container { background: var(--bg); min-height: 100vh; font-family: -apple-system, system-ui, sans-serif; color: var(--text); }
        .top-nav { background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 0 40px; display: flex; justify-content: space-between; align-items: center; height: 64px; position: sticky; top: 0; z-index: 100; }
        .logo { font-weight: 700; font-size: 20px; display: flex; align-items: center; gap: 8px; }
        .mode-tabs { display: flex; gap: 8px; background: #eee; padding: 4px; border-radius: 12px; }
        .mode-tabs button { border: none; padding: 8px 16px; border-radius: 9px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; background: transparent; transition: 0.2s; color: #555; }
        .mode-tabs button.active { background: #fff; color: var(--accent); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

        .main-content { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
        .center-card { background: #fff; border-radius: 24px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.05); }
        .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .card-header h2 { margin: 0; font-size: 20px; font-weight: 700; }
        .card-sub { color: #86868b; margin-bottom: 32px; font-size: 15px; }

        /* DESIGN MODE */
        .factor-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .factor-card { background: #f9f9fb; border-radius: 16px; padding: 20px; border: 1px solid #eee; }
        .f-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .f-head .idx { background: var(--accent); color: #fff; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-weight: 800; font-size: 12px; }
        .f-head .f-name { border: none; background: transparent; font-weight: 700; font-size: 16px; outline: none; flex: 1; border-bottom: 1px solid transparent; }
        .f-head .f-name:focus { border-bottom-color: var(--accent); }
        .f-del { border: none; background: #fff; color: #ff3b30; width: 28px; height: 28px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.2s; }
        .factor-card:hover .f-del { opacity: 1; }

        .f-body select { width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--border); margin: 8px 0 16px; outline: none; }
        .level-inputs .l-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .level-inputs span { width: 30px; font-size: 12px; font-weight: 700; color: #86868b; }
        .level-inputs input { flex: 1; padding: 8px; border-radius: 6px; border: 1px solid #e5e5e7; font-size: 13px; }
        
        .add-factor-btn { background: transparent; border: 2px dashed #ddd; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; transition: 0.3s; color: #aaa; }
        .add-factor-btn:hover { border-color: var(--accent); color: var(--accent); background: #f0f7ff; }

        .oa-selection-spread { display: flex; gap: 12px; flex-wrap: wrap; }
        .oa-box { background: #f2f2f7; border: 2px solid transparent; padding: 16px 24px; border-radius: 14px; cursor: pointer; transition: 0.2s; text-align: center; }
        .oa-box.active { border-color: var(--accent); background: #fff; box-shadow: 0 8px 20px rgba(0,122,255,0.1); }
        .oa-box .oa-id { font-size: 18px; font-weight: 800; margin-bottom: 4px; }
        .oa-box .oa-meta { font-size: 12px; color: #86868b; }

        .plan-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .plan-table th { text-align: left; padding: 16px; background: #f9f9fb; font-size: 13px; font-weight: 600; color: #86868b; border-bottom: 1px solid #efefef; }
        .plan-table td { padding: 16px; border-bottom: 1px solid #f2f2f7; font-size: 14px; }
        .lvl-badge { background: #eee; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 800; margin-right: 8px; color: #666; }
        .run-id { font-weight: 700; color: #000; }
        .plan-footer { margin-top: 32px; display: flex; justify-content: flex-end; }
        .btn-final { background: var(--accent); color: #fff; border: none; padding: 16px 32px; border-radius: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
        .btn-final:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,122,255,0.3); }

        /* ANALYSIS VIEW */
        .dual-view { display: grid; grid-template-columns: 320px 1fr; gap: 32px; }
        .entry-pane { background: #fff; padding: 24px; border-radius: 20px; border: 1px solid #eee; position: sticky; top: 100px; height: fit-content; }
        .res-row { margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
        .res-row label { font-size: 13px; font-weight: 600; color: #86868b; }
        .res-row input { width: 100px; padding: 8px; border-radius: 8px; border: 1px solid var(--border); text-align: right; font-weight: 700; }
        .btn-calc { width: 100%; margin-top: 20px; background: #34C759; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 700; cursor: pointer; }
        .empty-viz { height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ccc; }
        .stats-strip { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
        .stat-card { background: #fff; padding: 24px; border-radius: 20px; border: 1px solid #eee; }
        .stat-card label { display: block; font-size: 12px; font-weight: 700; color: #86868b; text-transform: uppercase; margin-bottom: 8px; }
        .stat-card strong { font-size: 32px; color: var(--accent); }
        .panel { background: #fff; padding: 24px; border-radius: 20px; margin-bottom: 24px; border: 1px solid #eee; }
        .stats-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .stats-table th { text-align: left; padding: 12px; font-size: 12px; color: #86868b; border-bottom: 2px solid #f5f5f7; }
        .stats-table td { padding: 12px; border-bottom: 1px solid #f9f9fb; font-size: 14px; }

        .animate-in { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Dashboard;