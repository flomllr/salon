import * as React from 'react';
import { Button } from 'semantic-ui-react';

const UIButton = (props: any) => {
    return (
        <Button>{props.text}</Button>
    );
};

export default UIButton