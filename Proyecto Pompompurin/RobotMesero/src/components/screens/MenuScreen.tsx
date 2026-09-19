import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CartIsland from '../CartIsland';

import pompompurinHeader from '../assets/gifs/pom-pom-purin-pompompurin.webp';
import pompompurinSpinning from '../assets/gifs/pom-pom-purin-spinning.gif';
import pompompurinDrink from '../assets/gifs/pompompurin.webp';
import pompompurinSleeping from '../assets/gifs/pom-pom-purin-sleeping.gif';

function MenuScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image source={pompompurinHeader} style={styles.headerGif} resizeMode="contain" />
          <View style={styles.headerText}>
            <Text style={styles.title}>MENÚ</Text>
            <Text style={styles.restaurant}>Restaurante Pompompurin</Text>
            <Text style={styles.welcome}>¡Bienvenido! ♡</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Pressable style={({ pressed }) => [styles.menuButton, styles.foodButton, pressed && styles.pressed]} onPress={() => navigation.navigate('Categoria' as never, { categoria: 'comida' } as never)}>
            <View style={styles.gifBox}><Image source={pompompurinSpinning} style={styles.categoryGif} resizeMode="contain" /></View>
            <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>COMIDA</Text><Text style={styles.description}>Ramen, sushi, yakisoba y más</Text></View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.menuButton, styles.drinkButton, pressed && styles.pressed]} onPress={() => navigation.navigate('Categoria' as never, { categoria: 'bebidas' } as never)}>
            <View style={styles.gifBox}><Image source={pompompurinDrink} style={styles.categoryGif} resizeMode="contain" /></View>
            <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>BEBIDAS</Text><Text style={styles.description}>Refrescos, té, sake, soju y más</Text></View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.menuButton, styles.dessertButton, pressed && styles.pressed]} onPress={() => navigation.navigate('Categoria' as never, { categoria: 'postres' } as never)}>
            <View style={styles.gifBox}><Image source={pompompurinSleeping} style={styles.categoryGif} resizeMode="contain" /></View>
            <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>POSTRES</Text><Text style={styles.description}>Mochi, taiyaki, matcha y más</Text></View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.menuButton, styles.entryButton, pressed && styles.pressed]} onPress={() => navigation.navigate('Categoria' as never, { categoria: 'entradas' } as never)}>
            <View style={styles.gifBox}><Image source={pompompurinHeader} style={styles.categoryGif} resizeMode="contain" /></View>
            <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>ENTRADAS</Text><Text style={styles.description}>Gyozas, takoyaki, karaage y más</Text></View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Text style={styles.decoration}>✦  ✿  ♡  ✿  ✦</Text>
        <View style={styles.bottomPurin}><Image source={pompompurinDrink} style={styles.bottomPurinGif} resizeMode="contain" /></View>
        <View style={styles.bottomSpace} />
      </ScrollView>

      <CartIsland />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative', backgroundColor: '#FFF7DF' },
  scrollContent: { alignItems: 'center', paddingTop: 30, paddingBottom: 150 },
  header: { width: '82%', minHeight: 170, backgroundColor: '#FFE58A', borderWidth: 4, borderColor: '#8B5E3C', borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, shadowColor: '#6B4226', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.28, shadowRadius: 0, elevation: 7 },
  headerGif: { width: 115, height: 135 },
  headerText: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 43, fontWeight: '900', color: '#6B4226', letterSpacing: 4 },
  restaurant: { marginTop: 4, fontSize: 19, fontWeight: '800', color: '#704A2C' },
  welcome: { marginTop: 7, fontSize: 16, color: '#8B5E3C' },
  menuContainer: { width: '82%', marginTop: 28 },
  menuButton: { width: '100%', height: 105, marginBottom: 17, borderWidth: 4, borderColor: '#8B5E3C', borderRadius: 28, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, shadowColor: '#6B4226', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.22, shadowRadius: 0, elevation: 6 },
  foodButton: { backgroundColor: '#FFD6A5' },
  drinkButton: { backgroundColor: '#BDE0FE' },
  dessertButton: { backgroundColor: '#FFC8DD' },
  entryButton: { backgroundColor: '#CDEAC0' },
  pressed: { transform: [{ scale: 0.97 }] },
  gifBox: { width: 85, height: 85, justifyContent: 'center', alignItems: 'center' },
  categoryGif: { width: 82, height: 82 },
  buttonTextContainer: { flex: 1, justifyContent: 'center', paddingLeft: 8 },
  buttonText: { fontSize: 27, fontWeight: '900', color: '#6B4226', letterSpacing: 1 },
  description: { fontSize: 13, color: '#805536', marginTop: 4 },
  arrow: { fontSize: 34, color: '#704A2C', paddingHorizontal: 8 },
  decoration: { marginTop: 2, marginBottom: 18, fontSize: 21, color: '#B48658', letterSpacing: 5 },
  bottomPurin: { width: '100%', height: 65, justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  bottomPurinGif: { width: 230, height: 55 },
  bottomSpace: { height: 20 },
});

export default MenuScreen;
