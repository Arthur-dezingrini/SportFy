import { FlatList, SafeAreaView, Text, View } from "react-native";
import styles from "./NotificationsStyle";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import FriendRequest from "./../../components/FriendRequest/FriendRequest";

export default function Notifications({ navigation }) {
  const notifications = [
    {
      id: 1,
      user: {
        avatar: "https://example.com/avatar1.jpg",
        name: "João Silva",
      },
      game: {
        name: "Futebol",
      },
    },
    {
      id: 2,
      user: {
        avatar: "https://example.com/avatar2.jpg",
        name: "Maria Rodrigues",
      },
      game: {
        name: "Basquete",
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop back={true} navigation={navigation}>
        NOTIFICAÇÕES
      </HeaderTop>
      <View style={styles.NotificationsContainer}>
        <View style={styles.FriendContainer}>
          <Text style={styles.text}>Pedidos de amizade</Text>
          <FlatList
            data={notifications}
            renderItem={({ item }) => <FriendRequest request={item}/>}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.MatchContainer}>
          <Text style={styles.text}>Convites para partidas</Text>
          <FlatList
            data={notifications}
            renderItem={({ item }) => <FriendRequest request={item} type={'Friend'}/>}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
