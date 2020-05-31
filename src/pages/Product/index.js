import React         from 'react';
import PropTypes     from 'prop-types';
import { Cruder }    from '../../cruder';
import api           from '../../apiSingleton';

import createSchema  from './schema';


export default function Products(props) {
    const { history, location } = props;
    const subCategoryId = location.query.id;

    const schema = createSchema(api, subCategoryId);

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

Products.propTypes = {
    location : PropTypes.object,
    history  : PropTypes.object,
};
