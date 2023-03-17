export const imports = {
  dirs: [
    'stores',
  ],
  presets: [
    {
      from: 'pinia',
      imports: [
        'acceptHMRUpdate',
        'defineStore',
        'storeToRefs',
      ],
    },
    {
      from: 'villus',
      imports: [
        'useQuery',
        'useMutation',
        'defaultPlugins',
        'useClient',
      ],
    },
    {
      from: 'graphql-tag',
      imports: [
        'gql',
      ],
    },
    {
      from: '@vueuse/components',
      imports: [
        'UseTimeAgo',
      ],
    },
    {
      from: 'lodash',
      imports: [
        'isEqual',
        'uniq',
        'random',
        'find',
        'remove',
        'merge',
        'forEach',
        'findIndex',
        'get',
        'reverse',
        'filter',
        'sortBy',
        'upperFirst',
        'take',
        'shuffle',
      ],
    },
  ],
}
