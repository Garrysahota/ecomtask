import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Alert, Animated, Dimensions, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../constants/theme';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import BackIcon from '../assets/svg/BackIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import BagIcon from '../assets/svg/BagIcon';
import MinuesIcon from '../assets/svg/MinuesIcon';
import PlusIcon from '../assets/svg/PlusIcon';
import { ApiHelper } from '../helpers/api/apiHelper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProductDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const productId = route?.params?.product;

    const [product, setProduct] = useState([]);

    const productDetails = async () => {
        try {
            let res = await ApiHelper.post('task_api.php', { product_id: productId }, true);
            console.log('response:::', res);
            if (res?.status) {
                setProduct(res?.data[0]);
            } else {
                Alert.alert(res?.message);
            }

        } catch (error) {
            console.log('err:', error);
        }
    };

    useEffect(() => {
        productDetails()
    }, [])

    const images = useMemo(() => {
        if (Array.isArray(product?.images) && product.images.length) return product.images;
        if (product?.thumbnail) return [product.thumbnail];
        return [];
    }, [product]);

    const HORIZONTAL_PADDING = moderateScale(24);
    const ITEM_SPACING = scale(12);
    const ITEM_WIDTH = Math.round(SCREEN_WIDTH - HORIZONTAL_PADDING - ITEM_SPACING * 2);
    const ITEM_HEIGHT = Math.round(SCREEN_WIDTH * 0.55);

    const scrollX = useRef(new Animated.Value(0)).current;
    const flatRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index ?? 0);
        }
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const renderItem = ({ item: uri, index }) => {
        const inputRange = [
            (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
            index * (ITEM_WIDTH + ITEM_SPACING),
            (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
        ];

        const scaleInterpolate = scrollX.interpolate({
            inputRange,
            outputRange: [0.94, 1, 0.94],
            extrapolate: 'clamp',
        });

        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [10, 0, 10],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ width: ITEM_WIDTH + ITEM_SPACING, alignItems: 'center' }}>
                <Animated.View
                    style={[styles.slide, { width: ITEM_WIDTH, height: ITEM_HEIGHT, transform: [{ scale: scaleInterpolate }, { translateY }], },]}>
                    {uri ?
                        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
                        :
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderText}>No image</Text>
                        </View>
                    }
                </Animated.View>
            </View>
        );
    };

    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => Math.max(1, q - 1));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
                    <BackIcon width={scale(24)} height={scale(24)} color={THEME.BLACK} />
                </TouchableOpacity>
            </View>

            <View style={styles.carouselWrap}>
                <Animated.FlatList
                    ref={flatRef}
                    data={images}
                    keyExtractor={(uri, idx) => `img-${idx}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    decelerationRate={Platform.OS === 'ios' ? 0.8 : 0.98}
                    snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                    snapToAlignment="center"
                    contentContainerStyle={{ paddingHorizontal: HORIZONTAL_PADDING / 2 }}
                    renderItem={renderItem}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
                    scrollEventThrottle={16}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    ListEmptyComponent={
                        <View style={[styles.emptyContainer, { width: ITEM_WIDTH, height: ITEM_HEIGHT }]}>
                            <Text style={{ color: THEME.BLACK, opacity: 0.6 }}>No images</Text>
                        </View>
                    }
                />

                <View style={styles.pagination}>
                    {
                        images.map((_, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <View key={i} style={[styles.dot, isActive ? styles.dotActive : null]} />
                            )
                        })}
                </View>
            </View>

            <View style={styles.detailsWrap}>
                <View style={styles.rowBetween}>
                    <View style={{ width: '60%' }}>
                        <Text style={styles.text14} numberOfLines={2}>{product?.title ?? 'Product title'}</Text>
                        <Text style={styles.categoryText}> {product?.brand ?? product?.category}</Text>
                    </View>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.text14}>Price</Text>
                        <Text style={styles.priceText}>₱ {product?.price ?? '0.00'}</Text>
                    </View>
                </View>

                <View style={styles.counterButtons}>
                    <Pressable onPress={decrement}>
                        <MinuesIcon width={scale(30)} height={scale(30)} color={THEME.PRIMARY_DARK} />
                    </Pressable>

                    <Text style={styles.text14}>{quantity}</Text>
                    <Pressable onPress={increment}>
                        <PlusIcon width={scale(30)} height={scale(30)} color={THEME.PRIMARY_DARK} />
                    </Pressable>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText} numberOfLines={4}>{product?.description ?? 'No description available.'}</Text>
                </View>

                <View style={styles.ctaRow}>
                    <TouchableOpacity style={styles.cartBtn} activeOpacity={0.85}>
                        <BagIcon width={scale(24)} height={scale(24)} color={THEME.PRIMARY_DARK} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85}>
                        <Text style={styles.buyText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.BACKGROUND,
    },
    header: {
        paddingHorizontal: moderateScale(10),
        paddingTop: scale(10),
        zIndex: 10,
    },
    backBtn: {
        width: scale(45),
        height: scale(45),
        borderRadius: scale(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselWrap: {
        flex: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: THEME.BLACK,
        opacity: 0.5,
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        marginBottom: scale(50),
    },
    dot: {
        width: scale(12),
        height: scale(12),
        borderRadius: scale(12),
        backgroundColor: THEME.WHITE,
        borderWidth: 1,
        borderColor: THEME.WHITE,
        // opacity: 0.35,
        marginHorizontal: scale(4),
    },
    dotActive: {
        width: scale(12),
        borderRadius: scale(12),
        opacity: 1,
        backgroundColor: THEME.PRIMARY_DARK,
        borderColor: THEME.WHITE,
    },

    detailsWrap: {
        flex: 1,
        backgroundColor: THEME.WHITE,
        borderTopLeftRadius: scale(28),
        borderTopRightRadius: scale(28),
        padding: scale(20),
    },
    counterButtons: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
        marginVertical: verticalScale(10),
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    text14: {
        fontSize: scale(14),
        fontWeight: '500',
        color: THEME.BLACK,
    },
    priceText: {
        fontSize: scale(18),
        fontWeight: '600',
        color: THEME.PRIMARY,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryText: {
        marginTop: moderateScale(6),
        fontSize: scale(12),
        color: THEME.BLACK,
        opacity: 0.6,
    },
    sectionTitle: {
        fontSize: scale(16),
        fontWeight: '600',
        color: THEME.BLACK,
        marginBottom: moderateScale(5),
    },
    descriptionText: {
        fontSize: scale(13),
        color: THEME.BLACK,
        opacity: 0.8,
        lineHeight: scale(20),
    },

    ctaRow: {
        marginTop: scale(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: scale(10),
    },
    buyBtn: {
        flex: 1,
        height: scale(45),
        borderRadius: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.BUTTON,
    },
    buyText: {
        color: THEME.WHITE,
        fontWeight: '600',
        fontSize: scale(14),
    },
    cartBtn: {
        width: scale(60),
        height: scale(45),
        borderRadius: scale(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.LIGHT,
    },
    cartText: {
        color: THEME.BLACK,
        fontWeight: '600',
    },
});