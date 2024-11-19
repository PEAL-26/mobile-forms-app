import { DataCollectionFormSchemaType } from "./schema";

export interface RegisterDataCollectionsProps {
  form?: DataCollectionFormSchemaType;
  onLoading?: (state: boolean) => void;
}
