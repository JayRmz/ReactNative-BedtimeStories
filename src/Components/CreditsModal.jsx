import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Row from './Row';
import Col from './Col';
import Colors from '../Util/Colors';
import Catalog from '../Data/StoryCatalog';
import Detail from '../Data/StoryDetail';

const CreditsModal = ({visible, onClose}) => {
  const url = 'https://lemonsandletters.com/';

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="formSheet"
      onDismiss={onClose}>
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>Credits</Text>
        <Text style={styles.paragraph}>
          Developed by: {'\n'}
          Juan Ramírez
        </Text>
        <Text style={styles.paragraph}>
          All Bedtime Stories from:{'\n'}
          Lemons and Letters
        </Text>
        <Pressable onPress={handlePress}>
          <Text style={styles.paragraph}>https://lemonsandletters.com/</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: '100%',
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalTitle: {
    color: Colors.titlePrimary,
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  buttonText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.cardBackground,
    padding: 8,
    color: Colors.text,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.titleSecondary,
    alignItems: 'center',
  },
  modalReadingTime: {
    fontSize: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.titlePrimary,
    padding: 5,
    margin: 5,
    color: Colors.titleSecondary,
  },
  normalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  storyView: {
    backgroundColor: Colors.cardBackground,
    width: '100%',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.titleSecondary,
  },
  paragraph: {
    color: Colors.titlePrimary,
    textAlign: 'center',
    paddingVertical: 5,
    fontWeight: '900',
    fontFamily: 'helvetica',
    fontSize: 16,
  },
});

export default CreditsModal;
