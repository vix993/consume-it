import {context} from './testHelpers';

export const MyContext = ({
    Consumer(props: any) {
        return props.children(context)
    }
})