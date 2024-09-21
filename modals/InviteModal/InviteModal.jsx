import React, { forwardRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FriendComponent from '../../components/FriendComponent/FriendComponent';
import { styles } from './InviteModalStyle';

const players = [
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '2', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '3', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '4', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '5', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '6', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '7', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '8', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '9', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '10', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
];

const InviteModal = forwardRef(({ friends }, ref) => {
  return (
    <ActionSheet ref={ref} containerStyle={styles.modalView}>
      <View>
        <Text style={styles.title}>Enviar Convite</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={friends || players}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <FriendComponent friend={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </ActionSheet>
  );
});

export default InviteModal;
