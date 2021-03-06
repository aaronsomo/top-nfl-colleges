import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

const Results = ({ navigation, route: { params } }) => {
    const { sortedColleges } = params;
    const topFive = sortedColleges.splice(0, 5);
    const [officialList, setOfficialList] = useState([]);

    // multiple keys for test purposes, feel free to use; will deactivate after review
    // google limits 100 searches per day per key
    const key1 = 'AIzaSyAwEJRZ3gG1E-PMP4_ffqAhDGB96NhVC2w';
    const key2 = 'AIzaSyCqVeAQpe-pdQB-jbszpVajTC5_7VxTUGw';
    const key3 = 'AIzaSyAQ-lcLS8ngOnv12w5B_ecJqEjEdHe1Gwo';
    const cx = '4288575b4c4c6a891';

    const fetchCollegeImg = async (colleges) => {
        let collegeCount = 0;
        colleges.forEach(async (college) => {
            // replace whitespace in strings for search query
            const searchTerm = college && college.mascot ? (
                college.mascot.replace(/\s/g, '+')
            ) : (
                college.name.replace(/\s/g, '+')
            );
            try {
                const { data } = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${key1}&cx=${cx}&searchType=image&q=${searchTerm}+college+logo`);
                // edge-case in which there are no image results, set default
                college.image = data.items && data.items[0].image && data.items[0].image.thumbnailLink ||
                    'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png';
                collegeCount++;
            } catch(error) {
                console.log(error.message);
                // status code 429 = google API key query limit reached
                // for purposes of the app, set image with dummy icon and display
                if (error.message === "Request failed with status code 429") {
                    college.image = 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png';
                    collegeCount++;
                }
            }
            if (collegeCount === colleges.length) {
                setOfficialList(colleges);
            }
        });
    };

    useEffect(() => {
        fetchCollegeImg(topFive);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>The Top 5 Most Attended Colleges By Your Selected NFL Teams Are:</Text>
            <View style={styles.scrollviewContainer}>
                <ScrollView style={styles.scrollview}>
                    <View style={styles.fullWidth}>
                        {officialList.length > 0 && officialList.map((college, index) => (
                            <View key={index} style={styles.collegeSection}> 
                                <View style={styles.schoolImage}>
                                    <Image style={styles.backgroundImageSelected} source={{ uri: college.image }}/>
                                </View>
                                <View style={styles.collegeTextWrapper}>
                                    <Text style={styles.text}>{index + 1}. {college.name}</Text>
                                    <Text style={styles.text}>Mascot: {college.mascot}</Text>
                                    <Text style={styles.text}>{college.count} Current NFL Players</Text>
                                </View>
                            </View>
                        )) || (
                            <View>
                                <Text style={styles.header}>
                                    No Colleges Selected
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.homeButtonContainer}>
                <TouchableOpacity
                    style={styles.homeButtonContainer}
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                >
                    <Text style={styles.text}>
                        Home >>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#595faa',
    },
    header: {
        fontSize: 23,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
    },
    scrollviewContainer: {
        height: 520,
    },
    scrollview: {
        width: '100%',
    },
    fullWidth: {
        width: '100%',
    },
    collegeSection : {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between'
    },
    schoolImage: {
        height: 100,
        width: 100,
        margin: 10,
        borderWidth: 2,
        borderColor: '#3898EC',
        borderRadius: 10,
    },
    backgroundImageSelected: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        opacity: 1,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
    collegeTextWrapper: {
        width: '60%',
        marginTop: 10,
    },
    homeButtonContainer: {
        height: 60,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3898EC',
        borderRadius: 10,
        margin: 15,
    }
})

export default Results;
