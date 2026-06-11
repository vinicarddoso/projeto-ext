import React, { useState } from 'react';
import { TextInput } from 'react-native';

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <TextInput
      placeholder="Pesquisar produtos..."
      value={search}
      onChangeText={setSearch}
      style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
      }}
    />
  );
}