import { useState } from "react";
import { View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import BottomNav from "./src/components/BottomNav";
import { styles } from "./src/styles";

// Estado global compartilhado entre as telas (sem biblioteca externa)
export default function App() {
  const [screen, setScreen] = useState("menu"); // "login" | "menu" | "cart"
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  function handleLogin(userData) {
    setUser(userData);
    setScreen("menu");
  }

  function handleLogout() {
    setUser(null);
    setCartItems([]);
    setScreen("login");
  }

  function addToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1, variant: `${product.category}` }];
    });
  }

  function changeQty(id, delta) {
    setCartItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  }

  function removeItem(id) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  if (screen === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {screen === "menu" && (
          <HomeScreen
            user={user}
            cartCount={cartCount}
            onAddToCart={addToCart}
            onNavigateToCart={() => setScreen("cart")}
          />
        )}
        {screen === "cart" && (
          <CartScreen
            items={cartItems}
            onChangeQty={changeQty}
            onRemoveItem={removeItem}
            onContinueShopping={() => setScreen("menu")}
          />
        )}
      </View>

      <BottomNav
        activeScreen={screen}
        cartCount={cartCount}
        onNavigate={setScreen}
        onLogout={handleLogout}
      />
    </View>
  );
}
