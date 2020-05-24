import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import * as categoryActions from '../actions/category';
import { connect } from 'react-redux';
import { notification } from 'antd';
import Loader from '../components/Loader';
import Input from '../components/Input';
import ModalCreate from '../components/ModalCreate';
import './AdminControl.scss';

function AdminControl(props) {
    const { category, listCategory} = props;
    const [loader, setLoad] = useState(true);

    useEffect(() => {
        async function getCategory() {
            try {
                await listCategory();
                setLoad(false);
            } catch (error) {
                notification.error({
                    message     : 'Error occur',
                    description : error.message
                });
            }
        }

        getCategory();
    }, []);

    return (loader && <Loader />) || (
        <div className='AdminControl'>
            {
                category.map(category => {
                    const { _id, name } = category;

                    return (
                        <div key={_id} className='CategoryBlock'>
                            <div className='BlockName'>
                                <Link to={`control/${name}`} >
                                    {name}
                                </Link>
                            </div>
                        </div>
                    );
                })
            }
            <ModalCreate
                schema = {{
                    fields: [
                        {
                            name: 'name',
                            label: 'name',
                            component: Input
                        }
                    ],
                    trigger: {
                        icon: <PlusOutlined />,
                        type: 'default'
                    },
                    labels: {
                        title: 'Create Category',
                        successMessage: 'OK',
                        errorMessage: 'BAD',
                        cancelButton: 'cancel',
                        submitButton: 'submit'
                    }
                }}
                apiAdapter={{create: props.createCategory}}
                onInteract={listCategory}
            />
        </div>
    );
}

AdminControl.propTypes = {
    listCategory: PropTypes.func.isRequired,
    category: PropTypes.array
};

AdminControl.defaultProps = {
    category: []
};

const mapStateToProps = (state) => {
    return {
        category: state.category.category
    };
};

export default connect(mapStateToProps, categoryActions)(AdminControl);