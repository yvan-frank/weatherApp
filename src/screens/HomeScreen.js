import {View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import {StatusBar} from "expo-status-bar";
import {theme} from "../theme";
import {CalendarDaysIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {MapPinIcon} from "react-native-heroicons/solid";
import {debounce} from "lodash";
import {fetchLocations, fetchWeatherForecast} from "../api/weather";
import {weatherImages} from "../constants";
import * as Progress from "react-native-progress";


const HomeScreen = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const toggleSearch = () => {
      setShowSearch(!showSearch)
    }

    function handleLocation(loc) {
        setLocations([])
        setLoading(true)
        fetchWeatherForecast({cityName: loc.name, days: '7'}).then((data) => {
            setWeather(data)
            setLoading(false)
        })
        console.log(loc)
    }

    const handleSearch = (value) => {
        if (value.length > 2) {
            fetchLocations({cityName: value}).then((data) => {
                setLocations(data)
            })
        }
    }

    useEffect(() => {
        fetchWeatherForecast({cityName: 'Douala', days: '7'}).then((data) => {
            setWeather(data)
            setLoading(false)
        })
    }, []);


    const {current, location} = weather;
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

    return (
    <View className={'flex-1 relative'}>
      <StatusBar style="light" />
        <Image blurRadius={70} source={require("../../assets/images/bg.png")} className={'absolute h-full w-full'} />
        {
            loading ? (
                <View className={'flex-row flex-1 justify-center items-center'}>
                    <Progress.CircleSnail
                        thickness={2}
                        size={100}
                        color={['#F79804', 'green']}
                        unfilledColor={'None'}
                    />
                </View>
            ): (
                    <SafeAreaView className={'flex flex-1'}>
                        {/*Search section*/}
                        <View style={{height: "7%"}} className={'mx-4 relative z-50 mt-10'}>
                            <View
                                className={'flex-row justify-end items-center rounded-full'}
                                style={{backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent'}}
                            >
                                {
                                    showSearch ? (
                                        <TextInput
                                            onChangeText={handleTextDebounce}
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
                                                        className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`}
                                                        key={index}
                                                    >
                                                        <MapPinIcon size={20} color={'gray'} />
                                                        <Text>{item.name}, {item.country}</Text>

                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                ):null
                            }
                        </View>
                        {/*Forecast section*/}
                        <View className={'mx-4 flex justify-around flex-1 mb-2'}>
                            {/*Location*/}
                            <Text className={'text-2xl font-bold text-white text-center'}>
                                {location?.name},
                                <Text className={'text-lg font-semibold text-gray-300'}>
                                    {" " + location?.country}
                                </Text>

                            </Text>
                            {/*Weather*/}
                            <View className={'flex-row justify-center'}>
                                <Image
                                    source={weatherImages[current?.condition?.text]}
                                    //source={require("../../assets/images/partlycloudy.png")}
                                    className={'w-52 h-52'}
                                />
                            </View>
                            {/*Degree celsius*/}
                            <View className={'space-y-2'}>
                                <Text className={'text-center font-bold text-white text-6xl ml-5'}>
                                    {current?.temp_c}&#176;
                                </Text>
                                <Text className={'text-center font-bold text-white text-base tracking-widest'}>
                                    {current?.condition?.text}
                                </Text>
                            </View>
                            {/*Others stats*/}
                            <View className={'flex-row justify-between mx-4'}>
                                <View className={'flex-row space-x-2 items-center'}>
                                    <Image source={require('../../assets/icons/wind.png')} className={'h-6 w-6'} />
                                    <Text className={'text-center font-bold text-white text-base tracking-widest'}>
                                        22km
                                    </Text>
                                </View>
                                <View className={'flex-row space-x-2 items-center'}>
                                    <Image source={require('../../assets/icons/drop.png')} className={'h-6 w-6'} />
                                    <Text className={'text-center font-bold text-white text-base tracking-widest'}>
                                        23%
                                    </Text>
                                </View>
                                <View className={'flex-row space-x-2 items-center'}>
                                    <Image source={require('../../assets/icons/sun.png')} className={'h-6 w-6'} />
                                    <Text className={'text-center font-bold text-white text-base tracking-widest'}>
                                        08:05 AM
                                    </Text>
                                </View>
                            </View>

                        </View>
                        {/* forecast for next days */}
                        <View className={'mb-2 space-y-2'}>
                            <View className={'flex-row items-center mx-5 space-x-2'}>
                                <CalendarDaysIcon size={22} color={'white'} />
                                <Text className={'text-base text-white'}>
                                    Daily forecast
                                </Text>
                            </View>
                            <ScrollView
                                horizontal
                                contentContainerStyle={{paddingHorizontal: 15}}
                                showsVerticalScrollIndicator={false}
                            >
                                {
                                    weather?.forecast?.forecastday?.map((item, index) => {
                                        let date = new Date(item?.date)
                                        let options = {
                                            weekday: 'long'
                                        }
                                        let day = new Intl.DateTimeFormat('en-US', options).format(date)
                                        return(
                                            <View
                                                key={index}
                                                className={'flex justify-center items-center rounded-3xl space-y-3 py-3 w-24 mr-4'}
                                                style={{backgroundColor: theme.bgWhite(0.15)}}
                                            >
                                                <Image source={weatherImages[item?.day?.condition?.text]} className={'h-11 w-11'} />
                                                <Text className={'text-white'}>
                                                    {day}
                                                </Text>
                                                <Text className={'text-white text-xl  font-semibold'}>
                                                    {item?.day?.avgtemp_c}&#176;
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                )
        }

    </View>
  )
}

export default HomeScreen