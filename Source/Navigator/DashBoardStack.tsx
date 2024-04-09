import {createStackNavigator} from '@react-navigation/stack';
import {DashBoardParamList} from './types';
import Dashboard from '../Screen/Dashboard';

const DashBoardNavigation = createStackNavigator<DashBoardParamList>();
export function DashBoardNavigator() {
  return (
    <DashBoardNavigation.Navigator>
      <DashBoardNavigation.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
    </DashBoardNavigation.Navigator>
  );
}
