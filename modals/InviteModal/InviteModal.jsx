import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FriendComponent from '../../components/FriendComponent/FriendComponent';
import { styles } from './InviteModalStyle';

const players = [
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
  { id: '1', name: 'Luan Domingues', image: 'https://link-para-imagem1.png' },
];

const InviteModal = React.forwardRef((props, ref) => {
  return (
    <ActionSheet ref={ref} containerStyle={styles.modalView}>
      <View>
        <Text style={styles.title}>Enviar Convite</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={players}
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
