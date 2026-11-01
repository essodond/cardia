from docx import Document
from docx.oxml.ns import qn
p='KAZALO_wilfride_rattrapage WRD103.docx'
d=Document(p)
for st in d.styles:
 for b in list(st.element.iter(qn('w:pBdr'))): b.getparent().remove(b)
 if st.name in ['Normal','Title','Heading 1','Heading 2']:
  rf=st.element.get_or_add_rPr().get_or_add_rFonts()
  for k in list(rf.attrib):
   if 'Theme' in k: del rf.attrib[k]
  for k in ['ascii','hAnsi','eastAsia','cs']: rf.set(qn('w:'+k),'Times New Roman')
for p1 in d.paragraphs:
 for b in list(p1._p.iter(qn('w:pBdr'))): b.getparent().remove(b)
d.save(p)
