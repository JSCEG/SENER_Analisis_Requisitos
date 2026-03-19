(function () {
    const DELIVERABLES = {
        "nota-informativa": {
            title: "Nota Informativa",
            subtitle: "México ante el hidrógeno verde: qué hacen otros países y qué nos toca hacer",
            source: "insumos/d2-nota-informativa-sener.jsx"
        },
        "certificacion": {
            title: "Certificación de Hidrógeno Verde",
            subtitle: "Reconocimiento híbrido, esquema nacional y verificación administrada",
            source: "insumos/d2-certificacion-hidrogeno-mx.jsx"
        },
        "permisos": {
            title: "Permisos para Hidrógeno Verde",
            subtitle: "Vía rápida, ventanilla única, sandbox y planeación de redes",
            source: "insumos/d2-permisos-hidrogeno-mx.jsx"
        },
        "produccion-temprana": {
            title: "Producción Temprana de H₂",
            subtitle: "Asociación público-privada, CAPEX e incentivos a la producción",
            source: "insumos/d2-produccion-temprana-h2.jsx"
        },
        "demanda": {
            title: "Demanda de Hidrógeno Verde",
            subtitle: "Mandatos, offtake, compras verdes y exportación",
            source: "insumos/d2-demanda-hidrogeno-mx.jsx"
        }
    };

    function getDeliverableKey() {
        const params = new URLSearchParams(window.location.search);
        return params.get("doc") || "nota-informativa";
    }

    function updateHeader(config) {
        document.title = config.title + " - SENER";

        const titleNode = document.querySelector("[data-deliverable-title]");
        const subtitleNode = document.querySelector("[data-deliverable-subtitle]");
        const sourceNode = document.querySelector("[data-deliverable-source]");

        if (titleNode) {
            titleNode.textContent = config.title;
        }

        if (subtitleNode) {
            subtitleNode.textContent = config.subtitle;
        }

        if (sourceNode) {
            sourceNode.textContent = config.source;
        }
    }

    function showStatus(message, isError) {
        const statusNode = document.getElementById("deliverable-status");
        if (!statusNode) {
            return;
        }

        statusNode.textContent = message;
        statusNode.hidden = false;
        statusNode.classList.toggle("is-error", Boolean(isError));
    }

    function hideStatus() {
        const statusNode = document.getElementById("deliverable-status");
        if (statusNode) {
            statusNode.hidden = true;
        }
    }

    function normalizeSource(source) {
        return source
            .replace(/import\s*\{([^}]+)\}\s*from\s*["']react["'];?/g, "const {$1} = React;")
            .replace(/export\s+default\s+function\s+App/g, "function App")
            .replace(/export\s+default\s+App\s*;?/g, "");
    }

    async function renderDeliverable(config) {
        const mountNode = document.getElementById("deliverable-root");
        if (!mountNode) {
            return;
        }

        showStatus("Cargando entregable...");

        const response = await fetch(config.source, { cache: "no-store" });
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo fuente del entregable.");
        }

        const rawSource = await response.text();
        const source = normalizeSource(rawSource);
        const compiled = Babel.transform(source, {
            presets: ["react"]
        }).code;

        const factory = new Function(
            "React",
            "ReactDOM",
            compiled + "\nreturn App;"
        );

        const App = factory(window.React, window.ReactDOM);
        const root = window.ReactDOM.createRoot(mountNode);
        root.render(window.React.createElement(App));
        hideStatus();
    }

    async function init() {
        const key = getDeliverableKey();
        const config = DELIVERABLES[key];

        if (!config) {
            showStatus("El entregable solicitado no existe.", true);
            return;
        }

        updateHeader(config);

        try {
            await renderDeliverable(config);
        } catch (error) {
            showStatus(error.message || "Ocurrió un error al renderizar el entregable.", true);
        }
    }

    window.hidrogenoDeliverables = DELIVERABLES;
    window.addEventListener("DOMContentLoaded", init);
})();
