"use client"

import {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {DragOverlay} from '@dnd-kit/core';
import {useDroppable} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {pointerWithin, rectIntersection} from '@dnd-kit/core';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function customCollisionDetectionAlgorithm(args:any) {
    // First, let's see if there are any collisions with the pointer
    const pointerCollisions = pointerWithin(args);
    
    // Collision detection algorithms return an array of collisions
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }
    
    // If there are no collisions with the pointer, return rectangle intersections
    return rectIntersection(args);
  };

function LeftDrop(props:any) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'left droppy',
  });

  const color = isOver ? 500 : 300;
  
  return (
    <div ref={setNodeRef} className={'bg-blue-'+ color + ' border-blue-700 border-4 h-full w-20'}>
      {props.children}
    </div>
  );
}

function CenterDrop(props: any) {
    const {setNodeRef} = useDroppable({
      id: 'center droppy',
    });
    
    return (
      <div ref={setNodeRef} className='bg-yellow-300 border-yellow-500 border-4 h-full w-4/5'>
        {props.children}
      </div>
    );
  }

function RightDrop(props: any) {
    const {isOver, setNodeRef} = useDroppable({
      id: 'right droppy',
    });

    const color = isOver ? 500 : 300;
  
    return (
    <div ref={setNodeRef} className={'bg-green-'+ color + ' border-green-700 border-4 h-full w-20'}>
      {props.children}
    </div>
    );
  }

function Draggy(props:any){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'draggyyy',
      });
      const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
      };
      const resumeLink =
      "https://uploadthing.com/f/f9237960-d263-4038-a11d-07d4b7167fef_DennisMBowenResume%20copy.pdf";
  
      
      return (
        <button ref={setNodeRef}style={style} className={'w-5/6 h-full border-slate-500 relative border-4'} {...listeners} {...attributes}>
            {/*<Document file={resumeLink} className={props.rotate} externalLinkTarget={"_blank"}>
                <Page pageNumber={1} width={50} scale={1.5}/>
      </Document>*/}
        <div className={'absolute w-no-scrollbar h-full border-slate-500'}></div>
          <embed
              className={"w-full h-full border-grey-500 border-2 overflow-y-scroll"}
              src={resumeLink + "#view=FitH&toolbar=0"}
    ></embed>
        </button>
      );
}


export default function testPage(){
    const [parent, setParent] = useState("center droppy");
    const [applicant, setApplicant] = useState(1);
    const [rotate, setRotate] = useState("rotate-0");

    console.log(applicant);

    function handleDragEnd(event:any) {
        const {over} = event;
        if(over){
            if(over.id =="center droppy"){
                return;
            }
            if(over.id == "left droppy"){
                console.log("LEFT");
            }
            if(over.id == "right droppy"){
                console.log("RIGHT");
            }
            setApplicant(applicant + 1);
            setRotate("rotate-0");
        }
        console.log(over);
      }

    function handleDragOver(event:any){

        if(event.over.id == "right droppy"){
            setRotate("rotate-12")
        } else if(event.over.id == "left droppy"){
            setRotate("-rotate-12")
        } else {
            setRotate("rotate-0")
        }
    }


    return (
        <main className="h-screen">
        <div className="w-full h-5/6 p-4 bg-red-500 border-red-700 flex justify-between">
        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} collisionDetection={customCollisionDetectionAlgorithm}>
            <LeftDrop>
                {parent === 'left droppy' ? <Draggy />: 'Drop left'}
            </LeftDrop>
            <CenterDrop>
                {parent === 'center droppy' ? <Draggy />: 'Drop center'}
            </CenterDrop>
            <RightDrop>
            {parent === 'right droppy' ? <Draggy />: 'Drop right'}
            </RightDrop>
            </DndContext>
            
        </div>
        </main>
    )
}