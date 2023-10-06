import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

const color = [
  "lightseagreen",
  "firebrick",
  "lightpink",
  "maroon",
  "cornflowerblue",
  "burlywood",
  "darkslateblue",
  "lightcoral",
  "orange",
  "darksalmon",
];

const LayoutScreen = () => {
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(1)).current;
  const fadeAnim3 = useRef(new Animated.Value(1)).current;
  const fadeAnim4 = useRef(new Animated.Value(1)).current;
  const fadeAnim5 = useRef(new Animated.Value(1)).current;
  const fadeAnim6 = useRef(new Animated.Value(1)).current;
  const fadeAnim7 = useRef(new Animated.Value(1)).current;
  const fadeAnim8 = useRef(new Animated.Value(1)).current;
  const fadeAnim9 = useRef(new Animated.Value(1)).current;
  const [colorList, setColorList] = useState([]);
  const [isShowColor, setIsShowColor] = useState(true);
  const [isAnimationStart, setAnimationStart] = useState(false);

  useEffect(() => {
    setColorList([...shuffleRectangleColor(), ...shuffleRectangleColor()]);
  }, []);

  useEffect(() => {
    if (isShowColor) return;
    setColorList([...shuffleRectangleColor(), ...shuffleRectangleColor()]);
  }, [isShowColor]);

  const shuffleRectangleColor = (num) => {
    for (let i = color.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [color[i], color[j]] = [color[j], color[i]];
    }
    return color.slice(0, num ?? color.length);
  };

  const animationSequenceBox = (ref) => [
    Animated.timing(ref, {
      toValue: isShowColor ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.delay(120),
  ];

  const animationSequence = [
    ...animationSequenceBox(fadeAnim1),
    ...animationSequenceBox(fadeAnim2),
    ...animationSequenceBox(fadeAnim3),
    ...animationSequenceBox(fadeAnim4),
    ...animationSequenceBox(fadeAnim5),
    ...animationSequenceBox(fadeAnim6),
    ...animationSequenceBox(fadeAnim7),
    ...animationSequenceBox(fadeAnim8),
    ...animationSequenceBox(fadeAnim9),
  ];

  const onPressX = () => {
    setAnimationStart(true);
    Animated.sequence(
      isShowColor ? animationSequence.reverse() : animationSequence
    ).start(({ finished }) => {
      if (finished) {
        setIsShowColor(!isShowColor);
        setAnimationStart(false);
      }
    });
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.row, { flexDirection: "row" }]}>
        <Animated.View
          style={[
            styles.block,
            { flex: 2, backgroundColor: colorList[1], opacity: fadeAnim9 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[2], opacity: fadeAnim8 },
          ]}
        />
      </View>
      <View style={[styles.row, { flexDirection: "row" }]}>
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[3], opacity: fadeAnim7 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 2, backgroundColor: colorList[4], opacity: fadeAnim6 },
          ]}
        />
      </View>
      <View style={[styles.row, { flexDirection: "row" }]}>
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[5], opacity: fadeAnim5 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[6], opacity: fadeAnim4 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[7], opacity: fadeAnim3 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[8], opacity: fadeAnim2 },
          ]}
        />
      </View>

      <View style={[styles.row, { flexDirection: "row" }]}>
        <Animated.View
          style={[
            styles.block,
            {
              flex: 1,
              backgroundColor: colorList[9],
              opacity: fadeAnim1,
              height: "80%",
            },
          ]}
        />
        <TouchableOpacity onPress={onPressX} style={[styles.block]} disabled={isAnimationStart}>
          <View style={[{ flex: 1, backgroundColor: "burlywood" }]} />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.block,
            {
              flex: 1,
              marginTop: "5.5%",
              backgroundColor: colorList[10],
              opacity: fadeAnim1,
              height: "80%",
            },
          ]}
        />
      </View>

      <View style={[styles.row, { flexDirection: "row" }]}>
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[11], opacity: fadeAnim2 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[12], opacity: fadeAnim3 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[13], opacity: fadeAnim4 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[14], opacity: fadeAnim5 },
          ]}
        />
      </View>
      <View style={[styles.row, { flexDirection: "row" }]}>
        <Animated.View
          style={[
            styles.block,
            { flex: 2, backgroundColor: colorList[15], opacity: fadeAnim6 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[16], opacity: fadeAnim7 },
          ]}
        />
      </View>
      <View style={[styles.row, { flexDirection: "row" }]}>
        <Animated.View
          style={[
            styles.block,
            { flex: 1, backgroundColor: colorList[17], opacity: fadeAnim8 },
          ]}
        />
        <Animated.View
          style={[
            styles.block,
            { flex: 2, backgroundColor: colorList[18], opacity: fadeAnim9 },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    width: "100%",
  },
  block: {
    flex: 1,
  },
});

export default LayoutScreen;
