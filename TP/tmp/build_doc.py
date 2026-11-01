from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

doc=Document()
s=doc.sections[0]
s.page_width=Cm(21); s.page_height=Cm(29.7)
s.top_margin=s.bottom_margin=Cm(2)
s.left_margin=s.right_margin=Cm(2.2)
normal=doc.styles['Normal']; normal.font.name='Times New Roman'; normal.font.size=Pt(12)
normal.paragraph_format.space_after=Pt(6)
normal.paragraph_format.line_spacing=1.08
for name,size in [('Title',16),('Heading 1',14),('Heading 2',12)]:
 st=doc.styles[name]; st.font.name='Times New Roman'; st.font.size=Pt(size); st.font.color.rgb=RGBColor(0,0,0); st.font.bold=True
 st.paragraph_format.space_before=Pt(10); st.paragraph_format.space_after=Pt(6)

def p(t): doc.add_paragraph(t)
def h(t): doc.add_paragraph(t,'Heading 2')
doc.add_paragraph('TEEO Français Rattrapage 2025 2026','Title')
p('Nom et prénom : KAZALO Wilfride\nNiveau : Licence | Filière : Tronc commun\nCode : WRD103')
doc.add_paragraph('Exercice 1','Heading 1')
h('1 Trois conseils pour rédiger une lettre de motivation')
p('1. Valoriser sa formation et ses compétences. Même sans expérience professionnelle, il est possible de présenter les connaissances acquises en cours, les travaux pratiques et les projets scolaires pertinents. Chaque compétence doit être illustrée par un exemple réel.')
p('2. Montrer sa motivation pour l’entreprise. Il faut se renseigner sur ses activités et expliquer ce que l’on souhaite apprendre pendant le stage. La lettre doit être adaptée à l’entreprise et préciser le lien entre le stage recherché et la formation suivie.')
p('3. Rester honnête et précis. Il ne faut pas inventer d’expériences. On peut mettre en avant son sérieux, sa capacité à apprendre et son sens du travail en équipe, en les appuyant sur des faits. Il faut également préciser ses disponibilités et relire la lettre pour corriger les fautes.')
h('2 Lettre de motivation')
p('KAZALO Wilfride')
p('À Monsieur le Directeur général\nde Ip-Net')
p('Objet : Demande de stage en parallèle de mes cours')
p('Monsieur le Directeur général,')
p('Actuellement en formation de licence, je vous adresse ma candidature pour un stage au sein de votre entreprise. Je souhaite compléter mes enseignements par une expérience pratique et mieux comprendre les exigences du monde professionnel.')
p('Ma formation me permet d’acquérir des connaissances que je souhaite mettre en pratique dans un cadre professionnel. Ce stage serait l’occasion de développer mes compétences, de découvrir vos méthodes de travail et de contribuer aux tâches que vous voudrez bien me confier, sous la supervision de votre équipe.')
p('Disposant encore de peu d’expérience professionnelle, je suis prête à apprendre, à suivre les consignes et à m’investir avec sérieux. Je souhaite notamment améliorer mon organisation, ma communication et ma capacité à travailler en équipe.')
p('Je souhaite effectuer ce stage parallèlement à mes cours. Mes horaires de présence pourraient être définis avec vous en fonction de mon emploi du temps et des besoins de votre entreprise. Je reste à votre disposition pour un entretien afin de vous présenter ma motivation et de convenir des modalités du stage.')
p('Je vous prie d’agréer, Monsieur le Directeur général, l’expression de ma considération distinguée.')
p('KAZALO Wilfride')
doc.add_page_break()
doc.add_paragraph('Exercice 2','Heading 1')
h('1 Le non verbal et l’identité authentique')
p('Il s’agit du langage corporel, notamment les gestes, les mimiques, le regard et la posture. Il peut constituer un bruit lorsqu’il détourne l’attention ou contredit les paroles, ce qui perturbe la compréhension du message. Il révèle aussi, parfois involontairement, les émotions et les attitudes réelles de la personne. Il contribue ainsi à exprimer son identité authentique, sans toutefois permettre de juger toute sa personnalité à partir d’un seul geste.')
h('2 Pourquoi devons nous soigner nos pensées')
p('Nous devons soigner nos pensées parce qu’elles influencent nos paroles, nos émotions et nos actes. Des pensées dominées par les préjugés ou l’hostilité peuvent provoquer des propos blessants et des conflits. Prendre du recul, vérifier ses jugements et cultiver des pensées constructives permet de mieux se maîtriser, de parler avec respect et d’entretenir de bonnes relations avec les autres.')
h('3 La communication orale et l’épanouissement humain')
p('La communication orale permet à chacun d’exprimer ses idées, ses besoins et ses sentiments. Grâce au dialogue, une personne se sent écoutée et reconnue, apprend des autres et développe sa confiance en elle. Les échanges favorisent aussi la création de liens, la coopération et la résolution des conflits. Par exemple, expliquer une difficulté à une personne attentive peut aider à trouver une solution et à sortir de l’isolement. La communication orale contribue donc à l’épanouissement personnel et social.')
h('4 L’écoute active et le rendement de l’entreprise')
p('L’écoute active consiste à prêter attention à son interlocuteur, à le laisser s’exprimer, à poser des questions utiles et à reformuler pour vérifier sa compréhension. Dans une entreprise, elle permet de mieux comprendre les consignes et de réduire les erreurs ainsi que les tâches à refaire. Elle facilite la coordination, aide à résoudre les conflits et encourage les salariés à proposer des améliorations. Elle permet également de mieux comprendre les besoins des clients. Par exemple, un employé qui reformule une commande avant de l’exécuter limite les malentendus et les pertes de temps, ce qui améliore le rendement.')
h('5 Les acquis de l’UE TEEO Français')
p('Cette UE m’a appris à organiser mes idées, à rédiger des textes clairs et à adapter mon expression au destinataire. J’ai notamment appris à structurer une lettre de motivation et à valoriser mes compétences. À l’oral, je retiens l’importance de l’écoute active, du respect de la parole d’autrui et de la cohérence entre les mots et le langage corporel. Ces acquis me sont utiles pour mieux communiquer dans mes études et dans un cadre professionnel.')
doc.core_properties.author='KAZALO Wilfride'
doc.core_properties.title='TEEO Français Rattrapage 2025 2026'
doc.save('KAZALO_wilfride_rattrapage WRD103.docx')
