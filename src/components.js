import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import TogoIdentityCard from './NationalDocument';
export const C = { blue: '#1F5BFF', ink: '#0F1B3D', muted: '#5B6B90', bg: '#F6F8FC', line: '#E9EDF4' };
export function T({ weight = '500', style, ...props }) { return <Text {...props} style={[{ color: C.ink, fontFamily: `Jakarta${weight}`, fontSize: 14 }, style]} />; }
const paths = {
  close: 'M6 6l12 12M18 6 6 18', plus: 'M12 5v14M5 12h14', search: 'M20 20l-4-4',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a2 2 0 0 0 3.4 0',
  home: 'M3 10.6L12 3.5l9 7.1V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  cards: 'M3 10h18M7 15h4', user: 'M4 21c1-4 4.5-6 8-6s7 2 8 6',
  scan: 'M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M7 12h10',
  chevron: 'M9 6l6 6-6 6', star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  identity: 'M6 16c.6-1.4 1.8-2 3-2s2.4.6 3 2M14.5 10h3.5M14.5 14h3.5',
  bus: 'M5 11h14M8 21v-3M16 21v-3M8.5 14.5h.01M15.5 14.5h.01',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM12 8v5M12 16h.01',
  shieldCheck: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  education: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v5',
  briefcase: 'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18',
  heart: 'M12 20s-8-4.5-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.5 12 20 12 20zM7.5 12h3l1.2-2 2 4 1.3-2h1.5',
  document: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6',
  contactless: 'M8 8.5a5 5 0 0 1 0 7M12 6a9 9 0 0 1 0 12M16 3.5a13 13 0 0 1 0 17',
};
export function Icon({ name, size = 24, color = C.ink, filled = false }) {
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    {paths[name] && <Path d={paths[name]} fill={filled ? color : 'none'} />}
    {name === 'search' && <Circle cx="11" cy="11" r="7" />}{name === 'user' && <Circle cx="12" cy="8" r="4" />}
    {['cards', 'identity'].includes(name) && <Rect x="3" y="5" width="18" height="14" rx="2.5" />}{name === 'identity' && <Circle cx="9" cy="11" r="2" />}
    {name === 'bus' && <Rect x="5" y="3" width="14" height="15" rx="3" />}{name === 'briefcase' && <Rect x="3" y="7" width="18" height="13" rx="2.5" />}
    {name === 'more' && [6, 12, 18].map(x => <Circle key={x} cx={x} cy="12" r="1.8" fill={color} strokeWidth={0} />)}
  </Svg>;
}
export function Logo() { return <Svg width={40} height={44} viewBox="0 0 40 44"><Defs><SvgGradient id="logo" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#3B82FF" /><Stop offset="1" stopColor="#0B3FD1" /></SvgGradient></Defs><Path d="M31 11.5A14 14 0 1 0 31 32.5" stroke="url(#logo)" strokeWidth="10" strokeLinecap="round" fill="none" /></Svg>; }
export function Round({ icon, label, onPress, dark = false }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.round, dark && { backgroundColor: '#FFFFFF1F', width: 40, height: 40 }, { opacity: pressed ? .7 : 1 }]}><Icon name={icon} size={20} color={dark ? '#fff' : C.ink} /></Pressable>;
}
export function Button({ label, onPress, disabled, secondary, danger, style }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, secondary && { backgroundColor: '#fff' }, disabled && { backgroundColor: '#A9B8DA' }, { opacity: pressed ? .75 : 1 }, style]}><T weight="700" style={{ fontSize: 15, color: danger ? '#E5484D' : secondary ? C.ink : '#fff' }}>{label}</T></Pressable>;
}
export function Surface({ card, children, style }) {
  return <View style={[style, { overflow: 'hidden', borderCurve: 'continuous', isolation: 'isolate' }]}>
    <LinearGradient pointerEvents="none" colors={card.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[StyleSheet.absoluteFill, { borderRadius: StyleSheet.flatten(style)?.borderRadius || 0 }]} />
    {card.brand === 'mc' && <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}><Defs><RadialGradient id="mcGlow" cx="95%" cy="115%" rx="72%" ry="50%"><Stop offset="0" stopColor="#4078E6" stopOpacity={.6} /><Stop offset="1" stopColor="#4078E6" stopOpacity={0} /></RadialGradient></Defs><Rect width="100%" height="100%" fill="url(#mcGlow)" /></Svg>}{children}
  </View>;
}
function Brand({ card, small }) {
  if (card.brand === 'visa') return <T weight="800" style={{ fontSize: small ? 16 : 22, fontStyle: 'italic', color: card.ink }}>VISA</T>;
  if (card.brand === 'mc') return <View style={{ flexDirection: 'row' }}>{['#EB001B', '#F79E1B'].map((bg, i) => <View key={bg} style={{ width: small ? 22 : 30, height: small ? 22 : 30, borderRadius: 20, backgroundColor: bg, marginLeft: i ? (small ? -9 : -12) : 0, opacity: i ? .95 : 1 }} />)}</View>;
  if (card.brand === 'id') return <View style={{ width: 34, height: 34, borderWidth: 1.5, borderColor: card.ink, opacity: .55, borderRadius: 17, alignItems: 'center', justifyContent: 'center' }}><T weight="700" style={{ fontSize: 9, color: card.ink }}>RT</T></View>;
  return null;
}
export function CardFace({ card, back = false }) {
  if (card.layout?.startsWith('togo-')) return <View style={{ width: 256, height: 168, justifyContent: 'center' }}><TogoIdentityCard card={card} back={back} /></View>;
  const text = (str, size, weight = '500', style) => <T weight={weight} style={[{ color: card.ink, fontSize: size }, style]}>{str}</T>;
  return <Surface card={card} style={styles.face}>
    {!back ? <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 18, paddingBottom: 14 }}>
      <View style={styles.between}>{text(card.name, 16, '700')}{card.cat === 'bancaire' && <Icon name="contactless" size={18} color={card.ink} />}</View>
      {text(card.sub, 11, '500', { opacity: .75, marginTop: 2 })}<View style={[styles.between, { flex: 1 }]}>{text(card.masked, 15, '600', { letterSpacing: 1.2 })}<Brand card={card} /></View>
      {text(card.expLabel, 9.5, '500', { opacity: .7 })}{text(card.exp, 12, '600')}{text(card.holder, 11.5, '600', { marginTop: 8 })}
    </View> : card.cat === 'bancaire' ? <>
      <View style={{ height: 34, backgroundColor: '#0B0F1A', marginTop: 18 }} />
      <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 18, paddingTop: 12 }}><View style={{ flex: 1, height: 30, borderRadius: 4, backgroundColor: '#E9ECF2', overflow: 'hidden' }}><Svg width="100%" height="30">{Array.from({ length: 30 }, (_, i) => <Path key={i} d={`M${i * 12 - 30} 30l30-30`} stroke="#F3F4F7" strokeWidth="6" />)}</Svg></View><View style={{ backgroundColor: '#fff', borderRadius: 4, paddingHorizontal: 10, justifyContent: 'center' }}><T weight="700" style={{ fontSize: 12, letterSpacing: 1.4 }}>•••</T></View></View>
      <View style={[styles.between, { flex: 1, alignItems: 'flex-end', paddingHorizontal: 18, paddingBottom: 14 }]}>{text(`${card.sub} · Service client 24/7\nCarte strictement personnelle`, 9.5, '500', { opacity: .8, lineHeight: 14 })}<Brand card={card} small /></View>
    </> : card.brand === 'id' ? <>
      <View style={{ paddingHorizontal: 18, paddingTop: 16, gap: 3 }}>{[['Né(e) le', '12/05/1994'], ['Lieu', 'Lomé, Togo'], ['Délivrée le', '14/03/2021']].map(([k, v]) => <View key={k} style={{ flexDirection: 'row', gap: 12 }}>{text(k, 10.5, '500', { width: 64, opacity: .65 })}{text(v, 10.5, '600')}</View>)}</View>
      <View style={{ marginTop: 'auto', paddingHorizontal: 14, paddingTop: 8, paddingBottom: 12, backgroundColor: '#FFFFFF8C' }}>{text(`${card.mrz1}\n${card.mrz2}`, 10, '500', { fontFamily: 'monospace', lineHeight: 15, letterSpacing: .6 })}</View>
    </> : <>
      {text(card.name, 12, '700', { paddingHorizontal: 18, paddingTop: 14 })}
      <View style={{ marginHorizontal: 18, marginTop: 10, padding: 10, backgroundColor: '#fff', borderRadius: 10, flex: 1, gap: 6, justifyContent: 'center', alignItems: 'center' }}><Svg width="100%" height={46} viewBox="0 0 200 46" preserveAspectRatio="none">{Array.from({ length: 50 }, (_, i) => <Rect key={i} x={i * 4} width={i % 3 === 0 ? 3 : 1.5} height={46} fill={C.ink} />)}</Svg><T weight="600" style={{ fontSize: 11, letterSpacing: 1.3 }}>{card.num}</T></View>
      {text('Présentez ce code au contrôle', 9.5, '500', { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 12, opacity: .8 })}
    </>}
  </Surface>;
}
const styles = StyleSheet.create({ round: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(30,60,140,.08)' }, button: { height: 52, borderRadius: 16, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' }, face: { width: 256, height: 168, borderRadius: 20, boxShadow: '0 18px 36px rgba(15,35,90,.22)' }, between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 } });


