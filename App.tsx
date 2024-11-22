import React from 'react';
import {enableScreens} from 'react-native-screens';

import Root from 'views/Root';

enableScreens();

function App(): React.JSX.Element {
  return <Root />;
}

export default App;
