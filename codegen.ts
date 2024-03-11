import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `http://localhost:10004/graphql`,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,js,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      overwrite: true,
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;