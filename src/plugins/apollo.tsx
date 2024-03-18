import {
    ApolloClientOptions,
    HttpLink,
    NormalizedCacheObject,
  } from '@apollo/client';
  
import { FaustHooks, FaustPlugin } from '@faustwp/core';

export class ApolloClientPlugin implements FaustPlugin {
    apply({ addFilter }) {
        addFilter('apolloClientOptions', 'faust', (apolloClientOptions) => {
          apolloClientOptions.subscribe = () => {
            console.log()
          }
          return {
            ...apolloClientOptions,
          }
        });
      }
}