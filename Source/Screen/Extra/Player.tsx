import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import TrackPlayer, {
    usePlaybackState,
    useProgress,
    State,
} from 'react-native-track-player';
import { setupPlayer, addTracks } from '../../Component/trackPlayerServices';
import Icons from '../../Constant/Icons';


function Player() {
    const { position, duration } = useProgress(200);
    const playerState = usePlaybackState();

    function format(seconds: any) {
        let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    async function handlePlayPress() {
        console.log("pause", await TrackPlayer.getState());
        if (await TrackPlayer.getState() == State.Playing) {
            TrackPlayer.pause()
            console.log("pause");
            
        } else {
            TrackPlayer.play();
            console.log("play");
        }
    }

    useEffect(() => {
        console.log("position logs: ", position, duration, playerState);
        if (duration > 0 && position == duration) {
            TrackPlayer.seekTo(0.0);
            console.log("reset");
        } 
    }, [position])

    async function setup() {
        let isSetup = await setupPlayer();

        const queue = await TrackPlayer.getQueue();
        if (isSetup && queue.length <= 0) {
            await addTracks();
        }
    }

    useEffect(() => {
        setup();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.trackProgress}>
                {format(position)} / {format(duration)}
            </Text>

            <TouchableOpacity
                style={{
                    width: 50, height: 50, justifyContent: "center", alignItems: "center",
                    backgroundColor: "yellow", borderRadius: 25, alignSelf: "center"
                }}
                onPress={handlePlayPress}
            >
                {playerState == State.Playing ? Icons.muteSoundIcon : Icons.soundIcon}
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'grey'
    },
    trackProgress: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 24,
        color: '#eee'
    },
});

export default Player;