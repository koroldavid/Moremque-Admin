import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './styles.less';

function AppLayout(props) {
    return (
        <div className='AppLayout'>
            <nav>
                <Menu> 
                    <Menu.Item icon={<SettingOutlined />}>
                        <Link to='/control'>
                            Controll Panel
                        </Link>
                    </Menu.Item>
                </Menu>
            </nav>
            <div className='ContentContainer'>
                <header>
                    <Button
                        type={'primary'}
                        onClick={() => console.log('logout')}
                    >
                        Logout
                    </Button>
                </header>
                <div className='Content'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default withRouter(AppLayout);
