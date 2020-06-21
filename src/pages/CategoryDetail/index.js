import React         from 'react';
import PropTypes     from 'prop-types';
import { connect }   from 'react-redux';
import { Cruder }    from '../../cruder';
import api           from '../../apiSingleton';
import { loadStructure } from '../../actions/secondary';

import createSchema  from './schema';


function CategoryDetails(props) {
    const { history, location, loadStructure } = props;
    const categoryId = location.query.id;

    const schema = createSchema(api, categoryId);

    return (
        <div className='CRUDER_TABLE_PAGE'>
            <Cruder
                schema     = {schema}
                location   = {location}
                history    = {history}
                onInteract = {loadStructure}
            />
        </div>
    );
}

CategoryDetails.propTypes = {
    location      : PropTypes.object,
    history       : PropTypes.object,
    loadStructure : PropTypes.func
};

export default connect(null, { loadStructure })(CategoryDetails);
