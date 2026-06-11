import React from 'react';
import {View,Text,TextInput,ScrollView,TouchableOpacity,StyleSheet} from 'react-native';
import TextTicker from 'react-native-text-ticker';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      
<View
  style={{
    backgroundColor: "#F8D7E5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  }}
>

<TextTicker
  duration={5000}
  loop
  bounce={false}
>
  🎉 10% OFF no PIX • 🚚 Entrega rápida • 💳 Até 5x sem juros • 🎁 Promoções toda semana
</TextTicker>
</View>

      <Text style={styles.title}>
        Categorias
      </Text>

      <TouchableOpacity style={styles.category}>
        <Text>Extensão de Cílios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.category}>
        <Text>Body Splash</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.category}>
        <Text>Kits</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.category}>
        <Text>Acessórios</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        Produtos em Destaque
      </Text>

      <View style={styles.product}>
        <Text>Cílio Volume Russo</Text>
        <Text>R$ 39,90</Text>
      </View>

      <View style={styles.product}>
        <Text>Body Splash Vanilla</Text>
        <Text>R$ 29,90</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  search: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  category: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },

  product: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  }
});