import { ActivityIndicator, Animated, Dimensions, FlatList, Image, LayoutAnimation, Pressable, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { THEME } from '../constants/theme'
import { moderateScale, s, scale, verticalScale, } from 'react-native-size-matters'
import SearchIcon from '../assets/svg/SearchIcon';
import GridIcon from '../assets/svg/GridIcon';
import ListIcon from '../assets/svg/ListIcon';
import StarIcon from '../assets/svg/StarIcon';
import HeartFill from '../assets/svg/HeartFill';
import PlusCircleIcon from '../assets/svg/PlusCircleIcon';
import { ApiHelper } from '../helpers/api/apiHelper'
import { useNavigation } from '@react-navigation/native'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING = moderateScale(20);
const GAP = s(10);


const ProductItem = memo(({ item, isGrid }) => {
    const anim = useRef(new Animated.Value(isGrid ? 1 : 0)).current;
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(anim, {
            toValue: isGrid ? 1 : 0,
            duration: 10,
            useNativeDriver: true,
        }).start();
    }, [isGrid, anim]);

    const scaleInterpolate = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.98],
    });
    const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -4],
    });

    const containerStyle = isGrid ? { width: (SCREEN_WIDTH - PADDING * 2 - GAP) / 2 } : { width: SCREEN_WIDTH - PADDING * 2 };

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item?.id })}>

            <Animated.View
                style={[
                    itemStyles.card,
                    containerStyle,
                    { transform: [{ scale: scaleInterpolate }, { translateY }], },
                    { flexDirection: isGrid ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', }
                ]}
            >
                {isGrid ? <>
                    <View style={styles.gridHeader}>
                        <View style={styles.row5}>
                            <StarIcon width={scale(18)} height={scale(18)} color={THEME.STAR} />
                            <Text style={styles.text13}>{item?.rating}</Text>
                        </View>
                        <View>
                            <HeartFill width={scale(18)} height={scale(18)} color={THEME.GREY} />
                        </View>
                    </View>
                    <View style={{ width: '100%', marginBottom: scale(10) }}>
                        <Image style={styles.image} source={{ uri: item?.thumbnail }} />
                    </View>
                    <View style={styles.listView}>
                        <Text numberOfLines={1} style={itemStyles.title}> {item.name ?? item.title ?? 'No title'}</Text>
                        <View style={[styles.gridHeader, { marginVertical: verticalScale(10) }]}>
                            <Text style={itemStyles.text13} numberOfLines={1}>₱ {item.price ?? item.subtitle ?? ''}</Text>
                            <PlusCircleIcon width={scale(24)} height={scale(24)} color={THEME.BUTTON} />
                        </View>
                    </View>
                </>
                    :
                    <>
                        <View style={{ width: '50%' }}>
                            <Image style={styles.image} source={{ uri: item?.thumbnail }} resizeMode='contain' />
                        </View>
                        <View style={styles.gridView}>
                            <Text numberOfLines={1} style={itemStyles.title}> {item.name ?? item.title ?? 'No title'}</Text>
                            <View style={styles.row5}>

                                <StarIcon width={scale(18)} height={scale(18)} color={THEME.STAR} />
                                <StarIcon width={scale(18)} height={scale(18)} color={THEME.STAR} />
                                <StarIcon width={scale(18)} height={scale(18)} color={THEME.STAR} />
                                <StarIcon width={scale(18)} height={scale(18)} color={THEME.STAR} />
                                <StarIcon width={scale(18)} height={scale(18)} color={THEME.STAR} />
                            </View>
                            <Text style={itemStyles.text13} numberOfLines={1}>₱ {item.price ?? item.subtitle ?? ''}</Text>
                        </View>
                    </>}
            </Animated.View>
        </TouchableOpacity>
    );
}, (prev, next) => prev.item?.id === next.item?.id && prev.isGrid === next.isGrid);

const HomeScreen = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isGrid, setIsGrid] = useState(false);

    const gridScale = useRef(new Animated.Value(1)).current;
    const listScale = useRef(new Animated.Value(1)).current;

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiHelper.get('task_api.php');
            if (res?.status) {
                setData(res?.data?.products ?? []);
            } else {
                setData([]);
            }
        } catch (err) {
            console.log('Error', err?.message ?? err);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchData();
    }, []);

    const toggleLayout = useCallback(
        (nextGrid) => {
            LayoutAnimation.configureNext({
                duration: 300,
                update: {
                    type: LayoutAnimation.Types.easeInEaseOut,
                },
            });

            setIsGrid(nextGrid);

            Animated.parallel([
                Animated.timing(gridScale, {
                    toValue: nextGrid ? 1.12 : 1,
                    duration: 220,
                    useNativeDriver: true,
                }),
                Animated.timing(listScale, {
                    toValue: nextGrid ? 1 : 1.12,
                    duration: 220,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                Animated.parallel([
                    Animated.timing(gridScale, {
                        toValue: nextGrid ? 1 : 1,
                        duration: 120,
                        useNativeDriver: true,
                    }),
                    Animated.timing(listScale, {
                        toValue: nextGrid ? 1 : 1,
                        duration: 120,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        },
        [gridScale, listScale]
    );

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <ProductItem item={item} isGrid={isGrid} />
            )
        },
        [isGrid]
    );
    const keyExtractor = useCallback((item, index) => String(item?.id ?? item?.product_id ?? index), []);


    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.mainContainer}>
                <Text style={styles.text18}>Explore</Text>
                <Pressable style={styles.searchBar}>
                    <Text style={styles.text13}>Search</Text>
                    <SearchIcon width={s(20)} height={s(20)} />
                </Pressable>

                <View style={styles.manuContainer}>
                    <TouchableOpacity onPress={() => toggleLayout(false)} activeOpacity={0.8}>
                        <Animated.View style={{ transform: [{ scale: listScale }] }}>
                            <ListIcon width={s(24)} height={s(24)} color={!isGrid ? THEME.PRIMARY_DARK : THEME.BLACK} />
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleLayout(true)} activeOpacity={0.8}>
                        <Animated.View style={{ transform: [{ scale: gridScale }] }}>
                            <GridIcon width={s(22)} height={s(22)} color={isGrid ? THEME.PRIMARY_DARK : THEME.BLACK} />
                        </Animated.View>
                    </TouchableOpacity>
                </View>

                <View>
                    {loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} color={THEME.PRIMARY} />
                        </View> :
                        <FlatList
                            data={data}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                            numColumns={isGrid ? 2 : 1}
                            showsVerticalScrollIndicator={false}
                            columnWrapperStyle={isGrid ? { justifyContent: 'space-between', paddingBottom: GAP } : undefined}
                            contentContainerStyle={{ paddingBottom: moderateScale(30), paddingTop: s(8) }}
                            initialNumToRender={8}
                            removeClippedSubviews={true}
                            key={isGrid ? 'g' : 'l'}
                            ListEmptyComponent={() => (
                                <View style={{ padding: 20 }}>
                                    <Text style={{ textAlign: 'center', color: THEME.BLACK, opacity: 0.6 }}>No items found</Text>
                                </View>
                            )}
                        />}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: THEME.BACKGROUND
    },
    mainContainer: {
        marginVertical: verticalScale(10),
        paddingHorizontal: moderateScale(20),
        gap: s(10)
    },
    text13: {
        fontSize: s(13),
        color: THEME.BLACK,
        opacity: 0.7
    },
    text18: {
        fontSize: s(18),
        color: THEME.BLACK,
        fontWeight: '600'
    },
    searchBar: {
        width: '100%',
        backgroundColor: THEME.WHITE,
        height: s(45),
        borderRadius: s(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(15)
    },
    manuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: s(10),
    },
    row5: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: scale(5)
    },
    gridView: {
        width: '50%',
        paddingHorizontal: moderateScale(10),
        gap: scale(5),
        alignItems: 'center'
    },
    listView: {
        width: '100%',
        paddingHorizontal: moderateScale(10),
        gap: scale(5),
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: scale(100)
    },
    gridHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    }
});
const itemStyles = StyleSheet.create({
    card: {
        backgroundColor: THEME.WHITE,
        borderRadius: s(10),
        padding: moderateScale(10),
        marginVertical: s(5),

    },
    title: {
        fontSize: s(14),
        color: THEME.BLACK,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: s(12),
        color: THEME.BLACK,
        opacity: 0.6,
    },
});
