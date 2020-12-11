// chave a partir do secret
// COnfigurações do token
// Subject id do usuário que criou o token (qual usuário pertence o token gerado)
// expiresIn quando tempo o token irá durar

export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
