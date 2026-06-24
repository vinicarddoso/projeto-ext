import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar, Image } from "react-native";
import { styles } from "../styles";

const INITIAL_ITEMS = [
  { id: 1, name: "Body Splash Vanilla", variant: "100 ml · Pele", price: 149.90, qty: 1, image: require("../assets/splashVanilla.png") },
  { id: 2, name: "Máscara Volume Extreme", variant: "9 g · Preto intenso", price: 64.9, qty: 2, image: require("../assets/mExtreme.png") },
  { id: 3, name: "Primer Fixador de Cílios", variant: "8 ml · Universal", price: 49.9, qty: 1, image: require("../assets/primerFixador.png") },
];

const VALID_COUPON = "LASH10";
const DISCOUNT_RATE = 0.1;
const FREE_SHIPPING_THRESHOLD = 300;
const SHIPPING_COST = 14.9;

function fmt(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function CartItem({ item, onChangeQty, onRemove }) {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemImg}>
        <Image
          source={item.image}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemVariant}>{item.variant}</Text>

        <View style={styles.itemActions}>
          <View style={styles.qtyCtrl}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => onChangeQty(item.id, -1)}
              accessibilityLabel="Diminuir quantidade"
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyVal}>{item.qty}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => onChangeQty(item.id, 1)}
              accessibilityLabel="Aumentar quantidade"
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item.id)}>
            <Text style={styles.removeBtnText}>🗑 Remover</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.itemPrice}>{fmt(item.qty * item.price)}</Text>
    </View>
  );
}

function OrderSummary({ subtotal, discount, promoApplied, onApplyPromo }) {
  const [coupon, setCoupon] = useState("");
  const [promoMsg, setPromoMsg] = useState(null);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal - discount + shipping;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  function handleApply() {
    if (!coupon.trim()) {
      setPromoMsg({ text: "Insira um código de cupom.", ok: false });
      return;
    }
    if (coupon.trim().toUpperCase() === VALID_COUPON) {
      setPromoMsg({ text: "✓ Cupom aplicado — 10% de desconto", ok: true });
      onApplyPromo(true);
    } else {
      setPromoMsg({ text: "Cupom inválido ou expirado.", ok: false });
      onApplyPromo(false);
    }
  }

  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Resumo do pedido</Text>

      <View style={styles.promoRow}>
        <TextInput
          style={styles.promoInput}
          placeholder="Cupom de desconto"
          placeholderTextColor="#B4B2A9"
          value={coupon}
          onChangeText={setCoupon}
          onSubmitEditing={handleApply}
          autoCapitalize="characters"
          accessibilityLabel="Cupom de desconto"
        />
        <TouchableOpacity style={styles.promoBtn} onPress={handleApply}>
          <Text style={styles.promoBtnText}>Aplicar</Text>
        </TouchableOpacity>
      </View>

      {promoMsg && (
        <Text style={[styles.promoMsg, { color: promoMsg.ok ? "#0F6E56" : "#A32D2D" }]}>
          {promoMsg.text}
        </Text>
      )}

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>{fmt(subtotal)}</Text>
      </View>

      {promoApplied && (
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: "#0F6E56" }]}>Desconto ({VALID_COUPON})</Text>
          <Text style={[styles.summaryValue, { color: "#0F6E56" }]}>− {fmt(discount)}</Text>
        </View>
      )}

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Frete</Text>
        <Text style={styles.summaryValue}>{shipping === 0 ? "Grátis" : fmt(shipping)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryTotalLabel}>Total</Text>
        <Text style={styles.summaryTotalValue}>{fmt(total)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.8}>
        <Text style={styles.checkoutBtnText}>Finalizar compra</Text>
      </TouchableOpacity>

      <Text style={styles.freeShip}>
        {shipping === 0 ? (
          <Text>
            <Text style={{ color: "#0F6E56", fontWeight: "600" }}>Frete grátis</Text>
            {" "}aplicado ao seu pedido!
          </Text>
        ) : (
          <Text>
            Faltam{" "}
            <Text style={{ color: "#0F6E56", fontWeight: "600" }}>{fmt(remaining)}</Text>
            {" "}para frete grátis
          </Text>
        )}
      </Text>
    </View>
  );
}

export default function RMLashCart() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [promoApplied, setPromoApplied] = useState(false);

  function changeQty(id, delta) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const discount = promoApplied ? Math.round(subtotal * DISCOUNT_RATE * 100) / 100 : 0;
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F8F6" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.brand}>RM Lash</Text>
        <Text style={styles.pageTitle}>Meu carrinho</Text>
        <Text style={styles.itemCount}>
          {totalItems} {totalItems === 1 ? "item" : "itens"}
        </Text>

        {items.length === 0 ? (
          <View style={stylesCart.emptyState}>
            <Text style={styles.emptyIcon}>🛍️</Text>
            <Text style={stylesCart.emptyText}>Seu carrinho está vazio.</Text>
          </View>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onChangeQty={changeQty}
              onRemove={removeItem}
            />
          ))
        )}

        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueBtnText}>← Continuar comprando</Text>
        </TouchableOpacity>

        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          promoApplied={promoApplied}
          onApplyPromo={setPromoApplied}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
