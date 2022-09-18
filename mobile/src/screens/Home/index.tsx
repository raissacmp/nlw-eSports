import { Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navegation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navegation.navigate("game", { id, title, bannerUrl });
  }

  useEffect(() => {
    fetch("http://192.168.1.12:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item} //import data util
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
