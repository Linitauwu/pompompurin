import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { productos } from '../data/productos';
import { useCart } from '../context/CartContext';

const pompompurin = require('../assets/gifs/pompompurin.webp');
const pompompurin2 = require('../assets/gifs/pom-pom-purin-pompompurin.webp');
const pompompurinHome = require('../assets/gifs/Home _ X.png');
const pompompurinWallpaper = require('../assets/gifs/Pompompurin wallpaper.png');
const pompompurinExtra = require('../assets/gifs/descarga (44).png');

type Categoria = 'comida' | 'bebidas' | 'postres' | 'entradas';
type Filtro = 'todos' | 'ramen' | 'sushi' | 'dumplings' | 'platos_fuertes' | 'extras' | 'sin_alcohol' | 'alcohol';

type RouteParams = {
  categoria?: Categoria;
};

const configuracion: Record<Categoria, {
  titulo: string;
  busqueda: string;
  filtros: { valor: Filtro; texto: string }[];
}> = {
  comida: {
    titulo: 'COMIDA',
    busqueda: 'Buscar comida...',
    filtros: [
      { valor: 'todos', texto: 'Todos' },
      { valor: 'ramen', texto: 'Ramen' },
      { valor: 'sushi', texto: 'Sushi' },
      { valor: 'dumplings', texto: 'Dumplings' },
      { valor: 'platos_fuertes', texto: 'Platos fuertes' },
      { valor: 'extras', texto: 'Extras' },
    ],
  },
  bebidas: {
    titulo: 'BEBIDAS',
    busqueda: 'Buscar bebida...',
    filtros: [
      { valor: 'todos', texto: 'Todas' },
      { valor: 'sin_alcohol', texto: 'Sin alcohol' },
      { valor: 'alcohol', texto: 'Con alcohol' },
    ],
  },
  postres: {
    titulo: 'POSTRES',
    busqueda: 'Buscar postre...',
    filtros: [{ valor: 'todos', texto: 'Todos' }],
  },
  entradas: {
    titulo: 'ENTRADAS',
    busqueda: 'Buscar entrada...',
    filtros: [{ valor: 'todos', texto: 'Todas' }],
  },
};

function CategoriaScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { agregarAlCarrito } = useCart();
  const categoria: Categoria = route.params?.categoria || 'comida';
  const actual = configuracion[categoria];
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const productosDeCategoria = useMemo(() => productos.filter(producto => {
    const coincideCategoria = producto.categoria === categoria;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFiltro = filtro === 'todos'
      || producto.tipo === filtro
      || producto.subcategoria === filtro;
    return coincideCategoria && coincideBusqueda && coincideFiltro;
  }), [categoria, busqueda, filtro]);

  const cambiarCategoria = (nuevaCategoria: Categoria) => {
    setBusqueda('');
    setFiltro('todos');
    navigation.navigate('Categoria', { categoria: nuevaCategoria });
  };

  const cambiarFavorito = (productoId: number) => {
    setFavoritos(prev => prev.includes(productoId)
      ? prev.filter(id => id !== productoId)
      : [...prev, productoId]);
  };

  const opcionesSidebar: { categoria?: Categoria; texto: string; imagen: any }[] = [
    { texto: 'Inicio', imagen: pompompurinHome },
    { categoria: 'comida', texto: 'Comida', imagen: pompompurin2 },
    { categoria: 'bebidas', texto: 'Bebidas', imagen: pompompurinExtra },
    { categoria: 'postres', texto: 'Postres', imagen: pompompurinWallpaper },
    { categoria: 'entradas', texto: 'Entradas', imagen: pompompurin },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <Image source={pompompurin} style={styles.logoImage} />
          <Text style={styles.logoText}>POMPOMPURIN</Text>
        </View>

        {opcionesSidebar.map(opcion => {
          const esInicio = !opcion.categoria;
          const activo = opcion.categoria === categoria;
          return (
            <Pressable
              key={opcion.texto}
              style={[styles.sidebarButton, activo && styles.sidebarButtonActive]}
              onPress={() => esInicio
                ? navigation.navigate('Menu')
                : cambiarCategoria(opcion.categoria as Categoria)}
            >
              <Image source={opcion.imagen} style={styles.sidebarImage} />
              <Text style={[styles.sidebarText, activo && styles.sidebarTextActive]}>
                {opcion.texto}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSmall}>RESTAURANTE</Text>
            <Text style={styles.headerTitle}>{actual.titulo}</Text>
          </View>
          <Image source={pompompurin2} style={styles.headerImage} />
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder={actual.busqueda}
            placeholderTextColor="#9A7952"
            style={styles.searchInput}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filtersContainer}>
          {actual.filtros.map(opcion => (
            <Pressable
              key={opcion.valor}
              style={[styles.filterButton, filtro === opcion.valor && styles.filterButtonActive]}
              onPress={() => setFiltro(opcion.valor)}
            >
              <Text style={[styles.filterText, filtro === opcion.valor && styles.filterTextActive]}>
                {opcion.texto}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView style={styles.productsScroll} contentContainerStyle={styles.productsContainer} showsVerticalScrollIndicator={false}>
          {productosDeCategoria.length === 0 ? (
            <View style={styles.emptyProducts}>
              <Image source={pompompurin} style={styles.emptyImage} />
              <Text style={styles.emptyTitle}>No encontramos nada :(</Text>
              <Text style={styles.emptyText}>Intenta con otro filtro o búsqueda.</Text>
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {productosDeCategoria.map(producto => (
                <View key={producto.id} style={styles.productCard}>
                  <View style={styles.productImageContainer}>
                    <Image source={{ uri: producto.imagen }} style={styles.productImage} />
                  </View>
                  <Pressable style={styles.favoriteButton} onPress={() => cambiarFavorito(producto.id)}>
                    <Text style={[styles.favoriteText, favoritos.includes(producto.id) && styles.favoriteActive]}>
                      {favoritos.includes(producto.id) ? '♥' : '♡'}
                    </Text>
                  </Pressable>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>{producto.nombre}</Text>
                    <Text style={styles.productDescription} numberOfLines={2}>{producto.descripcion}</Text>
                    <View style={styles.productBottom}>
                      <Text style={styles.productPrice}>${producto.precio}</Text>
                      <Pressable style={styles.addButton} onPress={() => agregarAlCarrito(producto)}>
                        <Text style={styles.addButtonText}>+ Agregar</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#FFF8E8' },
  sidebar: { width: 190, backgroundColor: '#FFF1C9', paddingVertical: 24, paddingHorizontal: 14, borderRightWidth: 1, borderRightColor: '#E4C98D' },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  logoImage: { width: 70, height: 70, resizeMode: 'contain' },
  logoText: { marginTop: 5, fontSize: 13, fontWeight: '900', color: '#754D25', textAlign: 'center' },
  sidebarButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 14, marginBottom: 8 },
  sidebarButtonActive: { backgroundColor: '#E5BD63' },
  sidebarImage: { width: 34, height: 34, resizeMode: 'contain', marginRight: 10 },
  sidebarText: { fontSize: 14, fontWeight: '700', color: '#79552E' },
  sidebarTextActive: { color: '#FFFFFF' },
  mainContent: { flex: 1, minWidth: 0, paddingHorizontal: 28, paddingTop: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E9C66B', borderRadius: 22, paddingHorizontal: 24, paddingVertical: 15, marginBottom: 18 },
  headerSmall: { fontSize: 11, fontWeight: '800', color: '#765126', letterSpacing: 1 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: '#603C19', marginTop: 2 },
  headerImage: { width: 72, height: 72, resizeMode: 'contain' },
  searchContainer: { height: 46, backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#E1C98F', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginBottom: 15 },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#603C19', outlineStyle: 'none' } as any,
  filtersScroll: { flexGrow: 0, marginBottom: 15 },
  filtersContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingRight: 10 },
  filterButton: { paddingVertical: 9, paddingHorizontal: 18, borderRadius: 22, backgroundColor: '#F6E9CA', borderWidth: 1, borderColor: '#D8B873' },
  filterButtonActive: { backgroundColor: '#D8A63F', borderColor: '#D8A63F' },
  filterText: { fontSize: 14, fontWeight: '700', color: '#765126' },
  filterTextActive: { color: '#FFFFFF' },
  productsScroll: { flex: 1 },
  productsContainer: { paddingBottom: 120 },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  productCard: { width: 250, backgroundColor: '#FFFFFF', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#E8D4A5', position: 'relative' },
  productImageContainer: { height: 165, backgroundColor: '#F9EED5' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  favoriteButton: { position: 'absolute', top: 10, right: 10, width: 38, height: 38, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  favoriteText: { fontSize: 23, color: '#9C7952' },
  favoriteActive: { color: '#D89A42' },
  productInfo: { padding: 15 },
  productName: { fontSize: 17, fontWeight: '900', color: '#5F3D1D', marginBottom: 6 },
  productDescription: { fontSize: 12, lineHeight: 17, color: '#927452', minHeight: 35 },
  productBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  productPrice: { fontSize: 18, fontWeight: '900', color: '#B17828' },
  addButton: { backgroundColor: '#D8A63F', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  addButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  emptyProducts: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyImage: { width: 120, height: 120, resizeMode: 'contain' },
  emptyTitle: { marginTop: 10, fontSize: 20, fontWeight: '900', color: '#65431F' },
  emptyText: { marginTop: 5, fontSize: 13, color: '#967655' },
});

export default CategoriaScreen;
