import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Danger} from 'iconsax-react-native';
import { useAppSelector} from '../hooks/useStoreDispatch';
import {Product} from '../store/Product';
import theme from '../theme';
import CustomOrderCart from '../components/CustomOrderCart';

const OrderScreen = () => {
  const {productsWithCounts} = useAppSelector(state => state.productCart);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    productsWithCounts.forEach(({product, count}) => {
      totalPrice += parseFloat(product.price) * count;
    });
    return totalPrice;
  };
  const renderCardComponent = (product: Product) => {
    return <CustomOrderCart product={product} />;
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Orders</Text>
        <FlatList
          data={productsWithCounts.map(p => p.product)}
          renderItem={({item}) => renderCardComponent(item)}
          keyExtractor={item => item.id.toString()}
          horizontal={false}
          numColumns={1}
          ListEmptyComponent={
            <View style={styles.noDataContainer}>
              <Danger size={50} color={theme.DARK_GRAY} />
              <Text style={styles.noText}>No Data</Text>
            </View>
          }
        />
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>
            Total: {calculateTotalPrice()}$
          </Text>
          <TouchableOpacity activeOpacity={0.6} style={styles.buttonView}>
            <Text style={styles.addText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BG,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 10,
    color: theme.DARK_GRAY,
  },
  noDataContainer: {
    width: '100%',
    height: 64,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noText: {color: theme.BLACK},

  totalPriceContainer: {
    padding: 30,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',

  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.PRIMARY_ORANGE,
  },
  buttonView: {
    width:'30%',
    height:'25%',
    marginVertical: 20,
    backgroundColor: theme.PRIMARY_ORANGE,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',

  },
  addText: {
    color: theme.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 5,
  },
});
