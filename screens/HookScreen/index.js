import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("screen").width;

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

const HookScreen = () => {
  const [colorBlocks, setColorBlocks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasAction, setHasAction] = useState(false);
  const [timer, setTimer] = useState(0);

  const onPush = () => {
    const randomColor = color[Math.floor(Math.random() * color.length)];
    setColorBlocks([...colorBlocks, randomColor]);
    setTotalCount(totalCount + 1);
    setHasAction(true);
  };

  const onRemove = () => {
    if (colorBlocks.length > 0) {
      setColorBlocks(colorBlocks.slice(0, -1));
      setHasAction(true);
    }
  };

  const onPressColor = (viewColor) => {
    Alert.alert("Color", `This is ${viewColor} color`, [
      {
        text: "OK",
        onPress: () => {
          console.log(`This is ${viewColor} color`);
        },
      },
    ]);
  };

  useEffect(() => {
    if (!hasAction) {
      const timeout = setTimeout(() => {
        setColorBlocks([]);
      }, 15000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setTimer(15);
      setHasAction(false);
    }
  }, [hasAction]);

  useEffect(() => {
    if (hasAction) return;
    if (timer === 0) return () => { clearInterval(interval) };
    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer, hasAction]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
        {colorBlocks.map((color, index) => (
          <TouchableOpacity key={index} onPress={() => onPressColor(color)}>
            <View
              style={[styles.block, { backgroundColor: color }]}
            >
              <Text style={styles.blockText}>{color}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
        <View style={{ backgroundColor: 'white' }}>
          {(!!timer && !!colorBlocks.length) && (<Text style={{ textAlign: 'center' }}>Timer: {timer}s</Text>)}
          <View style={styles.infoContainer}>
            <Text style={styles.counterText}>
              Current: {colorBlocks.length} items
            </Text>
            <Text style={styles.counterText}>Largest: {totalCount} items</Text>
          </View>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onRemove}
          style={[styles.buttonAction, { backgroundColor: "#fb7774" }]}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPush}
          style={[styles.buttonAction, { backgroundColor: "#86EE84" }]}
        >
          <Text style={styles.buttonText}>Push</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    backgroundColor: "#f3f2f2",
  },
  block: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    color: 'white',
    fontWeight: 'bold'
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  counterText: {
    color: "black",
    fontSize: 19,
    fontStyle: "italic",
    fontWeight: "800",
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonAction: {
    width: screenWidth / 2,
    display: "flex",
    alignItems: "center",
    paddingVertical: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "600",
  },
});

export default HookScreen;
