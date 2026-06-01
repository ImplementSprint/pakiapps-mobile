import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthScreen } from '../pakipark/src/features/auth/screens/AuthScreen';
import { ServiceSelectionScreen } from '../pakipark/src/features/launcher/screens/ServiceSelectionScreen';
import { RootNavigator as PakiParkRootNavigator } from '../pakipark/src/navigation/RootNavigator';
import PakiShipApp from './src/app/App';

type RootRoute = 'launcher' | 'pakipark-auth' | 'pakipark-app' | 'pakiship-app';

export default function App() {
  const [route, setRoute] = useState<RootRoute>('launcher');
  const [authenticatedAsAdmin, setAuthenticatedAsAdmin] = useState(false);

  const handleServiceSelect = (service: 'pakiship' | 'pakipark') => {
    setRoute(service === 'pakiship' ? 'pakiship-app' : 'pakipark-auth');
  };

  const handlePakiParkAuthSuccess = (role: 'customer' | 'admin' = 'customer') => {
    setAuthenticatedAsAdmin(role === 'admin');
    setRoute('pakipark-app');
  };

  const handleBackToLauncher = () => {
    setAuthenticatedAsAdmin(false);
    setRoute('launcher');
  };

  if (route === 'pakiship-app') {
    return <PakiShipApp onBackToLauncher={handleBackToLauncher} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {route === 'pakipark-app' ? (
        <PakiParkRootNavigator
          initialRouteName={authenticatedAsAdmin ? 'AdminHome' : 'CustomerHome'}
        />
      ) : route === 'pakipark-auth' ? (
        <AuthScreen
          onAuthSuccess={handlePakiParkAuthSuccess}
          onBackToLauncher={handleBackToLauncher}
        />
      ) : (
        <ServiceSelectionScreen onSelectService={handleServiceSelect} />
      )}
    </SafeAreaProvider>
  );
}
