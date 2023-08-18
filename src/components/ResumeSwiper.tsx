"use client";

import { useEffect, useRef, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { pointerWithin, rectIntersection } from "@dnd-kit/core";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function pointerDetector(args: any) {
  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) {
    return pointerCollisions;
  }
  return rectIntersection(args);
}

function RejectDrop(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "RejectDrop",
  });

  //example of using isOver to change state
  //if the dragable is over this droppable
  const color = isOver ? "bg-purple-200" : "bg-purple-100";

  return (
    <div
      ref={setNodeRef}
      className={`${color} border-purple-300 border-4 h-full w-32 rounded hover:bg-purple-200`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

function ResumeHolder(props: any) {
  const { setNodeRef } = useDroppable({
    id: "ResumeHolder",
  });

  return (
    <div ref={setNodeRef} className="bg-slate-300 h-full w-4/6">
      {props.children}
    </div>
  );
}

function AcceptDrop(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "AcceptDrop",
  });

  //example of using isOver to change state
  //if the dragable is over this droppable
  const color = isOver ? "bg-purple-200" : "bg-purple-100";

  return (
    <div
      ref={setNodeRef}
      className={`${color} border-purple-300 border-4 h-full w-32 rounded hover:bg-purple-200`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

interface DraggableResumeProps {
  resumeLink: string;
  rotateCss: string;
}

function DraggableResume({ resumeLink, rotateCss }: DraggableResumeProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "DraggableResume",
  });

  const [pdfWidth, setPdfWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  useEffect(() => {
    setDivSize();
    window.addEventListener("resize", setDivSize);

    return () => {
      window.removeEventListener("resize", setDivSize);
    };
  }, []);

  function setDivSize() {
    if (wrapperRef.current) {
      const width = wrapperRef.current.clientWidth;
      setPdfWidth(width);
    }
  }
  function onResumeLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <button
      ref={setNodeRef}
      style={style}
      className={"w-full h-full"}
      {...listeners}
      {...attributes}
    >
      <div
        id="PDF-Wrapper"
        className={
          "w-full h-full overflow-y-scroll border-slate-500 border-4 " +
          rotateCss
        }
        ref={wrapperRef}
      >
        <Document
          file={resumeLink}
          loading={<h2>Loading...</h2>}
          onLoadSuccess={onResumeLoadSuccess}
          className={"bg-inherit"}
          externalLinkRel="_blank"
          externalLinkTarget="_blank"
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              pageNumber={index + 1}
              key={index}
              width={pdfWidth}
              className={"divide-y-2 divide-inherit"}
              renderAnnotationLayer={true}
            />
          ))}
        </Document>
      </div>
    </button>
  );
}

interface ResumeSwiperProps {
  resumeLink: string;
  rejectFunction: Function;
  acceptFunction: Function;
}
export default function ResumeSwiper({
  resumeLink,
  rejectFunction,
  acceptFunction,
}: ResumeSwiperProps) {
  const [rotate, setRotate] = useState("rotate-0");

  function handleDragEnd(event: any) {
    const { over } = event;
    if (over) {
      setRotate("rotate-[0deg]");
      if (over.id == "ResumeHolder") {
        return;
      }
      if (over.id == "RejectDrop") {
        //rejection!!
        rejectFunction();
      }
      if (over.id == "AcceptDrop") {
        //accepted!!
        acceptFunction();
      }
    }
  }

  function handleDragMove(event: any) {
    const mouseOffsetX = event.delta.x;
    if (mouseOffsetX < -50) {
      setRotate("-rotate-6");
    } else if (mouseOffsetX > 50) {
      setRotate("rotate-6");
    } else {
      setRotate("rotate-0");
    }
  }

  return (
    <section className="h-full overflow-x-hidden overflow-y-hidden">
      <div className="w-full h-full pt-2 flex justify-between">
        <DndContext
          onDragEnd={handleDragEnd}
          onDragMove={handleDragMove}
          collisionDetection={pointerDetector}
        >
          <RejectDrop onClick={rejectFunction}>
            <div className="w-full h-full flex flex-col justify-center">
              <div className="flex justify-center py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                  />
                </svg>
              </div>
              <span className="text-center font-semibold">
                Swipe to
                <br />
                Reject
              </span>
            </div>
          </RejectDrop>
          <ResumeHolder>
            <DraggableResume resumeLink={resumeLink} rotateCss={rotate} />
          </ResumeHolder>
          <AcceptDrop onClick={acceptFunction}>
            <div className="w-full h-full flex flex-col justify-center">
              <div className="flex justify-center py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              </div>
              <span className="text-center font-semibold">
                Swipe to
                <br />
                Accept
              </span>
            </div>
          </AcceptDrop>
        </DndContext>
      </div>
    </section>
  );
}
