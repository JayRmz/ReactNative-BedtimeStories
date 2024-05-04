import React, { useState } from 'react';
import { Image, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../Util/Colors';
import Row from '../Components/Row';
import Col from '../Components/Col';
import Catalog from '../Data/StoryCatalog';




const StoriesCatalogScreen = () => {
    const [showConfig, setShowConfig] = useState(false);

    const dummyCat = Catalog
    shuffle(dummyCat);

    console.log(`Dummy: ${dummyCat}`)


    function shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    return (
        <View style={styles.view}>
            <Row>
                <Col styles={{ width: '25%' }}>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Random</Text>
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
                            <Col styles={{ width: '33%' }}>
                                <Pressable>
                                    <Text>
                                        Music
                                    </Text>
                                </Pressable>
                            </Col>
                            <Col styles={{ width: '33%' }}>
                                <Pressable>
                                    <Text>
                                        Language
                                    </Text>
                                </Pressable>
                            </Col>
                            <Col styles={{ width: '33%' }}>
                                <Pressable>
                                    <Text>
                                        Sort
                                    </Text>
                                </Pressable>
                            </Col>
                        </Row>
                    </View>
                )
            }
            <ScrollView >
                {dummyCat.slice(0, 6).map((story) => (
                    <Pressable key={story.id} style={styles.bookCard}>
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

                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: '100%',
        backgroundColor: Colors.background,
        padding: 5
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

    }

});

export default StoriesCatalogScreen;
