import { createClient } from 'redis';

const client = createClient({
    password: 'qHjHYUBEt5aOTCu9C37vxoyPFFRBCtWW',
    socket: {
        host: 'redis-11380.c13.us-east-1-3.ec2.cloud.redislabs.com',
        port: 11380
    }
});
export default client;
