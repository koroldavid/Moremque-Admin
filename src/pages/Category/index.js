import React         from 'react';
import PropTypes     from 'prop-types';
import { connect }   from 'react-redux';
import { Cruder }    from '../../cruder';
import api           from '../../apiSingleton';
import * as actions  from '../../actions/category';

import createSchema  from './schema';


function Category(props) {
    const { history, location, create, update, deleting } = props;
    const schema = createSchema(api, { create, update,  deleting });
    return (
        <div className='CRUDER_TABLE_PAGE'>
            <Cruder
                schema   = {schema}
                location = {location}
                history  = {history}
            />
        </div>
    );
}

Category.propTypes = {
    location : PropTypes.object,
    history  : PropTypes.object,
    create   : PropTypes.func,
    update   : PropTypes.func,
    deleting : PropTypes.func
};

export default connect(null, actions)(Category);
