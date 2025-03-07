import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/login.tsx'),
  route('/register', 'routes/register.tsx'),
  route('/calculator', 'routes/calculator.tsx'),
] satisfies RouteConfig
