import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const pompompurin = require('../assets/gifs/pom-pom-purin-pompompurin.webp');

type Role = 'admin' | 'user';

const credentials: Record<Role, string> = {
  admin: 'admin123',
  user: 'user123',
};

function LoginScreen() {
  const navigation = useNavigation<any>();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const iniciarSesion = () => {
    const nombreUsuario = usuario.trim().toLowerCase();
    const role: Role | null = nombreUsuario === 'admin'
      ? 'admin'
      : nombreUsuario === 'user'
        ? 'user'
        : null;

    if (!role || contrasena !== credentials[role]) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }

    setError('');
    navigation.replace(role === 'admin' ? 'Cocina' : 'Menu');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Image source={pompompurin} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>Inicia sesión en Pompompurin</Text>

        <TextInput
          value={usuario}
          onChangeText={setUsuario}
          placeholder="Usuario (Admin o user)"
          placeholderTextColor="#9A7952"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={contrasena}
          onChangeText={setContrasena}
          placeholder="Contraseña"
          placeholderTextColor="#9A7952"
          secureTextEntry
          style={styles.input}
          onSubmitEditing={iniciarSesion}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={iniciarSesion}
        >
          <Text style={styles.buttonText}>ENTRAR ♡</Text>
        </Pressable>

        <Text style={styles.help}>Admin: admin123  ·  user: user123</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7DF',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 430,
    alignItems: 'center',
    padding: 28,
    backgroundColor: '#FFE58A',
    borderWidth: 4,
    borderColor: '#8B5E3C',
    borderRadius: 30,
    shadowColor: '#6B4226',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.25,
    elevation: 7,
  },
  image: {
    width: 150,
    height: 130,
  },
  title: {
    marginTop: 4,
    fontSize: 32,
    fontWeight: '900',
    color: '#6B4226',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 22,
    fontSize: 16,
    color: '#805536',
  },
  input: {
    width: '100%',
    height: 48,
    marginBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFDF5',
    borderWidth: 2,
    borderColor: '#C49A5A',
    borderRadius: 15,
    color: '#603C19',
    fontSize: 15,
  },
  error: {
    marginBottom: 10,
    color: '#A33D3D',
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 4,
    backgroundColor: '#D8A63F',
    borderWidth: 2,
    borderColor: '#8A5A32',
    borderRadius: 15,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  help: {
    marginTop: 18,
    color: '#805536',
    fontSize: 12,
  },
});

export default LoginScreen;
