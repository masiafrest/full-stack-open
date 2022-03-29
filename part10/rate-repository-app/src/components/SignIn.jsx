import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  form: {
    margin: 20,
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 6,
  },
  button: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    color: "white",
    textAlign: "center",
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput
        style={styles.input}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.input}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
}
