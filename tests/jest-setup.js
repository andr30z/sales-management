// import asMock from '../__mocks__/@react-native-community/async-storage';

// // import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
// jest.mock("@react-native-community/async-storage", () =>
//   asMock,
// );

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});
