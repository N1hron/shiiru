import { clamp } from "@/utils/clamp";
import type { CanvasContext2D, Dimensions, Rect, StickerSettings, StickerSize, WidthHeight } from "@/types";

export type StickerImageSource =
  HTMLImageElement |
  HTMLVideoElement |
  VideoFrame |
  HTMLCanvasElement |
  OffscreenCanvas |
  ImageBitmap;

export type StickerImageConfig = Pick<
  StickerSettings,
  "type" | "verticalAlignment" | "horizontalAlignment" | "resize" | "removeSpaces" | "antialiasing"
>;

export type StickerImageCrop = Rect;

export type StickerImageOptions = {
  source: StickerImageSource;
  config: StickerImageConfig;
  crop?: StickerImageCrop;
};

export class StickerImage {
  #source: StickerImageSource;
  #config: StickerImageConfig;
  #crop?: StickerImageCrop;

  // Cache
  #width?: number;
  #height?: number;
  #sourceWidth?: number;
  #sourceHeight?: number;
  #destWidth?: number;
  #destHeight?: number;
  #destX?: number;
  #destY?: number;
  #destWidthScale?: number;
  #destHeightScale?: number;

  constructor({ source, config, crop }: StickerImageOptions) {
    this.#source = source;
    this.#config = config;
    this.#crop = crop;
  }

  drawTo(context: CanvasContext2D) {
    if (this.#config.antialiasing) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    } else {
      context.imageSmoothingEnabled = false;
    }

    context.drawImage(
      this.#source,
      this.sourceX,
      this.sourceY,
      this.sourceWidth,
      this.sourceHeight,
      this.destX,
      this.destY,
      this.destWidth,
      this.destHeight
    );
  }

  setSource(source: StickerImageSource) {
    this.#source = source;
    this.#clearCache();
  }

  setConfig(config: StickerImageConfig) {
    this.#config = config;
    this.#clearCache();
  }

  setCrop(crop?: StickerImageCrop) {
    this.#crop = crop;
    this.#clearCache();
  }

  #clearCache() {
    this.#width = undefined;
    this.#height = undefined;
    this.#sourceWidth = undefined;
    this.#sourceHeight = undefined;
    this.#destWidth = undefined;
    this.#destHeight = undefined;
    this.#destX = undefined;
    this.#destY = undefined;
    this.#destWidthScale = undefined;
    this.#destHeightScale = undefined;
  }

  get size(): StickerSize {
    if (this.#config.type === "sticker") {
      return 512;
    }
    return 100;
  }

  get width() {
    if (!this.#width) {
      this.#width = this.#calcWidth();
    }
    return this.#width;
  }

  get height() {
    if (!this.#height) {
      this.#height = this.#calcHeight();
    }
    return this.#height;
  }

  get sourceX(): number {
    if (this.#crop) {
      return this.#crop.left;
    }
    return 0;
  }

  get sourceY(): number {
    if (this.#crop) {
      return this.#crop.top;
    }
    return 0;
  }

  get sourceWidth(): number {
    if (!this.#sourceWidth) {
      const { width, height } = this.#calcSourceDimensions();

      this.#sourceWidth = width;
      this.#sourceHeight = height;
    }
    return this.#sourceWidth;
  }

  get sourceHeight(): number {
    if (!this.#sourceHeight) {
      const { width, height } = this.#calcSourceDimensions();

      this.#sourceWidth = width;
      this.#sourceHeight = height;
    }
    return this.#sourceHeight;
  }

  get destWidth(): number {
    if (!this.#destWidth) {
      this.#destWidth = this.#calcDestWidth();
    }
    return this.#destWidth;
  }

  get destHeight(): number {
    if (!this.#destHeight) {
      this.#destHeight = this.#calcDestHeight();
    }
    return this.#destHeight;
  }

  get destX(): number {
    if (!this.#destX) {
      this.#destX = this.#calcDestX();
    }
    return this.#destX;
  }

  get destY(): number {
    if (!this.#destY) {
      this.#destY = this.#calcDestY();
    }
    return this.#destY;
  }

  get destWidthScale(): number {
    if (!this.#destWidthScale) {
      const { width, height } = this.#calcDestScale();

      this.#destWidthScale = width;
      this.#destHeightScale = height;
    }
    return this.#destWidthScale;
  }

  get destHeightScale(): number {
    if (!this.#destHeightScale) {
      const { width, height } = this.#calcDestScale();

      this.#destWidthScale = width;
      this.#destHeightScale = height;
    }
    return this.#destHeightScale;
  }

  #calcWidth() {
    if (
      this.#config.removeSpaces &&
      this.#config.type === "sticker" &&
      (this.destWidth >= this.size || this.destHeight >= this.size)
    ) {
      return clamp(0, this.destWidth, this.size);
    }
    return this.size;
  }

  #calcHeight() {
    if (
      this.#config.removeSpaces &&
      this.#config.type === "sticker" &&
      (this.destWidth >= this.size || this.destHeight >= this.size)
    ) {
      return clamp(0, this.destHeight, this.size);
    }
    return this.size;
  }

  #calcSourceDimensions(): Dimensions {
    if (this.#crop) {
      return {
        width: this.#crop.width,
        height: this.#crop.height
      };
    }

    switch (true) {
      case (this.#source instanceof HTMLImageElement):
        return {
          width: this.#source.naturalWidth,
          height: this.#source.naturalHeight
        };
      case (this.#source instanceof HTMLVideoElement):
        return {
          width: this.#source.videoWidth,
          height: this.#source.videoHeight
        };
      case (this.#source instanceof VideoFrame):
        return {
          width: this.#source.codedWidth,
          height: this.#source.codedHeight
        };
      case (this.#source instanceof HTMLCanvasElement):
      case (this.#source instanceof OffscreenCanvas):
      case (this.#source instanceof ImageBitmap):
        return {
          width: this.#source.width,
          height: this.#source.height
        };
      default:
        return {
          width: 0,
          height: 0
        };
    }
  }

  #calcDestWidth() {
    return Math.floor(this.sourceWidth * this.destWidthScale);
  }

  #calcDestHeight() {
    return Math.floor(this.sourceWidth * this.destHeightScale);
  }

  #calcDestX() {
    switch (this.#config.horizontalAlignment) {
      case "left":
        return 0;
      case "middle":
        return (this.width - this.destWidth) / 2;
      case "right":
        return this.width - this.destWidth;
    }
  }

  #calcDestY() {
    switch (this.#config.verticalAlignment) {
      case "top":
        return 0;
      case "middle":
        return (this.height - this.destHeight) / 2;
      case "bottom":
        return this.height - this.destHeight;
    }
  }

  #calcDestScale(): WidthHeight {
    const width = this.size / this.sourceWidth;
    const height = this.size / this.sourceHeight;

    switch (this.#config.resize) {
      case "fill": {
        return { width, height };
      }
      case "contain": {
        const value = Math.min(width, height);
        return { width: value, height: value };
      }
      case "cover": {
        const value = Math.max(width, height);
        return { width: value, height: value };
      }
      case "scale-down": {
        const value = Math.min(width, height, 1);
        return { width: value, height: value };
      }
    }
  }
}
