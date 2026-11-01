export const countries = [
  { code: 'TG', name: 'Togo', flag: '🇹🇬', priority: true },
  { code: 'CI', name: "Côte d’Ivoire", flag: '🇨🇮' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'BJ', name: 'Bénin', flag: '🇧🇯' },
  { code: 'SN', name: 'Sénégal', flag: '🇸🇳' },
];
export const categories = [
  { id: 'identite', label: 'Identité', glyph: 'ID', color: '#2563EB', tint: '#E3EEFF' },
  { id: 'transport', label: 'Transport', glyph: 'TR', color: '#0E9F6E', tint: '#DDF5EA' },
  { id: 'assurance', label: 'Assurance', glyph: '+', color: '#E5484D', tint: '#FFE4E6' },
  { id: 'education', label: 'Éducation', glyph: 'ED', color: '#C9761E', tint: '#FFF1D6' },
  { id: 'banque', label: 'Banque', glyph: '€', color: '#6D4AE8', tint: '#ECE8FF' },
  { id: 'pro', label: 'Professionnel', glyph: 'PR', color: '#3B4A6B', tint: '#E6EBF5' },
  { id: 'fidelite', label: 'Fidélité', glyph: '★', color: '#7C3AED', tint: '#EFE7FF' },
  { id: 'autre', label: 'Autre', glyph: '…', color: '#5B6B90', tint: '#ECEFF4' },
];
const types = [
  ['BANK_VISA', 'Carte Visa', 'banque', 'bank', '#152A65', '#3974C7', 'VISA'],
  ['BANK_MC', 'Carte Mastercard', 'banque', 'bank', '#24213F', '#60547C', 'mastercard'],
  ['IDENTITY_CNI', "Carte nationale d’identité", 'identite', 'identity', '#DDEBDD', '#F7F1D9', 'CNI'],
  ['INSURANCE', 'Carte d’assurance', 'assurance', 'insurance', '#FBE5E5', '#FFF8ED', 'ASSURANCE'],
  ['TICKET_BUS', 'Ticket de bus', 'transport', 'ticket', '#D7F1E5', '#F1FAF5', 'TRANSPORT'],
  ['PASSPORT', 'Passeport', 'identite', 'passport', '#164C3D', '#28745D', 'PASSEPORT'],
  ['IDENTITY_EID', 'Carte e-ID', 'identite', 'identity', '#E4EBFF', '#F2F6FF', 'e-ID'],
  ['STUDENT', 'Carte étudiante', 'education', 'identity', '#FFF0D5', '#FFF9EE', 'ÉTUDIANT'],
  ['PRO', 'Carte professionnelle', 'pro', 'identity', '#DFE7F4', '#F4F7FC', 'PRO'],
];
export const templates = countries.flatMap(country => types.map(([key, name, category, layout, color, color2, brand]) => ({
  id: `${country.code}_${key}_DEMO`, name, category, layout, color, color2, brand,
  country: country.code, issuer: layout === 'bank' ? 'CARDIA BANK · Démo' : `${country.name} · Démonstration`,
  number: layout === 'bank' ? (brand === 'VISA' ? '1937' : '4821') : 'DEMO-2026-0042',
  expiry: key === 'INSURANCE' ? '03/11/2026' : layout === 'bank' ? '11/27' : '13/03/2031',
  firstNames: 'Esso Donda Wilfride', lastName: 'KAZALO', birthDate: '12/05/1994', qr: layout !== 'bank', photo: layout === 'identity',
})));
export const demoWallet = templates.filter(t => t.country === 'TG').slice(0, 7).map((t, i) => ({ ...t, uid: `w${i + 1}`, favorite: false }));
export const countryOf = c => countries.find(x => x.code === c) || countries[0];
export const categoryOf = c => categories.find(x => x.id === c) || categories[7];
export const masked = c => `•••• ${c.number.slice(-4)}`;
export function filterCards(cards, query) {
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const q = normalize(query.trim());
  return cards.filter(c => normalize(`${c.name} ${countryOf(c.country).name} ${categoryOf(c.category).label}`).includes(q));
}
