package team7.maakbaarleuven.device.controller;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.xhtmlrenderer.pdf.ITextRenderer;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import team7.maakbaarleuven.device.model.Device;
import team7.maakbaarleuven.device.service.DeviceService;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/api/devices")
public class DeviceRestController {
    
        @Autowired
        private DeviceService deviceService;
    
        @GetMapping("/overview")
        public List<Device> getAllDevices() {
            return deviceService.getAllDevices();
        }
        @PostMapping("/add")
        public Device addDevice(@RequestBody Device device){
            return deviceService.addDevice(device);
            
        }
        
     
        @GetMapping("/generate-pdf")
        public ResponseEntity<byte[]> generatePdf() {
            try {
                PDDocument document = new PDDocument();
                PDPage page = new PDPage(PDRectangle.A4);
                document.addPage(page);

                PDPageContentStream contentStream = new PDPageContentStream(document, page);
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                contentStream.beginText();
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Hello, PDFBox!");
                contentStream.endText();
                contentStream.close();

                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                document.save(byteArrayOutputStream);
                document.close();

                // Set the response headers
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDispositionFormData("attachment", "example.pdf");

                return new ResponseEntity<>(byteArrayOutputStream.toByteArray(), headers, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @GetMapping("/generate-html-pdf")
        public ResponseEntity<byte[]> generatePdf(@RequestParam("url") String url) {
            try {
                ByteArrayOutputStream pdfStream = new ByteArrayOutputStream();
                ITextRenderer renderer = new ITextRenderer();
                renderer.setDocument(url);
                renderer.layout();
                renderer.createPDF(pdfStream, true);

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDispositionFormData("attachment", "webpage.pdf");

                return new ResponseEntity<>(pdfStream.toByteArray(), headers, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        
    

}
