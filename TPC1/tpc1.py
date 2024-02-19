import os
import xml.etree.ElementTree as ET
from lxml import etree

def process_paragraph(element):
    html_content = ""
    if element.text:
        html_content += element.text
    for sub_element in element:
        if sub_element.tag == 'lugar':
            #html_content += f"""<a href="index.html">{sub_element.text}</a>"""
            html_content += f"<strong>{sub_element.text}</strong>"
        elif sub_element.tag == 'data':
            html_content += f"<em>{sub_element.text}</em>"
        if sub_element.tail:
            html_content += sub_element.tail
    return html_content

def process_lista_casas(element):
    html_content= ""
    if element.text:
        html_content += element.text
    for sub_element in element:
        if sub_element.tag == "número":
            html_content += f"<li>Número: {ET.tostring(sub_element, encoding='unicode', method='xml')}</li>"
        elif sub_element.tag == "enfiteuta":
            html_content += f"<p>Enfiteuta: <b>{ET.tostring(sub_element, encoding='unicode', method='xml')}</b></p>"
        elif sub_element.tag == "foro":
            html_content += f"<p>Foro: <i>{ET.tostring(sub_element, encoding='unicode', method='xml')}</i></p>"
        else: html_content += f"<p>{ET.tostring(sub_element, encoding='unicode', method='xml')}</p>"
    return html_content

def filtrar_paragrafos_fora_de_lista_casas(root):
    paragrafos = root.findall(".//para")
    paragrafos_filtrados = [para for para in paragrafos if 'lista-casas' not in [ancestral.tag for ancestral in para.iterancestors()]]
    return paragrafos_filtrados

xml_directory = '../TPC1/texto'
html_directory = '../TPC1/html'

index_html_template="""
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device_width, initial-scale=1">
            <title> Lista de Ruas </title>
        </head>

        <body>
        <h1> Ruas </h1><ul>
"""

os.makedirs(html_directory, exist_ok=True)

streets = []

# Parse dos ficheiros XML
for xml_file in os.listdir(xml_directory):
    if xml_file.endswith('.xml'):
        tree = ET.parse(os.path.join(xml_directory, xml_file))
        root = tree.getroot()


        street_name = root.find('.//meta/nome').text
        streets.append((street_name, xml_file))


# Ordena as ruas alfabeticamente pelo nome
streets.sort(key=lambda x: x[0])

# Geração da página principal HTML
for street_name, xml_file in streets:
    detail_page_filename = f'{xml_file[:-4]}.html'
    index_html_template += f'<li><a href="{detail_page_filename}">{street_name}</a></li>'
index_html_template += '</ul></body></html>'

with open(os.path.join("../TPC1", 'index.html'), 'w', encoding='utf-8') as file:
    file.write(index_html_template)


for street_name, xml_file in streets:
    detail_page_filename = f'{xml_file[:-4]}.html'
    
    rua_html_template=f"""<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{street_name}</title></head><body><h1>{street_name}</h1>"""
    
    tree = ET.parse(os.path.join(xml_directory, xml_file))
    root = tree.getroot()
    for figura in root.findall(".//figura"):
        png_path = figura.find(".//imagem").get("path")
        legenda = figura.find(".//legenda").text

        rua_html_template += f"""<img src="{png_path}" alt="{legenda}" style="width: 1000px; height: auto;"><figcaption>{legenda}</figcaption>"""
    

    ltree = etree.parse(os.path.join(xml_directory, xml_file)) # Necessário para filtrar o findall()
    lroot = ltree.getroot()

    paragrafos = lroot.findall(".//para")
    paragrafos_filtrado = filtrar_paragrafos_fora_de_lista_casas(lroot)

    for desc in paragrafos_filtrado:
        rua_html_template += f"""<p>{process_paragraph(desc)}</p>"""

    rua_html_template += "<h2>Lista de Casas</h2><ul>"

    for casa in root.findall(".//casa"):
        if casa.tag == "casa":
            rua_html_template += process_lista_casas(casa)


    rua_html_template += '</ul><p><a href="index.html">Voltar à lista de ruas</a></p></body></html>'
    
    with open(os.path.join(html_directory, detail_page_filename), 'w', encoding='utf-8') as file:
        file.write(rua_html_template)
