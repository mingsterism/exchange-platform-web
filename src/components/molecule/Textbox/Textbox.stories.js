import Textbox from './Textbox'

export default {
    title: 'Example/Textbox',
    component: Textbox,
    argTypes: {
        size: {control: {type: 'select', options: ['normal', 'long', 'large']}}
    }

}

const Template = (args) => ({
    components: {Textbox},
    setup() {
        return {args}
    },
    template: '<Textbox v-bind="args" />'
});

export const Normal = Template.bind({});
Normal.args = {
    primary: true,
    size: 'normal',
    label: 'Textbox'
};

export const Long = Template.bind({})
Long.args = {
    size: 'long',
    label: 'Textbox'
};

export const Large = Template.bind({})
Large.args = {
    size: 'large',
    label: 'Textbox'
};
