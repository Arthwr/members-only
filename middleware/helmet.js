import helmet from 'helmet';

const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
      styleSrc: ["'self'", 'cdn.jsdelivr.net'],
      imgSrc: ["'self'"],
      connectSrc: ["'self'", 'data:', 'cdn.jsdelivr.net'],
      fontSrc: ["'self'", 'cdn.jsdelivr.net'],
    },
  },
});

export default helmetMiddleware;
