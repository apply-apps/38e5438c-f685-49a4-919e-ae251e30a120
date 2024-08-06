// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Button, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

// StoryInput Component
const StoryInput = ({ fetchStory }) => {
    const [heroes, setHeroes] = useState('');
    const [villains, setVillains] = useState('');
    const [plot, setPlot] = useState('');
    
    const handleFetchStory = () => {
        fetchStory(heroes, villains, plot);
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Heroes"
                value={heroes}
                onChangeText={setHeroes}
            />
            <TextInput
                style={styles.input}
                placeholder="Villains"
                value={villains}
                onChangeText={setVillains}
            />
            <TextInput
                style={styles.input}
                placeholder="Plot"
                value={plot}
                onChangeText={setPlot}
            />
            <Button title="Create Story" onPress={handleFetchStory} />
        </View>
    );
};

// StoryDisplay Component
const StoryDisplay = ({ story }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < story.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText(displayedText + story[index]);
                setIndex(index + 1);
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [displayedText, index, story]);

    const resetStoryDisplay = () => {
        setDisplayedText('');
        setIndex(0);
    };

    return (
        <ScrollView style={styles.storyContainer}>
            <Text style={styles.text}>{displayedText}</Text>
            <Button title="Reset" onPress={resetStoryDisplay} />
        </ScrollView>
    );
};

// App Component
const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStory = async (heroes, villains, plot) => {
        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please create a fairy tale." },
                    { role: "user", content: `Please create a fairy tale with these heroes: ${heroes}, these villains: ${villains}, and this plot: ${plot}` }
                ],
                model: "gpt-4o"
            });

            const { data } = response;
            setStory(data.response);
        } catch (error) {
            console.error('Error fetching story:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <StoryInput fetchStory={fetchStory} />
            </View>
            <View style={styles.storyContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                    <StoryDisplay story={story} />
                )}
            </View>
        </SafeAreaView>
    );
}

// Shared Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 20,
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    storyContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    text: {
        fontSize: 24,
        lineHeight: 32,
    },
});