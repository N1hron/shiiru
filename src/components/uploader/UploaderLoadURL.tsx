import clsx from "clsx";
import { useRef, useState, type ChangeEvent } from "react";

import { Button } from "@/ui";
import { throttle } from "@/utils";
import { fileTypeFromResponse, formatProgress, isAbortError, isValidURL } from "./utils";

import styles from "./style.module.scss";

type Status = ["invalid" | "ready" | "loading" | "error" | "success", string];

export function UploaderLoadURL() {
  const [url, setURL] = useState("");
  const [status, setStatus] = useState<Status>(["invalid", "invalid url"]);
  const [statusType, statusMessage] = status;
  const abortControllerRef = useRef<AbortController>(null);
  const showInput = statusType !== "loading";
  const showButton = statusType !== "invalid";
  const cl = clsx(styles.loadURL, statusType === "loading" && styles.loadURLLoading);

  async function load() {
    try {
      setStatus(["loading", "preparing"]);

      const response = await fetch(url, {
        signal: (abortControllerRef.current = new AbortController()).signal,
      });

      // Validation phase

      if (!response.ok) {
        setStatus(["error", response.status === 404 ? "not found" : "network error"]);
        return abort();
      }

      if (!response.body) {
        setStatus(["error", "file is empty"]);
        return abort();
      }

      const type = await fileTypeFromResponse(response);
      const isImage = type.startsWith("image/");
      const isVideo = type.startsWith("video/");

      if (!isImage && !isVideo) {
        setStatus(["error", "invalid file format"]);
        return abort();
      }

      // Loading phase

      const reader = response.body.getReader();
      const size = response.headers.get("Content-Length");
      const progress: [number, number] = [0, size ? +size : 0];
      const chunks = [];
      let isReading = true;

      const updateProgress = progress[1] ? throttle(() => {
        if (abortControllerRef.current) {
          setStatus(["loading", formatProgress(progress)]);
        }
      }, 50) : null;

      if (updateProgress) {
        updateProgress();
      } else {
        setStatus(["loading", "loading"]);
      }

      while (isReading) {
        const chunk = await reader.read();

        if (chunk.value) {
          progress[0] += chunk.value.length;
          chunks.push(chunk.value);

          if (updateProgress) {
            updateProgress();
          }
        }

        isReading = !chunk.done;
      }

      abortControllerRef.current = null;
      setStatus(["loading", "finishing"]);
      const file = new File(chunks, `file.${type.split("/")[1]}`, { type });
      setStatus(["success", "done"]);

      return file;
    } catch (error) {
      if (!isAbortError(error)) {
        abort();
        setStatus(["error", "network error"]);
      };

      return error;
    }
  };

  function abort() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setURL(value);
    setStatus(isValidURL(value) ? ["ready", "ready"] : ["invalid", "invalid url"]);
  }

  function handleClick() {
    if (statusType === "loading") {
      abort();
      setStatus(["ready", "ready"]);
    } else {
      load().then(console.log).catch(console.log);
    }
  }

  function renderButtonText() {
    switch (statusType) {
      case "error":
        return "retry";
      case "loading":
        return "cancel";
      case "success":
        return "reload";
      default:
        return "load";
    }
  }

  return (
    <div className={cl}>
      { showInput && <input placeholder="Enter URL or paste file" value={url} onChange={handleInputChange} /> }
      { url && <p>{statusMessage}</p> }
      { showButton && <Button size="medium" onClick={handleClick}>{renderButtonText()}</Button> }
    </div>
  );
}