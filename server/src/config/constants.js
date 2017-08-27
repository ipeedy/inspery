export default {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://localhost/tweet-development',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: '부이탄콰',
  SUBSCRIPTIONS_PATH: '/subscriptions',
};
