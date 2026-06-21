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
        borderColor: "#ffcced",
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
      }}
    />
  );
}