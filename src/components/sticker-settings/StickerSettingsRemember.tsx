import { selectRememberStickerSettings, setRememberStickerSettings, useAppDispatch, useAppSelector } from "@/store";
import { Checkbox } from "@/ui";

export function StickerSettingsRemember() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectRememberStickerSettings);

  function setValue(value: boolean) {
    dispatch(setRememberStickerSettings(value));
  }

  return <Checkbox label="Remember choice" value={value} setValue={setValue} />;
}