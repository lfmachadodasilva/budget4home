import '@testing-library/jest-dom';

export const intersectionObserverMock = () => ({
  observe: () => null
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
