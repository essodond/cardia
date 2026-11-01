// CARDIA — Card Template Engine (catalogue de démonstration)
// Template (design permanent) + User Data (données) => Digital Card résolue.
// Toutes les données sont fictives. Les palettes sont indicatives et doivent être validées
// contre les spécimens publiés par chaque autorité avant toute mise en production.

export const COUNTRIES = [
  { code: 'TG', iso3: 'TGO', name: 'Togo', state: 'RÉPUBLIQUE TOGOLAISE', motto: 'Travail – Liberté – Patrie', priority: true, authority: "Agence Nationale d'Identification (ANID)" },
  { code: 'CI', iso3: 'CIV', name: "Côte d'Ivoire", state: "RÉPUBLIQUE DE CÔTE D'IVOIRE", motto: 'Union – Discipline – Travail', authority: 'ONECI' },
  { code: 'GH', iso3: 'GHA', name: 'Ghana', state: 'REPUBLIC OF GHANA', motto: 'Freedom and Justice', authority: 'National Identification Authority (NIA)' },
  { code: 'BJ', iso3: 'BEN', name: 'Bénin', state: 'RÉPUBLIQUE DU BÉNIN', motto: 'Fraternité – Justice – Travail', authority: 'ANIP' },
  { code: 'SN', iso3: 'SEN', name: 'Sénégal', state: 'RÉPUBLIQUE DU SÉNÉGAL', motto: 'Un Peuple – Un But – Une Foi', authority: 'DAF' },
];

export const CATEGORIES = [
  { id: 'identite', label: 'Identité' },
  { id: 'transport', label: 'Transport' },
  { id: 'assurance', label: 'Assurance & santé' },
  { id: 'education', label: 'Éducation' },
  { id: 'banque', label: 'Banque' },
  { id: 'pro', label: 'Professionnel' },
  { id: 'fidelite', label: 'Fidélité' },
  { id: 'autre', label: 'Autre' },
];

export const RATIOS = { id1: 1.586, passport: 1.42, ticket: 2.3 };

const PAL = {
  tgId:   { bg: 'linear-gradient(135deg,#F5F9EF 0%,#E4EFD8 55%,#F7F0D4 100%)', band: '#0B6B3A', ink: '#14281B', accent: '#D21034', soft: 'rgba(11,107,58,.10)' },
  tgEid:  { bg: 'linear-gradient(135deg,#F4F8FD 0%,#E1EBF7 60%,#EEF4E6 100%)', band: '#1D4E89', ink: '#0F1E36', accent: '#0B6B3A', soft: 'rgba(29,78,137,.09)' },
  tgDrv:  { bg: 'linear-gradient(135deg,#FDF3F4 0%,#F6DFE3 60%,#FBEFE2 100%)', band: '#9E1B32', ink: '#2A1016', accent: '#0B6B3A', soft: 'rgba(158,27,50,.08)' },
  tgVot:  { bg: 'linear-gradient(135deg,#FFFAEB 0%,#F7EBC6 100%)', band: '#7A5300', ink: '#2B1F05', accent: '#0B6B3A', soft: 'rgba(122,83,0,.09)' },
  ciId:   { bg: 'linear-gradient(135deg,#FFF6EC 0%,#FBE7D2 45%,#E3F2EA 100%)', band: '#D9730D', ink: '#2A1A0A', accent: '#009E60', soft: 'rgba(217,115,13,.09)' },
  ciDrv:  { bg: 'linear-gradient(135deg,#F0F7F3 0%,#DCEEE4 100%)', band: '#007A4D', ink: '#0E241A', accent: '#F77F00', soft: 'rgba(0,122,77,.09)' },
  ghId:   { bg: 'linear-gradient(135deg,#FFF8DD 0%,#F3E7B5 50%,#E2F0E5 100%)', band: '#1E1E1E', ink: '#1A1A1A', accent: '#CE1126', soft: 'rgba(0,107,63,.10)' },
  ghDrv:  { bg: 'linear-gradient(135deg,#F2F6FB 0%,#DDE7F3 100%)', band: '#006B3F', ink: '#0E1E2C', accent: '#CE1126', soft: 'rgba(0,107,63,.08)' },
  bjId:   { bg: 'linear-gradient(135deg,#F2F9F4 0%,#DFF0E5 55%,#FBF4D6 100%)', band: '#008751', ink: '#0F261A', accent: '#E8112D', soft: 'rgba(0,135,81,.09)' },
  bjDrv:  { bg: 'linear-gradient(135deg,#FFF9E5 0%,#F5ECC4 100%)', band: '#A8781A', ink: '#2A2008', accent: '#008751', soft: 'rgba(168,120,26,.09)' },
  snId:   { bg: 'linear-gradient(135deg,#F1F8F3 0%,#E0F0E6 50%,#FBF7DA 100%)', band: '#00853F', ink: '#0D2417', accent: '#E31B23', soft: 'rgba(0,133,63,.09)' },
  snDrv:  { bg: 'linear-gradient(135deg,#FEF4F2 0%,#F8E1DD 100%)', band: '#B3261E', ink: '#2A110E', accent: '#00853F', soft: 'rgba(179,38,30,.08)' },
  pass:   { bg: 'linear-gradient(160deg,#F7F5EE 0%,#ECE7D8 100%)', ink: '#1C1A14', soft: 'rgba(60,50,20,.08)' },
};

const IDF = [['Nom', 'lastName'], ['Prénoms', 'firstNames', 2], ['Né(e) le', 'birthDate'], ['Sexe', 'sex'], ['Lieu de naissance', 'birthPlace'], ['N° document', 'docNumber']];
const IDB = [['Profession', 'profession'], ['Domicile', 'address'], ['Délivrée le', 'issueDate'], ['Expire le', 'expiry']];
const DRVF = [['Nom', 'lastName'], ['Prénoms', 'firstNames', 2], ['Né(e) le', 'birthDate'], ['Délivré le', 'issueDate'], ['N° permis', 'docNumber', 2]];
const PASSF = [['Nom / Surname', 'lastName'], ['Prénoms / Given names', 'firstNames', 2], ['Nationalité', 'nationality'], ['Sexe', 'sex'], ['Date de naissance', 'birthDate'], ['Expiration', 'expiry']];

function idTpl(cc, key, o) {
  return Object.assign({ id: `${cc}_${key}_DEMO`, version: '1.0', layout: 'id', ratio: RATIOS.id1, category: 'identite',
    front: { fields: IDF, photo: true, chip: false }, back: { fields: IDB, mrz: true, signature: true, qr: false } }, o);
}
function passTpl(cc, country, cover, gold) {
  return { id: `${cc}_PASSPORT_DEMO`, version: '1.0', country, category: 'identite', type: 'Passeport', short: 'Passeport', layout: 'passport', ratio: RATIOS.passport,
    title: 'PASSEPORT · PASSPORT', palette: Object.assign({}, PAL.pass, { band: cover, cover, gold }),
    front: { fields: PASSF, photo: true, chip: true }, back: { cover: true }, issuer: 'Autorité de délivrance des passeports' };
}

export const TEMPLATES = [
  // ── TOGO (priorité) ──
  // Mise en page calquée sur la CNI togolaise en circulation (recto : photo + champs + 2 signatures ; verso : code 2D, signalement, MRZ TD1).
  idTpl('TGO', 'IDENTITY_CNI', { country: 'TG', style: 'tgcni', version: '2.0', type: "Carte nationale d'identité", short: 'CNI', title: "CARTE NATIONALE D'IDENTITE", palette: { bg: '#F4EEDF', band: '#2E9E4F', ink: '#1E1E1E', accent: '#C8373A', soft: 'rgba(46,158,79,.07)' }, issuer: 'Ministère chargé de la Sécurité',
    front: { fields: [['Numéro', 'docNumber'], ['Nom', 'lastName'], ['Prénom', 'firstNames'], ['Né le', 'birthDate'], ['Sexe', 'sex'], ['A', 'birthPlaceFull'], ['Profession', 'profession'], ['Fait le', 'issueDate'], ['Expire le', 'expiry']], photo: true },
    back: { fields: [['Taille', 'height'], ['Groupe sanguin', 'bloodGroup'], ['Domicile', 'address'], ['Signes particuliers', 'marks'], ['Père', 'father'], ['Mère', 'mother'], ['Personne à prévenir', 'emergency']], mrz: true, barcode2d: true } }),
  idTpl('TGO', 'IDENTITY_EID', { country: 'TG', type: 'e-ID · Identité numérique', short: 'e-ID', title: 'e-ID TOGO', titleAlt: 'IDENTITÉ NUMÉRIQUE', palette: PAL.tgEid, issuer: "Agence Nationale d'Identification",
    front: { fields: [['Nom', 'lastName'], ['Prénoms', 'firstNames', 2], ['Date de naissance', 'birthDate'], ['Sexe', 'sex'], ['NIU', 'niu', 2]], photo: true },
    back: { fields: [['NIU', 'niu'], ['Enregistré le', 'issueDate']], qr: true, mrz: false, signature: false, note: "Présentez le code QR pour authentification. L'e-ID ne remplace ni la CNI ni le passeport." } }),
  passTpl('TGO', 'TG', '#5B1A24', '#D9B65C'),
  idTpl('TGO', 'DRIVING', { country: 'TG', type: 'Permis de conduire', short: 'Permis', title: 'PERMIS DE CONDUIRE', titleAlt: 'DRIVING LICENCE', palette: PAL.tgDrv, issuer: 'Direction des Transports Routiers',
    front: { fields: DRVF, photo: true }, back: { cats: [['A', '14/03/2016'], ['B', '14/03/2016'], ['C', '—'], ['D', '—']], fields: [['Expire le', 'expiry']], mrz: false, signature: true } }),
  idTpl('TGO', 'VOTER', { country: 'TG', type: "Carte d'électeur", short: 'Électeur', title: "CARTE D'ÉLECTEUR", palette: PAL.tgVot, issuer: 'Commission Électorale Nationale Indépendante',
    front: { fields: [['Nom', 'lastName'], ['Prénoms', 'firstNames', 2], ['Né(e) le', 'birthDate'], ['Sexe', 'sex'], ['N° électeur', 'voterNo', 2]], photo: true },
    back: { fields: [['Centre de vote', 'voterCenter'], ['Bureau', 'pollingStation'], ['Commune', 'address']], mrz: false, signature: true } }),
  { id: 'TGO_TRANSPORT_PASS_DEMO', version: '1.0', country: 'TG', category: 'transport', type: 'Abonnement transport', short: 'Pass', layout: 'member', ratio: RATIOS.id1, org: 'Lomé Mobilité', title: 'PASS MENSUEL',
    palette: { bg: 'linear-gradient(140deg,#17A673,#0B6B4A)', band: 'rgba(255,255,255,.14)', ink: '#FFFFFF', soft: 'rgba(255,255,255,.12)' },
    front: { fields: [['Titulaire', 'fullName', 2], ['Zones', 'zone'], ['Valable jusqu\u2019au', 'expiry']], photo: true }, back: { qr: true, fields: [['N° carte', 'docNumber'], ['Formule', 'plan']], note: 'Validez à chaque montée.' }, issuer: 'Lomé Mobilité (fictif)' },
  { id: 'TGO_TICKET_BUS_DEMO', version: '1.0', country: 'TG', category: 'transport', type: 'Billet de car', short: 'Billet', layout: 'ticket', ratio: RATIOS.ticket, org: 'Express du Nord', title: 'BILLET',
    palette: { bg: '#FFFFFF', band: '#1F5BFF', ink: '#0F1B3D', soft: '#EEF3FF' }, front: {}, back: { note: 'Présentez-vous 30 min avant le départ. Billet nominatif, non remboursable.' }, issuer: 'Express du Nord (fictif)' },
  { id: 'TGO_INSURANCE_DEMO', version: '1.0', country: 'TG', category: 'assurance', type: "Carte d'assurance santé", short: 'Assurance', layout: 'member', ratio: RATIOS.id1, org: 'Golfe Assurances', title: 'ASSURANCE MALADIE',
    palette: { bg: 'linear-gradient(140deg,#FFFFFF 0%,#FFF1F2 100%)', band: '#D93A48', ink: '#2A0F14', soft: 'rgba(217,58,72,.08)' },
    front: { fields: [['Assuré', 'fullName', 2], ['N° adhérent', 'memberNo'], ['Couverture', 'plan']], photo: true }, back: { qr: true, fields: [['Valable jusqu\u2019au', 'expiry'], ['Assistance', 'hotline']], note: 'À présenter dans les établissements partenaires.' }, issuer: 'Golfe Assurances (fictif)' },
  { id: 'TGO_STUDENT_DEMO', version: '1.0', country: 'TG', category: 'education', type: 'Carte étudiant', short: 'Étudiant', layout: 'member', ratio: RATIOS.id1, org: 'Institut Supérieur du Golfe', title: 'CARTE ÉTUDIANT',
    palette: { bg: 'linear-gradient(140deg,#FFFDF6 0%,#FFF1CF 100%)', band: '#C9761E', ink: '#2E1C06', soft: 'rgba(201,118,30,.09)' },
    front: { fields: [['Nom', 'fullName', 2], ['Filière', 'program'], ['Année', 'year']], photo: true }, back: { barcode: true, fields: [['Matricule', 'docNumber'], ['Valable jusqu\u2019au', 'expiry']], note: 'Carte strictement personnelle.' }, issuer: 'Institut Supérieur du Golfe (fictif)' },
  { id: 'TGO_PRO_DEMO', version: '1.0', country: 'TG', category: 'pro', type: 'Badge professionnel', short: 'Badge', layout: 'member', ratio: RATIOS.id1, org: 'Société Démo SA', title: 'BADGE',
    palette: { bg: 'linear-gradient(140deg,#2B3756,#151C30)', band: 'rgba(255,255,255,.10)', ink: '#FFFFFF', soft: 'rgba(255,255,255,.08)' },
    front: { fields: [['Nom', 'fullName', 2], ['Fonction', 'role'], ['Service', 'dept']], photo: true }, back: { barcode: true, fields: [['Matricule', 'docNumber']], note: 'En cas de perte, contacter la sécurité.' }, issuer: 'Société Démo SA (fictif)' },
  { id: 'TGO_BANK_VISA_DEMO', version: '1.0', country: 'TG', category: 'banque', type: 'Visa', short: 'Visa', layout: 'bank', network: 'visa', ratio: RATIOS.id1, org: 'Golfe Banque',
    palette: { bg: 'radial-gradient(120% 90% at 100% 0%,rgba(120,170,255,.45),transparent 55%),linear-gradient(140deg,#2F6BFF 0%,#1240C8 55%,#0B2A8A 100%)', ink: '#FFFFFF' }, issuer: 'Golfe Banque (fictif)' },
  { id: 'TGO_BANK_MC_DEMO', version: '1.0', country: 'TG', category: 'banque', type: 'Mastercard', short: 'Mastercard', layout: 'bank', network: 'mc', ratio: RATIOS.id1, org: 'Banque du Plateau',
    palette: { bg: 'radial-gradient(130% 90% at 95% 115%,rgba(64,120,230,.6),transparent 55%),linear-gradient(150deg,#121D3B 0%,#0A1328 100%)', ink: '#FFFFFF' }, issuer: 'Banque du Plateau (fictif)' },
  // ── CÔTE D'IVOIRE ──
  idTpl('CIV', 'IDENTITY_CNI', { country: 'CI', type: "Carte nationale d'identité", short: 'CNI', title: "CARTE NATIONALE D'IDENTITÉ", titleAlt: 'NATIONAL IDENTITY CARD', palette: PAL.ciId, issuer: 'ONECI',
    front: { fields: IDF, photo: true, chip: true }, back: { fields: [['NNI', 'nni'], ['Profession', 'profession'], ['Délivrée le', 'issueDate'], ['Expire le', 'expiry']], mrz: true, signature: false } }),
  idTpl('CIV', 'DRIVING', { country: 'CI', type: 'Permis de conduire', short: 'Permis', title: 'PERMIS DE CONDUIRE', titleAlt: 'DRIVING LICENCE', palette: PAL.ciDrv, issuer: 'Ministère des Transports', front: { fields: DRVF, photo: true, chip: true }, back: { cats: [['A', '—'], ['B', '02/09/2019'], ['C', '—'], ['E', '—']], fields: [['Expire le', 'expiry']], signature: true } }),
  { id: 'CIV_CMU_DEMO', version: '1.0', country: 'CI', category: 'assurance', type: 'Carte CMU', short: 'CMU', layout: 'member', ratio: RATIOS.id1, org: 'Couverture Maladie Universelle', title: 'CARTE CMU',
    palette: { bg: 'linear-gradient(140deg,#FFFFFF 0%,#EAF6EF 100%)', band: '#009E60', ink: '#0E2418', soft: 'rgba(0,158,96,.08)' },
    front: { fields: [['Assuré', 'fullName', 2], ['N° sécurité sociale', 'memberNo', 2]], photo: true }, back: { qr: true, fields: [['Délivrée le', 'issueDate']], note: 'Carte de démonstration. Non valable pour des soins.' }, issuer: 'CNAM (référence)' },
  passTpl('CIV', 'CI', '#6B2E12', '#E3B65A'),
  // ── GHANA ──
  idTpl('GHA', 'IDENTITY', { country: 'GH', type: 'Ghana Card · National ID', short: 'Ghana Card', title: 'ECOWAS IDENTITY CARD', titleAlt: 'GHANA CARD', palette: PAL.ghId, issuer: 'National Identification Authority', lang: 'en',
    front: { fields: [['Surname', 'lastName'], ['Firstnames', 'firstNames', 2], ['Nationality', 'nationalityEn'], ['Sex', 'sex'], ['Date of birth', 'birthDate'], ['Personal ID No.', 'ghPin']], photo: true, chip: true },
    back: { fields: [['Date of issue', 'issueDate'], ['Date of expiry', 'expiry']], mrz: true, signature: true } }),
  passTpl('GHA', 'GH', '#1C2E4A', '#D8B45A'),
  idTpl('GHA', 'DRIVING', { country: 'GH', type: "Driver's Licence", short: 'Licence', title: "DRIVER'S LICENCE", palette: PAL.ghDrv, issuer: 'DVLA (référence)', lang: 'en',
    front: { fields: [['Surname', 'lastName'], ['Firstnames', 'firstNames', 2], ['Date of birth', 'birthDate'], ['Issued', 'issueDate'], ['Licence No.', 'docNumber', 2]], photo: true }, back: { cats: [['A', '—'], ['B', '05/06/2018'], ['C', '—'], ['D', '—']], fields: [['Expiry', 'expiry']], signature: true } }),
  // ── BÉNIN ──
  idTpl('BEN', 'IDENTITY', { country: 'BJ', type: "Carte nationale d'identité", short: 'CNI', title: "CARTE NATIONALE D'IDENTITÉ", titleAlt: 'NATIONAL IDENTITY CARD', palette: PAL.bjId, issuer: 'ANIP (référence)' }),
  idTpl('BEN', 'DRIVING', { country: 'BJ', type: 'Permis biométrique', short: 'Permis', title: 'PERMIS DE CONDUIRE BIOMÉTRIQUE', palette: PAL.bjDrv, issuer: 'ANaTT (référence)', front: { fields: DRVF, photo: true }, back: { cats: [['A', '—'], ['B', '11/01/2020'], ['C', '—'], ['D', '—']], fields: [['Expire le', 'expiry']], qr: true, signature: false } }),
  passTpl('BEN', 'BJ', '#123A2A', '#D6B25E'),
  // ── SÉNÉGAL ──
  idTpl('SEN', 'IDENTITY', { country: 'SN', type: "Carte d'identité CEDEAO", short: 'CNI', title: "CARTE D'IDENTITÉ CEDEAO", titleAlt: 'ECOWAS IDENTITY CARD', palette: PAL.snId, issuer: "Direction de l'Automatisation des Fichiers (référence)", front: { fields: IDF, photo: true, chip: true } }),
  idTpl('SEN', 'DRIVING', { country: 'SN', type: 'Permis de conduire', short: 'Permis', title: 'PERMIS DE CONDUIRE', palette: PAL.snDrv, issuer: 'Ministère des Transports (référence)', front: { fields: DRVF, photo: true, chip: true }, back: { cats: [['A', '—'], ['B', '23/04/2017'], ['C', '—'], ['D', '—']], fields: [['Expire le', 'expiry']], signature: true } }),
  passTpl('SEN', 'SN', '#2B2E1A', '#D9BE6A'),
];

export const DEFAULT_USER = {
  lastName: 'KAZALO', firstNames: 'Esso Donda Wilfride', birthDate: '12/05/1994', sex: 'M', birthPlace: 'Lomé',
  profession: 'Entrepreneur', address: 'Lomé, Golfe 1', phone: '+228 90 00 00 00',
};

const DEFAULTS = {
  issueDate: '14/03/2021', expiry: '13/03/2031', niu: 'DEMO 0000 4821', nni: 'DEMO-000-4821', ghPin: 'GHA-DEMO0482-1',
  nationality: 'DEMO', nationalityEn: 'DEMO', voterNo: 'DEMO-E-4821', voterCenter: 'EPP Démo', pollingStation: 'B-04',
  zone: '1 – 3', plan: 'Famille', memberNo: 'DEMO-AS-4821', program: 'Informatique', year: 'L3 · 2026', role: 'Chef de projet', dept: 'Produit',
  hotline: '24/7', last4: '4821', exp: '08/29',
  height: '1,78', bloodGroup: 'O+', marks: 'NÉANT', father: 'KAZALO, DEMO', mother: 'DEMO, DEMO', emergency: 'DEMO, LOMÉ', birthPlaceFull: 'LOMÉ /GOLFE',
};

const NAT = { TG: 'TOGOLAISE', CI: 'IVOIRIENNE', GH: 'GHANAIAN', BJ: 'BÉNINOISE', SN: 'SÉNÉGALAISE' };

export function getTemplate(id) { return TEMPLATES.find(t => t.id === id); }
export function getCountry(code) { return COUNTRIES.find(c => c.code === code); }
export function catLabel(id) { return (CATEGORIES.find(c => c.id === id) || {}).label || 'Autre'; }

function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
const pad = (s, n) => (s + '<'.repeat(n)).slice(0, n);
const mrzName = u => (u.lastName + '<<' + u.firstNames).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z<]+/g, '<');

export function features(t) {
  const f = ['Recto / verso'];
  if (t.front && t.front.photo) f.push('Photo');
  if (t.front && t.front.chip) f.push('Puce');
  if ((t.back && t.back.qr) || t.layout === 'ticket') f.push('QR code');
  if (t.layout === 'passport' || (t.back && t.back.mrz)) f.push('MRZ');
  if (t.layout === 'bank') f.push('Sans contact');
  if (t.back && t.back.barcode) f.push('Code-barres');
  return f;
}

// Résout Template + User Data => objet consommé par <DigitalCard>
export function resolve(t, user, data = {}, uid = '') {
  const u = Object.assign({}, DEFAULT_USER, user || {});
  const country = getCountry(t.country) || { code: t.country, iso3: 'XXX', name: '', state: '', motto: '' };
  const seed = hash(t.id + uid);
  const n4 = String(1000 + (seed % 9000));
  const fullName = (u.firstNames.split(' ').slice(-1)[0] + ' ' + u.lastName);
  const ctx = Object.assign({}, DEFAULTS, { nationality: NAT[t.country] || 'DEMO', nationalityEn: NAT[t.country] || 'DEMO', fullName,
    docNumber: `${country.iso3}-DEMO-${n4}` }, u, data);
  const val = k => ctx[k] ?? '—';
  const mapF = arr => (arr || []).map(([l, k, span]) => ({ l, v: val(k), col: span === 2 ? 'span 2' : 'auto' }));
  const p = t.palette || {};
  const front = t.front || {}, back = t.back || {};
  const L = t.layout;
  const r = {
    uid, tplId: t.id, version: t.version, layout: L, ratio: t.ratio, country: t.country, countryName: country.name,
    state: country.state, motto: country.motto, iso3: country.iso3, title: data.title || t.title || '', titleAlt: t.titleAlt || '',
    name: data.name || t.type, short: t.short, org: data.org || t.org || country.state, issuer: t.issuer, category: t.category, catLabel: catLabel(t.category),
    bg: data.bg || p.bg, band: data.band || p.band || '#1F5BFF', ink: data.ink || p.ink || '#0F1B3D', accent: p.accent || '#1F5BFF', soft: p.soft || 'rgba(0,0,0,.06)',
    cover: p.cover, gold: p.gold,
    isId: L === 'id', isPassport: L === 'passport', isBank: L === 'bank', isMember: L === 'member', isTicket: L === 'ticket',
    ff: mapF(front.fields), bf: mapF(back.fields), photo: !!front.photo, chip: !!front.chip,
    qr: !!back.qr || L === 'ticket', mrz: !!back.mrz, signature: !!back.signature, barcode: !!back.barcode, cats: (back.cats || []).map(([k, d]) => ({ k, d, on: d !== '—' })),
    hasCats: !!back.cats, note: data.note || back.note || '', sigText: u.firstNames.split(' ').slice(-1)[0].charAt(0) + '. ' + u.lastName.charAt(0) + u.lastName.slice(1).toLowerCase(),
    docNumber: ctx.docNumber, expiry: ctx.expiry, qrSeed: t.id + uid,
    features: features(t), demo: true,
  };
  if (L === 'id') {
    r.mrz1 = pad(`ID${country.iso3}DEMO${n4}`, 30);
    r.mrz2 = pad(`940512${u.sex === 'F' ? 'F' : 'M'}3103133${country.iso3}`, 29) + '0';
    r.mrz3 = pad(mrzName(u), 30);
  }
  if (t.style === 'tgcni') {
    const up = v => String(v).toUpperCase();
    const dash = v => String(v).replace(/\//g, '-');
    r.isId = false; r.isTgCni = true;
    r.docNumber = data.docNumber || `DEMO-000-${n4}`;
    r.tg = {
      num: r.docNumber, nom: up(ctx.lastName), prenom: up(ctx.firstNames), ne: dash(ctx.birthDate), sexe: up(ctx.sex), lieu: up(ctx.birthPlaceFull),
      prof: up(ctx.profession), fait: dash(ctx.issueDate) + '/000', expire: dash(ctx.expiry),
      taille: ctx.height, groupe: ctx.bloodGroup, domicile: up(ctx.address), signes: ctx.marks, pere: ctx.father, mere: ctx.mother, prevenir: ctx.emergency, ref: 'DEMO' + n4,
    };
    r.mrz1 = pad(`I<TGO${'DEMO' + n4}`, 30);
  }
  if (L === 'passport') {
    r.mrz1 = pad(`P<${country.iso3}${mrzName(u)}`, 44);
    r.mrz2 = pad(`DEMO${n4}<0${country.iso3}9405122${u.sex === 'F' ? 'F' : 'M'}3103133`, 42) + '00';
    r.passType = 'P'; r.passNo = `DEMO${n4}`;
  }
  if (L === 'bank') {
    r.last4 = data.last4 || n4; r.exp = data.exp || ctx.exp; r.holder = fullName.toUpperCase();
    r.isVisa = t.network === 'visa'; r.isMc = t.network === 'mc'; r.bankName = t.org;
    r.docNumber = '•••• ' + r.last4; r.expiry = r.exp;
  }
  if (L === 'ticket') {
    Object.assign(r, { from: 'LOMÉ', fromSub: 'Gare centrale', to: 'KARA', toSub: 'Gare routière', date: '18 OCT 2026', time: '07:30', seat: '14B', cls: 'Confort', passenger: fullName.toUpperCase() }, data.ticket || {});
    r.docNumber = 'TK-DEMO-' + n4; r.expiry = r.date;
  }
  if (r.isTgCni) r.masked = '••••-•••-' + n4; else
  r.masked = r.isBank ? r.docNumber : String(r.docNumber).replace(/[A-Z0-9](?=[A-Z0-9-]{4})/g, '•');
  return r;
}

// Carte personnalisée générée à partir d'une saisie utilisateur
export function customTemplate(cat, opts = {}) {
  const pals = {
    identite: ['#1D4E89', 'linear-gradient(140deg,#F4F8FD,#E1EBF7)', '#0F1E36'], transport: ['#0E9F6E', 'linear-gradient(140deg,#17A673,#0B6B4A)', '#fff'],
    assurance: ['#D93A48', 'linear-gradient(140deg,#fff,#FFF1F2)', '#2A0F14'], education: ['#C9761E', 'linear-gradient(140deg,#FFFDF6,#FFF1CF)', '#2E1C06'],
    banque: ['#1240C8', 'linear-gradient(140deg,#2F6BFF,#0B2A8A)', '#fff'], pro: ['#2B3756', 'linear-gradient(140deg,#2B3756,#151C30)', '#fff'],
    fidelite: ['#6D4AE8', 'linear-gradient(140deg,#8E72FF,#4B2BC9)', '#fff'], autre: ['#4D5A78', 'linear-gradient(140deg,#8A97B3,#4D5A78)', '#fff'],
  };
  const [band, bg, ink] = pals[cat] || pals.autre;
  const dark = ink === '#fff';
  return { id: 'CUSTOM_' + cat.toUpperCase(), version: '1.0', country: opts.country || 'TG', category: cat, type: opts.name || 'Carte personnalisée', short: 'Perso', layout: 'member', ratio: RATIOS.id1,
    org: opts.org || 'Carte personnalisée', title: (opts.name || 'CARTE').toUpperCase(),
    palette: { bg, band: dark ? 'rgba(255,255,255,.14)' : band, ink, soft: dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.05)' },
    front: { fields: [['Titulaire', 'fullName', 2], ['Numéro', 'docNumber', 2]], photo: !!opts.photo }, back: { qr: !!opts.qr, fields: [['Catégorie', 'catName']], note: opts.note || 'Carte créée par l\u2019utilisateur.' } };
}
