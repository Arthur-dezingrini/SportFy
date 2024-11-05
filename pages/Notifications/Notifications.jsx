import { FlatList, SafeAreaView, Text, View } from "react-native";
import styles from "./NotificationsStyle";
import HeaderTop from "./../../components/HeaderTop/HeaderTop";
import FriendRequest from "./../../components/FriendRequest/FriendRequest";
import * as NotificacaoService from "./../../services/NotificationService";
import { useAuth } from "../../appContext";
import { useState, useEffect } from "react";

export default function Notifications({ navigation }) {
  const [notifications, setNotifications] = useState({ friendRequests: [], matchRequests: [] });
  const { user, token } = useAuth();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await NotificacaoService.getNotifications(user.id, token);
        if (response.status === 200) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    getNotifications();
  }, [user.id, token]);

  const updateNotifications = async () => {
    try {
      const response = await NotificacaoService.getNotifications(user.id, token);
      if (response.status === 200) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Erro ao atualizar notificações:", error);
    }
  };

  const alterStatusRequest = async (request, status, isMatchRequest = false) => {
    delete request.senderName;
    request.status = status;

    try {
      const response = isMatchRequest 
        ? await NotificacaoService.alterStatusRequestMatch(request, token)
        : await NotificacaoService.alterStatusRequestFriend(request, token);

      if (response.status === 200) {
        await updateNotifications(); 
      }
    } catch (error) {
      console.error("Erro ao alterar status da requisição:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop back={true} navigation={navigation}>
        NOTIFICAÇÕES
      </HeaderTop>
      <View style={styles.NotificationsContainer}>
        <View style={styles.FriendContainer}>
          <Text style={styles.text}>Pedidos de amizade</Text>
          {notifications.friendRequests.length > 0 ? (
            <FlatList
              data={notifications.friendRequests}
              renderItem={({ item }) => (
                <FriendRequest
                  type={"Friend"}
                  request={item}
                  onPressAccept={() => alterStatusRequest(item, "ACCEPTED")}
                  onPressReject={() => alterStatusRequest(item, "REJECTED")}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <Text style={{color: '#FFF'}}>Nenhum Pedido de Amizade Pendente</Text>
          )}
        </View>
        <View style={styles.MatchContainer}>
          <Text style={styles.text}>Convites para partidas</Text>
          {notifications.matchRequests.length > 0 ? (
            <FlatList
              data={notifications.matchRequests}
              renderItem={({ item }) => (
                <FriendRequest
                  request={item}
                  onPressAccept={() => alterStatusRequest(item, "ACCEPTED", true)}
                  onPressReject={() => alterStatusRequest(item, "REJECTED", true)}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <Text style={{color: '#FFF'}}>Nenhum Convite Pendente</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
