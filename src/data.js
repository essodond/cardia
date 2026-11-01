// Mock data transcribed from Cardia App.dc.html. No remote service.
export const HOLDER = 'KAZALO Esso Donda Wilfride';
const demoPerson = { lastName: 'KAZALO', firstNames: 'ESSO DONDA WILFRIDE', birthDate: '1994-05-12', sex: 'M' };
export const togoDocuments = [
  { id: 'tg-eid', cat: 'identite', name: 'e-ID Togo', sub: 'ANID Togo', num: 'DEMO-NIU-0042', exp: 'Non renseignée', layout: 'togo-eid', colors: ['#FFFFFF', '#E8F4ED'], national: demoPerson,
    reference: { status: 'Recto documenté · verso non vérifié', url: 'https://anid.gouv.tg/en/e-id-togo-2/', image: 'https://anid.gouv.tg/wp-content/uploads/2024/11/CARTE-e-ID-2.png', note: 'Disposition du recto inspirée du visuel ANID. Portrait fictif et code non fonctionnel. Le verso est une fiche CARDIA, pas une reproduction officielle.' } },
  { id: 'tg-voter', cat: 'identite', name: 'Carte d’électeur', sub: 'Togo · maquette provisoire', num: 'DEMO-ELEC-0042', exp: 'Non renseignée', layout: 'togo-voter', colors: ['#F8F5E7', '#E6EED9'], national: demoPerson, fields: [['Centre', 'CENTRE DE DÉMONSTRATION'], ['Commune', 'LOMÉ · DÉMO']],
    reference: { status: 'Visuel officiel à confirmer', url: 'https://anid.gouv.tg/en/e-id-togo-2/', note: 'La carte d’électeur est citée par l’ANID parmi les justificatifs. Aucun spécimen exploitable de la CENI obtenu ; disposition et champs proposés uniquement pour la démonstration.' } },
  { id: 'tg-student-ul', cat: 'education', name: 'Carte étudiant · Lomé', sub: 'Université de Lomé · maquette', num: 'DEMO-UL-0042', exp: '2026–2027 · démo', expLabel: 'Année universitaire', layout: 'togo-student', colors: ['#E7EFF9', '#FFFFFF'], national: demoPerson, fields: [['Établissement', 'UNIVERSITÉ DE LOMÉ'], ['Parcours', 'INFORMATIQUE · DÉMO'], ['Année', '2026–2027 · DÉMO']],
    reference: { status: 'Visuel officiel à confirmer', url: null, note: 'Site universitaire inaccessible pendant la recherche. Aucun recto/verso vérifié. Couleurs, champs et disposition sont une proposition CARDIA, non le modèle officiel de l’université.' } },
  { id: 'tg-student-ires', cat: 'education', name: 'Carte étudiant · IRES-RDEC', sub: 'IRES-RDEC · maquette', num: 'DEMO-IRES-0042', exp: '2026–2027 · démo', expLabel: 'Année scolaire', layout: 'togo-student', colors: ['#E7EFF9', '#FFFFFF'], national: demoPerson, fields: [['Établissement', 'IRES-RDEC'], ['Année', '2026–2027 · DÉMO']],
    reference: { status: 'Existence documentée · visuel à confirmer', url: 'https://service-public.gouv.tg/service/696a3c5af08be43ffe98cd67/education-formation/341v7l5t83343', note: 'Service Public documente la délivrance et la validité pour l’année scolaire. Aucun spécimen fourni sur la page : la disposition reste une maquette CARDIA.' } },
];
export const categories = [
  { id: 'identite', label: 'Identité', icon: 'identity', tint: '#E3EEFF', color: '#2563EB', colors: ['#F7F9FC', '#C9D1DE'], ink: '#22304F' },
  { id: 'bancaire', label: 'Bancaire', icon: 'cards', tint: '#ECE8FF', color: '#6D4AE8', colors: ['#2B62F0', '#0B2A8A'], ink: '#fff' },
  { id: 'transport', label: 'Transport', icon: 'bus', tint: '#DDF5EA', color: '#0E9F6E', colors: ['#1FB57F', '#0B6B4A'], ink: '#fff' },
  { id: 'assurance', label: 'Assurance', icon: 'shieldCheck', tint: '#FFE4E6', color: '#E5484D', colors: ['#EF5A5F', '#A3122A'], ink: '#fff' },
  { id: 'education', label: 'Éducation', icon: 'education', tint: '#FFF1D6', color: '#D9822B', colors: ['#FFC65C', '#E0892E'], ink: '#3B2506' },
  { id: 'professionnel', label: 'Professionnel', icon: 'briefcase', tint: '#E6EBF5', color: '#3B4A6B', colors: ['#46557A', '#1C2540'], ink: '#fff' },
  { id: 'sante', label: 'Santé', icon: 'heart', tint: '#D9F5F1', color: '#0E9488', colors: ['#22C3B2', '#0E7C74'], ink: '#fff' },
  { id: 'fidelite', label: 'Fidélité', icon: 'star', tint: '#EFE7FF', color: '#7C3AED', colors: ['#8E72FF', '#4B2BC9'], ink: '#fff' },
  { id: 'autre', label: 'Autre', icon: 'more', tint: '#ECEFF4', color: '#5B6B90', colors: ['#8A97B3', '#4D5A78'], ink: '#fff' },
];
export const initialCards = [
  { id: 'visa', cat: 'bancaire', name: 'Visa Classic', sub: 'Ecobank', num: '4532 8810 2674 1937', exp: '11/27', brand: 'visa', colors: ['#2F6BFF', '#1240C8', '#0B2A8A'] },
  { id: 'mc', cat: 'bancaire', name: 'Mastercard', sub: 'Orabank', num: '5412 7534 2290 4821', exp: '08/29', brand: 'mc', colors: ['#0F1A36', '#0A1328'] },
  { id: 'cni', cat: 'identite', name: "Carte d'identité", sub: 'République Togolaise', num: 'DEMO-TG-0042', exp: '14/03/2031', expLabel: "Valide jusqu'au", brand: 'id', layout: 'togo-cni', colors: ['#EEE8CD', '#FAF7E8', '#EAE2BF'], national: { lastName: 'KAZALO', firstNames: 'ESSO DONDA WILFRIDE', birthDate: '12/05/1994', birthPlace: 'LOMÉ / GOLFE', sex: 'M', profession: 'DESIGNER', issued: '14/03/2026', height: '1,75 m', bloodGroup: 'O+', address: 'LOMÉ · DÉMO' } },
  { id: 'ass', cat: 'assurance', name: 'Assurance maladie', sub: 'Couverture famille', num: 'POL 7781 2205', exp: '03/11/2026', expLabel: 'Expire le', expSoon: true },
  { id: 'bus', cat: 'transport', name: 'Abonnement bus', sub: 'Lomé — mensuel', num: 'TR 2290 0451', exp: '31/10/2026' },
  { ...togoDocuments[2], id: 'etu' },
  { id: 'pro', cat: 'professionnel', name: 'Badge professionnel', sub: 'Accès bureaux', num: 'EMP 00482', exp: '12/2027' },
  { id: 'sante', cat: 'sante', name: 'Carnet de santé', sub: 'Groupe sanguin O+', num: 'SAN 4410 9921', exp: '—' },
  { id: 'fid', cat: 'fidelite', name: 'Carte fidélité', sub: '1 240 points', num: 'FID 3312 0098', exp: '06/2027' },
];
export const categoryOf = id => categories.find(c => c.id === id) || categories[8];
export function resolveCard(card) {
  const meta = categoryOf(card.cat), last = card.num.replace(/\s/g, '').slice(-4);
  return { ...card, colors: card.colors || meta.colors, ink: meta.ink, catLabel: meta.label,
    masked: card.cat === 'bancaire' ? `•••• ${last}` : card.num.replace(/\d(?=\d{4})/g, '•'),
    short: `•••• ${last}`, holder: HOLDER,
    expLabel: card.expLabel || (card.cat === 'bancaire' ? 'Expire le' : 'Valide jusqu’au'),
    mrz1: ('IDTGO' + card.num.replace(/\D/g, '') + '<'.repeat(30)).slice(0, 30),
    mrz2: (HOLDER.toUpperCase().replace(/\s+/g, '<') + '<'.repeat(30)).slice(0, 30),
  };
}
export function searchCards(cards, query) {
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const q = normalize(query.trim());
  return cards.filter(c => normalize(`${c.name} ${categoryOf(c.cat).label} ${c.sub} ${c.num}`).includes(q));
}
export function createCard({ category, name, number, expiry }, id) {
  if (!name.trim()) return null;
  return { id, cat: category, name: name.trim(), sub: categoryOf(category).label, num: number.trim() || '0042', exp: expiry.trim() || '—' };
}
export const scannedCard = { cat: 'fidelite', name: 'Carte Fidélité Plus', sub: 'Scannée', num: 'FID 5520 7710', exp: '12/2028' };

