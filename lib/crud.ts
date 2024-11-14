import { Prisma } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const generateCrudOperations = async () => {
  const models = Prisma.dmmf.datamodel.models; // Accède au modèle DMMF de Prisma

  // Assurez-vous que le dossier ./actions existe ou le créez
  const outputDir = "./actions";
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error("Erreur lors de la création du dossier ./actions:", error);
  }

  // Génération des fichiers CRUD pour chaque modèle
  models.forEach(async (model) => {
    const modelName = model.name;
    const modelLower = modelName.charAt(0).toLowerCase() + modelName.slice(1);

    const output = `
import { prisma } from '@/lib/prisma-client';

export const create${modelName} = async (data: Prisma.${modelName}CreateInput) => {
  return prisma.${modelLower}.create({
    data,
  });
};

export const get${modelName} = async (id: string) => {
  return prisma.${modelLower}.findUnique({
    where: { id },
  });
};

export const getAll${modelName}s = async () => {
  return prisma.${modelLower}.findMany();
};

export const update${modelName} = async (id: string, data: Prisma.${modelName}UpdateInput) => {
  return prisma.${modelLower}.update({
    where: { id },
    data,
  });
};

export const delete${modelName} = async (id: string) => {
  return prisma.${modelLower}.delete({
    where: { id },
  });
};
`;

    // Écriture du fichier pour chaque modèle
    try {
      const filePath = path.join(outputDir, `${modelLower}-actions.ts`);
      await fs.writeFile(filePath, output, "utf-8");
      console.log(`Fichier CRUD généré avec succès : ${filePath}`);
    } catch (error) {
      console.error(
        `Erreur lors de la création du fichier ${modelLower}Actions.ts :`,
        error
      );
    }
  });
};

generateCrudOperations();
