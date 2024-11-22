interface Props {
  formId?: number;
  open?: boolean;
  onClose?(state: false): void;
}
export function SettingsFormDetailsModal(props: Props) {
  const { formId, open, onClose } = props;
  if (!formId) return null;

  return <></>;
}
