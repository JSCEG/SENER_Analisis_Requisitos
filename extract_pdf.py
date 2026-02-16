import pypdf
import sys

try:
    reader = pypdf.PdfReader('Propuesta de Estrategia de Transición para Requisitos de CEL (2025-2028).pdf')
    with open('pdf_content.txt', 'w', encoding='utf-8') as f:
        for page in reader.pages:
            f.write(page.extract_text() + '\n')
    print("Extraction successful")
except Exception as e:
    print(f"Error: {e}")
