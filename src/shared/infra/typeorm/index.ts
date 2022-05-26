import { createConnection } from 'typeorm';

try {
    createConnection();
    console.log('Database connection established');
} catch (error) {
    console.log('BD not connected!');
}
