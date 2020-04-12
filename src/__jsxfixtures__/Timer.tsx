import React from 'react';
import Timer from '../Components/Timer'

export default <Timer until={(new Date()).getTime() + 30 * 1000} />;