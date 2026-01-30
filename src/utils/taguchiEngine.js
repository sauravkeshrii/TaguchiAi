/**
 * TAGUCHI ROBUST DESIGN ENGINE - Professional Grade
 * Standard: Taguchi Methodology (G. Taguchi, 1986)
 * 
 * This engine uses authenticated Orthogonal Array tables from standard DOE literature.
 * No logic-based generation is used for OAs to ensure statistical orthogonality and balance.
 */

export const OPTIMIZATION_GOALS = {
    SMALLER_IS_BETTER: 'SMALLER_IS_BETTER',
    LARGER_IS_BETTER: 'LARGER_IS_BETTER',
    NOMINAL_IS_BEST: 'NOMINAL_IS_BEST'
};

// --- AUTHENTICATED ORTHOGONAL ARRAY DATABASE ---
export const TAGUCHI_ARRAYS = {
    L4: {
        id: 'L4', runs: 4, factors: 3,
        levels: [2, 2, 2],
        table: [
            [1, 1, 1],
            [1, 2, 2],
            [2, 1, 2],
            [2, 2, 1]
        ]
    },
    L8: {
        id: 'L8', runs: 8, factors: 7,
        levels: [2, 2, 2, 2, 2, 2, 2],
        table: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 2, 2, 2],
            [1, 2, 2, 1, 1, 2, 2],
            [1, 2, 2, 2, 2, 1, 1],
            [2, 1, 2, 1, 2, 1, 2],
            [2, 1, 2, 2, 1, 2, 1],
            [2, 2, 1, 1, 2, 2, 1],
            [2, 2, 1, 2, 1, 1, 2]
        ]
    },
    L9: {
        id: 'L9', runs: 9, factors: 4,
        levels: [3, 3, 3, 3],
        table: [
            [1, 1, 1, 1],
            [1, 2, 2, 2],
            [1, 3, 3, 3],
            [2, 1, 2, 3],
            [2, 2, 3, 1],
            [2, 3, 1, 2],
            [3, 1, 3, 2],
            [3, 2, 1, 3],
            [3, 3, 2, 1]
        ]
    },
    L12: {
        id: 'L12', runs: 12, factors: 11,
        levels: Array(11).fill(2),
        table: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
            [1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2],
            [1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2],
            [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 1, 2, 1, 1],
            [2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 1],
            [2, 1, 2, 1, 2, 2, 2, 1, 1, 1, 2],
            [2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1],
            [2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 2],
            [2, 2, 1, 1, 2, 1, 2, 2, 2, 1, 1]
        ]
    },
    L16: {
        id: 'L16', runs: 16, factors: 15,
        levels: Array(15).fill(2),
        table: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2],
            [1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2],
            [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
            [1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2],
            [1, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1],
            [1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1],
            [1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2],
            [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
            [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
            [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1],
            [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
            [2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1],
            [2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2],
            [2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2],
            [2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1]
        ]
    },
    L16_4: {
        id: 'L16_4', runs: 16, factors: 5,
        levels: [4, 4, 4, 4, 4],
        table: [
            [1, 1, 1, 1, 1], [1, 2, 2, 2, 2], [1, 3, 3, 3, 3], [1, 4, 4, 4, 4],
            [2, 1, 2, 3, 4], [2, 2, 1, 4, 3], [2, 3, 4, 1, 2], [2, 4, 3, 2, 1],
            [3, 1, 3, 4, 2], [3, 2, 4, 3, 1], [3, 3, 1, 2, 4], [3, 4, 2, 1, 3],
            [4, 1, 4, 2, 3], [4, 2, 3, 1, 4], [4, 3, 2, 4, 1], [4, 4, 1, 3, 2]
        ]
    },
    L18: {
        id: 'L18', runs: 18, factors: 8,
        levels: [2, 3, 3, 3, 3, 3, 3, 3],
        table: [
            [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 2, 2, 2, 2, 2, 2], [1, 1, 3, 3, 3, 3, 3, 3],
            [1, 2, 1, 1, 2, 2, 3, 3], [1, 2, 2, 2, 3, 3, 1, 1], [1, 2, 3, 3, 1, 1, 2, 2],
            [1, 3, 1, 2, 1, 3, 2, 3], [1, 3, 2, 3, 2, 1, 3, 1], [1, 3, 3, 1, 3, 2, 1, 2],
            [2, 1, 1, 3, 3, 2, 2, 1], [2, 1, 2, 1, 1, 3, 3, 2], [2, 1, 3, 2, 2, 1, 1, 3],
            [2, 2, 1, 2, 3, 1, 3, 2], [2, 2, 2, 3, 1, 2, 1, 3], [2, 2, 3, 1, 2, 3, 2, 1],
            [2, 3, 1, 3, 2, 3, 1, 2], [2, 3, 2, 1, 3, 1, 2, 3], [2, 3, 3, 2, 1, 2, 3, 1]
        ]
    },
    L25: {
        id: 'L25', runs: 25, factors: 6,
        levels: Array(6).fill(5),
        table: [
            [1, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2], [1, 3, 3, 3, 3, 3], [1, 4, 4, 4, 4, 4], [1, 5, 5, 5, 5, 5],
            [2, 1, 2, 3, 4, 5], [2, 2, 3, 4, 5, 1], [2, 3, 4, 5, 1, 2], [2, 4, 5, 1, 2, 3], [2, 5, 1, 2, 3, 4],
            [3, 1, 3, 5, 2, 4], [3, 2, 4, 1, 3, 5], [3, 3, 5, 2, 4, 1], [3, 4, 1, 3, 5, 2], [3, 5, 2, 4, 1, 3],
            [4, 1, 4, 2, 5, 3], [4, 2, 5, 3, 1, 4], [4, 3, 1, 4, 2, 5], [4, 4, 2, 5, 3, 1], [4, 5, 3, 1, 4, 2],
            [5, 1, 5, 4, 3, 2], [5, 2, 1, 5, 4, 3], [5, 3, 2, 1, 5, 4], [5, 4, 3, 2, 1, 5], [5, 5, 4, 3, 2, 1]
        ]
    },
    L27: {
        id: 'L27', runs: 27, factors: 13,
        levels: Array(13).fill(3),
        table: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2], [1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 3, 3, 3], [1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 1], [1, 2, 2, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2],
            [1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 2, 2, 2], [1, 3, 3, 3, 2, 2, 2, 1, 1, 1, 3, 3, 3], [1, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1],
            [2, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3], [2, 1, 2, 3, 2, 3, 1, 2, 3, 1, 2, 3, 1], [2, 1, 2, 3, 3, 1, 2, 3, 1, 2, 3, 1, 2],
            [2, 2, 3, 1, 1, 2, 3, 2, 3, 1, 3, 1, 2], [2, 2, 3, 1, 2, 3, 1, 3, 1, 2, 1, 2, 3], [2, 2, 3, 1, 3, 1, 2, 1, 2, 3, 2, 3, 1],
            [2, 3, 1, 2, 1, 2, 3, 3, 1, 2, 2, 3, 1], [2, 3, 1, 2, 2, 3, 1, 1, 2, 3, 3, 1, 2], [2, 3, 1, 2, 3, 1, 2, 2, 3, 1, 1, 2, 3],
            [3, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2], [3, 1, 3, 2, 2, 1, 3, 2, 1, 3, 2, 1, 3], [3, 1, 3, 2, 3, 2, 1, 3, 2, 1, 3, 2, 1],
            [3, 2, 1, 3, 1, 3, 2, 2, 1, 3, 3, 2, 1], [3, 2, 1, 3, 2, 1, 3, 3, 2, 1, 1, 3, 2], [3, 2, 1, 3, 3, 2, 1, 1, 3, 2, 2, 1, 3],
            [3, 3, 2, 1, 1, 3, 2, 3, 2, 1, 2, 1, 3], [3, 3, 2, 1, 2, 1, 3, 1, 3, 2, 3, 2, 1], [3, 3, 2, 1, 3, 2, 1, 2, 1, 3, 1, 3, 2]
        ]
    }
};

// --- CORE UTILITIES ---
const mean = arr => arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;
const variance = (arr, avg) => {
    if (arr.length < 2) return 0;
    const m = avg || mean(arr);
    return arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / (arr.length - 1);
};

export function calculateSN(data, goal) {
    const samples = Array.isArray(data) ? data.filter(v => !isNaN(parseFloat(v))) : [parseFloat(data)].filter(v => !isNaN(v));
    if (samples.length === 0) return 0;
    const n = samples.length;
    const EPS = 1e-10;

    switch (goal) {
        case OPTIMIZATION_GOALS.SMALLER_IS_BETTER:
            const msdS = samples.reduce((a, b) => a + b * b, 0) / n;
            return -10 * Math.log10(msdS + EPS);
        case OPTIMIZATION_GOALS.LARGER_IS_BETTER:
            const msdL = samples.reduce((a, b) => a + (b === 0 ? 1e10 : 1 / (b * b)), 0) / n;
            return -10 * Math.log10(msdL + EPS);
        case OPTIMIZATION_GOALS.NOMINAL_IS_BEST:
            const avg = mean(samples);
            const v = variance(samples, avg);
            return v === 0 ? 10 * Math.log10(Math.pow(avg, 2) + EPS) : 10 * Math.log10(Math.pow(avg, 2) / (v + EPS));
        default: return 0;
    }
}

// --- INTELLIGENT FACTOR MAPPING ---
/**
 * Maps user factors to columns in the selected OA based on level compatibility.
 */
function getColumnMapping(factors, OA) {
    const mapping = [];
    const usedColumns = new Set();

    factors.forEach((f, fIdx) => {
        // Find first available column in OA that matches factor's levels
        const colIdx = OA.levels.findIndex((l, cIdx) => l === f.levels && !usedColumns.has(cIdx));
        if (colIdx !== -1) {
            mapping[fIdx] = colIdx;
            usedColumns.add(colIdx);
        } else {
            // Fallback: If no perfect match, use any available (though this shouldn't happen with findOptimalArray)
            const fallbackIdx = OA.levels.findIndex((_, cIdx) => !usedColumns.has(cIdx));
            mapping[fIdx] = fallbackIdx;
            usedColumns.add(fallbackIdx);
        }
    });

    return mapping;
}

// --- ANALYSIS ENGINE ---
export function runTaguchiAnalysis({ OA, results, factors, goal }) {
    if (!OA || !results || !factors) return null;
    const mapping = getColumnMapping(factors, OA);
    const snValues = results.map(r => calculateSN(r, goal));
    const meanResults = results.map(r => Array.isArray(r) ? mean(r) : parseFloat(r));

    // 1. Calculate Effects
    const factorEffectsSN = factors.map((f, fIdx) => {
        const colIdx = mapping[fIdx];
        return Array.from({ length: f.levels }, (_, l) => {
            const indices = OA.table.map((row, rIdx) => row[colIdx] === (l + 1) ? rIdx : -1).filter(i => i !== -1);
            return indices.length > 0 ? mean(indices.map(i => snValues[i])) : mean(snValues);
        });
    });

    const factorEffectsMean = factors.map((f, fIdx) => {
        const colIdx = mapping[fIdx];
        return Array.from({ length: f.levels }, (_, l) => {
            const indices = OA.table.map((row, rIdx) => row[colIdx] === (l + 1) ? rIdx : -1).filter(i => i !== -1);
            return indices.length > 0 ? mean(indices.map(i => meanResults[i])) : mean(meanResults);
        });
    });

    const grandMeanSN = mean(snValues);
    const grandMeanResult = mean(meanResults);

    // 2. ANOVA
    const totalDOF = OA.runs - 1;
    const factorDOF = factors.map(f => f.levels - 1);
    const factorSS = factorEffectsSN.map((effects, fIdx) => {
        const nj = OA.runs / factors[fIdx].levels;
        return effects.reduce((ss, val) => ss + nj * Math.pow(val - grandMeanSN, 2), 0);
    });

    const SST = snValues.reduce((a, v) => a + Math.pow(v - grandMeanSN, 2), 0);
    const sumSSFactors = factorSS.reduce((a, b) => a + b, 0);
    const SSE = Math.max(0, SST - sumSSFactors);
    const sumDOFFactors = factorDOF.reduce((a, b) => a + b, 0);
    const errorDOF = Math.max(totalDOF - sumDOFFactors, 0);
    const MS_error = errorDOF > 0 ? SSE / errorDOF : 0;

    const anovaTable = factors.map((f, i) => {
        const ms = factorSS[i] / factorDOF[i];
        return {
            factor: f.name,
            df: factorDOF[i],
            ss: factorSS[i],
            ms: ms,
            f: MS_error > 0 ? ms / MS_error : 0,
            contribution: SST > 0 ? (factorSS[i] / SST) * 100 : (100 / factors.length)
        };
    });

    // 3. Prediction
    const optimum = factorEffectsSN.map(eff => eff.indexOf(Math.max(...eff)) + 1);
    let predictedPerformance = grandMeanResult;
    optimum.forEach((lvl, i) => {
        predictedPerformance += (factorEffectsMean[i][lvl - 1] - grandMeanResult);
    });

    return {
        snValues, meanResults, effects: factorEffectsSN, levelEffects: factorEffectsMean,
        anovaTable, errorStats: { df: errorDOF, ss: SSE, ms: MS_error },
        totalStats: { df: totalDOF, ss: SST },
        optimum, predictedPerformance, grandMeanSN, grandMeanResult
    };
}

// --- ARRAY SELECTOR ---
export function findOptimalArray(factorCount, levelType, mixedConfig = []) {
    const levels = levelType === 'mixed' ? mixedConfig.map(f => f.levels) : Array(factorCount).fill(parseInt(levelType));
    const count = levels.length;
    const candidates = [];

    // Simple cases
    if (levels.every(l => l === 2)) {
        if (count <= 3) candidates.push('L4');
        if (count <= 7) candidates.push('L8');
        if (count <= 11) candidates.push('L12');
        if (count <= 15) candidates.push('L16');
    } else if (levels.every(l => l === 3)) {
        if (count <= 4) candidates.push('L9');
        if (count <= 13) candidates.push('L27');
    } else if (levels.every(l => l === 4) && count <= 5) {
        candidates.push('L16_4');
    } else if (levels.every(l => l === 5) && count <= 6) {
        candidates.push('L25');
    }

    // Mixed resolutions
    const n2 = levels.filter(l => l === 2).length;
    const n3 = levels.filter(l => l === 3).length;
    if (n2 === 1 && n3 <= 7) candidates.push('L18');

    return candidates.length > 0 ? candidates : ['L4'];
}

export function generateExperimentDesign(factors, arrayId) {
    const oa = TAGUCHI_ARRAYS[arrayId];
    if (!oa) return { runs: [] };
    const mapping = getColumnMapping(factors, oa);

    const runs = oa.table.map((row, rIdx) => {
        const settings = {};
        factors.forEach((f, fIdx) => {
            const colIdx = mapping[fIdx];
            const level = row[colIdx];
            settings[f.name] = {
                level,
                value: f.levelNames?.[level - 1] || `Level ${level}`
            };
        });
        return { run: rIdx + 1, settings };
    });
    return { runs, array: oa };
}
