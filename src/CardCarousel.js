import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, PanResponder, Pressable, StyleSheet, View } from 'react-native';
import { CardFace, C, T } from './components';
import { gestureAxis, releaseGesture } from './carouselGestures';

function Item({ card, index, active, flipped, position, reduced, onPress }) {
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(rotation, { toValue: index === active && flipped ? 1 : 0, duration: reduced ? 0 : 600, easing: Easing.bezier(.3, .7, .2, 1), useNativeDriver: true }).start(); }, [active, flipped, index, reduced, rotation]);
  const inputRange = [index - 2, index - 1, index, index + 1, index + 2];
  return <Animated.View pointerEvents={Math.abs(index - active) > 1 ? 'none' : 'auto'} style={[s.item, {
    zIndex: 10 - Math.abs(index - active),
    opacity: position.interpolate({ inputRange, outputRange: [0, 1, 1, 1, 0], extrapolate: 'clamp' }),
    transform: [{ perspective: 1100 },
      { translateX: position.interpolate({ inputRange: [index - 1, index, index + 1], outputRange: [236, 0, -236] }) },
      { scale: position.interpolate({ inputRange, outputRange: [.84, .84, 1, .84, .84], extrapolate: 'clamp' }) },
      { rotateY: position.interpolate({ inputRange: [index - 1, index, index + 1], outputRange: ['-22deg', '0deg', '22deg'] }) }],
  }]}>
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${card.name}, ${index === active && flipped ? 'verso' : 'ouvrir la carte'}`}>
      <View style={{ width: 256, height: 168 }}>
        <Animated.View style={[s.side, { opacity: rotation.interpolate({ inputRange: [0, .499, .5, 1], outputRange: [1, 1, 0, 0] }), transform: [{ perspective: 1100 }, { rotateX: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-180deg'] }) }] }]}><CardFace card={card} /></Animated.View>
        <Animated.View style={[s.side, { opacity: rotation.interpolate({ inputRange: [0, .499, .5, 1], outputRange: [0, 0, 1, 1] }), transform: [{ perspective: 1100 }, { rotateX: rotation.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '0deg'] }) }] }]}><CardFace card={card} back /></Animated.View>
      </View>
    </Pressable>
  </Animated.View>;
}
export default function CardCarousel({ cards, active, setActive, onOpen, onGestureActive }) {
  const [flipped, setFlipped] = useState(false), [reduced, setReduced] = useState(false);
  const position = useRef(new Animated.Value(active)).current;
  const trackRef = useRef(null), trackLeft = useRef(0);
  const trackWidth = useRef(402), axis = useRef(null), touchX = useRef(0);
  const current = useRef({});
  current.current = { active, cards, flipped, reduced, setActive, onOpen, onGestureActive };
  const settle = target => Animated.timing(position, { toValue: target, duration: current.current.reduced ? 0 : 300, easing: Easing.bezier(.2, .8, .2, 1), useNativeDriver: true }).start();
  useEffect(() => { let mounted = true; AccessibilityInfo.isReduceMotionEnabled().then(v => mounted && setReduced(v)); const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced); return () => { mounted = false; sub.remove(); }; }, []);
  useEffect(() => { setFlipped(false); Animated.timing(position, { toValue: active, duration: reduced ? 0 : 450, easing: Easing.bezier(.2, .8, .2, 1), useNativeDriver: true }).start(); }, [active, position, reduced]);
  const pan = useMemo(() => PanResponder.create({
    // Claim the card region before the outer vertical ScrollView can steal a swipe.
    onStartShouldSetPanResponderCapture: () => true,
    onStartShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onShouldBlockNativeResponder: () => true,
    onPanResponderGrant: e => {
      axis.current = null;
      touchX.current = e.nativeEvent.pageX - trackLeft.current;
      position.stopAnimation();
      current.current.onGestureActive?.(true);
    },
    onPanResponderMove: (_, g) => {
      axis.current ||= gestureAxis(g.dx, g.dy);
      if (axis.current === 'horizontal') {
        const { active, cards } = current.current;
        const edge = (active === 0 && g.dx > 0) || (active === cards.length - 1 && g.dx < 0);
        position.setValue(active - g.dx * (edge ? .25 : 1) / 236);
      }
    },
    onPanResponderRelease: (_, g) => {
      const state = current.current;
      state.onGestureActive?.(false);
      const result = releaseGesture({ axis: axis.current || gestureAxis(g.dx, g.dy), dx: g.dx, dy: g.dy, vx: g.vx, active: state.active, count: state.cards.length, flipped: state.flipped });
      setFlipped(result.flipped);
      state.setActive(result.active);
      settle(result.active);
      if (!axis.current && Math.hypot(g.dx, g.dy) < 8) {
        const offset = touchX.current - trackWidth.current / 2;
        const index = Math.max(0, Math.min(state.cards.length - 1, state.active + (offset < -128 ? -1 : offset > 128 ? 1 : 0)));
        if (index !== state.active) state.setActive(index);
        else if (state.flipped) setFlipped(false);
        else state.onOpen(state.cards[index].id);
      }
    },
    onPanResponderTerminate: () => { current.current.onGestureActive?.(false); settle(current.current.active); },
  }), [position]);
  return <>
    <View ref={trackRef} {...pan.panHandlers} onLayout={e => { trackWidth.current = e.nativeEvent.layout.width; trackRef.current?.measureInWindow(x => { trackLeft.current = x; }); }} style={s.track} accessibilityActions={[{ name: 'increment', label: 'Carte suivante' }, { name: 'decrement', label: 'Carte précédente' }, { name: 'activate', label: 'Retourner la carte' }]} onAccessibilityAction={e => { const a = e.nativeEvent.actionName; if (a === 'activate') setFlipped(f => !f); else setActive(Math.max(0, Math.min(cards.length - 1, active + (a === 'increment' ? 1 : -1)))); }}>
      {cards.map((card, index) => <Item key={card.id} {...{ card, index, active, flipped, position, reduced }} onPress={() => index !== active ? setActive(index) : flipped ? setFlipped(false) : onOpen(card.id)} />)}
    </View>
    <View style={s.dots}>{cards.map((card, i) => <Pressable key={card.id} accessibilityRole="button" accessibilityLabel={`Afficher ${card.name}`} accessibilityState={{ selected: i === active }} onPress={() => { setActive(i); setFlipped(false); }} hitSlop={8} style={{ width: i === active ? 18 : 7, height: 7, borderRadius: 4, backgroundColor: i === active ? C.blue : '#CFD7E6' }} />)}</View>
    <Pressable accessibilityRole="button" accessibilityLabel="Retourner la carte" onPress={() => setFlipped(f => !f)}><T style={s.hint}>{flipped ? 'Glissez vers le haut pour revoir le recto' : 'Glissez vers le bas pour voir le verso'}</T></Pressable>
  </>;
}
const s = StyleSheet.create({ track: { height: 190, marginTop: 22, touchAction: 'none' }, item: { position: 'absolute', top: 8, left: '50%', marginLeft: -128, width: 256, height: 168 }, side: { ...StyleSheet.absoluteFill, backfaceVisibility: 'hidden' }, dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 8 }, hint: { textAlign: 'center', fontSize: 11.5, color: '#7A86A3', marginTop: 8 } });




