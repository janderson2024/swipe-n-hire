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
      className={`${color} border-purple-300 border-4 h-full w-32 rounded`}
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
    <div
      ref={setNodeRef}
      className="bg-slate-300 border-slate-500 border-4 h-full w-4/6"
    >
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
      className={`${color} border-purple-300 border-4 h-full w-32 rounded`}
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
          <RejectDrop>
            <div className="w-full h-full flex flex-col justify-center">
              <span className="text-center font-semibold">Swipe to<br/>Reject</span>
            </div>
          </RejectDrop>
          <ResumeHolder>
            <DraggableResume resumeLink={resumeLink} rotateCss={rotate} />
          </ResumeHolder>
          <AcceptDrop>
            <div className="w-full h-full flex flex-col justify-center">
              <span className="text-center font-semibold">Swipe to<br/>Accept</span>
            </div>
          </AcceptDrop>
        </DndContext>
      </div>
    </section>
  );
}
