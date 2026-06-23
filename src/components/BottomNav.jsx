import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

const TABS = [
  { key: "menu", icon: "🏠", label: "Início" },
  { key: "cart", icon: "🛍️", label: "Carrinho" },
  { key: "logout", icon: "↩️", label: "Sair" },
];

export default function BottomNav({ activeScreen, cartCount, onNavigate, onLogout }) {
  function handlePress(key) {
    if (key === "logout") { onLogout(); return; }
    onNavigate(key);
  }

  return (
    <View style={styles.nav}>
      {TABS.map((tab) => {
        const isActive = activeScreen === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => handlePress(tab.key)}
            accessibilityLabel={tab.label}
            accessibilityRole="button"
          >
            <View style={styles.iconWrap}>
              <Text style={styles.icon}>{tab.icon}</Text>
              {tab.key === "cart" && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount > 9 ? "9+" : cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            {isActive && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}