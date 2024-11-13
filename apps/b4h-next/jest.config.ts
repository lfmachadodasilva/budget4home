import type { Config } from 'jest';

export default {
  displayName: 'b4h-next',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/b4h-next',
  coverageReporters: [
    // 'clover',
    'json',
    // 'lcov',
    ['text', { skipFull: true }],
    [
      'jest-junit',
      {
        outputDirectory: '../../coverage/apps/b4h-next',
        outputName: 'junit.xml'
      }
    ]
  ]
} as Config;
