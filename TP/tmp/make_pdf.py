from docx import Document
from docx.shared import RGBColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import black
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
from xml.sax.saxutils import escape
import pypdfium2 as pdfium
from pathlib import Path
base=Path(r'C:/Users/HP/Documents/foster/TP')
name='KAZALO_wilfride_rattrapage WRD103'
doc=Document(base/(name+'.docx'))
for p in list(doc.paragraphs):
 if p.style.name=='Title':
  p._element.getparent().remove(p._element)
 elif p.text.startswith('Nom et prénom :'):
  p.text='KAZALO Wilfride'
for st in doc.styles:
 if hasattr(st,'font'): st.font.color.rgb=RGBColor(0,0,0)
for p in doc.paragraphs:
 for r in p.runs: r.font.color.rgb=RGBColor(0,0,0)
doc.save(base/(name+'.docx'))
pdfmetrics.registerFont(TTFont('TimesLocal',r'C:/Windows/Fonts/times.ttf'))
pdfmetrics.registerFont(TTFont('TimesLocalBold',r'C:/Windows/Fonts/timesbd.ttf'))
styles={
 'Normal':ParagraphStyle('body',fontName='TimesLocal',fontSize=11,leading=13,spaceAfter=6,textColor=black),
 'Heading 1':ParagraphStyle('h1',fontName='TimesLocalBold',fontSize=13,leading=15,spaceBefore=8,spaceAfter=7,textColor=black,keepWithNext=True),
 'Heading 2':ParagraphStyle('h2',fontName='TimesLocalBold',fontSize=11,leading=13,spaceBefore=7,spaceAfter=5,textColor=black,keepWithNext=True)
}
story=[]
for p in doc.paragraphs:
 if 'w:type="page"' in p._p.xml:
  story.append(PageBreak()); continue
 if p.text:
  story.append(Paragraph(escape(p.text).replace('\n','<br/>'),styles.get(p.style.name,styles['Normal'])))
out=base/(name+'.pdf')
SimpleDocTemplate(str(out),pagesize=A4,rightMargin=56,leftMargin=56,topMargin=42,bottomMargin=42,title=name,author='KAZALO Wilfride').build(story)
pdf=pdfium.PdfDocument(str(out))
print('Pages:',len(pdf))
for i,page in enumerate(pdf):
 page.render(scale=1.5).to_pil().save(base/'tmp'/'qa'/f'final-{i+1}.png')
