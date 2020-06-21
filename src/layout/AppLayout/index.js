import React                             from 'react';
import PropTypes                         from 'prop-types';
import { connect }                       from 'react-redux';
import { Link, withRouter }              from 'react-router-dom';
import { Menu, Button }                  from 'antd';
import { SettingOutlined, SkinOutlined } from '@ant-design/icons';
import Loader                            from '../../components/Loader';
import { loadStructure }                 from '../../actions/secondary';
import { injecQuery }                    from '../../utils/urlFormater';

import './styles.less';


class AppLayout extends React.PureComponent {
    state = {
        isLoading: true,
        openSubmenu: null  
    }

    async componentDidMount() {
        await this.props.loadStructure();
        this.setState({isLoading: false});
    }

    onOpenSubmenu = (key) => {
        this.setState({openSubmenu: key})
    }

    renderNavigation() {
        const { structure, location } = this.props;
        const { pathname, query } = location;
        const { id } = query;
        const path = `${pathname}${id ? id : ''}`

        return(
            <nav>
                <Menu
                    openKeys={this.state.openSubmenu}
                    onOpenChange={this.onOpenSubmenu}
                    mode="inline"
                    selectedKeys={path}
                > 
                    <Menu.Item 
                        icon={<SettingOutlined />}
                        key={'/category'}
                    >
                        <Link to={injecQuery('/category')}>
                            Category
                        </Link>
                    </Menu.Item>
                    {
                        structure.map(subItem => {
                            return (
                                <Menu.SubMenu 
                                    icon={<SkinOutlined />}
                                    title={subItem.name}
                                    key={subItem._id}
                                >
                                    {
                                        subItem.subStructure.map(menuItem => {
                                            const keyPrefix = `/product/${subItem.name}_${menuItem.name}`

                                            return (
                                                <Menu.Item key={`${keyPrefix}${menuItem._id}`}>
                                                    <Link to={injecQuery(keyPrefix, `id=${menuItem._id}`)}>
                                                        {menuItem.name}
                                                    </Link>
                                                </Menu.Item>
                                            );
                                        })
                                    }
                                </Menu.SubMenu>
                            );
                        })
                    }
                </Menu>
            </nav>
        )
    }

    render() {
        const { isLoading } = this.state;

        if (isLoading) return <Loader />

        return (
            <div className='AppLayout'>
                {this.renderNavigation()}
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
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired
};

const mapStateToProps = (state) => {
    return {
        structure: state.secondary.structure
    }
}

export default connect(mapStateToProps, { loadStructure })(withRouter(AppLayout));
