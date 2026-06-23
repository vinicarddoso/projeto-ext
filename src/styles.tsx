import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9F8F6" },
  content: { flex: 1 },
  

  // Home screen styles

  
  // Login screen styles

  

  //
  // Cart styles 
  
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F8F6",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  brand: {
    fontSize: 11,
    letterSpacing: 3,
    color: "#888780",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "500",
    color: "#1a1a18",
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 13,
    color: "#888780",
    marginBottom: 24,
  },
  itemCard: {
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#D3D1C7",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#F1EFE8",
    borderWidth: 0.5,
    borderColor: "#D3D1C7",
    alignItems: "center",
    justifyContent: "center",
  },
  itemIcon: {
    fontSize: 22,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a18",
    marginBottom: 2,
  },
  itemVariant: {
    fontSize: 12,
    color: "#888780",
    marginBottom: 10,
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qtyCtrl: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#B4B2A9",
    borderRadius: 8,
    overflow: "hidden",
  },
  qtyBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 16,
    color: "#5F5E5A",
    lineHeight: 20,
  },
  qtyVal: {
    fontSize: 13,
    fontWeight: "500",
    width: 28,
    textAlign: "center",
    color: "#1a1a18",
  },
  removeBtn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
  removeBtnText: {
    fontSize: 12,
    color: "#888780",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a18",
  },
  continueBtn: {
    marginBottom: 20,
  },
  continueBtnText: {
    fontSize: 12,
    color: "#888780",
    textDecorationLine: "underline",
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#D3D1C7",
    borderRadius: 12,
    padding: 20,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a18",
    marginBottom: 16,
  },
  promoRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  promoInput: {
    flex: 1,
    height: 38,
    borderWidth: 0.5,
    borderColor: "#B4B2A9",
    borderRadius: 8,
    backgroundColor: "#F9F8F6",
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#1a1a18",
  },
  promoBtn: {
    height: 38,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#B4B2A9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  promoBtnText: {
    fontSize: 12,
    color: "#5F5E5A",
  },
  promoMsg: {
    fontSize: 12,
    marginTop: 6,
    marginBottom: 4,
  },
  divider: {
    height: 0.5,
    backgroundColor: "#D3D1C7",
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#5F5E5A",
  },
  summaryValue: {
    fontSize: 13,
    color: "#5F5E5A",
  },
  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a18",
  },
  summaryTotalValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a18",
  },
  checkoutBtn: {
    backgroundColor: "#2C2C2A",
    borderRadius: 8,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  checkoutBtnText: {
    color: "#F1EFE8",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.6,
  },
  freeShip: {
    fontSize: 12,
    color: "#888780",
    textAlign: "center",
    marginTop: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#D3D1C7",
    borderRadius: 12,
    marginBottom: 16,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#888780",
  },

  //
  //
  // Navigation Styles


  nav: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 0.5,
    borderTopColor: "#D3D1C7",
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  iconWrap: { position: "relative" },
  icon: { fontSize: 22 },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#2C2C2A",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: { fontSize: 9, color: "#F1EFE8", fontWeight: "600" },
  label: { fontSize: 11, color: "#B4B2A9" },
  labelActive: { color: "#1a1a18", fontWeight: "500" },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2C2C2A",
    marginTop: 2,
  },
});