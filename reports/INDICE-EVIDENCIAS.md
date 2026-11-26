# Índice de evidencias

Repositorio: https://github.com/edjo16/ecommerce-api · Base: `master` (`d49105e`) · Rama de entrega: `task3-lint-triage-fuzz` · Pull request sin fusionar: https://github.com/edjo16/ecommerce-api/pull/new/task3-lint-triage-fuzz

## 1. Commits de la rama de entrega

| # | Commit | Mensaje | Contenido |
|---|--------|---------|-----------|
| 0 | `d49105e` | Base del proyecto (en `master`) | Código original |
| 1 | `7d59487` | `[TEST] Tareas 1 y 2: mutación con Stryker y comparación con IA` | Stryker, suite propia, pruebas IA, memo, sobrevivientes |
| 2 | `500bcf8` | `[TEST] Tarea 3: violaciones intencionales de lint (corrida en rojo)` | 5 violaciones de lint |
| 3 | `7e68582` | `[TEST] Tarea 3: lint limpio, triage y prueba fuzz` | Lint limpio, triage, fuzz |
| 4 | `14c3983` | `[TEST] Cierre: fuzz con generador sesgado y oráculo negativo` | Ajustes del fuzz y correcciones documentales |
| 5 | `3b58b6e` | `[CI] Pipeline de GitHub Actions` | `.github/workflows/ci.yml`; CP-05 y CP-06 como `it.failing` |
| 6 | `1e928eb` | `[CI] Corridas de Stryker reproducibles y cobertura` | **Commit de código verificado** (CI verde) |
| 7 | (HEAD) | Consolidación: README, índice e informe PDF | Solo documentación |

## 2. Corridas de GitHub Actions

| Run | Rama | Commit | ESLint | Jest | Resultado | Enlace |
|-----|------|--------|--------|------|-----------|--------|
| 45745868188 | `task3-lint-triage-fuzz` | `1e928eb` | ✅ | ✅ | **Verde (código final)** | https://github.com/edjo16/ecommerce-api/actions/runs/45745868188 |
| 45745389483 | `task3-lint-triage-fuzz` | `3b58b6e` | ✅ | ✅ | Verde | https://github.com/edjo16/ecommerce-api/actions/runs/45745389483 |
| 45745435188 | `ci/demo-lint-rojo` | `685a086` | ❌ | ✅ | Rojo por ESLint (demostración) | https://github.com/edjo16/ecommerce-api/actions/runs/45745435188 |
| 45745455864 | `ci/demo-test-rojo` | `69bdc8b` | ✅ | ❌ | Rojo por suite (demostración) | https://github.com/edjo16/ecommerce-api/actions/runs/45745455864 |

Verificación: consulta a la API pública `GET /repos/edjo16/ecommerce-api/actions/runs/{id}` y `/jobs`; cada run confirma `head_branch`, `head_sha` y el resultado de cada job.

## 3. Tarea 1 — Mutación (Stryker, `services/pricing.js`)

| Evidencia | Ruta |
|-----------|------|
| Configuración de la corrida "suite propia" | `stryker.pricing.config.json` |
| Jest para la corrida "suite propia" | `jest.stryker.suite-propia.config.js` |
| Reporte HTML y log (90.34 %) | `reports/stryker/suite-propia/mutation.html`, `reports/stryker/suite-propia/log.txt` |
| Baseline (85.51 %) | `reports/mutation-baseline.txt`, `reports/mutation-baseline/` |
| Después (90.34 %) | `reports/mutation-despues.txt`, `reports/mutation-despues/` |
| Tabla de sobrevivientes (6 clasificados) | `reports/sobrevivientes-baseline.md` |
| Pruebas mejoradas (38 pruebas) | `tests/services/pricing.test.js` |

## 4. Tarea 2 — Comparación con IA

| Evidencia | Ruta |
|-----------|------|
| Prompt | `reports/prompt-ia.md` |
| Pruebas del modelo sin editar (15) | `tests/ai-generated/pricing.ai-original.test.js` |
| Pruebas del modelo revisadas (34) | `tests/ai-generated/pricing.ai-reviewed.test.js` |
| Configuración y Jest de cada corrida | `stryker.ia-original.config.json`, `jest.stryker.ia-original.config.js`, `stryker.ia-revisada.config.json`, `jest.stryker.ia-revisada.config.js` |
| Reporte "modelo tal cual" (69.57 %) | `reports/stryker/ia-original/mutation.html`, `reports/stryker/ia-original/log.txt` |
| Reporte "modelo revisado" (91.79 %) | `reports/stryker/ia-revisada/mutation.html`, `reports/stryker/ia-revisada/log.txt` |
| Tabla comparativa, memo y registro de IA | `reports/memo-ia-comparacion.md` |

## 5. Tarea 3 — Lint, triage y fuzz

| Evidencia | Ruta |
|-----------|------|
| Salida de `npm run lint` en el commit final (exit 0) | `reports/lint-clean.txt` |
| Corrida roja de ESLint (5 violaciones, 2 reglas) | `reports/lint-red.txt` |
| Triage de hallazgos | `reports/triage-lint.md` |
| Solicitud de fusión sin fusionar | Rama `task3-lint-triage-fuzz`; PR sin fusionar |
| Prueba complementaria (fuzz, 500 entradas) | `tests/services/pricing.fuzz.test.js` |
| Riesgo residual de la API | `reports/entregables-calidad.md`, sección 3.5 |

## 6. Integración continua y calidad

| Evidencia | Ruta |
|-----------|------|
| Pipeline (lint + npm test en push y PR) | `.github/workflows/ci.yml` |
| Known defects H-01/H-02 como `it.failing` | `tests/services/cartService.test.js` (CP-05, CP-06) |
| Cobertura (`pricing` 100 %, `cartService` 83.33 % ramas, `productService` 84.61 % ramas) | `reports/coverage-run.txt` |
| Suite completa (9 suites, 125 pruebas, 125 PASS) | Log de `npm test` y run 45745868188 |
| README consolidado (instalación, pruebas, cobertura, lint, Stryker, CI) | `README.md` |
| Entregables y riesgo residual | `reports/entregables-calidad.md` |
| Informe final en PDF | `reports/informe-final-calidad.pdf` |

## 7. Cómo verificar esta entrega

```powershell
git clone https://github.com/edjo16/ecommerce-api.git
cd ecommerce-api
git checkout task3-lint-triage-fuzz
$env:NODE_ENV = 'test'
npm.cmd ci
npm.cmd run lint
npm.cmd test
npx stryker run stryker.pricing.config.json
```

Resultados esperados: lint sin errores, 125 pruebas en PASS (2 de ellas `it.failing`) y 90.34 % en la corrida de suite propia.

## 8. Limitaciones conocidas

- El PR sigue abierto y sin fusionar.
- El riesgo de sobreventa por concurrencia no se reprodujo.
- La línea 159 de `pricing.js` conserva un mutante vivo (`if (true)` para cupones `fixed`), pendiente de la aserción.
- La corrida baseline (85.51 %) depende de una versión de la suite que no quedó versionada; su evidencia es el reporte de texto.
- Las ramas `ci/demo-*` son artificiales y pueden eliminarse al cerrar la entrega.
