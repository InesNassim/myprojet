/*import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../../@/components/ui/dialog"
import { Expand, Loader2 } from "lucide-react"
import SimpleBar from "simplebar-react"
import { url } from "inspector"
import { Document, Page } from "react-pdf"

const pdfFullscreen=()=>{
    const[isOpen,setIsOpen]=useState(false)
    return (
        <Dialog 
        open={isOpen}
        onOpenChange={(v)=>{
            if(!v){
                setIsOpen(v)
            }
        }}>
            <DialogTrigger asChild>
                <button className="grap-1.5" 
                aria-label="fullscreen">
                    <Expand className="h-4 w-4"/>
                    </button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-full">
                <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]mt-6">
                <div ref={ref}>
                              <Document
                                   loading={<div className="flex justify-center">
                                    <Loader2 className="my-24 h-6 w-6 animate-spin" /></div>}
                                   onLoadSuccess={({ numPages }) => numPages(numPages)}
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
            </DialogContent>
        </Dialog>
    )

}

export default pdfFullscreen*/
/*import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../@/components/ui/dialog";
import { Expand, Loader2 } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import { useToast } from "../../@/components/ui/use-toast";
import { url } from "inspector";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


interface pdfFullscreenProps{
    fileUrl:string
}

const PdfFullscreen = ({ fileUrl }:pdfFullscreenProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [numPages, setNumPages] = useState(0);
    const [width, setWidth] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [scale, setScale] = useState(1);

    const handleOpenChange = (v) => {
        setIsOpen(v);
    };

    const handleDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    const{toast}=useToast()

    const{ref}=useResizeDetector()

    return (
        <Dialog 
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <DialogTrigger asChild>
                <button 
                className="grap-1.5" aria-label="fullscreen">
                    <Expand
                     className="h-4 w-4"/>
                </button>
            </DialogTrigger>
            <DialogContent 
            className="max-w-7xl w-full">
                <SimpleBar 
                autoHide={false} 
                className="max-h-[calc(100vh-10rem)] mt-6">
                    <Document
                        file={fileUrl}
                        loading={<div className="flex justify-center">
                            <Loader2 
                            className="my-24 h-6 w-6 animate-spin" />
                            </div>
                            }
                        onLoadSuccess={handleDocumentLoadSuccess}
                        file={fileUrl} className="max-h-full">
                    
                        <Page 
                        width={width} 
                        pageNumber={currPage} 
                        scale={scale} />
                    </Document>
                </SimpleBar>
            </DialogContent>
        </Dialog>
    );
};

export default PdfFullscreen;*/
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../@/components/ui/dialog";
import { Expand, Loader2 } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import { useToast } from "../../@/components/ui/use-toast";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


interface PdfFullscreenProps {
    fileUrl: string;
}

const PdfFullscreen = ({ fileUrl }: PdfFullscreenProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [numPages, setNumPages] = useState(0);
    const [width, setWidth] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [scale, setScale] = useState(1);

    const handleOpenChange = (v) => {
        setIsOpen(v);
    };

    const handleDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const { toast } = useToast();
    const { ref } = useResizeDetector();

    return (
        <Dialog 
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <DialogTrigger
            onClick={()=>setIsOpen(true)} 
            asChild>
                <button 
                
                className="grap-1.5"
                 aria-label="fullscreen">
                    <Expand className="h-4 w-4"/>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-full">
                <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
                    <Document
                        file={fileUrl}
                        loading={<div className="flex justify-center">
                            <Loader2 className="my-24 h-6 w-6 animate-spin" />
                            </div>}
                        onLoadSuccess={handleDocumentLoadSuccess}
                        className="max-h-full"
                    >
                        {new Array(numPages).fill(0).map((_, i)=>(
                            <Page
                            key={i}
                            width={width ? width:1}
                            pageNumber={i+1} 
                            />
                        ))}
                    </Document>
                </SimpleBar>
            </DialogContent>
        </Dialog>
    );
};

export default PdfFullscreen;

