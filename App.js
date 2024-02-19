import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import Card from "./Card";

const initialCards = ["🐷", "⚛️", "🔑", "🥕", "🥑", "🎮"];

export default function App() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards((prevMatched) => [...prevMatched, ...selectedCards]);
        setScore((prevScore) => prevScore + 1);
      }
      const timeout = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectedCards]);

  useEffect(() => {
    resetGame();
  }, [level]);

  const resetGame = () => {
    const newCards = initialCards.slice(0, 1 + level * 1);
    const shuffledCards = shuffle([...newCards, ...newCards]);
    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedCards([]);
    setScore(0);
  };

  const handleTapCard = (index) => {
    if (selectedCards.length === 2 || selectedCards.includes(index)) return;
    setSelectedCards((prevSelected) => [...prevSelected, index]);
  };

  const didPlayerWin = () => matchedCards.length === cards.length;

  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {didPlayerWin() ? "Congratulations 🎉" : "Memory"}
      </Text>
      <Text style={styles.title}>Level: {level}</Text>
      <Text style={styles.title}>Score: {score}</Text>
      <View style={styles.board}>
        {cards.map((card, index) => (
          <Card
            key={index}
            isTurnedOver={
              selectedCards.includes(index) || matchedCards.includes(index)
            }
            onPress={() => handleTapCard(index)}
          >
            {card}
          </Card>
        ))}
      </View>
      {didPlayerWin() && (
        <Pressable style={styles.nextLevelButton} onPress={handleNextLevel}>
          <Text style={styles.nextLevelText}>Next Level</Text>
        </Pressable>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "start",
  },
  board: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "snow",
    marginVertical: 15,
  },
  nextLevelButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  nextLevelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}



