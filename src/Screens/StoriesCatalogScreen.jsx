import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../Util/Colors';
import Row from '../Components/Row';
import Col from '../Components/Col';
import Catalog from '../Data/StoryCatalog';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowDown19, faArrowDown91, faArrowDownAZ, faArrowDownZA, faArrowUpAZ, faFilter, faLanguage, faMusic, faSort, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import Util from '../Util/Functions';
import Detail from '../Data/StoryDetail';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';



const StoriesCatalogScreen = () => {
    const [showConfig, setShowConfig] = useState(false);
    const [playMusic, setPlayMusic] = useState(true);

    const [sortedBy, setSortedBy] = useState('def');
    const [sortedCat, setSortedCat] = useState([]);
    const [dummyCat, setDummyCat] = useState([]);

    const [selectedStory, setSelectedStory] = useState(null);
    const [showStoryModal, setShowStoryModal] = useState(false);

    useEffect(() => {
        Util.shuffle(Catalog);
        setDummyCat(Catalog);
    }, []);

    useEffect(() => {
        if (sortedBy == 'def') {
            console.log('DEF sort')
            setSortedCat(dummyCat)
        } else if (sortedBy == 'az') {
            console.log('AZ sort')
            let tempArr = dummyCat;
            console.log('TEMP: ', tempArr)
            tempArr.sort(sort_by('title', false, (a) => a.toLowerCase()))
            console.log('Sorted:', tempArr)
            setSortedCat(tempArr)
        } else if (sortedBy == 'za') {
            console.log('ZA sort')
            let tempArr = dummyCat;
            tempArr.sort(sort_by('title', true, (a) => a.toLowerCase()))
            setSortedCat(tempArr)
        } else if (sortedBy == '19') {
            console.log('19 sort')
            let tempArr = dummyCat;
            tempArr.sort(sort_by('readingTime', false, parseInt))
            setSortedCat(tempArr)
        } else if (sortedBy == '91') {
            console.log('91 sort')
            let tempArr = dummyCat;
            tempArr.sort(sort_by('readingTime', true, parseInt))
            setSortedCat(tempArr)
        } else {
            return
        }

    }, [dummyCat, sortedBy]);

    const sort_by = (field, reverse, primer) => {

        const key = primer ?
            function (x) {
                return primer(x[field])
            } :
            function (x) {
                return x[field]
            };

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }

    const surpriseStory = () => {
        const id = Math.floor(Math.random() * Catalog.length - 1)
        setShowStoryModal(true);
        setSelectedStory(id)
    }

    const readStory = (story) => {
        console.log('Story to read: ', story);
        setShowStoryModal(true);
        setSelectedStory(story.id)
    }

    const dismissStory = () => {
        setShowStoryModal(false);
        setSelectedStory(null)
    }

    return (
        <View style={styles.view}>
            <StoryModal visible={showStoryModal} storyId={selectedStory} onClose={dismissStory} />
            <Row>
                <Col styles={{ width: '25%' }}>
                    <Pressable style={styles.button} onPress={surpriseStory}>
                        <Text style={styles.buttonText}>Surprise</Text>
                    </Pressable>
                </Col>
                <Col styles={{ width: '50%' }}>
                    <Text style={styles.text}>Bedtime</Text>
                    <Text style={styles.subtitle}>
                        Stories
                    </Text>
                </Col>
                <Col styles={{ width: '25%' }}>
                    <Pressable style={styles.button} onPress={() => setShowConfig(!showConfig)}>
                        <Text style={styles.buttonText}>
                            Config
                        </Text>
                    </Pressable>
                </Col>
            </Row>
            {
                showConfig && (
                    <View style={styles.configBar}>
                        <Row>
                            <Col styles={{ width: '33%', alignItems: 'center' }}>
                                <Pressable onPress={() => setPlayMusic(!playMusic)}>
                                    <FontAwesomeIcon icon={playMusic ? faVolumeHigh : faVolumeMute} color={Colors.titleSecondary} size={20} />
                                </Pressable>
                            </Col>
                            <Col styles={{ width: '33%', alignItems: 'center' }}>
                                <Pressable onPress={() => setPlayMusic(!playMusic)}>
                                    <FontAwesomeIcon icon={faLanguage} color={Colors.titleSecondary} size={20} />
                                </Pressable>
                            </Col>
                            <Col styles={{ width: '33%', alignItems: 'center' }}>
                                {sortedBy == 'def' && (<Pressable onPress={() => setSortedBy('az')}>
                                    <FontAwesomeIcon icon={faSort} color={Colors.titleSecondary} size={20} />
                                </Pressable>)}

                                {sortedBy == 'az' && (<Pressable onPress={() => setSortedBy('za')}>
                                    <FontAwesomeIcon icon={faArrowDownAZ} color={Colors.titleSecondary} size={20} />
                                </Pressable>)}

                                {sortedBy == 'za' && (<Pressable onPress={() => setSortedBy('19')}>
                                    <FontAwesomeIcon icon={faArrowDownZA} color={Colors.titleSecondary} size={20} />
                                </Pressable>)}

                                {sortedBy == '19' && (<Pressable onPress={() => setSortedBy('91')}>
                                    <FontAwesomeIcon icon={faArrowDown19} color={Colors.titleSecondary} size={20} />
                                </Pressable>)}

                                {sortedBy == '91' && (<Pressable onPress={() => setSortedBy('def')}>
                                    <FontAwesomeIcon icon={faArrowDown91} color={Colors.titleSecondary} size={20} />
                                </Pressable>)}

                            </Col>
                        </Row>
                    </View>
                )
            }
            <ScrollView >
                {sortedCat.length > 0 ? (sortedCat.slice(0, 6).map((story) => (
                    <Pressable key={story.id} style={styles.bookCard} onPress={readStory.bind(null, story)}>
                        <Row>
                            <Image
                                style={styles.tinyImage}
                                source={{
                                    uri: story.image,
                                }}
                            />
                            <Col styles={{ width: '75%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.bookCardTitle}>
                                    {story.title}
                                </Text>
                                <Text style={styles.bookCardReadingTime}>
                                    Reading time: {story.readingTime} min
                                </Text>
                            </Col>

                        </Row>
                    </Pressable>

                ))) : null}
            </ScrollView>
        </View>
    );
};

const StoryModal = ({ storyId, visible, onClose }) => {

    const [story, setStory] = useState(null)
    const [storyDetail, setStoryDetail] = useState(null);

    useEffect(() => {
        for (i in Catalog) {

            if (storyId == Catalog[i].id) {
                console.log(`Cat: ${Catalog[i].id}`)
                setStory(Catalog[i]);
            }
        }

        for (i in Detail) {

            if (storyId == Detail[i].id) {
                console.log(`Det: ${Detail[i].id}`)
                setStoryDetail(Detail[i]);
            }
        }
    }, [storyId])

    return (

        <Modal animationType='slide' visible={visible} presentationStyle='pageSheet' onDismiss={() => { }} style={styles.modal}>
            <View style={styles.modal}>
                <Row>
                    <Col styles={{ width: '65%' }}>
                        <Text style={styles.modalTitle}>
                            {story.title}
                        </Text>
                    </Col>
                    <Col styles={{ width: '25%' }}>
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
                    {storyDetail.story.map((paragraph) => (
                        <Text style={styles.paragraph}>{paragraph}</Text>
                    ))}
                </ScrollView>


            </View>
        </Modal>

    )
};

const styles = StyleSheet.create({
    view: {
        height: '100%',
        backgroundColor: Colors.background,
        padding: 5
    },
    modal: {
        height: '100%',
        backgroundColor: Colors.background,
        padding: 20,
        alignItems: 'center'
    },
    modalTitle: {
        color: Colors.titlePrimary,
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        fontFamily: 'Helvetica'
    },
    text: {
        color: Colors.titlePrimary,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subtitle: {
        color: Colors.titleSecondary,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingHorizontal: 15,
        alignItems: 'center'
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
    tinyImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'stretch'
    },
    normalImage: {
        width: 250,
        height: 250,
        borderRadius: 10,
        resizeMode: 'stretch'
    },
    bookCard: {
        flexDirection: 'row',
        margin: 5,
        borderRadius: 15,
        backgroundColor: Colors.cardBackground,
        borderColor: Colors.titlePrimary,
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center'
    },
    bookCardTitle: {
        fontWeight: '900',
        color: Colors.titlePrimary,
        textAlign: 'center'
    },
    bookCardReadingTime: {
        padding: 10,
        margin: 15,
        color: Colors.titleSecondary,
        backgroundColor: Colors.background,
        borderRadius: 20
    },
    configBar: {

    },
    storyView: {
        backgroundColor: Colors.cardBackground,
        width: '100%',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.titleSecondary
    },
    paragraph: {
        color: Colors.titlePrimary,
        textAlign: 'justify',
        paddingVertical: 5,
        fontWeight: '900',
        fontFamily: 'helvetica',
        fontSize: 16
    },
    modalReadingTime: {

        color: Colors.titleSecondary,
    },


});

export default StoriesCatalogScreen;
