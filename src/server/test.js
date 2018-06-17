const { Generator } = require('names-generator');

const generator = new Generator();
const before = Date.now();

while (true) {
  const name = generator.simple();

  console.log(name)
  if (name === 'Pidor')
    break ;
}

const after = Date.new();

console.log(`It took ${(after - before) / 1000} seconds`); 
