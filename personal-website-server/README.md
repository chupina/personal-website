# JavaScript Frontend Applied Server

## Installation
1. Install [Node.js](https://nodejs.org/en/download/)
2. Install dependencies `npm install`
3. Run server `npm run start`. Server will run on `localhost:3000`

## API reference

### Subscription
#### POST `/subscribe`
payload `{email: 'email@email.com'}`
response `{"success": true}`

#### POST `/unsubscribe`
response `{"success": true}`

### Community
#### GET `/community`
response `[{avatar:'http://localhost:3000/avatars/avatar1.png', firstName: 'Mary', lastName: 'Smith', position: 'Lead Designer at Company Name'}]`

### Analytics
#### GET `/analytics/user`
response `[{timestamp: 1590085191530, data: []}]`

#### POST `/analytics/user`
payload `[] // Any array`
response `{"success": true}`

#### GET `/analytics/performance`
response `[{timestamp: 1590085191530, data: []}]`

#### POST `/analytics/performance`
payload `[] // Any array`
response `{"success": true}`
