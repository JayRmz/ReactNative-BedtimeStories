import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import Row from './Row';
import Col from './Col';
import Colors from '../Util/Colors';

const StoryCard = ({story, key, onPress}) => {
  return (
    <Pressable key={story.id} style={styles.bookCard} onPress={onPress}>
      <Row>
        <Image
          style={styles.tinyImage}
          source={{
            uri: story.image,
          }}
        />
        <Col
          styles={{
            width: '75%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.bookCardTitle}>{story.title}</Text>
          <Text style={styles.bookCardReadingTime}>
            Reading time: {story.readingTime} min
          </Text>
        </Col>
      </Row>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bookCard: {
    flexDirection: 'row',
    margin: 5,
    borderRadius: 15,
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.titlePrimary,
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
  },
  bookCardTitle: {
    fontWeight: '900',
    color: Colors.titlePrimary,
    textAlign: 'center',
  },
  bookCardReadingTime: {
    padding: 10,
    margin: 15,
    color: Colors.titleSecondary,
    backgroundColor: Colors.background,
    borderRadius: 20,
  },
  tinyImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
});
export default StoryCard;
