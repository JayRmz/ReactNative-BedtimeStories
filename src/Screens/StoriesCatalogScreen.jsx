import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../Util/Colors';
import Row from '../Components/Row';
import Col from '../Components/Col';
import Catalog from '../Data/StoryCatalog';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowDown19,
  faArrowDown91,
  faArrowDownAZ,
  faArrowDownZA,
  faArrowUpAZ,
  faFile,
  faFileLines,
  faFilter,
  faLanguage,
  faMusic,
  faSort,
  faVolumeHigh,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import Util from '../Util/Functions';
import StoryModal from '../Components/StoryModal';
import CreditsModal from '../Components/CreditsModal';
import IconButton from '../Components/IconButton';
import StoryCard from '../Components/StoryCard';

const StoriesCatalogScreen = () => {
  const [showConfig, setShowConfig] = useState(false);

  const [sortedBy, setSortedBy] = useState('def');
  const [sortedCat, setSortedCat] = useState([]);
  const [dummyCat, setDummyCat] = useState([]);

  const [selectedStory, setSelectedStory] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);

  const [showCreditsModal, setShowCreditsModal] = useState(false);

  useEffect(() => {
    Util.shuffle(Catalog);
    setDummyCat(Catalog);
  }, []);

  useEffect(() => {
    if (sortedBy == 'def') {
      setSortedCat(dummyCat);
    } else if (sortedBy == 'az') {
      let tempArr = dummyCat;
      tempArr.sort(sort_by('title', false, a => a.toLowerCase()));
      setSortedCat(tempArr);
    } else if (sortedBy == 'za') {
      let tempArr = dummyCat;
      tempArr.sort(sort_by('title', true, a => a.toLowerCase()));
      setSortedCat(tempArr);
    } else if (sortedBy == '19') {
      let tempArr = dummyCat;
      tempArr.sort(sort_by('readingTime', false, parseInt));
      setSortedCat(tempArr);
    } else if (sortedBy == '91') {
      let tempArr = dummyCat;
      tempArr.sort(sort_by('readingTime', true, parseInt));
      setSortedCat(tempArr);
    } else {
      return;
    }
  }, [dummyCat, sortedBy]);

  const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  const surpriseStory = () => {
    const id = Math.floor(Math.random() * Catalog.length - 1);
    setShowStoryModal(true);
    setSelectedStory(id);
  };

  const readStory = story => {
    setShowStoryModal(true);
    setSelectedStory(story.id);
  };

  const dismissStory = () => {
    setShowStoryModal(false);
    setSelectedStory(0);
  };

  return (
    <View style={styles.view}>
      {showStoryModal && (
        <StoryModal
          visible={showStoryModal}
          storyId={selectedStory}
          onClose={dismissStory}
        />
      )}
      {showCreditsModal && (
        <CreditsModal
          visible={showCreditsModal}
          onClose={() => setShowCreditsModal(false)}
        />
      )}
      <Row>
        <Col styles={{width: '25%'}}>
          <Pressable style={styles.button} onPress={surpriseStory}>
            <Text style={styles.buttonText}>Surprise </Text>
          </Pressable>
        </Col>
        <Col styles={{width: '50%'}}>
          <Text style={styles.text}>Bedtime</Text>
          <Text style={styles.subtitle}>Stories</Text>
        </Col>
        <Col styles={{width: '25%'}}>
          <Pressable
            style={styles.button}
            onPress={() => setShowConfig(!showConfig)}>
            <Text style={styles.buttonText}>Config</Text>
          </Pressable>
        </Col>
      </Row>
      {showConfig && (
        <View style={styles.configBar}>
          <Row>
            <Col styles={{width: '50%', alignItems: 'center'}}>
              <Pressable onPress={() => setShowCreditsModal(true)}>
                <FontAwesomeIcon
                  icon={faFileLines}
                  color={Colors.titleSecondary}
                  size={20}
                />
              </Pressable>
            </Col>
            <Col styles={{width: '50%', alignItems: 'center'}}>
              {sortedBy == 'def' && (
                <IconButton icon={faSort} onPress={() => setSortedBy('az')} />
              )}

              {sortedBy == 'az' && (
                <IconButton
                  onPress={() => setSortedBy('za')}
                  icon={faArrowDownAZ}
                />
              )}

              {sortedBy == 'za' && (
                <IconButton
                  onPress={() => setSortedBy('19')}
                  icon={faArrowDownZA}
                />
              )}

              {sortedBy == '19' && (
                <IconButton
                  onPress={() => setSortedBy('91')}
                  icon={faArrowDown19}
                />
              )}

              {sortedBy == '91' && (
                <IconButton
                  onPress={() => setSortedBy('def')}
                  icon={faArrowDown91}
                />
              )}
            </Col>
          </Row>
        </View>
      )}

      <ScrollView>
        {sortedCat.length > 0
          ? sortedCat
              .slice(0, 6)
              .map(story => (
                <StoryCard
                  story={story}
                  key={story.id}
                  onPress={readStory.bind(null, story)}
                />
              ))
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    backgroundColor: Colors.background,
    padding: 5,
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
  buttonText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  text: {
    color: Colors.titlePrimary,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.titleSecondary,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  configBar: {
    borderWidth: 1,
    borderTopWidth: 2,
    marginBottom: 5,
  },
});

export default StoriesCatalogScreen;
