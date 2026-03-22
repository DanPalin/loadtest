import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10,         // 10 ka users
    duration: '10s', // 10 seconds

    thresholds: {
        http_req_duration: ['p(95)<500'], // max 500ms
    },
};

export default function () {
    let res = http.get('http://localhost:5000');

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
