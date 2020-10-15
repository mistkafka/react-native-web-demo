import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import ConsumersAdvocateForm from './ConsumersAdvocateForm';

export default {
  title: 'Pages/ConsumersAdvocateForm',
  component: ConsumersAdvocateForm,
} as Meta;

export const DefaultForm = () => <ConsumersAdvocateForm vertical={'life-insurance'}/>
