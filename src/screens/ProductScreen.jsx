import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { styles } from '../styles';

export default function ProductScreen({ route }) {
  const category = route?.params?.category || "Produtos";

  // FIREBASE: Esta lista de produtos será substituída
  // pelos dados vindos da coleção "products" do Firestore.
  const products = [
    {
      id: "1",
      name: "Cílio Volume Russo",
      price: 39.9,
      category: "Extensão de Cílios",
    },
    {
      id: "2",
      name: "Cílio 3D",
      price: 29.9,
      category: "Extensão de Cílios",
    },
    {
      id: "3",
      name: "Body Splash Vanilla",
      price: 24.9,
      category: "Body Splash",
    },
    {
      id: "4",
      name: "Kit Lash Premium",
      price: 89.9,
      category: "Kits",
    },
  ];

  // FIREBASE: Este filtro provavelmente continuará igual.
  // Apenas filtrará os produtos recebidos do Firestore.
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  const renderItem = ({ item }) => (
    // FIREBASE: Futuramente pode navegar para ProductScreen
    // enviando o ID do produto.
    <TouchableOpacity style={styles.product}>
      
      {/* FIREBASE: Substituir este placeholder pela imagem
          armazenada no Firestore ou Storage. */}
      <View style={styles.imagePlaceholder}>
        <Text>Imagem</Text>
      </View>

      {/* FIREBASE: O nome virá do banco de dados */}
      <Text style={styles.productName}>
        {item.name}
      </Text>

      {/* FIREBASE: O preço virá do banco de dados */}
      <Text style={styles.price}>
        R$ {item.price.toFixed(2)}
      </Text>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* FIREBASE: A categoria continuará vindo da navegação */}
      <Text style={styles.title}>
        {category}
      </Text>

      {/* FIREBASE: A FlatList continuará igual.
          Apenas receberá produtos carregados do Firestore. */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}