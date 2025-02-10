import { envs } from "../../config/envs";
import { MongoDataBase } from "../mongo/conection";
import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { UserModel } from "../mongo/models/user-model";
import { seedData } from './data';

(async () => {
  // Conectar a la base de datos
  await MongoDataBase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  // Llamar a la función main para inicializar los datos
  await main();

  // Cerrar la conexión a la base de datos
  MongoDataBase.close();
})();

async function main() {

  // Eliminar todos los datos de la base de datos
  await Promise.all([
    UserModel.deleteMany({}),
    ProductModel.deleteMany({}),
    CategoryModel.deleteMany({}),
  ]);


  // Crear datos de usuarios
  const users = await UserModel.insertMany(seedData.users);

  // Función random para obtener un usuario aleatorio
  const randomUserOrCategory = (list: any) => list[Math.floor(Math.random() * list.length)]._id;


  // Crear datos de categorías
  const categories = await CategoryModel.insertMany(
    seedData.categories.map(category => {
      return {
        ...category,
        user: users[0]._id
      };
    })
  );

  // Crear datos de productos
  const products = await ProductModel.insertMany(
    seedData.products.map(product => {
      return {
        ...product,
        user: randomUserOrCategory(users),
        category: randomUserOrCategory(categories),
      };
    })
  );


  console.log('Seed data');
}