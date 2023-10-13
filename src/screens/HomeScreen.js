import {View, Text, Image, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {StatusBar} from "expo-status-bar";
import {theme} from "../theme";
import {MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {MapPinIcon} from "react-native-heroicons/solid";

const HomeScreen = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState([1,2,3]);
    const toggleSearch = () => {
      setShowSearch(!showSearch)
    }

    function handleLocation(loc) {
        console.log(loc)
    }

    return (
    <View className={'flex-1 relative'}>
      <StatusBar style="light" />
        <Image blurRadius={70} source={require("../../assets/images/bg.png")} className={'absolute h-full w-full'} />
        <SafeAreaView classNaame={'flex flex-1'}>
            {/*Search section*/}
            <View style={{height: "7%"}} className={'mx-4 relative z-50 mt-10'}>
                <View
                    className={'flex-row justify-end items-center rounded-full'}
                    style={{backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent'}}
                >
                    {
                        showSearch ? (
                            <TextInput
                                placeholder="Search city"
                                placeholderTextColor={'lightgray'}
                                className={'pl-6 h-14 flex-1 text-base text-white'}
                            />
                        ):null
                    }
                    <TouchableOpacity
                        style={{backgroundColor: theme.bgWhite(0.3)}}
                        className={'rounded-full p-3 m-1'}
                        onPress={() => toggleSearch()}
                    >
                        <MagnifyingGlassIcon size={25} color={'white'} />
                    </TouchableOpacity>
                </View>
                {
                    locations.length >0 && showSearch ? (
                        <View className={'absolute w-full bg-gray-300 top-16 rounded-3xl'}>
                            {
                                locations.map((item, index) => {
                                    let showBorder = index + 1 !== locations.length
                                    let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : ''
                                    return(
                                        <TouchableOpacity
                                            onPress={() => handleLocation(item)}
                                            className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`} key={index}>
                                            <MapPinIcon size={20} color={'gray'} />
                                            <Text>{item}</Text>

                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    ):null
                }
            </View>
        </SafeAreaView>
    </View>
  )
}

export default HomeScreen