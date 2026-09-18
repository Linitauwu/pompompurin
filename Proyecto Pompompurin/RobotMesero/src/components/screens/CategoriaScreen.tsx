import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { productos } from '../data/productos';

import { useCart } from '../context/CartContext';


// ======================================================
// IMÁGENES DE POMPOMPURIN
// ======================================================

const pompompurin = require(
  '../assets/gifs/pompompurin.webp'
);

const pompompurin2 = require(
  '../assets/gifs/pom-pom-purin-pompompurin.webp'
);

const pompompurinHome = require(
  '../assets/gifs/Home _ X.png'
);

const pompompurinWallpaper = require(
  '../assets/gifs/Pompompurin wallpaper.png'
);

const pompompurinExtra = require(
  '../assets/gifs/descarga (44).png'
);


// ======================================================
// PANTALLA
// ======================================================

function CategoriaScreen() {

  const navigation = useNavigation<any>();

  const {
    agregarAlCarrito,
  } = useCart();


  // ====================================================
  // ESTADOS
  // ====================================================

  const [favoritos, setFavoritos] = useState<number[]>([]);

  const [busqueda, setBusqueda] = useState('');

  const [filtro, setFiltro] = useState('todos');


  // ====================================================
  // PRODUCTOS
  // ====================================================

  const productosComida = productos.filter(producto => {

    // Permite que los productos de comida
    // y los que tienen tipo dumplings/extras
    // aparezcan en esta pantalla.

    const perteneceAComida =
      producto.categoria === 'comida' ||
      producto.tipo === 'dumplings' ||
      producto.tipo === 'extras';


    // BUSCADOR

    const coincideBusqueda =
      producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());


    // FILTRO

    const coincideFiltro =
      filtro === 'todos' ||
      producto.tipo === filtro;


    return (
      perteneceAComida &&
      coincideBusqueda &&
      coincideFiltro
    );
  });


  // ====================================================
  // FAVORITOS
  // ====================================================

  const cambiarFavorito = (productoId: number) => {

    setFavoritos(prev => {

      if (prev.includes(productoId)) {

        return prev.filter(
          id => id !== productoId
        );

      }

      return [
        ...prev,
        productoId,
      ];
    });
  };


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <View style={styles.container}>


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <View style={styles.sidebar}>

        {/* LOGO */}

        <View style={styles.logoContainer}>

          <Image
            source={pompompurin}
            style={styles.logoImage}
          />

          <Text style={styles.logoText}>
            POMPOMPURIN
          </Text>

        </View>


        {/* INICIO */}

        <Pressable
          style={styles.sidebarButton}
          onPress={() =>
            navigation.navigate('Menu')
          }
        >

          <Image
            source={pompompurinHome}
            style={styles.sidebarImage}
          />

          <Text style={styles.sidebarText}>
            Inicio
          </Text>

        </Pressable>


        {/* COMIDA */}

        <Pressable
          style={[
            styles.sidebarButton,
            styles.sidebarButtonActive,
          ]}
        >

          <Image
            source={pompompurin2}
            style={styles.sidebarImage}
          />

          <Text
            style={[
              styles.sidebarText,
              styles.sidebarTextActive,
            ]}
          >
            Comida
          </Text>

        </Pressable>


        {/* BEBIDAS */}

        <Pressable
          style={styles.sidebarButton}
        >

          <Image
            source={pompompurinExtra}
            style={styles.sidebarImage}
          />

          <Text style={styles.sidebarText}>
            Bebidas
          </Text>

        </Pressable>


        {/* POSTRES */}

        <Pressable
          style={styles.sidebarButton}
        >

          <Image
            source={pompompurinWallpaper}
            style={styles.sidebarImage}
          />

          <Text style={styles.sidebarText}>
            Postres
          </Text>

        </Pressable>


        {/* ENTRADAS */}

        <Pressable
          style={styles.sidebarButton}
        >

          <Image
            source={pompompurin}
            style={styles.sidebarImage}
          />

          <Text style={styles.sidebarText}>
            Entradas
          </Text>

        </Pressable>

      </View>


      {/* =================================================
          CONTENIDO PRINCIPAL
      ================================================= */}

      <View style={styles.mainContent}>


        {/* HEADER */}

        <View style={styles.header}>

          <View>

            <Text style={styles.headerSmall}>
              RESTAURANTE
            </Text>

            <Text style={styles.headerTitle}>
              COMIDA
            </Text>

          </View>


          <Image
            source={pompompurin2}
            style={styles.headerImage}
          />

        </View>


        {/* =================================================
            BUSCADOR
        ================================================= */}

        <View style={styles.searchContainer}>

          <Text style={styles.searchIcon}>
            🔍
          </Text>

          <TextInput
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar comida..."
            placeholderTextColor="#9A7952"
            style={styles.searchInput}
          />

        </View>


        {/* =================================================
            FILTROS
        ================================================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={
            styles.filtersContainer
          }
        >


          {/* TODOS */}

          <Pressable
            style={[
              styles.filterButton,
              filtro === 'todos' &&
                styles.filterButtonActive,
            ]}
            onPress={() =>
              setFiltro('todos')
            }
          >

            <Text
              style={[
                styles.filterText,
                filtro === 'todos' &&
                  styles.filterTextActive,
              ]}
            >
              Todos
            </Text>

          </Pressable>


          {/* RAMEN */}

          <Pressable
            style={[
              styles.filterButton,
              filtro === 'ramen' &&
                styles.filterButtonActive,
            ]}
            onPress={() =>
              setFiltro('ramen')
            }
          >

            <Text
              style={[
                styles.filterText,
                filtro === 'ramen' &&
                  styles.filterTextActive,
              ]}
            >
              Ramen
            </Text>

          </Pressable>


          {/* SUSHI */}

          <Pressable
            style={[
              styles.filterButton,
              filtro === 'sushi' &&
                styles.filterButtonActive,
            ]}
            onPress={() =>
              setFiltro('sushi')
            }
          >

            <Text
              style={[
                styles.filterText,
                filtro === 'sushi' &&
                  styles.filterTextActive,
              ]}
            >
              Sushi
            </Text>

          </Pressable>


          {/* DUMPLINGS */}

          <Pressable
            style={[
              styles.filterButton,
              filtro === 'dumplings' &&
                styles.filterButtonActive,
            ]}
            onPress={() =>
              setFiltro('dumplings')
            }
          >

            <Text
              style={[
                styles.filterText,
                filtro === 'dumplings' &&
                  styles.filterTextActive,
              ]}
            >
              Dumplings
            </Text>

          </Pressable>


          {/* PLATOS FUERTES */}

          <Pressable
            style={[
              styles.filterButton,
              filtro === 'platos_fuertes' &&
                styles.filterButtonActive,
            ]}
            onPress={() =>
              setFiltro('platos_fuertes')
            }
          >

            <Text
              style={[
                styles.filterText,
                filtro === 'platos_fuertes' &&
                  styles.filterTextActive,
              ]}
            >
              Platos fuertes
            </Text>

          </Pressable>


          {/* EXTRAS */}

          <Pressable
            style={[
              styles.filterButton,
              filtro === 'extras' &&
                styles.filterButtonActive,
            ]}
            onPress={() =>
              setFiltro('extras')
            }
          >

            <Text
              style={[
                styles.filterText,
                filtro === 'extras' &&
                  styles.filterTextActive,
              ]}
            >
              Extras
            </Text>

          </Pressable>

        </ScrollView>


        {/* =================================================
            PRODUCTOS
        ================================================= */}

        <ScrollView
          style={styles.productsScroll}
          contentContainerStyle={
            styles.productsContainer
          }
          showsVerticalScrollIndicator={false}
        >

          {productosComida.length === 0 ? (

            <View style={styles.emptyProducts}>

              <Image
                source={pompompurin}
                style={styles.emptyImage}
              />

              <Text style={styles.emptyTitle}>
                No encontramos nada :(
              </Text>

              <Text style={styles.emptyText}>
                Intenta con otro filtro o búsqueda.
              </Text>

            </View>

          ) : (

            <View style={styles.productsGrid}>

              {productosComida.map(
                producto => (

                  <View
                    key={producto.id}
                    style={styles.productCard}
                  >


                    {/* IMAGEN */}

                    <View
                      style={
                        styles.productImageContainer
                      }
                    >

                      <Image
                        source={{
                          uri: producto.imagen,
                        }}
                        style={styles.productImage}
                      />

                    </View>


                    {/* FAVORITO */}

                    <Pressable
                      style={styles.favoriteButton}
                      onPress={() =>
                        cambiarFavorito(
                          producto.id
                        )
                      }
                    >

                      <Text
                        style={[
                          styles.favoriteText,
                          favoritos.includes(
                            producto.id
                          ) &&
                            styles.favoriteActive,
                        ]}
                      >
                        {favoritos.includes(
                          producto.id
                        )
                          ? '♥'
                          : '♡'}
                      </Text>

                    </Pressable>


                    {/* INFORMACIÓN */}

                    <View
                      style={
                        styles.productInfo
                      }
                    >

                      <Text
                        style={
                          styles.productName
                        }
                        numberOfLines={1}
                      >
                        {producto.nombre}
                      </Text>


                      <Text
                        style={
                          styles.productDescription
                        }
                        numberOfLines={2}
                      >
                        {producto.descripcion}
                      </Text>


                      <View
                        style={
                          styles.productBottom
                        }
                      >

                        <Text
                          style={
                            styles.productPrice
                          }
                        >
                          ${producto.precio}
                        </Text>


                        <Pressable
                          style={
                            styles.addButton
                          }
                          onPress={() =>
                            agregarAlCarrito(
                              producto
                            )
                          }
                        >

                          <Text
                            style={
                              styles.addButtonText
                            }
                          >
                            + Agregar
                          </Text>

                        </Pressable>

                      </View>

                    </View>

                  </View>

                )
              )}

            </View>

          )}

        </ScrollView>

      </View>

    </View>

  );
}


// ======================================================
// ESTILOS
// ======================================================

const styles = StyleSheet.create({

  // ====================================================
  // CONTENEDOR
  // ====================================================

  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF8E8',
  },


  // ====================================================
  // SIDEBAR
  // ====================================================

  sidebar: {
    width: 190,
    backgroundColor: '#FFF1C9',
    paddingVertical: 24,
    paddingHorizontal: 14,
    borderRightWidth: 1,
    borderRightColor: '#E4C98D',
  },


  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },


  logoImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },


  logoText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '900',
    color: '#754D25',
    textAlign: 'center',
  },


  sidebarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginBottom: 8,
  },


  sidebarButtonActive: {
    backgroundColor: '#E5BD63',
  },


  sidebarImage: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    marginRight: 10,
  },


  sidebarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#79552E',
  },


  sidebarTextActive: {
    color: '#FFFFFF',
  },


  // ====================================================
  // CONTENIDO
  // ====================================================

  mainContent: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 28,
    paddingTop: 24,
  },


  // ====================================================
  // HEADER
  // ====================================================

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E9C66B',
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 18,
  },


  headerSmall: {
    fontSize: 11,
    fontWeight: '800',
    color: '#765126',
    letterSpacing: 1,
  },


  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#603C19',
    marginTop: 2,
  },


  headerImage: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
  },


  // ====================================================
  // BUSCADOR
  // ====================================================

  searchContainer: {
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E1C98F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 15,
  },


  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },


  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#603C19',
    outlineStyle: 'none',
  } as any,


  // ====================================================
  // FILTROS
  // ====================================================

  filtersScroll: {
    flexGrow: 0,
    marginBottom: 15,
  },


  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 10,
  },


  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: '#F6E9CA',
    borderWidth: 1,
    borderColor: '#D8B873',
  },


  filterButtonActive: {
    backgroundColor: '#D8A63F',
    borderColor: '#D8A63F',
  },


  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#765126',
  },


  filterTextActive: {
    color: '#FFFFFF',
  },


  // ====================================================
  // PRODUCTOS
  // ====================================================

  productsScroll: {
    flex: 1,
  },


  productsContainer: {
    paddingBottom: 120,
  },


  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },


  productCard: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8D4A5',
    position: 'relative',
  },


  productImageContainer: {
    height: 165,
    backgroundColor: '#F9EED5',
  },


  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },


  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },


  favoriteText: {
    fontSize: 23,
    color: '#9C7952',
  },


  favoriteActive: {
    color: '#D89A42',
  },


  productInfo: {
    padding: 15,
  },


  productName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#5F3D1D',
    marginBottom: 6,
  },


  productDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: '#927452',
    minHeight: 35,
  },


  productBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },


  productPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#B17828',
  },


  addButton: {
    backgroundColor: '#D8A63F',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },


  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },


  // ====================================================
  // SIN PRODUCTOS
  // ====================================================

  emptyProducts: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },


  emptyImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },


  emptyTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '900',
    color: '#65431F',
  },


  emptyText: {
    marginTop: 5,
    fontSize: 13,
    color: '#967655',
  },

});


// ======================================================
// EXPORT
// ======================================================

export default CategoriaScreen;