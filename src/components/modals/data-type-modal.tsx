import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Text as TextRect,
} from "react-native";
import { CheckIcon, ChevronsUpDown, XIcon } from "lucide-react-native";

import { FIELD_TYPE_ENUM, FIELD_TYPE_MAP } from "@/db";

import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Fragment, useState } from "react";

interface Props {
  open?: boolean;
  onClose?(state: false): void;
  onSelect?(type: FIELD_TYPE_ENUM): void;
}

export function DataTypeModal(props: Props) {
  const { open, onClose, onSelect } = props;

  const [typeSelect, setTypeSelect] = useState<FIELD_TYPE_ENUM | undefined>();

  const handleClose = () => {
    onClose?.(false);
  };

  const handleSelect = () => {
    typeSelect && onSelect?.(typeSelect);
    onClose?.(false);
  };

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-10">
        <View className="rounded-md bg-white shadow overflow-hidden h-[400px] w-full">
          {/* Header */}
          <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">Tipo de dados</Text>
            <Button onPress={handleClose} icon={XIcon} />
          </View>

          {/* Body */}
          <ScrollView>
            <View className="flex-row justify-center items-center flex-1">
              <View className="px-3 py-3 gap-3 flex-row flex-wrap">
                {Object.entries(FIELD_TYPE_MAP).map(([key, value]) => (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTypeSelect(key as FIELD_TYPE_ENUM)}
                  >
                    <View
                      style={{
                        borderColor:
                          typeSelect === key ? "#2563eb80" : "#d1d5db",
                        backgroundColor:
                          typeSelect === key ? "#2563eb20" : "transparent",
                      }}
                      className="border border-gray-300 rounded-md p-3 h-24 w-36 flex-col justify-between items-center"
                    >
                      <View>
                        {key === FIELD_TYPE_ENUM.number && (
                          <>
                            <View className="border border-gray-300 rounded flex-row items-center justify-between h-6 px-1 gap-2">
                              <Text className="text-gray-500 text-xs">
                                1234
                              </Text>
                            </View>
                          </>
                        )}
                        {key === FIELD_TYPE_ENUM.text && (
                          <>
                            <View className="border border-gray-300 rounded h-6 px-1 gap-2">
                              <Text
                                style={{ fontSize: 8 }}
                                className="text-gray-500 text-xs"
                              >
                                Alguma coisa...
                              </Text>
                            </View>
                            <TextRect
                              style={{ fontSize: 8 }}
                              className="text-center"
                            >
                              até 200 caracteres
                            </TextRect>
                          </>
                        )}
                        {key === FIELD_TYPE_ENUM.text_long && (
                          <>
                            <View className="border border-gray-300 rounded h-10 px-1 gap-2">
                              <Text
                                style={{ fontSize: 8 }}
                                className="text-gray-500 text-xs"
                              >
                                Alguma coisa...
                              </Text>
                            </View>
                            <TextRect
                              style={{ fontSize: 8 }}
                              className="text-center"
                            >
                              até 1024 caracteres
                            </TextRect>
                          </>
                        )}
                        {key === FIELD_TYPE_ENUM.boolean && (
                          <>
                            {Array.from({ length: 2 }).map((_, index) => (
                              <View
                                key={String(index)}
                                className="flex-row items-center gap-1 h-4"
                              >
                                <View
                                  style={{
                                    backgroundColor:
                                      index === 0 ? "#9ca3af" : undefined,
                                  }}
                                  className="border border-gray-400 rounded-full w-2 h-2"
                                />
                                <View className="">
                                  <TextRect
                                    style={{ fontSize: 8 }}
                                    className="h-3"
                                  >
                                    {index === 0 ? "Sim" : "Não"}
                                  </TextRect>
                                </View>
                              </View>
                            ))}
                          </>
                        )}
                        {key === FIELD_TYPE_ENUM.checkbox && (
                          <>
                            {Array.from({ length: 3 }).map((_, index) => (
                              <View
                                key={String(index)}
                                className="flex-row items-center gap-1 h-4"
                              >
                                <View className="border border-gray-400 rounded w-3 h-3">
                                  {index !== 2 && (
                                    <CheckIcon color={"#000"} size={8} />
                                  )}
                                </View>
                                <View className="">
                                  <TextRect
                                    style={{ fontSize: 8 }}
                                    className="h-3"
                                  >
                                    Texto {index + 1}
                                  </TextRect>
                                </View>
                              </View>
                            ))}
                          </>
                        )}
                        {key === FIELD_TYPE_ENUM.radio && (
                          <>
                            {Array.from({ length: 3 }).map((_, index) => (
                              <View
                                key={String(index)}
                                className="flex-row items-center gap-1 h-4"
                              >
                                <View
                                  style={{
                                    backgroundColor:
                                      index === 0 ? "#9ca3af" : undefined,
                                  }}
                                  className="border border-gray-400 rounded-full w-2 h-2"
                                />
                                <View className="">
                                  <TextRect
                                    style={{ fontSize: 8 }}
                                    className="h-3"
                                  >
                                    Texto {index + 1}
                                  </TextRect>
                                </View>
                              </View>
                            ))}
                          </>
                        )}
                        {key === FIELD_TYPE_ENUM.select && (
                          <>
                            <View className="border border-gray-300 rounded flex-row items-center justify-between h-6 px-1 gap-2">
                              <Text className="text-gray-500 text-xs">
                                Selecione um item
                              </Text>
                              <ChevronsUpDown color="#6b7280" size={10} />
                            </View>
                          </>
                        )}
                      </View>

                      <Text className="text-xs text-center">{value}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <View className="flex-row items-center justify-end gap-3 p-3">
            <Button
              disabled={!typeSelect}
              style={{ backgroundColor: typeSelect ? "#2563eb" : "#d1d5db" }}
              className="bg-blue-600 w-24 justify-center items-center rounded-md py-2"
              textClassName="text-center text-white"
              onPress={handleSelect}
            >
              Selecionar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
