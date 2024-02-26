import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Heart, ShoppingCart} from 'iconsax-react-native';
import {Product} from '../store/Product';
import theme from '../theme';
import {useAppDispatch, useAppSelector} from '../hooks/useStoreDispatch';
import {addFavProductId, removeFavProductId} from '../store/FavoriteProducts';
import {addProductToCart} from '../store/Cart';
import {useNavigation} from '@react-navigation/native';

type ProductCardProps = {
  product: Product;
};

type NavigateParams = {productId: string};

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardWidth = screenWidth / 2 - 20;
  const {favIds} = useAppSelector(state => state.favorite);
  const {productsWithCounts} = useAppSelector(state => state.productCart);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const handAddToCart = () => {
    var cartControlForAdd = productsWithCounts.find(
      p => p.product.id === product.id,
    );

    if (cartControlForAdd && cartControlForAdd.count > 0) {
      Alert.alert('The product is available in shopping cart');
    } else {
      dispatch(addProductToCart(product));
    }
  };
  const favProduct = () => {
    if (favIds.includes(product.id)) {
      dispatch(removeFavProductId(product.id));
    } else {
      dispatch(addFavProductId(product.id));
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (product && product.id) {
            navigation.navigate('Details', {productId: product.id});
          }
        }}
        style={[styles.card, {width: cardWidth}]}>
        <Image
          resizeMode="cover"
          source={{uri: product.image}}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.price}>{`$ ${product.price}`}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <TouchableOpacity onPress={favProduct} style={styles.heartButton}>
            <Heart
              variant={favIds.includes(product.id) ? 'Bold' : 'Outline'}
              size={20}
              color={theme.RED}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handAddToCart}
            style={styles.buttonView}>
            <View style={styles.addButtonView}>
              <Text style={styles.addText}>Add to Cart</Text>
              <ShoppingCart variant="Outline" size={20} color={theme.WHITE} />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataContainer: {
    width: '100%',
    height: 64,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 8,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  title: {
    flex: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  bottomContainer: {
    width: '90%',
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.DARK_GRAY,
  },
  heartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  buttonView: {
    marginVertical: 20,
    backgroundColor: theme.PRIMARY_ORANGE,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addText: {
    color: theme.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  addButtonView: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
});
