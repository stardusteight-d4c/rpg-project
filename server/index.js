// Instalar o NVM e NPM
// Inicializar o package.json: npm init -y 
// Instalar o framwork/lib fastify: npm install fastify
// Explicar o arquivo package.json, .gitignore e a pasta node_modules

// Instlar algumas dependências de desenvolvedor:
// npm install --save-dev typescript tsx @types/node @fastify/cors

// Fazer importações necessárias para inicializar o servidor "Fastify e cors"
// Instânciar o Fastify em uma constante app
// Registrar o plugin cors
// Criar uma rota get de exemplo para "/"
// Iniciar o servidor com app.listen() em uma função assíncrona chamada start com o bloco try catch  


const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🔥 Servidor rodando em http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

