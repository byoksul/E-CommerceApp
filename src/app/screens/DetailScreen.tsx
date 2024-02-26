import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../hooks/useStoreDispatch';
import theme from '../theme';
import {Back, ShoppingCart, Heart} from 'iconsax-react-native';
import {addFavProductId, removeFavProductId} from '../store/FavoriteProducts';
import { addProductToCart } from '../store/Cart';

type RootStackParamList = {
  Details: {productId: string};
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
}

const DetailScreen: React.FC<DetailsScreenProps> = ({route}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {products} = useAppSelector(state => state.product);
  const {favIds} = useAppSelector(state => state.favorite);
  const {productsWithCounts} = useAppSelector(state => state.productCart);

  const productId = route.params?.productId;
  const productDetail = products.filter(product => product.id === productId)[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: productDetail.name,
      headerStyle: {backgroundColor: theme.BG},
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Back variant="Linear" size={30} color={theme.PRIMARY_ORANGE} />
        </Pressable>
      ),
    });
  });
  const handAddToCart = () => {
    var cartControlForAdd = productsWithCounts.find(
      p => p.product.id === productDetail.id,
    );

    if (cartControlForAdd && cartControlForAdd.count > 0) {
      Alert.alert('The product is available in shopping cart');
    } else {
      dispatch(addProductToCart(productDetail));
    }
  };
  const favProduct = () => {
    if (favIds.includes(productDetail.id)) {
      dispatch(removeFavProductId(productDetail.id));
    } else {
      dispatch(addFavProductId(productDetail.id));
    }
  };
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View style={styles.container}>
        <Image source={{uri: productDetail.image}} style={styles.image} />
        <View style={styles.heartView}>
          <Text style={styles.name}>{productDetail.name}</Text>
          <TouchableOpacity onPress={favProduct} style={styles.heartButton}>
            <Heart
              variant={favIds.includes(productDetail.id) ? 'Bold' : 'Outline'}
              size={32}
              color={theme.RED}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.brandModel}>
            {productDetail.brand} - {productDetail.model}
          </Text>
          <Text style={styles.description}>{productDetail.description}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.priceText}>Price:</Text>
          <Text style={[styles.priceText, {color: theme.DARK_GRAY}]}>
            {productDetail.price} $
          </Text>
        </View>

        <TouchableOpacity
          onPress={handAddToCart}
          style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          <ShoppingCart variant="Outline" size={20} color={theme.WHITE} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerSafeArea: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  heartView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  brandModel: {
    fontSize: 18,
    color: theme.DARK_GRAY,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  heartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35,
    left: 35,
    right: 35,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.PRIMARY_ORANGE,
  },
  addToCartButton: {
    backgroundColor: theme.PRIMARY_ORANGE,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    margin: 10,
  },
  addToCartButtonText: {
    color: theme.WHITE,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
