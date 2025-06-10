import fs from 'fs';
import path from 'path';


const filePath = path.resolve('./data/product.json');


export const getAllProducts = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};
