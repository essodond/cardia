from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT = Path(r'C:\Users\HP\Documents\foster\TP')
OUT = ROOT / 'KAZALO_wilfride_rattrapage_MGT202.docx'
doc = Document()
section = doc.sections[0]
section.page_width = Inches(8.5)
section.page_height = Inches(11)
section.top_margin = Inches(.7)
section.bottom_margin = Inches(.7)
section.left_margin = Inches(.8)
section.right_margin = Inches(.8)
section.footer_distance = Inches(.3)

for name in ['Normal', 'Title', 'Heading 1', 'Heading 2']:
    style = doc.styles[name]
    style.font.name = 'Times New Roman'
    fonts = style._element.get_or_add_rPr().rFonts
    for key in list(fonts.attrib):
        if key.endswith('Theme'):
            del fonts.attrib[key]
    style.font.color.rgb = RGBColor(0, 0, 0)
    style.font.size = Pt(12)
    style.paragraph_format.space_after = Pt(5)
    style.paragraph_format.line_spacing = 1.05
    style.paragraph_format.widow_control = True
    style._element.get_or_add_rPr().append(OxmlElement('w:lang'))
    style._element.rPr[-1].set(qn('w:val'), 'fr-FR')
for border in doc.styles.element.xpath('.//w:pBdr'):
    border.getparent().remove(border)
doc.styles['Title'].font.size = Pt(15)
doc.styles['Title'].font.bold = True
doc.styles['Title'].paragraph_format.space_after = Pt(8)
doc.styles['Heading 1'].font.size = Pt(13)
doc.styles['Heading 1'].font.bold = True
doc.styles['Heading 1'].paragraph_format.space_before = Pt(10)
doc.styles['Heading 1'].paragraph_format.space_after = Pt(7)
doc.styles['Heading 2'].font.bold = True
doc.styles['Heading 2'].paragraph_format.space_before = Pt(6)
doc.styles['Heading 2'].paragraph_format.space_after = Pt(4)

def p(text='', bold_prefix=None, after=5, keep=False):
    item = doc.add_paragraph()
    item.paragraph_format.space_after = Pt(after)
    item.paragraph_format.keep_together = True
    item.paragraph_format.keep_with_next = keep
    if bold_prefix and text.startswith(bold_prefix):
        item.add_run(bold_prefix).bold = True
        item.add_run(text[len(bold_prefix):])
    else:
        item.add_run(text)
    return item

title = doc.add_paragraph('Devoir de rattrapage de microéconomie', 'Title')
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
meta = p('Nom et prénom : KAZALO Wilfride\nCode du cours : MGT202\nAnnée universitaire : 2025-2026    |    Session de juillet 2026', after=7)

doc.add_heading('Partie I  Questions ouvertes', 1)
doc.add_heading('1  Définitions', 2)
p('La productivité marginale est la production supplémentaire obtenue grâce à une unité additionnelle d’un facteur de production, les autres facteurs restant constants.', 'La productivité marginale')
p('La productivité moyenne est la quantité produite par unité de facteur utilisé. Elle se calcule en divisant la production totale par la quantité de ce facteur.', 'La productivité moyenne')
p('Le coût variable est la partie du coût total qui varie avec la quantité produite, par exemple les dépenses de matières premières.', 'Le coût variable')
p('Le coût fixe est un coût qui ne dépend pas du volume de production à court terme et subsiste même lorsque la production est nulle, comme le loyer d’un local.', 'Le coût fixe')

doc.add_heading('2  Rendements et formes de duopole', 2)
p('Les rendements d’échelle sont croissants lorsque la production augmente dans une proportion supérieure à celle de tous les facteurs, augmentés dans la même proportion. Par exemple, doubler le capital et le travail fait plus que doubler la production.', 'Les rendements d’échelle sont croissants')
p('Ils sont décroissants lorsque la production augmente dans une proportion inférieure à celle de tous les facteurs, augmentés dans la même proportion. Doubler le capital et le travail fait alors moins que doubler la production.', 'Ils sont décroissants')
p('Dans le duopole de Cournot, les deux entreprises se font concurrence par les quantités. Chacune choisit sa production en considérant celle de sa concurrente comme donnée.', 'Dans le duopole de Cournot,')
p('Dans le duopole de Bertrand, les deux entreprises se font concurrence par les prix. Chacune choisit son prix en considérant celui de sa concurrente comme donné.', 'Dans le duopole de Bertrand,')

doc.add_heading('3  Tableau des types de marchés', 2)
table = doc.add_table(rows=1, cols=3)
table.alignment = WD_TABLE_ALIGNMENT.CENTER
table.style = 'Table Grid'
table.autofit = False
widths = [Inches(1.85), Inches(1.75), Inches(3.3)]
for c, txt in zip(table.rows[0].cells, ['Acheteurs', 'Vendeurs', 'Type de marché']):
    c.text = txt
    for r in c.paragraphs[0].runs:
        r.bold = True
for row in [
    ['A : Très nombreux', 'Très nombreux', 'B : Concurrence pure et parfaite'],
    ['Très nombreux', 'C : Un seul', 'Monopole'],
    ['D : Très nombreux', 'Peu nombreux', 'E : Oligopole'],
    ['Très nombreux', 'F : Deux', 'Duopole'],
]:
    cells = table.add_row().cells
    for cell, txt in zip(cells, row):
        cell.text = txt
for row in table.rows:
    row._tr.get_or_add_trPr().append(OxmlElement('w:cantSplit'))
    for cell, width in zip(row.cells, widths):
        cell.width = width
        cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        for para in cell.paragraphs:
            para.paragraph_format.space_before = Pt(3)
            para.paragraph_format.space_after = Pt(3)
            para.paragraph_format.line_spacing = 1
            for run in para.runs:
                run.font.size = Pt(11)
        mar = OxmlElement('w:tcMar')
        for tag in ['top', 'left', 'bottom', 'right']:
            el = OxmlElement('w:' + tag)
            el.set(qn('w:w'), '65')
            el.set(qn('w:type'), 'dxa')
            mar.append(el)
        cell._tc.get_or_add_tcPr().append(mar)
note = p('La concurrence pure et parfaite suppose aussi des produits homogènes, la libre entrée et sortie, la transparence de l’information et la mobilité des facteurs.', after=0)
for run in note.runs:
    run.font.size = Pt(10)

doc.add_page_break()
doc.add_heading('Partie II  Questions à choix binaires', 1)

qcb = [
    ('1. Les entreprises qui font des pertes doivent immédiatement cesser leurs activités.',
     'FAUX. À court terme, une entreprise peut continuer à produire si ses recettes couvrent ses coûts variables, même si elle ne couvre pas tous ses coûts fixes. Elle limite ainsi ses pertes.'),
    ('2. À long terme, une entreprise qui veut doubler sa production doit doubler les volumes de capital et de travail utilisés.',
     'FAUX. Cela dépend des rendements d’échelle. Doubler tous les facteurs double la production uniquement si les rendements sont constants ; elle augmente davantage s’ils sont croissants et moins s’ils sont décroissants.'),
    ('3. À court terme, une entreprise ne fait varier qu’un seul facteur de production, en général le capital.',
     'FAUX. À court terme, au moins un facteur est fixe. Dans le modèle à deux facteurs, le capital est généralement fixe et le travail est variable. Plusieurs facteurs peuvent être variables dans un modèle plus général.'),
]
for question, answer in qcb:
    p(question, bold_prefix=question, after=3, keep=True)
    p(answer, bold_prefix='FAUX.', after=11)

doc.add_heading('Partie III  Questions à choix multiple', 1)
qcm = [
    ('1  À l’équilibre du consommateur',
     'Bonnes réponses : b et d.',
     'Le consommateur maximise son utilité totale sous sa contrainte budgétaire. À un optimum intérieur, le rapport des utilités marginales est égal au rapport des prix.'),
    ('2  L’utilité d’un bien',
     'Bonne réponse : a.',
     'L’utilité est l’aptitude d’un bien à satisfaire un besoin. L’utilité additionnelle d’une unité consommée désigne l’utilité marginale.'),
    ('3  Au point de satiété',
     'Bonne réponse : a.',
     'L’utilité totale est maximale et l’utilité marginale est égale à zéro : une unité supplémentaire n’apporte plus de satisfaction.'),
    ('4  Élasticité revenu comprise entre 0 et 1',
     'Bonne réponse : b.',
     'Il s’agit d’un bien de première nécessité, qui est un bien normal. Sa consommation augmente lorsque le revenu augmente, mais moins que proportionnellement.'),
]
for heading, answer, explanation in qcm:
    doc.add_heading(heading, 2)
    p(answer, bold_prefix=answer, after=3, keep=True)
    p(explanation, after=8)

footer = section.footer.paragraphs[0]
footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = footer.add_run()
run.font.size = Pt(10)
fld = OxmlElement('w:fldSimple')
fld.set(qn('w:instr'), 'PAGE')
run._r.addnext(fld)
doc.core_properties.author = 'KAZALO Wilfride'
doc.core_properties.title = 'Devoir de rattrapage de microéconomie MGT202'
doc.core_properties.subject = 'Réponses à l’épreuve de microéconomie de juillet 2026'
doc.core_properties.comments = ''
doc.save(OUT)
print(OUT)
