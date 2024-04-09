import React from 'react'
import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Responsive from '../../Constant/Responsive';
import { GlobalStyle } from '../../Constant/GlobalStyle';
import Color from '../../Constant/Color';
import Images from '../../Constant/Images';
import NavigationService from '../../Navigator/NavigationService';
import Icons from '../../Constant/Icons';

const array = [
    {
        name: "Voice",
        list: [{
            name: "Voice Type"
        }, {
            name: "Speed"
        }]
    },
    {
        name: "Voice1",
        list: [{
            name: "Voice Type"
        }, {
            name: "Speed"
        }]
    }
]

export const Settings = ({ }) => {

    const renderItem = (item: any) => {
        return (
            <View style={{
                width: "90%", alignSelf: "center",
                borderRadius: Responsive.hp(1.5),
            }}>
                <View style={{
                    height: Responsive.hp(7), alignSelf: "center", width: "100%", justifyContent: "center",
                    // backgroundColor: Color.whiteGrey60,
                }}>
                    <Text style={{
                        width: "100%", alignSelf: "center", ...GlobalStyle.H1, color: Color.themeGreen,
                        paddingHorizontal: Responsive.hp(1)
                    }}>{item?.item?.name}</Text>
                </View>

                {item?.item?.list.map((element) => {
                    return renderSubItem(element)
                })
                }
            </View>

        )
    }

    const renderSubItem = (item: any) => {
        return (
            <View style={{
                width: "96%",
                marginLeft: Responsive.wp(3),
                // backgroundColor: Color.whiteGrey60,
            }}>
                <View style={{
                    height: Responsive.hp(7), alignSelf: "center", alignItems:"center", width: "100%", justifyContent: "space-between", flexDirection:"row"
                }}>
                    <Text style={{
                        alignSelf: "center", ...GlobalStyle.H1, color: Color.lightMediumPink,
                        paddingHorizontal: Responsive.hp(1)
                    }}>{item?.name}</Text>

                    <TouchableOpacity style={{
                        width: Responsive.hp(5), height: Responsive.hp(5), marginRight: Responsive.hp(0.5), alignItems:"center", justifyContent:"center"
                    }} >
{Icons.nextIcon}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={styles.containerBGImage}
                source={Images.splashImage}
            >
                <SafeAreaView style={styles.safeAreaContainer}>
                    <View style={{ width: "100%", height: "100%" }}>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    NavigationService.navigateToBack()
                                }}
                                style={{ ...styles.menuContainer }}
                            >
                                <Image style={styles.menuIcon} source={Images.backArrow} />
                            </TouchableOpacity>
                            <Text style={{ ...GlobalStyle.T2, color: Color.themeGreen, textAlign: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>Setting</Text>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {

                                }}
                                style={{ ...styles.menuContainer }}
                            >
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 1, width: "100%", marginTop: Responsive.hp(1) }}>
                            <FlatList
                                numColumns={1}
                                data={array}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ width: "100%", justifyContent: "center", backgroundColor: Color.whiteGrey60 }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
    },
    containerBGImage: {
        height: "100%",
        width: "100%",
        flexDirection: "row"
    },
    menuContainer: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginLeft: 10,
    },
    menuIcon: {
        width: 40,
        height: 40,
    },
    safeAreaContainer: { width: "100%", height: "100%", flexDirection: "row" },
    itemContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Responsive.hp(2),
        width: Responsive.wp(22),
        height: Responsive.wp(22),
    },
    imageContainer: { width: Responsive.hp(30), height: Responsive.hp(30) },
    textContainer: {
        ...GlobalStyle.T1,
        paddingVertical: Responsive.hp(0.5),
        color: Color.themeGreen,
    },
});