"use client";

import { useEffect, useRef, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {restrictToWindowEdges} from '@dnd-kit/modifiers';
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

function customCollisionDetectionAlgorithm(args: any) {
  // First, let's see if there are any collisions with the pointer
  const pointerCollisions = pointerWithin(args);

  // Collision detection algorithms return an array of collisions
  if (pointerCollisions.length > 0) {
    return pointerCollisions;
  }

  // If there are no collisions with the pointer, return rectangle intersections
  return rectIntersection(args);
}

function LeftDrop(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "left droppy",
  });

  //example of using isOver to change state
  //if the dragable is over this droppable
  const color = isOver ? "bg-blue-500" : "bg-blue-300";

  return (
    <div
      ref={setNodeRef}
      className={`${color} border-blue-700 border-4 h-full w-20`}
    >
      {props.children}
    </div>
  );
}

function CenterDrop(props: any) {
  const { setNodeRef } = useDroppable({
    id: "center droppy",
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-yellow-300 border-yellow-500 border-4 h-full w-4/5"
    >
      {props.children}
    </div>
  );
}

function RightDrop(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "right droppy",
  });

  //example of using isOver to change state
  //if the dragable is over this droppable
  const color = isOver ? "bg-green-500" : "bg-green-300";

  return (
    <div
      ref={setNodeRef}
      className={`${color} border-green-700 border-4 h-full w-20`}
    >
      {props.children}
    </div>
  );
}

function Draggy(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggyyy",
  });

  const [pdfWidth, setPdfWidth] = useState(0);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };
  const resumeLink =
    "https://uploadthing.com/f/f9237960-d263-4038-a11d-07d4b7167fef_DennisMBowenResume%20copy.pdf";

  useEffect(() => {
    // This code will run after the component is mounted (inserted into the DOM).
    setDivSize();
    window.addEventListener("resize", setDivSize);

    // Clean-up function (equivalent to componentWillUnmount)
    return () => {
      window.removeEventListener("resize", setDivSize);
    };
  }, []);

  function setDivSize() {
    console.log(wrapperRef);
    if (wrapperRef.current) {
      const width = wrapperRef.current.clientWidth;
      setPdfWidth(width);
    }
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
        className={"w-full h-full overflow-y-scroll border-slate-500 border-4 " + props.rotate}
        onResize={(event) => {
          console.log("resize");
          console.log(event);
        }}
        ref={wrapperRef}
      >
        <Document
          file={resumeLink}
          externalLinkTarget={"_self"}
          loading={<h2>Loading...</h2>}
        >
          <Page pageNumber={1} width={pdfWidth} />
        </Document>
      </div>
    </button>
  );
}

export default function TestPage() {
  const [applicant, setApplicant] = useState(1);
  const [rotate, setRotate] = useState("rotate-0");
  

  console.log(applicant);

  function handleDragEnd(event: any) {
    const { over } = event;
    if (over) {
      setRotate("rotate-[0deg]");
      if (over.id == "center droppy") {
        return;
      }
      if (over.id == "left droppy") {
        alert("LEFT");
      }
      if (over.id == "right droppy") {
        alert("RIGHT");
      }
      setApplicant(applicant + 1);
    }
    console.log(over);
  }

  function handleDragMove(event: any) {
    const mouseOffsetX = event.delta.x;

    if(mouseOffsetX < -50){
      setRotate("-rotate-6");
    } else if(mouseOffsetX > 50){
      setRotate("rotate-6");
    } else {
      setRotate("rotate-0");
    }

    /*const rotation = Math.floor(mouseOffsetX / 10);

    const updatedSet = tempSet;
    updatedSet.add(rotation);
    setTempSet(updatedSet);

    setRotate(`rotate-[${rotation}deg]`);*/
  }

  return (
    <main className="h-screen overflow-x-hidden overflow-y-hidden">
      <div className="w-full h-full p-4 bg-red-500 border-red-700 flex justify-between">
        <DndContext
          onDragEnd={handleDragEnd}
          onDragMove={handleDragMove}
          collisionDetection={customCollisionDetectionAlgorithm}
        >
          <LeftDrop>{"Drop left"}</LeftDrop>
          <CenterDrop>
              <Draggy rotate={rotate}/>
          </CenterDrop>
          <RightDrop>{"Drop right"}</RightDrop>
        </DndContext>
      </div>
    </main>
  );
}
