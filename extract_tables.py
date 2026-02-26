from bs4 import BeautifulSoup

with open('insumos/presentacion_otorgamiento_cel.html' if False else 'presentacion_otorgamiento_cel.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

tables = soup.find_all('table', class_='comp-table')
print(f"Found {len(tables)} tables")

for t_idx, table in enumerate(tables):
    rows = table.find_all('tr')
    print(f"\n--- Table {t_idx + 1} ---")
    for row in rows:
        cells = row.find_all(['th', 'td'])
        row_data = [cell.get_text(strip=True) for cell in cells]
        print(" | ".join(row_data))
