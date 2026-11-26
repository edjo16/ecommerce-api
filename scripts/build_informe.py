"""Genera reports/informe-final-calidad.pdf a partir de los documentos Markdown del proyecto.

Requisitos: pip install markdown ; Microsoft Edge o Google Chrome instalados (impresión headless).
Uso (desde la raíz del proyecto): python scripts/build_informe.py
"""
import html
import pathlib
import subprocess
import sys

import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
SALIDA_HTML = ROOT / 'reports' / 'informe-final-calidad.html'
SALIDA_PDF = ROOT / 'reports' / 'informe-final-calidad.pdf'

SECCIONES = [
    ('1. README: instalación, pruebas, cobertura, lint, Stryker y CI', 'README.md'),
    ('2. Entregables de calidad y riesgo residual', 'reports/entregables-calidad.md'),
    ('3. Índice de evidencias', 'reports/INDICE-EVIDENCIAS.md'),
    ('4. Clasificación de sobrevivientes (Stryker)', 'reports/sobrevivientes-baseline.md'),
    ('5. Memo de comparación con IA y registro de IA', 'reports/memo-ia-comparacion.md'),
    ('6. Triage de hallazgos de lint', 'reports/triage-lint.md'),
    ('Anexo A. Prompt enviado al modelo de IA', 'reports/prompt-ia.md'),
]

ESTILO = """
@page { size: A4; margin: 16mm 15mm; }
body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; line-height: 1.45; color: #1f2328; }
h1 { font-size: 18pt; color: #0b3d6b; border-bottom: 2px solid #0b3d6b; padding-bottom: 4px; }
h2 { font-size: 13.5pt; color: #0b3d6b; margin-top: 16px; }
h3 { font-size: 11.5pt; color: #24292f; margin-top: 12px; }
table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 8.8pt; }
th, td { border: 1px solid #d0d7de; padding: 4px 6px; vertical-align: top; text-align: left; }
th { background: #eef4fa; }
code { font-family: Consolas, 'Courier New', monospace; font-size: 8.8pt; background: #f3f4f6; padding: 0 3px; border-radius: 3px; }
pre { background: #f6f8fa; border: 1px solid #d0d7de; padding: 8px; overflow-wrap: anywhere; white-space: pre-wrap; font-size: 8.2pt; }
pre code { background: none; padding: 0; }
a { color: #0b5cad; text-decoration: none; word-break: break-all; }
section.pagina { page-break-before: always; }
.portada { text-align: center; padding-top: 90px; }
.portada h1 { border: none; font-size: 26pt; }
.portada p { font-size: 11pt; }
.meta { margin: 30px auto; width: 80%; text-align: left; }
.meta td { border: none; border-bottom: 1px solid #d0d7de; font-size: 9.5pt; }
ul.indice li { margin: 4px 0; }
"""


def leer(ruta):
    return (ROOT / ruta).read_text(encoding='utf-8')


def a_html(texto):
    return markdown.markdown(texto, extensions=['tables', 'fenced_code', 'sane_lists'])


def construir_html():
    partes = []
    partes.append(
        '<section class="portada">'
        '<h1>Informe final de calidad</h1>'
        '<p><strong>API de comercio electrónico (ecommerce-app)</strong></p>'
        '<p>Universidad Tecnológica de Panamá · Asignación N.º 1: Suite automatizada de pruebas de software</p>'
        '<table class="meta">'
        '<tr><td>Repositorio</td><td>https://github.com/edjo16/ecommerce-api</td></tr>'
        '<tr><td>Rama de entrega</td><td>task3-lint-triage-fuzz (PR sin fusionar)</td></tr>'
        '<tr><td>Commit de código verificado</td><td>1e928eb</td></tr>'
        '<tr><td>Corrida verde de CI</td><td>https://github.com/edjo16/ecommerce-api/actions/runs/45745868188</td></tr>'
        '<tr><td>Fecha del informe</td><td>25 de noviembre de 2026</td></tr>'
        '</table>'
        '</section>'
    )
    indice = ['<section class="pagina"><h1>Contenido</h1><ul class="indice">']
    for titulo, _ in SECCIONES:
        indice.append(f'<li>{html.escape(titulo)}</li>')
    indice.append('</ul></section>')
    partes.append(''.join(indice))
    for titulo, ruta in SECCIONES:
        partes.append(f'<section class="pagina" id="{html.escape(ruta)}">')
        partes.append(a_html(leer(ruta)))
        partes.append('</section>')
    return (
        '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">'
        '<title>Informe final de calidad</title>'
        f'<style>{ESTILO}</style></head><body>' + ''.join(partes) + '</body></html>'
    )


def encontrar_navegador():
    candidatos = [
        r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
        r'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
    ]
    for ruta in candidatos:
        if pathlib.Path(ruta).exists():
            return ruta
    sys.exit('No se encontró Microsoft Edge ni Google Chrome para generar el PDF.')


def main():
    SALIDA_HTML.write_text(construir_html(), encoding='utf-8')
    navegador = encontrar_navegador()
    subprocess.run(
        [
            navegador,
            '--headless=new',
            '--disable-gpu',
            '--no-pdf-header-footer',
            f'--print-to-pdf={SALIDA_PDF}',
            SALIDA_HTML.as_uri(),
        ],
        check=True,
        timeout=180,
    )
    print(f'PDF generado: {SALIDA_PDF}')


if __name__ == '__main__':
    main()
