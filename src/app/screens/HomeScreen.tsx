import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Filter, SearchNormal} from 'iconsax-react-native';
import {useAppDispatch, useAppSelector} from '../hooks/useStoreDispatch';
import {useFocusEffect} from '@react-navigation/native';
import {
  Product,
  getProductList,
  setCurrentPage,
  setProductList,
} from '../store/Product';
import theme from '../theme';
import ProductCard from '../components/ProductCart';

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {products, currentPage, hasMoreProduct} = useAppSelector(
    state => state.product,
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const handleSearchTerm = (query: string) => {
    setSearchTerm(query);
    dispatch(setCurrentPage(1));
    dispatch(setProductList([]));
    dispatch(getProductList({query}));
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getProductList());
    }, [dispatch]),
  );

  const renderFooter = useCallback(() => {
    if (loadingMore) {
      return (
        <View style={{padding: 20}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return <></>;
  }, [loadingMore]);

  const loadMore = useCallback(
    (distanceFromEnd: any) => {
      if (loadingMore || !hasMoreProduct) {
        return;
      }
      setLoadingMore(true);
      dispatch(
        getProductList({
          query: searchTerm,
          filter: {
            name,
            brand,
            model,
          },
        }),
      );
      setLoadingMore(false);
    },
    [loadingMore, name, brand, model, dispatch],
  );
  const handleFilter = () => {
    dispatch(setCurrentPage(1));
    dispatch(setProductList([]));
    dispatch(
      getProductList({
        query: searchTerm,
        filter: {
          name,
          brand,
          model,
        },
      }),
    );
    setModalVisible(!modalVisible);
  };
  const openFilter = () => {
    setModalVisible(true);
    setName('');
    setBrand('');
    setModel('');
  };

  const renderProductCardComponent = (product: Product) => {
    return <ProductCard product={product} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <SearchNormal variant="Outline" color={theme.PRIMARY_ORANGE} />
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={theme.DARK_GRAY}
            placeholder="Search Here..."
            value={searchTerm}
            onChangeText={handleSearchTerm}
          />
        </View>

        <TouchableOpacity onPress={openFilter} style={styles.filterButton}>
          <Filter variant="Bold" size={30} color={theme.PRIMARY_ORANGE} />
        </TouchableOpacity>
      </View>
      <>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="teal" />
          </View>
        ) : (
          <FlatList
            style={{marginBottom: 60}}
            data={products}
            renderItem={({item}) => renderProductCardComponent(item)}
            keyExtractor={item => item.id.toString()}
            horizontal={false}
            numColumns={2}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.1}
            onEndReached={({distanceFromEnd}) => {
              loadMore(distanceFromEnd);
            }}
            ListEmptyComponent={
              <View style={styles.noDataContainer}>
                <ActivityIndicator size={'large'} color={'teal'} />
                <Text>No Data</Text>
              </View>
            }
          />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Filter</Text>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
              <Text style={styles.label}>Brand</Text>
              <TextInput
                style={styles.input}
                value={brand}
                onChangeText={setBrand}
              />
              <Text style={styles.label}>Model</Text>
              <TextInput
                style={styles.input}
                value={model}
                onChangeText={setModel}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    {backgroundColor: theme.PRIMARYBLACKRGBA},
                  ]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleFilter}>
                  <Text style={styles.textStyle}>Filter</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BG,
  },
  noDataContainer: {
    width: '100%',
    height: 64,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.WHITE,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    paddingTop: -1,
  },
  filterButton: {
    width: 45,
    height: 45,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.BG,
  },
  loadingContainer: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: theme.WHITE,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },

  buttonClose: {
    backgroundColor: theme.PRIMARY_ORANGE,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    height: 40,
    borderColor: theme.PRIMARY_ORANGE,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    width: 200,
  },
  label: {
    alignSelf: 'flex-start',
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
