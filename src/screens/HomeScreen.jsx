import { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView, StatusBar, FlatList,
} from "react-native";

const CATEGORIES = ["Todos", "Cílios", "Sobrancelhas", "Pele", "Kits"];

const PRODUCTS = [
  { id: 1, name: "Sérum Lash Growth", category: "Cílios", price: 89.9, icon: "💧", tag: "Mais vendido" },
  { id: 2, name: "Máscara Volume Extreme", category: "Cílios", price: 64.9, icon: "✨", tag: null },
  { id: 3, name: "Primer Fixador de Cílios", category: "Cílios", price: 49.9, icon: "👁️", tag: null },
  { id: 4, name: "Gel para Sobrancelhas", category: "Sobrancelhas", price: 39.9, icon: "🌿", tag: "Novo" },
  { id: 5, name: "Henna Natural Brow", category: "Sobrancelhas", price: 74.9, icon: "🍂", tag: null },
  { id: 6, name: "Sérum Iluminador Facial", category: "Pele", price: 119.9, icon: "🌟", tag: "Novo" },
  { id: 7, name: "Kit Lash Completo", category: "Kits", price: 199.9, icon: "🎁", tag: "Oferta" },
  { id: 8, name: "Kit Brow & Lash", category: "Kits", price: 149.9, icon: "💼", tag: null },
];

function fmt(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function HomeScreen({ user, cartCount, onAddToCart, onNavigateToCart }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [addedId, setAddedId] = useState(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "Todos" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleAdd(product) {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  }

  const firstName = user?.name ? user.name.split(" ")[0] : "você";

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F8F6" />

      <View style={s.header}>
        <View>
          <Text style={s.brand}>RM Lash</Text>
          <Text style={s.headerSub}>Olá, {firstName} 👋</Text>
        </View>
        <TouchableOpacity style={s.cartBtn} onPress={onNavigateToCart} accessibilityLabel="Ir para o carrinho">
          <Text style={s.cartIcon}>🛍️</Text>
          {cartCount > 0 && (
            <View style={s.badge}>
              <Text style={s.badgeText}>{cartCount > 9 ? "9+" : cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={s.searchWrap}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Buscar produto..."
          placeholderTextColor="#B4B2A9"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          accessibilityLabel="Buscar produto"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Text style={s.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.categoriesRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat} style={[s.catChip, activeCategory === cat && s.catChipActive]} onPress={() => setActiveCategory(cat)}>
            <Text style={[s.catChipText, activeCategory === cat && s.catChipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={s.resultsRow}>
        <Text style={s.resultsLabel}>{filtered.length} {filtered.length === 1 ? "produto" : "produtos"}</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={s.gridRow}
        contentContainerStyle={s.gridContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={s.emptyState}>
            <Text style={s.emptyIcon}>🔍</Text>
            <Text style={s.emptyText}>Nenhum produto encontrado.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const justAdded = addedId === item.id;
          return (
            <View style={s.productCard}>
              <View style={s.productImgWrap}>
                <Text style={s.productIcon}>{item.icon}</Text>
                {item.tag && (
                  <View style={[s.tagBadge, item.tag === "Oferta" && s.tagBadgeOffer, item.tag === "Novo" && s.tagBadgeNew]}>
                    <Text style={[s.tagText, item.tag === "Oferta" && s.tagTextOffer, item.tag === "Novo" && s.tagTextNew]}>
                      {item.tag}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={s.productCat}>{item.category}</Text>
              <Text style={s.productName} numberOfLines={2}>{item.name}</Text>
              <View style={s.productFooter}>
                <Text style={s.productPrice}>{fmt(item.price)}</Text>
                <TouchableOpacity
                  style={[s.addBtn, justAdded && s.addBtnDone]}
                  onPress={() => handleAdd(item)}
                  accessibilityLabel={`Adicionar ${item.name} ao carrinho`}
                >
                  <Text style={s.addBtnText}>{justAdded ? "✓" : "+"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9F8F6" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  brand: { fontSize: 11, letterSpacing: 3, color: "#888780", textTransform: "uppercase" },
  headerSub: { fontSize: 18, fontWeight: "500", color: "#1a1a18", marginTop: 2 },
  cartBtn: { position: "relative", padding: 4 },
  cartIcon: { fontSize: 24 },
  badge: { position: "absolute", top: 0, right: 0, backgroundColor: "#2C2C2A", borderRadius: 8, minWidth: 16, height: 16, alignItems: "center", justifyContent: "center", paddingHorizontal: 3 },
  badgeText: { fontSize: 9, color: "#F1EFE8", fontWeight: "600" },
  searchWrap: { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 14, backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#D3D1C7", borderRadius: 10, paddingHorizontal: 12, height: 42 },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: "#1a1a18", height: "100%" },
  clearBtn: { fontSize: 14, color: "#B4B2A9", paddingLeft: 8 },
  categoriesRow: { paddingHorizontal: 20, paddingBottom: 4, gap: 8 },
  catChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 0.5, borderColor: "#D3D1C7", backgroundColor: "#ffffff" },
  catChipActive: { backgroundColor: "#2C2C2A", borderColor: "#2C2C2A" },
  catChipText: { fontSize: 13, color: "#5F5E5A" },
  catChipTextActive: { color: "#F1EFE8", fontWeight: "500" },
  resultsRow: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 8 },
  resultsLabel: { fontSize: 12, color: "#888780" },
  gridContent: { paddingHorizontal: 20, paddingBottom: 16 },
  gridRow: { gap: 10, marginBottom: 10 },
  productCard: { flex: 1, backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#D3D1C7", borderRadius: 12, padding: 14 },
  productImgWrap: { height: 72, backgroundColor: "#F1EFE8", borderRadius: 8, alignItems: "center", justifyContent: "center", marginBottom: 10, position: "relative" },
  productIcon: { fontSize: 28 },
  tagBadge: { position: "absolute", top: 6, right: 6, backgroundColor: "#F1EFE8", borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2 },
  tagBadgeOffer: { backgroundColor: "#FAECE7" },
  tagBadgeNew: { backgroundColor: "#E1F5EE" },
  tagText: { fontSize: 9, fontWeight: "600", color: "#5F5E5A", letterSpacing: 0.4 },
  tagTextOffer: { color: "#993C1D" },
  tagTextNew: { color: "#0F6E56" },
  productCat: { fontSize: 10, color: "#B4B2A9", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 },
  productName: { fontSize: 13, fontWeight: "500", color: "#1a1a18", lineHeight: 18, marginBottom: 10, minHeight: 36 },
  productFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  productPrice: { fontSize: 13, fontWeight: "500", color: "#1a1a18" },
  addBtn: { width: 28, height: 28, backgroundColor: "#2C2C2A", borderRadius: 7, alignItems: "center", justifyContent: "center" },
  addBtnDone: { backgroundColor: "#0F6E56" },
  addBtnText: { color: "#F1EFE8", fontSize: 18, lineHeight: 22 },
  emptyState: { alignItems: "center", paddingVertical: 48 },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyText: { fontSize: 14, color: "#888780" },
});