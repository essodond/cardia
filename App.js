import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, BackHandler, KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, Share, StyleSheet, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { C, T, Icon, Logo, Round, Button, Surface } from './src/components';
import CardCarousel from './src/CardCarousel';
import TogoIdentityCard from './src/NationalDocument';
import { HOLDER, categories, togoDocuments, initialCards, resolveCard, searchCards, createCard, scannedCard } from './src/data';

const fonts = {
  Jakarta400: require('@expo-google-fonts/plus-jakarta-sans/400Regular/PlusJakartaSans_400Regular.ttf'),
  Jakarta500: require('@expo-google-fonts/plus-jakarta-sans/500Medium/PlusJakartaSans_500Medium.ttf'),
  Jakarta600: require('@expo-google-fonts/plus-jakarta-sans/600SemiBold/PlusJakartaSans_600SemiBold.ttf'),
  Jakarta700: require('@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf'),
  Jakarta800: require('@expo-google-fonts/plus-jakarta-sans/800ExtraBold/PlusJakartaSans_800ExtraBold.ttf'),
};
const tabs = [['home', 'home', 'Accueil'], ['cards', 'cards', 'Cartes'], ['search', 'search', 'Recherche'], ['profile', 'user', 'Profil']];

export default function App() {
  const [loaded, error] = useFonts(fonts);
  if (!loaded && !error) return <View style={s.loading}><ActivityIndicator color={C.blue} /></View>;
  return <SafeAreaProvider><Wallet /></SafeAreaProvider>;
}
function Toggle({ label, value, onChange }) {
  return <Pressable accessibilityRole="switch" accessibilityLabel={label} accessibilityState={{ checked: value }} onPress={() => onChange(!value)} style={s.preference}>
    <T weight="600" style={{ flex: 1, fontSize: 14.5 }}>{label}</T>
    <View style={[s.toggle, { backgroundColor: value ? '#22C55E' : '#D5DBE6', alignItems: value ? 'flex-end' : 'flex-start' }]}><View style={s.toggleKnob} /></View>
  </Pressable>;
}
function CardRow({ card, onPress }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={s.cardRow}>
    <View style={{ width: 60, height: 40, justifyContent: 'center' }}>{card.layout?.startsWith('togo-') ? <TogoIdentityCard card={card} width={60} shadow={false} /> : <Surface card={card} style={s.thumbnail} />}</View><View style={{ flex: 1, minWidth: 0 }}><T numberOfLines={1} weight="700" style={{ fontSize: 14.5 }}>{card.name}</T><T style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{card.catLabel} · {card.short}</T></View><Icon name="chevron" size={18} color="#9AA6C0" />
  </Pressable>;
}
function Sheet({ children, close, bottom }) {
  const entry = useRef(new Animated.Value(30)).current;
  useEffect(() => { Animated.timing(entry, { toValue: 0, duration: 220, useNativeDriver: true }).start(); }, [entry]);
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.overlay}>
    <Pressable accessibilityRole="button" accessibilityLabel="Fermer le panneau" onPress={close} style={StyleSheet.absoluteFill} />
    <Animated.View accessibilityViewIsModal style={[s.sheet, { transform: [{ translateY: entry }] }]}>
      <ScrollView style={{ flexGrow: 0 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: Math.max(bottom, 34) }}><Pressable accessibilityRole="button" accessibilityLabel="Fermer le panneau" onPress={close} hitSlop={10} style={s.handle} />{children}</ScrollView>
    </Animated.View>
  </KeyboardAvoidingView>;
}
function Scanner({ done, close, save, top, bottom, width }) {
  return <View style={[s.scanner, { paddingTop: top + 8, paddingBottom: Math.max(bottom, 44) }]}>
    <View style={s.between}><T weight="700" style={{ color: '#fff', fontSize: 17 }}>Scanner une carte</T><Round icon="close" label="Fermer le scanner" dark onPress={close} /></View>
    <View style={s.scanCenter}><View style={[s.scanFrame, { width: Math.min(310, width - 48) }]}>
      {['tl', 'tr', 'bl', 'br'].map(c => <View key={c} style={[s.corner, s[c], { borderColor: done ? '#22C55E' : '#fff' }]} />)}
      {done ? <LinearGradient colors={['#7C5CFF', '#4B2BC9']} style={s.scanned}><T weight="700" style={{ color: '#fff', fontSize: 15 }}>Carte Fidélité Plus</T><T weight="600" style={{ color: '#fff', letterSpacing: 1.1 }}>•••• 7710</T></LinearGradient> : <View style={s.scanLine} />}
    </View><View><T weight="700" style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>{done ? 'Carte détectée' : 'Placez votre carte dans le cadre'}</T><T style={{ color: '#B7C2DC', textAlign: 'center', marginTop: 6 }}>{done ? 'Carte Fidélité Plus · •••• 7710' : 'La détection est automatique.'}</T></View></View>
    {done && <Button label="Enregistrer la carte" onPress={save} />}
  </View>;
}
function Wallet() {
  const insets = useSafeAreaInsets(), { width: windowWidth } = useWindowDimensions();
  const width = Platform.OS === 'web' ? Math.min(windowWidth, 402) : windowWidth;
  const top = Math.max(insets.top, Platform.OS === 'web' ? 56 : 12);
  const [tab, setTab] = useState('home'), [cards, setCards] = useState(initialCards), [active, setActive] = useState(1);
  const [filter, setFilter] = useState('all'), [query, setQuery] = useState(''), [detailId, setDetailId] = useState(null), [showNum, setShowNum] = useState(false);
  const [sheet, setSheet] = useState(null), [scanDone, setScanDone] = useState(false), [faceId, setFaceId] = useState(true), [notifications, setNotifications] = useState(true);
  const [form, setForm] = useState({ category: 'bancaire', name: '', number: '', expiry: '' });
  const [detailBack, setDetailBack] = useState(false);
  const [toast, setToast] = useState(''), [signedOut, setSignedOut] = useState(false);
  const [carouselDragging, setCarouselDragging] = useState(false);
  const toastTimer = useRef(), nextId = useRef(1);
  const resolved = cards.map(resolveCard), carouselCards = resolved, detail = resolved.find(c => c.id === detailId);
  const countLabel = `${cards.length} carte${cards.length > 1 ? 's' : ''} enregistrée${cards.length > 1 ? 's' : ''}`;
  const reminder = notifications && cards.some(c => c.id === 'ass');
  const results = searchCards(resolved, query), filtered = filter === 'all' ? resolved : resolved.filter(c => c.cat === filter);
  const flash = text => { clearTimeout(toastTimer.current); setToast(text); toastTimer.current = setTimeout(() => setToast(''), 2400); };
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  useEffect(() => { if (sheet !== 'scan') return; setScanDone(false); const timer = setTimeout(() => setScanDone(true), 2200); return () => clearTimeout(timer); }, [sheet]);
  const close = () => { setSheet(null); setDetailId(null); };
  useEffect(() => { const sub = BackHandler.addEventListener('hardwareBackPress', () => { if (sheet || detailId) { close(); return true; } if (tab !== 'home') { setTab('home'); return true; } return false; }); return () => sub.remove(); }, [sheet, detailId, tab]);
  const goCards = cat => { setFilter(cat); setTab('cards'); };
  const openCard = id => { setDetailId(id); setShowNum(false); setDetailBack(false); };
  const openAdd = () => { setForm(f => ({ ...f, name: '', number: '', expiry: '' })); setSheet('add'); };
  const add = () => { const card = createCard(form, `local-${nextId.current++}`); if (!card) return; setCards(c => [...c, card]); setSheet(null); flash(`${card.name} ajoutée à votre portefeuille.`); };
  const remove = () => { setCards(c => c.filter(item => item.id !== detail.id)); setActive(a => Math.min(a, Math.max(0, cards.length - 2))); setDetailId(null); flash(`${detail.name} supprimée.`); };
  const share = async () => { try { await Share.share({ message: `CARDIA · Démonstration\n${detail.name} · ${detail.sub}\n${detail.short}` }); } catch { flash('Le partage est indisponible sur cet appareil.'); } };
  const openReminder = () => reminder ? openCard('ass') : flash('Aucun nouveau rappel.');

  const home = <>
    <View style={s.header}><Logo /><View style={{ flex: 1, minWidth: 0 }}><T weight="800" style={s.wordmark}>CARDIA</T><T numberOfLines={1} adjustsFontSizeToFit style={s.tagline}>Toutes vos cartes. Un seul endroit.</T></View><View style={s.inline}><Round icon="search" label="Rechercher" onPress={() => setTab('search')} /><View><Round icon="bell" label="Rappels" onPress={openReminder} />{reminder && <View style={s.badge} />}</View></View></View>
    <View style={{ paddingHorizontal: 22, paddingTop: 24 }}><T weight="700" style={{ fontSize: 22, letterSpacing: -.22 }}>Bonjour Wilfride 👋</T><T style={{ fontSize: 14.5, color: '#4A5675', marginTop: 4 }}>Votre portefeuille numérique est prêt.</T></View>
    {carouselCards.length ? <CardCarousel cards={carouselCards} active={Math.min(active, carouselCards.length - 1)} setActive={setActive} onOpen={openCard} onGestureActive={setCarouselDragging} /> : <View style={s.empty}><T weight="700">Votre portefeuille est vide.</T><Button label="Ajouter une carte" onPress={openAdd} /></View>}
    <View style={s.shortcuts}>{[
      ['plus', 'Ajouter\nune carte', ['#3B82FF', '#1347E0'], openAdd],
      ['scan', 'Scanner\nune carte', ['#A78BFA', '#6D4AE8'], () => setSheet('scan')],
      ['document', 'Mes\ndocuments', ['#34D399', '#0E9F6E'], () => goCards('identite')],
      ['shield', 'Sécurité', ['#FF9A4D', '#F2611D'], () => setTab('profile')],
    ].map(([icon, label, colors, action]) => <Pressable key={icon} accessibilityRole="button" onPress={action} style={s.shortcut}><LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.shortcutIcon}><Icon name={icon} color="#fff" size={22} /></LinearGradient><T weight="600" numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.8} style={s.shortcutLabel}>{label}</T></Pressable>)}</View>
    <View style={s.categoryHeading}><T weight="700" style={{ fontSize: 18 }}>Catégories</T><Pressable accessibilityRole="button" onPress={() => goCards('all')} style={[s.inline, { gap: 4 }]}><T style={{ fontSize: 13, color: C.muted }}>Tout voir</T><Icon name="chevron" size={14} color={C.muted} /></Pressable></View>
    <View style={s.categoryGrid}>{categories.map(cat => <Pressable key={cat.id} accessibilityRole="button" onPress={() => goCards(cat.id)} style={s.category}><View style={[s.categoryIcon, { backgroundColor: cat.tint }]}><Icon name={cat.icon} color={cat.color} /></View><T numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 12 }}>{cat.label}</T></Pressable>)}</View>
    {reminder && <Pressable accessibilityRole="button" onPress={openReminder} style={s.reminder}><View style={s.reminderIcon}><Icon name="bell" size={20} /></View><View style={{ flex: 1 }}><T weight="700" style={{ fontSize: 14.5 }}>1 rappel important</T><T style={{ fontSize: 13, color: '#4A5675', marginTop: 2 }}>Votre assurance expire dans 30 jours.</T></View><Icon name="chevron" size={18} color={C.muted} /></Pressable>}
  </>;
  const listing = <>
    <View style={[s.between, s.pageHeading]}><View><T weight="800" style={s.title}>Mes cartes</T><T style={s.subtitle}>{countLabel}</T></View><Pressable accessibilityRole="button" accessibilityLabel="Ajouter une carte" onPress={openAdd} style={s.addRound}><Icon name="plus" color="#fff" size={20} /></Pressable></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filters}>{[{ id: 'all', label: 'Toutes' }, ...categories.filter(c => resolved.some(card => card.cat === c.id) || c.id === filter)].map(c => <Pressable key={c.id} accessibilityRole="button" accessibilityState={{ selected: filter === c.id }} onPress={() => setFilter(c.id)} style={[s.chip, { height: 36, backgroundColor: filter === c.id ? C.ink : '#fff' }]}><T weight="600" style={{ color: filter === c.id ? '#fff' : '#33405E', fontSize: 13 }}>{c.label}</T></Pressable>)}</ScrollView>
    <View style={s.list}>{filtered.map(card => <CardRow key={card.id} card={card} onPress={() => openCard(card.id)} />)}{!filtered.length && <T style={s.noResults}>Aucune carte dans cette catégorie.</T>}</View>
  </>;
  const search = <>
    <View style={s.pageHeading}><T weight="800" style={s.title}>Recherche</T><View style={s.search}><Icon name="search" size={19} color={C.muted} /><TextInput accessibilityLabel="Rechercher une carte" value={query} onChangeText={setQuery} placeholder="Nom, catégorie, numéro…" placeholderTextColor="#8A96B0" style={s.searchInput} /></View><T weight="600" style={{ fontSize: 13, color: C.muted, marginTop: 22, marginBottom: 10 }}>{query.trim() ? `${results.length} résultat${results.length > 1 ? 's' : ''}` : 'Toutes vos cartes'}</T></View>
    <View style={[s.list, { paddingTop: 0 }]}>{results.map(card => <CardRow key={card.id} card={card} onPress={() => openCard(card.id)} />)}{!results.length && <T style={s.noResults}>Aucune carte trouvée.</T>}</View>
  </>;
  const profile = <View style={s.pageHeading}>
    <T weight="800" style={s.title}>Profil</T><View style={s.profileCard}><LinearGradient colors={['#3B82FF', '#0B3FD1']} style={s.avatar}><T weight="700" style={{ fontSize: 20, color: '#fff' }}>KW</T></LinearGradient><View style={{ flex: 1 }}><T weight="700" style={{ fontSize: 16 }}>{HOLDER}</T><T style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>{countLabel}</T></View></View>
    <T weight="600" style={s.sectionLabel}>Sécurité</T><View style={s.panel}><Toggle label="Déverrouillage Face ID" value={faceId} onChange={setFaceId} /><View style={s.divider} /><Toggle label="Rappels d'expiration" value={notifications} onChange={setNotifications} /></View>
    <T weight="600" style={s.sectionLabel}>Préférences</T><View style={s.panel}><View style={s.preference}><T weight="600" style={{ flex: 1, fontSize: 14.5 }}>Langue</T><T style={{ color: C.muted }}>Français</T></View><View style={s.divider} /><Pressable accessibilityRole="button" onPress={() => setSheet('help')} style={s.preference}><T weight="600" style={{ flex: 1, fontSize: 14.5 }}>Aide et assistance</T><Icon name="chevron" size={16} color="#9AA6C0" /></Pressable></View>
    <Button label="Se déconnecter" secondary danger style={{ height: 50, marginTop: 20 }} onPress={() => setSignedOut(true)} />
  </View>;

  return <View style={s.outer}><StatusBar style={sheet === 'scan' ? 'light' : 'dark'} /><View style={[s.app, { width }]}>
    {signedOut ? <View style={[s.signedOut, { paddingTop: top }]}><Logo /><T weight="800" style={s.title}>À bientôt, Wilfride</T><T style={{ color: C.muted }}>Vous êtes déconnecté de la démonstration.</T><Button label="Revenir à mon portefeuille" onPress={() => { setSignedOut(false); setTab('home'); }} /></View> : <>
      <View style={{ flex: 1, paddingTop: top }} accessibilityElementsHidden={!!sheet || !!detail} importantForAccessibility={sheet || detail ? 'no-hide-descendants' : 'auto'}>
        <ScrollView scrollEnabled={!carouselDragging} key={tab} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 28 }}>{tab === 'home' ? home : tab === 'cards' ? listing : tab === 'search' ? search : profile}</ScrollView>
        <View style={[s.tabs, { paddingBottom: Math.max(insets.bottom, 30) }]}>{tabs.map(([id, icon, label]) => <Pressable key={id} accessibilityRole="tab" accessibilityState={{ selected: tab === id }} onPress={() => setTab(id)} style={s.tab}><Icon name={icon} size={24} color={tab === id ? C.blue : '#8A96B0'} filled={id === 'home'} /><T weight="600" style={{ fontSize: 11.5, color: tab === id ? C.blue : '#8A96B0' }}>{label}</T></Pressable>)}</View>
      </View>
      {detail && <Sheet close={close} bottom={insets.bottom}>
        {detail.layout?.startsWith('togo-') ? <View style={{ gap: 10 }}><TogoIdentityCard card={detail} width={width - 40} back={detailBack} showNumber={showNum} /><View style={{ flexDirection: 'row', alignSelf: 'center', padding: 3, borderRadius: 12, backgroundColor: '#E9EDF4' }}>{['Recto', 'Verso'].map((label, i) => <Pressable key={label} accessibilityRole="button" accessibilityState={{ selected: detailBack === !!i }} onPress={() => setDetailBack(!!i)} style={{ paddingHorizontal: 22, paddingVertical: 8, borderRadius: 9, backgroundColor: detailBack === !!i ? '#fff' : 'transparent' }}><T weight="700" style={{ fontSize: 13 }}>{label}</T></Pressable>)}</View></View> : <Surface card={detail} style={s.detailCard}><T weight="700" style={{ color: detail.ink, fontSize: 19 }}>{detail.name}</T><T style={{ color: detail.ink, opacity: .75, fontSize: 12, marginTop: 3 }}>{detail.sub}</T><View style={{ flex: 1, justifyContent: 'center' }}><T weight="600" adjustsFontSizeToFit numberOfLines={1} style={{ color: detail.ink, fontSize: 19, letterSpacing: 1.9 }}>{showNum ? detail.num : detail.masked}</T></View><View style={[s.between, { alignItems: 'flex-end' }]}><View><T style={{ color: detail.ink, fontSize: 10.5, opacity: .7 }}>{detail.expLabel}</T><T weight="600" style={{ color: detail.ink }}>{detail.exp}</T></View><T weight="600" style={{ color: detail.ink, textAlign: 'right', fontSize: 12.5, flex: 1 }}>{detail.holder}</T></View></Surface>}
        <View style={[s.panel, { marginTop: 18, borderRadius: 18 }]}><View style={s.info}><T style={s.infoLabel}>Numéro</T><T weight="600" style={{ flexShrink: 1, letterSpacing: .5 }}>{showNum ? detail.num : detail.masked}</T><Pressable accessibilityRole="button" onPress={() => setShowNum(!showNum)}><T weight="700" style={{ fontSize: 13, color: C.blue }}>{showNum ? 'Masquer' : 'Afficher'}</T></Pressable></View><View style={s.divider} /><View style={s.info}><T style={s.infoLabel}>Catégorie</T><T weight="600">{detail.catLabel}</T></View><View style={s.divider} /><View style={s.info}><T style={s.infoLabel}>{detail.expLabel}</T><T weight="600" style={{ color: detail.expSoon ? '#E5484D' : C.ink }}>{detail.exp}</T></View></View>
        {detail.reference && <View style={{ marginTop: 14, padding: 14, borderRadius: 14, backgroundColor: '#EEF3F7' }}><T weight="700" style={{ fontSize: 12 }}>{detail.reference.status}</T><T style={{ color: C.muted, fontSize: 12, lineHeight: 18, marginTop: 5 }}>{detail.reference.note}</T>{detail.reference.url && <Pressable accessibilityRole="link" onPress={() => Linking.openURL(detail.reference.url).catch(() => flash('Impossible d’ouvrir la source.'))}><T weight="700" style={{ color: C.blue, marginTop: 8, fontSize: 12 }}>Consulter la source officielle</T></Pressable>}</View>}
        <View style={[s.inline, { marginTop: 14 }]}><Button label="Partager" onPress={share} style={{ flex: 1, height: 50 }} /><Button label="Supprimer" secondary danger onPress={remove} style={{ flex: 1, height: 50 }} /></View>
      </Sheet>}
      {sheet === 'togo' && <Sheet close={close} bottom={insets.bottom}>
        <T weight="800" style={{ fontSize: 20 }}>Documents du Togo</T>
        <T style={{ color: C.muted, fontSize: 13, lineHeight: 20, marginVertical: 12 }}>Choisissez un modèle de démonstration. Les modèles provisoires restent signalés en attendant un spécimen vérifié.</T>
        {togoDocuments.map(template => <Pressable key={template.id} accessibilityRole="button" accessibilityLabel={`Ajouter ${template.name}`} onPress={() => {
          const card = { ...template, id: `local-${nextId.current++}` };
          setCards(list => [...list, card]); setSheet(null); openCard(card.id);
          flash(`${card.name} ajoutée à votre portefeuille.`);
        }} style={[s.cardRow, { marginBottom: 10 }]}>
          <TogoIdentityCard card={resolveCard(template)} width={85} shadow={false} />
          <View style={{ flex: 1 }}><T weight="700">{template.name}</T><T style={{ fontSize: 11, lineHeight: 17, color: C.muted, marginTop: 4 }}>{template.reference.status}</T></View><Icon name="plus" size={18} color={C.blue} />
        </Pressable>)}
        <Button label="Retour à la saisie libre" secondary onPress={() => setSheet('add')} />
      </Sheet>}
      {sheet === 'add' && <Sheet close={close} bottom={insets.bottom}>
        <T weight="800" style={{ fontSize: 20 }}>Ajouter une carte</T><Button label="Choisir un document togolais" secondary onPress={() => setSheet('togo')} style={{ marginTop: 14 }} /><T weight="600" style={s.fieldLabel}>Catégorie</T><View style={s.addCategories}>{categories.map(c => <Pressable key={c.id} accessibilityRole="button" accessibilityState={{ selected: form.category === c.id }} onPress={() => setForm({ ...form, category: c.id })} style={[s.chip, { backgroundColor: form.category === c.id ? C.blue : '#fff' }]}><T weight="600" style={{ fontSize: 13, color: form.category === c.id ? '#fff' : '#33405E' }}>{c.label}</T></Pressable>)}</View>
        <T weight="600" style={s.fieldLabel}>Nom de la carte</T><TextInput accessibilityLabel="Nom de la carte" value={form.name} onChangeText={name => setForm({ ...form, name })} placeholder="Ex. Carte Orange Money" style={s.input} /><View style={[s.inline, { marginTop: 12 }]}><TextInput accessibilityLabel="Numéro" value={form.number} onChangeText={number => setForm({ ...form, number })} placeholder="Numéro" keyboardType="numeric" style={[s.input, { flex: 1.6 }]} /><TextInput accessibilityLabel="Expiration" value={form.expiry} onChangeText={expiry => setForm({ ...form, expiry })} placeholder="MM/AA" style={[s.input, { flex: 1 }]} /></View><Button label="Ajouter la carte" disabled={!form.name.trim()} onPress={add} style={{ marginTop: 20 }} />
      </Sheet>}
      {sheet === 'help' && <Sheet close={close} bottom={insets.bottom}><T weight="800" style={{ fontSize: 20 }}>Aide et assistance</T><T style={{ lineHeight: 23, marginVertical: 18 }}>Glissez les cartes à gauche ou à droite pour les parcourir, et vers le bas pour voir le verso. Touchez une carte pour afficher ses informations.{ '\n\n' }Cette démonstration utilise uniquement des données fictives. Le scan et Face ID sont simulés. Les changements restent en mémoire jusqu’au redémarrage.</T><Button label="Compris" onPress={close} /></Sheet>}
      {sheet === 'scan' && <Scanner done={scanDone} close={close} top={top} bottom={insets.bottom} width={width} save={() => { setCards(c => [...c, { ...scannedCard, id: `local-${nextId.current++}` }]); setSheet(null); flash('Carte Fidélité Plus enregistrée.'); }} />}
    </>}
    {!!toast && <View accessibilityLiveRegion="polite" style={[s.toast, { top: top + 4 }]}><T weight="600" style={{ color: '#fff' }}>{toast}</T></View>}
  </View></View>;
}
const s = StyleSheet.create({
  loading: { flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }, outer: { flex: 1, alignItems: 'center', backgroundColor: '#E8EFF9' }, app: { flex: 1, backgroundColor: C.bg, overflow: 'hidden' },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 10 }, between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  header: { paddingTop: 4, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', gap: 12 }, wordmark: { fontSize: 23, letterSpacing: 1.61, lineHeight: 26 }, tagline: { fontSize: 11.5, color: '#4A5675', marginTop: 3 }, badge: { position: 'absolute', top: 10, right: 11, width: 8, height: 8, borderRadius: 4, backgroundColor: '#F0443A', borderWidth: 2, borderColor: '#fff' },
  shortcuts: { flexDirection: 'row', gap: 10, paddingTop: 24, paddingHorizontal: 20 }, shortcut: { flex: 1, backgroundColor: '#fff', borderRadius: 20, paddingTop: 16, paddingBottom: 14, paddingHorizontal: 4, alignItems: 'center', gap: 10, boxShadow: '0 6px 18px rgba(30,60,140,.06)' }, shortcutIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, shortcutLabel: { width: '100%', fontSize: 12, textAlign: 'center', lineHeight: 16.25 },
  categoryHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 28, paddingBottom: 14, paddingHorizontal: 22 }, categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 16, paddingHorizontal: 12 }, category: { width: '20%', alignItems: 'center', gap: 8 }, categoryIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  reminder: { marginTop: 26, marginHorizontal: 20, padding: 16, backgroundColor: '#fff', borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 14, boxShadow: '0 6px 18px rgba(30,60,140,.06)' }, reminderIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EEF2F8', alignItems: 'center', justifyContent: 'center' },
  pageHeading: { paddingTop: 8, paddingHorizontal: 22 }, title: { fontSize: 26, letterSpacing: -.26 }, subtitle: { fontSize: 13.5, color: '#4A5675', marginTop: 2 }, addRound: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px rgba(31,91,255,.3)' },
  filters: { paddingTop: 18, paddingBottom: 4, paddingHorizontal: 22, gap: 8 }, chip: { height: 34, paddingHorizontal: 13, borderRadius: 18, justifyContent: 'center' }, list: { paddingTop: 14, paddingHorizontal: 20, gap: 10 }, cardRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 4px 14px rgba(30,60,140,.05)' }, thumbnail: { width: 60, height: 40, borderRadius: 8, boxShadow: '0 4px 10px rgba(15,35,90,.15)' }, noResults: { textAlign: 'center', color: C.muted, paddingVertical: 40 },
  search: { marginTop: 16, height: 48, borderRadius: 16, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, boxShadow: '0 4px 14px rgba(30,60,140,.06)' }, searchInput: { flex: 1, height: '100%', fontSize: 15, color: C.ink, fontFamily: 'Jakarta500', outlineStyle: 'none' },
  profileCard: { marginTop: 18, borderRadius: 22, backgroundColor: '#fff', padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, boxShadow: '0 4px 14px rgba(30,60,140,.06)' }, avatar: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' }, sectionLabel: { fontSize: 13, color: C.muted, marginTop: 24, marginBottom: 10, marginHorizontal: 4 }, panel: { backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 14px rgba(30,60,140,.06)' }, preference: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 16 }, divider: { height: 1, backgroundColor: '#EEF1F6', marginLeft: 16 }, toggle: { width: 50, height: 30, borderRadius: 15, padding: 3 }, toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,.2)' },
  tabs: { flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8, backgroundColor: '#FFFFFFEB', borderTopWidth: 1, borderTopColor: C.line }, tab: { flex: 1, alignItems: 'center', gap: 4 },
  overlay: { ...StyleSheet.absoluteFill, zIndex: 60, backgroundColor: 'rgba(10,20,50,.38)', justifyContent: 'flex-end' }, sheet: { backgroundColor: C.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingTop: 10, maxHeight: '93%' }, handle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#CBD3E1', alignSelf: 'center', marginBottom: 16 }, detailCard: { height: 214, borderRadius: 22, padding: 22, boxShadow: '0 18px 36px rgba(15,35,90,.25)' }, info: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 16, gap: 10 }, infoLabel: { flex: 1, fontSize: 13.5, color: C.muted }, fieldLabel: { fontSize: 13, color: C.muted, marginTop: 18, marginBottom: 8, marginHorizontal: 2 }, addCategories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, input: { height: 48, borderRadius: 14, borderWidth: 1, borderColor: '#E1E6EF', backgroundColor: '#fff', paddingHorizontal: 14, fontSize: 15, fontFamily: 'Jakarta500', color: C.ink, minWidth: 0, outlineStyle: 'none' },
  scanner: { ...StyleSheet.absoluteFill, zIndex: 70, backgroundColor: '#0A1024', paddingHorizontal: 24 }, scanCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 }, scanFrame: { height: 196, borderRadius: 20, backgroundColor: '#FFFFFF0A' }, corner: { position: 'absolute', width: 36, height: 36 }, tl: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 20 }, tr: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 20 }, bl: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 20 }, br: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 20 }, scanned: { position: 'absolute', top: 16, bottom: 16, left: 16, right: 16, borderRadius: 14, padding: 16, justifyContent: 'space-between' }, scanLine: { position: 'absolute', top: '50%', left: 20, right: 20, height: 2, backgroundColor: '#5B8CFF', boxShadow: '0 0 14px #5B8CFF' },
  toast: { position: 'absolute', left: 20, right: 20, zIndex: 90, backgroundColor: C.ink, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 16, boxShadow: '0 12px 30px rgba(10,20,50,.3)' }, empty: { padding: 30, gap: 20, alignItems: 'center' }, signedOut: { flex: 1, padding: 24, justifyContent: 'center', gap: 24 },
});






