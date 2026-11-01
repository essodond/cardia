import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path, Rect, Circle, Text as Text } from 'react-native-svg';
import TogoIdentityCard from './TogoIdentityCard';

export default function NationalDocument({ card, back = false, width = 256, height = width * .625, showNumber = false, shadow = true }) {
  if (card.layout === 'togo-cni') return <TogoIdentityCard {...{ card, back, width, height, showNumber, shadow }} />;
  const eid = card.layout === 'togo-eid', student = card.layout === 'togo-student';
  const accent = student ? '#1D467D' : '#08674F', d = card.national;
  const t = (x, y, value, size = 12, rest = {}) => <Text x={x} y={y} fontSize={size} fontFamily="sans-serif" fill="#172A2C" {...rest}>{value}</Text>;
  const portrait = <G><Rect x="24" y="72" width="126" height="151" fill="#E1E5EE" /><Circle cx="87" cy="127" r="33" fill="#AA927D" /><Path d="M28 223v-32c0-43 118-43 118 0v32" fill="#536878" /><Path d="M54 120c-3-46 66-46 66 0l-13-21-27-5z" fill="#303F43" />{t(87, 214, 'PORTRAIT FICTIF', 7, { fill: '#fff', textAnchor: 'middle' })}</G>;
  return <View accessible accessibilityLabel={`${card.name}, ${back ? 'fiche complémentaire' : 'recto'}, démonstration`} style={{ width, height, borderRadius: width * .035, overflow: 'hidden', backgroundColor: '#fff', boxShadow: shadow ? '0 12px 24px rgba(20,40,50,.18)' : undefined }}>
    <Svg width="100%" height="100%" viewBox="0 0 480 300">
      <Rect width="480" height="300" rx="16" fill={student ? '#F5F8FD' : '#FFF'} />
      {back ? <>
        <Rect width="480" height="53" fill={accent} />{t(24, 34, 'FICHE CARDIA · TOGO', 18, { fill: '#fff', fontWeight: '700' })}
        {t(24, 86, card.name, 19, { fontWeight: '700' })}
        {t(24, 119, 'Verso officiel non documenté', 15, { fill: '#8A581C', fontWeight: '700' })}
        {t(24, 150, 'Cette face est un complément de démonstration.', 12)}
        {t(24, 174, 'Elle ne reproduit pas le verso du document physique.', 12)}
        {t(24, 213, `${d.lastName} ${d.firstNames}`, 14, { fontWeight: '700' })}
        {t(24, 242, showNumber ? card.num : card.short, 14)}
      </> : eid ? <>
        <Rect x="0" y="0" width="172" height="64" fill="#D10B32" /><Rect x="0" y="64" width="172" height="178" fill="#FFF3A9" /><Rect x="0" y="242" width="172" height="37" fill="#006D51" />
        <Path d="M25 15l6 18h19l-15 11 6 18-16-11-16 11 6-18L0 33h19z" fill="#fff" />
        {t(198, 29, 'RÉPUBLIQUE TOGOLAISE', 17, { fontWeight: '700' })}{t(282, 52, 'e-ID', 20, { fontWeight: '700' })}
        <Rect x="16" y="63" width="142" height="204" rx="6" fill="#fff" />{portrait}
        {t(87, 247, showNumber ? card.num : card.short, 12, { fontWeight: '700', textAnchor: 'middle' })}
        {t(204, 86, 'Nom / Surname', 12)}{t(204, 107, d.lastName, 15)}
        {t(204, 139, 'Prénoms / Given Names', 12)}{t(204, 160, d.firstNames, 12)}
        {t(204, 191, 'Date de naissance / Date of birth', 11)}{t(204, 211, d.birthDate, 14)}
        {t(204, 240, 'Sexe / Sex', 12)}{t(204, 260, d.sex, 14)}{t(312, 262, 'ANID TOGO', 14, { fontWeight: '700' })}
        <Rect x="413" y="222" width="48" height="30" rx="3" stroke="#52685D" strokeDasharray="3 3" fill="#F5F8F5" />{t(437, 242, 'DÉMO', 8, { textAnchor: 'middle' })}
      </> : <>
        <Rect width="480" height="54" fill={accent} />{t(24, 24, student ? 'CARTE ÉTUDIANTE · TOGO' : 'CARTE D’ÉLECTEUR · TOGO', 18, { fill: '#fff', fontWeight: '700' })}{t(24, 43, 'PROPOSITION CARDIA · VISUEL OFFICIEL À CONFIRMER', 9, { fill: '#fff' })}
        {portrait}{t(177, 89, d.lastName, 18, { fontWeight: '700' })}{t(177, 112, d.firstNames, 12)}{t(177, 140, showNumber ? card.num : card.short, 13)}
        {(card.fields || []).map(([key, value], i) => <G key={key}>{t(177, 169 + i * 30, key.toUpperCase(), 8, { fill: '#637B83' })}{t(177, 183 + i * 30, value, 11)}</G>)}
        {t(24, 259, 'MODÈLE PROVISOIRE · DONNÉES FICTIVES', 10, { fill: accent, fontWeight: '700' })}
      </>}
      <Rect y="279" width="480" height="21" fill={accent} />{t(240, 293, 'DÉMONSTRATION · SANS VALEUR OFFICIELLE', 9, { fill: '#fff', textAnchor: 'middle', letterSpacing: 1 })}
    </Svg>
  </View>;
}
