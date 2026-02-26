import os
import glob

html_files = glob.glob('*.html')
nav_item = '            <li class="nav-item"><a href="hidrogeno_verde.html" class="nav-link">Hidrógeno Verde</a></li>\n'
search_string = '<li class="nav-item"><a href="construccion.html" class="nav-link">Sistema de Comercio de Emisiones</a></li>'

for file in html_files:
    if file == 'hidrogeno_verde.html':
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if search_string in content and 'hidrogeno_verde.html' not in content:
        print(f"Updating {file}")
        content = content.replace(search_string, search_string + '\n' + nav_item)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
    elif 'hidrogeno_verde.html' in content:
        print(f"Skipping {file} (already updated)")
    else:
        # Some files might have slightly different formatting
        alt_search = '<a href="construccion.html" class="nav-link">Sistema de Comercio de Emisiones</a></li>'
        if alt_search in content:
            print(f"Updating {file} with alt search")
            content = content.replace(alt_search, alt_search + '\n' + nav_item)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
        else:
            print(f"Could not find anchor in {file}")
            
print("Done.")
