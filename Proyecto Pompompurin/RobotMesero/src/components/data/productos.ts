export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'comida' | 'bebidas' | 'postres' | 'entradas';
  subcategoria?: 'alcohol' | 'sin_alcohol';

  // Filtros de comida
  tipo?: 'ramen' | 'sushi' | 'dumplings' | 'platos_fuertes' | 'extras';

  imagen: string;
};

export const productos: Producto[] = [

  // ==========================================
  // ENTRADAS
  // ==========================================

  {
    id: 1,
    nombre: 'Gyozas',
    descripcion: 'Empanaditas japonesas rellenas de carne y verduras.',
    precio: 85,
    categoria: 'entradas',
    tipo: 'dumplings',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 2,
    nombre: 'Takoyaki',
    descripcion: 'Bolitas japonesas rellenas de pulpo y cubiertas con salsa especial.',
    precio: 95,
    categoria: 'entradas',
    tipo: 'dumplings',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 3,
    nombre: 'Karaage',
    descripcion: 'Pollo japonés marinado y frito hasta quedar crujiente.',
    precio: 90,
    categoria: 'entradas',
    tipo: 'extras',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 4,
    nombre: 'Edamame',
    descripcion: 'Vainas de soya japonesa ligeramente sazonadas.',
    precio: 60,
    categoria: 'entradas',
    tipo: 'extras',
    imagen: 'https://placehold.co/300x300',
  },

  // ==========================================
  // COMIDA
  // ==========================================

  {
    id: 5,
    nombre: 'Ramen Tonkotsu',
    descripcion: 'Ramen con caldo cremoso, cerdo, huevo y cebollín.',
    precio: 165,
    categoria: 'comida',
    tipo: 'ramen',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 6,
    nombre: 'Ramen Miso',
    descripcion: 'Ramen en caldo de miso con cerdo, huevo y verduras.',
    precio: 155,
    categoria: 'comida',
    tipo: 'ramen',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 7,
    nombre: 'Yakisoba',
    descripcion: 'Fideos salteados con verduras, carne y salsa japonesa.',
    precio: 135,
    categoria: 'comida',
    tipo: 'platos_fuertes',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 8,
    nombre: 'Katsu Curry',
    descripcion: 'Cerdo empanizado acompañado de arroz y curry japonés.',
    precio: 155,
    categoria: 'comida',
    tipo: 'platos_fuertes',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 9,
    nombre: 'Donburi',
    descripcion: 'Arroz japonés acompañado de carne, verduras y salsa especial.',
    precio: 145,
    categoria: 'comida',
    tipo: 'platos_fuertes',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 10,
    nombre: 'Sushi Roll',
    descripcion: 'Roll de arroz, alga y relleno fresco al estilo de la casa.',
    precio: 140,
    categoria: 'comida',
    tipo: 'sushi',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 11,
    nombre: 'Udon',
    descripcion: 'Fideos gruesos japoneses en caldo con verduras y proteína.',
    precio: 145,
    categoria: 'comida',
    tipo: 'platos_fuertes',
    imagen: 'https://placehold.co/300x300',
  },

  // ==========================================
  // BEBIDAS SIN ALCOHOL
  // ==========================================

  {
    id: 12,
    nombre: 'Ramune',
    descripcion: 'Refresco japonés tradicional con botella de canica.',
    precio: 55,
    categoria: 'bebidas',
    subcategoria: 'sin_alcohol',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 13,
    nombre: 'Té Verde',
    descripcion: 'Té verde japonés servido frío o caliente.',
    precio: 45,
    categoria: 'bebidas',
    subcategoria: 'sin_alcohol',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 14,
    nombre: 'Té de Jazmín',
    descripcion: 'Té aromático de jazmín con un sabor floral y ligero.',
    precio: 50,
    categoria: 'bebidas',
    subcategoria: 'sin_alcohol',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 15,
    nombre: 'Matcha Latte',
    descripcion: 'Matcha japonés preparado con leche cremosa.',
    precio: 70,
    categoria: 'bebidas',
    subcategoria: 'sin_alcohol',
    imagen: 'https://placehold.co/300x300',
  },

  // ==========================================
  // BEBIDAS CON ALCOHOL
  // ==========================================

  {
    id: 16,
    nombre: 'Sake',
    descripcion: 'Bebida japonesa tradicional elaborada a base de arroz.',
    precio: 120,
    categoria: 'bebidas',
    subcategoria: 'alcohol',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 17,
    nombre: 'Soju',
    descripcion: 'Bebida alcohólica coreana de sabor suave.',
    precio: 110,
    categoria: 'bebidas',
    subcategoria: 'alcohol',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 18,
    nombre: 'Cerveza Japonesa',
    descripcion: 'Cerveza japonesa fría y refrescante.',
    precio: 85,
    categoria: 'bebidas',
    subcategoria: 'alcohol',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 19,
    nombre: 'Cerveza Coreana',
    descripcion: 'Cerveza lager coreana de sabor ligero.',
    precio: 80,
    categoria: 'bebidas',
    subcategoria: 'alcohol',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 20,
    nombre: 'Cóctel de Sake',
    descripcion: 'Cóctel preparado con sake y sabores frutales.',
    precio: 130,
    categoria: 'bebidas',
    subcategoria: 'alcohol',
    imagen: 'https://placehold.co/300x300',
  },

  // ==========================================
  // POSTRES
  // ==========================================

  {
    id: 21,
    nombre: 'Mochi',
    descripcion: 'Dulce japonés de arroz con relleno suave y cremoso.',
    precio: 65,
    categoria: 'postres',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 22,
    nombre: 'Taiyaki',
    descripcion: 'Pastel japonés en forma de pez relleno de dulce.',
    precio: 60,
    categoria: 'postres',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 23,
    nombre: 'Dorayaki',
    descripcion: 'Panqueques japoneses rellenos de pasta dulce de frijol rojo.',
    precio: 65,
    categoria: 'postres',
    imagen: 'https://placehold.co/300x300',
  },

  {
    id: 24,
    nombre: 'Helado de Matcha',
    descripcion: 'Helado cremoso elaborado con matcha japonés.',
    precio: 70,
    categoria: 'postres',
    imagen: 'https://placehold.co/300x300',
  },
];