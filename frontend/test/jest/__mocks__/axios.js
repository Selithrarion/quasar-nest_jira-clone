// import axios from 'axios';

// export default jest.mock('axios', () => ({
//   get: jest.fn(() => Promise.resolve({ data: {} })),
// }));

// const mockAxios = jest.createMockFromModule('axios');
// mockAxios.create = jest.fn(() => mockAxios);

export default jest.createMockFromModule('axios');
// mockAxios.post.mockImplementationOnce(() =>
//   Promise.resolve({ data: mockData }),
// )
