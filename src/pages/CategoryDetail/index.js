import React         from 'react';
import PropTypes     from 'prop-types';
import { Cruder }    from '../../cruder';
import api           from '../../apiSingleton';

import createSchema  from './schema';


export default function Category(props) {
    const { history, location } = props;
    const categoryId = location.query.id;

    const schema = createSchema(api, categoryId);

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
    location    : PropTypes.object,
    history     : PropTypes.object,
};
