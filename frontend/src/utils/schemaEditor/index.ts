import { Database, EngineType } from "@/types";
import { isDev } from "../util";

// Only allow using Schema Editor with MySQL.
export const allowUsingSchemaEditor = (databaseList: Database[]): boolean => {
  return databaseList.every((db) => {
    return (
      db.instance.engine === "MYSQL" ||
      // TODO(steven): remove release guard later.
      (isDev() && db.instance.engine === "POSTGRES")
    );
  });
};

export const getDataTypeSuggestionList = (engineType: EngineType = "MYSQL") => {
  if (engineType === "MYSQL") {
    return [
      "BIT",
      "BOOLEAN",
      "CHAR(1)",
      "DATE",
      "DATETIME",
      "DOUBLE",
      "INT",
      "JSON",
      "VARCHAR(255)",
    ];
  } else if (engineType === "POSTGRES") {
    return [
      "BOOLEAN",
      "CHAR(1)",
      "DATE",
      "INTEGER",
      "JSON",
      "REAL",
      "SERIAL",
      "TEXT",
      "VARCHAR(255)",
    ];
  }

  return [];
};
