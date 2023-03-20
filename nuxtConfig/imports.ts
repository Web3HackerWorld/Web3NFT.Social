export const imports = {
  dirs: [
    'stores',
  ],
  presets: [
    {
      from: '@headlessui/vue',
      imports: [
        'TransitionRoot',
        'TransitionChild',
        'Dialog',
        'DialogPanel',
        'DialogOverlay',
        'DialogTitle',
        'DialogDescription',
        'Menu',
        'MenuButton',
        'MenuItem',
        'MenuItems',
        'TabGroup',
        'TabList',
        'Tab',
        'TabPanels',
        'TabPanel',
        'Combobox',
        'ComboboxInput',
        'ComboboxButton',
        'ComboboxOptions',
        'ComboboxOption',
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
  ],
}
