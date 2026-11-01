const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
let categories, initialCards, resolveCard, searchCards, createCard, scannedCard, togoDocuments;
before(async () => {
  const source = fs.readFileSync('src/data.js').toString('base64');
  ({ categories, initialCards, resolveCard, searchCards, createCard, scannedCard, togoDocuments } = await import(`data:text/javascript;base64,${source}`));
});

test('new reference: nine cards, nine categories, Mastercard initially second', () => {
  assert.equal(initialCards.length, 9);
  assert.equal(categories.length, 9);
  assert.equal(initialCards[1].name, 'Mastercard');
  assert.equal(initialCards[1].sub, 'Orabank');
  assert.equal(initialCards.slice(0, 4).map(c => c.id).join(','), 'visa,mc,cni,ass');
  assert.equal(new Set(initialCards.map(c => c.id)).size, 9);
  for (const card of initialCards) assert.ok(categories.some(c => c.id === card.cat));
});
test('masking, holder, expiry and identity back match the prototype', () => {
  const mc = resolveCard(initialCards[1]);
  assert.equal(mc.masked, '•••• 4821');
  assert.equal(mc.holder, 'KAZALO Esso Donda Wilfride');
  assert.equal(mc.expLabel, 'Expire le');
  const id = resolveCard(initialCards[2]);
  assert.equal(id.mrz1.length, 30);
  assert.equal(id.mrz2.length, 30);
  assert.equal(resolveCard(initialCards[3]).expSoon, true);
});
test('search matches name, category, issuer, number, accents and empty state', () => {
  assert.equal(searchCards(initialCards, 'orabank')[0].id, 'mc');
  assert.equal(searchCards(initialCards, '4821')[0].id, 'mc');
  assert.equal(searchCards(initialCards, 'Bancaire').length, 2);
  assert.equal(searchCards(initialCards, '  etudiant  ')[0].id, 'etu');
  assert.equal(searchCards(initialCards, 'introuvable').length, 0);
  assert.equal(searchCards(initialCards, '').length, 9);
});
test('adding rejects blank names and supports optional number/expiry', () => {
  assert.equal(createCard({ category: 'autre', name: '  ', number: '', expiry: '' }, 'x'), null);
  const c = createCard({ category: 'fidelite', name: '  Mon club ', number: ' 1234 ', expiry: '' }, 'new');
  assert.equal(c.name, 'Mon club');
  assert.equal(c.num, '1234');
  assert.equal(c.exp, '—');
  assert.equal(resolveCard(c).catLabel, 'Fidélité');
  assert.equal(createCard({ category: 'autre', name: 'Test', number: '', expiry: '' }, 'x').num, '0042');
});
test('scan fixture and deletion remain local and leave initial data unchanged', () => {
  const wallet = [...initialCards, { ...scannedCard, id: 'scan-1' }];
  assert.equal(resolveCard(wallet.at(-1)).short, '•••• 7710');
  assert.equal(wallet.filter(c => c.id !== 'ass').some(c => c.id === 'ass'), false);
  assert.equal(initialCards.length, 9);
});

test('Togolese identity card uses its own complete fictional model', () => {
  const cni = resolveCard(initialCards.find(c => c.id === 'cni'));
  assert.equal(cni.layout, 'togo-cni');
  assert.ok(cni.num.startsWith('DEMO-'));
  for (const key of ['lastName', 'firstNames', 'birthDate', 'birthPlace', 'sex', 'profession', 'issued', 'height', 'bloodGroup', 'address']) {
    assert.ok(cni.national[key], `missing CNI field: ${key}`);
  }
  assert.equal(cni.national.lastName, 'KAZALO');
  assert.equal(cni.short, '•••• 0042');
});

test('Togo catalogue keeps documented and provisional designs distinct', () => {
  assert.equal(togoDocuments.length, 4);
  assert.equal(new Set(togoDocuments.map(c => c.id)).size, 4);
  for (const template of togoDocuments) {
    assert.ok(template.num.startsWith('DEMO-'));
    assert.ok(template.reference.status);
    assert.ok(template.reference.note);
    assert.ok(template.national.lastName);
    assert.ok(resolveCard(template).colors.length >= 2);
  }
  assert.ok(togoDocuments[0].reference.image.startsWith('https://anid.gouv.tg/'));
  assert.ok(togoDocuments[1].reference.status.includes('confirmer'));
  assert.equal(togoDocuments[2].reference.url, null);
  const wallet = [...initialCards, { ...togoDocuments[0], id: 'added-eid' }];
  assert.equal(searchCards(wallet, 'ANID')[0].id, 'added-eid');
});
