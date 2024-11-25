import { db } from "@/db";
import { alert } from "@/helpers/alert";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  tableName: string;
  queryKey?: string[];
  refetch?(): void;
}

export function useRemove(props: Props) {
  const { tableName, queryKey, refetch } = props;
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleRemove = async (where: Record<string, any>) => {
    if (isLoading) return;

    const confirm = await alert(
      "Remover este item?",
      "Não poderá reverter esta acção, continuar mesmo assim?"
    );

    try {
      if (!confirm) return;

      setIsLoading(true);
      await db.delete(tableName, where);
      queryClient.invalidateQueries({
        queryKey,
      });
      refetch?.();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRemove, isLoading };
}
