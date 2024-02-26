import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Product} from '../store/Product';
import {useAppDispatch, useAppSelector} from '../hooks/useStoreDispatch';
import {
  ProductCartState,
  ProductsWithCounts,
  decreaseProductCount,
  increaseProductCount,
  removeProductFromCart,
} from '../store/Cart';
import {Trash} from 'iconsax-react-native';
import theme from '../theme';

type CustomCardProps = {
  product: Product;
};
const CustomOrderCart: React.FC<CustomCardProps> = ({product}) => {
  const {productsWithCounts} = useAppSelector(state => state.productCart);
  const productCount = productsWithCounts.find(
    p => p.product.id == product.id,
  )?.count;
  const dispatch = useAppDispatch();

  const handleDecrease = () => {
    if (productCount && productCount > 1) {
      dispatch(decreaseProductCount(product));
    } else {
      dispatch(removeProductFromCart(product));
    }
  };
  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.cartContent}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}$</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={handleDecrease}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.quantityButton}>
            <Text>{productCount}</Text>
          </View>
          <TouchableOpacity
            onPress={() => dispatch(increaseProductCount(product))}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => dispatch(removeProductFromCart(product))}>
            <Trash color={theme.RED} variant="Bold" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CustomOrderCart;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartContent: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  totalPriceContainer: {
    backgroundColor: '#eee',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
