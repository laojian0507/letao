

import moment from 'moment';
import Vue from 'vue';

Vue.filter('timeFormat', function (time, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(time).format(format);
})


