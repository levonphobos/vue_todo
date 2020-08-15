import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import InputText from './../components/InputText';

export default {
  title: 'InputText',
};

export const DDDD = () => ({
  components: { InputText },
  template: '<InputText @onchange="action">Hello Button</InputText>',
  methods: { action: action('clicked') },
});
