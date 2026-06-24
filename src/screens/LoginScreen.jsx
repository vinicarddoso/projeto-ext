import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";

import { styles } from "../styles";

export default function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    if (mode === "register" && !name.trim()) return "Insira seu nome.";
    if (!email.trim() || !email.includes("@")) return "Insira um e-mail válido.";
    if (password.length < 5) return "A senha deve ter pelo menos 5 caracteres.";
    return null;
  }

  function handleSubmit() {
    const err = validate();
    if (err) { setError(err); return; }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ email, name: name || email.split("@")[0] });
    }, 900);
  }

  function switchMode() {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError(null);
    setEmail(""); setPassword(""); setName("");
  }

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F8F6" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={s.logoWrap}>
            <Text style={s.brand}>RM Lash</Text>
          </View>

          <View style={s.card}>
            <View style={s.modeToggle}>
              {["login", "register"].map((m) => (
                <TouchableOpacity key={m} style={[s.modeBtn, mode === m && s.modeBtnActive]} onPress={() => { setMode(m); setError(null); }}>
                  <Text style={[s.modeBtnText, mode === m && s.modeBtnTextActive]}>
                    {m === "login" ? "Entrar" : "Criar conta"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {mode === "register" && (
              <View style={s.fieldWrap}>
                <Text style={s.label}>Nome</Text>
                <TextInput style={s.input} placeholder="Seu nome completo" placeholderTextColor="#B4B2A9"
                  value={name} onChangeText={setName} autoCapitalize="words" returnKeyType="next" />
              </View>
            )}

            <View style={s.fieldWrap}>
              <Text style={s.label}>E-mail</Text>
              <TextInput style={s.input} placeholder="seu@email.com" placeholderTextColor="#B4B2A9"
                value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} returnKeyType="next" />
            </View>

            <View style={s.fieldWrap}>
              <View style={s.labelRow}>
                <Text style={s.label}>Senha</Text>
                {mode === "login" && <TouchableOpacity><Text style={s.forgotText}>Esqueci a senha</Text></TouchableOpacity>}
              </View>
              <View style={s.passWrap}>
                <TextInput style={s.passInput} placeholder="••••••••" placeholderTextColor="#B4B2A9"
                  value={password} onChangeText={setPassword} secureTextEntry={!showPass}
                  returnKeyType="done" onSubmitEditing={handleSubmit} />
                <TouchableOpacity onPress={() => setShowPass((v) => !v)} style={s.eyeBtn}>
                  <Text style={s.eyeIcon}>{showPass ? "🙈" : "👁️"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {error && <View style={s.errorWrap}><Text style={s.errorText}>{error}</Text></View>}

            <TouchableOpacity style={[s.submitBtn, loading && s.submitBtnLoading]} onPress={handleSubmit} activeOpacity={0.8} disabled={loading}>
              <Text style={s.submitBtnText}>{loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9F8F6" },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  logoWrap: { alignItems: "center", marginBottom: 36 },
  logoCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#D3D1C7", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  logoEmoji: { fontSize: 26 },
  brand: { fontSize: 26, letterSpacing: 3, color: "#a2a2a2", textTransform: "uppercase", marginBottom: 4 },
  tagline: { fontSize: 15, color: "#5F5E5A" },
  card: { backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#D3D1C7", borderRadius: 16, padding: 24, marginBottom: 20 },
  modeToggle: { flexDirection: "row", backgroundColor: "#F1EFE8", borderRadius: 8, padding: 3, marginBottom: 24 },
  modeBtn: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 6 },
  modeBtnActive: { backgroundColor: "#ffffff" },
  modeBtnText: { fontSize: 13, color: "#888780" },
  modeBtnTextActive: { color: "#1a1a18", fontWeight: "500" },
  fieldWrap: { marginBottom: 16 },
  label: { fontSize: 12, color: "#5F5E5A", marginBottom: 6, fontWeight: "500" },
  labelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  forgotText: { fontSize: 12, color: "#888780" },
  input: { height: 44, borderWidth: 0.5, borderColor: "#D3D1C7", borderRadius: 8, paddingHorizontal: 14, fontSize: 14, color: "#1a1a18", backgroundColor: "#FAFAF9" },
  passWrap: { flexDirection: "row", alignItems: "center", borderWidth: 0.5, borderColor: "#D3D1C7", borderRadius: 8, backgroundColor: "#FAFAF9", height: 44 },
  passInput: { flex: 1, paddingHorizontal: 14, fontSize: 14, color: "#1a1a18", height: "100%" },
  eyeBtn: { paddingHorizontal: 12 },
  eyeIcon: { fontSize: 16 },
  errorWrap: { backgroundColor: "#FCEBEB", borderRadius: 8, padding: 10, marginBottom: 14 },
  errorText: { fontSize: 12, color: "#A32D2D" },
  submitBtn: { backgroundColor: "#2C2C2A", borderRadius: 8, height: 46, alignItems: "center", justifyContent: "center", marginTop: 4 },
  submitBtnLoading: { opacity: 0.6 },
  submitBtnText: { color: "#F1EFE8", fontSize: 14, fontWeight: "500", letterSpacing: 0.4 },
  orRow: { flexDirection: "row", alignItems: "center", marginVertical: 18 },
  orLine: { flex: 1, height: 0.5, backgroundColor: "#D3D1C7" },
  orText: { fontSize: 12, color: "#B4B2A9", marginHorizontal: 12 },
  socialBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 0.5, borderColor: "#D3D1C7", borderRadius: 8, height: 44, gap: 10, backgroundColor: "#FAFAF9" },
  socialIcon: { fontSize: 15, fontWeight: "700", color: "#4285F4" },
  socialBtnText: { fontSize: 13, color: "#5F5E5A" },
  footerRow: { flexDirection: "row", justifyContent: "center", marginBottom: 16 },
  footerText: { fontSize: 13, color: "#888780" },
  footerLink: { fontSize: 13, color: "#1a1a18", fontWeight: "500" },
  terms: { fontSize: 11, color: "#B4B2A9", textAlign: "center", lineHeight: 16 },
  termsLink: { color: "#5F5E5A" },
});