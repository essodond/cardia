import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { countryOf, masked } from './data';

export const C = { blue: '#1F5BFF', ink: '#0F1B3D', muted: '#5B6B90', bg: '#F6F8FC', line: '#E9EDF4' };
export function T({ children, style, weight = '500', ...props }) {
  return <Text {...props} style={[{ color: C.ink, fontSize: 14, fontFamily: `Jakarta${weight}` }, style]}>{children}</Text>;
}
const paths = {
  back: 'M15 6l-6 6 6 6', close: 'M6 6l12 12M18 6 6 18', plus: 'M12 5v14M5 12h14',
  search: 'M20 20l-4-4', bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4',
  home: 'M3 10.6L12 3.5l9 7.1V21h-6v-6H9v6H3z', cards: 'M3 10h18M7 15h4',
  globe: 'M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18', user: 'M4 21c1-8 15-8 16 0',
  scan: 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5', eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z',
  chevron: 'M9 6l6 6-6 6', star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  edit: 'M12 20h9M16 3l5 5L7 21l-4 1 1-4z', trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',
  check: 'M5 12l5 5L20 7', flip: 'M3 11a9 9 0 0 1 16-5l2 2M21 3v5h-5M21 13a9 9 0 0 1-16 5l-2-2M3 21v-5h5',
  share: 'M12 16V2M7 7l5-5 5 5M5 12v9h14v-9', camera: 'M3 6h5l2-3h4l2 3h5v15H3z',
};
export function Icon({ name, size = 22, color = C.ink, filled = false }) {
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    {paths[name] && <Path d={paths[name]} fill={filled ? color : 'none'} />}
    {name === 'search' && <Circle cx="10.5" cy="10.5" r="7" />}
    {name === 'globe' && <Circle cx="12" cy="12" r="9" />}
    {name === 'user' && <Circle cx="12" cy="8" r="4" />}
    {name === 'eye' && <Circle cx="12" cy="12" r="3" />}
    {name === 'camera' && <Circle cx="12" cy="13" r="3.5" />}
    {name === 'cards' && <Rect x="3" y="5" width="18" height="14" rx="2.5" />}
  </Svg>;
}
export function Button({ label, onPress, secondary, icon, disabled, style }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled} onPress={onPress} style={({ pressed }) => [s.button, secondary && s.secondary, { opacity: disabled ? .45 : pressed ? .75 : 1 }, style]}>
    {icon && <Icon name={icon} size={18} color={secondary ? C.ink : '#fff'} />}<T weight="700" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8} style={{ color: secondary ? C.ink : '#fff', fontSize: 15, flexShrink: 1 }}>{label}</T>
  </Pressable>;
}
export function Round({ icon, onPress, label, color = C.ink, style }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [s.round, style, { opacity: pressed ? .65 : 1 }]}><Icon name={icon} color={color} /></Pressable>;
}
export function Logo() {
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Svg width="34" height="38" viewBox="0 0 40 44"><Path d="M31 11.5A14 14 0 1 0 31 32.5" stroke={C.blue} strokeWidth="10" strokeLinecap="round" fill="none" /></Svg><T weight="800" style={{ fontSize: 21, letterSpacing: 2 }}>CARDIA</T></View>;
}
export function DemoQR({ size = 120 }) {
  let d = '';
  for (let y = 0; y < 25; y++) for (let x = 0; x < 25; x++) {
    const f = [[0, 0], [18, 0], [0, 18]].find(([a, b]) => x >= a && x < a + 7 && y >= b && y < b + 7);
    const dx = f ? x - f[0] : 0, dy = f ? y - f[1] : 0;
    if (f ? dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) : (x * 17 + y * 31 + x * y) % 7 < 3) d += `M${x} ${y}h1v1h-1z`;
  }
  return <View style={{ padding: 12, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center' }}><Svg width={size} height={size} viewBox="-1 -1 27 27"><Path d={d} fill={C.ink} /></Svg><T weight="800" style={{ fontSize: 8, letterSpacing: 2 }}>DEMO</T></View>;
}
export function DigitalCard({ card, width = 300, flipped = false, onPress }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.sequence([Animated.timing(anim, { toValue: 1, duration: 120, useNativeDriver: true }), Animated.timing(anim, { toValue: 0, duration: 180, useNativeDriver: true })]).start(); }, [flipped, anim]);
  const bank = card.layout === 'bank', passport = card.layout === 'passport', dark = bank || passport;
  const ink = dark ? '#fff' : '#183C3A';
  const text = (content, size, weight = '600', style = {}) => <T weight={weight} style={[{ color: ink, fontSize: size }, style]}>{content}</T>;
  return <Pressable onPress={onPress} disabled={!onPress} accessibilityRole={onPress ? 'button' : undefined} accessibilityLabel={`${card.name}${onPress ? ', retourner la carte' : ''}`} style={{ width, height: width / 1.586 }}>
    <Animated.View style={{ width, height: width / 1.586, transform: [{ scaleX: anim.interpolate({ inputRange: [0, 1], outputRange: [1, .93] }) }] }}>
      <View style={{ width: 340, height: 214.4, transform: [{ scale: width / 340 }], transformOrigin: 'top left' }}>
        <LinearGradient colors={[card.color, card.color2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.card}>
          <View style={[s.orbit, { borderColor: dark ? '#FFFFFF14' : '#376B4820' }]} /><View style={[s.orbit, { right: -60, top: 35, borderColor: dark ? '#FFFFFF14' : '#376B4820' }]} />
          {flipped ? <><View style={{ backgroundColor: '#152035', height: 36, marginHorizontal: -20, marginTop: 9 }} /><View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}><View style={{ flex: 1 }}>{text('DOCUMENT DE DÉMONSTRATION', 9, '800')}{text(`${card.firstNames}\n${card.lastName}`, 12, '700', { marginTop: 12 })}{text(card.note || 'Données fictives · CARDIA', 9, '500', { marginTop: 12 })}</View>{card.qr && <DemoQR size={64} />}</View><View style={{ marginTop: 'auto' }}>{text('CARDIA  •  EXEMPLE SANS VALEUR OFFICIELLE', 7, '700', { letterSpacing: 1 })}</View></> : bank ? <>
            <View style={s.between}>{text('CARDIA BANK', 16, '800', { letterSpacing: 2 })}{text('DÉBIT', 8, '700', { opacity: .7 })}</View>
            <View style={{ width: 39, height: 29, borderRadius: 7, backgroundColor: '#DEC99C', marginTop: 25, borderWidth: 1, borderColor: '#AF986C', justifyContent: 'center' }}><View style={{ height: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#B39A6D' }} /></View>
            {text(`••••  ••••  ••••  ${card.number.slice(-4)}`, 22, '600', { marginTop: 14, letterSpacing: 2 })}
            <View style={[s.between, { marginTop: 'auto' }]}><View>{text(`${card.firstNames.split(' ').slice(-1)[0]} ${card.lastName}`.toUpperCase(), 10, '600', { letterSpacing: 1 })}{text(card.expiry, 10, '500', { marginTop: 4 })}</View>{card.brand === 'VISA' ? text('VISA', 29, '800', { fontStyle: 'italic' }) : <View style={{ flexDirection: 'row' }}><View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#EE4D46' }} /><View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#F7B34B', marginLeft: -12, opacity: .9 }} /></View>}</View>
          </> : passport ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>{text(countryOf(card.country).name.toUpperCase(), 14, '800', { letterSpacing: 3 })}<Icon name="globe" size={65} color="#D8C68F" />{text('PASSEPORT', 20, '800', { color: '#E6D4A3', letterSpacing: 4 })}{text('DÉMONSTRATION', 7, '700', { letterSpacing: 2 })}</View> : <>
            <View style={s.between}><View>{text(countryOf(card.country).name.toUpperCase(), 11, '800', { letterSpacing: 1.5 })}{text(card.name.toUpperCase(), 8, '700', { marginTop: 4 })}</View><T style={{ fontSize: 24 }}>{countryOf(card.country).flag}</T></View>
            <View style={{ flexDirection: 'row', gap: 14, marginTop: 20 }}>
              {card.photo && <View style={{ width: 65, height: 81, borderRadius: 7, backgroundColor: '#A6BFB780', alignItems: 'center', justifyContent: 'center' }}><Icon name="user" size={45} color="#68867C" /></View>}
              <View style={{ flex: 1 }}>{text('NOM / SURNAME', 6, '700', { opacity: .6 })}{text(card.lastName, 14, '800')}{text(card.firstNames, 10, '600', { marginTop: 3 })}{text(`Né(e) le ${card.birthDate}`, 8, '500', { marginTop: 8 })}{text(card.number, 10, '700', { marginTop: 8 })}</View>
              {card.qr && !card.photo && <DemoQR size={55} />}
            </View>
            <View style={[s.between, { marginTop: 'auto' }]}>{text(`VALIDITÉ  ${card.expiry}`, 7, '700')}{text('SPÉCIMEN · DEMO', 7, '800', { letterSpacing: 1 })}</View>
          </>}
        </LinearGradient>
      </View>
    </Animated.View>
  </Pressable>;
}
const s = StyleSheet.create({
  button: { minHeight: 54, borderRadius: 16, backgroundColor: C.blue, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  secondary: { backgroundColor: '#fff' }, round: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  card: { flex: 1, borderRadius: 18, padding: 20, overflow: 'hidden', boxShadow: '0px 12px 22px rgba(15,27,61,0.17)' },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, orbit: { position: 'absolute', width: 280, height: 280, borderRadius: 140, borderWidth: 35, right: -90, top: -110 },
});
