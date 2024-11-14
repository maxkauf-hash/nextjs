import { Prisma } from "@prisma/client";
import fs from "fs/promises";

// Fonction pour mapper les types Prisma aux types TypeScript
const mapToTSType = (prismaType: string): string => {
  switch (prismaType) {
    case "String":
      return "string";
    case "Int":
    case "Float":
      return "number";
    case "Boolean":
      return "boolean";
    case "DateTime":
      return "Date";
    default:
      return "any"; // Par défaut pour les types inconnus
  }
};

// Fonction pour générer les champs des modèles
const generateModelFields = async () => {
  const models = Prisma.dmmf.datamodel.models;

  let outputModels = "";
  let outputTypes = "";

  models.forEach((model) => {
    // Génération du fichier modelsFields.ts
    outputModels += `export const ${model.name}ModelFields = {\n`;
    outputModels += `  modelName: "${model.name}",\n`;
    outputModels += `  fields: [\n`;
    model.fields
      .filter((field) => field.name !== "id" && field.kind !== "object") // Exclure 'id' et les champs de relation
      .forEach((field) => {
        outputModels += `    {\n`;
        outputModels += `      name: "${field.name}",\n`;
        outputModels += `      type: "${field.type}",\n`;
        outputModels += `      isRequired: ${field.isRequired},\n`;
        outputModels += `    },\n`;
      });
    outputModels += `  ]\n`;
    outputModels += `};\n\n`;

    // Génération du fichier types.ts
    outputTypes += `export type ${model.name}Type = {\n`;
    model.fields
      .filter((field) => field.name !== "id" && field.kind !== "object" && field.isRequired) // Exclure 'id' et les champs de relation
      .forEach((field) => {
        const tsType = mapToTSType(field.type);
        outputTypes += `  ${field.name}${
          field.isRequired ? "" : "?"
        }: ${tsType};\n`;
      });
    outputTypes += `};\n\n`;
  });

  // Écriture du fichier modelsFields.ts
  try {
    await fs.writeFile(`./lib/modelsFields.ts`, outputModels, "utf-8");
    console.log("Fichier TypeScript généré avec succès : modelsFields.ts");
  } catch (error) {
    console.error(
      "Erreur lors de la création du fichier modelsFields.ts:",
      error
    );
  }

  // Écriture du fichier types.ts
  try {
    await fs.writeFile(`./lib/types.ts`, outputTypes, "utf-8");
    console.log("Fichier TypeScript généré avec succès : types.ts");
  } catch (error) {
    console.error("Erreur lors de la création du fichier types.ts:", error);
  }
};

generateModelFields();
