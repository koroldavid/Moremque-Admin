import React         from 'react';
import PropTypes     from 'prop-types';
import { connect }   from 'react-redux';
import { Cruder }    from '../../cruder';
import api           from '../../apiSingleton';
import * as actionst from '../../actions/subCategory';

import createSchema  from './schema';


function CategoryDetails(props) {
    const { history, location, create, update, deleting } = props;
    const categoryId = location.query.id;

    const schema = createSchema(api, { create, update, deleting }, categoryId);

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

CategoryDetails.propTypes = {
    location : PropTypes.object,
    history  : PropTypes.object,
    create   : PropTypes.func,
    update   : PropTypes.func,
    deleting : PropTypes.func
};

export default connect(null, actionst)(CategoryDetails);
