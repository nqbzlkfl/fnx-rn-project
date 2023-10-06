import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
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

const SpeedGameScreen = () => {
  const interval = useRef(null);
  const [isOpenColorModal, set_isOpenColorModal] = useState(false);
  const [isOpenStartModal, set_isOpenStartModal] = useState(false);
  const [isOpenScoreModal, set_isOpenScoreModal] = useState(false);
  const [selectedColor, set_selectedColor] = useState([]);
  const [isShowColor, set_isShowColor] = useState(false);
  const [highestScore, set_highestScore] = useState([]);
  const [timer, set_timer] = useState(0);
  const [colorShuffleTimer, set_colorShuffleTimer] = useState(20);
  const [isGameStart, set_isGameStart] = useState(false);
  const [colorList, set_colorList] = useState([]);

  const onStart = () => set_isOpenStartModal(true);

  const onPickColor = (pickColor) => {
    set_isGameStart(false);
    set_timer(0);
    set_isShowColor(false);
    if (pickColor !== selectedColor) {
      alert(`You pick wrong color, this is ${pickColor} color`);
      return;
    }
    const newScore = [...highestScore, timer].sort((a, b) => a - b);
    set_highestScore(newScore);
    clearInterval(interval.current);
    alert(`You had used ${timer} ms to click color`);
  };

  const onStartDisplayColor = () => {
    set_isGameStart(true);
    set_isShowColor(true);
    set_isOpenStartModal(false);
    set_colorList(shuffleRectangleColor());
  };

  const getRandomColors = (num) => {
    const shuffled = color
      .filter((f) => f !== selectedColor)
      .slice()
      .sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const shuffleRectangleColor = () => {
    const filteredColor = color.filter((f) => f !== selectedColor).slice(0, 3);
    filteredColor.push(selectedColor);
    for (let i = filteredColor.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredColor[i], filteredColor[j]] = [
        filteredColor[j],
        filteredColor[i],
      ];
    }
    return filteredColor;
  };

  useEffect(() => {
    if (isShowColor) return;
    set_selectedColor(getRandomColors(1)[0]);
  }, [isShowColor]);

  useEffect(() => {
    if (!isGameStart) return;
    if (!!colorShuffleTimer) return;
    set_colorList(shuffleRectangleColor(3));
  }, [isGameStart, colorShuffleTimer]);

  useEffect(() => {
    if (!isGameStart) return;
    const interval = setInterval(() => {
      set_timer((prev) => prev + 1);
    }, 1);
    return () => {
      clearInterval(interval);
    };
  }, [timer, isGameStart]);

  useEffect(() => {
    if (!timer) return;
    if (!isGameStart) return;
    if (!colorShuffleTimer) {
      set_colorShuffleTimer(20);
      return;
    }
    const timeout = setTimeout(() => {
      set_colorShuffleTimer((prev) => prev - 1);
    }, 1);
    return () => {
      clearTimeout(timeout);
    };
  }, [colorShuffleTimer, timer, isGameStart]);

  const highestScoreList = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{ backgroundColor: !!index ? "transparent" : "lightgray" }}
      >
        <Text style={{ textAlign: 'center' }}>{item}ms</Text>
      </View>
    );
  };

  const listOfColor = ({ item, index }) => {
    return (
      <View key={index} style={[styles.colorChip, { backgroundColor: item }]}>
        <Text style={{ textAlign: "center", color: "white" }}>{item}</Text>
      </View>
    );
  };

  const StartPlayingModal = () => (
    <Modal
      onPress={() => set_isOpenStartModal(false)}
      animationType="slide"
      transparent={true}
      visible={isOpenStartModal}
      onRequestClose={() => {
        set_isOpenStartModal(!isOpenStartModal);
      }}
    >
      <View style={[styles.centeredView]}>
        <View style={styles.modalView}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Start Playing
            </Text>
            <View style={styles.modalButtonContainer}>
              <Text>Tap on&nbsp;</Text>
              <Text
                style={[
                  styles.selectedHighlightColor,
                  { backgroundColor: selectedColor },
                ]}
              >
                {selectedColor}
              </Text>
              <Text>&nbsp;color</Text>
            </View>
          </View>
          <View style={styles.blockColorContainer}>
            <TouchableOpacity
              style={{ padding: 5, flex: 1 }}
              onPress={() => {
                set_isOpenColorModal(true);
                set_isOpenStartModal(false);
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Hints</Text>
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => set_isOpenStartModal(false)}
              >
                <Text style={{ fontWeight: "bold" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={onStartDisplayColor}
              >
                <Text style={{ fontWeight: "bold" }}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  const ScoreModal = () => (
    <Modal
      onPress={() => set_isOpenScoreModal(false)}
      animationType="slide"
      transparent={true}
      visible={isOpenScoreModal}
      onRequestClose={() => {
        set_isOpenScoreModal(!isOpenScoreModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Highest Score
            </Text>
            {!!highestScore?.length && (
              <FlatList
                data={highestScore}
                renderItem={highestScoreList}
                keyExtractor={(item) => item}
                style={styles.modalFlatlistContainer}
              />
            )}
            <TouchableOpacity
              onPress={() => set_isOpenScoreModal(false)}
              style={styles.modalCloseButtonContainer}
            >
              <Text style={styles.timerText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const ColorsModal = () => (
    <Modal
      onPress={() => set_isOpenColorModal(false)}
      animationType="slide"
      transparent={true}
      visible={isOpenColorModal}
      onRequestClose={() => {
        set_isOpenColorModal(!isOpenColorModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <FlatList
              data={color}
              renderItem={listOfColor}
              keyExtractor={(item) => item}
              style={styles.modalFlatlistContainer}
            />
            <TouchableOpacity
              onPress={() => {
                set_isOpenColorModal(false);
                set_isOpenStartModal(true);
              }}
              style={styles.modalCloseButtonContainer}
            >
              <Text style={styles.timerText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.boxContainer]}>
        <StartPlayingModal />
        <ScoreModal />
        <ColorsModal />
        <View style={[styles.headerContainer]}>
          <Text
            style={[styles.buttonText, { color: "white", fontWeight: "500" }]}
          >
            Timer: {timer} milliseconds
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            set_isOpenScoreModal(true);
          }}
          disabled={isShowColor}
        >
          <View
            style={[
              styles.buttonActionContainer,
              {
                backgroundColor: isShowColor ? "grey" : "#e6c8ac",
                alignItems: isOpenScoreModal ? "none" : "center",
              },
            ]}
          >
            {isOpenScoreModal ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignSelf: 'stretch'
                }}
              >
                <Text style={[styles.buttonText]}>Highest Score</Text>
                <Text style={[styles.buttonText]}>{!highestScore[0] ? 'No Record' : `${highestScore[0]}ms` }</Text>
              </View>
            ) : (
              <Text style={[styles.buttonText, { fontStyle: "italic" }]}>
                Highest Record
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={[styles.centeredView, { flexDirection: "row" }]}>
          <View
            style={{
              width: 220,
              height: "auto",
              flexWrap: "wrap",
              flexDirection: "row",
              display: "block",
            }}
          >
            {isShowColor &&
              colorList?.map((m, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    onPickColor(m);
                  }}
                  style={{ width: 110, height: 110, backgroundColor: m }}
                />
              ))}
          </View>
        </View>
        {isShowColor && timer > 200 && (
          <View
            style={[
              styles.hintContainer,
              {
                position: "absolute",
                bottom: 0,
                justifyContent: "center",
                width: screenWidth,
              },
            ]}
          >
            <Text style={{ fontSize: 16 }}>Hint:&nbsp;</Text>
            <Text
              style={[
                styles.timerText,
                { backgroundColor: selectedColor, fontSize: 16 },
              ]}
            >
              &nbsp;{selectedColor}&nbsp;
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.buttonActionContainer,
            { backgroundColor: isShowColor ? "grey" : "lightblue" },
          ]}
          disabled={isShowColor}
          onPress={onStart}
        >
          <Text style={styles.buttonText}>START GAME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    color: "white",
  },
  timerContainer: {
    backgroundColor: "#c71d82",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "black",
    fontWeight: "700",
  },
  boxContainer: {
    flex: 1,
    backgroundColor: "#fff5f6",
  },
  buttonActionContainer: {
    width: screenWidth,
    display: "flex",
    alignItems: "center",
    padding: 20,
  },
  hintContainer: {
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  modalCloseButtonContainer: {
    backgroundColor: "#c71d82",
    padding: 5,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  modalFlatlistContainer: {
    height: "auto",
    padding: 5,
    flexGrow: 0,
  },
  blockColorContainer: {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    alignContent: "space-between",
  },
  selectedHighlightColor: {
    width: "auto",
    paddingHorizontal: 10,
    height: 20,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: "#c71d82",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 10,
  },
  modalButtonContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  colorChip: {
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 2,
  },
});

export default SpeedGameScreen;
