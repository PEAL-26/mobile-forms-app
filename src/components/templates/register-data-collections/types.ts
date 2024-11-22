import { DataCollectionFormSchemaType } from "./schema";

export interface RegisterDataCollectionsProps {
  form?: DataCollectionFormSchemaType;
  onLoadingPage?: (state: boolean) => void;
  isLoadingForm?: boolean;
}
