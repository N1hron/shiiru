import { Element, Translation } from "@/ui";

type HeadingProps = {
  id: string;
};

export function Heading({ id }: HeadingProps) {
  return (
    <Element as="h2" id={id} hidden="visually">
      <Translation translationKey="stickerSettings.heading" />
    </Element>
  );
}
