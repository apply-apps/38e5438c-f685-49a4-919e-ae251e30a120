// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, ActivityIndicator, View } from 'react-native';
import axios from 'axios';

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [loading, setLoading] = useState(false);
    const [story, setStory] = useState('');

    const fetchStory = async () => {
        setLoading(true);
        const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
            messages: [
                { role: 'system', content: 'You are a helpful assistant. Please provide answers for given requests.' },
                { role: 'user', content: `Create a fairy tale with the hero: ${hero}, the villain: ${villain}, and the plot: ${plot}.` }
            ],
            model: 'gpt-4o'
        });
        setStory(response.data.response);
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hero</Text>
                    <TextInput
                        style={styles.input}
                        value={hero}
                        onChangeText={setHero}
                        placeholder="Enter the hero"
                    />
                    <Text style={styles.label}>Villain</Text>
                    <TextInput
                        style={styles.input}
                        value={villain}
                        onChangeText={setVillain}
                        placeholder="Enter the villain"
                    />
                    <Text style={styles.label}>Plot</Text>
                    <TextInput
                        style={styles.input}
                        value={plot}
                        onChangeText={setPlot}
                        placeholder="Enter the plot"
                    />
                </View>
                <Button title="Generate Story" onPress={fetchStory} />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
                ) : (
                    <Text style={styles.story}>{story}</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 16,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 12,
    },
    loading: {
        marginTop: 20,
    },
    story: {
        marginTop: 20,
        fontSize: 16,
        lineHeight: 24,
    }
});