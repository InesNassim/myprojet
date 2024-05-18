

/*import { ChevronDown, ChevronUp, Loader2 } from "lucide-react/dist/esm/lucide-react"
import { Document, Page, pdfjs } from "react-pdf"
import 'react-pdf/dist/page/AnnotationLayer.css';
import 'react-pdf/dist/page/TextLayer.css';
import { useToast } from "../../@/components/ui/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useResizeDetector } from "react-resize-detector"
import { Input } from "../../@/components/ui/input";
import { cn } from "../app/lib/utils";
import { DropdownMenu } from "../../@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import SimpleBar from "simplebar-react";



pdfjs.GlobalWorkerOptions.workerSrc='//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js'

interface pdfRendererProps {
     url: string
}

const pdfRenderer = ({ url }: pdfRendererProps) => {

     const { toast } = useToast()

     const [numPages, setNumPages] = useState<number>()

     const [currPage, setCurrPage] = useState<number>(1)
     const [scale,setScale]=useState<number>(1)
     const CustomPageValidator = z.object({
          page: z.string().refine((num) => Number(num) > 0 && Number(num) <= (numPages ?? 1))
})

type TCustomPageValidator = z.infer<typeof CustomPageValidator>

const {register, handleSubmit,formState:{errors},
setValue
 } = useForm<TCustomPageValidator>({
     defaultValues: {
          page: "1",
     },
     resolver: zodResolver(CustomPageValidator)
})

const { width, ref } = useResizeDetector()
const handlePageSubmit=({page}: TCustomPageValidator)=>{
     setCurrPage(Number(page))
     setValue("page",String(page))
}
return (
     <div className="w-full bg-white rounded-nd shadow flex flex-col items-center">
          <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
               <div className="flex items-center gap-1.5">
                    <button
                         disabled={currPage <= 1}
                         onClick={() => {
                              setCurrPage((prev) =>
                                   prev - 1 > 1 ? prev - 1 : 1
                              )
                         }}
                         aria-label='previous page'>
                         <ChevronDown className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                         <form onSubmit={handleSubmit(({ page }) => setCurrPage(Number(page)))}>
                              <Input
                                   {...register('page')}
                                   
                                   className={cn("w-12 h-8",errors.page && "focus-visible:ring-red-500")}
                                   type="number"
                                   min="1"
                                   max={numPages ?? undefined}
                                   onKeyDown={(e)=>{
                                        if(e.key=== "Enter"){
                                             handleSubmit(handlePageSubmit)()
                                        }
                                   }}
                              />
                         </form>
                         <p className="text-zinc-700 text-sm space-x-1">
                              <span>/</span>
                              <span>{numPages ?? "x"}</span>
                         </p>
                    </div>

                    <button
                         disabled={numPages === undefined || currPage === numPages}
                         onClick={() => {
                              setCurrPage((prev) =>
                                   prev + 1 > (numPages ?? 1) ? (numPages ?? 1) : prev + 1
                              )
                         }}
                         aria-label='next page'>
                         <ChevronUp className="h-4 w-4" />
                    </button>
               </div>
               <div className="space-x-2">
                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                         <button 
                         className="grap-1.5" 
                         aria-label='zoom'
                          variant='ghost'>
                              <search className="h-4 w-4"/>
                              {scale*100}% <ChevronDown className="h-3 w-3 opacity-50"/>
                              </button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent>
                              <DropdownMenuItem onSelect={() =>setScale(1)}>
                                   100%
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() =>setScale(1.5)}>
                                   150%
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() =>setScale(2)}>
                                   200%
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() =>setScale(2.5)}>
                                   250%
                              </DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
               </div>
          </div>

          <div className="flex-1 w-full max-h-screen">
               <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
               <div ref={ref}>
                    <Document
                         loading={<div className="flex justify-center">
                              <Loader2 className="my-24 h-6 w-6 animate-spin" />
                         </div>}
                         onLoadError={() => {
                              toast({
                                   title: 'Error loading PDF',
                                   description: 'Please try again later',
                                   variant: 'destructive', // Correction de la faute de frappe ici
                              })
                         }}
                         onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                         file={url}
                         className="max-h-full"
                    >
                         <Page
                              width={width ? width : 1}
                              pageNumber={currPage}
                              scale={scale}
                         />
                    </Document>
               </div>
               </SimpleBar>
          </div>
     </div>
)
}
export default pdfRenderer*/

/*import { ChevronDown, ChevronUp, Loader2 } from "lucide-react/dist/esm/lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/page/AnnotationLayer.css';
import 'react-pdf/dist/page/TextLayer.css';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResizeDetector } from "react-resize-detector";
import { Input } from "../../@/components/ui/input";
import { DropdownMenu } from "../../@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import SimpleBar from "simplebar-react";
import { RotateCw } from "lucide-react";
import pdfFullscreen from "../components/pdfFullscreen";

pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js';

interface pdfRendererProps {
     url: string;
}

const pdfRenderer = ({ url }: pdfRendererProps) => {

     const [numPages, setNumPages] = useState<number>();
     const [currPage, setCurrPage] = useState<number>(1);
     const [scale, setScale] = useState<number>(1);

     const CustomPageValidator = z.object({
          page: z.string().refine((num) => Number(num) > 0 && Number(num) <= (numPages ?? 1))
     });

     type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

     const {register, handleSubmit, formState: { errors }, setValue} = useForm<TCustomPageValidator>({
          defaultValues: {
               page: "1",
          },
          resolver: zodResolver(CustomPageValidator)
     });

     const { width, ref } = useResizeDetector();

     const handlePageSubmit = ({ page }: TCustomPageValidator) => {
          setCurrPage(Number(page));
          setValue("page", String(page));
     };

     function setRotation(arg0: (prev: any) => number): void {
          throw new Error("Function not implemented.");
     }

     return (
          <div className="w-full bg-white rounded-nd shadow flex flex-col items-center">
               <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
                    <div className="flex items-center gap-1.5">
                         <button
                              disabled={currPage <= 1}
                              onClick={() => setCurrPage((prev) => prev - 1 > 1 ? prev - 1 : 1)}
                              aria-label='previous page'>
                              <ChevronDown className="h-4 w-4" />
                         </button>
                         <div className="flex items-center gap-1.5">
                              <form onSubmit={handleSubmit(({ page }) => setCurrPage(Number(page)))}>
                                   <Input
                                        {...register('page')}
                                        className={errors.page ? "w-12 h-8 focus-visible:ring-red-500" : "w-12 h-8"}
                                        type="number"
                                        min="1"
                                        max={numPages ?? undefined}
                                        onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(handlePageSubmit)(); }}
                                   />
                              </form>
                              <p className="text-zinc-700 text-sm space-x-1">
                                   <span>/</span>
                                   <span>{numPages ?? "x"}</span>
                              </p>
                         </div>
                         <button
                              disabled={numPages === undefined || currPage === numPages}
                              onClick={() => setCurrPage((prev) => prev + 1 > (numPages ?? 1) ? (numPages ?? 1) : prev + 1)}
                              aria-label='next page'>
                              <ChevronUp className="h-4 w-4" />
                         </button>
                    </div>
                    <div className="space-x-2">
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <button className="grap-1.5" aria-label='zoom'>
                                        <search className="h-4 w-4"/>
                                        {scale*100}% <ChevronDown className="h-3 w-3 opacity-50"/>
                                   </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                   <DropdownMenuItem onSelect={() => setScale(1)}>
                                        100%
                                        </DropdownMenuItem>
                                   <DropdownMenuItem onSelect={() => setScale(1.5)}>
                                        150%
                                        </DropdownMenuItem>
                                   <DropdownMenuItem onSelect={() => setScale(2)}>
                                        200%
                                        </DropdownMenuItem>
                                   <DropdownMenuItem onSelect={() => setScale(2.5)}>
                                        250%
                                        </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>

                         <button 
                         onClick={()=> setRotation((prev)=>prev-90)} 
                         aria-label='rotate 90 degrees'>
                         <RotateCw className="h-4 w-4"/>
                         </button>
                         <pdfFullscreen url={url} />
                    </div>
               </div>
               <div className="flex-1 w-full max-h-screen">
                    <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
                         <div ref={ref}>
                              <Document
                                   loading={<div className="flex justify-center">
                                        <Loader2 className="my-24 h-6 w-6 animate-spin" />
                                        </div>
                                        }
                                   onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                   file={url}
                                   className="max-h-full"
                              >
                                   <Page width={width ? width : 1} 
                                   pageNumber={currPage} 
                                   scale={scale}
                                   
                                   />
                              </Document>
                         </div>
                    </SimpleBar>
               </div>
          </div>
     );
};

export default pdfRenderer;*/
/*import { useState } from "react";
import { ChevronDown, ChevronUp, Divide, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/page/AnnotationLayer.css';
import 'react-pdf/dist/page/TextLayer.css';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResizeDetector } from "react-resize-detector";
import { Input } from "../../@/components/ui/input";
import { DropdownMenu, 
     DropdownMenuContent, 
     DropdownMenuItem, 
     DropdownMenuTrigger } 
     from "@radix-ui/react-dropdown-menu";
import SimpleBar from "simplebar-react";
import { RotateCw } from "lucide-react";
import PdfFullscreen from "../components/pdfFullscreen"; // Assurez-vous que le chemin d'importation est correct
import { cn } from "../app/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface pdfRendererProps {
     url: string;
}

const pdfRenderer = ({ url }: pdfRendererProps) => {
     const [numPages, setNumPages] = useState<number>();
     const [currPage, setCurrPage] = useState<number>(1);
     const [scale, setScale] = useState<number>(1);
     const[renderedScale,setRenderedScale]=useState<number |null>(null)
     
     const isLoading=renderedScale !== scale
     const CustomPageValidator = z.object({
          page: z.string().refine((num) => Number(num) > 0 && Number(num) <= (numPages ?? 1))
     });

     type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

     const {register, handleSubmit, formState: { errors }, setValue} = useForm<TCustomPageValidator>({
          defaultValues: {
               page: "1",
          },
          resolver: zodResolver(CustomPageValidator)
     });

     const { width, ref } = useResizeDetector();

     const handlePageSubmit = ({ page }: TCustomPageValidator) => {
          setCurrPage(Number(page));
          setValue("page", String(page));
     };

     function setRotation(arg0: (prev: any) => number): void {
          throw new Error("Function not implemented.");
     }

     return (
          <div className="w-full bg-white rounded-nd shadow flex flex-col items-center">
               <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
                    <div className="flex items-center gap-1.5">
                         <button
                              disabled={currPage <= 1}
                              onClick={() => {
                                   setCurrPage((prev) => 
                                   prev - 1 > 1 ? prev - 1 : 1
                                   )
                                   setValue("page",String(currPage-1))
                              }}
                              
                              aria-label='previous page'>
                              <ChevronDown className="h-4 w-4" />
                         </button>
                         <div className="flex items-center gap-1.5">
                              <form onSubmit={handleSubmit(({ page }) => setCurrPage(Number(page)))}>
                                   <Input
                                        {...register('page')}
                                        className={errors.page ? "w-12 h-8 focus-visible:ring-red-500" : "w-12 h-8"}
                                        type="number"
                                        min="1"
                                        max={numPages ?? undefined}
                                        onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(handlePageSubmit)(); }}
                                   />
                              </form>
                              <p className="text-zinc-700 text-sm space-x-1">
                                   <span>/</span>
                                   <span>{numPages ?? "x"}</span>
                              </p>
                         </div>
                         <button
                              disabled={numPages === undefined ||
                                    currPage === numPages}
                              onClick={() => { 
                                   setCurrPage((prev) => prev + 1 > (numPages ?? 1) ? (numPages ?? 1) : prev + 1
                                   )
                                   setValue("page",String(currPage+1))
                              }}
                              aria-label='next page'>
                              <ChevronUp className="h-4 w-4" />
                         </button>
                    </div>
                    <div className="space-x-2">
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <button className="grap-1.5" aria-label='zoom'>
                                        <search className="h-4 w-4"/>
                                        {scale*100}% <ChevronDown className="h-3 w-3 opacity-50"/>
                                   </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                   <DropdownMenuItem onSelect={() => setScale(1)}>
                                        100%
                                   </DropdownMenuItem>
                                   <DropdownMenuItem onSelect={() => setScale(1.5)}>
                                        150%
                                   </DropdownMenuItem>
                                   <DropdownMenuItem onSelect={() => setScale(2)}>
                                        200%
                                   </DropdownMenuItem>
                                   <DropdownMenuItem onSelect={() => setScale(2.5)}>
                                        250%
                                   </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>

                         <button 
                         onClick={()=> setRotation((prev)=>prev-90)} 
                         aria-label='rotate 90 degrees'>
                              <RotateCw className="h-4 w-4"/>
                         </button>
                         <PdfFullscreen fileUrl={url} />
                    </div>
               </div>
               <div className="flex-1 w-full max-h-screen">
                    <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
                         <div ref={ref}>
                              <Document
                                   loading={<div className="flex justify-center">
                                        <Loader2 className="my-24 h-6 w-6 animate-spin" />
                                        </div>
                                        }
                                   onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                   file={url}
                                   className="max-h-full"
                              >
                                   {isLoading && renderedScale ? ( 
                                   <Page 
                                   width={width ? width : 1} 
                                   pageNumber={currPage} 
                                   scale={scale}
                                   key={"@"+ renderedScale}
                                   />
                                   ):null}
                                   <Page 
                                   className={cn(isLoading ? "hidden" :"")}
                                   width={width ? width : 1} 
                                   pageNumber={currPage} 
                                   scale={scale}
                                   key={"@"+ scale}
                                   loading={
                                        <div className="flex justify-center">
                                             <Loader2 className="my-24 h-6 w-6 animate-spin"/>
                                        </div>
                                   }
                                   onRenderSuccess={()=> setRenderedScale(scale)}
                                   />
                              </Document>
                         </div>
                    </SimpleBar>
               </div>
          </div>
     );
};

export default pdfRenderer;*/


"use client"
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Loader2, RotateCw } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/page/AnnotationLayer.css";
import "react-pdf/dist/page/TextLayer.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResizeDetector } from "react-resize-detector";
import { Input } from "../../@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import SimpleBar from "simplebar-react";
import PdfFullscreen from "../components/pdfFullscreen"; // Assurez-vous que le chemin d'importation est correct
import { cn } from "../app/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface pdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: pdfRendererProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;

  const CustomPageValidator = z.object({
    page: z.string().refine((num) => Number(num) > 0 && Number(num) <= (numPages ?? 1)),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const { width, ref } = useResizeDetector();

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  const setRotation = (arg0: (prev: any) => number): void => {
    // Implémentez la logique pour la rotation ici
  };

  return (
    <div className="w-full bg-white rounded-nd shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("page", String(currPage - 1));
            }}
            aria-label="previous page"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            <form onSubmit={handleSubmit(({ page }) => setCurrPage(Number(page)))}>
              <Input
                {...register('page')}
                className={errors.page ? "w-12 h-8 focus-visible:ring-red-500" : "w-12 h-8"}
                type="number"
                min="1"
                max={numPages ?? undefined}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(handlePageSubmit)(); }}
              />
            </form>
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>
          <button
            disabled={numPages === undefined || currPage === numPages}
            onClick={() => {
              setCurrPage((prev) => (prev + 1 > (numPages ?? 1) ? (numPages ?? 1) : prev + 1));
              setValue("page", String(currPage + 1));
            }}
            aria-label="next page"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="grap-1.5" aria-label="zoom">
                <search className="h-4 w-4" />
                {scale * 100}% <ChevronDown className="h-3 w-3 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setRotation((prev) => prev - 90)}
            aria-label="rotate 90 degrees"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <PdfFullscreen fileUrl={url} />
        </div>
      </div>
      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={url}
              className="max-h-full"
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currPage}
                  scale={scale}
                  key={"@" + renderedScale}
                />
              ) : null}
              <Page
                className={cn(isLoading ? "hidden" : "")}
                width={width ? width : 1}
                pageNumber={currPage}
                scale={scale}
                key={"@" + scale}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;

