import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import './Loader.less';


export default function Loader() {
    return (
        <div className='Loader'>
            <LoadingOutlined />
        </div>
    );
}