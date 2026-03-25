document.addEventListener('DOMContentLoaded', () => {
    const familyDefinitions = {
        energy: {
            label: 'Energía y electricidad',
            accent: 'guinda',
            description: 'Conversión entre unidades eléctricas y térmicas de referencia.',
            referenceTitle: 'Equivalencias base',
            references: [
                '1 MWh = 1,000 kWh = 3.6 GJ = 3,412,142 Btu.',
                '1 TWh = 1,000,000 MWh.',
                '1 toe = 11.63 MWh.',
                '1 boe = 5.8 MMBtu = 1.6998 MWh.'
            ],
            units: {
                Wh: { label: 'Wh', factor: 0.001, note: 'Watt-hora' },
                kWh: { label: 'kWh', factor: 1, note: 'Kilowatt-hora' },
                MWh: { label: 'MWh', factor: 1000, note: 'Megawatt-hora' },
                GWh: { label: 'GWh', factor: 1000000, note: 'Gigawatt-hora' },
                TWh: { label: 'TWh', factor: 1000000000, note: 'Terawatt-hora' },
                MJ: { label: 'MJ', factor: 0.2777777778, note: 'Megajoule' },
                GJ: { label: 'GJ', factor: 277.7777778, note: 'Gigajoule' },
                TJ: { label: 'TJ', factor: 277777.7778, note: 'Terajoule' },
                MMBtu: { label: 'MMBtu', factor: 293.07107, note: 'Millones de Btu' },
                toe: { label: 'toe', factor: 11630, note: 'Tonelada equivalente de petróleo' },
                boe: { label: 'boe', factor: 1699.812206, note: 'Barril equivalente de petróleo' }
            }
        },
        naturalGas: {
            label: 'Gas natural',
            accent: 'verde',
            description: 'Conversión referencial con poder calorífico promedio.',
            referenceTitle: 'Supuestos de referencia',
            references: [
                'Se usa 1 scf = 1,037 Btu como referencia media.',
                '1 MMBtu ≈ 962.46 scf.',
                '1 m³ ≈ 0.03666 MMBtu.',
                'Ajusta con el PCS/PCI contractual si necesitas precisión comercial.'
            ],
            units: {
                MMBtu: { label: 'MMBtu', factor: 1, note: 'Base energética' },
                GJ: { label: 'GJ', factor: 0.94781712, note: 'Gigajoule' },
                kWh: { label: 'kWh', factor: 0.0034121416, note: 'Conversión térmica' },
                scf: { label: 'scf', factor: 0.001037, note: 'Pie cúbico estándar' },
                Mscf: { label: 'Mscf', factor: 1.037, note: 'Mil pies cúbicos estándar' },
                MMscf: { label: 'MMscf', factor: 1037, note: 'Millón de pies cúbicos estándar' },
                m3: { label: 'm³', factor: 0.036626, note: 'Metro cúbico' },
                Nm3: { label: 'Nm³', factor: 0.036626, note: 'Metro cúbico normal' }
            }
        },
        lpg: {
            label: 'Gas LP',
            accent: 'dorado',
            description: 'Equivalencias aproximadas de masa, volumen y contenido energético.',
            referenceTitle: 'Supuestos de referencia',
            references: [
                'Densidad referencial: 0.54 kg/L.',
                'Poder calorífico: 46.1 MJ/kg.',
                '1 kg GLP ≈ 12.81 kWh.',
                'Úsalo como guía; la composición propano/butano cambia el resultado.'
            ],
            units: {
                kg: { label: 'kg GLP', factor: 1, note: 'Masa base' },
                ton: { label: 't GLP', factor: 1000, note: 'Tonelada métrica' },
                L: { label: 'L GLP', factor: 0.54, note: 'Litro líquido' },
                m3: { label: 'm³ GLP', factor: 540, note: 'Metro cúbico líquido' },
                MMBtu: { label: 'MMBtu', factor: 22.88601699, note: 'Contenido energético' },
                kWh: { label: 'kWh', factor: 0.0780947931, note: 'Equivalencia térmica' }
            }
        },
        oil: {
            label: 'Petróleo y barriles',
            accent: 'azul',
            description: 'Barriles equivalentes, volumen y energía del barril de referencia.',
            referenceTitle: 'Supuestos de referencia',
            references: [
                'Se usa 1 barril = 159 litros.',
                '1 barril equivalente = 5.8 MMBtu.',
                '1 barril ≈ 1.6998 MWh.',
                'Para productos específicos, el poder calorífico real puede variar.'
            ],
            units: {
                bbl: { label: 'Barril (bbl)', factor: 1, note: 'Barril de 159 L' },
                L: { label: 'Litros', factor: 0.0062893082, note: 'Volumen' },
                m3: { label: 'm³', factor: 6.2893081761, note: 'Metro cúbico' },
                boe: { label: 'boe', factor: 1, note: 'Barril equivalente' },
                MMBtu: { label: 'MMBtu', factor: 0.1724137931, note: 'Contenido energético' },
                GJ: { label: 'GJ', factor: 0.1634167448, note: 'Gigajoule' },
                MWh: { label: 'MWh', factor: 0.5883001985, note: 'Megawatt-hora' }
            }
        },
        hydrogen: {
            label: 'Hidrógeno',
            accent: 'verde',
            description: 'Conversión entre masa, volumen normal y energía PCI/PCS.',
            referenceTitle: 'Supuestos de referencia',
            references: [
                '1 kg H₂ ≈ 11.126 Nm³.',
                'PCI ≈ 33.33 kWh/kg.',
                'PCS ≈ 39.41 kWh/kg.',
                'El volumen depende de presión, temperatura y pureza.'
            ],
            units: {
                kg: { label: 'kg H₂', factor: 1, note: 'Masa base' },
                ton: { label: 't H₂', factor: 1000, note: 'Tonelada métrica' },
                Nm3: { label: 'Nm³ H₂', factor: 0.08988, note: 'Volumen normal' },
                kWhLHV: { label: 'kWh PCI', factor: 0.0300030003, note: 'PCI del hidrógeno' },
                MWhLHV: { label: 'MWh PCI', factor: 30.0030003, note: 'PCI del hidrógeno' },
                kWhHHV: { label: 'kWh PCS', factor: 0.02537427, note: 'PCS del hidrógeno' },
                MMBtuLHV: { label: 'MMBtu PCI', factor: 8.789316, note: 'PCI del hidrógeno' }
            }
        },
        emissions: {
            label: 'Factores de emisión',
            accent: 'guinda',
            description: 'Conversión entre intensidades de CO2e por unidad de energía.',
            referenceTitle: 'Factores sugeridos',
            references: [
                'Gas natural: 53.06 kgCO2/MMBtu.',
                'Diésel: 74.10 kgCO2/MMBtu.',
                'Combustóleo: 77.40 kgCO2/MMBtu.',
                'Para reportes regulatorios usa el factor oficial aplicable al año y metodología.'
            ],
            units: {
                kgPerMWh: { label: 'kgCO2e/MWh', toBase: (value) => value, fromBase: (value) => value, note: 'Intensidad por MWh' },
                tPerMWh: { label: 'tCO2e/MWh', toBase: (value) => value * 1000, fromBase: (value) => value / 1000, note: 'Toneladas por MWh' },
                kgPerkWh: { label: 'kgCO2e/kWh', toBase: (value) => value * 1000, fromBase: (value) => value / 1000, note: 'Kilogramos por kWh' },
                kgPerGJ: { label: 'kgCO2e/GJ', toBase: (value) => value * 3.6, fromBase: (value) => value / 3.6, note: 'Kilogramos por GJ' },
                tPerTJ: { label: 'tCO2e/TJ', toBase: (value) => value, fromBase: (value) => value, note: 'Toneladas por TJ = kg por MWh' },
                kgPerMMBtu: { label: 'kgCO2e/MMBtu', toBase: (value) => value / 0.29307107, fromBase: (value) => value * 0.29307107, note: 'Kilogramos por MMBtu' }
            }
        },
        efficiency: {
            label: 'Eficiencia térmica',
            accent: 'dorado',
            description: 'Convierte eficiencia, heat rate y consumo específico.',
            referenceTitle: 'Relaciones base',
            references: [
                'Eficiencia = 3600 / heat rate (kJ/kWh).',
                'Eficiencia = 3412.142 / heat rate (Btu/kWh).',
                'Heat rate menor implica mejor desempeño térmico.',
                'Resultados en porcentaje son sobre base energética simple.'
            ],
            units: {
                fraction: { label: 'Fracción', toBase: (value) => value, fromBase: (value) => value, note: '0 a 1' },
                percent: { label: '% eficiencia', toBase: (value) => value / 100, fromBase: (value) => value * 100, note: 'Porcentaje' },
                kJPerkWh: { label: 'kJ/kWh', toBase: (value) => 3600 / value, fromBase: (value) => 3600 / value, note: 'Heat rate' },
                BtuPerkWh: { label: 'Btu/kWh', toBase: (value) => 3412.142 / value, fromBase: (value) => 3412.142 / value, note: 'Heat rate' }
            }
        }
    };

    const emissionPresets = [
        { id: 'gas-natural', label: 'Gas natural', factor: 53.06, note: 'kgCO2/MMBtu' },
        { id: 'gas-lp', label: 'Gas LP', factor: 63.10, note: 'kgCO2/MMBtu' },
        { id: 'diesel', label: 'Diésel', factor: 74.10, note: 'kgCO2/MMBtu' },
        { id: 'combustoleo', label: 'Combustóleo', factor: 77.40, note: 'kgCO2/MMBtu' },
        { id: 'gasolina', label: 'Gasolina', factor: 71.30, note: 'kgCO2/MMBtu' }
    ];

    const elements = {
        familyChips: document.getElementById('familyChips'),
        familySelect: document.getElementById('familySelect'),
        amountInput: document.getElementById('amountInput'),
        fromUnit: document.getElementById('fromUnit'),
        toUnit: document.getElementById('toUnit'),
        resultValue: document.getElementById('resultValue'),
        resultMeta: document.getElementById('resultMeta'),
        resultNote: document.getElementById('resultNote'),
        equivalenceGrid: document.getElementById('equivalenceGrid'),
        referencesList: document.getElementById('referencesList'),
        panelToggles: document.querySelectorAll('[data-panel-toggle]'),
        emissionPreset: document.getElementById('emissionPreset'),
        emissionAmount: document.getElementById('emissionAmount'),
        emissionUnit: document.getElementById('emissionUnit'),
        emissionKg: document.getElementById('emissionKg'),
        emissionTon: document.getElementById('emissionTon'),
        emissionDetail: document.getElementById('emissionDetail'),
        peakPower: document.getElementById('peakPower'),
        peakUnit: document.getElementById('peakUnit'),
        peakHours: document.getElementById('peakHours'),
        peakFactor: document.getElementById('peakFactor'),
        peakResult: document.getElementById('peakResult'),
        peakDetail: document.getElementById('peakDetail'),
        electricalVoltage: document.getElementById('electricalVoltage'),
        electricalCurrent: document.getElementById('electricalCurrent'),
        electricalFactor: document.getElementById('electricalFactor'),
        electricalPhase: document.getElementById('electricalPhase'),
        electricalKw: document.getElementById('electricalKw'),
        electricalKva: document.getElementById('electricalKva'),
        electricalDetail: document.getElementById('electricalDetail')
    };

    const accentClassMap = { guinda: 'is-guinda', verde: 'is-verde', dorado: 'is-dorado', azul: 'is-azul' };
    let activeFamily = 'energy';

    function formatNumber(value, decimals = 6) {
        if (!Number.isFinite(value)) {
            return '—';
        }

        const absValue = Math.abs(value);
        const dynamicDecimals = absValue >= 1000 ? 2 : absValue >= 10 ? 4 : decimals;

        return new Intl.NumberFormat('es-MX', {
            maximumFractionDigits: dynamicDecimals,
            minimumFractionDigits: absValue !== 0 && absValue < 1 ? Math.min(2, dynamicDecimals) : 0
        }).format(value);
    }

    function getUnitEntries(familyKey) {
        return Object.entries(familyDefinitions[familyKey].units);
    }

    function convertValue(familyKey, unitKey, value, direction = 'toBase') {
        const unit = familyDefinitions[familyKey].units[unitKey];

        if (!unit) {
            return Number.NaN;
        }

        if (typeof unit[direction] === 'function') {
            return unit[direction](value);
        }

        if (typeof unit.factor === 'number') {
            return direction === 'toBase' ? value * unit.factor : value / unit.factor;
        }

        return Number.NaN;
    }

    function updateFamilyControls() {
        const family = familyDefinitions[activeFamily];
        const unitEntries = getUnitEntries(activeFamily);
        const previousFrom = elements.fromUnit.value;
        const previousTo = elements.toUnit.value;

        elements.familySelect.value = activeFamily;
        elements.familyChips.querySelectorAll('button').forEach((button) => {
            button.classList.toggle('is-active', button.dataset.family === activeFamily);
        });

        elements.fromUnit.innerHTML = '';
        elements.toUnit.innerHTML = '';

        unitEntries.forEach(([key, config]) => {
            const fromOption = document.createElement('option');
            fromOption.value = key;
            fromOption.textContent = config.label;
            elements.fromUnit.appendChild(fromOption);

            const toOption = document.createElement('option');
            toOption.value = key;
            toOption.textContent = config.label;
            elements.toUnit.appendChild(toOption);
        });

        elements.fromUnit.value = unitEntries.some(([key]) => key === previousFrom) ? previousFrom : unitEntries[0][0];
        elements.toUnit.value = unitEntries.some(([key]) => key === previousTo) && previousTo !== elements.fromUnit.value
            ? previousTo
            : (unitEntries[1] ? unitEntries[1][0] : unitEntries[0][0]);

        document.querySelectorAll('[data-accent-surface]').forEach((node) => {
            Object.values(accentClassMap).forEach((className) => node.classList.remove(className));
            node.classList.add(accentClassMap[family.accent]);
        });
    }

    function updateConversion() {
        const inputValue = Number.parseFloat(elements.amountInput.value);
        const fromKey = elements.fromUnit.value;
        const toKey = elements.toUnit.value;
        const family = familyDefinitions[activeFamily];

        if (!Number.isFinite(inputValue)) {
            elements.resultValue.textContent = '—';
            elements.resultMeta.textContent = 'Ingresa un valor numérico para convertir.';
            elements.resultNote.textContent = family.description;
            elements.equivalenceGrid.innerHTML = '';
            return;
        }

        const baseValue = convertValue(activeFamily, fromKey, inputValue, 'toBase');
        const convertedValue = convertValue(activeFamily, toKey, baseValue, 'fromBase');

        elements.resultValue.textContent = `${formatNumber(convertedValue)} ${family.units[toKey].label}`;
        elements.resultMeta.textContent = `${formatNumber(inputValue)} ${family.units[fromKey].label} = ${formatNumber(convertedValue)} ${family.units[toKey].label}`;
        elements.resultNote.textContent = family.units[toKey].note || family.description;

        elements.equivalenceGrid.innerHTML = getUnitEntries(activeFamily)
            .filter(([key]) => key !== fromKey)
            .slice(0, 6)
            .map(([key, config]) => {
                const converted = convertValue(activeFamily, key, baseValue, 'fromBase');
                return `
                    <article class="ecu-equivalence-card">
                        <span>${config.label}</span>
                        <strong>${formatNumber(converted)}</strong>
                        <small>${config.note || family.label}</small>
                    </article>
                `;
            })
            .join('');
    }

    function updateReferences() {
        const family = familyDefinitions[activeFamily];
        elements.referencesList.innerHTML = `
            <div class="ecu-reference-head">
                <strong>${family.referenceTitle}</strong>
                <span>${family.label}</span>
            </div>
            <ul>
                ${family.references.map((item) => `<li>${item}</li>`).join('')}
            </ul>
        `;
    }

    function updateEmissionCalculator() {
        const preset = emissionPresets.find((item) => item.id === elements.emissionPreset.value) || emissionPresets[0];
        const amount = Number.parseFloat(elements.emissionAmount.value);
        const unit = elements.emissionUnit.value;

        if (!Number.isFinite(amount)) {
            elements.emissionKg.textContent = '—';
            elements.emissionTon.textContent = '—';
            elements.emissionDetail.textContent = 'Ingresa una cantidad de energía o combustible.';
            return;
        }

        const amountInMMBtu = convertValue('naturalGas', unit, amount, 'toBase');
        const kilograms = amountInMMBtu * preset.factor;

        elements.emissionKg.textContent = `${formatNumber(kilograms)} kgCO2e`;
        elements.emissionTon.textContent = `${formatNumber(kilograms / 1000)} tCO2e`;
        elements.emissionDetail.textContent = `${formatNumber(amount)} ${familyDefinitions.naturalGas.units[unit].label} × ${preset.factor} ${preset.note}`;
    }

    function updatePeakCalculator() {
        const power = Number.parseFloat(elements.peakPower.value);
        const hours = Number.parseFloat(elements.peakHours.value);
        const factor = Number.parseFloat(elements.peakFactor.value);
        const powerFactorMap = { kW: 0.001, MW: 1, GW: 1000 };

        if (!Number.isFinite(power) || !Number.isFinite(hours) || !Number.isFinite(factor)) {
            elements.peakResult.textContent = '—';
            elements.peakDetail.textContent = 'Define potencia, horas equivalentes y factor de carga.';
            return;
        }

        const powerInMW = power * powerFactorMap[elements.peakUnit.value];
        const energyMWh = powerInMW * hours * (factor / 100);
        const energyGWh = energyMWh / 1000;

        elements.peakResult.textContent = energyGWh >= 1
            ? `${formatNumber(energyGWh)} GWh`
            : `${formatNumber(energyMWh)} MWh`;
        elements.peakDetail.textContent = `${formatNumber(powerInMW)} MW × ${formatNumber(hours)} h × ${formatNumber(factor, 2)}% = ${formatNumber(energyMWh)} MWh`;
    }

    function updateElectricalCalculator() {
        const voltage = Number.parseFloat(elements.electricalVoltage.value);
        const current = Number.parseFloat(elements.electricalCurrent.value);
        const powerFactor = Number.parseFloat(elements.electricalFactor.value);
        const isThreePhase = elements.electricalPhase.value === 'three';

        if (!Number.isFinite(voltage) || !Number.isFinite(current) || !Number.isFinite(powerFactor)) {
            elements.electricalKw.textContent = '—';
            elements.electricalKva.textContent = '—';
            elements.electricalDetail.textContent = 'Ingresa tensión, corriente y factor de potencia.';
            return;
        }

        const phaseMultiplier = isThreePhase ? Math.sqrt(3) : 1;
        const apparentPowerKva = (phaseMultiplier * voltage * current) / 1000;
        const activePowerKw = apparentPowerKva * powerFactor;

        elements.electricalKw.textContent = `${formatNumber(activePowerKw)} kW`;
        elements.electricalKva.textContent = `${formatNumber(apparentPowerKva)} kVA`;
        elements.electricalDetail.textContent = `${isThreePhase ? 'Trifásico' : 'Monofásico'}: ${phaseMultiplier === 1 ? 'V × I' : '√3 × V × I'} × FP`;
    }

    function bindEvents() {
        elements.familyChips.addEventListener('click', (event) => {
            const target = event.target.closest('button[data-family]');
            if (!target) {
                return;
            }

            activeFamily = target.dataset.family;
            updateFamilyControls();
            updateConversion();
            updateReferences();
        });

        elements.familySelect.addEventListener('change', (event) => {
            activeFamily = event.target.value;
            updateFamilyControls();
            updateConversion();
            updateReferences();
        });

        [elements.amountInput, elements.fromUnit, elements.toUnit].forEach((node) => {
            node.addEventListener('input', updateConversion);
            node.addEventListener('change', updateConversion);
        });

        [elements.emissionPreset, elements.emissionAmount, elements.emissionUnit].forEach((node) => {
            node.addEventListener('input', updateEmissionCalculator);
            node.addEventListener('change', updateEmissionCalculator);
        });

        [elements.peakPower, elements.peakUnit, elements.peakHours, elements.peakFactor].forEach((node) => {
            node.addEventListener('input', updatePeakCalculator);
            node.addEventListener('change', updatePeakCalculator);
        });

        [elements.electricalVoltage, elements.electricalCurrent, elements.electricalFactor, elements.electricalPhase].forEach((node) => {
            node.addEventListener('input', updateElectricalCalculator);
            node.addEventListener('change', updateElectricalCalculator);
        });

        elements.panelToggles.forEach((toggle) => {
            toggle.addEventListener('change', () => {
                const panel = document.querySelector(`[data-panel="${toggle.dataset.panelToggle}"]`);
                if (panel) {
                    panel.hidden = !toggle.checked;
                }
            });
        });
    }

    function renderStaticOptions() {
        elements.familyChips.innerHTML = Object.entries(familyDefinitions)
            .map(([key, family]) => `
                <button type="button" class="ecu-chip${key === activeFamily ? ' is-active' : ''}" data-family="${key}">
                    ${family.label}
                </button>
            `)
            .join('');

        elements.familySelect.innerHTML = Object.entries(familyDefinitions)
            .map(([key, family]) => `<option value="${key}">${family.label}</option>`)
            .join('');

        elements.emissionPreset.innerHTML = emissionPresets
            .map((preset) => `<option value="${preset.id}">${preset.label}</option>`)
            .join('');

        elements.emissionUnit.innerHTML = ['MMBtu', 'GJ', 'kWh', 'm3', 'Nm3', 'scf', 'Mscf']
            .map((key) => `<option value="${key}">${familyDefinitions.naturalGas.units[key].label}</option>`)
            .join('');
    }

    renderStaticOptions();
    updateFamilyControls();
    updateConversion();
    updateReferences();
    updateEmissionCalculator();
    updatePeakCalculator();
    updateElectricalCalculator();
    bindEvents();
});
