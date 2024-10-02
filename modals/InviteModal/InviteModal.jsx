import React, { forwardRef, useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FriendComponent from '../../components/FriendComponent/FriendComponent';
import { styles } from './InviteModalStyle';

const InviteModal = forwardRef(({ friends, enviaAmigos, friendsAdicionados }, ref) => {
  const [childrenData, setChildrenData] = useState([]);

  useEffect(() => {
    setChildrenData(friendsAdicionados); 
  }, [friendsAdicionados]);

  const handleDataFromChild = (friend) => {
    const isAlreadyAdded = childrenData.some(item => item.id === friend.id);

    if (isAlreadyAdded) {
      setChildrenData(prevData => prevData.filter(item => item.id !== friend.id));
    } else {
      setChildrenData(prevData => [...prevData, friend]);
    }
  };

  const enviaAmigosParaPartida = () => {
    enviaAmigos(childrenData);
  };

  return (
    <ActionSheet ref={ref} containerStyle={styles.modalView} onClose={enviaAmigosParaPartida}>
      <View>
        <Text style={styles.title}>Enviar Convite</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={friends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FriendComponent 
                friend={item} 
                friendAdd={handleDataFromChild} 
                friendsAdicionados={childrenData}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </ActionSheet>
  );
});

export default InviteModal;
