import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const schema = [
    {
        id   : 1,
        name : 'shoes',
        subCategories : [
            'ballette',
            'heels',
            'addidasses'
        ]
    },
    {
        id   : 2,
        name : 'cloth',
        subCategories : [
            'T-shirt',
            'jacket',
            'pullover'
        ]
    },
    {
        id   : 3,
        name : 'accessory',
        subCategories : [
            'rings',
            'necklace',
            'earrings'
        ]
    }
];

export default function Category() {
    return (
        <div className='Category'>
            {
                schema.map(category => {
                    const { id, name } = category;

                    return (
                        <div key={id} className='CategoryBlock'>
                            <div className='BlockName'>
                                <Link to={`control/${name}`} >
                                    {name}
                                </Link>
                            </div>
                        </div>
                    );
                })
            }
            <div className={classNames('CategoryBlock', 'AddCategory')} onClick={() => console.log('open Create')}>
                <PlusOutlined />
            </div>
        </div>
    );
}
