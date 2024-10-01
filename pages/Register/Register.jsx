import React from "react";
import { View, Text, Pressable, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./RegisterStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as userService from '../../services/userService'
import { SafeAreaView } from 'react-native-safe-area-context';

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  number: Yup.string().required("Número é obrigatório").max(11),
  birthday: Yup.string().required("Data de nascimento é obrigatória"),
  password: Yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória"),
  repetPassword: Yup.string().oneOf([Yup.ref("password"), null], "As senhas não coincidem").required("Confirme sua senha"),
});

export default function Register({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      data.birthday = new Date(data.birthday);
      data.email = data.email.toLowerCase()
      const response = userService.cadastrar(data);
      if (response) {
        navigation.navigate("Login")
      }
    } catch (error) {
      console.error(error.message)
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Icon onPress={() => navigation.navigate('Initial')} name="arrow-back" size={24} color="#43F16A" />
          </View>
          <View style={styles.container}>
            {/* Nome */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nome"
                  onBlur={onBlur}
                />
              )}
            />
            {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}

            {/* E-mail */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="E-mail"
                  onBlur={onBlur}
                />
              )}
            />
            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

            {/* Número */}
            <Controller
              control={control}
              name="number"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Número"
                  onBlur={onBlur}
                />
              )}
            />
            {errors.number && <Text style={{ color: 'red' }}>{errors.number.message}</Text>}

            {/* Data de nascimento */}
            <Controller
              control={control}
              name="birthday"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nascimento"
                  onBlur={onBlur}
                />
              )}
            />
            {errors.birthday && <Text style={{ color: 'red' }}>{errors.birthday.message}</Text>}

            {/* Senha */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Senha"
                  onBlur={onBlur}
                  secureTextEntry
                />
              )}
            />
            {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

            {/* Repetir Senha */}
            <Controller
              control={control}
              name="repetPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Repita a senha"
                  onBlur={onBlur}
                  secureTextEntry
                />
              )}
            />
            {errors.repetPassword && <Text style={{ color: 'red' }}>{errors.repetPassword.message}</Text>}

            <View style={styles.passwordContainer}>
              <Text style={styles.password}>Já tem conta? </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.login}>Logar</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button onPress={handleSubmit(onSubmit)}>REGISTRAR</Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
