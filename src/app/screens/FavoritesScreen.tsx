import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/useStoreDispatch';
import {useFocusEffect} from '@react-navigation/native';
import {Product} from '../store/Product';
import theme from '../theme';
import ProductCard from '../components/ProductCart';

const FavoritesScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {favIds} = useAppSelector(state => state.favorite);
  const {products} = useAppSelector(state => state.product);

  const favoriteProducts = products.filter(product =>
    favIds.includes(product.id),
  );
  const dispatch = useAppDispatch();
  useFocusEffect(useCallback(() => {}, [dispatch]));

  const renderProductCardComponent = (product: Product) => {
    return <ProductCard product={product} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Favorite Products</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="teal" />
        </View>
      ) : (
        <FlatList
          style={{marginBottom: 60}}
          data={favoriteProducts}
          renderItem={({item}) => renderProductCardComponent(item)}
          keyExtractor={item => item.id.toString()}
          horizontal={false}
          numColumns={2}
          ListEmptyComponent={
            <View style={styles.noDataContainer}>
              <ActivityIndicator size={'large'} color={'teal'} />
              <Text>No Data</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BG,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    alignSelf:'center',
    marginBottom:10,
    color:theme.DARK_GRAY
  },
  noDataContainer: {
    width: '100%',
    height: 64,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
