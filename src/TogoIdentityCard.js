import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

// Layout inspired by the supplied physical CNI; all personal data is fictional.
// No source photograph, official signature, security artwork or readable code is embedded.
export default function TogoIdentityCard({ card, back = false, width = 256, height = width * .625, showNumber = false, shadow = true }) {
  const d = card.national;
  const label = (x, y, text, size = 10, props = {}) => <SvgText x={x} y={y} fontSize={size} fill="#292E26" fontFamily="sans-serif" {...props}>{text}</SvgText>;
  const field = (y, name, value, size = 13) => <G>{label(184, y, name, 9.5)}{label(252, y, value, size, { fontWeight: '600' })}</G>;
  return <View accessible accessibilityLabel={`Carte nationale d’identité du Togo, ${back ? 'verso' : 'recto'}, démonstration avec données fictives`} style={[{ width, height, borderRadius: width * .035, overflow: 'hidden', backgroundColor: '#F2EBD3' }, shadow && s.shadow]}>
    <Svg width="100%" height="100%" viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet">
      <Defs><LinearGradient id="ivory" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#EEE8CD" /><Stop offset=".45" stopColor="#FAF7E8" /><Stop offset="1" stopColor="#EAE2BF" /></LinearGradient></Defs>
      <Rect x=".8" y=".8" width="478.4" height="298.4" rx="16" fill="url(#ivory)" stroke="#CDC6AD" strokeWidth="1.6" />
      <Ellipse cx="135" cy="150" rx="175" ry="125" fill="#E4E6CE" opacity=".18" />
      {!back ? <>
        {label(22, 27, 'RÉPUBLIQUE TOGOLAISE', 18, { fill: '#388E58', fontFamily: 'serif', fontWeight: '700', letterSpacing: 1.7 })}
        {label(23, 40, 'MINISTÈRE CHARGÉ DE LA SÉCURITÉ', 10, { fill: '#599764', fontWeight: '700', letterSpacing: .7 })}
        {label(23, 55, "CARTE NATIONALE D’IDENTITÉ", 13, { fill: '#9E4C3D', fontFamily: 'serif', fontWeight: '700', letterSpacing: 1.15 })}
        <G transform="translate(399 19)"><Ellipse cx="22" cy="34" rx="23" ry="34" fill="#BBD7B2" fillOpacity=".2" stroke="#76AE81" strokeWidth="1.3" />{label(22, 30, 'RT', 16, { fill: '#64A272', textAnchor: 'middle', fontWeight: '700' })}{label(22, 43, 'CARDIA', 6, { fill: '#64A272', textAnchor: 'middle', letterSpacing: .5 })}{label(22, 53, 'DÉMO', 6, { fill: '#64A272', textAnchor: 'middle' })}</G>
        <Rect x="28" y="75" width="138" height="156" rx="3" fill="#D9DCD5" />
        <Path d="M32 231v-24c0-27 26-44 65-44s65 17 65 44v24" fill="#6D8290" />
        <Path d="M71 169l26 23 26-23-7 62H78z" fill="#E7EBE7" />
        <Path d="M85 153h24v24l-12 14-12-14z" fill="#A18A76" />
        <Ellipse cx="97" cy="124" rx="34" ry="42" fill="#B19A84" />
        <Path d="M63 120c-4-54 72-57 68 0l-10-20-18-8-28 11z" fill="#424B4B" />
        {label(97, 223, 'PORTRAIT FICTIF', 7, { fill: '#fff', textAnchor: 'middle', letterSpacing: .6 })}
        {field(81, 'Numéro :', showNumber ? card.num : card.short, 12)}
        {field(100, 'Nom :', d.lastName)}
        {field(119, 'Prénoms :', d.firstNames, 11)}
        {field(152, 'Né(e) le :', d.birthDate, 12)}
        {label(388, 152, `Sexe : ${d.sex}`, 10)}
        {field(171, 'À :', d.birthPlace, 11)}
        {field(190, 'Profession :', d.profession, 11)}
        {field(209, 'Fait le :', d.issued, 12)}
        {field(228, 'Expire le :', card.exp, 12)}
        <Rect x="401" y="188" width="51" height="40" rx="12" fill="#84C891" opacity=".6" />
        {label(426, 211, 'DÉMO', 9, { fill: '#427B4E', textAnchor: 'middle', fontWeight: '700' })}
        <Rect x="22" y="237" width="436" height="36" rx="7" fill="none" stroke="#C8A395" strokeWidth=".8" />
        <Path d="M240 237v36" stroke="#C8A395" strokeWidth=".8" />
        {label(32, 249, 'Signature du titulaire', 8, { fill: '#967D70' })}{label(250, 249, "Signature de l’autorité", 8, { fill: '#967D70' })}
        {label(131, 265, 'NON REPRODUITE', 8, { fill: '#A59A83', textAnchor: 'middle', letterSpacing: 1 })}{label(349, 265, 'NON REPRODUITE', 8, { fill: '#A59A83', textAnchor: 'middle', letterSpacing: 1 })}
      </> : <>
        <Rect x="20" y="19" width="440" height="87" rx="2" fill="#EBE8D9" stroke="#B8B6A3" />
        {Array.from({ length: 55 }, (_, i) => <Rect key={i} x={24 + i * 8} y={24} width={i % 3 === 0 ? 3 : 1.5} height={77} fill="#64695A" opacity=".3" />)}
        <Rect x="115" y="41" width="250" height="42" rx="5" fill="#FAF7E8" />
        {label(240, 59, 'CODE DE DÉMONSTRATION', 12, { textAnchor: 'middle', fontWeight: '700', fill: '#686C5C' })}
        {label(240, 74, 'NON LISIBLE · SANS VALEUR OFFICIELLE', 8, { textAnchor: 'middle', fill: '#858572' })}
        {label(23, 125, `Taille : ${d.height}    Groupe sanguin : ${d.bloodGroup}    Domicile : ${d.address}`, 10)}
        {label(23, 144, 'Signes particuliers : NÉANT', 10)}{label(345, 144, 'DEMO-0042', 12, { letterSpacing: 1 })}
        {label(23, 163, 'Père : DONNÉES FICTIVES', 10)}{label(260, 163, 'Mère : DONNÉES FICTIVES', 10)}
        {label(23, 182, 'Personne à prévenir : CONTACT DE DÉMONSTRATION', 10)}
        <G fontFamily="monospace" fontSize="17" letterSpacing="1.6" fill="#42483A">
          <SvgText x="23" y="212">{'DEMO<TGO<CARDIA<<<<<<<<<<<<'}</SvgText>
          <SvgText x="23" y="237">{'SPECIMEN<NON<VALABLE<<<<<<<'}</SvgText>
          <SvgText x="23" y="262">{'DONNEES<FICTIVES<<<<<<<<<<<'}</SvgText>
        </G>
      </>}
      <Rect x="1" y="279" width="478" height="20" fill="#2B7050" />
      {label(240, 292, 'DÉMONSTRATION · DONNÉES FICTIVES · SANS VALEUR OFFICIELLE', 8, { fill: '#fff', fontWeight: '700', textAnchor: 'middle', letterSpacing: .6 })}
    </Svg>
  </View>;
}
const s = StyleSheet.create({ shadow: { boxShadow: '0 12px 24px rgba(43,49,30,.2)' } });
