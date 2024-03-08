// MyPlugin.tsx

import { FaustHooks, FaustPlugin } from '@faustwp/core';

export class URLPlugin implements FaustPlugin {
  apply(hooks: FaustHooks) {
    const { addFilter } = hooks;

    addFilter(
      'seedQueryDocumentNode',
      'urlResolve',
      (seedQuery, context) => {
        console.log(seedQuery);
        return {
          seedQuery,
          context
        }
      },
    );
  }
}