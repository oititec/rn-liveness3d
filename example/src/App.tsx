import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Liveness3D from './Liveness3D';
import Liveness3DCustom from './Liveness3DCustom';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Liveness3D" component={Liveness3D} />
        <Stack.Screen name="Liveness3DCustom" component={Liveness3DCustom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
