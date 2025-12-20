import clsx from "clsx";
import { ALL_FORMATS, BlobSource, CanvasSink, Input } from "mediabunny";
import { useEffect, useRef, useState } from "react";

import { shiftPreviewQueue, useAppDispatch, useAppSelector } from "@/store";
import { devLog, loadImage, loadVideo, seekVideo, wait } from "@/utils";
import { useUploadedFiles } from "@/hooks/useUploadedFiles";
import type { UploaderItem } from "@/types";

import styles from "./style.module.scss";

type UploaderFilePreviewProps = {
  item: UploaderItem;
};

export function UploaderFilePreview({ item }: UploaderFilePreviewProps) {
  const dispatch = useAppDispatch();
  const previewRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getFile } = useUploadedFiles();
  const cl = clsx(styles.filePreview, isLoading && styles.filePreviewLoading);

  const shouldLoadPreview = useAppSelector((state) => {
    return (
      state.uploader.previewsQueue[0] === item.id &&
      (!state.uploader.isUploading || item.type === "image")
    );
  });

  async function loadPreview() {
    const preview = previewRef.current;
    const canvasWrapper = canvasWrapperRef.current;
    const canvas = canvasRef.current;

    if (!preview || !canvasWrapper || !canvas) {
      throw new Error("DOM elements are empty");
    };

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas context is empty");
    };

    const previewWidth = preview.clientWidth;
    const previewHeight = preview.clientHeight;

    const widthScale = previewWidth / item.width;
    const heightScale = previewHeight / item.height;
    const scale = Math.min(widthScale, heightScale, 1);

    const canvasCssWidth = item.width * scale;
    const canvasCssHeight = item.height * scale;

    canvasWrapper.style.width = canvasCssWidth + "px";
    canvasWrapper.style.height = canvasCssHeight + "px";

    canvas.width = canvasCssWidth * devicePixelRatio;
    canvas.height = canvasCssHeight * devicePixelRatio;

    if (item.type === "video") {
      const file = getFile(item.id);

      return loadPreviewFromVideo(
        ctx,
        file,
        item.url,
        item.duration / 4,
        canvas.width,
        canvas.height,
      ).then(() => wait(250));
    }

    return loadPreviewFromImage(
      ctx,
      item.url,
      canvas.width,
      canvas.height,
    );
  }

  useEffect(() => {
    if (!shouldLoadPreview) return;

    loadPreview().catch(devLog).finally(() => {
      setIsLoading(false);
      dispatch(shiftPreviewQueue());
    });
  }, [shouldLoadPreview]);

  return (
    <div className={cl} ref={previewRef}>
      <div className={styles.canvasWrapper} ref={canvasWrapperRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

async function loadPreviewFromImage(ctx: CanvasRenderingContext2D, url: string, width: number, height: number) {
  return loadImage(url).then((image) => {
    ctx.drawImage(image, 0, 0, width, height);
  });
}

async function loadPreviewFromVideo(
  ctx: CanvasRenderingContext2D,
  file: File | undefined,
  url: string,
  timestamp: number,
  width: number,
  height: number,
) {
  if (!file) {
    throw new Error("File is empty");
  };

  return loadPreviewFromVideoFile(ctx, file, timestamp, width, height).catch(() => {
    devLog("Loading preview using video tag");
    return loadPreviewFromVideoUrl(ctx, url, timestamp, width, height);
  });
}

async function loadPreviewFromVideoUrl(
  ctx: CanvasRenderingContext2D,
  url: string,
  timestamp: number,
  width: number,
  height: number,
) {
  return loadVideo(url).then((video) => seekVideo(video, timestamp)).then((video) => {
    ctx.drawImage(video, 0, 0, width, height);
  });
}

async function loadPreviewFromVideoFile(
  ctx: CanvasRenderingContext2D,
  file: File,
  timestamp: number,
  width: number,
  height: number,
) {
  const videoTrack = await new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS,
  }).getPrimaryVideoTrack();

  if (!videoTrack) {
    throw new Error("Primary video track is empty");
  }

  const wrappedCanvas = await new CanvasSink(videoTrack, {
    width,
    height,
    fit: "fill",
    poolSize: 1,
  }).getCanvas(timestamp);

  if (!wrappedCanvas) {
    throw new Error("WrappedCanvas  is empty");
  }

  ctx.drawImage(wrappedCanvas.canvas, 0, 0, width, height);
}