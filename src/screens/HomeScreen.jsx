import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { styles } from '../styles';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.promoBanner}>

      <TextTicker
        duration={5000}
        loop
        bounce={false}
      >
        🎉 10% OFF no PIX • 🚚 Entrega rápida • 💳 Até 5x sem juros • 🎁 Promoções toda semana
      </TextTicker>
      </View>

            <Text style={styles.title}>
              PRODUTOS EM DESTAQUE
            </Text>

            <View style={styles.product}>
              <Text style={styles.productName}>Cílio Volume Russo</Text>
              <Text style={styles.price}>R$ 39,90</Text>
            </View>

            <View style={styles.product} alignItems="center">
              <Text style={styles.productName}>Body Splash Vanilla</Text>
              <Text style={styles.price}>R$ 29,90</Text>
            </View>

          </ScrollView>
        );
      }