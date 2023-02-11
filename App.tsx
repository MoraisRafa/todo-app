import { StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black
} from '@expo-google-fonts/roboto'
import { Home } from './src/screens/Home';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Home />
      <StatusBar barStyle="default" backgroundColor="transparent" translucent />
    </>
  );
}