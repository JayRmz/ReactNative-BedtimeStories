import React, {useEffect, useState} from 'react';
import {
  Image,
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

const StoryModal = ({storyId, visible, onClose}) => {
  const [story, setStory] = useState({
    id: 0,
    title: '',
    image:
      'https://lemonsandletters.com/wp-content/uploads/2022/12/abigail-and-the-long-wool-200x300.jpg',
    readingTime: 0,
  });
  const [storyDetail, setStoryDetail] = useState({
    id: 0,
    story: [],
  });

  useEffect(() => {
    for (i in Catalog) {
      if (storyId == Catalog[i].id) {
        setStory(Catalog[i]);
      }
    }

    for (i in Detail) {
      if (storyId == Detail[i].id) {
        setStoryDetail(Detail[i]);
      }
    }
  }, [storyId]);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="overFullScreen"
      onDismiss={onClose}>
      <View style={styles.modal}>
        <Row>
          <Col styles={{width: '65%'}}>
            <Text style={styles.modalTitle}>{story.title}</Text>
          </Col>
          <Col styles={{width: '25%'}}>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </Col>
        </Row>
        <Text style={styles.modalReadingTime}>
          Reading Time: {story.readingTime} min
        </Text>
        <Image
          style={styles.normalImage}
          source={{
            uri: story.image,
          }}
        />
        <ScrollView style={styles.storyView}>
          {storyDetail.story.map((paragraph, index) => (
            <Text style={styles.paragraph} key={index}>
              {paragraph}
            </Text>
          ))}
        </ScrollView>
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
    textAlign: 'justify',
    paddingVertical: 5,
    fontWeight: '900',
    fontFamily: 'helvetica',
    fontSize: 16,
  },
});

export default StoryModal;
