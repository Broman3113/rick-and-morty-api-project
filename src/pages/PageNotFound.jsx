import React from 'react';
import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <div>
            <h1>Page Not Found <Link to="/">Go back to Main Page</Link></h1>
        </div>
    );
};

export default PageNotFound;
