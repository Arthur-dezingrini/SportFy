import React, { forwardRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FriendComponent from '../../components/FriendComponent/FriendComponent';
import { styles } from './InviteModalStyle';

const InviteModal = forwardRef(({ friends }, ref) => {
  return (
    <ActionSheet ref={ref} containerStyle={styles.modalView}>
      <View>
        <Text style={styles.title}>Enviar Convite</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={friends}
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
